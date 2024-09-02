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
import { Button } from "@/components/ui/button";
import { DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, Drawer } from "@/components/ui/drawer";
import RightDrawer from "../../main/page";

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
 <div className="w-[29.5%] flex  mt-20 ">
        </div>
            {" "}
            <div className="flex flex-col justify-end align-middle w-[40%]">
            <Drawer>
  <DrawerTrigger  className=" bg-slate-800 mb-12 bg-opacity-70 shadow-[inset_1px_1px_40px_#0000FF73]
    border-2 border-cyan-500">Report Tasks To System</DrawerTrigger>
  <DrawerContent className="flex flex-col bottom-0   ">
  <ChatMessages
              chatId={chatId}
              session={session}
              initialMessages={initialMessages}
            />
  </DrawerContent>
</Drawer>     {/* Make sure messages are scrollable */}
</div>

<div className="flex justify-end flex-1">
{/* { session?.user.id && <PlayerSkillsPanel  userId={session.user.id} /> } */}
</div>
      

      </div>
    </>
  );
}

export default ChatPage;
