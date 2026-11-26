import { ObjectId } from "mongodb";
import { auth } from "@clerk/nextjs/server";
import { getDatabase } from "@/lib/mongodb";

async function isOwner() {
  const { userId } = await auth();
  const ownerId = process.env.OWNER_CLERK_USER_ID;
  return Boolean(userId && ownerId && userId === ownerId);
}

// GET — δημόσιο
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const db = await getDatabase();
    const filter = {};

    if (category && category !== "all") {
      filter.category = category;
    }
    if (featured === "true") {
      filter.featured = true;
    }

    const photos = await db
      .collection("photos")
      .find(filter, { projection: { data: 0 } })
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    return Response.json({
      success: true,
      photos: photos.map((p) => ({
        ...p,
        _id: p._id.toString(),
      })),
    });
  } catch (error) {
    console.error("Photos GET error:", error);
    return Response.json(
      { success: false, message: "Αδυναμία φόρτωσης φωτογραφιών." },
      { status: 500 }
    );
  }
}

// DELETE — μόνο owner
export async function DELETE(request) {
  try {
    if (!(await isOwner())) {
      return Response.json(
        { success: false, message: "Δεν έχετε δικαίωμα πρόσβασης." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: "Μη έγκυρο ID." },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const result = await db
      .collection("photos")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return Response.json(
        { success: false, message: "Η φωτογραφία δεν βρέθηκε." },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Η φωτογραφία διαγράφηκε.",
    });
  } catch (error) {
    console.error("Photo DELETE error:", error);
    return Response.json(
      { success: false, message: "Σφάλμα κατά τη διαγραφή." },
      { status: 500 }
    );
  }
}

// PATCH — ενημέρωση (featured, order, title)
export async function PATCH(request) {
  try {
    if (!(await isOwner())) {
      return Response.json(
        { success: false, message: "Δεν έχετε δικαίωμα πρόσβασης." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const id = String(body.id || "");

    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: "Μη έγκυρο ID." },
        { status: 400 }
      );
    }

    const update = { updatedAt: new Date() };
    if (typeof body.featured === "boolean") update.featured = body.featured;
    if (typeof body.order === "number") update.order = body.order;
    if (typeof body.title === "string") update.title = body.title.trim();
    if (typeof body.category === "string") update.category = body.category;
    if (typeof body.description === "string")
      update.description = body.description;

    const db = await getDatabase();
    const result = await db
      .collection("photos")
      .updateOne({ _id: new ObjectId(id) }, { $set: update });

    if (result.matchedCount === 0) {
      return Response.json(
        { success: false, message: "Η φωτογραφία δεν βρέθηκε." },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Η φωτογραφία ενημερώθηκε.",
    });
  } catch (error) {
    console.error("Photo PATCH error:", error);
    return Response.json(
      { success: false, message: "Σφάλμα κατά την ενημέρωση." },
      { status: 500 }
    );
  }
}