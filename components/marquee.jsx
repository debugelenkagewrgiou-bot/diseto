
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
      aria-label="DiSeto services"
      className="relative w-full overflow-hidden bg-[#f7f4ed] px-6 pb-12 pt-24 text-[#28231e] sm:px-10 sm:pb-16 sm:pt-32 lg:pt-40"
    >
      {/* Intro above marquee */}
      <div className="mx-auto mb-10 flex max-w-[1500px] items-end justify-between gap-6 sm:mb-14">
        <div>
          <span className="mb-4 block font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-[#a89576]">
          
          </span>

          <h2 className="font-serif text-3xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            
            <br />
            <span className="text-[#a89576]"></span>
          </h2>
        </div>

        <span className="hidden pb-2 font-sans text-[9px] tracking-[0.16em] text-[#777168] sm:block">
        
        </span>
      </div>

      {/* Marquee strip */}
      <div className="border-y border-[#28231e]/15 py-7 sm:py-9 lg:py-11">
        <div className="marquee-track flex w-max items-center">
          {repeatedItems.map((item, index) => (
            <div
              key={`${item}-${index}`}
              aria-hidden={index >= items.length}
              className="flex shrink-0 items-center"
            >
              <span className="whitespace-nowrap font-sans text-2xl font-medium uppercase leading-none tracking-[-0.045em] sm:text-4xl lg:text-5xl xl:text-6xl">
                {item}
              </span>

              <span
                className="mx-7 text-xl font-normal text-[#a89576] sm:mx-10 sm:text-3xl lg:mx-12 lg:text-4xl"
                aria-hidden="true"
              >
                -
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom caption */}
      <div className="mx-auto mt-5 flex max-w-[1500px] justify-between font-sans text-[9px] tracking-[0.15em] text-[#777168]">
        <span></span>
        <span></span>
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
