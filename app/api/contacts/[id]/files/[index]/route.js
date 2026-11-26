import { ObjectId } from "mongodb";
import { auth } from "@clerk/nextjs/server";
import { getDatabase } from "@/lib/mongodb";

export async function GET(request, { params }) {
  try {
    const { userId } = await auth();
    const ownerId = process.env.OWNER_CLERK_USER_ID;

    if (!userId || !ownerId || userId !== ownerId) {
      return Response.json(
        { success: false, message: "Δεν έχετε δικαίωμα πρόσβασης." },
        { status: 403 }
      );
    }

    const { id, index } = params;

    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: "Μη έγκυρο ID." },
        { status: 400 }
      );
    }

    const fileIndex = parseInt(index, 10);
    if (Number.isNaN(fileIndex) || fileIndex < 0) {
      return Response.json(
        { success: false, message: "Μη έγκυρο index αρχείου." },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const contact = await db
      .collection("contacts")
      .findOne({ _id: new ObjectId(id) }, { projection: { files: 1 } });

    if (!contact) {
      return Response.json(
        { success: false, message: "Το μήνυμα δεν βρέθηκε." },
        { status: 404 }
      );
    }

    const file = contact.files?.[fileIndex];
    if (!file || !file.data) {
      return Response.json(
        { success: false, message: "Το αρχείο δεν βρέθηκε." },
        { status: 404 }
      );
    }

    const buffer = Buffer.from(file.data, "base64");
    const safeName = (file.name || "attachment").replace(/[\\/\r\n"]/g, "_");

    return new Response(buffer, {
      headers: {
        "Content-Type": file.type || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${safeName}"`,
        "Content-Length": String(buffer.length),
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("Contact file GET error:", error);
    return Response.json(
      { success: false, message: "Αδυναμία λήψης αρχείου." },
      { status: 500 }
    );
  }
}