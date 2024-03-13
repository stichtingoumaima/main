// Import Firestore utilities
import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    doc,
    collection,
    query,
    where,
  } from "firebase/firestore";
  import { db } from "@/firebase"; // Ensure this path matches your Firebase configuration
  
  // Define the ActivityLog interface
  export interface ActivityLog {
    id?: string; // Optional to include the document ID when needed
    activityType: string;
    xpEarned: number;
    skillImpacted: string;
    newSkillLevel: number;
    combatLevelAtTimeOfActivity: number;
    timestamp: string; // ISO 8601 format
  }
  
  // Create a Firestore data converter for ActivityLog
  export const activityLogConverter: FirestoreDataConverter<ActivityLog> = {
    toFirestore(activityLog: ActivityLog): DocumentData {
      return {
        activityType: activityLog.activityType,
        xpEarned: activityLog.xpEarned,
        skillImpacted: activityLog.skillImpacted,
        newSkillLevel: activityLog.newSkillLevel,
        combatLevelAtTimeOfActivity: activityLog.combatLevelAtTimeOfActivity,
        timestamp: activityLog.timestamp,
      };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ActivityLog {
      const data = snapshot.data(options);
      return {
        id: snapshot.id,
        activityType: data.activityType,
        xpEarned: data.xpEarned,
        skillImpacted: data.skillImpacted,
        newSkillLevel: data.newSkillLevel,
        combatLevelAtTimeOfActivity: data.combatLevelAtTimeOfActivity,
        timestamp: data.timestamp,
      };
    },
  };
  
  // Function to get a reference to an activity log document with a converter
  export const activityLogRef = (userId: string, activityLogId: string) =>
      doc(db, "players", userId, "Activity Log Subcollection", activityLogId).withConverter(activityLogConverter);
  
  // Function to get a reference to the activity logs collection with a converter
  export const activityLogsCollectionRef = (userId: string) =>
      collection(db, "players", userId, "Activity Log Subcollection").withConverter(activityLogConverter);
  
  // Function to query activity logs by type with a converter
  export const activityLogsByTypeRef = (userId: string, activityType: string) =>
      query(collection(db, "players", userId, "Activity Log Subcollection"), where("activityType", "==", activityType)).withConverter(activityLogConverter);
  