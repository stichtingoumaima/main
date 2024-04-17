"use client";

// Mock custom icons, assuming you have a custom icon set

import React from 'react';
import { ArrowLeftCircle, PlusCircle, Bell, Sliders, XCircle, Info, BookOpen, FileText, Book, Calendar, Award, Plus, Flower, LayoutDashboard, DoorClosed, DoorOpen, ArrowLeft, Coins, Gift, StepBack } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const TopNavigation = () => (
  <div className=" p-4 flex items-center justify-between gap-4">
    <div className="flex items-center">
      <StepBack className="text-white" size={24} />
      <h1 className="text-[#CFE9FD] text-2xl font-semibold ml-2">Missions</h1>
      <Info className="text-blue-300 ml-2" size={30} />
      <Gift className="text-yellow-200 mr-1" size={30} />
    </div>
    <div className="flex items-center gap-2">
      <div className='flex flex-row bg-black bg-opacity-40 w-40 justify-between'>
      <Flower className="text-purple-300 mr-1" size={40} />
      <span className="text-white text-4xl  ">70</span>
      <Plus className="text-purple-300  border-2 border-gray-500" size={40} />
      </div>
      <div className='flex flex-row bg-black bg-opacity-40 w-40 justify-between'>
      <Coins className="text-yellow-200 mr-1" size={40} />
      <span className="text-white text-4xl  ">70</span>
      <Plus className="text-purple-300  border-2 border-gray-500" size={40} />
      </div>

      <div className="relative">
        <LayoutDashboard className="text-white" size={50} />
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
      </div>
      <DoorOpen className="text-white mr-2" size={50} />
    
    </div>
  </div>
);

const NavItem = ({ icon: Icon }) => (
  <div className="flex items-center space-x-8 ml-[2.8rem] space-y-6">
    <div className="w-[0.45rem] h-[0.45rem] bg-white rounded-full" />
    <div className="border border-gray-300 border-opacity-20 rounded-full p-4  ">
      <Icon className="text-white" size={42} />
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
      
      <div className="flex-grow">
        <TopNavigation />
        <div id="leftPlayer">
  <video id="leftVideo" autoPlay loop muted className="">
    <source src="/assets/warrior.webm" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>
      </div>
    </div>
  );
};

export default App;