import {
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  doc,
  collection,
  DocumentReference,
  where,
  query,
} from "firebase/firestore";
import { db } from "@/firebase";

export interface Subskill {
  id?: string; // Optional because it's not present when writing new documents.
  mainSkillRef: string; // The path of the MainSkill document as a string.
  name: string;
  xp: number;
  level: number;
}

export const subskillConverter: FirestoreDataConverter<Subskill> = {
  toFirestore(subskill: Subskill): DocumentData {
    return {
      mainSkillRef: subskill.mainSkillRef,
      name: subskill.name,
      xp: subskill.xp,
      level: subskill.level,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Subskill {
    const data = snapshot.data(options);
  
    if (!data.mainSkillRef || typeof data.mainSkillRef !== 'string') {
      // If mainSkillRef is not available or not a string, you may want to handle this error appropriately
      console.error("mainSkillRef is missing or not a string in the document with id:", snapshot.id);
      throw new Error("mainSkillRef is missing or invalid in the subskill document");
    }
  
    return {
      id: snapshot.id,
      mainSkillRef: data.mainSkillRef, // This is already expected to be a string.
      name: data.name,
      xp: data.xp,
      level: data.level,
    };
  },
};

export const subskillRef = (userId: string, mainSkillId: string, subskillId: string) =>
    doc(db, "players", userId, "mainSkills", mainSkillId, "subskills", subskillId).withConverter(subskillConverter);

export const subskillsCollectionRef = (userId: string, mainSkillId: string) =>
    collection(db, "players", userId, "mainSkills", mainSkillId, "subskills").withConverter(subskillConverter);

export const subskillsByLevelRef = (userId: string, mainSkillId: string, level: number) =>
    query(collection(db, "players", userId, "mainSkills", mainSkillId, "subskills"), where("level", "==", level)).withConverter(subskillConverter);