import { db } from "@/firebase";
import { doc, getDoc, setDoc, collection, query, where, getDocs, runTransaction, Timestamp } from "firebase/firestore";
import { playerConverter } from "../converters/Player";
import { activityLogConverter } from "../converters/ActivityLogs";

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

        // Add initial activity log for the player
        const initialActivityLogs = [
          {
            activityType: "Morning Workout",
            xpEarned: 100,
            skillImpacted: "fitness",
            statImpacted:"strength",
            combatLevelAtTimeOfActivity: 1,
            timestamp: Timestamp.fromDate(new Date()), // Simulate workout done at game start
            reason:""
          },
          {
            activityType: "Read a Book",
            xpEarned: 150,
            skillImpacted: "Intelligence",
            statImpacted:"strength",
            combatLevelAtTimeOfActivity: 1,
            timestamp: Timestamp.fromDate(new Date()), // Simulate reading done at game start
            reason:""
          },
          {
            activityType: "Healthy Eating",
            xpEarned: 75,
            skillImpacted: "Health",
            statImpacted:"strength",
            combatLevelAtTimeOfActivity: 1,
            timestamp: Timestamp.fromDate(new Date()), // Simulate healthy meal at game start
            reason:""
          },
        ];
        
        // Assuming the transaction and other setup from the previous example,
        // you would loop through `initialActivityLogs` to create each log:
        initialActivityLogs.forEach((log) => {
          const newActivityLogRef = doc(collection(db, `players/${userId}/activitylog`));
          transaction.set(newActivityLogRef.withConverter(activityLogConverter), log);
        });
        const archetypesRef = collection(db, `players/${userId}/archetypes`);
        const archetypesQuery = query(archetypesRef);
        const archetypesSnap = await getDocs(archetypesQuery);
        if (archetypesSnap.empty) {
          const archetypesData = [
            {
              name: "Unknown",
              description: "AI will generate a tailored skilltree progression based on your daily tasks",
              gameSkillRef: "intelligence",
              levelRequirement: 1,
              tier: 1,
              unlocked: true
            },
            {
              name: "Unknown",
              description: "AI will generate a tailored skilltree progression based on your daily tasks",
              gameSkillRef: "intelligence",
              levelRequirement: 2,
              tier: 2,
              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will generate a tailored skilltree progression based on your daily tasks",
              gameSkillRef: "intelligence",
              levelRequirement: 5,
              tier: 3,
              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will generate a tailored skilltree progression based on your daily tasks",
              gameSkillRef: "strength",
              levelRequirement: 1,
              tier: 1,
              unlocked: true
            },
            {
              name: "Unknown",
              description: "AI will generate a tailored skilltree progression based on your daily tasks",
              gameSkillRef: "strength",
              levelRequirement: 2,
              tier: 2,
              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will generate a tailored skilltree progression based on your daily tasks",
              gameSkillRef: "strength",
              levelRequirement: 5,
              tier: 3,
              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will generate a tailored skilltree progression based on your daily tasks",
              gameSkillRef: "stamina",
              levelRequirement: 1,
              tier: 1,
              unlocked: true
            },
            {
              name: "Unknown",
              description: "AI will generate a tailored skilltree progression based on your daily tasks",
              gameSkillRef: "stamina",
              levelRequirement: 2,
              tier: 2,
              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will generate a tailored skilltree progression based on your daily tasks",
              gameSkillRef: "stamina",
              levelRequirement: 5,
              tier: 3,
              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will generate a tailored skilltree progression based on your daily tasks",
              gameSkillRef: "agility",
              levelRequirement: 1,
              tier: 1,
              unlocked: true
            },
            {
              name: "Unknown",
              description: "AI will generate a tailored skilltree progression based on your daily tasks",
              gameSkillRef: "agility",
              levelRequirement: 2,
              tier: 2,              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will generate a tailored skilltree progression based on your daily tasks",
              gameSkillRef: "agility",
              levelRequirement: 5,              tier: 3,
              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will generate a tailored skilltree progression based on your daily tasks",
              gameSkillRef: "defense",
              levelRequirement: 1,
              tier: 1,
              unlocked: true
            },
            {
              name: "Unknown",
              description: "AI will generate a tailored skilltree progression based on your daily tasks",
              gameSkillRef: "defense",
              levelRequirement: 2,
              tier: 2,
              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will generate a tailored skilltree progression based on your daily tasks",
              gameSkillRef: "defense",
              levelRequirement:3,              
              tier: 3,
              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will generate a tailored skilltree progression based on your daily tasks",
              gameSkillRef: "health",
              levelRequirement: 1,
              tier: 1,
              unlocked: true
            },
            {
              name: "Unknown",
              description: "AI will generate a tailored skilltree progression based on your daily tasks",
              gameSkillRef: "health",
              levelRequirement: 2,
              tier: 2,
              unlocked: false,
            },
            {
              name: "Unknown",
              description: "AI will generate a tailored skilltree progression based on your daily tasks",
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