// converters/playerConverter.ts
import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    doc,
    setDoc,
    updateDoc,
    getDoc,
    increment,
    collection,
  } from "firebase/firestore";
  import { db } from "@/firebase"; // Adjust the import path as per your project structure
  
  interface Player {
    uid: string; // Firebase Auth user's UID
    totalXP: number;
    lifeSkillLevel: number;
    // Add other game-specific fields as required
  }
  
  export  const playerConverter: FirestoreDataConverter<Player> = {
    toFirestore(player: Player): DocumentData {
      return {
        uid: player.uid,
        totalXP: player.totalXP,
        lifeSkillLevel: player.lifeSkillLevel,
        // Serialize other fields as necessary
      };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Player {
      const data = snapshot.data(options);
      return {
        uid: data.uid, // Correct this if UID is stored in document data
        totalXP: data.totalXP,
        lifeSkillLevel: data.lifeSkillLevel,
        // Deserialize other fields as necessary
      };
    },
  };
  
  // Firestore operations for the Player model
  
  export async function addXPToPlayer(uid: string, xpAmount: number) {
    const playerRef = doc(db, "players", uid).withConverter(playerConverter);
    await updateDoc(playerRef, {
      totalXP: increment(xpAmount),
      // Additional logic for updating lifeSkillLevel based on new totalXP can be added here
    });
  }
  export const playerRef = (userId: string) =>
  doc(db, "players", userId).withConverter(playerConverter);

// Assuming there's a need for a collection reference for players, though typically you would access individual player documents.
export const playersCollectionRef = () =>
  collection(db, "players").withConverter(playerConverter);
  // Ensure to export the Player interface if it needs to be used elsewhere
  export type { Player };

  