
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/components/languagecontext";

export function ProjectDetail({ project }) {
  const { language } = useLanguage();

  const translations = {
    el: {
      home: "ΑΡΧΙΚΗ",
      allProjects: "ΟΛΑ ΤΑ ΕΡΓΑ",
      details: "ΛΕΠΤΟΜΕΡΕΙΕΣ ΕΡΓΟΥ",
      selectedPhotos: "Επιλεγμένες φωτογραφίες",
      galleryDescription:
        "Μια πιο κοντινή ματιά στις λεπτομέρειες, τα υλικά και τον σχεδιασμό αυτού του έργου.",
      photo: "φωτογραφία",
    },
    en: {
      home: "HOME",
      allProjects: "ALL PROJECTS",
      details: "PROJECT DETAILS",
      selectedPhotos: "Selected photographs",
      galleryDescription:
        "A closer look at the details, materials and design of this project.",
      photo: "photo",
    },
  };

  const t = translations[language] || translations.el;
  const localized = project.translations?.[language] || {};

  const getText = (field) => localized[field] ?? project[field];

  useEffect(() => {
    const elements = document.querySelectorAll(".project-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [project.slug]);

  return (
    <main className="project-page min-h-screen overflow-hidden bg-[#f7f4ed] text-[#28231e]">
      <style jsx global>{`
        .project-page {
          font-family: Arial, Helvetica, sans-serif;
        }

        .project-page h1,
        .project-page h2,
        .project-page h3 {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 400;
        }

        .project-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition:
            opacity 0.8s ease,
            transform 0.8s ease;
        }

        .project-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .project-image {
          overflow: hidden;
        }

        .project-image img {
          transition: transform 0.8s cubic-bezier(0.2, 0.65, 0.3, 1);
        }

        .project-image:hover img {
          transform: scale(1.035);
        }

        .project-link {
          transition: color 0.3s ease;
        }

        .project-link:hover {
          color: #a89576;
        }

        .project-page ::selection {
          background: #a89576;
          color: #fff;
        }

        @media (prefers-reduced-motion: reduce) {
          .project-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .project-image img {
            transition: none;
          }
        }
      `}</style>

      {/* HEADER */}
      <header className="relative z-10 flex items-center justify-between border-b border-[#ded8cd] px-6 py-6 md:px-12 lg:px-20">
        <Link href="/" className="flex items-center gap-3 text-[#28231e]">
          <ArrowLeft size={17} strokeWidth={1.4} />
          <span className="text-[11px] tracking-[0.18em]">
            {t.home}
          </span>
        </Link>

        <Link
          href="/"
          className="font-serif text-2xl tracking-[0.12em] text-[#28231e]"
        >
          DiSeto
        </Link>

        <Link
          href="/#projects"
          className="project-link text-[11px] tracking-[0.18em] text-[#777168]"
        >
          {t.allProjects}
        </Link>
      </header>

      {/* HERO */}
      <section className="px-6 pb-16 pt-20 md:px-12 md:pb-24 md:pt-28 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="project-reveal mb-8 flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#a89576]" />
            <span className="text-[10px] tracking-[0.25em] text-[#8b857b]">
              {getText("category")}
            </span>
          </div>

          <div className="project-reveal mb-12 max-w-5xl">
            <h1 className="text-5xl leading-[1.05] tracking-[-0.04em] md:text-7xl lg:text-[100px]">
              {getText("title")}
              <span className="text-[#a89576]">.</span>
            </h1>

            {getText("summary") && (
              <p className="mt-8 max-w-2xl text-sm leading-8 text-[#777168] md:text-base">
                {getText("summary")}
              </p>
            )}
          </div>

          {project.hero && (
            <div className="project-reveal project-image aspect-[16/9] w-full bg-[#e9e4da]">
              <img
                src={project.hero}
                alt={getText("title")}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* GALLERY */}
      {project.gallery?.length > 0 && (
        <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
          <div className="mx-auto max-w-[1400px]">
            <div className="project-reveal mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="mb-5 block text-[10px] tracking-[0.25em] text-[#a89576]">
                  {t.details}
                </span>

                <h2 className="text-4xl tracking-[-0.03em] md:text-6xl">
                  {t.selectedPhotos}
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-7 text-[#777168]">
                {t.galleryDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:gap-x-12 md:gap-y-20">
              {project.gallery.map((image, index) => (
                <div
                  key={index}
                  className={`project-reveal project-image bg-[#e9e4da] ${
                    index % 2 === 1 ? "sm:mt-24" : ""
                  }`}
                >
                  <img
                    src={typeof image === "string" ? image : image.src}
                    alt={
                      typeof image === "string"
                        ? `${getText("title")} - ${t.photo} ${index + 1}`
                        : image.alt || getText("title")
                    }
                    className="aspect-[1.15] h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STORY */}
      {(getText("storyEyebrow") ||
        getText("storyTitle") ||
        getText("storyDescription") ||
        getText("story")?.length > 0) && (
        <section className="bg-[#351019] px-6 py-20 text-[#f7f4ed] md:px-12 md:py-32 lg:px-20">
          <div className="mx-auto max-w-[1400px]">
            <div className="project-reveal mb-16 max-w-3xl md:mb-24">
              {getText("storyEyebrow") && (
                <span className="mb-6 block text-[10px] tracking-[0.25em] text-[#c5a47d]">
                  {getText("storyEyebrow")}
                </span>
              )}

              {getText("storyTitle") && (
                <h2 className="text-4xl leading-[1.12] tracking-[-0.03em] text-[#f7f4ed] md:text-6xl">
                  {getText("storyTitle")}
                </h2>
              )}

              {getText("storyDescription") && (
                <p className="mt-8 max-w-2xl text-sm leading-8 text-[#d1c1bd] md:text-base">
                  {getText("storyDescription")}
                </p>
              )}
            </div>

            {getText("story")?.length > 0 && (
              <div className="grid grid-cols-1 gap-12 border-t border-white/20 pt-12 md:grid-cols-2 md:gap-x-20 md:gap-y-16">
                {getText("story").map((chapter, index) => (
                  <article key={index} className="project-reveal">
                    <h3 className="mb-5 text-2xl tracking-[-0.02em] text-[#f7f4ed] md:text-3xl">
                      {chapter.title}
                    </h3>

                    <p className="max-w-xl text-sm leading-8 text-[#d1c1bd]">
                      {chapter.text}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
