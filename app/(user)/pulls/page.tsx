"use client";
import React, { useState } from "react";
import './app.css'

const characters = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    name: `Character ${i + 1}`,
    level: 1,
    rank: "SR",
    imagePath: `/assets/character${ 1}.png`, // Assuming different images for variety
    rarity: i % 2 === 0 ? 'rare_holo' : 'normal'
}));


const CharacterCard = ({ name, level, imagePath, rarity }) => {
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { clientWidth: width, clientHeight: height } = target;
    const posX = (offsetX / width) * 100;
    const posY = (offsetY / height) * 100;

    const gradientPos = `background-position: ${100 - posX}% ${100 - posY}%;`;
    const sparklePos = `background-position: ${(100 - posX) / 1.5}% ${(100 - posY) / 1.5}%;`;
    const opacity = `${1 - Math.abs(50 - posX) * 0.01 - Math.abs(50 - posY) * 0.01}`;

    setStyle({
      transform: `rotateX(${(50 - posY) / 10}deg) rotateY(${(posX - 50) / 10}deg)`,
      '--gradient-pos': gradientPos,
      '--sparkle-pos': sparklePos,
      '--opacity': opacity
    });
  };

  const handleMouseLeave = () => {
    setStyle({});
  };

  return (
    <div
      className={`card ${rarity}`}
      style={{
        backgroundImage: `url(${imagePath})`,
        ...style
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-info">
        <h3>{name}</h3>
        <p>Lv. {level}</p>
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