"use client";
import React from 'react';
import './app.css'

// Sample character data
const characters = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  name: `Character ${i + 1}`,
  level: Math.floor(Math.random() * 20) + 1,
  rank: 'SR',
  imagePath: `/assets/character${1}.png`, // Replace with actual image paths
}));




const CharacterCard = ({ name, level, imagePath }) => (
  <div className="relative flex flex-col items-center m-2 bg-black bg-opacity-20 border-2 border-yellow-200 h-52 overflow-hidden">
    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imagePath})` }}></div>
    <div className="bg-purple-600 text-white text-xs px-2 py-1 absolute z-10 right-0 top-0 m-1">SR</div>
    <img src={imagePath} alt={name} className="h-24 w-24 rounded-md opacity-0" />
    <div className="text-white mt-2 z-10">Lv. {level}</div>
    <div className="flex z-10">
      {[...Array(5)].map((_, index) => (
        <span key={index} className="text-yellow-400 text-xs">&#9733;</span> // Star Icon
      ))}
    </div>
  </div>
);



const CharacterInfo = () => (
  <div className="flex flex-col  text-white p-4 space-y-2 h-full justify-between">
    <div className="flex justify-between items-center">
      <span className="bg-red-500 text-xs px-2 py-1 rounded-full">SR</span>
      <span>Song Chiyul</span>
      <button className="bg-gray-200 p-2 rounded-full">
        {/* Icon for the search button */}
        🔍
      </button>
    </div>
    <div className="flex justify-between items-center">
      <span>LV. 7/8</span>
      <button className="animate-pulse bg-gray-200 p-2 rounded-full">
        {/* Icon for the upgrade button */}
        ⬆️
      </button>
    </div>
    <div className="space-y-2">
      <div>Advancement</div>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400">&#9733;</span> // Star Icon
        ))}
      </div>
    </div>
    <div className="space-y-2">
      <div>Total Power: 3,104</div>
      <div>HP: 1,225</div>
      <div>Attack: 769</div>
      <div>Defense: 708</div>
    </div>
    <div className="flex justify-between items-center bg-black bg-opacity-50 p-2 ">
      <span className="text-xs">Lv. 1</span>
      <div className="flex-grow">
        <img src="/assets/barran.png" alt="Weapon" className="h-16 mx-auto" />
      </div>
      <span className="text-xs">Hatchet</span>
    </div>
  </div>
);

const App = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="overflow-y-scroll w-1/3">
        <div className="grid grid-cols-3 gap-4 p-4">
          {characters.map((character) => (
            <CharacterCard key={character.id} {...character} />
          ))}
        </div>
      </div>
      <div className='relative w-1/3'>
      <div className="absolute  items-center bottom-0 -left-72 w-[10000px] ">
        {/* Placeholder for the looping video */}
        <video autoPlay loop muted className="">
        <source src="/assets/warrior.webm" type="video/mp4" className='w-full h-full ' />
          Your browser does not support the video tag.
        </video>
      </div>
      </div>

      <div className="w-1/3 ">
        <CharacterInfo />
      </div>
    </div>
  );
};

export default App;