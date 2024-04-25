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
      className="fixed w-full bg-slate-800  py-2 px-20 mb-5bg-opacity-70 shadow-[inset_1px_1px_40px_#0000FF73]
    border-2 border-cyan-500 p-4 flex items-center justify-between gap-4"
    >
      <div className="flex items-center">
        <StepBack className="text-white" size={24} />
        <h1 className="text-[#CFE9FD] text-2xl font-semibold ml-2">Missions</h1>
        <Info className="text-blue-300 ml-2" size={30} />
        <Gift className="text-yellow-200 mr-1" size={30} />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-row bg-black bg-opacity-40 w-40 justify-between">
          <Flower className="text-purple-300 mr-1" size={40} />
          <span className="text-white text-4xl  ">70</span>
          <Plus
            className="text-purple-300  border-2 border-gray-500"
            size={40}
          />
        </div>
        <div className="flex flex-row bg-black bg-opacity-40 w-40 justify-between">
          <Coins className="text-yellow-200 mr-1" size={40} />
          <span className="text-white text-4xl  ">70</span>
          <Plus
            className="text-purple-300  border-2 border-gray-500"
            size={40}
          />
        </div>

        <div className="relative">
          <RightDrawer />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
        </div>
        <DoorOpen className="text-white mr-2" size={50} />
      </div>
    </div>
  );
};
export default TopNavigation;
