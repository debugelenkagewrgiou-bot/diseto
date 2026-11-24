"use client";

const steps = [
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
];

export default function OurProcess() {
  return (
    <section className="our-process">
      <div className="process-container">

        <div className="process-topline">
          <span>DISETO — Η ΔΙΑΔΙΚΑΣΙΑ ΜΑΣ</span>
          <span>ΑΠΟ ΤΟ 1982</span>
        </div>

        <div className="process-heading">
          <h2>
            Από το <em>σχέδιο</em>
            <br />
            στην παράδοση.
          </h2>

          <p>
            Κάθε έργο ξεκινά με μια ιδέα.
            Με σωστή μελέτη, προσεγμένη κατασκευή
            και προσωπική φροντίδα, τη μετατρέπουμε
            σε έναν χώρο φτιαγμένο για εσάς.
          </p>
        </div>

        <div className="process-list">
          {steps.map((step) => (
            <article className="process-step" key={step.number}>
              <span className="process-number">
                {step.number}
              </span>

              <div className="process-step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>

              <span className="process-symbol" aria-hidden="true">
                
              </span>
            </article>
          ))}
        </div>

        <div className="process-bottom">
          <span>ΑΠΟ ΤΗΝ ΠΡΩΤΗ ΙΔΕΑ</span>
          <span>ΜΕΧΡΙ ΤΗΝ ΤΕΛΕΥΤΑΙΑ ΛΕΠΤΟΜΕΡΕΙΑ</span>
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