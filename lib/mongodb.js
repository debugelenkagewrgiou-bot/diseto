import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "diseto";

if (!uri) {
  throw new Error("Missing MONGODB_URI in .env.local");
}

const globalMongo = globalThis;

if (!globalMongo.mongoClientPromise) {
  const client = new MongoClient(uri);
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