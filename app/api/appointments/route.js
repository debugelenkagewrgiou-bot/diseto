import { ObjectId } from "mongodb";
import { auth } from "@clerk/nextjs/server";
import { Resend } from "resend";
import { getDatabase } from "@/lib/mongodb";

const TIMES = [
  "09:00", "09:45", "10:30", "11:15", "12:00",
  "12:45", "13:30", "14:15", "15:00", "15:45",
];

function getAthensDateTime() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Athens",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return {
    date: `${values.year}-${values.month}-${values.day}`,
    time: `${values.hour}:${values.minute}`,
  };
}

function isValidDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) return false;
  const parsed = new Date(`${date}T12:00:00.000Z`);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === date
  );
}

function isWeekday(date) {
  const day = new Date(`${date}T12:00:00.000Z`).getUTCDay();
  return day >= 1 && day <= 5;
}

function isValidSlot(date, time) {
  if (!isValidDate(date) || !isWeekday(date)) return false;
  if (!TIMES.includes(time)) return false;
  const now = getAthensDateTime();
  return date > now.date || (date === now.date && time > now.time);
}

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

// ✅ Βελτιωμένο isOwner με debug πληροφορίες
async function checkOwner() {
  const { userId } = await auth();
  const ownerId = process.env.OWNER_CLERK_USER_ID;

  const debug = {
    hasUserId: Boolean(userId),
    hasOwnerId: Boolean(ownerId),
    userId: userId || null,
    ownerId: ownerId || null,
    match: userId === ownerId,
  };

  if (process.env.NODE_ENV === "development") {
    console.log("=== OWNER CHECK ===");
    console.log(JSON.stringify(debug, null, 2));
    console.log("===================");
  }

  return {
    isOwner: Boolean(userId && ownerId && userId === ownerId),
    debug,
  };
}

// ✅ Στέλνει email στον πελάτη
async function sendAppointmentEmail(appointment, status) {
  if (!process.env.RESEND_API_KEY || !process.env.FROM_EMAIL) {
    throw new Error(
      "Λείπει RESEND_API_KEY ή FROM_EMAIL από τις μεταβλητές περιβάλλοντος."
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const approved = status === "approved";
  const name = escapeHtml(appointment.name);
  const time = escapeHtml(appointment.time);
  const project = appointment.project
    ? escapeHtml(appointment.project)
    : null;

  let formattedDate = appointment.date;
  try {
    formattedDate = new Intl.DateTimeFormat("el-GR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Europe/Athens",
    }).format(new Date(`${appointment.date}T12:00:00.000Z`));
  } catch {
    /* fallback */
  }

  const subject = approved
    ? `✅ Το ραντεβού σας επιβεβαιώθηκε | DISETO`
    : `Ενημέρωση για το αίτημα ραντεβού σας | DISETO`;

  const heading = approved
    ? "Το ραντεβού σας επιβεβαιώθηκε"
    : "Ενημέρωση για το αίτημα ραντεβού σας";

  const bodyText = approved
    ? "Είμαστε στην ευχάριστη θέση να σας ενημερώσουμε ότι το ραντεβού σας επιβεβαιώθηκε. Θα χαρούμε να σας συναντήσουμε."
    : "Σας ενημερώνουμε ότι δεν είναι δυνατή η πραγματοποίηση του συγκεκριμένου ραντεβού. Παρακαλούμε επικοινωνήστε μαζί μας για να βρούμε νέα ημερομηνία.";

  const accentColor = approved ? "#16a34a" : "#dc2626";

  const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8" /></head>
      <body style="margin:0;padding:0;background:#f7f4ed;font-family:Arial,sans-serif;color:#28231e;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f4ed;padding:40px 20px;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;max-width:600px;width:100%;">
              <tr>
                <td style="padding:40px 40px 20px 40px;border-bottom:1px solid #ded8cd;">
                  <p style="margin:0;font-size:11px;letter-spacing:0.3em;color:#a89576;font-weight:600;">DISETO</p>
                  <h1 style="margin:8px 0 0 0;font-size:28px;font-weight:400;color:#28231e;">${heading}</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:30px 40px;">
                  <p style="margin:0 0 20px 0;font-size:15px;line-height:1.7;">Αγαπητέ/ή ${name},</p>
                  <p style="margin:0 0 25px 0;font-size:15px;line-height:1.7;color:#555;">${bodyText}</p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f4ed;border-left:3px solid ${accentColor};padding:20px;margin:20px 0;">
                    <tr><td style="padding:10px 20px;">
                      <p style="margin:0;font-size:11px;letter-spacing:0.2em;color:#938a7d;text-transform:uppercase;">Ημερομηνία</p>
                      <p style="margin:4px 0 15px 0;font-size:16px;color:#28231e;font-weight:500;">${formattedDate}</p>
                      <p style="margin:0;font-size:11px;letter-spacing:0.2em;color:#938a7d;text-transform:uppercase;">Ώρα</p>
                      <p style="margin:4px 0 ${project ? "15px" : "0"} 0;font-size:16px;color:#28231e;font-weight:500;">${time}</p>
                      ${
                        project
                          ? `<p style="margin:0;font-size:11px;letter-spacing:0.2em;color:#938a7d;text-transform:uppercase;">Project</p>
                             <p style="margin:4px 0 0 0;font-size:16px;color:#28231e;font-weight:500;">${project}</p>`
                          : ""
                      }
                    </td></tr>
                  </table>
                  <p style="margin:25px 0 0 0;font-size:14px;line-height:1.7;color:#555;">
                    Αν χρειάζεστε να αλλάξετε ή να ακυρώσετε το ραντεβού σας, παρακαλούμε επικοινωνήστε μαζί μας στο
                    <a href="tel:+302741038181" style="color:#a89576;text-decoration:none;">27410.38181</a>
                    ή απαντήστε σε αυτό το email.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 40px 40px 40px;border-top:1px solid #ded8cd;">
                  <p style="margin:0;font-size:14px;line-height:1.7;">Με εκτίμηση,<br/><strong>DISETO Architecture &amp; Interior Design</strong></p>
                  <p style="margin:15px 0 0 0;font-size:11px;letter-spacing:0.15em;color:#938a7d;">
                    <a href="mailto:diseto@diseto.gr" style="color:#a89576;text-decoration:none;">diseto@diseto.gr</a>
                    &nbsp;·&nbsp;
                    <a href="tel:+302741038181" style="color:#a89576;text-decoration:none;">27410.38181</a>
                  </p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
    </html>
  `;

  const result = await resend.emails.send({
    from: process.env.FROM_EMAIL,
    to: appointment.email,
    replyTo: process.env.CONTACT_EMAIL || process.env.FROM_EMAIL,
    subject,
    html,
  });

  if (result.error) {
    throw new Error(result.error.message || "Email sending failed");
  }

  return result.data;
}

// ============ POST ============
export async function POST(request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const date = String(body.date || "").trim();
    const time = String(body.time || "").trim();
    const project = String(body.project || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !phone || !date || !time) {
      return Response.json(
        { success: false, message: "Συμπληρώστε όλα τα υποχρεωτικά πεδία." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { success: false, message: "Μη έγκυρη διεύθυνση email." },
        { status: 400 }
      );
    }

    if (!isValidSlot(date, time)) {
      return Response.json(
        { success: false, message: "Η ημερομηνία ή η ώρα δεν είναι διαθέσιμη." },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const appointments = db.collection("appointments");

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

    const result = await appointments.insertOne(appointment);

    console.log("✅ Appointment created:", result.insertedId.toString());

    return Response.json({
      success: true,
      message: "Το αίτημά σας καταχωρήθηκε επιτυχώς.",
      appointmentId: result.insertedId.toString(),
    });
  } catch (error) {
    if (error?.code === 11000) {
      return Response.json(
        {
          success: false,
          message:
            "Η συγκεκριμένη ώρα μόλις δεσμεύτηκε. Επιλέξτε άλλη ώρα.",
        },
        { status: 409 }
      );
    }

    console.error("Appointment POST error:", error);
    return Response.json(
      { success: false, message: "Παρουσιάστηκε σφάλμα κατά την κράτηση." },
      { status: 500 }
    );
  }
}

// ============ GET ============
export async function GET() {
  try {
    const { isOwner, debug } = await checkOwner();

    if (!isOwner) {
      // ✅ Πιο κατατοπιστικό μήνυμα
      return Response.json(
        {
          success: false,
          message: !debug.hasUserId
            ? "Δεν είστε συνδεδεμένος. Παρακαλώ συνδεθείτε."
            : !debug.hasOwnerId
            ? "Λείπει το OWNER_CLERK_USER_ID από το .env.local"
            : "Ο λογαριασμός σας δεν είναι ο owner. Ελέγξτε το OWNER_CLERK_USER_ID.",
          debug,
        },
        { status: 403 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection("appointments");

    const [appointments, total] = await Promise.all([
      collection.find({}).sort({ createdAt: -1 }).toArray(),
      collection.countDocuments({}),
    ]);

    console.log(
      `📅 GET appointments: found ${appointments.length} / total ${total}`
    );

    return Response.json({
      success: true,
      total,
      appointments: appointments.map((item) => ({
        ...item,
        _id: item._id.toString(),
      })),
    });
  } catch (error) {
    console.error("Appointment GET error:", error);
    return Response.json(
      {
        success: false,
        message: "Αδυναμία φόρτωσης ραντεβού.",
        debug: error.message,
      },
      { status: 500 }
    );
  }
}

// ============ PATCH ============
export async function PATCH(request) {
  try {
    const { isOwner, debug } = await checkOwner();

    if (!isOwner) {
      return Response.json(
        {
          success: false,
          message: !debug.hasUserId
            ? "Δεν είστε συνδεδεμένος."
            : !debug.hasOwnerId
            ? "Λείπει το OWNER_CLERK_USER_ID από το .env.local"
            : "Ο λογαριασμός σας δεν είναι ο owner.",
          debug,
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const id = String(body.id || "");
    const status = String(body.status || "");

    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: "Μη έγκυρο ID ραντεβού." },
        { status: 400 }
      );
    }

    if (!["approved", "rejected"].includes(status)) {
      return Response.json(
        { success: false, message: "Μη έγκυρη κατάσταση ραντεβού." },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection("appointments");
    const _id = new ObjectId(id);

    const appointment = await collection.findOne({ _id });

    if (!appointment) {
      return Response.json(
        { success: false, message: "Το ραντεβού δεν βρέθηκε." },
        { status: 404 }
      );
    }

    if (appointment.status === status) {
      return Response.json({
        success: true,
        message: `Το ραντεβού είναι ήδη ${
          status === "approved" ? "εγκεκριμένο" : "απορριφθέν"
        }.`,
        emailSent: appointment.emailSent || false,
        emailError: appointment.emailError || null,
      });
    }

    if (
      status === "approved" &&
      !isValidSlot(appointment.date, appointment.time)
    ) {
      return Response.json(
        {
          success: false,
          message:
            "Δεν μπορεί να εγκριθεί ραντεβού για ώρα που έχει περάσει.",
        },
        { status: 400 }
      );
    }

    const filter = { _id, status: appointment.status };

    let update;

    if (status === "approved") {
      update = {
        $set: {
          status: "approved",
          slotKey: `${appointment.date}_${appointment.time}`,
          updatedAt: new Date(),
        },
        $unset: { emailError: "" },
      };
    } else {
      update = {
        $set: { status: "rejected", updatedAt: new Date() },
        $unset: { slotKey: "", emailError: "" },
      };
    }

    const result = await collection.updateOne(filter, update);

    if (result.modifiedCount !== 1) {
      return Response.json(
        {
          success: false,
          message:
            "Το ραντεβού άλλαξε από άλλη ενέργεια. Ανανεώστε τη σελίδα.",
        },
        { status: 409 }
      );
    }

    let emailSent = false;
    let emailError = null;

    try {
      await sendAppointmentEmail(appointment, status);
      emailSent = true;
      console.log(`✅ Email sent to ${appointment.email} (${status})`);
    } catch (error) {
      emailError = error.message || "Αποτυχία αποστολής email";
      console.error("Appointment email error:", error);
    }

    await collection.updateOne(
      { _id },
      {
        $set: {
          emailSent,
          emailError,
          emailUpdatedAt: new Date(),
        },
      }
    );

    return Response.json({
      success: true,
      message:
        status === "approved"
          ? "Το ραντεβού εγκρίθηκε."
          : "Το ραντεβού απορρίφθηκε.",
      emailSent,
      emailError,
    });
  } catch (error) {
    if (error?.code === 11000) {
      return Response.json(
        {
          success: false,
          message:
            "Η συγκεκριμένη ώρα έχει ήδη δεσμευτεί από άλλο ραντεβού.",
        },
        { status: 409 }
      );
    }

    console.error("Appointment PATCH error:", error);
    return Response.json(
      { success: false, message: "Παρουσιάστηκε σφάλμα κατά την ενημέρωση." },
      { status: 500 }
    );
  }
}