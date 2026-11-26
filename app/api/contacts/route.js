import { auth } from "@clerk/nextjs/server";
import { getDatabase } from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { userId } = await auth();
    const ownerId = process.env.OWNER_CLERK_USER_ID;

    if (!userId || !ownerId || userId !== ownerId) {
      return Response.json(
        { success: false, message: "Δεν έχετε δικαίωμα πρόσβασης." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limitParam = parseInt(searchParams.get("limit") || "100", 10);
    const skipParam = parseInt(searchParams.get("skip") || "0", 10);
    const limit = Math.min(Math.max(limitParam, 1), 500);
    const skip = Math.max(skipParam, 0);

    const db = await getDatabase();
    const collection = db.collection("contacts");

    const [contacts, total] = await Promise.all([
      collection
        .find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      collection.countDocuments({}),
    ]);

    return Response.json({
      success: true,
      total,
      contacts: contacts.map((item) => ({
        ...item,
        _id: item._id.toString(),
        // Δεν στέλνουμε το base64 data — μόνο metadata
        files: (item.files || []).map(({ data, ...rest }) => rest),
      })),
    });
  } catch (error) {
    console.error("Contacts GET error:", error);
    return Response.json(
      { success: false, message: "Αδυναμία φόρτωσης μηνυμάτων." },
      { status: 500 }
    );
  }
}