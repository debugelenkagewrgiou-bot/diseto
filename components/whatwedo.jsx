
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
      </div>

      {/* FULL-WIDTH ARCHITECTURAL IMAGE STRIP */}
      <div
        className="what-wide-band"
        role="img"
        aria-label={
          language === "en"
            ? "Architectural interior and bespoke craftsmanship"
            : "Αρχιτεκτονικός χώρος και προσεγμένη κατασκευή"
        }
      >
        <div className="what-wide-band-inner">
          <span>
            {language === "en"
              ? "DESIGNED WITH PURPOSE"
              : "ΣΧΕΔΙΑΣΜΕΝΟ ΜΕ ΣΚΟΠΟ"}
          </span>
          <p>
            {language === "en"
              ? "CRAFTED TO LAST."
              : "ΚΑΤΑΣΚΕΥΑΣΜΕΝΟ ΓΙΑ ΝΑ ΑΝΤΕΧΕΙ."}
          </p>
        </div>
      </div>

      <div className="what-container">
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
              <span className="philosophy-arrow" aria-hidden="true">
                <span>＋</span>
              </span>
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
          position: relative;
          isolation: isolate;
          background-color: #351019;
          background-image:
  linear-gradient(
    rgba(53, 16, 25, 0.65),
    rgba(53, 16, 25, 0.72)
  ),
  url("/images/background.jpg");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          color: #f4efe6;
          padding: clamp(82px, 9vw, 138px) 7% 76px;
          overflow: hidden;
        }

        .what-we-do::before {
          content: "";
          position: absolute;
          z-index: -1;
          inset: 0 0 auto;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            #c5a47d,
            transparent
          );
          opacity: 0.9;
        }

        .what-container {
          max-width: 1440px;
          margin: 0 auto;
        }

        .what-topline {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(226, 211, 187, 0.2);
          padding-bottom: 25px;
        }

        .what-eyebrow,
        .what-since {
          color: #c5a47d;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.18em;
        }

        .what-since {
          color: #d0bdb5;
        }

        .what-heading-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 7%;
          align-items: end;
          padding: clamp(68px, 8vw, 112px) 0
            clamp(82px, 9vw, 130px);
        }

        .what-heading h2,
        .what-footer h2 {
          margin: 0;
          color: #f4efe6;
          font-family: Georgia, serif;
          font-size: clamp(64px, 8vw, 124px);
          font-weight: 400;
          line-height: 0.88;
          letter-spacing: -0.075em;
        }

        .what-heading h2 span,
        .what-footer h2 span {
          color: #c5a47d;
          font-style: italic;
        }

        .what-intro-wrap {
          max-width: 470px;
          padding: 24px 0 8px 28px;
          margin: 0 0 0 auto;
          border-left: 1px solid #c5a47d;
        }

        .what-intro {
          margin: 0;
          color: #e0d2ca;
          font-family: Arial, Helvetica, sans-serif;
          font-size: clamp(17px, 1.25vw, 19px);
          line-height: 1.9;
        }

        .services-heading {
          display: flex;
          justify-content: space-between;
          padding: 21px 2px;
          color: #c5a47d;
          border-top: 1px solid rgba(226, 211, 187, 0.22);
          border-bottom: 1px solid rgba(226, 211, 187, 0.22);
          font-family: Arial, Helvetica, sans-serif;
          font-size: 12px;
          letter-spacing: 0.18em;
        }

        .services-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          padding-top: 24px;
        }

        .service-item {
          position: relative;
          display: grid;
          grid-template-columns: 42px 1fr;
          gap: 20px;
          align-items: start;
          min-height: 230px;
          padding: 34px 32px 32px;
          background: #421c25;
          border: 1px solid rgba(226, 211, 187, 0.15);
          border-radius: 3px;
          transition:
            border-color 0.35s ease,
            background 0.35s ease,
            transform 0.35s ease;
        }

        .service-item:hover {
          background: #4b222c;
          border-color: rgba(197, 164, 125, 0.65);
          transform: translateY(-4px);
        }

        .service-number {
          padding-top: 5px;
          color: #c5a47d;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;
          letter-spacing: 0.12em;
        }

        .service-content h3 {
          max-width: 440px;
          margin: 0 0 18px;
          color: #f4efe6;
          font-family: Georgia, serif;
          font-size: clamp(25px, 2.2vw, 33px);
          font-weight: 400;
          line-height: 1.15;
          letter-spacing: -0.04em;
          transition: color 0.3s ease;
        }

        .service-item:hover .service-content h3 {
          color: #d9bd96;
        }

        .service-content p {
          max-width: 480px;
          margin: 0;
          color: #ddcfca;
          font-family: Arial, Helvetica, sans-serif;
          font-size: clamp(16px, 1.05vw, 17px);
          line-height: 1.85;
        }

        /* PHILOSOPHY */
        .what-footer {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 0.75fr;
          gap: 10%;
          align-items: end;
          margin-top: clamp(100px, 13vw, 180px);
          padding: clamp(48px, 6vw, 82px) clamp(28px, 5vw, 72px);
          background: #eae3d7;
          color: #28231e;
          border-radius: 3px;
        }

        .what-footer h2 {
          color: #28231e;
          font-size: clamp(55px, 6.3vw, 92px);
        }

        .what-footer h2 span {
          color: #9c8058;
        }

        .what-footer .what-eyebrow {
          color: #9c8058;
        }

        .philosophy-title h2 {
          margin-top: 28px;
        }

        .philosophy-title h2 span {
          font-style: normal;
        }

        .philosophy-content {
          max-width: 480px;
          align-self: center;
          margin-left: auto;
        }

        .philosophy-content p {
          margin: 15px 0;
          color: #625b51;
          font-family: Arial, Helvetica, sans-serif;
          font-size: clamp(16px, 1.08vw, 18px);
          line-height: 1.9;
        }

        .philosophy-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-top: 25px;
          padding-bottom: 10px;
          border-bottom: 1px solid #a98c61;
          color: #28231e;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 12px;
          line-height: 1.6;
          letter-spacing: 0.12em;
          text-decoration: none;
          transition:
            color 0.3s ease,
            gap 0.3s ease,
            border-color 0.3s ease;
        }

        .philosophy-link:hover {
          color: #9c8058;
          gap: 19px;
          border-color: #28231e;
        }

        /* CIRCULAR BUTTON */
        .philosophy-arrow {
          display: grid;
          place-items: center;
          width: 27px;
          height: 27px;
          flex-shrink: 0;
          border: 1px solid #a98c61;
          border-radius: 50%;
          background: #28231e;
          color: #f4efe6;
          transition:
            transform 0.3s ease,
            background 0.3s ease,
            color 0.3s ease;
        }

        .philosophy-arrow span {
          display: block;
          font-size: 17px;
          line-height: 1;
          transition: transform 0.3s ease;
        }

        .philosophy-link:hover .philosophy-arrow {
          background: #9c8058;
          color: #ffffff;
        }

        .philosophy-link:hover .philosophy-arrow span {
          transform: rotate(45deg);
        }

        /* BOTTOM LINE */
        .what-bottom-line {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-top: 34px;
          padding-top: 24px;
          border-top: 1px solid rgba(226, 211, 187, 0.22);
          color: #c5a47d;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
        }

        /* REVEAL ANIMATIONS */
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
            background 0.35s ease,
            border-color 0.35s ease;
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

        /* FULL-WIDTH STRIP - USES SECTION BACKGROUND */
        .what-wide-band {
          position: relative;
          width: 100vw;
          height: clamp(250px, 34vw, 440px);
          margin: 76px 0 68px calc(50% - 50vw);
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          isolation: isolate;
          background: transparent;
        }

        .what-wide-band::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          border-top: 1px solid rgba(197, 164, 125, 0.5);
          border-bottom: 1px solid rgba(197, 164, 125, 0.5);
        }

        .what-wide-band-inner {
          width: min(1440px, 86%);
          margin: 0 auto;
          padding: 0 0 clamp(30px, 5vw, 62px);
          color: #f4efe6;
        }

        .what-wide-band-inner span {
          display: block;
          margin-bottom: 12px;
          color: #d1b88f;
          font-size: 11px;
          letter-spacing: 0.2em;
        }

        .what-wide-band-inner p {
          max-width: 800px;
          margin: 0;
          font-size: clamp(28px, 5.4vw, 72px);
          font-weight: 500;
          line-height: 0.98;
          letter-spacing: -0.055em;
        }

        /* TABLET */
        @media (max-width: 900px) {
          .what-heading-grid {
            grid-template-columns: 1fr;
            gap: 38px;
          }

          .what-intro-wrap {
            margin: 0;
          }

          .what-footer {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .philosophy-content {
            margin: 0;
          }

          .service-item {
            padding: 32px 24px;
          }

          .service-content p {
            font-size: 15px;
          }
        }

        /* MOBILE */
        @media (max-width: 600px) {
          .what-we-do {
            padding: 76px 5% 48px;
          }

          .what-topline {
            align-items: flex-start;
            gap: 15px;
          }

          .what-eyebrow,
          .what-since {
            font-size: 9px;
            line-height: 1.6;
          }

          .what-heading-grid {
            grid-template-columns: 1fr;
            padding: 58px 0 72px;
          }

          .what-heading h2 {
            font-size: clamp(49px, 12vw, 70px);
          }

          .what-intro-wrap {
            padding: 18px 0 4px 18px;
          }

          .what-intro {
            font-size: 16px;
            line-height: 1.85;
          }

          .services-heading {
            font-size: 10px;
            letter-spacing: 0.12em;
          }

          .services-list {
            grid-template-columns: 1fr;
            gap: 12px;
            padding-top: 16px;
          }

          .service-item {
            min-height: auto;
            padding: 25px 20px;
            grid-template-columns: 30px 1fr;
            gap: 12px;
          }

          .service-number {
            font-size: 11px;
          }

          .service-content h3 {
            font-size: 25px;
            margin-bottom: 12px;
          }

          .service-content p {
            font-size: 15px;
            line-height: 1.85;
          }

          .what-wide-band {
            height: 250px;
            margin: 48px 0 48px calc(50% - 50vw);
            background: transparent;
          }

          .what-wide-band-inner {
            width: 88%;
            padding-bottom: 28px;
          }

          .what-wide-band-inner span {
            font-size: 9px;
          }

          .what-wide-band-inner p {
            font-size: 34px;
          }

          .what-footer {
            grid-template-columns: 1fr;
            margin-top: 82px;
            padding: 38px 24px 42px;
            gap: 25px;
          }

          .philosophy-title h2 {
            font-size: clamp(44px, 10.5vw, 64px);
          }

          .philosophy-content p {
            font-size: 16px;
          }

          .philosophy-link {
            font-size: 10px;
            line-height: 1.7;
          }

          .what-bottom-line {
            flex-direction: column;
            gap: 12px;
            font-size: 9px;
            line-height: 1.8;
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
          .philosophy-link,
          .philosophy-arrow,
          .philosophy-arrow span {
            transition: none;
          }

          .service-item:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
