"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { db } from "@/firebase"; // Ensure this path is correct and Firebase is configured properly
import { doc, collection, onSnapshot } from "firebase/firestore";
import UserAvatar from '../UserAvatar'; // Ensure this path is correct
import { playerConverter } from '@/lib/converters/Player'; // Ensure this path is correct
import { lifeSkillConverter } from '@/lib/converters/LifeSkill'; // Ensure this path is correct
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'; // Ensure this path is correct
// Note: Radix Icons import might not be necessary, so it's commented out. If you do use Radix icons, uncomment or adjust accordingly.
// import { LockClosedIcon } from '@radix-ui/react-icons';
import { LockIcon, MagnetIcon, UnlockIcon } from 'lucide-react';

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

interface Archetype {
  id: string;
  name: string;
  description: string;
  gameSkillRef: string;
  levelRequirement: number;
  tier: number;
  unlocked: boolean;
}

interface PlayerData {
  uid: string;
  name: string;
  image?: string;
  totalXP: number;
  combatLevel: number;
  gameSkills: GameSkill;
}

const maxXP = 1000;

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

const PlayerSkillsPanel: React.FC<{ userId: string }> = ({ userId }) => {
  const { data: session } = useSession();
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [lifeSkills, setLifeSkills] = useState<LifeSkill[]>([]);
  const [archetypes, setArchetypes] = useState<Archetype[]>([]);

  useEffect(() => {
    const playerRef = doc(db, "players", userId).withConverter(playerConverter);
    const unsubscribePlayer = onSnapshot(playerRef, (doc) => {
      const data = doc.data();
      if (data) setPlayerData(data as PlayerData);
    });

    const lifeSkillsRef = collection(db, `players/${userId}/lifeSkills`).withConverter(lifeSkillConverter);
    const unsubscribeLifeSkills = onSnapshot(lifeSkillsRef, (snapshot) => {
      const skills = snapshot.docs.map(doc => doc.data() as LifeSkill);
      setLifeSkills(skills);
    });

    const archetypesRef = collection(db, `players/${userId}/archetypes`);
    const unsubscribeArchetypes = onSnapshot(archetypesRef, (snapshot) => {
      const archetypeData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Archetype[];
      setArchetypes(archetypeData);
    });

    return () => {
      unsubscribePlayer();
      unsubscribeLifeSkills();
      unsubscribeArchetypes();
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
              <h3 className="text-lg font-bold">{playerData.name}</h3>
              <span className="text-sm text-gray-400">Combat Level: {playerData.combatLevel}</span>
              <SkillBar xp={playerData.totalXP} level={playerData.combatLevel} />
            </div>
          </motion.div>
          <div className="mb-4 overflow-scroll h-2/3">
            <h2 className="text-xl font-bold text-gray-400 mb-2 ">Player Stats</h2>
            <div className="grid grid-cols-3 gap-4 ">
              {Object.entries(playerData.gameSkills).map(([skill, value]) => (
                <div key={skill} className="text-center">
                  <p className="text-sm font-semibold text-gray-400 capitalize">{skill}</p>
                  <p className="text-lg font-bold">{value}</p>
                  <div className="mt-2 flex flex-col items-center">
                    {archetypes
                      .filter(archetype => archetype.gameSkillRef === skill)
                      .sort((a, b) => a.tier - b.tier)
                      .map((archetype, index, arr) => (
                        <TooltipProvider key={archetype.id}>
                          <Tooltip delayDuration={200}>
                            <TooltipTrigger>
                              <div className="relative">
                                <div
                                  className={`w-10 h-10 rounded-full border-2 ${
                                    archetype.unlocked ? 'bg-green-500 border-green-700' : 'bg-gray-500 border-gray-700'
                                  } flex items-center justify-center`}
                                >
                                  {archetype.unlocked ? (
                                    <UnlockIcon className="w-4 h-4 text-white" />
                                  ) : (
                                    <LockIcon className="w-4 h-4 text-white" />
                                  )}
                                </div>
                                {index < arr.length - 1 && (
                                  <div className="absolute top-full left-1/2 w-0.5 h-4 bg-gray-500" />
                                )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div>
                                <h3 className="text-lg font-bold">{archetype.name}</h3>
                                <p className="text-sm">{archetype.description}</p>
                                <p className="text-sm mt-2">
                                  Level Requirement: {archetype.levelRequirement}
                                </p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='max-h-96 overflow-scroll'>
            <h2 className="text-xl font-bold text-gray-400 mb-2 ">Life Skills</h2>
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

export default PlayerSkillsPanel;