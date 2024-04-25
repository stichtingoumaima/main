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
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { getPlayerCombatLevel } from '@/lib/converters/Player';

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
interface LevelUpDetails {
  hp: number;
  sp: number;
  atk: number;
  def: number;
  crt: number;
}

const ChatInput: React.FC<ChatInputProps> = ({ chatId }) => {  
  const [levelUpDialogOpen, setLevelUpDialogOpen] = useState(false);
  const [levelUpDetails, setLevelUpDetails] = useState<LevelUpDetails>({ hp: 0, sp: 0, atk: 0, def: 0, crt: 0 });

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
  
    if (!session?.user?.id) {
      console.error("Session user ID is not available.");
      return;
    }
    const combatLevel = await getPlayerCombatLevel(session.user.id);
    const activityLogRef = doc(collection(db, `players/${session.user.id}/activitylog`)).withConverter(activityLogConverter);
    
    await setDoc(activityLogRef, {
      activityType: activityDetails.activity,
      xpEarned: activityDetails.xp,
      skillImpacted: activityDetails.skill,
      statImpacted: activityDetails.stat,
      timestamp: serverTimestamp(),
      combatLevelAtTimeOfActivity: combatLevel, // Use the fetched combat level here
      reason: activityDetails.reason
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
            // Find the index of the first opening curly brace
            const startIndex = data.response.indexOf('{');
            // If a curly brace was found, and it's not at the end of the string
            if (startIndex !== -1 && startIndex < data.response.length) {
              // Extract the substring from the first '{' to the end of the response
              const jsonString = data.response.substring(startIndex);
              // Parse the JSON string
              const responseObj = JSON.parse(jsonString);
              if (responseObj.xp) {
                setXpDetails({
                  xp: responseObj.xp,
                  skill: responseObj.skill,
                  stat: responseObj.stat,
                  activity: responseObj.activity,
                  reason: responseObj.text
                });
                setDialogOpen(true);
              }
            } else {
              console.log('No JSON object found in the response');
            }
          } catch (error) {
            console.log(error);
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
            await logActivity(xpDetails);
      await SkillService.addXpToLifeSkill(session.user.id!, xpDetails.xp, xpDetails.skill,xpDetails.stat);
      handleLevelUp();
      toast({
        title: "XP Added",
        description: `You've gained ${xpDetails.xp} XP in ${xpDetails.skill}.`,
      });
    } catch (error) {
      console.log(error)
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
  const handleLevelUp = () => {
    // Simulate a level-up event with mocked new stats
    setLevelUpDetails({ hp: 178, sp: 67, atk: 112, def: 41, crt: 3 });
    setLevelUpDialogOpen(true);
  };

  const confirmLevelUp = () => {
    // Implement the logic to update the player's stats in your database
    console.log('New stats confirmed:', levelUpDetails);
    setLevelUpDialogOpen(false);
  };
  return (
    <>
      <div className="sticky bottom-0 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2 py-5 max-2-4xl mx-auto p-16 border-[#00000048]">
            <FormField
              control={form.control}
              name="input"
              render={({ field }) => (
                <FormItem className="flex-1 bg-transparent focus:bg-white border-2 border-zinc-600 opacity-75 w-4/6 h-full rounded-full transition duration-300 ease-in-out">
                  <FormControl>
                    <Input {...field} className="border-none bg-transparent focus:bg-white border-2 rounded-full w-full text-black dark:placeholder:text-gray-300 font-semibold h-12 text-xl text-center" placeholder="Click to enter" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-yellow-50 rounded-full h-12  text-2xl font-semibold text-gray-600">Send</Button>
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
        {levelUpDialogOpen && (
          <Dialog open={levelUpDialogOpen} onOpenChange={setLevelUpDialogOpen}>
            <DialogContent>
              <DialogTitle>Level Up!</DialogTitle>
              <DialogDescription>
                Congratulations! Your character's stats have improved!
              </DialogDescription>
              <motion.div
                initial={{ color: 'red' }}
                animate={{ color: 'green' }}
                transition={{ duration: 1 }}
              >
                HP: {9} ➔ {levelUpDetails.hp}<br/>
                SP: {20} ➔ {levelUpDetails.sp}<br/>
                ATK: {5} ➔ {levelUpDetails.atk}<br/>
                DEF: {3} ➔ {levelUpDetails.def}<br/>
                CRT: {7} ➔ {levelUpDetails.crt}
              </motion.div>
              <div className="flex justify-center gap-4 my-4">
                <Button onClick={confirmLevelUp} className="bg-green-500 text-white rounded px-4 py-2">Confirm</Button>
              </div>
              <DialogClose asChild>
                <Button className="absolute top-0 right-0">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatInput;