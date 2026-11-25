
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLanguage } from "@/components/languagecontext";

/* =========================================
   LOOKBOOK DATA
========================================= */

const lookbookProjects = [
  {
    id: "01",
    category: "kitchens",
    type: { el: "Κουζίνες", en: "Kitchens" },
    name: { el: "Σύγχρονη κουζίνα", en: "Contemporary Kitchen" },
    image: "/images/lookbook/kitchen-01.jpg",
    layout: "wide",
  },
  {
    id: "02",
    category: "kitchens",
    type: { el: "Κουζίνες", en: "Kitchens" },
    name: { el: "Η αρμονία των υλικών", en: "Harmony of Materials" },
    image: "/images/lookbook/kitchen-02.png",
    layout: "tall",
  },
  {
    id: "03",
    category: "kitchens",
    type: { el: "Κουζίνες", en: "Kitchens" },
    name: {
      el: "Λεπτομέρεια και λειτουργικότητα",
      en: "Detail and Functionality",
    },
    image: "/images/lookbook/kitchen-03.png",
    layout: "tall",
  },
  {
    id: "04",
    category: "kitchens",
    type: { el: "Κουζίνες", en: "Kitchens" },
    name: { el: "Διαχρονικός σχεδιασμός", en: "Timeless Design" },
    image: "/images/lookbook/kitchen-04.png",
    layout: "wide",
  },
  {
    id: "05",
    category: "kitchens",
    type: { el: "Κουζίνες", en: "Kitchens" },
    name: { el: "Ζεστή minimal αισθητική", en: "Warm Minimal Aesthetic" },
    image: "/images/lookbook/kitchen-05.png",
    layout: "tall",
  },
  {
    id: "06",
    category: "wardrobes",
    type: { el: "Ντουλάπες", en: "Wardrobes" },
    name: { el: "Έξυπνη αποθήκευση", en: "Smart Storage" },
    image: "/images/lookbook/wardrobe-01.png",
    layout: "tall",
  },
  {
    id: "07",
    category: "kitchens",
    type: { el: "Κουζίνες", en: "Kitchens" },
    name: { el: "Σχεδιασμός με χαρακτήρα", en: "Design with Character" },
    image: "/images/lookbook/kitchen-06.png",
    layout: "wide",
  },
  {
    id: "08",
    category: "kitchens",
    type: { el: "Κουζίνες", en: "Kitchens" },
    name: {
      el: "Η λεπτομέρεια κάνει τη διαφορά",
      en: "Details Make the Difference",
    },
    image: "/images/lookbook/kitchen-07.png",
    layout: "tall",
  },
  {
    id: "09",
    category: "interiors",
    type: { el: "Εσωτερικοί χώροι", en: "Interior Spaces" },
    name: { el: "Χώροι με ταυτότητα", en: "Spaces with Identity" },
    image: "/images/lookbook/commersial-02.png",
    layout: "tall",
  },
  {
    id: "10",
    category: "kitchens",
    type: { el: "Κουζίνες", en: "Kitchens" },
    name: { el: "Σύγχρονη αισθητική", en: "Contemporary Aesthetic" },
    image: "/images/lookbook/kitchen-08.png",
    layout: "wide",
  },
  {
    id: "11",
    category: "kitchens",
    type: { el: "Κουζίνες", en: "Kitchens" },
    name: { el: "Ισορροπία και απλότητα", en: "Balance and Simplicity" },
    image: "/images/lookbook/kitchen-09.png",
    layout: "tall",
  },
  {
    id: "12",
    category: "wardrobes",
    type: { el: "Ντουλάπες", en: "Wardrobes" },
    name: {
      el: "Σχεδιασμός στα μέτρα σας",
      en: "Made to Measure Design",
    },
    image: "/images/lookbook/wardrobe-02.png",
    layout: "tall",
  },
  {
    id: "13",
    category: "kitchens",
    type: { el: "Κουζίνες", en: "Kitchens" },
    name: { el: "Δημιουργίες DiSeto", en: "DiSeto Creations" },
    image: "/images/lookbook/kitchen-10.png",
    layout: "wide",
  },
];

const lookbookCategories = [
  { id: "all", el: "Όλα τα έργα", en: "All Projects" },
  { id: "kitchens", el: "Κουζίνες", en: "Kitchens" },
  { id: "wardrobes", el: "Ντουλάπες", en: "Wardrobes" },
  { id: "interiors", el: "Εσωτερικοί χώροι", en: "Interior Spaces" },
];

const lookbookCopy = {
  el: {
    home: "ΑΡΧΙΚΗ",
    heroTop: "Χώροι σχεδιασμένοι για να αντέχουν στον χρόνο",
    heroTopRight: "Σχεδιασμός · Ποιότητα · Λεπτομέρεια",
    title1: "Σχεδιασμένα",
    title2: "για τη ζωή.",
    intro:
      "Ανακαλύψτε τις δημιουργίες μας σε κουζίνες, ντουλάπες και εσωτερικούς χώρους, σχεδιασμένες γύρω από τις δικές σας ανάγκες.",
    discover: "Ανακαλύψτε τα έργα μας",
    heroImageAlt:
      "Κουζίνα από φυσικά υλικά σχεδιασμένη από τη DiSeto",
    heroImageCaption: "01 — Σχεδιασμένα γύρω από εσάς",
    heroIndex: "DISETO · ΣΧΕΔΙΑΣΜΟΣ · ΠΟΙΟΤΗΤΑ · ΛΕΠΤΟΜΕΡΕΙΑ",
    workEyebrow: "Μια επιλογή από τα έργα μας",
    workTitle: "Χώροι που σας",
    workTitleAccent: "εκφράζουν.",
    filterLabel: "Φιλτράρισμα έργων",
    view: "ΠΡΟΒΟΛΗ",
    manifestoEyebrow: "Η φιλοσοφία της DiSeto",
    manifestoTitle:
      "Ο καλός σχεδιασμός δεν ζητά την προσοχή.\nΚερδίζει τη θέση του στην καθημερινότητά σας.",
    manifestoText:
      "Από την πρώτη ιδέα μέχρι την τελευταία λεπτομέρεια, συνδυάζουμε τον σχεδιασμό, τα υλικά και την τεχνογνωσία για να δημιουργούμε χώρους που ανταποκρίνονται πραγματικά σε εσάς.",
    contact: "ΕΞΕΡΕΥΝΗΣΤΕ ΤΑ ΕΡΓΑ ΜΑΣ",
    close: "Κλείσιμο",
    previous: "Προηγούμενη φωτογραφία",
    next: "Επόμενη φωτογραφία",
  },

  en: {
    home: "BACK HOME",
    heroTop: "Spaces designed to stand the test of time",
    heroTopRight: "Design · Quality · Detail",
    title1: "Designed",
    title2: "for life.",
    intro:
      "Discover our kitchens, wardrobes and interior spaces, thoughtfully designed around your individual needs.",
    discover: "Discover our projects",
    heroImageAlt: "Natural-material kitchen designed by DiSeto",
    heroImageCaption: "01 — Designed around you",
    heroIndex: "DISETO · DESIGN · QUALITY · DETAIL",
    workEyebrow: "A selection of our projects",
    workTitle: "Spaces that",
    workTitleAccent: "reflect you.",
    filterLabel: "Filter projects",
    view: "VIEW",
    manifestoEyebrow: "The DiSeto Philosophy",
    manifestoTitle:
      "Good design does not demand attention.\nIt earns its place in your everyday life.",
    manifestoText:
      "From the first idea to the final detail, we combine design, materials and expertise to create spaces that truly respond to your needs.",
    contact: "EXPLORE OUR PROJECTS",
    close: "Close",
    previous: "Previous image",
    next: "Next image",
  },
};

/* =========================================
   PROJECT CARD
========================================= */

function ProjectCard({
  project,
  index,
  language,
  viewLabel,
  onOpen,
}) {
  return (
    <article
      className={`lookbook-card lookbook-reveal ${project.layout}`}
      style={{
        "--delay": `${(index % 4) * 110}ms`,
      }}
    >
      <button
        className="lookbook-image"
        type="button"
        onClick={(event) => onOpen(project.id, event.currentTarget)}
        aria-label={`${viewLabel}: ${project.name[language]}`}
      >
        <Image
          src={project.image}
          alt={project.name[language]}
          fill
          sizes="(max-width: 700px) 90vw, 43vw"
          loading="lazy"
        />

        <span className="lookbook-image-arrow" aria-hidden="true">
          <span>{viewLabel}</span>
          <span className="lookbook-image-arrow-icon">＋</span>
        </span>
      </button>

      <div className="lookbook-caption">
        <div>
          <span className="lookbook-type">
            {project.type[language]} · {project.id}
          </span>

          <h3>{project.name[language]}</h3>
        </div>

        <span className="lookbook-view">{viewLabel}</span>
      </div>
    </article>
  );
}

/* =========================================
   LIGHTBOX
========================================= */

function LookbookLightbox({
  project,
  language,
  closeLabel,
  previousLabel,
  nextLabel,
  onClose,
  onStep,
}) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        onStep(-1);
      }

      if (event.key === "ArrowRight") {
        onStep(1);
      }

      if (event.key !== "Tab") return;

      const buttons =
        dialogRef.current?.querySelectorAll("button");

      if (!buttons?.length) return;

      const first = buttons[0];
      const last = buttons[buttons.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onStep]);

  return (
    <div
      className="lookbook-lightbox"
      ref={dialogRef}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label={project.name[language]}
    >
      <button
        className="lightbox-close"
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        ref={closeButtonRef}
      >
        ×
      </button>

      <button
        className="lightbox-prev"
        type="button"
        aria-label={previousLabel}
        onClick={() => onStep(-1)}
      >
        ‹
      </button>

      <Image
        key={project.id}
        src={project.image}
        alt={project.name[language]}
        width={1800}
        height={1200}
        sizes="90vw"
        priority
      />

      <button
        className="lightbox-next"
        type="button"
        aria-label={nextLabel}
        onClick={() => onStep(1)}
      >
        ›
      </button>

      <span className="lightbox-caption" aria-live="polite">
        {project.type[language]} · {project.id} —{" "}
        {project.name[language]}
      </span>
    </div>
  );
}

/* =========================================
   MAIN LOOKBOOK COMPONENT
========================================= */

export default function Lookbook() {
  const { language } = useLanguage();

  const currentLanguage =
    language === "en" ? "en" : "el";

  const [active, setActive] = useState("all");
  const [selectedId, setSelectedId] = useState(null);

  const triggerRef = useRef(null);

  const t = lookbookCopy[currentLanguage];

  const visibleProjects = useMemo(
    () =>
      lookbookProjects.filter(
        (project) =>
          active === "all" ||
          project.category === active
      ),
    [active]
  );

  const selectedIndex = visibleProjects.findIndex(
    (project) => project.id === selectedId
  );

  const selected =
    selectedIndex >= 0
      ? visibleProjects[selectedIndex]
      : null;

  /* SCROLL REVEAL */

  useEffect(() => {
    const elements = document.querySelectorAll(
      ".lookbook-reveal"
    );

    const revealAll = () => {
      elements.forEach((element) =>
        element.classList.add("is-visible")
      );
    };

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches ||
      !("IntersectionObserver" in window)
    ) {
      revealAll();
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
        rootMargin: "0px 0px -28px 0px",
      }
    );

    elements.forEach((element) =>
      observer.observe(element)
    );

    return () => observer.disconnect();
  }, [active, currentLanguage]);

  /* LIGHTBOX ACTIONS */

  const closeLightbox = useCallback(() => {
    setSelectedId(null);
  }, []);

  const stepLightbox = useCallback(
    (direction) => {
      setSelectedId((currentId) => {
        const currentIndex = visibleProjects.findIndex(
          (project) => project.id === currentId
        );

        if (
          currentIndex < 0 ||
          visibleProjects.length === 0
        ) {
          return null;
        }

        const nextIndex =
          (currentIndex +
            direction +
            visibleProjects.length) %
          visibleProjects.length;

        return visibleProjects[nextIndex].id;
      });
    },
    [visibleProjects]
  );

  /* RESTORE FOCUS AFTER CLOSING */

  useEffect(() => {
    if (selectedId !== null) return;

    triggerRef.current?.focus();
    triggerRef.current = null;
  }, [selectedId]);

  const openLightbox = (id, trigger) => {
    triggerRef.current = trigger;
    setSelectedId(id);
  };

  /* FILTER KEYBOARD NAVIGATION */

  const handleFilterKeyDown = (event) => {
    if (
      event.key !== "ArrowRight" &&
      event.key !== "ArrowLeft"
    ) {
      return;
    }

    const currentIndex =
      lookbookCategories.findIndex(
        (category) => category.id === active
      );

    const direction =
      event.key === "ArrowRight" ? 1 : -1;

    const nextIndex =
      (currentIndex +
        direction +
        lookbookCategories.length) %
      lookbookCategories.length;

    const nextCategory =
      lookbookCategories[nextIndex];

    setActive(nextCategory.id);

    document
      .getElementById(
        `lookbook-filter-${nextCategory.id}`
      )
      ?.focus();
  };

  /* =========================================
     JSX
  ========================================= */

  return (
    <main
      className="lookbook-page"
      lang={currentLanguage}
    >
      
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
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="lookbook-hero-image lookbook-reveal">
          <Image
            src="/images/lookbook/commersial-01.jpg"
            alt={t.heroImageAlt}
            fill
            priority
            sizes="(max-width: 700px) 90vw, 87vw"
          />

          <span>{t.heroImageCaption}</span>
        </div>

        <span className="lookbook-hero-index">
          {t.heroIndex}
        </span>
      </section>

      {/* PROJECTS */}

      <section
        className="lookbook-work"
        id="lookbook-work"
        aria-labelledby="lookbook-heading"
      >
        <div className="lookbook-heading lookbook-reveal">
          <div>
            <span className="lookbook-eyebrow">
              {t.workEyebrow}
            </span>

            <h2 id="lookbook-heading">
              {t.workTitle}{" "}
              <em>{t.workTitleAccent}</em>
            </h2>
          </div>

          <span
            className="lookbook-count"
            aria-live="polite"
          >
            {String(visibleProjects.length).padStart(
              2,
              "0"
            )}{" "}
            / {lookbookProjects.length}
          </span>
        </div>

        {/* FILTERS */}

        <div
          className="lookbook-filters lookbook-reveal"
          role="group"
          aria-label={t.filterLabel}
        >
          {lookbookCategories.map((category) => (
            <button
              id={`lookbook-filter-${category.id}`}
              key={category.id}
              type="button"
              className={
                active === category.id
                  ? "lookbook-filter active"
                  : "lookbook-filter"
              }
              onClick={() => {
                setActive(category.id);
                setSelectedId(null);
              }}
              onKeyDown={handleFilterKeyDown}
              aria-pressed={active === category.id}
            >
              {category[currentLanguage]}
            </button>
          ))}
        </div>

        {/* PROJECT GRID */}

        <div
          className="lookbook-grid"
          aria-live="polite"
        >
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              language={currentLanguage}
              viewLabel={t.view}
              onOpen={openLightbox}
            />
          ))}
        </div>
      </section>

      {/* MANIFESTO */}

      <section
        className="lookbook-manifesto lookbook-reveal"
        aria-labelledby="lookbook-manifesto-title"
      >
        <span className="lookbook-eyebrow">
          {t.manifestoEyebrow}
        </span>

        <div className="lookbook-manifesto-copy">
          <h2 id="lookbook-manifesto-title">
            {t.manifestoTitle
              .split("\n")
              .map((line, index) => (
                <span key={line}>
                  {line}
                  {index === 0 && <br />}
                </span>
              ))}
          </h2>

          <p>{t.manifestoText}</p>
        </div>

        <Link
          className="lookbook-text-link"
          href="/#projects"
        >
          {t.contact}
          <span aria-hidden="true"> ↗</span>
        </Link>
      </section>

      {/* LIGHTBOX */}

      {selected && (
        <LookbookLightbox
          project={selected}
          language={currentLanguage}
          closeLabel={t.close}
          previousLabel={t.previous}
          nextLabel={t.next}
          onClose={closeLightbox}
          onStep={stepLightbox}
        />
      )}

    </main>
  );
}
