
"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/languagecontext";

const translations = {
  el: {
    topline: "DISETO — Η ΔΙΑΔΙΚΑΣΙΑ ΜΑΣ",
    since: "ΑΠΟ ΤΟ 1982",
    headingStart: "Από το",
    headingHighlight: "σχέδιο",
    headingEnd: "στην παράδοση.",
    intro:
      "Κάθε έργο ξεκινά από μια ιδέα. Με προσεκτικό σχεδιασμό, επιδέξια κατασκευή και προσωπική φροντίδα, τη μετατρέπουμε σε έναν χώρο φτιαγμένο για εσάς.",
    steps: [
      {
        number: "01",
        title: "Αρχική συνάντηση",
        description:
          "Συζητάμε τις ανάγκες σας, το προσωπικό σας στυλ, το διαθέσιμο budget και το χρονοδιάγραμμα. Καταγράφουμε τις απαιτήσεις του έργου και, εφόσον υπάρχει αρχιτέκτονας ή διακοσμητής, συνεργαζόμαστε μαζί του από την πρώτη στιγμή.",
        image: "/images/process/step1.png",
        imageAlt: "Αρχική συνάντηση και μελέτη έργου",
      },
      {
        number: "02",
        title: "Σχεδιασμός & προσφορά",
        description:
          "Μελετάμε τον χώρο και προχωράμε στον σχεδιασμό της κατασκευής. Ετοιμάζουμε τεχνικά σχέδια, προτείνουμε υλικά και φινιρίσματα και σας παρουσιάζουμε αναλυτική προσφορά, ώστε να γνωρίζετε κάθε λεπτομέρεια πριν ξεκινήσει η υλοποίηση.",
        image: "/images/process/step2.png",
        imageAlt: "Σχεδιασμός και τεχνικά σχέδια",
      },
      {
        number: "03",
        title: "Κατασκευή στο εργαστήριό μας",
        description:
          "Κάθε δημιουργία κατασκευάζεται στο εργαστήριό μας με σύγχρονα μηχανήματα ακριβείας και την εμπειρία των τεχνιτών μας. Η τεχνολογία εξασφαλίζει ακρίβεια στις διαστάσεις, ενώ το ανθρώπινο χέρι φροντίζει το φινίρισμα, τις λεπτομέρειες και το ταίριασμα στα νερά του ξύλου. Αν το επιθυμείτε, μπορείτε να επισκεφθείτε το εργαστήριό μας και να παρακολουθήσετε την εξέλιξη του έργου σας.",
        image: "/images/process/step3.png",
        imageAlt: "Κατασκευή επίπλων στο εργαστήριο",
      },
      {
        number: "04",
        title: "Τοποθέτηση & παράδοση",
        description:
          "Ολοκληρώνουμε το έργο με εξειδικευμένα συνεργεία τοποθέτησης, προσοχή σε κάθε λεπτομέρεια και συνέπεια στο συμφωνημένο χρονοδιάγραμμα. Παραδίδουμε τον χώρο σας έτοιμο, με την εγγύηση και την υποστήριξη της DiSeto.",
        image: "/images/process/step4.png",
        imageAlt: "Ολοκληρωμένος χώρος μετά την τοποθέτηση",
      },
    ],
    bottomStart: "ΑΠΟ ΤΗΝ ΠΡΩΤΗ ΙΔΕΑ",
    bottomEnd: "ΜΕΧΡΙ ΤΗΝ ΤΕΛΕΥΤΑΙΑ ΛΕΠΤΟΜΕΡΕΙΑ",
    imageLabel: "ΤΟ ΔΙΚΟ ΜΑΣ PROCESS",
  },

  en: {
    topline: "DISETO — OUR PROCESS",
    since: "SINCE 1982",
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
        image: "/images/process/step1.png",
        imageAlt: "Initial consultation and project planning",
      },
      {
        number: "02",
        title: "Design & proposal",
        description:
          "We study your space and develop the design of your project. We prepare technical drawings, recommend materials and finishes, and present a detailed proposal so you know every aspect before production begins.",
        image: "/images/process/step2.png",
        imageAlt: "Design and technical drawings",
      },
      {
        number: "03",
        title: "Crafted in our workshop",
        description:
          "Every creation is made in our workshop using modern precision machinery and the expertise of our craftsmen. Technology ensures dimensional accuracy, while the human touch takes care of the finishing, details and natural wood grain matching. You are also welcome to visit our workshop and follow the progress of your project.",
        image: "/images/process/step3.png",
        imageAlt: "Furniture production in our workshop",
      },
      {
        number: "04",
        title: "Installation & delivery",
        description:
          "We complete your project with specialized installation teams, attention to every detail and commitment to the agreed timeline. We deliver your space ready to enjoy, backed by DiSeto's warranty and ongoing support.",
        image: "/images/process/step4.png",
        imageAlt: "Completed interior after installation",
      },
    ],
    bottomStart: "FROM THE FIRST IDEA",
    bottomEnd: "TO THE VERY LAST DETAIL",
    imageLabel: "OUR PROCESS",
  },
};

export default function OurProcess() {
  const { language } = useLanguage();
  const t = translations[language] || translations.el;

  const [activeStep, setActiveStep] = useState(0);
  const processRef = useRef(null);

  // Εμφάνιση στοιχείων κατά το scroll
  useEffect(() => {
    const root = processRef.current;
    if (!root) return;

    const elements = root.querySelectorAll(".process-reveal");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
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
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  // Αυτόματη εναλλαγή εικόνας κάθε 2 δευτερόλεπτα
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((current) => (current + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const activeItem = t.steps[activeStep];

  return (
    <section className="our-process" ref={processRef}>
      <div className="process-container">

        <div className="process-topline process-reveal">
          <span>{t.topline}</span>

          <div className="process-topline-meta">
            <span>{t.since}</span>
          </div>
        </div>

        <div className="process-heading process-reveal">
          <h2>
            {t.headingStart} <em>{t.headingHighlight}</em>
            <br />
            {t.headingEnd}
          </h2>

          <p>{t.intro}</p>
        </div>

        <div className="process-showcase">

          <div className="process-list">
            {t.steps.map((step, index) => (
              <button
                type="button"
                className={`process-step process-reveal ${
                  activeStep === index ? "active" : ""
                }`}
                key={step.number}
                onClick={() => setActiveStep(index)}
                aria-pressed={activeStep === index}
              >
                <span className="process-number">
                  {step.number}
                </span>

                <span className="process-step-content">
                  <span className="process-step-title">
                    {step.title}
                  </span>

                  <span className="process-step-description">
                    {step.description}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="process-visual process-reveal">
            {t.steps.map((step, index) => (
              <div
                key={step.number}
                className={`process-image ${
                  activeStep === index ? "visible" : ""
                }`}
                aria-hidden={activeStep !== index}
              >
                <img
                  src={step.image}
                  alt={step.imageAlt}
                />
              </div>
            ))}

            <div className="process-image-overlay">
              <span>{t.imageLabel}</span>
              <strong>{activeItem.number}</strong>
            </div>
          </div>

        </div>

        <div className="process-bottom process-reveal">
          <span>{t.bottomStart}</span>
          <span>{t.bottomEnd}</span>
        </div>

      </div>

      <style jsx>{`
        .our-process,
        .our-process * {
          box-sizing: border-box;
        }

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

        .process-reveal {
          opacity: 1;
          transform: translate3d(0, 12px, 0);
          transition: transform 650ms cubic-bezier(0.2, 0.7, 0.2, 1);
          will-change: transform;
        }

        .process-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          will-change: auto;
        }

        .process-topline-meta {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .process-language-toggle {
          min-width: 42px;
          min-height: 42px;
          padding: 0 10px;
          border: 1px solid rgba(197, 164, 125, 0.55);
          border-radius: 999px;
          background: transparent;
          color: #f7f4ed;
          font: inherit;
          font-size: 10px;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease;
        }

        .process-language-toggle:hover,
        .process-language-toggle:focus-visible {
          outline: 2px solid #c5a47d;
          outline-offset: 3px;
          background: #c5a47d;
          color: #351019;
        }

        .process-topline,
        .process-bottom {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          color: #c5a47d;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.17em;
        }

        .process-heading {
          display: grid;
          grid-template-columns: 1.2fr 0.6fr;
          gap: 8%;
          align-items: end;
          padding: 85px 0 75px;
        }

        .process-heading h2 {
          margin: 0;
          color: #f7f4ed;
          font-family: Georgia, serif;
          font-size: clamp(55px, 7.5vw, 110px);
          font-weight: 500;
          line-height: 0.98;
          letter-spacing: -0.065em;
        }

        .process-heading h2 em {
          color: #c5a47d;
          font-weight: 500;
        }

        .process-heading p {
          max-width: 380px;
          margin: 0 0 8px auto;
          color: #d1c1bd;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 15px;
          font-weight: 400;
          line-height: 2;
        }

        .process-showcase {
          display: grid;
          grid-template-columns: 1fr 0.9fr;
          gap: 65px;
          align-items: stretch;
        }

        .process-list {
          border-top: 1px solid rgba(247, 244, 237, 0.2);
        }

        .process-step {
          width: 100%;
          display: grid;
          grid-template-columns: 45px 1fr 20px;
          gap: 20px;
          align-items: start;
          padding: 30px 12px;
          border: 0;
          border-bottom: 1px solid rgba(247, 244, 237, 0.2);
          background: transparent;
          color: inherit;
          text-align: left;
          cursor: pointer;
          font: inherit;
          transition: background 0.3s ease, padding 0.3s ease;
        }

        .process-step:hover,
        .process-step.active {
          background: rgba(255, 255, 255, 0.055);
          padding-left: 20px;
          padding-right: 20px;
        }

        .process-number {
          padding-top: 5px;
          color: #c5a47d;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.12em;
        }

        .process-step-content {
          display: block;
        }

        .process-step-title {
          display: block;
          margin: 0 0 12px;
          color: #f7f4ed;
          font-family: Georgia, serif;
          font-size: clamp(26px, 2.3vw, 35px);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 1.2;
          transition: color 0.3s ease;
        }

        .process-step.active .process-step-title,
        .process-step:hover .process-step-title {
          color: #c5a47d;
        }

        .process-step-description {
          display: block;
          max-width: 600px;
          color: #d1c1bd;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.9;
          opacity: 1;
          visibility: visible;
        }

        .process-step.active .process-step-description {
          opacity: 1;
          visibility: visible;
        }

        .process-symbol {
          padding-top: 3px;
          color: #c5a47d;
          font-size: 19px;
          opacity: 0;
          transform: translate(-5px, 5px);
          transition: all 0.3s ease;
        }

        .process-step.active .process-symbol,
        .process-step:hover .process-symbol {
          opacity: 1;
          transform: translate(0, 0);
        }

        .process-visual {
          position: relative;
          min-height: 570px;
          overflow: hidden;
          background: #241016;
        }

        .process-image {
          position: absolute;
          inset: 0;
          opacity: 0;
          visibility: hidden;
          transform: scale(1.04);
          transition:
            opacity 0.65s ease,
            transform 1s ease,
            visibility 0.65s ease;
          pointer-events: none;
        }

        .process-image.visible {
          opacity: 1;
          visibility: visible;
          transform: scale(1);
        }

        .process-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .process-image-overlay {
          position: absolute;
          inset: auto 0 0;
          display: flex;
          justify-content: space-between;
          align-items: end;
          padding: 25px;
          background: linear-gradient(
            transparent,
            rgba(20, 8, 12, 0.65)
          );
          color: #f7f4ed;
          pointer-events: none;
        }

        .process-image-overlay span {
          color: #c5a47d;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.17em;
        }

        .process-image-overlay strong {
          font-family: Georgia, serif;
          font-size: 42px;
          font-weight: 500;
        }

        .process-bottom {
          padding-top: 25px;
          color: #c5a47d;
        }

        @media (max-width: 1000px) {
          .our-process {
            padding-right: 5%;
            padding-left: 5%;
          }

          .process-showcase {
            grid-template-columns: minmax(0, 1fr) minmax(280px, 0.85fr);
            gap: 30px;
          }

          .process-visual {
            min-height: 480px;
          }

          .process-step {
            grid-template-columns: 38px minmax(0, 1fr) 18px;
            gap: 14px;
            padding-right: 8px;
            padding-left: 8px;
          }

          .process-step-title {
            font-size: clamp(24px, 2.8vw, 32px);
          }
        }

        @media (max-width: 800px) {
          .process-heading {
            grid-template-columns: 1fr;
            gap: 35px;
          }

          .process-heading p {
            margin: 0;
          }

          .process-showcase {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .process-visual {
            min-height: 430px;
            grid-row: 1;
          }
        }

        @media (max-width: 600px) {
          .our-process {
            padding: 68px 5% 58px;
          }

          .process-reveal {
            transform: translate3d(0, 22px, 0);
            transition-duration: 650ms;
          }

          .process-topline,
          .process-bottom {
            font-size: 9px;
            line-height: 1.65;
            letter-spacing: 0.12em;
          }

          .process-topline {
            align-items: center;
            gap: 10px;
          }

          .process-topline-meta {
            gap: 7px;
            flex-shrink: 0;
          }

          .process-topline-meta > span {
            white-space: nowrap;
          }

          .process-language-toggle {
            min-width: 38px;
            min-height: 38px;
          }

          .process-heading {
            gap: 20px;
            padding: 54px 0 34px;
          }

          .process-heading h2 {
            font-size: clamp(43px, 11vw, 62px);
            line-height: 0.98;
            letter-spacing: -0.07em;
          }

          .process-heading p {
            max-width: 34rem;
            font-size: 14px;
            line-height: 1.8;
          }

          .process-showcase {
            gap: 18px;
          }

          .process-visual {
            min-height: 0;
            height: clamp(255px, 70vw, 360px);
            border-radius: 5px;
          }

          .process-image-overlay {
            padding: 18px;
          }

          .process-image-overlay span {
            font-size: 9px;
            letter-spacing: 0.14em;
          }

          .process-image-overlay strong {
            font-size: 34px;
          }

          .process-list {
            border-top: 1px solid rgba(197, 164, 125, 0.48);
          }

          .process-step {
            grid-template-columns: 34px minmax(0, 1fr) 18px;
            gap: 10px;
            align-items: start;
            padding: 19px 9px;
            border-bottom-color: rgba(197, 164, 125, 0.32);
            transition:
              background 0.25s ease,
              padding 0.25s ease;
          }

          .process-step:hover,
          .process-step.active {
            padding-right: 11px;
            padding-left: 11px;
            background: rgba(255, 255, 255, 0.045);
          }

          .process-number {
            display: grid;
            place-items: center;
            width: 30px;
            height: 30px;
            padding: 0;
            border: 1px solid rgba(197, 164, 125, 0.48);
            border-radius: 50%;
            font-size: 10px;
          }

          .process-step-title {
            margin: 2px 0 0;
            font-size: clamp(21px, 6vw, 26px);
            font-weight: 500;
            line-height: 1.2;
          }

          .process-step-description {
            display: block;
            margin-top: 10px;
            font-size: 13px;
            line-height: 1.75;
            opacity: 1;
            visibility: visible;
          }

          .process-symbol {
            padding-top: 6px;
            font-size: 16px;
          }

          .process-bottom {
            gap: 7px;
            padding-top: 19px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .process-reveal {
            opacity: 1;
            transform: none;
            transition: none;
            will-change: auto;
          }

          .process-step,
          .process-image,
          .process-step-title,
          .process-symbol,
          .process-step.active .process-step-description {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
