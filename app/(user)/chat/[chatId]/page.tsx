import { authOptions } from "@/auth";
import AdminControls from "@/components/AdminControls";
import BgVideo from "@/components/BgVideo";
import ChatInput from "@/components/ChatInput";
import ChatList from "@/components/ChatList";
import ChatMembersBadges from "@/components/ChatMembersBadges";
import ChatMessages from "@/components/ChatMessages";
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
      <BgVideo></BgVideo>
      <div className="bg-gray-900 bg-opacity-20 w-full flex flex-row h-screen ">
        {" "}
        {/* Change background to dark */}
        <div className="w-1/6 bg-slate-900 bg-opacity-20 overflow-auto border-zinc-600 border-x-2 ">
          {" "}
          {/* Adjust width and set background to sidebar color */}
          <ChatList></ChatList>
        </div>
        <div className="flex flex-col w-4/6">
          {" "}
          {/* Adjust width */}
          <AdminControls chatId={chatId} />
          <ChatMembersBadges chatId={chatId} />
          <div className="flex-1 overflow-auto">
            {" "}
            {/* Make sure messages are scrollable */}
            <ChatMessages
              chatId={chatId}
              session={session}
              initialMessages={initialMessages}
            />
          </div>
          <ChatInput chatId={chatId} />
        </div>
        {/* Right side panel*/}
<div className="flex flex-col w-1/6 h-screen bg-slate-900 text-white overflow-y-auto">
  <div className="p-4 space-y-4">
    {/* Mind Mastery */}
    <div className="group bg-green-800 p-2 rounded-lg shadow-md">
      <p className="text-xl font-bold">Mind Mastery - Level 1</p>
      <div className="space-y-2 bg-gray-900 p-2 rounded-lg">
        <p className="text-lg font-semibold">Subskills</p>
        <div className="space-y-1">
          <div>
            <p className="text-sm">Critical Thinking - 40%</p>
            <progress className="progress progress-info w-full" value="40" max="100"></progress>
          </div>
          <div>
            <p className="text-sm">Problem Solving - 60%</p>
            <progress className="progress progress-info w-full" value="60" max="100"></progress>
          </div>
          <div>
            <p className="text-sm">Creative Thinking - 25%</p>
            <progress className="progress progress-info w-full" value="25" max="100"></progress>
          </div>
        </div>
      </div>
    </div>

    {/* Physical Prowess */}
    <div className="group bg-neutral-700 p-2 rounded-lg shadow-md">
      <p className="text-xl font-bold">Physical Prowess - Level 2</p>
      <div className="space-y-2 bg-gray-900 p-2 rounded-lg">
        <p className="text-lg font-semibold">Subskills</p>
        <div className="space-y-1">
          <div>
            <p className="text-sm">Endurance - 75%</p>
            <progress className="progress progress-info w-full" value="75" max="100"></progress>
          </div>
          <div>
            <p className="text-sm">Strength - 50%</p>
            <progress className="progress progress-info w-full" value="50" max="100"></progress>
          </div>
          <div>
            <p className="text-sm">Agility - 30%</p>
            <progress className="progress progress-info w-full" value="30" max="100"></progress>
          </div>
        </div>
      </div>
    </div>

    {/* Technological Fluency */}
    <div className="group bg-yellow-800 p-2 rounded-lg shadow-md">
      <p className="text-xl font-bold">Technological Fluency - Level 3</p>
      <div className="space-y-2 bg-gray-900 p-2 rounded-lg">
        <p className="text-lg font-semibold">Subskills</p>
        <div className="space-y-1">
          <div>
            <p className="text-sm">Coding - 90%</p>
            <progress className="progress progress-info w-full" value="90" max="100"></progress>
          </div>
          <div>
            <p className="text-sm">Cybersecurity - 40%</p>
            <progress className="progress progress-info w-full" value="40" max="100"></progress>
          </div>
          <div>
            <p className="text-sm">Data Analysis - 60%</p>
            <progress className="progress progress-info w-full" value="60" max="100"></progress>
          </div>
        </div>
      </div>
    </div>

    {/* Craftman's Touch */}
    <div className="group bg-red-400 p-2 rounded-lg shadow-md">
      <p className="text-xl font-bold">Craftman's Touch - Level 4</p>
      <div className="space-y-2 bg-gray-900 p-2 rounded-lg">
        <p className="text-lg font-semibold">Subskills</p>
        <div className="space-y-1">
          <div>
            <p className="text-sm">Woodworking - 80%</p>
            <progress className="progress progress-info w-full" value="80" max="100"></progress>
          </div>
          <div>
            <p className="text-sm">Metalworking - 70%</p>
            <progress className="progress progress-info w-full" value="70" max="100"></progress>
          </div>
          <div>
            <p className="text-sm">Leatherworking - 50%</p>
            <progress className="progress progress-info w-full" value="50" max="100"></progress>
          </div>
        </div>
      </div>
    </div>

    {/* Social Navigator */}
    <div className="group bg-slate-700 p-2 rounded-lg shadow-md">
      <p className="text-xl font-bold">Social Navigator - Level 5</p>
      <div className="space-y-2 bg-gray-900 p-2 rounded-lg">
        <p className="text-lg font-semibold">Subskills</p>
        <div className="space-y-1">
          <div>
            <p className="text-sm">Public Speaking - 65%</p>
            <progress className="progress progress-info w-full" value="65" max="100"></progress>
          </div>
          <div>
            <p className="text-sm">Empathy - 80%</p>
            <progress className="progress progress-info w-full" value="80" max="100"></progress>
          </div>
          <div>
            <p className="text-sm">Negotiation - 45%</p>
            <progress className="progress progress-info w-full" value="45" max="100"></progress>
          </div>
        </div>
      </div>
    </div>

    {/* Truth Seeker */}
    <div className="group bg-orange-800 p-2 rounded-lg shadow-md">
      <p className="text-xl font-bold">Truth Seeker - Level 6</p>
      <div className="space-y-2 bg-gray-900 p-2 rounded-lg">
        <p className="text-lg font-semibold">Subskills</p>
        <div className="space-y-1">
          <div>
            <p className="text-sm">Research - 85%</p>
            <progress className="progress progress-info w-full" value="85" max="100"></progress>
          </div>
          <div>
            <p className="text-sm">Analysis - 75%</p>
            <progress className="progress progress-info w-full" value="75" max="100"></progress>
          </div>
          <div>
            <p className="text-sm">Logic - 90%</p>
            <progress className="progress progress-info w-full" value="90" max="100"></progress>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      </div>
    </>
  );
}

export default ChatPage;
