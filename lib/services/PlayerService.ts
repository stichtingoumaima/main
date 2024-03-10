import { db } from "@/firebase";
import { lifeSkillsByNameRef, lifeSkillRef } from "../converters/LifeSkill";
import { playerRef, Player } from "../converters/Player";
import { doc, setDoc, getDoc, getDocs, increment, updateDoc, writeBatch } from "firebase/firestore";

const XP_THRESHOLD_PER_LEVEL = 1000;

export class SkillService {
  static async addXpToLifeSkill(userId: string, xpToAdd: number, skillName: string): Promise<void> {
    const sanitizedSkillName = skillName.trim().toLowerCase();

    const skillQuery = lifeSkillsByNameRef(userId, sanitizedSkillName);
    const querySnapshot = await getDocs(skillQuery);

    // Start a write batch for atomic operations
    const batch = writeBatch(db);

    if (querySnapshot.empty) {
      // Life skill does not exist, create a new one
      const newSkillRef = doc(db, `players/${userId}/lifeSkills`, sanitizedSkillName); // Create a document with a sanitized name as ID
      const initialLevel = Math.floor(xpToAdd / XP_THRESHOLD_PER_LEVEL) + (xpToAdd % XP_THRESHOLD_PER_LEVEL > 0 ? 1 : 0);
      
      batch.set(newSkillRef, {
        name: sanitizedSkillName,
        xp: xpToAdd,
        level: initialLevel,
      });

      // Update player's overall level and skill points as needed
      const levelsGained = initialLevel - 1; // Subtract 1 because level starts at 1
      if (levelsGained > 0) {
        await this.updatePlayerLevelsAndSkillPoints(batch, userId, levelsGained);
      }
    } else {
      // Life skill exists, update its XP and level
      for (const docSnapshot of querySnapshot.docs) {
        const skillData = docSnapshot.data();
        let newXP = skillData.xp + xpToAdd;
        let newLevel = skillData.level;
        let leveledUp = false;

        while (newXP >= XP_THRESHOLD_PER_LEVEL) {
          newXP -= XP_THRESHOLD_PER_LEVEL;
          newLevel++;
          leveledUp = true;
        }

        const skillRef = lifeSkillRef(userId, docSnapshot.id);
        batch.update(skillRef, { xp: newXP, level: newLevel });

        if (leveledUp) {
          await this.updatePlayerLevelsAndSkillPoints(batch, userId, newLevel - skillData.level);
        }
      }
    }

    // Commit the batch operation
    await batch.commit();
  }
  
  static async updatePlayerLevelsAndSkillPoints(batch: any, userId: string, levelsGained: number): Promise<void> {
    const playerDocumentRef = playerRef(userId);

    // Calculate new player level and skill points
    const playerSnap = await getDoc(playerDocumentRef);
    if (playerSnap.exists()) {
      const playerData = playerSnap.data() as Player;
      let additionalSkillPoints = Math.floor((playerData.lifeSkillsLevelSum + levelsGained) / 5) - Math.floor(playerData.lifeSkillsLevelSum / 5);
      let newLifeSkillsLevelSum = playerData.lifeSkillsLevelSum + levelsGained;

      // Update player's lifeSkillsLevelSum and skillPoints using the provided batch
      batch.update(playerDocumentRef, {
        lifeSkillsLevelSum: newLifeSkillsLevelSum,
        skillPoints: increment(additionalSkillPoints),
      });
    } else {
      console.log("Player document does not exist!");
    }
  }
}