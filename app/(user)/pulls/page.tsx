"use client";
import React, { useState } from "react";

// Sample character data
const characters = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  name: `Character ${i + 1}`,
  level: 1,
  rank: "SR",
  imagePath: `/assets/character${1}.png`, // Using the same image for simplicity
  rarity: i % 2 === 0 ? 'rare_holo' : 'normal'
}));

const CharacterCard = ({ name, level, imagePath, rarity }) => {
  const [hoverEffects, setHoverEffects] = useState('');

  // Handle mouse movement over the card
  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.
    const xPercent = Math.round(100 / rect.width * x);
    const yPercent = Math.round(100 / rect.height * y);

    // Dynamic gradient based on mouse position
    const gradient = `linear-gradient(135deg, rgba(255, 255, 255, 0.3) ${xPercent}%, rgba(255, 255, 255, 0.1) ${yPercent}%)`;
    setHoverEffects(`background-image: url('https://assets.codepen.io/13471/sparkles.gif'), ${gradient}; mix-blend-mode: color-dodge;`);
  };

  const handleMouseLeave = () => {
    setHoverEffects('');
  };

  return (
    <div className={`relative w-full h-3/4 flex flex-col items-center m-2 bg-black bg-opacity-20 border-2 border-yellow-200 overflow-hidden card ${rarity}`}
         style={{ backgroundImage: `url(${imagePath})` }}
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
         data-rarity={rarity}>
      <div className="absolute inset-0" style={{ backgroundImage: hoverEffects }}></div>
      <div className="bg-purple-600 text-white text-xs px-2 py-1 absolute z-10 right-0 top-0 m-1">SR</div>
      <div className="text-white mt-2 z-10">Lv. {level}</div>
      <div className="flex z-10">
        {[...Array(5)].map((_, index) => (
          <span key={index} className="text-yellow-400 text-xs">&#9733;</span>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="flex flex-row justify-around align-middle items-center w-full h-full">
        {characters.map((character) => (
          <CharacterCard key={character.id} {...character} />
        ))}
      </div>
    </div>
  );
}