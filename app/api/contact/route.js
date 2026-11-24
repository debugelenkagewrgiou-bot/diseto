
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Όρια αρχείων
const MAX_FILES = 5;
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB ανά αρχείο
const MAX_TOTAL_SIZE = 3 * 1024 * 1024; // 3MB συνολικά

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
];

const clientTypes = [
  "Ιδιώτης",
  "Ξενοδοχείο",
  "Επιχείρηση",
  "Αρχιτέκτονας / Διακοσμητής",
];

const projects = [
  "Κουζίνα",
  "Έπιπλα κατά παραγγελία",
  "Ντουλάπες",
  "Ειδικές ξύλινες κατασκευές",
  "Εσωτερικός σχεδιασμός",
  "Ανακαίνιση κατοικίας",
  "Ανακαίνιση ξενοδοχείου",
  "Επαγγελματικός χώρος",
  "Άλλο",
];

const budgets = [
  "",
  "Έως 3.000€",
  "3.000€ – 6.000€",
  "6.000€ – 10.000€",
  "10.000€ – 20.000€",
  "20.000€+",
  "Δεν γνωρίζω ακόμη",
];

export async function POST(request) {
  try {
    // Έλεγχος ρυθμίσεων Resend
    if (
      !process.env.RESEND_API_KEY ||
      !process.env.CONTACT_FROM
    ) {
      console.error("Missing RESEND_API_KEY or CONTACT_FROM");

      return Response.json(
        { error: "Η υπηρεσία email δεν έχει ρυθμιστεί." },
        { status: 500 }
      );
    }

    const data = await request.formData();

    // Honeypot protection
    if (data.get("website")) {
      return Response.json({ success: true });
    }

    // Στοιχεία φόρμας
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const clientType = String(data.get("clientType") || "");
    const project = String(data.get("project") || "");
    const budget = String(data.get("budget") || "");
    const area = String(data.get("area") || "").trim();
    const message = String(data.get("message") || "").trim();

    // Έλεγχος υποχρεωτικών πεδίων και μήκους
    if (
      !name ||
      !phone ||
      !email ||
      name.length > 120 ||
      phone.length > 40 ||
      email.length > 254 ||
      area.length > 150 ||
      message.length > 5000
    ) {
      return Response.json(
        { error: "Ελέγξτε τα στοιχεία της φόρμας." },
        { status: 400 }
      );
    }

    // Έλεγχος email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return Response.json(
        { error: "Το email δεν είναι έγκυρο." },
        { status: 400 }
      );
    }

    // Έλεγχος επιλογών
    if (
      !clientTypes.includes(clientType) ||
      !projects.includes(project) ||
      !budgets.includes(budget)
    ) {
      return Response.json(
        { error: "Μη έγκυρη επιλογή φόρμας." },
        { status: 400 }
      );
    }

    // Ανάκτηση αρχείων
    const files = data
      .getAll("files")
      .filter(
        (item) => item instanceof File && item.size > 0
      );

    // Έλεγχος αριθμού αρχείων
    if (files.length > MAX_FILES) {
      return Response.json(
        { error: "Μπορείτε να ανεβάσετε έως 5 αρχεία." },
        { status: 400 }
      );
    }

    let totalSize = 0;

    // Έλεγχος τύπου και μεγέθους κάθε αρχείου
    for (const file of files) {
      totalSize += file.size;

      if (
        !allowedTypes.includes(file.type) ||
        file.size > MAX_FILE_SIZE
      ) {
        return Response.json(
          {
            error:
              "Μη υποστηριζόμενος τύπος ή πολύ μεγάλο αρχείο. Επιτρέπονται εικόνες και PDF έως 3MB.",
          },
          { status: 400 }
        );
      }
    }

    // Έλεγχος συνολικού μεγέθους
    if (totalSize > MAX_TOTAL_SIZE) {
      return Response.json(
        {
          error:
            "Το συνολικό μέγεθος των αρχείων δεν πρέπει να ξεπερνά τα 3MB.",
        },
        { status: 400 }
      );
    }

    // Μετατροπή αρχείων σε attachments για το Resend
    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name.replace(/[^\p{L}\p{N}._-]/gu, "_"),
        content: Buffer.from(await file.arrayBuffer()),
      }))
    );

    // Αποστολή email
    const { data: result, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM,
      to: ["diseto@diseto.gr"],
      replyTo: email,

      subject: `Νέο αίτημα DISETO — ${project} — ${name}`,

      text: `
ΝΕΟ ΑΙΤΗΜΑ ΕΠΙΚΟΙΝΩΝΙΑΣ DISETO

Ονοματεπώνυμο: ${name}
Τηλέφωνο: ${phone}
Email: ${email}

Τύπος πελάτη: ${clientType}
Είδος έργου: ${project}
Περιοχή έργου: ${area || "—"}
Προϋπολογισμός: ${budget || "—"}

Περιγραφή έργου:
${message || "—"}

Αριθμός συνημμένων: ${files.length}
      `,

      attachments,
    });

    // Έλεγχος απάντησης Resend
    if (error) {
      console.error("Resend error:", error);

      return Response.json(
        {
          error: "Η αποστολή απέτυχε. Δοκιμάστε ξανά.",
        },
        { status: 500 }
      );
    }

    // Επιτυχής αποστολή
    return Response.json({
      success: true,
      id: result?.id,
    });

  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      {
        error: "Παρουσιάστηκε σφάλμα κατά την αποστολή.",
      },
      { status: 500 }
    );
  }
}
