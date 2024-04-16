"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  ChevronRightIcon,
  Cross2Icon, // Replace with your icon for weapons
  ArchiveIcon, // Replace with your icon for artifacts
  GearIcon,
  StarFilledIcon,
  HobbyKnifeIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons"; // Import actual icons as needed
import { Button } from "@/components/ui/button";
import {
  Backpack,
  BackpackIcon,
  BanIcon,
  BookIcon,
  BookOpen,
  Calendar,
  CalendarCheck,
  Clipboard,
  DoorOpen,
  DoorOpenIcon,
  LogOut,
  Mail,
  MailCheck,
  Mailbox,
  Power,
  ShoppingCart,
  SwordIcon,
  Target,
  TicketIcon,
  Trophy,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Main = () => {
  return (
    <div className="relative h-screen ">
      <Drawer direction="right">
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent className="flex flex-row w-5/12 h-full border-l-gray-500 border-2  ">
          <div className="flex flex-col bg-[#1D243B] ">
            {/* Profile Section */}
            <DrawerHeader>
              <div className="flex items-center px-8 py-4 gap-8">
                <div className="flex flex-col justify-between align-middle text-center">
                  <img src="/assets/2.png" alt="Profile" className="w-48 " />
                  <p className="text-[#8DC1DE] font-bold text-lg">Lvl.9</p>
                </div>
                <div className="flex flex-col h-full w-full">
                  <DrawerTitle className="font-bold text-white text-3xl">
                    Sung Jinwoo
                  </DrawerTitle>
                  <DrawerDescription className="text-[#F6E5BD] font-bold text-xl">
                    gfffsbniutfg
                  </DrawerDescription>
                  <DrawerDescription className="text-[#E0F6FF] font-semibold text-2xl ">
                    Reputation 2 - 523/2500
                  </DrawerDescription>
                  <div className="w-full bg-gray-600 h-1.5  overflow-hidden mt-1">
                    <div
                      className="bg-[#5AC7E5] h-full shadow-lg neon-glow"
                      style={{ width: "21%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <Separator />
            </DrawerHeader>

            <div className="overflow-y-scroll overflow-x-hidden px-7 space-y-3">
              {/* Game Modes Button */}
              <button
                className="bg-gray-700 p-2 border-[3px] border-[#688297] bg-cover bg-top text-white w-full  my-4 relative h-32"
                style={{ backgroundImage: "url('/assets/gamemode.webp')" }}
              >
                <div className="flex items-center justify-start px-5 gap-4 ">
                  <img
                    src="/assets/tower.png" // Replace with your actual tower icon path
                    alt="Tower Icon"
                    className="h-20 mr-2 " // Adjust the size as needed
                  />
                  <span className="text-4xl font-bold text-[#D1EBFE] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
                    Game Modes
                  </span>
                </div>
              </button>
              {/* Game Modes Section */}
              <div className="grid grid-cols-3 gap-6">
                <button
                  className="w-full h-48 border-[3px] bg-cover bg-center border-[#5A6B80]"
                  style={{ backgroundImage: "url('/assets/jun.png')" }}
                >                    <span className="text-[#C8DCE9] mt-1 font-semibold text-2xl">
                Weapons
              </span></button>

<button
                  className="w-full h-48 border-[3px] bg-cover bg-center border-[#5A6B80]"
                  style={{ backgroundImage: "url('/assets/jun.png')" }}
                >                    <span className="text-[#C8DCE9] mt-1 font-semibold text-2xl">
                Weapons
              </span></button>
                <img
                  src="/assets/gamemode.png"
                  alt="Army of Shadows"
                  className="w-full h-48 border-[3px] border-[#5A6B80] "
                />

              </div>

              {/* Menu Items with Icons */}
              <div className="flex flex-col py-2 space-y-4 ">
                <div className="flex justify-between gap-4">
                  <div className="flex flex-col items-center border-[3px] border-[#5A6B80] p-2 w-full h-[8rem] align-middle justify-center bg-[#1C2135]">
                    <SwordIcon className="h-14 w-14 text-white neon-glow" />
                    <span className="text-[#C8DCE9] mt-1 font-semibold text-2xl">
                      Weapons
                    </span>
                  </div>
                  <div className="flex flex-col items-center border-[3px] border-[#5A6B80] p-2 w-full h-[8rem] align-middle justify-center bg-[#1C2135]">
                    <ArchiveIcon className="h-14 w-14 text-white neon-glow" />
                    <span className="font-semibold text-2xl mt-1">
                      Artifacts
                    </span>
                  </div>
                </div>
                <div className="flex justify-between gap-4 ">
                  <div className="flex flex-col items-center border-[3px] border-[#5A6B80] p-2 w-full h-[8rem] align-middle justify-center bg-[#1C2135]">
                    <TicketIcon className="h-14 w-14 text-white neon-glow" />
                    <span className="font-semibold text-2xl mt-1">Draw</span>
                  </div>
                  <div className="flex flex-col items-center border-[3px] border-[#5A6B80] p-2 w-full h-[8rem] align-middle justify-center bg-[#1C2135]">
                    <ShoppingCart className="h-14 w-14 text-white neon-glow" />
                    <span className="font-semibold text-2xl mt-1">Shop</span>
                  </div>
                </div>
              </div>

              {/* Bottom Buttons */}
              <DrawerFooter className="flex p-0 justify-between  flex-row">
              <div className="flex flex-col items-center border-[3px] border-[#5A6B80]  w-full h-[8rem] align-middle justify-center bg-[#1C2135]">
                    <Target className="h-14 w-14 text-white neon-glow" />
                    <span className="font-semibold text-2xl mt-1">Challenges</span>
                  </div>
                  <div className="flex flex-col items-center border-[3px] border-[#5A6B80]  w-full h-[8rem] align-middle justify-center bg-[#1C2135]">
                    <Clipboard className="h-14 w-14 text-white neon-glow" />
                    <span className="font-semibold text-2xl mt-1">Missions</span>
                  </div>
                  <div className="flex flex-col items-center border-[3px] border-[#5A6B80] w-full h-[8rem] align-middle justify-center bg-[#1C2135]">
                    <Trophy className="h-14 w-14 text-white neon-glow" />
                    <span className="font-semibold text-2xl mt-1">Achievements</span>
                  </div>
                  <div className="flex flex-col items-center border-[3px] border-[#5A6B80] w-full h-[8rem] align-middle justify-center bg-[#1C2135]">
                    <BookOpen className="h-14 w-14 text-white neon-glow" />
                    <span className="font-semibold text-2xl mt-1">Codex</span>
                  </div>
              </DrawerFooter>
            </div>
          </div>
          {/* Right-side vertical navigation */}

          <div className="w-[17.5%] bg-[#1B2A36] flex flex-col border-l-[#2B4052] border-[3px]  p-4 items-center ">
            <div>
              <DoorOpenIcon className="text-white w-16 h-16 mb-10 neon-glow" />
              <Separator />
            </div>

            <div className="border justify-between border-[#283743] p-7 flex flex-col h-full">
              <div className="flex flex-col justify-between gap-6">
                <Mail className="text-[#A5B4D3] w-14 h-14  " />
                <Backpack className="text-[#A5B4D3] w-14 h-14 " />
                <TicketIcon className="text-[#A5B4D3] w-14 h-14" />
                <CalendarCheck className="text-[#A5B4D3] w-14 h-14" />
                <StarFilledIcon className="text-[#A5B4D3] w-14 h-14 " />
              </div>
              <div className="flex flex-col gap-6 align-bottom justify-end">
                <GearIcon className="text-[#A5B4D3] w-14 h-14" />
                <Power className="text-[#A5B4D3] w-14 h-14" />
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Main;
