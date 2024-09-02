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
} from "lucide-react";

const TopNavigation = () => {
  return (
    <div
      className="fixed w-full bg-slate-800 py-2 px-4 lg:px-20 mb-5 bg-opacity-70 shadow-[inset_1px_1px_40px_#0000FF73]
    border-2 border-cyan-500 flex items-center justify-between gap-2 md:gap-4"
    >
      <div className="flex items-center">
        {/* Add content here if needed */}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-row bg-black bg-opacity-40 w-28 md:w-40 justify-between items-center">
          <Flower className="text-purple-300 mr-1 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
          <span className="text-white text-xl md:text-2xl lg:text-4xl">70</span>
          <Plus
            className="text-purple-300 border-2 border-gray-500 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
          />
        </div>
        <div className="flex flex-row bg-black bg-opacity-40 w-28 md:w-40 justify-between items-center">
          <Coins className="text-yellow-200 mr-1 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
          <span className="text-white text-xl md:text-2xl lg:text-4xl">70</span>
          <Plus
            className="text-purple-300 border-2 border-gray-500 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
          />
        </div>

        <div className="relative">
          <RightDrawer />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
        </div>
        <DoorOpen className="text-white mr-2 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
      </div>
    </div>
  );
};

export default TopNavigation;