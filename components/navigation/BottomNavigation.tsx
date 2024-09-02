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
      className="fixed w-full bottom-0 bg-slate-800   bg-opacity-70 shadow-[inset_1px_1px_40px_#0000FF73]
   flex items-center justify-center "
    >
      <div className="flex items-center">
        {/* Add content here if needed */}
      </div>
      <div className="flex items-center gap-2">
      <Plus
            className="text-purple-300 border-2 border-gray-500 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
          />
                    <Plus
            className="text-purple-300 border-2 border-gray-500 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
          />

          <Plus
            className="text-purple-300 border-2 border-gray-500 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
          />
  

     
      </div>
    </div>
  );
};

export default TopNavigation;