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
        <div className="flex flex-col justify-center text-center items-center p-20 rounded-xl space-y-2 bg-indigo-400 text-white font-extralight">
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
          <div className={`flex gap-4 bg-black bg-opacity-25 relative line-clamp-1 ${
            isSender ? "justify-end text-right" : "text-left"
          }`} key={message.id}>
            {/* Left Side */}
            <div className="flex flex-col gap-2">
              <p
                className={`text-lg font-semibold line-clamp-1 ${
                  isSender ? "text-right" : "text-left"
                }`}
              >
                {message.user.name.split(" ")[0]}
              </p>

              <div className={`flex space-x-2 text-3xl text-[#323232] font-bold bg-[#D8D3C7] rounded-full border-2 w-fit py-4 px-6 ${isSender ? "self-end" : "self-start"
                }`}>
                <p>{message.translated?.[language] || message.input}</p>

                {!message.translated && <LoadingSpinner />}
              </div>

              <div className="flex space-x-2">
                <p>{message.response}</p>

                {!message.translated && <LoadingSpinner />}
              </div>
            </div>

            <UserAvatar
              name={message.user.name}
              image={message.user.image}
              className={`${!isSender && "-order-1"} h-[90px] w-[90px]`}
            />
          </div>
        );
      })}
<div ref={messagesEndRef} style={{ height: '1px' }} />
    </div>
  );
}

export default ChatMessages;
