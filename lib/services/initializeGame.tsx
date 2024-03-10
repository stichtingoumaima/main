import { db } from "@/firebase";
import { doc, getDoc, setDoc, runTransaction } from "firebase/firestore";
import { playerConverter } from "../converters/Player";
import { lifeSkillConverter } from "../converters/LifeSkill";

export const initializePlayerData = async (userId: string) => {
  const playerDocRef = doc(db, "players", userId).withConverter(playerConverter);
  const playerDoc = await getDoc(playerDocRef);

  if (!playerDoc.exists()) {
    // Initialize player if not exists
    await setDoc(playerDocRef, {
      uid: userId,
      totalXP: 0,
      combatLevel: 1,
      skillPoints: 0,
      gameSkills: {
        health: 100,
        stamina: 100,
        strength: 10,
        agility: 10,
        intelligence: 10,
        defense: 10,
      },
    });
  }

  // Define life skills data
  const lifeSkillsData = [
    { name: 'coding', xp: 0, level: 1 },
    { name: 'cooking', xp: 0, level: 1 },
    // Add more life skills as needed
  ];

  // Initialize life skills
  lifeSkillsData.forEach(async (skill) => {
    const skillId = `${skill.name.toLowerCase()}`; // Using skill name as part of document ID for predictability
    const skillDocRef = doc(db, `players/${userId}/lifeSkills`, skillId).withConverter(lifeSkillConverter);

    await runTransaction(db, async (transaction) => {
      const skillDoc = await transaction.get(skillDocRef);
      if (!skillDoc.exists()) {
        transaction.set(skillDocRef, { ...skill, playerId: userId });
      }
      // If it exists, no action is taken, preventing duplicates
    }).catch((error) => {
      console.error("Transaction failed: ", error);
    });
  });
};