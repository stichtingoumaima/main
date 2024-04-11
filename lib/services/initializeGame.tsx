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
            activityType: "Initial",
            xpEarned: 100,
            skillImpacted: "Initial",
            statImpacted:"Initial",
            combatLevelAtTimeOfActivity: 1,
            timestamp: Timestamp.fromDate(new Date()), // Simulate workout done at game start
            reason:""
          },
    
        ];
        
        // Assuming the transaction and other setup from the previous example,
        // you would loop through `initialActivityLogs` to create each log:
        initialActivityLogs.forEach((log) => {
          const newActivityLogRef = doc(collection(db, `players/${userId}/activitylog`));
          transaction.set(newActivityLogRef.withConverter(activityLogConverter), log);
        });
 
      }
    });
  } catch (error) {
    console.error("Transaction failed: ", error);
    throw error;
  }
};