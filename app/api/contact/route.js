import { Resend } from "resend";
import { getDatabase } from "@/lib/mongodb";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 3 * 1024 * 1024;
const MAX_TOTAL_SIZE = 3 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
];

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Honeypot anti-spam
    if (formData.get("website")) {
      return Response.json({ success: true });
    }

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const clientType = String(formData.get("clientType") || "").trim();
    const project = String(formData.get("project") || "").trim();
    const budget = String(formData.get("budget") || "").trim();
    const area = String(formData.get("area") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const date = String(formData.get("date") || "").trim();
    const time = String(formData.get("time") || "").trim();

    if (!name || !phone || !email || !message) {
      return Response.json(
        { success: false, message: "Συμπληρώστε τα υποχρεωτικά πεδία." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { success: false, message: "Μη έγκυρη διεύθυνση email." },
        { status: 400 }
      );
    }

    const uploadedFiles = [
      ...formData.getAll("files"),
      ...formData.getAll("attachments"),
    ].filter(
      (file, index, array) =>
        file instanceof File &&
        array.findIndex(
          (item) =>
            item instanceof File &&
            item.name === file.name &&
            item.size === file.size
        ) === index
    );

    if (uploadedFiles.length > MAX_FILES) {
      return Response.json(
        { success: false, message: "Μπορείτε να ανεβάσετε έως 5 αρχεία." },
        { status: 400 }
      );
    }

    let totalSize = 0;

    for (const file of uploadedFiles) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return Response.json(
          {
            success: false,
            message: `Μη αποδεκτός τύπος αρχείου: ${file.name}`,
          },
          { status: 400 }
        );
      }
      if (file.size > MAX_FILE_SIZE) {
        return Response.json(
          {
            success: false,
            message: `Το αρχείο ${file.name} ξεπερνά τα 3MB.`,
          },
          { status: 400 }
        );
      }
      totalSize += file.size;
    }

    if (totalSize > MAX_TOTAL_SIZE) {
      return Response.json(
        {
          success: false,
          message: "Το συνολικό μέγεθος αρχείων ξεπερνά τα 3MB.",
        },
        { status: 400 }
      );
    }

    const fileBuffers = await Promise.all(
      uploadedFiles.map(async (file) => ({
        name: file.name.slice(0, 180),
        type: file.type,
        size: file.size,
        buffer: Buffer.from(await file.arrayBuffer()),
      }))
    );

    const files = fileBuffers.map((f) => ({
      name: f.name,
      type: f.type,
      size: f.size,
      data: f.buffer.toString("base64"),
    }));

    const db = await getDatabase();

    // ============ 1. Αποθήκευση μηνύματος επικοινωνίας ============
    const contact = {
      name,
      phone,
      email,
      clientType,
      project,
      budget,
      area,
      message,
      files,
      status: "new",
      emailSent: false,
      createdAt: new Date(),
    };

    const contactResult = await db.collection("contacts").insertOne(contact);

    // ============ 2. Αν υπάρχει date+time → δημιουργία ραντεβού ============
    let appointmentCreated = false;
    let appointmentError = null;

    if (date && time) {
      try {
        const appointment = {
          name,
          email,
          phone,
          date,
          time,
          project,
          message,
          status: "pending",
          slotKey: `${date}_${time}`,
          emailSent: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const apptResult = await db
          .collection("appointments")
          .insertOne(appointment);

        appointmentCreated = true;
        console.log(
          "✅ Appointment created via unified form:",
          apptResult.insertedId.toString()
        );
      } catch (error) {
        if (error?.code === 11000) {
          appointmentError =
            "Η συγκεκριμένη ώρα μόλις δεσμεύτηκε. Το μήνυμά σας καταχωρήθηκε, αλλά το ραντεβού δεν κρατήθηκε.";
        } else {
          appointmentError =
            "Το μήνυμα καταχωρήθηκε, αλλά το ραντεβού απέτυχε.";
          console.error("Appointment creation error:", error);
        }
      }
    }

    // ============ 3. Αποστολή email ============
    let emailSent = false;
    let emailError = null;

    try {
      if (
        !process.env.RESEND_API_KEY ||
        !process.env.FROM_EMAIL ||
        !process.env.CONTACT_EMAIL
      ) {
        throw new Error("Missing Resend configuration");
      }

      const resend = new Resend(process.env.RESEND_API_KEY);

      const attachments = fileBuffers.length
        ? fileBuffers.map((f) => ({
            filename: f.name.replace(/[\\/\r\n]/g, "_"),
            content: f.buffer,
          }))
        : undefined;

      const html = `
        <div style="font-family:Arial,sans-serif;line-height:1.7;color:#222">
          <h2>Νέο μήνυμα από το DISETO website</h2>
          <p><strong>Όνομα:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Τηλέφωνο:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Τύπος πελάτη:</strong> ${escapeHtml(clientType)}</p>
          <p><strong>Project:</strong> ${escapeHtml(project)}</p>
          <p><strong>Budget:</strong> ${escapeHtml(budget)}</p>
          <p><strong>Περιοχή:</strong> ${escapeHtml(area)}</p>
          ${
            date && time
              ? `<p><strong>📅 Ραντεβού:</strong> ${escapeHtml(date)} στις ${escapeHtml(time)}</p>`
              : ""
          }
          <p><strong>Μήνυμα:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
        </div>
      `;

      const emailResult = await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: process.env.CONTACT_EMAIL,
        replyTo: email,
        subject: date && time
          ? `Νέο ραντεβού + μήνυμα από ${name}`
          : `Νέο μήνυμα DISETO από ${name}`,
        html,
        ...(attachments?.length ? { attachments } : {}),
      });

      if (emailResult.error) {
        throw new Error(emailResult.error.message || "Email sending failed");
      }

      emailSent = true;
    } catch (error) {
      emailError = error.message || "Email sending failed";
      console.error("Contact email error:", error);
    }

    await db.collection("contacts").updateOne(
      { _id: contactResult.insertedId },
      { $set: { emailSent, emailError } }
    );

    // ============ 4. Response ============
    return Response.json({
      success: true,
      message: appointmentCreated
        ? "Το αίτημα ραντεβού και το μήνυμά σας καταχωρήθηκαν επιτυχώς."
        : "Το μήνυμά σας καταχωρήθηκε επιτυχώς.",
      appointmentCreated,
      appointmentError,
      emailSent,
    });
  } catch (error) {
    console.error("Contact POST error:", error);
    return Response.json(
      { success: false, message: "Παρουσιάστηκε σφάλμα. Δοκιμάστε ξανά." },
      { status: 500 }
    );
  }
}