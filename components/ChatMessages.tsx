"use client";

import { Message, sortedMessagesRef } from "@/lib/converters/Message";
import { useLanguageStore } from "@/store/store";
import { Session } from "next-auth";
import { createRef, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { MessageCircleIcon } from "lucide-react";
import UserAvatar from "./UserAvatar";
import LoadingSpinner from "./LoadingSpinner";

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
    console.log(messages);
  }, [messages, messagesEndRef]);

  return (
    <div className="p-5">
      {!loading && messages?.length === 0 && (
        <div className="flex flex-col justify-center text-center items-center p-20 rounded-xl space-y-2 bg-indigo-400 text-white font-extralight ">
          <MessageCircleIcon className="h-10 w-10" />

          <h2>
            <span className="font-bold">Invite a friend</span> &{" "}
            <span className="font-bold">
              Send yout first message in ANY language
            </span>{" "}
            below to get started!
          </h2>
          <p>The AI will auto-detect & translate it all for you</p>
        </div>
      )}

{messages?.map((message: Message) => {
  const isSender = message.user.id === session?.user.id;
  return (
    <div className={`flex ${isSender ? "justify-end" : ""} mb-4 w-full relative line-clamp-1`} key={message.id}>
      {/* Avatar */}
      {!isSender && (
        <UserAvatar
          name={message.user.name}
          image={message.user.image}
          className="h-[90px] w-[90px] mr-2"
        />
      )}
      {/* Message bubble */}
      <div className={`flex flex-col ${isSender ? "items-end" : "items-start"} flex-1 min-w-0`}>
        <p className="text-lg font-semibold mb-1">
          {message.user.name.split(" ")[0]}
        </p>
        <div className={`text-2xl text-[#323232] font-bold bg-[#D8D3C7] rounded-[80px] py-2 px-6 max-w-full ${isSender ? "ml-4" : "mr-4"
          }`}>
          <p className="break-words overflow-hidden">{message.translated?.[language] || message.input}</p>
          {!message.translated && <LoadingSpinner />}
        </div>
        <p className="mt-2 text-sm">
          {message.response}
          {!message.translated && <LoadingSpinner />}
        </p>
      </div>
      {/* Avatar */}
      {isSender && (
        <UserAvatar
          name={message.user.name}
          image={message.user.image}
          className="h-[80px] w-[80px] ml-2"
        />
      )}
    </div>
  );
})}
<div ref={messagesEndRef} />
    </div>
  );
}

export default ChatMessages;
