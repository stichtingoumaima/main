"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addDoc, serverTimestamp, onSnapshot, doc, collection, setDoc } from 'firebase/firestore';
import { db } from '@/firebase'; // Adjust this import based on your Firebase configuration
import { messagesRef, User } from '@/lib/converters/Message';
import { useToast } from '@/components/ui/use-toast';
import { SkillService } from '@/lib/services/PlayerService';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { activityLogConverter } from '@/lib/converters/ActivityLogs'; // Ensure you have this converter set up
import { AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const formSchema = z.object({
  input: z.string().max(1000),
});

interface ChatInputProps {
  chatId: string;
}

interface XPDetails {
  activity:string,
  stat:string,
  xp: number;
  skill: string;
  reason:string;
}

const ChatInput: React.FC<ChatInputProps> = ({ chatId }) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [xpDetails, setXpDetails] = useState<XPDetails>({ xp: 0, skill: '' ,activity:'',stat:'',reason:''});
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: '',
    },
  });

  const logActivity = async (activityDetails: XPDetails) => {
    const activityLogRef = doc(collection(db, `players/${session.user.id}/activitylog`)).withConverter(activityLogConverter);
    console.log(activityLogRef)
    await setDoc(activityLogRef, {
      activityType: activityDetails.activity,
      xpEarned: activityDetails.xp,
      skillImpacted: activityDetails.skill,
      statImpacted:activityDetails.stat,
      timestamp: serverTimestamp(),
      combatLevelAtTimeOfActivity: 3,
      reason:activityDetails.reason
    });
  };

  const onSubmit = async (values: { input: string }) => {
    const inputCopy = values.input.trim();
    form.reset();

    if (inputCopy.length === 0 || !session?.user) {
      return;
    }

    try {
      const docRef = await addDoc(messagesRef(chatId), {
        input: inputCopy,
        prompt: inputCopy,
        timestamp: serverTimestamp(),
        user: {
          id: session.user.id!,
          name: session.user.name!,
          email: session.user.email!,
          image: session.user.image || '',
        },
        response: "",
      });

      const unsubscribe = onSnapshot(docRef, (doc) => {
        const data = doc.data();
        if (data && data.response) {
          try {
            const responseObj = JSON.parse(data.response);
            if (responseObj.xp) {
              setXpDetails({ xp: responseObj.xp, skill: responseObj.skill, stat: responseObj.stat,activity:responseObj.activity,reason:responseObj.text });
              setDialogOpen(true);
            }
          } catch (error) {
            toast({
              title: "Error",
              description: "Failed to parse response.",
              variant: "destructive",
            });
          }
          unsubscribe();
        }
      });

      toast({
        title: "Message Sent",
        description: "Awaiting response for XP...",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message.",
        variant: "destructive",
      });
    }
  };

  const acceptXP = async () => {
    try {
      await SkillService.addXpToLifeSkill(session.user.id!, xpDetails.xp, xpDetails.skill);
      await logActivity(xpDetails);
      toast({
        title: "XP Added",
        description: `You've gained ${xpDetails.xp} XP in ${xpDetails.skill}.`,
      });
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to add XP.",
        variant: "destructive",
      });
    }
    setDialogOpen(false);
  };

  const rejectXP = () => {
    toast({
      title: "XP Rejected",
      description: "You have rejected the XP award.",
    });
    setDialogOpen(false);
  };

  return (
    <>
      <div className="sticky bottom-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2 py-5 max-2-4xl mx-auto p-16 border-[#00000048]">
            <FormField
              control={form.control}
              name="input"
              render={({ field }) => (
                <FormItem className="flex-1 bg-transparent focus:bg-white border-2 border-zinc-600 opacity-75 w-4/6 h-full rounded-full transition duration-300 ease-in-out">
                  <FormControl>
                    <Input {...field} className="border-none bg-transparent focus:bg-white border-2 rounded-full text-black dark:placeholder:text-gray-300 font-semibold h-12 text-3xl text-center" placeholder="Click to enter" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-yellow-50 rounded-full h-12 w-36 text-2xl font-semibold text-gray-600">Send</Button>
          </form>
        </Form>
      </div>
      <AnimatePresence>
        {dialogOpen && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button className="hidden">Open</button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>XP Award</DialogTitle>
              <DialogDescription>
                The system wishes to grant you {xpDetails.xp} XP for the skill: {xpDetails.skill}.
              </DialogDescription>
              <div className="flex justify-center gap-4 my-4">
                <button onClick={acceptXP} className="bg-green-500 text-white rounded px-4 py-2">Accept</button>
                <button onClick={rejectXP} className="bg-red-500 text-white rounded px-4 py-2">Reject</button>
              </div>
              <DialogClose asChild>
                <button className="absolute top-0 right-0"><X className="h-4 w-4" /></button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatInput;