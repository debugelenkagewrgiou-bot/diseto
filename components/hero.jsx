
"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/languagecontext";

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
  const [InfiniteGallery, setInfiniteGallery] = useState(null);

  useEffect(() => {
    let mounted = true;

    import("@/components/infinitegallery")
      .then((module) => {
        if (mounted) {
          setInfiniteGallery(() => module.default);
        }
      })
      .catch((error) => {
        console.error("Gallery loading error:", error);
      });

    return () => {
      mounted = false;
    };
  }, []);

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

  // Περιμένουμε να φορτωθεί το gallery component.
  if (!InfiniteGallery) {
    return (
      <section
        className="hero hero-loading"
        id="home"
        aria-busy="true"
      >
        <div className="hero-gallery">
          <div className="gallery-canvas" aria-hidden="true" />
        </div>
      </section>
    );
  }

  return (
    <section className="hero hero-ready" id="home">
      <div className="hero-content">
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
        <InfiniteGallery
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
    </section>
  );
}
