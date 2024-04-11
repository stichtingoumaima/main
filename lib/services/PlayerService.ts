import { db } from "@/firebase";
import {
  doc,
  getDoc,
  getDocs,
  writeBatch,
  query,
  where,
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { lifeSkillRef, lifeSkillsByNameRef } from "../converters/LifeSkill";
import { playerConverter } from "../converters/Player";

const XP_THRESHOLD_PER_LEVEL = 1000;
const XP_GAIN_PER_LIFESKILL_LEVEL_UP = 500;
const TOTAL_SKILL_POINTS_ON_LEVEL_UP = 10;

export class SkillService {
  static async addXpToLifeSkill(userId: string, xpToAdd: number, skillName: string, statName: string): Promise<void> {
    const sanitizedSkillName = skillName.trim().toLowerCase();
    const skillQuery = lifeSkillsByNameRef(userId, sanitizedSkillName);
    const querySnapshot = await getDocs(skillQuery);

    if (querySnapshot.empty) {
      const batch = writeBatch(db);
      await this.createAndSetNewSkill(batch, userId, sanitizedSkillName, xpToAdd, statName);
      await batch.commit(); // Commit the batch for skill creation
    } else {
      // For existing skills, a new batch will be created inside updateExistingSkill
      await this.updateExistingSkill(userId, querySnapshot, xpToAdd);
    }
  }

  static async createAndSetNewSkill(batch: any, userId: string, skillName: string, xpToAdd: number, statName: string): Promise<void> {
    const newSkillRef = doc(db, `players/${userId}/lifeSkills`, skillName);
    const initialLevel = Math.floor(xpToAdd / XP_THRESHOLD_PER_LEVEL) + (xpToAdd % XP_THRESHOLD_PER_LEVEL > 0 ? 1 : 0);
    const xpGainForPlayer = (initialLevel - 1) * XP_GAIN_PER_LIFESKILL_LEVEL_UP;

    batch.set(newSkillRef, { name: skillName, xp: xpToAdd, level: initialLevel });

    if (xpGainForPlayer > 0) {
      await this.updatePlayerXPAndSkillPoints(batch, userId, xpGainForPlayer);
    }

    // Await the batch commit in the calling method after processing the archetypes
    const generateRef = await addDoc(collection(db, "generate"), {
      skill: skillName,
      timestamp: serverTimestamp(),
    });

    // Listen for the generated archetypes in the output field
    onSnapshot(generateRef, async (docSnapshot) => {
      const data = docSnapshot.data();
      if (data && data.output) {
        const jsonArrayStartIndex = data.output.indexOf('[');
        if (jsonArrayStartIndex !== -1) {
          const cleanOutput = data.output.substring(jsonArrayStartIndex);
          try {
            const archetypes = JSON.parse(cleanOutput) as Array<any>;
            const archetypeBatch = writeBatch(db); // Create a new batch for archetypes
            archetypes.forEach((archetype) => {
              const modifiedArchetype = { ...archetype, gameSkillRef: statName, unlocked: false };
              const archetypeRef = doc(collection(db, `players/${userId}/archetypes`));
              archetypeBatch.set(archetypeRef, modifiedArchetype);
            });
            await archetypeBatch.commit();
          } catch (error) {
            console.error("Error parsing archetypes data:", error);
          }
        }
      }
    });
  }

  // Adjusted to create its own batch as it might be called independently
  static async updateExistingSkill(userId: string, querySnapshot: any, xpToAdd: number): Promise<void> {
    const batch = writeBatch(db);
    for (const docSnapshot of querySnapshot.docs) {
      let { xp, level } = docSnapshot.data();
      xp += xpToAdd;
      let levelsGained = 0;

      while (xp >= XP_THRESHOLD_PER_LEVEL) {
        xp -= XP_THRESHOLD_PER_LEVEL;
        level++;
        levelsGained++;
      }

      const skillRef = lifeSkillRef(userId, docSnapshot.id);
      batch.update(skillRef, { xp, level });

      if (levelsGained > 0) {
        await this.updatePlayerXPAndSkillPoints(batch, userId, levelsGained * XP_GAIN_PER_LIFESKILL_LEVEL_UP);
      }
    }

    await batch.commit();
  }


    static async updatePlayerXPAndSkillPoints(batch: any, userId: string, xpGained: number): Promise<void> {
        const playerDocumentRef = doc(db, "players", userId).withConverter(playerConverter);
        const playerSnap = await getDoc(playerDocumentRef);

        if (playerSnap.exists()) {
            const playerData = playerSnap.data();
            let newTotalXP = playerData.totalXP + xpGained;
            let newCombatLevel = this.calculateCombatLevel(newTotalXP);

            // Check for level up
            if (newCombatLevel > playerData.combatLevel) {
                const skillPointsAllocation = await this.calculateSkillPointsAllocation(userId, playerData.combatLevel);
                let gameSkillsUpdates = {};
                Object.entries(skillPointsAllocation).forEach(([stat, points]) => {
                    gameSkillsUpdates[`gameSkills.${stat}`] = increment(points);
                });

                batch.update(playerDocumentRef, {
                    ...gameSkillsUpdates,
                    totalXP: newTotalXP,
                    combatLevel: newCombatLevel,
                });
            } else {
                batch.update(playerDocumentRef, {
                    totalXP: newTotalXP,
                    combatLevel: newCombatLevel,
                });
            }
        } else {
            console.log("Player document does not exist!");
        }

        await batch.commit();
    }

    static calculateCombatLevel(totalXP: number): number {
        return Math.floor(totalXP / XP_THRESHOLD_PER_LEVEL);
    }

    static async calculateSkillPointsAllocation(userId: string, combatLevel: number): Promise<{[key: string]: number}> {
        const activitiesRef = collection(db, `players/${userId}/activitylog`);
        const q = query(activitiesRef, where("combatLevelAtTimeOfActivity", "==", combatLevel));
        const querySnapshot = await getDocs(q);
        let statImpacts = {};

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            statImpacts[data.statImpacted] = (statImpacts[data.statImpacted] || 0) + 1;
        });

        const totalActivities = querySnapshot.docs.length;
        let skillPointsAllocation = {};
        
        Object.keys(statImpacts).forEach((stat) => {
            const percentage = statImpacts[stat] / totalActivities;
            skillPointsAllocation[stat] = Math.round(TOTAL_SKILL_POINTS_ON_LEVEL_UP * percentage);
        });

        return skillPointsAllocation;
    }
    
}