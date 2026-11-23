"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_IMAGES = [
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
  "/images/4.png",
  "/images/5.png",
  "/images/6.png",
  "/images/7.png",
  "/images/9.png",
  "/images/10.png",
  "/images/11.png",
  "/images/12.png",
  "/images/13.png",
  "/images/16.png",
  "/images/17.png",
  "/images/18.png",
  "/images/19.png",
  "/images/20.png",
];

const clamp = (value, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const smooth = (value) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

/**
 * Scroll-driven image composition for the DiseTo homepage.
 *
 * Pass your own image paths with:
 * <CreativeUniverse images={["/images/a.jpg", "/images/b.jpg"]} />
 */
export default function CreativeUniverse({
  images = DEFAULT_IMAGES,
  eyebrow = "A WORLD OF IDEAS",
  title = "Beyond the expected.",
  description = "A collection of forms, textures and visual ideas that shape the way we create.",
}) {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [loopOffset, setLoopOffset] = useState(0);

  const cards = useMemo(
    () =>
      images.map((image, index) => {
        const center = (index - (images.length - 1) / 2);
        // Deterministic variation: avoids cards jumping on every render.
        const variation = ((index * 37) % 9) - 4;
        return {
          image,
          index,
          rowX: center * (isMobile ? 190 : 330),
          explodedX: center * (isMobile ? 110 : 245) + variation * 18,
          explodedY: ((index % 5) - 2) * 115,
          initialScale: 0.68 + (index % 4) * 0.055,
          finalScale: isMobile ? 0.62 : 0.82,
        };
      }),
    [images, isMobile]
  );

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 768);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const distance = section.offsetHeight - window.innerHeight;
      const travelled = -rect.top;
      setProgress(distance > 0 ? clamp(travelled / distance) : 0);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    if (progress < 0.94 || isMobile) return;

    let frame;
    let previousTime = 0;

    const animate = (time) => {
      if (time - previousTime > 28) {
        setLoopOffset((value) => value - 1.15);
        previousTime = time;
      }
      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [progress >= 0.94, isMobile]);

  const getCardStyle = (card) => {
    const p = progress;
    let x = 0;
    let y = 0;
    let scale = card.initialScale;
    let opacity = 0;

    // 0–35%: images appear one after another in the center.
    if (p <= 0.35) {
      const reveal = clamp((p / 0.35 - card.index * 0.035) * 2.2);
      opacity = reveal;
      scale = card.initialScale + reveal * 0.12;
    }

    // 35–55%: the image stack drops down.
    if (p > 0.35 && p <= 0.55) {
      const t = smooth((p - 0.35) / 0.2);
      y = 190 * t;
      scale = card.initialScale + (0.88 - card.initialScale) * t;
      opacity = 1;
    }

    // 55–75%: images spread out into a loose composition.
    if (p > 0.55 && p <= 0.75) {
      const t = smooth((p - 0.55) / 0.2);
      x = card.explodedX * t;
      y = 190 + (card.explodedY - 190) * t;
      scale = 0.88 + (0.76 - 0.88) * t;
      opacity = 1;
    }

    // 75–94%: composition settles into a long image strip.
    if (p > 0.75) {
      const t = smooth(clamp((p - 0.75) / 0.19));
      const targetX = isMobile
        ? (card.index - (Math.min(images.length, 7) - 1) / 2) * 180
        : card.rowX;
      x = card.explodedX + (targetX - card.explodedX) * t;
      y = card.explodedY + ((isMobile ? 115 : 215) - card.explodedY) * t;
      scale = 0.76 + (card.finalScale - 0.76) * t;
      opacity = 1;
    }

    // Desktop: keep the final strip moving gently while the section is pinned.
    if (p >= 0.94 && !isMobile) {
      const loopWidth = Math.max(images.length * 330, 1);
      const rawX = card.rowX + loopOffset;
      x = ((rawX + loopWidth / 2) % loopWidth + loopWidth) % loopWidth - loopWidth / 2;
      y = 215;
      scale = card.finalScale;
      const edge = Math.abs(x) / (loopWidth / 2);
      opacity = clamp(1.15 - edge * 0.35);
    }

    return {
      opacity,
      transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
    };
  };

  const visibleCards = isMobile ? cards.slice(0, 7) : cards;

  return (
    <section
      ref={sectionRef}
      aria-label="Creative inspiration"
      className="relative bg-[#f4f2ed] text-[#171717]"
      style={{ height: isMobile ? "520vh" : "620vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute left-6 right-6 top-7 z-30 flex items-center justify-between md:left-12 md:right-12 md:top-10">
          <span className="text-[10px] tracking-[0.22em] uppercase text-black/50">
            {eyebrow}
          </span>
          <span className="text-[10px] tracking-[0.18em] uppercase text-black/40">
            DISETO — 01
          </span>
        </div>

        <div className="absolute inset-0">
          {visibleCards.map((card) => (
            <div
              key={`${card.image}-${card.index}`}
              className="absolute left-1/2 top-1/2 h-40 w-32 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[3px] bg-black/5 shadow-[0_14px_45px_rgba(0,0,0,0.13)] sm:h-52 sm:w-40 md:h-64 md:w-52"
              style={getCardStyle(card)}
            >
              <img
                src={card.image}
                alt={`Visual reference ${card.index + 1}`}
                loading={card.index < 4 ? "eager" : "lazy"}
                draggable="false"
                className="h-full w-full select-none object-cover"
              />
            </div>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6 text-center"
          style={{
            opacity: 1 - smooth(clamp((progress - 0.28) / 0.2)),
            transform: `translateY(${-progress * 35}px)`,
          }}
        >
          <div className="max-w-3xl">
            <p className="mb-5 text-[10px] tracking-[0.28em] uppercase text-black/45 md:text-xs">
              {eyebrow}
            </p>
            <h2 className="font-sans text-5xl font-medium leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-8xl">
              {title}
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-black/55 md:text-base">
              {description}
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-center">
          <span className="text-[9px] tracking-[0.22em] uppercase text-black/45">
            Scroll to explore
          </span>
          <div className="mx-auto mt-3 h-8 w-px origin-top bg-black/35">
            <div
              className="h-full w-full origin-top bg-black"
              style={{ transform: `scaleY(${clamp(progress * 2)})` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

