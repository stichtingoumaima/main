import { db } from "@/firebase";
import {
  doc,
  runTransaction,
  collection,
  query,
  where,
  getDocs,
  limit,
  increment,
  writeBatch
} from "firebase/firestore";
import { MainSkill } from "../converters/MainSkill";
import { Player } from "../converters/Player";
import { Subskill } from "../converters/Subskill";

export const addXpToFirstSubskillAndUpdateLifeSkill = async (userId: string, xpToAdd: number, skillName?: string): Promise<void> => {
  const playerRef = doc(db, "players", userId);
  const mainSkillsQuery = query(collection(db, `players/${userId}/mainSkills`), limit(1));
  const mainSkillsSnap = await getDocs(mainSkillsQuery);

  if (mainSkillsSnap.empty) {
    throw new Error("No main skills found for this user.");
  }

  const firstMainSkillRef = mainSkillsSnap.docs[0].ref;
  const subskillsQuery = skillName
    ? query(collection(firstMainSkillRef, "subskills"), where("name", "==", skillName), limit(1))
    : query(collection(firstMainSkillRef, "subskills"), limit(1));

  const subSkillsSnap = await getDocs(subskillsQuery);

  let subSkillRef = doc(collection(firstMainSkillRef, "subskills"));
  let isNewSubSkill = true;
  let newSubSkillXp = xpToAdd;

  // If skillName is provided and found, use it. Otherwise, create a new subskill
  if (!subSkillsSnap.empty) {
    subSkillRef = subSkillsSnap.docs[0].ref;
    isNewSubSkill = false;
    const subSkillDoc = await getDocs(query(collection(firstMainSkillRef, "subskills"), where("name", "==", skillName), limit(1)));
    const subSkillData = subSkillDoc.docs[0].data() as Subskill;
    newSubSkillXp += subSkillData.xp;
  }

  await runTransaction(db, async (transaction) => {
    const firstMainSkillDoc = await transaction.get(firstMainSkillRef);
    const playerDoc = await transaction.get(playerRef);

    // Calculate level ups
    let subSkillLevelUps = Math.floor(newSubSkillXp / 1000);
    newSubSkillXp %= 1000;

    // Write the new or updated subskill
    if (isNewSubSkill) {
      transaction.set(subSkillRef, {
        name: skillName || 'New Skill',
        xp: newSubSkillXp,
        level: subSkillLevelUps + 1, // Level starts at 1 and increments with level-ups
        mainSkillRef: firstMainSkillRef.path
      });
    } else {
      transaction.update(subSkillRef, {
        xp: newSubSkillXp,
        level: increment(subSkillLevelUps)
      });
    }

    // Update main skill and player's life skill
    if (subSkillLevelUps > 0) {
      const mainSkillData = firstMainSkillDoc.data() as MainSkill;
      const extraXpForMainSkill = 500 * subSkillLevelUps;
      let newMainSkillXp = mainSkillData.xp + extraXpForMainSkill;
      let mainSkillLevelUps = Math.floor(newMainSkillXp / 1000);
      newMainSkillXp %= 1000;

      transaction.update(firstMainSkillRef, {
        xp: newMainSkillXp,
        level: increment(mainSkillLevelUps)
      });

      const updatedTotalLevels = 1 + mainSkillLevelUps;
      const newLifeSkillLevel = Math.floor(updatedTotalLevels / 6);
      if (newLifeSkillLevel > (playerDoc.data() as Player).lifeSkillLevel) {
        transaction.update(playerRef, { lifeSkillLevel: newLifeSkillLevel });
      }
    }
  });
};