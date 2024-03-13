import { db } from "@/firebase";
import { doc, getDoc, setDoc, collection, query, where, getDocs, runTransaction } from "firebase/firestore";
import { playerConverter } from "../converters/Player";

export const initializePlayerData = async (userId: string) => {
  const playerDocRef = doc(db, "players", userId).withConverter(playerConverter);
  try {
    await runTransaction(db, async (transaction) => {
      const playerDoc = await transaction.get(playerDocRef);
      if (!playerDoc.exists()) {
        transaction.set(playerDocRef, {
          uid: userId,
          totalXP: 0,
          combatLevel: 1,
          gameSkills: {
            health: 1,
            stamina: 1,
            strength: 1,
            agility: 1,
            intelligence: 1,
            defense: 1,
          },
        });
        const archetypesRef = collection(db, `players/${userId}/archetypes`);
        const archetypesQuery = query(archetypesRef);
        const archetypesSnap = await getDocs(archetypesQuery);
        if (archetypesSnap.empty) {
          const archetypesData = [
            {
              name: "Unknown",
              description: "AI will craft a personalized skill tree based on your everyday tasks and activities, tailoring it to your unique lifestyle",
              gameSkillRef: "intelligence",
              levelRequirement: 1,
              tier: 1,
              unlocked: true
            },
            {
              name: "Unknown",
              description: "AI will craft a personalized skill tree based on your everyday tasks and activities, tailoring it to your unique lifestyle",
              gameSkillRef: "intelligence",
              levelRequirement: 2,
              tier: 2,
              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will craft a personalized skill tree based on your everyday tasks and activities, tailoring it to your unique lifestyle",
              gameSkillRef: "intelligence",
              levelRequirement: 5,
              tier: 3,
              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will craft a personalized skill tree based on your everyday tasks and activities, tailoring it to your unique lifestyle",
              gameSkillRef: "strength",
              levelRequirement: 1,
              tier: 1,
              unlocked: true
            },
            {
              name: "Unknown",
              description: "AI will craft a personalized skill tree based on your everyday tasks and activities, tailoring it to your unique lifestyle",
              gameSkillRef: "strength",
              levelRequirement: 2,
              tier: 2,
              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will craft a personalized skill tree based on your everyday tasks and activities, tailoring it to your unique lifestyle",
              gameSkillRef: "strength",
              levelRequirement: 5,
              tier: 3,
              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will craft a personalized skill tree based on your everyday tasks and activities, tailoring it to your unique lifestyle",
              gameSkillRef: "stamina",
              levelRequirement: 1,
              tier: 1,
              unlocked: true
            },
            {
              name: "Unknown",
              description: "AI will craft a personalized skill tree based on your everyday tasks and activities, tailoring it to your unique lifestyle",
              gameSkillRef: "stamina",
              levelRequirement: 2,
              tier: 2,
              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will craft a personalized skill tree based on your everyday tasks and activities, tailoring it to your unique lifestyle",
              gameSkillRef: "stamina",
              levelRequirement: 5,
              tier: 3,
              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will craft a personalized skill tree based on your everyday tasks and activities, tailoring it to your unique lifestyle",
              gameSkillRef: "agility",
              levelRequirement: 1,
              tier: 1,
              unlocked: true
            },
            {
              name: "Unknown",
              description: "AI will craft a personalized skill tree based on your everyday tasks and activities, tailoring it to your unique lifestyle",
              gameSkillRef: "agility",
              levelRequirement: 2,
              tier: 2,              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will craft a personalized skill tree based on your everyday tasks and activities, tailoring it to your unique lifestyle",
              gameSkillRef: "agility",
              levelRequirement: 5,              tier: 3,
              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will craft a personalized skill tree based on your everyday tasks and activities, tailoring it to your unique lifestyle",
              gameSkillRef: "defense",
              levelRequirement: 1,
              tier: 1,
              unlocked: true
            },
            {
              name: "Unknown",
              description: "AI will craft a personalized skill tree based on your everyday tasks and activities, tailoring it to your unique lifestyle",
              gameSkillRef: "defense",
              levelRequirement: 2,
              tier: 2,
              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will craft a personalized skill tree based on your everyday tasks and activities, tailoring it to your unique lifestyle",
              gameSkillRef: "defense",
              levelRequirement:3,              
              tier: 3,
              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will craft a personalized skill tree based on your everyday tasks and activities, tailoring it to your unique lifestyle",
              gameSkillRef: "health",
              levelRequirement: 1,
              tier: 1,
              unlocked: true
            },
            {
              name: "Unknown",
              description: "AI will craft a personalized skill tree based on your everyday tasks and activities, tailoring it to your unique lifestyle",
              gameSkillRef: "health",
              levelRequirement: 2,
              tier: 2,
              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will craft a personalized skill tree based on your everyday tasks and activities, tailoring it to your unique lifestyle",
              gameSkillRef: "health",
              levelRequirement: 5,
              tier: 3,
              unlocked: false,
            },
          ];
          archetypesData.forEach(archetype => {
            const newArchetypeRef = doc(collection(db, `players/${userId}/archetypes`));
            transaction.set(newArchetypeRef, archetype);          });
        }
      }
    });
  } catch (error) {
    console.error("Transaction failed: ", error);
    throw error;
  }
};