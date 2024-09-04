import RightDrawer from "@/app/(user)/main/page";
import {
  StepBack,
  Info,
  Gift,
  Flower,
  Plus,
  Coins,
  LayoutDashboard,
  DoorOpen,
  BarChart,
  Swords,
  Fan,
  UserCircleIcon,
  DollarSignIcon,
  CalendarCheck2,
  MessageCircle,
} from "lucide-react";

const TopNavigation = () => {
  return (
    <div
      className="fixed w-full bottom-0 bg-slate-950 shadow-[inset_1px_1px_40px_#0000FF73]
   flex items-center justify-center  h-16"
    >
      <div className="flex items-center">
        {/* Add content here if needed */}
      </div>
      <div className="flex items-center gap-8">
        <BarChart
          className="text-white border-gray-500 h-10 w-10 neon-glow rounded-full overflow-hidden shadow-md transform transition duration-500 ease-in-out hover:border-white hover:border-4 hover:scale-[2]  hover:avatar-inner-glow  hover:-translate-y-8 hover:bg-slate-950 hover:shadow-[inset_1px_1px_40px_#0000FF73]"
        />
        <Swords
          className="text-white border-gray-500 h-10 w-10 neon-glow rounded-full overflow-hidden shadow-md transform transition duration-500 ease-in-out hover:border-white hover:border-4 hover:scale-[2]   hover:avatar-inner-glow  hover:-translate-y-8 hover:bg-slate-950 hover:shadow-[inset_1px_1px_40px_#0000FF73]"
        />
        <Fan
          className="text-white border-gray-500 h-10 w-10 neon-glow rounded-full overflow-hidden shadow-md transform transition duration-500 ease-in-out hover:border-white hover:border-4 hover:scale-[2]   hover:avatar-inner-glow  hover:-translate-y-8 hover:bg-slate-950 hover:shadow-[inset_1px_1px_40px_#0000FF73]"
        />
        <UserCircleIcon
          className="text-white border-white h-10 w-10 neon-glow rounded-full overflow-hidden  transform transition duration-500 ease-in-out hover:border-4 scale-[2]  hover:avatar-inner-glow  -translate-y-8 bg-slate-950 shadow-[inset_1px_1px_40px_#0000FF73]"
        />
        <MessageCircle
          className="text-white border-gray-500 h-10 w-10 neon-glow rounded-full overflow-hidden shadow-md transform transition duration-500 ease-in-out hover:border-white hover:border-4 hover:scale-[2]   hover:avatar-inner-glow  hover:-translate-y-8 hover:bg-slate-950 hover:shadow-[inset_1px_1px_40px_#0000FF73]"
        />
        <CalendarCheck2
          className="text-white border-gray-500 h-10 w-10 neon-glow rounded-full overflow-hidden shadow-md transform transition duration-500 ease-in-out hover:border-white hover:border-4 hover:scale-[2]   hover:avatar-inner-glow  hover:-translate-y-8 hover:bg-slate-950 hover:shadow-[inset_1px_1px_40px_#0000FF73]"
        />
        <DollarSignIcon
          className="text-white border-gray-500 h-10 w-10 neon-glow rounded-full overflow-hidden shadow-md transform transition duration-500 ease-in-out hover:border-white hover:border-4 hover:scale-[2]   hover:avatar-inner-glow  hover:-translate-y-8 hover:bg-slate-950 hover:shadow-[inset_1px_1px_40px_#0000FF73]"
        />
      </div>
    </div>
  );
};

export default TopNavigation;