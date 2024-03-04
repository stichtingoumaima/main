"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import * as z from "zod";
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { User, limitedMessagesRef, messagesRef } from "@/lib/converters/Message";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@/store/store";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

const formSchema = z.object({
    input: z.string().max(1000),
});

function ChatInput({ chatId }: { chatId: string }) {
    const { data: session } = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const subscription = useSubscriptionStore((state) => state.subscription);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const inputCopy = values.input.trim();
        form.reset();
        if (inputCopy.length === 0) {
            return;
        }

        if (!session?.user) {
            return;
        }

        // Check if PRO to see limit no of chats that can be created
        const messages = (await getDocs(limitedMessagesRef(chatId))).docs.map((doc) => doc.data()).length;

        const isPro = subscription?.status === "active";

        if (!isPro && messages >= 20) {
            toast({
                title: "Free plan limit exceeded",
                description: "You've exceeded the FREE plan limit of 20 messages per chat. Upgrade to PRO for unlimited chat messages!",
                variant: "destructive",
                action: (
                    <ToastAction
                        altText="Upgrade"
                        onClick={() => router.push("/register")}
                    >
                        Upgrade to PRO
                    </ToastAction>
                ),
            });

            return;
        }



        const userToStore: User = {
            id: session.user.id!,
            name: session.user.name!,
            email: session.user.email!,
            image: session.user.image || "",
        };

        addDoc(messagesRef(chatId), {
            input: inputCopy,
            prompt:inputCopy,
            timestamp: serverTimestamp(),
            user: userToStore,
            response:""
        });

    }

    return (
        <div className="sticky bottom-0">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex space-x-2 py-5  max-2-4xl mx-auto bg-white border dark:bg-slate-800 bg-opacity-25 "
                >
                    <FormField
                        control={form.control}
                        name="input"
                        render={({ field }) => (
                            <FormItem className="flex-1  bg-transparent focus:bg-white border-2 border-zinc-700 w-4/6 h-full rounded-full transition duration-300 ease-in-out" >
                                <FormControl>
                                    <Input
                                        className="border-none bg-transparent focus:bg-white border-2 rounded-full text-black dark:placeholder:text-gray-300 font-semibold h-12 text-3xl text-center"
                                        placeholder="Click to enter"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="bg-yellow-50 rounded-full h-12 w-36  text-2xl font-semibold text-gray-600">
                        Send
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default ChatInput