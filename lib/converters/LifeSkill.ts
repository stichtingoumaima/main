import { db } from "@/firebase";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  doc,
  collection,
  where,
  query,
} from "firebase/firestore";

export interface LifeSkill {
  id?: string; // Optional to include document ID when needed
  playerId: string; // Ensure this is correctly populated or adjusted based on your data model
  name: string;
  xp: number;
  level: number;
}

export const lifeSkillConverter: FirestoreDataConverter<LifeSkill> = {
  toFirestore(lifeSkill: LifeSkill): DocumentData {
    return {
      playerId: lifeSkill.playerId,
      name: lifeSkill.name,
      xp: lifeSkill.xp,
      level: lifeSkill.level,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): LifeSkill {
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

export const lifeSkillRef = (userId: string, lifeSkillId: string) =>
    doc(db, "players", userId, "lifeSkills", lifeSkillId).withConverter(lifeSkillConverter);

export const lifeSkillsCollectionRef = (userId: string) =>
    collection(db, "players", userId, "lifeSkills").withConverter(lifeSkillConverter);

export const lifeSkillsByNameRef = (userId: string, name: string) =>
    query(collection(db, "players", userId, "lifeSkills"), where("name", "==", name)).withConverter(lifeSkillConverter);