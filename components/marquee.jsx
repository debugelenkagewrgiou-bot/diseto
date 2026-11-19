"use client";

const items = [
  "STRATEGY",
  "BRANDING",
  "DIGITAL DESIGN",
  "CREATIVE DIRECTION",
  "VISUAL EXPERIENCES",
];

export default function Marquee() {
  const repeatedItems = [...items, ...items];

  return (
    <section
      aria-label="DiseTo creative services"
      className="relative w-full overflow-hidden border-y border-current/15 py-8 sm:py-10 lg:py-12"
    >
      <div className="marquee-track flex w-max items-center">
        {repeatedItems.map((item, index) => (
          <div
            key={`${item}-${index}`}
            aria-hidden={index >= items.length}
            className="flex shrink-0 items-center"
          >
            <span className="whitespace-nowrap font-sans text-2xl font-semibold uppercase leading-none tracking-[-0.045em] text-current sm:text-4xl lg:text-5xl xl:text-6xl">
              {item}
            </span>
            <span
              className="mx-7 text-xl font-semibold text-current/50 sm:mx-10 sm:text-3xl lg:mx-12 lg:text-4xl"
              aria-hidden="true"
            >
              ✳
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee-scroll 32s linear infinite;
          will-change: transform;
        }

        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
            transform: none;
          }
        }

        @media (hover: hover) {
          section:hover .marquee-track {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  );
}
