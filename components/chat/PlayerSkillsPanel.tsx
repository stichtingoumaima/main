"use client"
import React, { useEffect, useState } from 'react';
import { db } from "@/firebase";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import UserAvatar from '../UserAvatar';
import { playerConverter } from '@/lib/converters/Player';
import { lifeSkillConverter } from '@/lib/converters/LifeSkill';

// Defining TypeScript interfaces for props and state
interface GameSkill {
  health: number;
  stamina: number;
  strength: number;
  agility: number;
  intelligence: number;
  defense: number;
}

interface LifeSkill {
  id: string;
  name: string;
  xp: number;
  level: number;
}

interface PlayerData {
  uid: string;
  name: string;
  image?: string;
  totalXP: number;
  combatLevel: number;
  skillPoints: number;
  gameSkills: GameSkill;
  lifeSkillsLevelSum: number;
}

// Assuming each level up requires 100 XP for demonstration purposes
const maxXP = 1000;

// SkillBar Functional Component for displaying skills progress
const SkillBar: React.FC<{ xp: number; level: number }> = ({ xp, level }) => {
  const xpPercentage = ((xp % maxXP) / maxXP) * 100;
  return (
    <div className="relative w-full bg-gray-700 rounded-full h-1.5">
      <motion.div 
        className="absolute bg-blue-600 h-1.5 rounded-full" 
        initial={{ width: 0 }}
        animate={{ width: `${xpPercentage}%` }}
        transition={{ duration: 0.8 }}
      />
      <div className="absolute right-0 mr-2 text-[0.4rem] text-white">{xp}/{maxXP}</div>
    </div>
  );
};
// PlayerSkillsPanel Component to display player skills and stats
const PlayerSkillsPanel: React.FC<{ userId: string }> = ({ userId }) => {
  const { data: session } = useSession();
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [lifeSkills, setLifeSkills] = useState<LifeSkill[]>([]);
  const [levelUpTrigger, setLevelUpTrigger] = useState(false);

  useEffect(() => {
    const playerRef = doc(db, "players", userId).withConverter(playerConverter);
    const unsubscribePlayer = onSnapshot(playerRef, (doc) => {
      const data = doc.data() as PlayerData;
      setPlayerData(data);
      // Example logic to determine if a level-up animation should be triggered
      if(data.combatLevel > (playerData?.combatLevel ?? 0)) {
        setLevelUpTrigger(true);
        setTimeout(() => setLevelUpTrigger(false), 1000); // Reset trigger after animation
      }
    });

    const lifeSkillsRef = collection(db, `players/${userId}/lifeSkills`).withConverter(lifeSkillConverter);
    const unsubscribeLifeSkills = onSnapshot(lifeSkillsRef, (snapshot) => {
      const skills = snapshot.docs.map((doc) => doc.data() as LifeSkill);
      setLifeSkills(skills);
    });

    return () => {
      unsubscribePlayer();
      unsubscribeLifeSkills();
    };
  }, [userId]);

  return (
    <motion.div
      className="p-4 max-w-lg mx-auto bg-slate-800 rounded-lg shadow-xl text-white"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {playerData && (
        <>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-4 mb-6"
          >
            <UserAvatar
              name={session?.user?.name ?? 'Unknown'}
              image={session?.user?.image}
              className="h-14 w-14 rounded-full shadow-lg"
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-bold">{session?.user?.name}</h3>
              <span className="text-sm text-gray-400">Combat Level: {playerData.combatLevel}</span>
              <SkillBar xp={playerData.totalXP} level={playerData.combatLevel} />
            </div>
          </motion.div>

          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-400 mb-2">Player Stats</h2>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(playerData.gameSkills).map(([skill, value]) => (
                <div key={skill} className="text-center">
                  <p className="text-sm font-semibold text-gray-400 capitalize">{skill}</p>
                  <p className="text-lg font-bold">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-400 mb-2">Life Skills</h2>
            {lifeSkills.map(({ id, name, level, xp }) => (
              <div key={id} className="mb-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <span className="text-sm font-medium text-gray-400">Lvl {level}</span>
                </div>
                <SkillBar xp={xp} level={level} />
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default PlayerSkillsPanel