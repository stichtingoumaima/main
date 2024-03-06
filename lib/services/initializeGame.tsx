import { db } from "@/firebase";
import { collection, doc, getDoc, setDoc, writeBatch } from "firebase/firestore";
// Assuming mainSkillsData includes predefined subskills for simplicity
const mainSkillsData = [
  {
    name: "Mind Mastery",
    subskills: [
      "Critical Thinking",
      "Problem Solving",
      "Learning Agility",
      "Memory",
    ],
  },
  {
    name: "Physical Prowess",
    subskills: ["Endurance", "Strength", "Flexibility", "Balance", "Speed"],
  },
  {
    name: "Technological Fluency",
    subskills: [
      "Coding",
      "Cybersecurity",
      "Data Analysis",
      "Tech Literacy",
      "Digital Collaboration",
    ],
  },
  {
    name: "Craftsman's Touch",
    subskills: [
      "Woodworking",
      "Metalworking",
      "Painting",
      "Sculpting",
      "Drawing",
    ],
  },
  {
    name: "Social Navigator",
    subskills: [
      "Public Speaking",
      "Empathy",
      "Teamwork",
      "Negotiation",
      "Networking",
    ],
  },
  {
    name: "Truth Seeker",
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
  const playerDocSnapshot = await getDoc(playerDocRef);

  if (playerDocSnapshot.exists()) {
    console.log("Player data already exists for this user.");
    return;
  }

  const batch = writeBatch(db);
  batch.set(playerDocRef, {
    uid: userId,
    totalXP: 0,
    lifeSkillLevel: 1,
  });

  mainSkillsData.forEach((mainSkill) => {
    // Generate a deterministic document ID for each MainSkill based on its name
    const mainSkillId = mainSkill.name.replace(/\s+/g, '_').toLowerCase();
    const mainSkillDocRef = doc(db, `players/${userId}/mainSkills`, mainSkillId);
    batch.set(mainSkillDocRef, {
      name: mainSkill.name,
      xp: 0,
      level: 1,
    });

    mainSkill.subskills.forEach((subskillName, index) => {
      // For subskills, you could continue to use auto-generated IDs, or use a similar approach for deterministic IDs
      const subskillDocRef = doc(collection(mainSkillDocRef, "subskills"));
      batch.set(subskillDocRef, {
        name: subskillName,
        xp: 0,
        level: 1,
      });
    });
  });

  await batch.commit();
  console.log("Initial player data created successfully.");
};