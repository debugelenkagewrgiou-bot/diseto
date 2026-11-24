

"use client";

import InfiniteGalley from "@/components/infinitegallery";
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
  .what-we-do {
    position: relative;
    isolation: isolate;
    background: #351019;
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
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.15em;
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
    font-weight: 500;
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
    font-size: clamp(19px, 1.35vw, 21px);
    font-weight: 500;
    line-height: 1.85;
  }

  .services-heading {
    display: flex;
    justify-content: space-between;
    padding: 21px 2px;
    color: #c5a47d;
    border-top: 1px solid rgba(226, 211, 187, 0.22);
    border-bottom: 1px solid rgba(226, 211, 187, 0.22);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.15em;
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
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.12em;
  }

  .service-content h3 {
    max-width: 440px;
    margin: 0 0 18px;
    color: #f4efe6;
    font-family: Georgia, serif;
    font-size: clamp(28px, 2.3vw, 36px);
    font-weight: 500;
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
    color: #e5d8d2;
    font-family: Arial, Helvetica, sans-serif;
    font-size: clamp(17px, 1.15vw, 19px);
    font-weight: 400;
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
    font-weight: 500;
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
    font-size: clamp(18px, 1.2vw, 20px);
    font-weight: 500;
    line-height: 1.85;
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
    font-size: 14px;
    font-weight: 600;
    line-height: 1.6;
    letter-spacing: 0.1em;
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

  .philosophy-arrow {
    font-size: 17px;
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
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.15em;
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

  /* FULL-WIDTH ARCHITECTURAL IMAGE */

  .what-wide-band {
    position: relative;
    width: 100vw;
    height: clamp(250px, 34vw, 440px);
    margin: 76px 0 68px calc(50% - 50vw);
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    isolation: isolate;
    background-image:
      linear-gradient(
        90deg,
        rgba(35, 8, 16, 0.76),
        rgba(35, 8, 16, 0.12)
      ),
      url("/images/background.jpg");
    background-size: cover;
    background-position: center 55%;
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
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.17em;
  }

  .what-wide-band-inner p {
    max-width: 800px;
    margin: 0;
    font-size: clamp(28px, 5.4vw, 72px);
    font-weight: 600;
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
      font-size: 17px;
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
      font-size: 11px;
      line-height: 1.6;
    }

    .what-heading-grid {
      grid-template-columns: 1fr;
      padding: 58px 0 72px;
    }

    .what-heading h2 {
      font-size: clamp(49px, 12vw, 70px);
      font-weight: 500;
    }

    .what-intro-wrap {
      padding: 18px 0 4px 18px;
    }

    .what-intro {
      font-size: 17px;
      line-height: 1.8;
    }

    .services-heading {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.1em;
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
      font-size: 13px;
    }

    .service-content h3 {
      font-size: 27px;
      font-weight: 500;
      margin-bottom: 12px;
    }

    .service-content p {
      font-size: 16px;
      line-height: 1.8;
    }

    .what-wide-band {
      height: 250px;
      margin: 48px 0 48px calc(50% - 50vw);
      background-position: center;
    }

    .what-wide-band-inner {
      width: 88%;
      padding-bottom: 28px;
    }

    .what-wide-band-inner span {
      font-size: 11px;
    }

    .what-wide-band-inner p {
      font-size: 34px;
      font-weight: 600;
    }

    .what-footer {
      grid-template-columns: 1fr;
      margin-top: 82px;
      padding: 38px 24px 42px;
      gap: 25px;
    }

    .philosophy-title h2 {
      font-size: clamp(44px, 10.5vw, 64px);
      font-weight: 500;
    }

    .philosophy-content p {
      font-size: 17px;
      line-height: 1.8;
    }

    .philosophy-link {
      font-size: 12px;
      font-weight: 600;
      line-height: 1.7;
    }

    .what-bottom-line {
      flex-direction: column;
      gap: 12px;
      font-size: 11px;
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
    .philosophy-link {
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
