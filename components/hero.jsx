
"use client";

import dynamic from "next/dynamic";
import { useLanguage } from "@/components/languagecontext";

const InfiniteGalley = dynamic(
  () => import("@/components/infinitegallery"),
  {
    ssr: false,
    loading: () => (
      <div className="gallery-canvas" aria-hidden="true" />
    ),
  }
);

const images = [
  "/images/1.webp",
  "/images/2.webp",
  "/images/3.webp",
  "/images/4.webp",
  "/images/5.webp",
  "/images/6.webp",
  "/images/7.webp",
  "/images/8.webp",
];

export default function Hero() {
  const { language } = useLanguage();

  const content = {
    el: {
      eyebrow: "Σχεδιασμός που δίνει χαρακτήρα στον χώρο.",
      title: "ΣΧΕΔΙΑΣΜΟΣ ΠΟΥ",
      highlight: "ΞΕΧΩΡΙΖΕΙ.",
      bottom: "Αισθητική με ταυτότητα",
      scroll: "ΚΑΝΤΕ ΚΥΛΙΣΗ ΓΙΑ ΝΑ ΑΝΑΚΑΛΥΨΕΤΕ",
    },
    en: {
      eyebrow: "Design that gives character to every space.",
      title: "DESIGN THAT",
      highlight: "STANDS OUT.",
      bottom: "Aesthetic with identity",
      scroll: "SCROLL TO DISCOVER",
    },
  };

  const t = content[language] || content.el;

  return (
    <section className="hero" id="home">
      <div className="hero-content hero-title-reveal">
        <span className="hero-eyebrow">
          {t.eyebrow}
        </span>

        <h1>
          {t.title}
          <br />
          <span>{t.highlight}</span>
        </h1>
      </div>

      <div className="hero-gallery">
        <InfiniteGalley
          images={images}
          className="gallery-canvas"
          speed={0.7}
          visibleCount={8}
        />
      </div>

      <div className="hero-bottom">
        <span>{t.bottom}</span>
        <span>{t.scroll}</span>
      </div>

      <style jsx>{`
        .hero-title-reveal {
          animation: heroTitleReveal 1.5s
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .hero-title-reveal .hero-eyebrow {
          animation: heroEyebrowReveal 1.2s ease both;
          animation-delay: 0.15s;
        }

        .hero-title-reveal h1 {
          animation: heroHeadingReveal 1.6s
            cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: 0.2s;
        }

        @keyframes heroTitleReveal {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes heroEyebrowReveal {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroHeadingReveal {
          from {
            opacity: 0;
            transform: translateY(35px);
            filter: blur(7px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-title-reveal,
          .hero-title-reveal .hero-eyebrow,
          .hero-title-reveal h1 {
            animation: none;
            opacity: 1;
            transform: none;
            filter: none;
          }
        }
      `}</style>
    </section>
  );
}
