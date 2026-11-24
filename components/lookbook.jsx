
"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/languagecontext";

const projects = [
  { id: "01", category: "kitchens", type: { el: "Κουζίνες", en: "Kitchens" }, name: { el: "Σύγχρονη κουζίνα", en: "Contemporary Kitchen" }, image: "kitchen-01.jpg", layout: "wide" },
  { id: "02", category: "kitchens", type: { el: "Κουζίνες", en: "Kitchens" }, name: { el: "Η αρμονία των υλικών", en: "Harmony of Materials" }, image: "kitchen-02.jpg", layout: "tall" },
  { id: "03", category: "kitchens", type: { el: "Κουζίνες", en: "Kitchens" }, name: { el: "Λεπτομέρεια και λειτουργικότητα", en: "Detail and Functionality" }, image: "kitchen-03.jpg", layout: "tall" },
  { id: "04", category: "kitchens", type: { el: "Κουζίνες", en: "Kitchens" }, name: { el: "Διαχρονικός σχεδιασμός", en: "Timeless Design" }, image: "kitchen-04.jpg", layout: "wide" },
  { id: "05", category: "kitchens", type: { el: "Κουζίνες", en: "Kitchens" }, name: { el: "Ζεστή minimal αισθητική", en: "Warm Minimal Aesthetic" }, image: "kitchen-05.jpg", layout: "tall" },
  { id: "06", category: "wardrobes", type: { el: "Ντουλάπες", en: "Wardrobes" }, name: { el: "Έξυπνη αποθήκευση", en: "Smart Storage" }, image: "wardrobe-01.jpg", layout: "tall" },
  { id: "07", category: "kitchens", type: { el: "Κουζίνες", en: "Kitchens" }, name: { el: "Σχεδιασμός με χαρακτήρα", en: "Design with Character" }, image: "kitchen-06.jpg", layout: "wide" },
  { id: "08", category: "kitchens", type: { el: "Κουζίνες", en: "Kitchens" }, name: { el: "Η λεπτομέρεια κάνει τη διαφορά", en: "Details Make the Difference" }, image: "kitchen-07.jpg", layout: "tall" },
  { id: "09", category: "interiors", type: { el: "Εσωτερικοί χώροι", en: "Interior Spaces" }, name: { el: "Χώροι με ταυτότητα", en: "Spaces with Identity" }, image: "commercial-01.jpg", layout: "tall" },
  { id: "10", category: "kitchens", type: { el: "Κουζίνες", en: "Kitchens" }, name: { el: "Σύγχρονη αισθητική", en: "Contemporary Aesthetic" }, image: "kitchen-08.jpg", layout: "wide" },
  { id: "11", category: "kitchens", type: { el: "Κουζίνες", en: "Kitchens" }, name: { el: "Ισορροπία και απλότητα", en: "Balance and Simplicity" }, image: "kitchen-09.jpg", layout: "tall" },
  { id: "12", category: "wardrobes", type: { el: "Ντουλάπες", en: "Wardrobes" }, name: { el: "Σχεδιασμός στα μέτρα σας", en: "Made to Measure Design" }, image: "wardrobe-02.jpg", layout: "tall" },
  { id: "13", category: "kitchens", type: { el: "Κουζίνες", en: "Kitchens" }, name: { el: "Δημιουργίες DiSeto", en: "DiSeto Creations" }, image: "kitchen-10.jpg", layout: "wide" },
];

const categories = [
  { id: "all", el: "Όλα τα έργα", en: "All Projects" },
  { id: "kitchens", el: "Κουζίνες", en: "Kitchens" },
  { id: "wardrobes", el: "Ντουλάπες", en: "Wardrobes" },
  { id: "interiors", el: "Εσωτερικοί χώροι", en: "Interior Spaces" },
];

const content = {
  el: {
    heroTop: "Χώροι σχεδιασμένοι για να αντέχουν στον χρόνο",
    heroTopRight: "Σχεδιασμός · Ποιότητα · Λεπτομέρεια",
    title1: "Σχεδιασμένα",
    title2: "για τη ζωή.",
    intro: "Ανακαλύψτε τις δημιουργίες μας σε κουζίνες, ντουλάπες και εσωτερικούς χώρους, σχεδιασμένες γύρω από τις δικές σας ανάγκες.",
    discover: "Ανακαλύψτε τα έργα μας",
    heroImageAlt: "Σχεδιασμός κουζίνας DiSeto",
    heroImageCaption: "01 — Σχεδιασμένα γύρω από εσάς",
    heroIndex: "DISETO · ΣΧΕΔΙΑΣΜΟΣ · ΠΟΙΟΤΗΤΑ · ΛΕΠΤΟΜΕΡΕΙΑ",
    workEyebrow: "Μια επιλογή από τα έργα μας",
    workTitle: "Χώροι που σας",
    workTitleAccent: "εκφράζουν.",
    filterLabel: "Φιλτράρισμα έργων",
    viewProject: "ΠΡΟΒΟΛΗ ΕΡΓΟΥ",
    manifestoEyebrow: "Η φιλοσοφία της DiSeto",
    manifestoTitle: "Ο καλός σχεδιασμός δεν ζητά την προσοχή.\nΚερδίζει τη θέση του στην καθημερινότητά σας.",
    manifestoText: "Από την πρώτη ιδέα μέχρι την τελευταία λεπτομέρεια, συνδυάζουμε τον σχεδιασμό, τα υλικά και την τεχνογνωσία για να δημιουργούμε χώρους που ανταποκρίνονται πραγματικά σε εσάς.",
    contact: "ΞΕΚΙΝΗΣΤΕ ΤΟ ΕΡΓΟ ΣΑΣ",
    close: "Κλείσιμο",
    previous: "Προηγούμενη φωτογραφία",
    next: "Επόμενη φωτογραφία",
  },
  en: {
    heroTop: "Spaces designed to stand the test of time",
    heroTopRight: "Design · Quality · Detail",
    title1: "Designed",
    title2: "for life.",
    intro: "Discover our kitchens, wardrobes and interior spaces, thoughtfully designed around your individual needs.",
    discover: "Discover our projects",
    heroImageAlt: "DiSeto kitchen design",
    heroImageCaption: "01 — Designed around you",
    heroIndex: "DISETO · DESIGN · QUALITY · DETAIL",
    workEyebrow: "A selection of our projects",
    workTitle: "Spaces that",
    workTitleAccent: "reflect you.",
    filterLabel: "Filter projects",
    viewProject: "VIEW PROJECT",
    manifestoEyebrow: "The DiSeto Philosophy",
    manifestoTitle: "Good design does not demand attention.\nIt earns its place in your everyday life.",
    manifestoText: "From the first idea to the final detail, we combine design, materials and expertise to create spaces that truly respond to your needs.",
    contact: "START YOUR PROJECT",
    close: "Close",
    previous: "Previous image",
    next: "Next image",
  },
};

function ProjectCard({ project, index, onOpen, language, t }) {
  return (
    <article
      className={`lookbook-card lookbook-reveal ${project.layout}`}
      style={{ "--delay": `${(index % 4) * 120}ms` }}
    >
      <button
        className="lookbook-image"
        onClick={() => onOpen(project.id)}
        aria-label={`${t.viewProject}: ${project.name[language]}`}
      >
        <img
          src={`/images/lookbook/${project.image}`}
          alt={project.name[language]}
          loading="lazy"
        />
        <span className="lookbook-image-arrow">↗</span>
      </button>

      <div className="lookbook-caption">
        <div>
          <span className="lookbook-type">
            {project.type[language]} · {project.id}
          </span>
          <h3>{project.name[language]}</h3>
        </div>

        <span className="lookbook-view">{t.viewProject}</span>
      </div>
    </article>
  );
}

export default function Lookbook() {
  const { language } = useLanguage();
  const t = content[language] || content.el;

  const [active, setActive] = useState("all");
  const [selectedId, setSelectedId] = useState(null);

  const selected = projects.find((project) => project.id === selectedId);

  const visibleProjects = projects.filter(
    (project) => active === "all" || project.category === active
  );

  useEffect(() => {
    const elements = document.querySelectorAll(".lookbook-reveal");

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
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [active, language]);

  useEffect(() => {
    if (!selectedId) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedId(null);
      }

      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        const currentIndex = projects.findIndex(
          (project) => project.id === selectedId
        );

        const direction = event.key === "ArrowRight" ? 1 : -1;

        const nextIndex =
          (currentIndex + direction + projects.length) % projects.length;

        setSelectedId(projects[nextIndex].id);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedId]);

  return (
    <main className="lookbook-page">

      {/* HERO */}

      <section className="lookbook-hero">

        <div className="lookbook-hero-top lookbook-reveal">
          <span>{t.heroTop}</span>
          <span>{t.heroTopRight}</span>
        </div>

        <h1 className="lookbook-title lookbook-reveal">
          <span>{t.title1}</span>
          <span className="lookbook-title-indent">
            <em>{t.title2}</em>
          </span>
        </h1>

        <div className="lookbook-hero-bottom lookbook-reveal">
          <p>{t.intro}</p>

          <a
            href="#lookbook-work"
            className="lookbook-round-link"
            aria-label={t.discover}
          >
            ↓
          </a>
        </div>

        <div className="lookbook-hero-image lookbook-reveal">
          <img
            src="/images/lookbook/kitchen-01.jpg"
            alt={t.heroImageAlt}
            fetchPriority="high"
          />

          <span>{t.heroImageCaption}</span>
        </div>

        <span className="lookbook-hero-index">
          {t.heroIndex}
        </span>

      </section>

      {/* GALLERY ΕΡΓΩΝ */}

      <section className="lookbook-work" id="lookbook-work">

        <div className="lookbook-heading lookbook-reveal">
          <div>
            <span className="lookbook-eyebrow">
              {t.workEyebrow}
            </span>

            <h2>
              {t.workTitle} <em>{t.workTitleAccent}</em>
            </h2>
          </div>

          <span className="lookbook-count">
            {String(visibleProjects.length).padStart(2, "0")} / 13
          </span>
        </div>

        {/* ΦΙΛΤΡΑ */}

        <div
          className="lookbook-filters lookbook-reveal"
          role="group"
          aria-label={t.filterLabel}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={
                active === category.id
                  ? "lookbook-filter active"
                  : "lookbook-filter"
              }
              onClick={() => setActive(category.id)}
              aria-pressed={active === category.id}
            >
              {category[language]}
            </button>
          ))}
        </div>

        {/* ΦΩΤΟΓΡΑΦΙΕΣ */}

        <div className="lookbook-grid">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={setSelectedId}
              language={language}
              t={t}
            />
          ))}
        </div>

      </section>

      {/* ΦΙΛΟΣΟΦΙΑ DISETO */}

      <section className="lookbook-manifesto lookbook-reveal">

        <span className="lookbook-eyebrow">
          {t.manifestoEyebrow}
        </span>

        <div className="lookbook-manifesto-copy">
          <p>
            {t.manifestoTitle.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                {index === 0 && <br />}
              </span>
            ))}
          </p>

          <span>{t.manifestoText}</span>
        </div>

        <a className="lookbook-text-link" href="/#contact">
          {t.contact}
        </a>

      </section>

      {/* LIGHTBOX */}

      {selected && (
        <div
          className="lookbook-lightbox"
          onClick={() => setSelectedId(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.name[language]}
        >

          <button
            className="lightbox-close"
            onClick={() => setSelectedId(null)}
            aria-label={t.close}
          >
            ×
          </button>

          <button
            className="lightbox-prev"
            aria-label={t.previous}
            onClick={(event) => {
              event.stopPropagation();

              const index = projects.findIndex(
                (project) => project.id === selected.id
              );

              setSelectedId(
                projects[
                  (index - 1 + projects.length) % projects.length
                ].id
              );
            }}
          >
            ←
          </button>

          <img
            src={`/images/lookbook/${selected.image}`}
            alt={selected.name[language]}
            onClick={(event) => event.stopPropagation()}
          />

          <button
            className="lightbox-next"
            aria-label={t.next}
            onClick={(event) => {
              event.stopPropagation();

              const index = projects.findIndex(
                (project) => project.id === selected.id
              );

              setSelectedId(
                projects[(index + 1) % projects.length].id
              );
            }}
          >
            →
          </button>

          <span className="lightbox-caption">
            {selected.type[language]} · {selected.id}
          </span>

        </div>
      )}

      {/* STYLES */}

      <style jsx global>{`
        .lookbook-page {
          --lb-bg: #f7f4ed;
          --lb-dark: #28231e;
          --lb-muted: #777168;
          --lb-gold: #a89576;

          background: var(--lb-bg);
          color: var(--lb-dark);
          overflow: hidden;
        }

        .lookbook-page * {
          box-sizing: border-box;
        }

        /* HERO */

        .lookbook-hero {
          padding: 75px 6.5% 65px;
        }

        .lookbook-hero-top,
        .lookbook-hero-bottom,
        .lookbook-heading,
        .lookbook-caption {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .lookbook-hero-top,
        .lookbook-eyebrow,
        .lookbook-type,
        .lookbook-view,
        .lookbook-hero-index,
        .lookbook-hero-image > span,
        .lookbook-count {
          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .lookbook-hero-top {
          color: var(--lb-muted);
          padding-bottom: 55px;
          gap: 15px;
        }

        .lookbook-title {
          font-family: Georgia, serif;
          font-size: clamp(65px, 12.5vw, 175px);
          line-height: 0.88;
          letter-spacing: -0.075em;
          font-weight: 400;
          margin: 0;
        }

        .lookbook-title > span {
          display: block;
        }

        .lookbook-title-indent {
          text-align: right;
          padding-right: 9%;
        }

        .lookbook-title em,
        .lookbook-heading h2 em {
          font-weight: 400;
          color: var(--lb-gold);
        }

        .lookbook-hero-bottom {
          margin: 45px 0 55px;
          gap: 20px;
        }

        .lookbook-hero-bottom p {
          max-width: 390px;
          color: var(--lb-muted);
          font: 14px/1.8 Arial, sans-serif;
        }

        .lookbook-round-link {
          display: grid;
          place-items: center;
          width: 52px;
          height: 52px;
          border: 1px solid #c9c1b4;
          border-radius: 50%;
          color: var(--lb-dark);
          text-decoration: none;
          font-size: 24px;
          flex-shrink: 0;
          transition:
            background 0.3s,
            color 0.3s,
            transform 0.3s;
        }

        .lookbook-round-link:hover {
          background: var(--lb-dark);
          color: white;
          transform: translateY(4px);
        }

        .lookbook-hero-image {
          position: relative;
          height: min(65vw, 650px);
          min-height: 300px;
          overflow: hidden;
        }

        .lookbook-hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.1);
          transition: transform 1.8s cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .lookbook-hero-image.is-visible img {
          transform: scale(1);
        }

        .lookbook-hero-image > span {
          position: absolute;
          bottom: 20px;
          left: 22px;
          color: white;
          text-shadow: 0 1px 8px #0008;
        }

        .lookbook-hero-index {
          display: block;
          text-align: right;
          color: var(--lb-muted);
          padding-top: 18px;
        }

        /* GALLERY */

        .lookbook-work {
          padding: 110px 6.5% 130px;
        }

        .lookbook-heading {
          align-items: end;
          margin-bottom: 38px;
        }

        .lookbook-eyebrow {
          color: var(--lb-muted);
        }

        .lookbook-heading h2 {
          font: 400 clamp(38px, 5.5vw, 72px)/1.1 Georgia, serif;
          letter-spacing: -0.055em;
          margin: 18px 0 0;
        }

        .lookbook-count {
          color: var(--lb-muted);
          padding-bottom: 8px;
        }

        /* FILTERS */

        .lookbook-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-bottom: 55px;
        }

        .lookbook-filter {
          background: transparent;
          border: 1px solid #d8d1c5;
          border-radius: 30px;
          padding: 11px 18px;
          color: var(--lb-muted);
          font: 11px Arial, sans-serif;
          cursor: pointer;
          transition:
            color 0.35s ease,
            background 0.35s ease,
            border-color 0.35s ease,
            transform 0.35s ease;
        }

        .lookbook-filter:hover {
          transform: translateY(-3px);
        }

        .lookbook-filter:hover,
        .lookbook-filter.active {
          background: var(--lb-dark);
          color: white;
          border-color: var(--lb-dark);
        }

        /* GRID */

        .lookbook-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: 5%;
          row-gap: 75px;
          align-items: start;
        }

        .lookbook-card {
          min-width: 0;
        }

        .lookbook-card:nth-child(even) {
          margin-top: 115px;
        }

        .lookbook-image {
          position: relative;
          display: block;
          width: 100%;
          padding: 0;
          border: 0;
          background: #e9e4da;
          overflow: hidden;
          cursor: pointer;
        }

        .lookbook-card.wide .lookbook-image {
          aspect-ratio: 1.28 / 1;
        }

        .lookbook-card.tall .lookbook-image {
          aspect-ratio: 0.84 / 1;
        }

        .lookbook-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transform: scale(1.04);
          transition:
            transform 1.3s cubic-bezier(0.2, 0.7, 0.2, 1),
            filter 0.6s ease;
        }

        .lookbook-card.is-visible .lookbook-image img {
          transform: scale(1);
        }

        .lookbook-image:hover img {
          transform: scale(1.07) !important;
          filter: brightness(0.94);
        }

        .lookbook-image-arrow {
          position: absolute;
          right: 18px;
          bottom: 18px;
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--lb-bg);
          color: var(--lb-dark);
          font-size: 20px;
          opacity: 0;
          transform: translateY(8px);
          transition: all 0.3s;
        }

        .lookbook-image:hover .lookbook-image-arrow {
          opacity: 1;
          transform: translateY(0);
        }

        .lookbook-caption {
          align-items: end;
          padding-top: 18px;
          gap: 10px;
        }

        .lookbook-type {
          color: var(--lb-muted);
          font-size: 9px;
        }

        .lookbook-caption h3 {
          font: 400 22px Georgia, serif;
          margin: 8px 0 0;
        }

        .lookbook-view {
          color: var(--lb-muted);
          font-size: 8px;
          white-space: nowrap;
        }

        /* MANIFESTO - ΣΚΟΥΡΟ ΜΠΟΡΝΤΟ */

        .lookbook-manifesto {
          background: #351019;
          color: #f7f4ed;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 95px 6.5% 110px;
        }

        .lookbook-manifesto .lookbook-eyebrow {
          color: #c5a47d;
        }

        .lookbook-manifesto-copy {
          margin-top: 40px;
        }

        .lookbook-manifesto-copy p {
          color: #f7f4ed;
          font: 400 clamp(32px, 5vw, 65px)/1.15 Georgia, serif;
          letter-spacing: -0.045em;
          margin: 0 0 35px;
        }

        .lookbook-manifesto-copy span {
          display: block;
          max-width: 600px;
          color: #d1c1bd;
          font: 14px/2 Arial, sans-serif;
        }

        .lookbook-manifesto .lookbook-text-link {
          color: #c5a47d;
          border-bottom: 1px solid #c5a47d;
        }

        .lookbook-manifesto .lookbook-text-link:hover {
          color: #ffffff;
          border-color: #ffffff;
        }

        .lookbook-text-link {
          display: inline-flex;
          align-items: center;
          margin-top: 40px;
          padding-bottom: 9px;
          border-bottom: 1px solid var(--lb-dark);
          color: var(--lb-dark);
          font: 10px Arial, sans-serif;
          letter-spacing: 0.12em;
          text-decoration: none;
          transition: color 0.3s, border-color 0.3s;
        }

        /* LIGHTBOX */

        .lookbook-lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 65px;
          background: rgba(25, 22, 19, 0.96);
          animation: lightboxFade 0.4s ease both;
        }

        .lookbook-lightbox > img {
          max-width: 100%;
          max-height: 82vh;
          object-fit: contain;
          animation: lightboxImage 0.65s cubic-bezier(0.2, 0.7, 0.2, 1) both;
        }

        .lightbox-close,
        .lightbox-prev,
        .lightbox-next {
          position: absolute;
          border: 0;
          background: transparent;
          color: white;
          cursor: pointer;
          font-size: 35px;
        }

        .lightbox-close {
          top: 22px;
          right: 30px;
          font-size: 42px;
        }

        .lightbox-prev {
          left: 25px;
        }

        .lightbox-next {
          right: 25px;
        }

        .lightbox-caption {
          position: absolute;
          bottom: 22px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          font: 10px Arial, sans-serif;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* SCROLL REVEAL */

        .lookbook-reveal {
          opacity: 0;
          transform: translate3d(0, 55px, 0);
          transition:
            opacity 1s cubic-bezier(0.2, 0.7, 0.2, 1),
            transform 1.1s cubic-bezier(0.2, 0.7, 0.2, 1);
          will-change: opacity, transform;
        }

        .lookbook-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .lookbook-title.lookbook-reveal {
          transform: translate3d(0, 65px, 0);
          transition-delay: 100ms;
        }

        .lookbook-title.lookbook-reveal.is-visible {
          transform: translate3d(0, 0, 0);
        }

        .lookbook-card.lookbook-reveal {
          transition-delay: var(--delay, 0ms);
        }

        /* ANIMATION KEYFRAMES */

        @keyframes lightboxFade {
          from {
            opacity: 0;
            backdrop-filter: blur(0);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(8px);
          }
        }

        @keyframes lightboxImage {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(15px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* MOBILE */

        @media (max-width: 700px) {
          .lookbook-hero {
            padding: 45px 5% 45px;
          }

          .lookbook-hero-top {
            padding-bottom: 55px;
            font-size: 8px;
          }

          .lookbook-title {
            font-size: clamp(57px, 14.5vw, 105px);
          }

          .lookbook-title-indent {
            padding-right: 0;
          }

          .lookbook-hero-bottom {
            margin: 35px 0;
          }

          .lookbook-hero-bottom p {
            max-width: 270px;
            font-size: 12px;
          }

          .lookbook-round-link {
            width: 43px;
            height: 43px;
          }

          .lookbook-hero-image {
            height: 105vw;
            min-height: 300px;
          }

          .lookbook-work {
            padding: 75px 5% 85px;
          }

          .lookbook-heading h2 {
            font-size: 38px;
          }

          .lookbook-count {
            font-size: 8px;
          }

          .lookbook-filters {
            gap: 7px;
            margin-bottom: 35px;
          }

          .lookbook-filter {
            padding: 9px 13px;
            font-size: 10px;
          }

          .lookbook-grid {
            grid-template-columns: 1fr;
            row-gap: 42px;
          }

          .lookbook-card:nth-child(even) {
            margin-top: 0;
          }

          .lookbook-card.tall .lookbook-image,
          .lookbook-card.wide .lookbook-image {
            aspect-ratio: 1 / 0.9;
          }

          .lookbook-caption h3 {
            font-size: 19px;
          }

          .lookbook-view {
            font-size: 7px;
          }

          .lookbook-manifesto {
            padding: 70px 5% 80px;
          }

          .lookbook-manifesto-copy {
            margin-top: 30px;
          }

          .lookbook-manifesto-copy p {
            font-size: 35px;
          }

          .lookbook-manifesto-copy span {
            font-size: 12px;
          }

          .lookbook-lightbox {
            padding: 45px 15px;
          }

          .lightbox-prev {
            left: 8px;
          }

          .lightbox-next {
            right: 8px;
          }
        }

        /* REDUCED MOTION */

        @media (prefers-reduced-motion: reduce) {
          .lookbook-page *,
          .lookbook-page *::before,
          .lookbook-page *::after {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }

          .lookbook-reveal {
            opacity: 1;
            transform: none;
          }

          .lookbook-hero-image img,
          .lookbook-image img {
            transform: none;
          }
        }
      `}</style>

    </main>
  );
}
