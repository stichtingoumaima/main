"use client";

import { motion } from 'framer-motion';
import { Message, sortedMessagesRef } from "@/lib/converters/Message";
import { useLanguageStore } from "@/store/store";
import { Session } from "next-auth";
import { createRef, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { MessageCircleIcon, Star } from "lucide-react";
import UserAvatar from "../UserAvatar";
import LoadingSpinner from "../LoadingSpinner";
import AdminControls from "./AdminControls";
import ChatInput from "./ChatInput";
import ChatMembersBadges from "./ChatMembersBadges";

function ChatMessages({
  chatId,
  initialMessages,
  session,
}: {
  chatId: string;
  initialMessages: Message[];
  session: Session | null;
}) {
  const language = useLanguageStore((state) => state.language);
  const messagesEndRef = createRef<HTMLDivElement>();

  const [messages, loading, error] = useCollectionData<Message>(
    sortedMessagesRef(chatId),
    {
      initialValue: initialMessages,
    }
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesEndRef]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const badgeVariants = {
    hover: { scale: 1.2, rotate: 15, transition: { yoyo: Infinity, duration: 0.5 } },
  };

  return (
    <div className="flex flex-col w-5/12 bg-slate-800  p-5 bg-opacity-70 shadow-[inset_1px_1px_40px_#0000FF73]
    border-2 border-cyan-500
     ">
      {/* <AdminControls chatId={chatId} />
      <ChatMembersBadges chatId={chatId} /> */}
      <div className="flex-1 overflow-auto">
        <motion.div
          className="p-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {messages?.map((message: Message) => {
            const isSender = message.user.id === session?.user.id;
            return (
              <motion.div
                className={`flex ${isSender ? "justify-end" : ""} mb-4 w-full relative`}
                key={message.id}
                variants={itemVariants}
              >
                {!isSender && (
                  <motion.div whileHover={{ scale: 1.05 }} className="flex items-center mr-2">
                    <UserAvatar
                      name={message.user.name}
                      image={message.user.image}
                      className="h-[70px] w-[70px]"
                    />
                    <motion.div variants={badgeVariants} whileHover="hover">
                      <Star className="text-yellow-400 w-6 h-6" />
                    </motion.div>
                  </motion.div>
                )}
                <div className={`flex flex-col ${isSender ? "items-end" : "items-start"} flex-1 min-w-0`}>
                  <p className="text-lg font-semibold mb-1">{message.user.name.split(" ")[0]}</p>
                  <div className={`text-2xl text-[#323232] font-bold bg-[#D8D3C7] rounded-[80px] py-2 px-6 max-w-full ${isSender ? "ml-4" : "mr-4"}`}>
                    <p className="break-words overflow-hidden">
                      {message.translated?.[language] || message.input}
                    </p>
                    {!message.translated && <LoadingSpinner />}
                  </div>
                  <p className="mt-2 text-sm">
                    {message.response}
                    {!message.translated && <LoadingSpinner />}
                  </p>
                </div>
                {isSender && (
                  <motion.div whileHover={{ scale: 1.05 }} className="flex items-center ml-2">
                    <UserAvatar
                      name={message.user.name}
                      image={message.user.image}
                      className="h-[70px] w-[70px]"
                    />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
          <div ref={messagesEndRef} />
        </motion.div>
      </div>
      <ChatInput chatId={chatId} />
    </div>
  );
}

export default ChatMessages;