import { authOptions } from "@/auth";
import ChatList from "@/components/chat/ChatList";
import ChatMessages from "@/components/chat/ChatMessages";
import PlayerSkillsPanel from "@/components/chat/PlayerSkillsPanel";
import { chatMembersRef } from "@/lib/converters/ChatMembers";
import { sortedMessagesRef } from "@/lib/converters/Message";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Main from "../../main/page";
import Mapbox from "../../map/page";
import Minimap from "@/components/minimap/Minimap";

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
  
      <div className=" overflow-hidden w-full flex flex-row h-screen  ">
        {" "}
        {/* Change background to dark */}
        {/* <div className="w-1/6 overflow-auto border-zinc-600 border-x-2 bg-[#212436] bg-opacity-90 ">
          <ChatList></ChatList>
        </div> */}
 <div className="w-3/12  ">
     <Minimap></Minimap>
        </div>
            {" "}
            {/* Make sure messages are scrollable */}
            <ChatMessages
              chatId={chatId}
              session={session}
              initialMessages={initialMessages}
            />

<Main/>
        {/* session?.user.id && <PlayerSkillsPanel  userId={session.user.id} /> */}

      </div>
    </>
  );
}

export default ChatPage;
