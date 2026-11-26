import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "diseto";

if (!uri) {
  throw new Error("Missing MONGODB_URI in .env.local");
}

const globalMongo = globalThis;

if (!globalMongo.mongoClientPromise) {
  const client = new MongoClient(uri, {
    // ✅ Κρίσιμη διόρθωση για το SSL alert 80 στο Vercel
    autoSelectFamily: false,
    // ✅ Χρονικά όρια για να μην "κολλάει" η σύνδεση
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    // ✅ Χρήσιμο για serverless (Vercel)
    maxPoolSize: 10,
  });
  globalMongo.mongoClientPromise = client.connect();
}

const clientPromise = globalMongo.mongoClientPromise;

export async function getDatabase() {
  const client = await clientPromise;
  const db = client.db(dbName);

  if (!globalMongo.mongoIndexesPromise) {
    globalMongo.mongoIndexesPromise = Promise.all([
      db.collection("appointments").createIndex(
        { slotKey: 1 },
        {
          unique: true,
          sparse: true,
          name: "unique_active_slot",
        }
      ),
      db.collection("appointments").createIndex({ date: 1, time: 1 }),
      db.collection("appointments").createIndex({ createdAt: -1 }),
      db.collection("contacts").createIndex({ createdAt: -1 }),
    ]).catch((error) => {
      // Reset ώστε να επιτραπεί retry σε επόμενη κλήση
      globalMongo.mongoIndexesPromise = null;
      throw error;
    });
  }

  await globalMongo.mongoIndexesPromise;

  return db;
}

export default clientPromise;