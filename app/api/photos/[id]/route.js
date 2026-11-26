import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/mongodb";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: "Μη έγκυρο ID." },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const photo = await db
      .collection("photos")
      .findOne(
        { _id: new ObjectId(id) },
        { projection: { data: 1, mimeType: 1, filename: 1 } }
      );

    if (!photo || !photo.data) {
      return Response.json(
        { success: false, message: "Η φωτογραφία δεν βρέθηκε." },
        { status: 404 }
      );
    }

    const buffer = Buffer.from(photo.data, "base64");

    return new Response(buffer, {
      headers: {
        "Content-Type": photo.mimeType || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Length": String(buffer.length),
      },
    });
  } catch (error) {
    console.error("Photo serve error:", error);
    return Response.json(
      { success: false, message: "Σφάλμα." },
      { status: 500 }
    );
  }
}