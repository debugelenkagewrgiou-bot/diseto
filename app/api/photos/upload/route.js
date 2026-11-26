import { auth } from "@clerk/nextjs/server";
import { getDatabase } from "@/lib/mongodb";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

async function isOwner() {
  const { userId } = await auth();
  const ownerId = process.env.OWNER_CLERK_USER_ID;
  return Boolean(userId && ownerId && userId === ownerId);
}

export async function POST(request) {
  try {
    if (!(await isOwner())) {
      return Response.json(
        { success: false, message: "Δεν έχετε δικαίωμα πρόσβασης." },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const title = String(formData.get("title") || "").trim();
    const category = String(formData.get("category") || "other").trim();
    const description = String(formData.get("description") || "").trim();

    if (!file || !(file instanceof File)) {
      return Response.json(
        { success: false, message: "Δεν επιλέξατε αρχείο." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return Response.json(
        { success: false, message: "Επιτρέπονται μόνο JPG, PNG, WEBP." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return Response.json(
        { success: false, message: "Το αρχείο ξεπερνά τα 5MB." },
        { status: 400 }
      );
    }

    if (!title) {
      return Response.json(
        { success: false, message: "Δώστε τίτλο στη φωτογραφία." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");

    const db = await getDatabase();

    const photo = {
      title,
      category,
      description,
      filename: file.name.slice(0, 180),
      mimeType: file.type,
      size: file.size,
      data: base64,
      order: 0,
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("photos").insertOne(photo);

    return Response.json({
      success: true,
      message: "Η φωτογραφία ανέβηκε επιτυχώς.",
      photoId: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("Photo upload error:", error);
    return Response.json(
      { success: false, message: "Σφάλμα κατά το ανέβασμα." },
      { status: 500 }
    );
  }
}