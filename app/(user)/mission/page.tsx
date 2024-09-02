"use client";

// Mock custom icons, assuming you have a custom icon set

import React from 'react';
import { ArrowLeftCircle, PlusCircle, Bell, Sliders, XCircle, Info, BookOpen, FileText, Book, Calendar, Award, Plus, Flower, LayoutDashboard, DoorClosed, DoorOpen, ArrowLeft, Coins, Gift, StepBack } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import TopNavigation from '@/components/navigation/Navigation';

interface NavItemProps {
  icon: React.ComponentType; // or a more specific type if known
}
const NavItem: React.FC<NavItemProps> = ({ icon: Icon }) => (
  <div className="flex items-center space-x-8 ml-[2.8rem] space-y-6">
    <div className="w-[0.45rem] h-[0.45rem] bg-white rounded-full" />
    <div className="border border-gray-300 border-opacity-20 rounded-full p-4  ">
      <Icon />
    </div>
  </div>
);

const LeftSideNav = () => (
  <div className="relative flex flex-col items-center justify-center pt-10 h-full">
    <NavItem icon={Calendar} />
    <div className="w-px bg-white h-full opacity-50 absolute left-12"></div>
    <NavItem icon={FileText} />
    <NavItem icon={FileText} />
    <NavItem icon={FileText} />
  </div>
);
interface MissionItemProps {
  title: string;
  progress: number;
  points: string;
}
const MissionItem: React.FC<MissionItemProps> = ({ title, progress, points }) => (
  <div className="flex justify-between items-center bg-black bg-opacity-40 text-white py-2 px-4  shadow-md h-28 border-l-cyan-500 border-l-[3px]">
    <div className='flex flex-col justify-around h-full w-4/6'>
      <h3 className="font-bold text-xl">{title}</h3>
      <div className=" bg-white bg-opacity-30 h-[0.35rem] overflow-hidden">
        <div className="bg-blue-400  h-2" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
    <div className='flex flex-row relative justify-between bg-gray-400 bg-opacity-30 p-4 rounded-full w-1/6'>
      <Award className="text-blue-300 mr-2 absolute top-0 left-0" size={60} />
      <span></span>
      <span>{points}</span>
      </div>
    <button className="bg-[#C2EAFF]  w-1/6 text-slate-900 font-bold py-1 px-3 ml-4  h-12 text-xl border-4 border-[#80D8FF]">
        Complete
      </button>
  </div>
);

// DailyMissions component renders the list of missions and the Daily Points section
const DailyMissions = () => (
  <div className="flex-grow p-4 space-y-2">
    <h2 className="text-white text-lg font-bold ">Daily Missions</h2>
    <Separator className='p-[0.1rem] bg-white bg-opacity-30'/>
    <MissionItem title="Clear any gate 6 time(s)" progress={0} points="30" />
    <MissionItem title="Claim Activity Funds 1 time(s)" progress={0} points="20" />
    <MissionItem title="Complete mining operations 3 time(s)" progress={0} points="20" />
    <MissionItem title="Level up hunters 1 time(s)" progress={0} points="15" />
    <div className="pt-4 bg-blue-950 bg-opacity-40 p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white">Daily Points</span>
        <span className="text-blue-300">0</span>
      </div>
      <div className="w-full bg-gray-300  h-2 overflow-hidden mb-4">
        <div className="bg-blue-400 rounded-full h-2" style={{ width: `0%` }}></div>
      </div>
      <div className="flex justify-between mb-4">
        {[20, 40, 60, 80, 100].map((pt, index) => (
          <span key={index} className="text-blue-300">{pt}Pt</span>
        ))}
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <div
      className="min-h-screen bg-cover 
       bg-no-repeat bg-center flex gap-20 "
      style={{ backgroundImage: "url('/assets/backgroundcyro.jpg')" }} // Replace with your actual image URL
    >
      
      <LeftSideNav />
      <div className="flex-grow">
        <DailyMissions />
      </div>
    </div>
  );
};

export default App;