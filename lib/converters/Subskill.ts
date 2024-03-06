import {
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  doc,
  collection,
  DocumentReference,
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
      throw new Error("mainSkillRef is missing or invalid in the subskill document");
    }
    // Additional checks for other fields can be added here as needed.
    if (typeof data.name !== 'string' || typeof data.xp !== 'number' || typeof data.level !== 'number') {
      throw new Error("One or more fields are missing or invalid in the subskill document");
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

export const subskillRef = (mainSkillId: string, subskillId?: string) => {
  // When subskillId is provided, it creates a reference to an existing document.
  // When subskillId is not provided, it implies creating a new document with an auto-generated ID.
  return doc(collection(db, `mainSkills/${mainSkillId}/subskills`), subskillId).withConverter(subskillConverter);
};