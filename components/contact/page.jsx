
"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, MoveUpRight } from "lucide-react";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  clientType: "Ιδιώτης",
  project: "Κουζίνα",
  budget: "",
  area: "",
  message: "",
};

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
  "Έως 3.000€",
  "3.000€ – 6.000€",
  "6.000€ – 10.000€",
  "10.000€ – 20.000€",
  "20.000€+",
  "Δεν γνωρίζω ακόμη",
];

export default function ContactSection() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const elements = document.querySelectorAll(".contact-reveal");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  function updateField(name, value) {
    setSent(false);

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Νέο αίτημα — ${form.project} — ${form.name}`
    );

    const fileNames = files.length
      ? files.map((file) => file.name).join(", ")
      : "Δεν έχουν επιλεγεί αρχεία";

    const body = encodeURIComponent(
      `Ονοματεπώνυμο: ${form.name}
Τηλέφωνο: ${form.phone}
Email: ${form.email}

Τύπος πελάτη: ${form.clientType}
Είδος έργου: ${form.project}
Περιοχή έργου: ${form.area || "—"}
Ενδεικτικός προϋπολογισμός: ${form.budget || "—"}

Περιγραφή έργου:
${form.message || "—"}

Επιλεγμένα αρχεία:
${fileNames}

Παρακαλούμε επικοινωνήστε μαζί μου για το έργο.`
    );

    window.location.href =
      `mailto:diseto@diseto.gr?subject=${subject}&body=${body}`;

    setSent(true);
  }

  const labelClass =
    "mb-3 block text-[9px] font-medium tracking-[0.2em] text-[#938a7d]";

  const inputClass =
    "w-full min-w-0 border-b border-[#ded8cd] bg-transparent py-3.5 text-[13px] text-[#28231e] outline-none transition-colors placeholder:text-[#aaa398] focus:border-[#a89576]";

  return (
    <section
      id="contact"
      className="contact-section relative w-full overflow-hidden bg-[#f7f4ed] px-5 py-24 text-[#28231e] sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-[1300px]">

        {/* ΕΙΣΑΓΩΓΗ */}

        <div className="contact-reveal mb-16 flex flex-col gap-3 border-b border-[#ded8cd] pb-5 sm:mb-24 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[9px] tracking-[0.22em] text-[#a89576]">
            DISETO / ΕΠΙΚΟΙΝΩΝΙΑ
          </span>

          <span className="text-[9px] tracking-[0.16em] text-[#938a7d]">
            ΑΣ ΔΗΜΙΟΥΡΓΗΣΟΥΜΕ ΚΑΤΙ ΜΑΖΙ
          </span>
        </div>

        {/* ΚΥΡΙΟ ΠΕΡΙΕΧΟΜΕΝΟ */}

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">

          {/* ΑΡΙΣΤΕΡΗ ΣΤΗΛΗ */}

          <div className="flex flex-col justify-between">

            <div className="contact-reveal">
              <h2 className="contact-main-title max-w-[650px] font-serif text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-[-0.075em]">
                Ας
                <br />
                δημιουργήσουμε
                <br />
                <span className="italic text-[#a89576]">
                  μαζί.
                </span>
              </h2>

              <p className="mt-10 max-w-[390px] text-[13px] leading-8 text-[#777168]">
                Κάθε χώρος έχει τη δική του ιστορία.
                Είτε σχεδιάζετε μια νέα κουζίνα, μια ειδική
                ξύλινη κατασκευή ή μια ολοκληρωμένη ανακαίνιση,
                είμαστε εδώ για να συζητήσουμε την ιδέα σας.
              </p>

              <a
                href="#contact-form"
                className="contact-cta mt-8 inline-flex items-center gap-3 border-b border-[#a89576] pb-2 text-[10px] tracking-[0.15em] transition-colors hover:text-[#a89576]"
              >
                ΞΕΚΙΝΗΣΤΕ ΤΟ ΕΡΓΟ ΣΑΣ
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* ΑΜΕΣΗ ΕΠΙΚΟΙΝΩΝΙΑ */}

            <div className="contact-info mt-16 grid grid-cols-1 gap-9 border-t border-[#ded8cd] pt-8 sm:grid-cols-2 lg:mt-24">

              <div className="contact-reveal" style={{ "--delay": "100ms" }}>
                <span className={labelClass}>EMAIL</span>

                <a
                  href="mailto:diseto@diseto.gr"
                  className="group inline-flex items-center gap-2 text-[13px] transition-colors hover:text-[#a89576]"
                >
                  diseto@diseto.gr

                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>
              </div>

              <div className="contact-reveal" style={{ "--delay": "220ms" }}>
                <span className={labelClass}>ΤΗΛΕΦΩΝΟ</span>

                <a
                  href="tel:+306987452135"
                  className="group inline-flex items-center gap-2 text-[13px] transition-colors hover:text-[#a89576]"
                >
                  27410.38181

                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>
              </div>

              <div
                className="contact-reveal sm:col-span-2"
                style={{ "--delay": "340ms" }}
              >
                <a
                  href="tel:+306987452135"
                  className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] transition-colors hover:text-[#a89576]"
                >
                  ΚΛΕΙΣΤΕ ΜΙΑ ΕΠΙΣΚΕΨΗ
                  <ArrowUpRight size={14} />
                </a>
              </div>

            </div>
          </div>

          {/* ΔΕΞΙΑ ΣΤΗΛΗ / ΦΟΡΜΑ */}

          <div
            id="contact-form"
            className="contact-form-panel contact-reveal bg-[#f0ece3] p-6 sm:p-10 lg:p-12"
            style={{ "--delay": "180ms" }}
          >

            <div className="mb-12 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-serif text-3xl tracking-[-0.04em] sm:text-4xl">
                  Πείτε μας την ιδέα σας.
                </h3>

                <p className="mt-3 text-[12px] leading-6 text-[#777168]">
                  Συμπληρώστε τη φόρμα και θα επικοινωνήσουμε
                  μαζί σας για να συζητήσουμε τις ανάγκες σας.
                </p>
              </div>

              <span className="hidden text-[11px] tracking-widest text-[#a89576] sm:block">
                DISETO.
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-9">

              {/* ΟΝΟΜΑ ΚΑΙ ΤΗΛΕΦΩΝΟ */}

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="contact-field">
                  <label className={labelClass} htmlFor="name">
                    ΟΝΟΜΑΤΕΠΩΝΥΜΟ *
                  </label>

                  <input
                    id="name"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Το όνομά σας"
                    className={inputClass}
                  />
                </div>

                <div className="contact-field">
                  <label className={labelClass} htmlFor="phone">
                    ΤΗΛΕΦΩΝΟ *
                  </label>

                  <input
                    id="phone"
                    required
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+30"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div className="contact-field">
                <label className={labelClass} htmlFor="email">
                  EMAIL *
                </label>

                <input
                  id="email"
                  required
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="example@email.com"
                  className={inputClass}
                />
              </div>

              {/* ΤΥΠΟΣ ΠΕΛΑΤΗ */}

              <div className="contact-field">
                <label className={labelClass} htmlFor="clientType">
                  ΕΙΜΑΣΤΕ ΣΕ ΕΠΙΚΟΙΝΩΝΙΑ ΜΕ
                </label>

                <select
                  id="clientType"
                  value={form.clientType}
                  onChange={(e) => updateField("clientType", e.target.value)}
                  className={`${inputClass} cursor-pointer`}
                >
                  {clientTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* ΕΙΔΟΣ ΕΡΓΟΥ */}

              <div className="contact-field">
                <label className={labelClass} htmlFor="project">
                  ΤΙ ΕΡΓΟ ΣΑΣ ΕΝΔΙΑΦΕΡΕΙ;
                </label>

                <select
                  id="project"
                  value={form.project}
                  onChange={(e) => updateField("project", e.target.value)}
                  className={`${inputClass} cursor-pointer`}
                >
                  {projects.map((project) => (
                    <option key={project} value={project}>
                      {project}
                    </option>
                  ))}
                </select>
              </div>

              {/* ΠΕΡΙΟΧΗ ΚΑΙ ΠΡΟΫΠΟΛΟΓΙΣΜΟΣ */}

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="contact-field">
                  <label className={labelClass} htmlFor="area">
                    ΠΕΡΙΟΧΗ ΕΡΓΟΥ
                  </label>

                  <input
                    id="area"
                    autoComplete="address-level2"
                    value={form.area}
                    onChange={(e) => updateField("area", e.target.value)}
                    placeholder="Π.χ. Αθήνα"
                    className={inputClass}
                  />
                </div>

                <div className="contact-field">
                  <label className={labelClass} htmlFor="budget">
                    ΕΝΔΕΙΚΤΙΚΟΣ ΠΡΟΫΠΟΛΟΓΙΣΜΟΣ
                  </label>

                  <select
                    id="budget"
                    value={form.budget}
                    onChange={(e) => updateField("budget", e.target.value)}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="">Επιλέξτε</option>

                    {budgets.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ΠΕΡΙΓΡΑΦΗ */}

              <div className="contact-field">
                <label className={labelClass} htmlFor="message">
                  ΠΕΡΙΓΡΑΨΤΕ ΜΑΣ ΤΗΝ ΙΔΕΑ ΣΑΣ
                </label>

                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  rows={4}
                  placeholder="Πείτε μας λίγα λόγια για το έργο σας..."
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* ΕΠΙΛΟΓΗ ΑΡΧΕΙΩΝ */}

              <div className="contact-field">
                <label className={labelClass} htmlFor="files">
                  ΦΩΤΟΓΡΑΦΙΕΣ Ή ΣΧΕΔΙΑ ΤΟΥ ΧΩΡΟΥ
                </label>

                <input
                  id="files"
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    setFiles(Array.from(e.target.files || []))
                  }
                  className="block w-full text-[11px] text-[#777168] file:mr-4 file:border file:border-[#d9d1c5] file:bg-transparent file:px-4 file:py-3 file:text-[10px] file:tracking-wider file:text-[#28231e] hover:file:border-[#a89576]"
                />

                {files.length > 0 && (
                  <p className="mt-3 text-[11px] text-[#777168]">
                    Επιλέχθηκαν {files.length} αρχεία:{" "}
                    {files.map((file) => file.name).join(", ")}
                  </p>
                )}

                <p className="mt-2 text-[10px] leading-5 text-[#938a7d]">
                  Μπορείτε να επιλέξετε φωτογραφίες ή σχέδια για το έργο σας.
                  Για την αποστολή τους θα χρειαστεί να τα επισυνάψετε
                  στο email που θα ανοίξει.
                </p>
              </div>

              {/* ΥΠΟΒΟΛΗ */}

              <button
                type="submit"
                className="contact-submit group flex w-full items-center justify-between bg-[#28231e] px-6 py-5 text-[10px] tracking-[0.17em] text-[#f7f4ed] transition-colors duration-300 hover:bg-[#a89576]"
              >
                <span>ΣΤΕΙΛΤΕ ΤΟ ΑΙΤΗΜΑ ΣΑΣ</span>

                <MoveUpRight
                  size={18}
                  strokeWidth={1.3}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>

              <p
                aria-live="polite"
                className={`text-[11px] leading-6 text-[#8b7655] ${
                  sent ? "block" : "hidden"
                }`}
              >
                Το πρόγραμμα email σας άνοιξε με τα στοιχεία του αιτήματος.
                Ελέγξτε το μήνυμα και πατήστε «Αποστολή» για να ολοκληρωθεί.
              </p>

            </form>
          </div>
        </div>

        {/* ΤΕΛΙΚΟ ΜΗΝΥΜΑ */}

        <div className="contact-reveal mt-20 flex flex-col gap-3 border-t border-[#ded8cd] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[9px] tracking-[0.16em] text-[#a89576]">
            DISETO — ΑΠΟ ΤΟ 1982
          </span>

          <span className="text-[9px] tracking-[0.16em] text-[#938a7d]">
            ΣΧΕΔΙΑΣΜΟΣ · ΠΟΙΟΤΗΤΑ · ΚΑΤΑΣΚΕΥΗ
          </span>
        </div>

      </div>

      {/* ANIMATIONS */}

      <style jsx>{`
        .contact-reveal {
          opacity: 0;
          transform: translate3d(0, 45px, 0);
          transition:
            opacity 0.95s cubic-bezier(0.2, 0.7, 0.2, 1),
            transform 1.05s cubic-bezier(0.2, 0.7, 0.2, 1);
          transition-delay: var(--delay, 0ms);
          will-change: opacity, transform;
        }

        .contact-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .contact-main-title {
          animation: contactTitleIn 1.2s cubic-bezier(0.2, 0.7, 0.2, 1) both;
        }

        @keyframes contactTitleIn {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .contact-form-panel {
          transition:
            background 0.5s ease,
            box-shadow 0.5s ease;
        }

        .contact-form-panel.is-visible {
          box-shadow: 0 15px 55px rgba(40, 35, 30, 0.035);
        }

        .contact-section input,
        .contact-section select,
        .contact-section textarea {
          transition:
            border-color 0.3s ease,
            background 0.3s ease;
        }

        .contact-section input:focus,
        .contact-section select:focus,
        .contact-section textarea:focus {
          border-color: #a89576;
        }

        .contact-submit {
          position: relative;
          overflow: hidden;
        }

        .contact-submit span,
        .contact-submit svg {
          position: relative;
          z-index: 1;
        }

        .contact-cta svg {
          transition: transform 0.35s ease;
        }

        .contact-cta:hover svg {
          transform: translate(3px, -3px);
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .contact-main-title {
            animation: none;
          }

          .contact-section * {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
