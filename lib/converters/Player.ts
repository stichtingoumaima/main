import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  doc,
  updateDoc,
  getDoc,
  increment,
  collection,
} from "firebase/firestore";
import { db } from "@/firebase"; // Adjust the import path as per your project structure

interface Player {
  uid: string; // Firebase Auth user's UID
  totalXP: number;
  combatLevel: number;
  gameSkills: {
    health: number;
    stamina: number;
    strength: number;
    agility: number;
    intelligence: number;
    defense: number;
  };
}

export const playerConverter: FirestoreDataConverter<Player> = {
  toFirestore(player: Player): DocumentData {
    return {
      uid: player.uid,
      totalXP: player.totalXP,
      combatLevel: player.combatLevel,
      gameSkills: player.gameSkills,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Player {
    const data = snapshot.data(options);
    return {
      uid: data.uid,
      totalXP: data.totalXP,
      combatLevel: data.combatLevel,
      gameSkills: data.gameSkills,
    };
  },
};

// Firestore operations for the Player model

export async function addXPToPlayer(uid: string, xpAmount: number) {
  const playerRef = doc(db, "players", uid).withConverter(playerConverter);

  // Fetch current player data to calculate updates
  const playerSnap = await getDoc(playerRef);
  if (!playerSnap.exists()) {
    console.log("Player does not exist!");
    return;
  }

  const playerData = playerSnap.data();
  const newTotalXP = playerData.totalXP + xpAmount;

  // Determine if the XP gain results in a combat level up and allocate skill points accordingly
  // Placeholder for your level-up and skill point allocation logic

  await updateDoc(playerRef, {
    totalXP: increment(xpAmount),
    // Update other fields as necessary based on your game logic
  });
}

export const playerRef = (userId: string) =>
  doc(db, "players", userId).withConverter(playerConverter);

// Collection reference for players
export const playersCollectionRef = () =>
  collection(db, "players").withConverter(playerConverter);

// Ensure to export the Player interface if it needs to be used elsewhere
export type { Player };