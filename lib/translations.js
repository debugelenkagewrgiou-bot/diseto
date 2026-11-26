export const translations = {
  el: {
    nav: {
      home: "Αρχική",
      about: "Σχετικά",
      services: "Υπηρεσίες",
      projects: "Έργα",
      contact: "Επικοινωνία",
    },

    hero: {
      title: "Αρχιτεκτονική με ταυτότητα.",
      subtitle:
        "Δημιουργούμε χώρους με χαρακτήρα, αισθητική και διαχρονική αξία.",
      button: "Ανακαλύψτε τη δουλειά μας",
    },

    about: { title: "Σχετικά με εμάς" },
    services: { title: "Οι υπηρεσίες μας" },
    projects: { title: "Επιλεγμένα έργα" },

    contact: {
      introLabel: "DISETO / ΕΠΙΚΟΙΝΩΝΙΑ",
      introTagline: "ΑΣ ΔΗΜΙΟΥΡΓΗΣΟΥΜΕ ΚΑΤΙ ΜΑΖΙ",

      titleFirst: "Ας",
      titleSecond: "δημιουργήσουμε",
      titleThird: "μαζί.",

      description:
        "Κάθε χώρος έχει τη δική του ιστορία. Είτε σχεδιάζετε μια νέα κουζίνα, μια ειδική ξύλινη κατασκευή ή μια ολοκληρωμένη ανακαίνιση, είμαστε εδώ για να συζητήσουμε την ιδέα σας.",

      phone: "ΤΗΛΕΦΩΝΟ",

      formTitle: "Πείτε μας την ιδέα σας.",
      formDescription:
        "Συμπληρώστε τη φόρμα και θα επικοινωνήσουμε μαζί σας για να συζητήσουμε τις ανάγκες σας.",

      name: "ΟΝΟΜΑΤΕΠΩΝΥΜΟ *",
      namePlaceholder: "Το όνομά σας",
      phonePlaceholder: "+30",
      email: "EMAIL *",

      clientType: "ΕΙΜΑΣΤΕ ΣΕ ΕΠΙΚΟΙΝΩΝΙΑ ΜΕ",
      project: "ΤΙ ΕΡΓΟ ΣΑΣ ΕΝΔΙΑΦΕΡΕΙ;",
      area: "ΠΕΡΙΟΧΗ ΕΡΓΟΥ",
      areaPlaceholder: "Π.χ. Αθήνα",
      budget: "ΕΝΔΕΙΚΤΙΚΟΣ ΠΡΟΫΠΟΛΟΓΙΣΜΟΣ",
      select: "Επιλέξτε",

      message: "ΠΕΡΙΓΡΑΨΤΕ ΜΑΣ ΤΗΝ ΙΔΕΑ ΣΑΣ",
      messagePlaceholder: "Πείτε μας λίγα λόγια για το έργο σας...",

      files: "ΦΩΤΟΓΡΑΦΙΕΣ Ή ΣΧΕΔΙΑ ΤΟΥ ΧΩΡΟΥ",
      fileCount: (count) => `Επιλέχθηκαν ${count} αρχεία:`,
      fileInfo:
        "Έως 5 αρχεία, με μέγιστο μέγεθος 3MB ανά αρχείο και 3MB συνολικά. Τα αρχεία αποστέλλονται αυτόματα μαζί με το αίτημά σας.",
      fileLimit: "Μπορείτε να επιλέξετε έως 5 αρχεία.",
      fileTypes:
        "Επιτρέπονται μόνο φωτογραφίες JPG, PNG, WEBP, GIF και PDF.",
      fileSize: (name) => `Το αρχείο ${name} υπερβαίνει το όριο των 3MB.`,
      totalSize:
        "Το συνολικό μέγεθος των αρχείων δεν μπορεί να υπερβεί τα 3MB.",

      sending: "ΑΠΟΣΤΟΛΗ ΑΙΤΗΜΑΤΟΣ...",
      submit: "ΣΤΕΙΛΤΕ ΤΟ ΑΙΤΗΜΑ ΣΑΣ",

      successTitle: "Το αίτημά σας στάλθηκε επιτυχώς!",
      successLine1: "Ευχαριστούμε για την επικοινωνία.",
      successLine2:
        "Η ομάδα DISETO θα επικοινωνήσει μαζί σας σύντομα.",

      requestError: "Δεν ήταν δυνατή η αποστολή του αιτήματος.",
      generalError: "Παρουσιάστηκε σφάλμα. Παρακαλούμε δοκιμάστε ξανά.",

      footerLabel: "DISETO — ΑΠΟ ΤΟ 1982",
      footerTagline: "ΣΧΕΔΙΑΣΜΟΣ · ΠΟΙΟΤΗΤΑ · ΚΑΤΑΣΚΕΥΗ",
    },
  },

  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      projects: "Projects",
      contact: "Contact",
    },

    hero: {
      title: "Architecture with identity.",
      subtitle:
        "We create spaces with character, aesthetics and timeless value.",
      button: "Discover our work",
    },

    about: { title: "About us" },
    services: { title: "Our services" },
    projects: { title: "Selected projects" },

    contact: {
      introLabel: "DISETO / CONTACT",
      introTagline: "LET'S CREATE SOMETHING TOGETHER",

      titleFirst: "Let's",
      titleSecond: "create",
      titleThird: "together.",

      description:
        "Every space has its own story. Whether you are planning a new kitchen, a bespoke wooden creation or a complete renovation, we are here to discuss your ideas.",

      phone: "PHONE",

      formTitle: "Tell us about your idea.",
      formDescription:
        "Fill in the form and we will get in touch to discuss your needs.",

      name: "FULL NAME *",
      namePlaceholder: "Your name",
      phonePlaceholder: "+30",
      email: "EMAIL *",

      clientType: "I AM CONTACTING YOU AS A",
      project: "WHAT TYPE OF PROJECT DO YOU HAVE IN MIND?",
      area: "PROJECT LOCATION",
      areaPlaceholder: "e.g. Athens",
      budget: "ESTIMATED BUDGET",
      select: "Select",

      message: "TELL US ABOUT YOUR IDEA",
      messagePlaceholder: "Tell us a little about your project...",

      files: "PHOTOS OR PLANS OF YOUR SPACE",
      fileCount: (count) => `${count} file(s) selected:`,
      fileInfo:
        "Up to 5 files, with a maximum of 3MB per file and 3MB in total. Files will be sent automatically with your enquiry.",
      fileLimit: "You can select up to 5 files.",
      fileTypes:
        "Only JPG, PNG, WEBP, GIF images and PDF files are allowed.",
      fileSize: (name) => `The file ${name} exceeds the 3MB limit.`,
      totalSize: "The total file size cannot exceed 3MB.",

      sending: "SENDING YOUR ENQUIRY...",
      submit: "SEND YOUR ENQUIRY",

      successTitle: "Your enquiry has been sent successfully!",
      successLine1: "Thank you for getting in touch.",
      successLine2: "The DISETO team will contact you shortly.",

      requestError: "Your enquiry could not be sent.",
      generalError: "An error occurred. Please try again.",

      footerLabel: "DISETO — SINCE 1982",
      footerTagline: "DESIGN · QUALITY · CRAFTSMANSHIP",
    },
  },
};