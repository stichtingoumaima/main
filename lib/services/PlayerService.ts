import { db } from "@/firebase";
import { lifeSkillsByNameRef, lifeSkillRef } from "../converters/LifeSkill";
import { playerRef, Player } from "../converters/Player";
import { doc, getDoc, getDocs, increment, updateDoc, writeBatch } from "firebase/firestore";

const XP_THRESHOLD_PER_LEVEL = 1000;
const XP_GAIN_PER_LIFESKILL_LEVEL_UP = 500;

export class SkillService {
  static async addXpToLifeSkill(userId: string, xpToAdd: number, skillName: string): Promise<void> {
    const sanitizedSkillName = skillName.trim().toLowerCase();

    const skillQuery = lifeSkillsByNameRef(userId, sanitizedSkillName);
    const querySnapshot = await getDocs(skillQuery);
    const batch = writeBatch(db);

    if (querySnapshot.empty) {
      // Life skill does not exist, create a new one
      const newSkillRef = doc(db, `players/${userId}/lifeSkills`, sanitizedSkillName);
      const initialLevel = Math.floor(xpToAdd / XP_THRESHOLD_PER_LEVEL) + (xpToAdd % XP_THRESHOLD_PER_LEVEL > 0 ? 1 : 0);
      batch.set(newSkillRef, { name: sanitizedSkillName, xp: xpToAdd, level: initialLevel });

      // Update player's overall XP and skill points as needed for the new skill levels
      const xpGainForPlayer = (initialLevel - 1) * XP_GAIN_PER_LIFESKILL_LEVEL_UP;
      if (xpGainForPlayer > 0) {
        await this.updatePlayerXPAndSkillPoints(batch, userId, xpGainForPlayer);
      }
    } else {
      // Life skill exists, update its XP and level
      for (const docSnapshot of querySnapshot.docs) {
        const skillData = docSnapshot.data();
        let newXP = skillData.xp + xpToAdd;
        let newLevel = skillData.level;
        let levelsGained = 0;

        while (newXP >= XP_THRESHOLD_PER_LEVEL) {
          newXP -= XP_THRESHOLD_PER_LEVEL;
          newLevel++;
          levelsGained++;
        }

        const skillRef = lifeSkillRef(userId, docSnapshot.id);
        batch.update(skillRef, { xp: newXP, level: newLevel });

        if (levelsGained > 0) {
          const xpGainForPlayer = levelsGained * XP_GAIN_PER_LIFESKILL_LEVEL_UP;
          await this.updatePlayerXPAndSkillPoints(batch, userId, xpGainForPlayer);
        }
      }
    }

    await batch.commit();
  }

  static async updatePlayerXPAndSkillPoints(batch: any, userId: string, xpGained: number): Promise<void> {
    const playerDocumentRef = playerRef(userId);
    const playerSnap = await getDoc(playerDocumentRef);

    if (playerSnap.exists()) {
      const playerData = playerSnap.data();
      let newTotalXP = playerData.totalXP + xpGained;

      let newCombatLevel = this.calculateCombatLevel(newTotalXP);
      let additionalSkillPoints = this.calculateAdditionalSkillPoints(playerData.combatLevel, newCombatLevel);

      batch.update(playerDocumentRef, {
        totalXP: newTotalXP,
        combatLevel: newCombatLevel,
        skillPoints: increment(additionalSkillPoints),
      });
    } else {
      console.log("Player document does not exist!");
    }
  }

  static calculateCombatLevel(totalXP: number): number {
    return Math.floor(totalXP / XP_THRESHOLD_PER_LEVEL);
  }

  static calculateAdditionalSkillPoints(oldCombatLevel: number, newCombatLevel: number): number {
    return (newCombatLevel - oldCombatLevel) * 1; // Example: 1 skill point per level
  }
}