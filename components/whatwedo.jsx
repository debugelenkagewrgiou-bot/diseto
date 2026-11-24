
"use client";

import { useEffect } from "react";
import { useLanguage } from "@/components/languagecontext";

const content = {
  el: {
    eyebrow: "DISETO — ΟΙ ΥΠΗΡΕΣΙΕΣ ΜΑΣ",
    since: "ΑΠΟ ΤΟ 1982",
    title: "ΔΗΜΙΟΥΡΓΟΥΜΕ",
    titleHighlight: "ΤΟΝ ΧΩΡΟ ΣΑΣ.",
    intro:
      "Από την ιδέα μέχρι την τελική κατασκευή. Δημιουργούμε ξύλινες κατασκευές, έπιπλα και ολοκληρωμένους χώρους με διαχρονική αισθητική και έμφαση στη λεπτομέρεια.",
    servicesHeading: "ΤΙ ΜΠΟΡΟΥΜΕ ΝΑ ΔΗΜΙΟΥΡΓΗΣΟΥΜΕ",
    services: [
      {
        number: "01",
        title: "Κουζίνες κατά παραγγελία",
        description:
          "Σχεδιάζουμε και κατασκευάζουμε κουζίνες στα μέτρα σας, συνδυάζοντας αισθητική, εργονομία και λειτουργικότητα. Κάθε δημιουργία προσαρμόζεται στον χώρο και στις καθημερινές σας ανάγκες.",
      },
      {
        number: "02",
        title: "Έπιπλα & ειδικές κατασκευές",
        description:
          "Κατασκευάζουμε έπιπλα και ξύλινες δημιουργίες κατά παραγγελία. Από μια ξεχωριστή σύνθεση μέχρι μια εξειδικευμένη κατασκευή, δίνουμε μορφή στις ιδέες σας.",
      },
      {
        number: "03",
        title: "Ντουλάπες & αποθηκευτικοί χώροι",
        description:
          "Δημιουργούμε εξατομικευμένες λύσεις αποθήκευσης με προσεγμένα υλικά, καθαρές γραμμές και έξυπνη αξιοποίηση κάθε διαθέσιμου χώρου.",
      },
      {
        number: "04",
        title: "Σχεδιασμός εσωτερικών χώρων",
        description:
          "Μελετάμε και διαμορφώνουμε κατοικίες, ξενοδοχεία και επαγγελματικούς χώρους. Συνδυάζουμε υλικά, φωτισμό και έπιπλα για ένα ολοκληρωμένο αποτέλεσμα.",
      },
      {
        number: "05",
        title: "Ανακαινίσεις & επαγγελματικοί χώροι",
        description:
          "Αναλαμβάνουμε ανακαινίσεις και εξοπλισμό επαγγελματικών χώρων και ξενοδοχειακών μονάδων, προσφέροντας ολοκληρωμένες λύσεις σχεδιασμού και κατασκευής.",
      },
      {
        number: "06",
        title: "Σχεδιασμός & παραγωγή",
        description:
          "Από την πρώτη ιδέα και τη μελέτη μέχρι την τελική κατασκευή, αξιοποιούμε την εμπειρία και την τεχνογνωσία μας, με έμφαση στην ποιότητα και σε κάθε λεπτομέρεια.",
      },
    ],
    philosophy: "Η ΦΙΛΟΣΟΦΙΑ ΜΑΣ",
    philosophyTitle: ["ΟΜΟΡΦΙΑ", "ΣΕ ΚΑΘΕ", "ΛΕΠΤΟΜΕΡΕΙΑ."],
    philosophyParagraphs: [
      "Πιστεύουμε πως κάθε χώρος έχει τη δική του ταυτότητα. Η ποιότητα των υλικών, η προσεγμένη κατασκευή και η ισορροπία στον σχεδιασμό κάνουν τη διαφορά.",
      "Δημιουργούμε με γνώση, φροντίδα και σεβασμό στις δικές σας ανάγκες, δίνοντας αξία σε κάθε λεπτομέρεια.",
    ],
    contactLink: "ΑΣ ΣΧΕΔΙΑΣΟΥΜΕ ΤΟ ΕΠΟΜΕΝΟ ΕΡΓΟ ΣΑΣ",
    bottom: "ΣΧΕΔΙΑΣΜΟΣ · ΠΟΙΟΤΗΤΑ · ΔΙΑΧΡΟΝΙΚΟΤΗΤΑ",
  },

  en: {
    eyebrow: "DISETO — OUR SERVICES",
    since: "EST. 1982",
    title: "WE CREATE",
    titleHighlight: "YOUR SPACE.",
    intro:
      "From the initial idea to the final realization. We create bespoke wooden constructions, furniture and complete interiors with timeless aesthetics and attention to detail.",
    servicesHeading: "WHAT WE CAN CREATE",
    services: [
      {
        number: "01",
        title: "Bespoke Kitchens",
        description:
          "We design and craft made-to-measure kitchens, combining aesthetics, ergonomics and functionality. Every creation is tailored to your space and everyday needs.",
      },
      {
        number: "02",
        title: "Furniture & Custom Creations",
        description:
          "We create bespoke furniture and wooden constructions. From distinctive furniture compositions to specialized installations, we bring your ideas to life.",
      },
      {
        number: "03",
        title: "Wardrobes & Storage Solutions",
        description:
          "We create personalized storage solutions using carefully selected materials, clean lines and intelligent use of every available space.",
      },
      {
        number: "04",
        title: "Interior Design",
        description:
          "We design and shape residential, hospitality and commercial spaces. We combine materials, lighting and furniture to create cohesive interiors.",
      },
      {
        number: "05",
        title: "Renovations & Commercial Spaces",
        description:
          "We undertake renovations and fit-outs for commercial spaces and hotels, delivering comprehensive design and construction solutions.",
      },
      {
        number: "06",
        title: "Design & Production",
        description:
          "From the initial concept and planning to the final construction, we draw on our experience and expertise, with a focus on quality and every detail.",
      },
    ],
    philosophy: "OUR PHILOSOPHY",
    philosophyTitle: ["BEAUTY", "IN EVERY", "DETAIL."],
    philosophyParagraphs: [
      "We believe every space has its own identity. The quality of materials, thoughtful craftsmanship and balance in design make all the difference.",
      "We create with knowledge, care and respect for your needs, giving value to every detail.",
    ],
    contactLink: "LET'S DESIGN YOUR NEXT PROJECT",
    bottom: "DESIGN · QUALITY · TIMELESSNESS",
  },
};

export default function WhatWeDo() {
  const { language } = useLanguage();
  const t = content[language] || content.el;

  useEffect(() => {
    const elements = document.querySelectorAll(".what-reveal");

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

    elements.forEach((element) => {
      element.classList.remove("is-visible");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [language]);

  return (
    <section className="what-we-do" id="what-we-do">
      <div className="what-container">
        {/* HEADING */}
        <div className="what-heading what-reveal">
          <div className="what-topline">
            <span className="what-eyebrow">{t.eyebrow}</span>
            <span className="what-since">{t.since}</span>
          </div>

          <div className="what-heading-grid">
            <h2 className="what-main-title">
              {t.title}
              <br />
              <span>{t.titleHighlight}</span>
            </h2>

            <div className="what-intro-wrap">
              <p className="what-intro">{t.intro}</p>
            </div>
          </div>
        </div>

        {/* SERVICES */}
        <div className="services-heading what-reveal">
          <span>{t.servicesHeading}</span>
          <span>01 — 06</span>
        </div>

        <div className="services-list">
          {t.services.map((service, index) => (
            <article
              className="service-item what-reveal"
              key={service.number}
              style={{
                "--service-delay": `${(index % 2) * 150}ms`,
              }}
            >
              <div className="service-number">{service.number}</div>

              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* PHILOSOPHY */}
        <div className="what-footer">
          <div className="philosophy-title what-reveal">
            <span className="what-eyebrow">{t.philosophy}</span>

            <h2>
              {t.philosophyTitle[0]}
              <br />
              <span>{t.philosophyTitle[1]}</span>
              <br />
              {t.philosophyTitle[2]}
            </h2>
          </div>

          <div className="philosophy-content what-reveal">
            {t.philosophyParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <a href="#contact" className="philosophy-link">
              {t.contactLink}
              <span className="philosophy-arrow"></span>
            </a>
          </div>
        </div>

        {/* BOTTOM LINE */}
        <div className="what-bottom-line what-reveal">
          <span>{t.bottom}</span>
        </div>
      </div>

      <style jsx>{`
        .what-we-do {
          background: #f7f4ed;
          color: #28231e;
          padding: 145px 7% 90px;
          overflow: hidden;
        }

        .what-container {
          max-width: 1500px;
          margin: 0 auto;
        }

        .what-topline {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 22px;
        }

        .what-eyebrow,
        .what-since {
          color: #a89576;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.19em;
        }

        .what-since {
          color: #938a7d;
        }

        .what-heading-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 8%;
          align-items: end;
          padding: 85px 0 120px;
        }

        .what-heading h2,
        .what-footer h2 {
          margin: 0;
          color: #28231e;
          font-family: Georgia, serif;
          font-size: clamp(58px, 7.4vw, 112px);
          font-weight: 400;
          line-height: 0.91;
          letter-spacing: -0.065em;
        }

        .what-heading h2 span,
        .what-footer h2 span {
          color: #a89576;
          font-style: italic;
        }

        .what-intro-wrap {
          max-width: 420px;
          margin: 0 0 10px auto;
        }

        .what-intro {
          margin: 0;
          color: #777168;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 14px;
          line-height: 2;
        }

        .services-heading {
          display: flex;
          justify-content: space-between;
          padding: 18px 0;
          color: #a89576;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 9px;
          letter-spacing: 0.17em;
        }

        .services-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: 65px;
          row-gap: 0;
        }

        .service-item {
          display: grid;
          grid-template-columns: 38px 1fr;
          gap: 20px;
          align-items: start;
          min-height: 190px;
          padding: 38px 10px;
          transition: background 0.35s ease;
        }

        .service-item:hover {
          background: #f0ece3;
        }

        .service-number {
          padding-top: 7px;
          color: #a89576;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 10px;
          letter-spacing: 0.12em;
        }

        .service-content h3 {
          max-width: 400px;
          margin: 0 0 18px;
          color: #28231e;
          font-family: Georgia, serif;
          font-size: clamp(22px, 2.2vw, 31px);
          font-weight: 400;
          line-height: 1.15;
          letter-spacing: -0.04em;
          transition: color 0.3s ease;
        }

        .service-item:hover .service-content h3 {
          color: #a89576;
        }

        .service-content p {
          max-width: 430px;
          margin: 0;
          color: #777168;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 12px;
          line-height: 1.9;
        }

        .what-footer {
          display: grid;
          grid-template-columns: 1fr 0.7fr;
          gap: 12%;
          align-items: end;
          margin-top: 160px;
          padding-bottom: 120px;
        }

        .philosophy-title h2 {
          margin-top: 28px;
          font-size: clamp(54px, 6vw, 86px);
        }

        .philosophy-title h2 span {
          font-style: normal;
        }

        .philosophy-content {
          max-width: 430px;
          margin-left: auto;
        }

        .philosophy-content p {
          margin: 15px 0;
          color: #777168;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;
          line-height: 2;
        }

        .philosophy-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-top: 25px;
          padding-bottom: 10px;
          border-bottom: 1px solid #a89576;
          color: #28231e;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 9px;
          letter-spacing: 0.14em;
          transition:
            color 0.3s ease,
            gap 0.3s ease,
            border-color 0.3s ease;
        }

        .philosophy-link:hover {
          color: #a89576;
          gap: 19px;
          border-color: #28231e;
        }

        .philosophy-arrow {
          font-size: 15px;
        }

        .what-bottom-line {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding-top: 22px;
          color: #a89576;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 9px;
          letter-spacing: 0.15em;
        }

        .what-reveal {
          opacity: 0;
          transform: translate3d(0, 45px, 0);
          transition:
            opacity 0.9s cubic-bezier(0.2, 0.7, 0.2, 1),
            transform 1s cubic-bezier(0.2, 0.7, 0.2, 1);
          will-change: opacity, transform;
        }

        .what-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .service-item.what-reveal {
          transition:
            opacity 0.9s cubic-bezier(0.2, 0.7, 0.2, 1),
            transform 1s cubic-bezier(0.2, 0.7, 0.2, 1),
            background 0.35s ease;
          transition-delay: var(--service-delay, 0ms);
        }

        .what-heading.what-reveal {
          transform: translate3d(0, 55px, 0);
          transition-duration: 1.2s;
        }

        .what-heading.what-reveal.is-visible {
          transform: translate3d(0, 0, 0);
        }

        .philosophy-title.what-reveal {
          transition-delay: 100ms;
        }

        .philosophy-content.what-reveal {
          transition-delay: 250ms;
        }

        .what-bottom-line.what-reveal {
          transition-delay: 150ms;
        }

        @media (max-width: 900px) {
          .what-heading-grid {
            grid-template-columns: 1fr;
            gap: 45px;
          }

          .what-intro-wrap {
            margin: 0;
          }

          .what-footer {
            gap: 7%;
          }

          .services-list {
            column-gap: 25px;
          }

          .service-item {
            padding: 30px 10px;
            grid-template-columns: 28px 1fr;
            gap: 13px;
          }
        }

        @media (max-width: 600px) {
          .what-we-do {
            padding: 95px 6% 65px;
          }

          .what-topline {
            gap: 15px;
          }

          .what-eyebrow,
          .what-since {
            font-size: 8px;
          }

          .what-heading-grid {
            padding: 65px 0 75px;
            gap: 35px;
          }

          .what-heading h2 {
            font-size: clamp(45px, 11vw, 68px);
          }

          .what-intro {
            font-size: 13px;
            line-height: 1.9;
          }

          .services-list {
            grid-template-columns: 1fr;
          }

          .service-item {
            min-height: auto;
            padding: 28px 10px;
            grid-template-columns: 28px 1fr;
            gap: 12px;
          }

          .service-content h3 {
            margin-bottom: 12px;
            font-size: 24px;
          }

          .service-content p {
            font-size: 12px;
          }

          .what-footer {
            grid-template-columns: 1fr;
            gap: 35px;
            margin-top: 100px;
            padding-bottom: 75px;
          }

          .philosophy-title h2 {
            font-size: clamp(45px, 10vw, 65px);
          }

          .philosophy-content {
            margin: 0;
          }

          .what-bottom-line {
            flex-direction: column;
            gap: 12px;
            font-size: 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .what-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .service-item,
          .service-content h3,
          .philosophy-link {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
