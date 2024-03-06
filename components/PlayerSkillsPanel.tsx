"use client"
import React, { useEffect, useState } from 'react';
import { db } from "@/firebase";
import { collection, doc, getDocs } from "firebase/firestore";

const PlayerSkillsPanel = ({ userId }: { userId: string }) => {
  const [mainSkills, setMainSkills] = useState<any[]>([]);

  const fetchPlayerSkills = async () => {
    const playerMainSkillsRef = collection(db, `players/${userId}/mainSkills`);
    const mainSkillsSnap = await getDocs(playerMainSkillsRef);
    const mainSkillsData = await Promise.all(mainSkillsSnap.docs.map(async (mainSkillDoc) => {
      const mainSkillData = mainSkillDoc.data();
      const subskillsRef = collection(mainSkillDoc.ref, "subskills");
      const subskillsSnap = await getDocs(subskillsRef);
      const subskills = subskillsSnap.docs.map(doc => doc.data());
      return { ...mainSkillData, subskills };
    }));
    setMainSkills(mainSkillsData);
  };

  useEffect(() => {
    fetchPlayerSkills();
  }, [userId]);

  return (
    <div className="flex flex-col w-1/6 h-screen bg-slate-900 text-white overflow-y-auto">
      <div className="p-4 space-y-4">
        {mainSkills.map((mainSkill, index) => (
          <div key={index} className="group bg-green-800 p-2 rounded-lg shadow-md space-y-2">
            <p className="text-xl font-bold">{mainSkill.name} - Level {mainSkill.level}</p>
            <div className="bg-gray-900 p-2 rounded-lg">
              <p className="text-lg font-semibold">Subskills</p>
              <div className="space-y-1">
                {mainSkill.subskills.map((subskill: any, subIndex: number) => (
                  <div key={subIndex}>
                    <p className="text-sm">{subskill.name} Level {subskill.level} - {subskill.xp}%</p>
                    <progress className="progress progress-info w-full" value={subskill.xp} max="100"></progress>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerSkillsPanel;