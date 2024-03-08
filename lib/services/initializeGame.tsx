import { db } from "@/firebase";
import { collection, doc, getDoc, runTransaction, setDoc, writeBatch } from "firebase/firestore";
// Assuming mainSkillsData includes predefined subskills for simplicity
const mainSkillsData = [
  {
    name: "Strength",
    subskills: [
      "Critical Thinking",
      "Problem Solving",
      "Learning Agility",
      "Memory",
    ],
  },
  {
    name: "Stamina",
    subskills: ["Endurance", "Flexibility", "Balance", "Speed"],
  },
  {
    name: "Technology",
    subskills: [
      "Coding",
      "Cybersecurity",
      "Data Analysis",
      "Tech Literacy",
      "Digital Collaboration",
    ],
  },
  {
    name: "Crafting",
    subskills: [
      "Woodworking",
      "Metalworking",
      "Painting",
      "Sculpting",
      "Drawing",
    ],
  },
  {
    name: "Speech",
    subskills: [
      "Public Speaking",
      "Empathy",
      "Teamwork",
      "Negotiation",
      "Networking",
    ],
  },
  {
    name: "Health",
    subskills: [
      "Research",
      "Philosophy",
      "Scientific Thinking",
      "Historical Analysis",
      "Logical Reasoning",
    ],
  },
];
export const initializePlayerData = async (userId: string) => {
  const playerDocRef = doc(db, "players", userId);

  try {
    await runTransaction(db, async (transaction) => {
      const playerDoc = await transaction.get(playerDocRef);
      
      // Check if the player data already exists
      if (playerDoc.exists()) {
        console.log("Player data already exists for this user.");
        return; // Exit if player data already exists
      }

      // Player data does not exist, proceed to initialize
      transaction.set(playerDocRef, {
        uid: userId,
        totalXP: 0,
        lifeSkillLevel: 1,
      });

      mainSkillsData.forEach((mainSkill) => {
        const mainSkillId = mainSkill.name.replace(/\s+/g, '_').toLowerCase();
        const mainSkillDocRef = doc(db, `players/${userId}/mainSkills`, mainSkillId);

        transaction.set(mainSkillDocRef, {
          name: mainSkill.name,
          xp: 0,
          level: 1,
        });

        mainSkill.subskills.forEach((subskillName) => {
          const subskillId = subskillName.replace(/\s+/g, '_').toLowerCase();
          const subskillDocRef = doc(collection(mainSkillDocRef, "subskills"), subskillId);
          
          transaction.set(subskillDocRef, {
            name: subskillName,
            xp: 0,
            level: 1,
          });
        });
      });
    });

    console.log("Initial player data created successfully.");
  } catch (e) {
    console.error("Transaction failed: ", e);
  }
};