"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { query, where, collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Sword, BookOpen, Calendar, Award, CheckSquare, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";
import { activityLogConverter } from "@/lib/converters/ActivityLogs";
import { playerConverter } from "@/lib/converters/Player";

const ActivityLogs = () => {
  const { data: session } = useSession();
  const [selectedCombatLevel, setSelectedCombatLevel] = useState(1);
  const [combatLevels, setCombatLevels] = useState<number[]>([]);
  const activityLogsQuery = query(
    collection(db, `players/${session?.user?.id}/activitylog`),
    where("combatLevelAtTimeOfActivity", "==", selectedCombatLevel)
  ).withConverter(activityLogConverter);

  const [activityLogs, loading, error] = useCollection(activityLogsQuery);

  // Fetch player combat levels dynamically
  useEffect(() => {
    const fetchCombatLevels = async () => {
      if (session?.user?.id) {
        const playerRef = doc(db, "players", session.user.id).withConverter(playerConverter);
        const playerSnap = await getDoc(playerRef);
        if (playerSnap.exists()) {
          const playerData = playerSnap.data();
          const levels = []; // Assume we have a method to calculate levels based on player data
          // Populate levels array based on your logic, for now, let's just assume it's 1 to player's current combat level
          for (let i = 1; i <= playerData.combatLevel; i++) {
            levels.push(i);
          }
          setCombatLevels(levels);
        } else {
          console.error("Player does not exist!");
        }
      }
    };

    fetchCombatLevels();
  }, [session?.user?.id]);

  const activityLogsData = activityLogs?.docs.map((doc) => doc.data()) || [];
  const cardVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Animation variants
  const listItemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <div className="flex justify-center items-start pt-24 backdrop-blur-sm bg-opacity-50" style={{height: 'calc(100vh - 96px)'}}>
      <div className="w-1/3 text-white p-2 shadow-xl" style={{ height: '85vh', overflowY: 'auto' }}>
        <ul className="space-y-2">
          {combatLevels.map((level) => (
            <motion.li
              key={level}
              initial={false}
              animate={
                selectedCombatLevel === level
                  ? { scale: 1.1, backgroundColor: "#EDE5D8", color: "#44516A" }
                  : { scale: 1, backgroundColor: "#2B3848" }
              }
              transition={{ type: "spring", stiffness: 300 }}
              className={`flex items-center px-4 py-2 h-20 bg-opacity-90 hover:bg-[#EDE5D8] cursor-pointer font-extrabold text-xl`}
              onClick={() => setSelectedCombatLevel(level)}
            >
              <Sword className="mr-3 text-lg text-[#44516A] hover:text-[#2B3848]" />
              Combat Level {level}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="flex-1 max-w-4xl bg-[#F5F2EB] shadow-xl ml-8 p-5 text-gray-700 overflow-auto" style={{ maxHeight: '85vh' }}>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        <div className="space-y-4">
          {activityLogsData.map((log, index) => (
            <motion.div
              key={index} // Added a key here for each child in a list should have a unique "key" prop.
              className="bg-white rounded-lg p-4 shadow-lg flex flex-col md:flex-row gap-4 mb-4"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4">
                <BookOpen className="text-xl text-[#44516A]" />
                <div>
                  <h4 className="font-bold">{log.activityType}</h4>
                  <p className="text-sm">Skill Impacted: {log.skillImpacted}</p>
                  <p className="text-sm">Stat Impacted: {log.statImpacted}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <BrainCircuit className="text-xl text-[#44516A]" />
                <div>
                  <h4 className="font-bold">AI Reason</h4>
                  <p className="text-sm">{log.reason}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Award className="text-xl text-[#44516A]" />
                <span className="font-bold">{log.xpEarned} XP</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-[#44516A] hover:bg-[#2B3848] text-white rounded-lg font-bold text-sm transition-colors self-start md:self-center"
              >
                Claim
              </motion.button>
              <div className="flex items-center gap-2">
                <Calendar className="text-xl text-[#44516A]" />
                <span className="text-sm">
                  {new Date(log.timestamp).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        {activityLogsData.length === 0 && !loading && (
          <div>No activity logs found.</div>
        )}
      </div>
    </div>
  );
};

export default ActivityLogs;
