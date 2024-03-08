import { db } from "@/firebase";
import {
  doc,
  runTransaction,
  collection,
  query,
  getDocs,
  limit,
  increment,

} from "firebase/firestore";
import { Subskill } from "../converters/Subskill";
import { MainSkill } from "../converters/MainSkill";
import { Player } from "../converters/Player";

export const addXpToFirstSubskillAndUpdateLifeSkill = async (userId: string, xpToAdd: number): Promise<void> => {
  await runTransaction(db, async (transaction) => {
    const playerRef = doc(db, "players", userId);

    // Pre-fetch all main skills to calculate the initial total levels
    const allMainSkillsSnap = await getDocs(collection(db, `players/${userId}/mainSkills`));
    const initialTotalLevels = allMainSkillsSnap.docs.reduce((sum, doc) => sum + (doc.data() as MainSkill).level, 0);

    // Identify and fetch the first main skill and its first subskill
    const firstMainSkillSnap = await getDocs(query(collection(db, `players/${userId}/mainSkills`), limit(1)));
    if (firstMainSkillSnap.empty) {
      throw new Error("No main skills found for this user.");
    }
    const firstMainSkillRef = firstMainSkillSnap.docs[0].ref;
    const firstSubSkillSnap = await getDocs(query(collection(firstMainSkillRef, "subskills"), limit(1)));
    if (firstSubSkillSnap.empty) {
      throw new Error("No subskills found for the main skill.");
    }
    const firstSubskillRef = firstSubSkillSnap.docs[0].ref;

    // Perform transaction updates
    const firstSubskillDoc = await transaction.get(firstSubskillRef);
    const firstMainSkillDoc = await transaction.get(firstMainSkillRef);
    const playerDoc = await transaction.get(playerRef);

    // Validate existence of documents
    if (!firstSubskillDoc.exists || !firstMainSkillDoc.exists || !playerDoc.exists) {
      throw new Error("Required document does not exist.");
    }

    // Update XP and level for subskill and main skill
    let subSkillData = firstSubskillDoc.data() as Subskill;
    let newSubSkillXp = subSkillData.xp + xpToAdd;
    let subSkillLevelUps = 0;

    while (newSubSkillXp >= 1000) {
      newSubSkillXp -= 1000;
      subSkillLevelUps++;
    }
    transaction.update(firstSubskillRef, {
      xp: newSubSkillXp,
      level: increment(subSkillLevelUps),
    });

    // Update main skill based on subskill level up
    if (subSkillLevelUps > 0) {
      let mainSkillData = firstMainSkillDoc.data() as MainSkill;
      let extraXpForMainSkill = 500 * subSkillLevelUps;
      let newMainSkillXp = mainSkillData.xp + extraXpForMainSkill;
      let mainSkillLevelUps = 0;

      while (newMainSkillXp >= 1000) {
        newMainSkillXp -= 1000;
        mainSkillLevelUps++;
      }

      transaction.update(firstMainSkillRef, {
        xp: newMainSkillXp,
        level: increment(mainSkillLevelUps),
      });

      // Recalculate total levels after potential level-ups to update life skill level if needed
      const updatedTotalLevels = initialTotalLevels + mainSkillLevelUps; // This assumes only the first main skill can level up in this transaction
      const newLifeSkillLevel = Math.floor(updatedTotalLevels / 6);

      if (newLifeSkillLevel > (playerDoc.data() as Player).lifeSkillLevel) {
        transaction.update(playerRef, { lifeSkillLevel: newLifeSkillLevel });
      }
    }
  });
};