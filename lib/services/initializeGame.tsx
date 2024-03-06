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

  // Check if the player document already exists
  if (playerDocSnapshot.exists()) {
    console.log("Player data already exists for this user.");
    return; // Exit the function if player data already exists
  }

  const batch = writeBatch(db);

  // Since the player document doesn't exist, initialize Player data
  batch.set(playerDocRef, {
    uid: userId,
    totalXP: 0,
    lifeSkillLevel: 1,
    // Additional initial player fields as necessary
  });

  // Loop through mainSkillsData to initialize MainSkills and Subskills
  mainSkillsData.forEach((mainSkill) => {
    const mainSkillDocRef = doc(collection(playerDocRef, "mainSkills")); // Create a new document reference for each mainSkill within the player's subcollection
    batch.set(mainSkillDocRef, {
      name: mainSkill.name,
      xp: 0,
      level: 1,
      // Any other initial fields for MainSkill
    });

    // Initialize Subskills for each MainSkill
    mainSkill.subskills.forEach(subskillName => {
      const subskillDocRef = doc(collection(mainSkillDocRef, "subskills")); // Create a new document reference for each subskill within the mainSkill's subcollection
      batch.set(subskillDocRef, {
        name: subskillName,
        xp: 0,
        level: 1,
        // Any other initial fields for Subskill
      });
    });
  });

  // Commit the batch
  await batch.commit();
  console.log("Initial player data created successfully.");
};