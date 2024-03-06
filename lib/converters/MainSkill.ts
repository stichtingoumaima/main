import { db } from "@/firebase";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  doc,
  collection,
} from "firebase/firestore";

export interface MainSkill {
  id?: string; // Optional to include document ID when needed
  playerId: string; // Ensure this is correctly populated or adjusted based on your data model
  name: string;
  xp: number;
  level: number;
}

const mainSkillConverter: FirestoreDataConverter<MainSkill> = {
  toFirestore(mainSkill: MainSkill): DocumentData {
    return {

      playerId: mainSkill.playerId,
      name: mainSkill.name,
      xp: mainSkill.xp,
      level: mainSkill.level,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): MainSkill {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      playerId: data.playerId, 
      name: data.name,
      xp: data.xp,
      level: data.level,
    };
  },
};

export const mainSkillRef = (playerId: string, mainSkillId?: string) => {
  // Optionally accepts a mainSkillId to reference specific documents
  return doc(collection(db, `players/${playerId}/mainSkills`), mainSkillId).withConverter(mainSkillConverter);
};