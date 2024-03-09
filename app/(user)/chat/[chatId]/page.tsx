import { authOptions } from "@/auth";
import AdminControls from "@/components/chat/AdminControls";
import ChatInput from "@/components/chat/ChatInput";
import ChatList from "@/components/chat/ChatList";
import ChatMembersBadges from "@/components/chat/ChatMembersBadges";
import ChatMessages from "@/components/chat/ChatMessages";
import PlayerSkillsPanel from "@/components/chat/PlayerSkillsPanel";
import { chatMembersRef } from "@/lib/converters/ChatMembers";
import { sortedMessagesRef } from "@/lib/converters/Message";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  params: {
    chatId: string;
  };
};

async function ChatPage({ params: { chatId } }: Props) {
  const session = await getServerSession(authOptions);
  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  const hasAccess = (await getDocs(chatMembersRef(chatId))).docs
    .map((doc) => doc.id)
    .includes(session?.user.id!);

  if (!hasAccess) redirect("/chat?error=permission");

  return (
    <>
  
      <div className="w-full flex flex-row h-screen  ">
        {" "}
        {/* Change background to dark */}
        <div className="w-1/6 overflow-auto border-zinc-600 border-x-2 bg-[#212436] bg-opacity-90 ">
          {" "}
          {/* Adjust width and set background to sidebar color */}
          <ChatList></ChatList>
        </div>

            {" "}
            {/* Make sure messages are scrollable */}
            <ChatMessages
              chatId={chatId}
              session={session}
              initialMessages={initialMessages}
            />

        {/* Right side panel*/}
        {session?.user.id && <PlayerSkillsPanel  userId={session.user.id} />}

      </div>
    </>
  );
}

export default ChatPage;
