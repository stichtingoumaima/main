"use client";

import { ChatMembers, chatMembersCollectionGroupRef } from "@/lib/converters/ChatMembers"
import { useSession } from "next-auth/react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import CreateChatButton from "./CreateChatButton";
import ChatListRow from "./ChatListRow";

function ChatListRows({ initialChats }: { initialChats: ChatMembers[] }) {
    const { data: session } = useSession();
    

    const [members, loading, error] = useCollectionData<ChatMembers>(
        session && chatMembersCollectionGroupRef(session?.user.id!),
        {
            initialValue: initialChats,
        }
    );

    if (members?.length === 0) {
        return (
                <CreateChatButton isLarge />
        )
    }


    return ( 
        <div className="overflow-auto">
            {members?.map((member, i) => (
                <ChatListRow key={member.chatId} chatId={member.chatId}  />
            ))}
        </div>

    )

}

export default ChatListRows