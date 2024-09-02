"use client";
// UseClient.js
import React, { useState } from "react";
import './app.css'

// Sample character data
const characters = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  name: `Character ${i + 1}`,
  level: 1,
  rank: "SR",
  imagePath: `/assets/character${1}.png`, // Make sure the image paths are correct
  rarity: i % 2 === 0 ? 'rare_holo' : 'normal'
}));
interface CharacterCardProps {
  name: string;
  level: number;
  imagePath: string;
  rarity: string; // Adjust if you have specific types for rarity
}
const CharacterCard: React.FC<CharacterCardProps> = ({ name, level, imagePath, rarity }) => {
  const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 }); // Default to center

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setGradientPosition({ x: xPercent, y: yPercent });
  };

  return (
    <div
      className={`relative flex flex-col items-center m-2 bg-black bg-opacity-20 border-2 border-yellow-200 overflow-hidden card ${rarity}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setGradientPosition({ x: 50, y: 50 })}
      style={{ backgroundImage: `url(${imagePath})` }}
      data-rarity={rarity}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) ${gradientPosition.x}%, rgba(255, 255, 255, 0) 100%)`,
          backgroundBlendMode: 'color-dodge'
        }}
      ></div>
      <div className="absolute inset-0 bg-cover bg-center">
        {/* <img
          src="https://assets.codepen.io/13471/sparkles.gif"
          alt="Sparkles"
          style={{
            mixBlendMode: 'color-dodge',
            position: 'absolute',
            top: `${gradientPosition.y}%`,
            left: `${gradientPosition.x}%`,
            transform: 'translate(-50%, -50%)',
            width: '200px',
            height: '200px',
            opacity: '0.75'
          }}
        /> */}
      </div>
      <div className="bg-purple-600 text-white text-xs px-2 py-1 absolute z-10 right-0 top-0 m-1">
        {/* {rank} */}
      </div>
      <div className="text-white mt-2 z-10">Lv. {level}</div>
      <div className="flex z-10">
        {[...Array(5)].map((_, index) => (
          <span key={index} className="text-yellow-400 text-xs">&#9733;</span>
        ))}
      </div>
    </div>
  );
};

export default function UseClient() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="flex flex-row justify-around align-middle items-center">
        {characters.map(character => (
          <CharacterCard key={character.id} {...character} />
        ))}
      </div>
    </div>
  );
}
