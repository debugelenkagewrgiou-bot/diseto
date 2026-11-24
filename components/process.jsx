
"use client";

import { useLanguage } from "@/components/languagecontext";

const content = {
  el: {
    topline: "DISETO — Η ΔΙΑΔΙΚΑΣΙΑ ΜΑΣ",
    headingStart: "Από το",
    headingHighlight: "σχέδιο",
    headingEnd: "στην παράδοση.",
    intro:
      "Κάθε έργο ξεκινά με μια ιδέα. Με σωστή μελέτη, προσεγμένη κατασκευή και προσωπική φροντίδα, τη μετατρέπουμε σε έναν χώρο φτιαγμένο για εσάς.",
    steps: [
      {
        number: "01",
        title: "Αρχική συνάντηση",
        description:
          "Συζητάμε τις ανάγκες σας, το προσωπικό σας στυλ, το διαθέσιμο budget και το χρονοδιάγραμμα. Καταγράφουμε τις απαιτήσεις του έργου και, εφόσον υπάρχει αρχιτέκτονας ή διακοσμητής, συνεργαζόμαστε μαζί του από την πρώτη στιγμή.",
      },
      {
        number: "02",
        title: "Σχεδιασμός & προσφορά",
        description:
          "Μελετάμε τον χώρο και προχωράμε στον σχεδιασμό της κατασκευής. Ετοιμάζουμε τεχνικά σχέδια, προτείνουμε υλικά και φινιρίσματα και σας παρουσιάζουμε αναλυτική προσφορά, ώστε να γνωρίζετε κάθε λεπτομέρεια πριν ξεκινήσει η υλοποίηση.",
      },
      {
        number: "03",
        title: "Κατασκευή στο εργαστήριό μας",
        description:
          "Κάθε δημιουργία κατασκευάζεται στο εργαστήριό μας με σύγχρονα μηχανήματα ακριβείας και την εμπειρία των τεχνιτών μας. Η τεχνολογία εξασφαλίζει ακρίβεια στις διαστάσεις, ενώ το ανθρώπινο χέρι φροντίζει το φινίρισμα, τις λεπτομέρειες και το ταίριασμα στα νερά του ξύλου. Αν το επιθυμείτε, μπορείτε να επισκεφθείτε το εργαστήριό μας και να παρακολουθήσετε την εξέλιξη του έργου σας.",
      },
      {
        number: "04",
        title: "Τοποθέτηση & παράδοση",
        description:
          "Ολοκληρώνουμε το έργο με εξειδικευμένα συνεργεία τοποθέτησης, προσοχή σε κάθε λεπτομέρεια και συνέπεια στο συμφωνημένο χρονοδιάγραμμα. Παραδίδουμε τον χώρο σας έτοιμο, με την εγγύηση και την υποστήριξη της DiSeto.",
      },
    ],
    bottomStart: "ΑΠΟ ΤΗΝ ΠΡΩΤΗ ΙΔΕΑ",
    bottomEnd: "ΜΕΧΡΙ ΤΗΝ ΤΕΛΕΥΤΑΙΑ ΛΕΠΤΟΜΕΡΕΙΑ",
  },

  en: {
    topline: "DISETO — OUR PROCESS",
    headingStart: "From",
    headingHighlight: "concept",
    headingEnd: "to completion.",
    intro:
      "Every project begins with an idea. Through thoughtful planning, meticulous craftsmanship and personal attention, we transform it into a space made for you.",
    steps: [
      {
        number: "01",
        title: "Initial consultation",
        description:
          "We discuss your needs, personal style, available budget and timeline. We define the project requirements and, if you are working with an architect or interior designer, we collaborate with them from the very beginning.",
      },
      {
        number: "02",
        title: "Design & proposal",
        description:
          "We study your space and develop the design of your project. We prepare technical drawings, recommend materials and finishes, and present a detailed proposal so you know every aspect before production begins.",
      },
      {
        number: "03",
        title: "Crafted in our workshop",
        description:
          "Every creation is made in our workshop using modern precision machinery and the expertise of our craftsmen. Technology ensures dimensional accuracy, while the human touch takes care of the finishing, details and natural wood grain matching. You are also welcome to visit our workshop and follow the progress of your project.",
      },
      {
        number: "04",
        title: "Installation & delivery",
        description:
          "We complete your project with specialized installation teams, attention to every detail and commitment to the agreed timeline. We deliver your space ready to enjoy, backed by DiSeto's warranty and ongoing support.",
      },
    ],
    bottomStart: "FROM THE FIRST IDEA",
    bottomEnd: "TO THE VERY LAST DETAIL",
  },
};

export default function OurProcess() {
  const { language } = useLanguage();
  const t = content[language] || content.el;

  return (
    <section className="our-process">
      <div className="process-container">

        <div className="process-topline">
          <span>{t.topline}</span>
          <span>{language === "el" ? "ΑΠΟ ΤΟ 1982" : "SINCE 1982"}</span>
        </div>

        <div className="process-heading">
          <h2>
            {t.headingStart} <em>{t.headingHighlight}</em>
            <br />
            {t.headingEnd}
          </h2>

          <p>{t.intro}</p>
        </div>

        <div className="process-list">
          {t.steps.map((step) => (
            <article className="process-step" key={step.number}>
              <span className="process-number">
                {step.number}
              </span>

              <div className="process-step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>

              <span className="process-symbol" aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>

        <div className="process-bottom">
          <span>{t.bottomStart}</span>
          <span>{t.bottomEnd}</span>
        </div>

      </div>

      <style jsx>{`
        .our-process {
          background: #351019;
          color: #f7f4ed;
          padding: 125px 7% 110px;
          overflow: hidden;
        }

        .process-container {
          max-width: 1500px;
          margin: 0 auto;
        }

        .process-topline,
        .process-heading,
        .process-step,
        .process-bottom {
          animation: process-reveal 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both;
        }

        .process-heading { animation-delay: 100ms; }
        .process-step:nth-child(1) { animation-delay: 180ms; }
        .process-step:nth-child(2) { animation-delay: 280ms; }
        .process-step:nth-child(3) { animation-delay: 380ms; }
        .process-step:nth-child(4) { animation-delay: 480ms; }
        .process-bottom { animation-delay: 580ms; }

        @keyframes process-reveal {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .process-topline,
        .process-bottom {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          color: #c5a47d;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 9px;
          letter-spacing: 0.17em;
        }

        .process-heading {
          display: grid;
          grid-template-columns: 1.2fr 0.6fr;
          gap: 8%;
          align-items: end;
          padding: 85px 0 95px;
        }

        .process-heading h2 {
          margin: 0;
          color: #f7f4ed;
          font-family: Georgia, serif;
          font-size: clamp(55px, 7.5vw, 110px);
          font-weight: 400;
          line-height: 0.98;
          letter-spacing: -0.065em;
        }

        .process-heading h2 em {
          color: #c5a47d;
          font-weight: 400;
        }

        .process-heading p {
          max-width: 380px;
          margin: 0 0 8px auto;
          color: #d1c1bd;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;
          line-height: 2;
        }

        .process-list {
          border-top: 1px solid rgba(247, 244, 237, 0.2);
        }

        .process-step {
          display: grid;
          grid-template-columns: 80px 1fr 35px;
          gap: 25px;
          align-items: start;
          padding: 38px 15px;
          border-bottom: 1px solid rgba(247, 244, 237, 0.2);
          transition:
            background 0.35s ease,
            padding 0.35s ease;
        }

        .process-step:hover {
          background: rgba(255, 255, 255, 0.055);
          padding-left: 25px;
          padding-right: 25px;
        }

        .process-number {
          padding-top: 9px;
          color: #c5a47d;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 11px;
          letter-spacing: 0.12em;
        }

        .process-step-content h3 {
          margin: 0 0 15px;
          color: #f7f4ed;
          font-family: Georgia, serif;
          font-size: clamp(25px, 3vw, 38px);
          font-weight: 400;
          letter-spacing: -0.04em;
          line-height: 1.15;
          transition: color 0.3s ease;
        }

        .process-step:hover h3 {
          color: #c5a47d;
        }

        .process-step-content p {
          max-width: 720px;
          margin: 0;
          color: #d1c1bd;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;
          line-height: 2;
        }

        .process-symbol {
          padding-top: 4px;
          color: #c5a47d;
          font-size: 20px;
          opacity: 0;
          transform: translate(-5px, 5px);
          transition:
            opacity 0.3s ease,
            transform 0.3s ease;
        }

        .process-step:hover .process-symbol {
          opacity: 1;
          transform: translate(0, 0);
        }

        .process-bottom {
          padding-top: 25px;
          color: #c5a47d;
        }

        @media (max-width: 800px) {
          .process-heading {
            grid-template-columns: 1fr;
            gap: 35px;
          }

          .process-heading p {
            margin: 0;
          }
        }

        @media (max-width: 600px) {
          .our-process {
            padding: 85px 6% 75px;
          }

          .process-topline,
          .process-bottom {
            font-size: 8px;
          }

          .process-heading {
            padding: 65px 0 55px;
          }

          .process-heading h2 {
            font-size: clamp(48px, 11vw, 68px);
          }

          .process-heading p {
            font-size: 12px;
          }

          .process-step {
            grid-template-columns: 32px 1fr;
            gap: 12px;
            padding: 28px 5px;
          }

          .process-step:hover {
            padding-left: 5px;
            padding-right: 5px;
          }

          .process-step-content h3 {
            font-size: 25px;
          }

          .process-step-content p {
            font-size: 12px;
            line-height: 1.9;
          }

          .process-symbol {
            display: none;
          }

          .process-bottom {
            flex-direction: column;
            gap: 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .process-topline,
          .process-heading,
          .process-step,
          .process-bottom {
            animation: none;
          }

          .process-step,
          .process-step-content h3,
          .process-symbol {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
