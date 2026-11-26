
import { auth } from "@clerk/nextjs/server";
import { getDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    // Επιτρέπεται μόνο στον ιδιοκτήτη
    const { userId } = await auth();

    if (!userId) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const ownerId = process.env.OWNER_CLERK_USER_ID;

    if (!ownerId || userId !== ownerId) {
      return Response.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    const db = await getDatabase();

    // Έλεγχος πραγματικής επικοινωνίας με MongoDB
    await db.command({ ping: 1 });

    // Έλεγχος αποθηκευμένων δεδομένων
    const contactsCount = await db
      .collection("contacts")
      .countDocuments();

    const appointmentsCount = await db
      .collection("appointments")
      .countDocuments();

    return Response.json({
      success: true,
      connected: true,
      database: db.databaseName,
      contactsCount,
      appointmentsCount,
      message: "Η MongoDB λειτουργεί κανονικά.",
    });
  } catch (error) {
    console.error("Database check error:", error);

    return Response.json(
      {
        success: false,
        connected: false,
        error: "Δεν ήταν δυνατή η σύνδεση με τη MongoDB.",
      },
      { status: 500 }
    );
  }
}
