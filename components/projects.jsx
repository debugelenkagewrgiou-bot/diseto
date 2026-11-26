
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/languagecontext";

const projects = [
  {
    id: 1,
    title: "DOORS",
    slug: "doors",
    thumbnail: "/images/door.png",
  },
  {
    id: 2,
    title: "WARDROBES",
    slug: "wardrobes",
    thumbnail: "/images/wardrobe.png",
  },
  {
    id: 3,
    title: "KITCHEN",
    slug: "kitchen",
    thumbnail: "/images/kitchen.png",
  },
];

function VideoCard({ project, exploreText, onClick, index, visible }) {
  return (
    <article
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      role="link"
      tabIndex={0}
      aria-label={`${exploreText} ${project.title}`}
      style={{
        transitionDelay: visible ? `${index * 180}ms` : "0ms",
      }}
      className={`group relative h-[420px] min-w-[78vw] flex-1 cursor-pointer overflow-hidden rounded-[2rem] transition-[flex,opacity,box-shadow,transform] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] sm:h-[500px] sm:min-w-[320px] lg:h-[600px] lg:flex-[0.8] lg:opacity-90 lg:hover:flex-[2] lg:hover:opacity-100 lg:hover:shadow-2xl lg:hover:shadow-black/10 ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-16 scale-[0.96] opacity-0"
      }`}
    >
      <div className="absolute inset-0">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="h-full w-full object-cover grayscale brightness-75 transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-5 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-8">
        <div className="p-5 sm:p-6">
          <h3 className="font-serif text-base font-semibold leading-relaxed tracking-[0.16em] text-[#f7f4ed] sm:text-lg sm:tracking-[0.22em]">
            {project.title}
          </h3>

          <div className="mt-3 flex items-center justify-between border-t border-[#f7f4ed]/40 pt-3">
            <span className="font-sans text-xs font-semibold tracking-[0.15em] text-[#f7f4ed]/90">
              {exploreText}
            </span>

            <span className="text-xl text-[#a89576]"></span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const router = useRouter();
  const { language } = useLanguage();

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    const section = sectionRef.current;

    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const content = {
    el: {
      description:
        "Ανακαλύψτε έργα που συνδυάζουν σύγχρονο σχεδιασμό, ποιότητα και διαχρονική αισθητική.",
      explore: "ΕΞΕΡΕΥΝΗΣΤΕ ΤΑ ΕΡΓΑ",
      hover: "ΠΕΡΑΣΤΕ ΤΟΝ ΔΕΙΚΤΗ ΓΙΑ ΠΡΟΒΟΛΗ",
      click: "ΚΑΝΤΕ ΚΛΙΚ ΓΙΑ ΝΑ ΑΝΑΚΑΛΥΨΕΤΕ",
      discover: "ΑΝΑΚΑΛΥΨΤΕ ΠΕΡΙΣΣΟΤΕΡΑ ΑΠΟ ΤΗ DISETO",
      portfolio: "ΑΝΑΚΑΛΥΨΤΕ ΟΛΟ ΤΟ PORTFOLIO",
    },
    en: {
      description:
        "Discover projects that combine contemporary design, quality and timeless aesthetics.",
      explore: "EXPLORE PROJECTS",
      hover: "HOVER TO EXPLORE",
      click: "CLICK TO DISCOVER",
      discover: "DISCOVER MORE OF DISETO",
      portfolio: "DISCOVER THE FULL PORTFOLIO",
    },
  };

  const t = content[language] || content.el;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden bg-transparent px-5 pb-24 pt-16 text-[#28231e] sm:px-8 sm:pb-32 sm:pt-20"
    >
      <div className="mx-auto flex max-w-[1600px] flex-col items-center">
        {/* TITLE ANIMATION */}
        <div
          className={`mb-14 flex flex-col items-center text-center transition-all duration-1000 ease-out sm:mb-20 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
          }`}
        >
          <h2 className="text-center font-serif text-6xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl md:text-8xl lg:text-9xl">
            PROJECTS<span className="text-[#a89576]">.</span>
          </h2>

          <span className="mt-5 max-w-xl font-sans text-base font-medium leading-7 text-[#777168]">
            {t.description}
          </span>
        </div>

        {/* PROJECT CARDS */}
        <div className="mx-auto flex w-full max-w-[1350px] items-stretch justify-center gap-5 overflow-x-auto bg-transparent px-2 pb-4 sm:px-4 lg:overflow-visible">
          {projects.map((project, index) => (
            <VideoCard
              key={project.id}
              project={project}
              index={index}
              visible={visible}
              exploreText={t.explore}
              onClick={() =>
                router.push(`/projects/${project.slug}`)
              }
            />
          ))}
        </div>

        {/* BOTTOM TEXT */}
        <div
          style={{
            transitionDelay: visible ? "650ms" : "0ms",
          }}
          className={`mt-8 flex w-full flex-col items-center justify-between gap-3 text-center font-sans text-[11px] font-semibold tracking-[0.16em] text-[#999184] transition-all duration-700 sm:flex-row ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <span>{t.hover}</span>
          <span>{t.click}</span>
        </div>

        {/* PORTFOLIO BUTTON */}
        <div
          style={{
            transitionDelay: visible ? "800ms" : "0ms",
          }}
          className={`mt-16 flex flex-col items-center transition-all duration-1000 ease-out sm:mt-20 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
          }`}
        >
          <span className="mb-5 text-[11px] font-semibold tracking-[0.25em] text-[#999184]">
            {t.discover}
          </span>

          <button
            type="button"
            onClick={() => router.push("/lookbook")}
            className="group relative inline-flex items-center gap-8 overflow-hidden border border-[#a89576] px-8 py-5 text-xs font-semibold tracking-[0.2em] text-[#28231e] transition-all duration-500 hover:text-[#f7f4ed] sm:px-12"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-[#a89576] transition-transform duration-500 ease-out group-hover:scale-x-100" />

            <span className="relative z-10">
              {t.portfolio}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
