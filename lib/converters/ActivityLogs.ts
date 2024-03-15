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
    statImpacted: string;
    combatLevelAtTimeOfActivity: number;
    timestamp: string; // ISO 8601 format
    reason: string;
}

// Create a Firestore data converter for ActivityLog
export const activityLogConverter: FirestoreDataConverter<ActivityLog> = {
    toFirestore(activityLog: ActivityLog): DocumentData {
        return {
            activityType: activityLog.activityType,
            xpEarned: activityLog.xpEarned,
            skillImpacted: activityLog.skillImpacted,
            statImpacted: activityLog.statImpacted,
            combatLevelAtTimeOfActivity: activityLog.combatLevelAtTimeOfActivity,
            timestamp: activityLog.timestamp,
            reason: activityLog.reason,
        };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ActivityLog {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            activityType: data.activityType,
            xpEarned: data.xpEarned,
            skillImpacted: data.skillImpacted,
            statImpacted: data.statImpacted,
            combatLevelAtTimeOfActivity: data.combatLevelAtTimeOfActivity,
            timestamp: data.timestamp,
            reason: data.reason,
        };
    },
};

// Function to get a reference to an activity log document with a converter
export const activityLogRef = (userId: string, activityLogId: string) =>
    doc(db, "players", userId, "activitylog", activityLogId).withConverter(activityLogConverter);

// Function to get a reference to the activity logs collection with a converter
export const activityLogsCollectionRef = (userId: string) =>
    collection(db, "players", userId, "activitylog").withConverter(activityLogConverter);

// Function to query activity logs by type with a converter
export const activityLogsByTypeRef = (userId: string, activityType: string) =>
    query(collection(db, "players", userId, "activitylog"), where("activityType", "==", activityType)).withConverter(activityLogConverter);