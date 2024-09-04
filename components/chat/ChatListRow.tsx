"use client";
import { motion } from 'framer-motion';
import { Skeleton } from "@/components/ui/skeleton";
import { Message, limitedSortedMessagesRef } from "@/lib/converters/Message";
import { useCollectionData } from "react-firebase-hooks/firestore";
import UserAvatar from "@/components/UserAvatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Corrected from next/navigation to next/router
import { useActiveChatStore, useLanguageStore } from "@/store/store";

function ChatListRow({ chatId }: { chatId: string }) {
    const [messages, loading, error] = useCollectionData<Message>(
        limitedSortedMessagesRef(chatId)
    );

    const { activeChatId, setActiveChatId } = useActiveChatStore();
    const isActive = chatId === activeChatId;
    const language = useLanguageStore((state) => state.language);
    const { data: session } = useSession();
    const router = useRouter();

    const prettyUUID = (n = 4) => chatId.substring(0, n);


    const row = (message?: Message) => (
        <motion.div
            key={chatId}
            onClick={() => {
                setActiveChatId(chatId);
                router.push(`/chat/${chatId}`);
            }}
            className={`space-x-3 cursor-pointer py-3 px-4 my-1 
                        ${isActive ? "dark:bg-[#414856] border-l-4 border-blue-500 shadow-lg" : "bg-gray-100 dark:bg-[#252736] dark:border-[#333]"} 
                        rounded-lg transition-all duration-300 ease-in-out`}
            initial="initial"
            animate="enter"
            whileHover="hover"
            whileTap="tap"
        >
            <UserAvatar
                name={message?.user.name || session?.user.name}
                image={message?.user.image || session?.user.image}
                className="h-14 w-14 rounded-full shadow"
            />
            <div className="flex-1 min-w-0">
                <p className="text-lg font-bold truncate">
                    {!message ? "New Chat" :  message?.user.name?.split(" ")[0] || session?.user?.name?.split(" ")[0] || "Unknown User"}
                </p>
                <p className="text-sm text-gray-500 truncate">
                    {message?.translated?.[language] || "Get the conversation started..."}
                </p>
            </div>
            <div className="text-xs text-gray-500 flex-shrink-0">
                <p className="mb-1">
                    {message ? new Date(message.timestamp).toLocaleTimeString() : "No messages yet"}
                </p>
                <p>chat #{prettyUUID()}</p>
            </div>
        </motion.div>
    );

    return (
        <div className="space-y-2">
            {loading && (
                <div className="flex p-5 items-center space-x-3 animate-pulse">
                    <Skeleton className="h-14 w-14 rounded-full" />
                    <div className="space-y-3 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>
            )}

            {messages?.length === 0 && !loading && row()}

            {messages?.map(message => row(message))}
        </div>
    );
}

export default ChatListRow;