import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface ActivityItem {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
  createdAt?: any;
}

/**
 * Log a user activity to Firestore under `users/{uid}/activities`
 */
export async function logUserActivity(
  uid: string,
  title: string,
  message: string,
  type: "info" | "success" | "warning" | "error" = "info"
) {
  if (!uid) return;
  try {
    const activitiesRef = collection(db, "users", uid, "activities");
    await addDoc(activitiesRef, {
      title,
      message,
      type,
      createdAt: serverTimestamp(),
      formattedTime: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      formattedDate: new Date().toLocaleDateString([], {
        month: "short",
        day: "numeric",
      }),
    });
  } catch (err) {
    console.error("Error logging user activity:", err);
  }
}

/**
 * Helper to format timestamp into human readable format like "Just now", "5 mins ago", "Today at 10:30 AM"
 */
export function formatActivityTime(createdAt: any, fallbackFormatted?: string): string {
  if (!createdAt) {
    return fallbackFormatted || "Just now";
  }

  let date: Date;
  if (createdAt instanceof Timestamp) {
    date = createdAt.toDate();
  } else if (createdAt.toDate && typeof createdAt.toDate === "function") {
    date = createdAt.toDate();
  } else if (typeof createdAt === "number" || typeof createdAt === "string") {
    date = new Date(createdAt);
  } else {
    return fallbackFormatted || "Just now";
  }

  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMins = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInMins < 1) return "Just now";
  if (diffInMins < 60) return `${diffInMins}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;

  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Subscribe to user's real-time activities stream
 */
export function subscribeUserActivities(
  uid: string,
  callback: (activities: ActivityItem[]) => void
) {
  if (!uid) {
    callback([]);
    return () => {};
  }

  const activitiesRef = collection(db, "users", uid, "activities");
  const q = query(activitiesRef, orderBy("createdAt", "desc"), limit(10));

  return onSnapshot(
    q,
    (snapshot) => {
      const activities: ActivityItem[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        const timeStr = formatActivityTime(
          data.createdAt,
          data.formattedTime
            ? `${data.formattedDate || ""} ${data.formattedTime}`
            : undefined
        );

        return {
          id: docSnap.id,
          title: data.title || "Activity",
          message: data.message || "",
          type: data.type || "info",
          timestamp: timeStr,
          createdAt: data.createdAt,
        };
      });
      callback(activities);
    },
    (err) => {
      console.error("Error subscribing to activities:", err);
      callback([]);
    }
  );
}
