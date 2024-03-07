"use client"
import React, { useEffect, useState } from 'react';
import { db } from "@/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { MainSkill } from '@/lib/converters/MainSkill';
import { Subskill } from '@/lib/converters/Subskill';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon } from 'lucide-react';
import { LightningBoltIcon } from '@radix-ui/react-icons';

const PlayerSkillsPanel: React.FC<{ userId: string }> = ({ userId }) => {
  const [mainSkills, setMainSkills] = useState<MainSkill[]>([]);

  useEffect(() => {
    const playerMainSkillsRef = collection(db, `players/${userId}/mainSkills`);

    const unsubscribe = onSnapshot(playerMainSkillsRef, (mainSkillsSnap) => {
      const mainSkillsData = mainSkillsSnap.docs.map(async (doc) => {
        const mainSkillData = doc.data() as Omit<MainSkill, 'subskills'>;
        const subskillsRef = collection(doc.ref, "subskills");

        const subskills: Subskill[] = await new Promise((resolve) => {
          onSnapshot(subskillsRef, (subskillsSnap) => {
            resolve(subskillsSnap.docs.map((doc) => {
              const subskillData = doc.data() as Subskill;
              return { ...subskillData, xp: (subskillData.xp / 1000) * 100 };
            }));
          });
        });

        return { ...mainSkillData, subskills, id: doc.id };
      });

      Promise.all(mainSkillsData).then(setMainSkills);
    });

    return () => unsubscribe();
  }, [userId]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 10 } },
  };

  const progressBarVariants = {
    initial: { width: 0 },
    animate: (xp: number) => ({ width: `${xp}%`, transition: { duration: 1, ease: "easeInOut" } }),
  };

  return (
    <motion.div
      className="flex flex-col w-full md:w-1/3 lg:w-1/4 h-screen  text-white overflow-y-auto p-4 space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {mainSkills.map((mainSkill, index) => (
          <motion.div
            key={mainSkill.id}
            className="bg-gradient-to-r bg-opacity-30 from-gray-700 via-gray-800 to-gray-900 p-4 rounded-xl shadow-xl transform transition duration-500 hover:scale-105"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center">
                <StarIcon className="w-6 h-6 mr-2 text-yellow-400 animate-pulse" />
                {mainSkill.name} - Level {mainSkill.level}
              </h3>
              <LightningBoltIcon className="w-6 h-6 text-yellow-500 animate-bounce" />
            </div>
            <motion.div className="mt-4">
              <p className="text-lg font-semibold mb-2">Subskills</p>
              {mainSkill.subskills.map((subskill, subIndex) => (
                <motion.div key={subskill.id} className="mt-3" variants={itemVariants}>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">{subskill.name}</div>
                    <div className="text-xs font-light text-gray-300">Lvl {subskill.level}</div>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2 dark:bg-gray-700 mt-2 overflow-hidden">
                    <motion.div
                      className="bg-blue-500 h-2 rounded-full"
                      variants={progressBarVariants}
                      custom={subskill.xp}
                      initial="initial"
                      animate="animate"
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default PlayerSkillsPanel;