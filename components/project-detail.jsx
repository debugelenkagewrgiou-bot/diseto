
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/components/project-data";

export function ProjectDetail({ project }) {
  const currentIndex = projects.findIndex(
    (item) => item.slug === project.slug
  );

  const nextProject = projects[(currentIndex + 1) % projects.length];

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
      `}</style>

      {/* HEADER */}
      <header className="relative z-10 flex items-center justify-between border-b border-[#ded8cd] px-6 py-6 md:px-12 lg:px-20">
        <Link
          href="/"
          className="flex items-center gap-3 text-[#28231e]"
        >
          <ArrowLeft size={17} strokeWidth={1.4} />
          <span className="text-[11px] uppercase tracking-[0.18em]">
            Home
          </span>
        </Link>

        <Link
          href="/#projects"
          className="font-serif text-2xl tracking-[0.12em] text-[#28231e]"
        >
          DiSeto
        </Link>

        <Link
          href="/#projects"
          className="project-link text-[11px] uppercase tracking-[0.18em] text-[#777168]"
        >
          All projects
        </Link>
      </header>

      {/* HERO */}
      <section className="px-6 pb-16 pt-20 md:px-12 md:pb-24 md:pt-28 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="project-reveal mb-8 flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#a89576]" />

            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8b857b]">
              {project.category}
            </span>
          </div>

          <div className="project-reveal mb-12 max-w-5xl">
            <h1 className="text-5xl leading-[1.05] tracking-[-0.04em] md:text-7xl lg:text-[100px]">
              {project.title}
              <span className="text-[#a89576]">.</span>
            </h1>

            {project.summary && (
              <p className="mt-8 max-w-2xl text-sm leading-8 text-[#777168] md:text-base">
                {project.summary}
              </p>
            )}
          </div>

          {project.hero && (
            <div className="project-reveal project-image aspect-[16/9] w-full bg-[#e9e4da]">
              <img
                src={project.hero}
                alt={project.title}
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
                <span className="mb-5 block text-[10px] uppercase tracking-[0.25em] text-[#a89576]">
                  Project details
                </span>

                <h2 className="text-4xl tracking-[-0.03em] md:text-6xl">
                  Selected images
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-7 text-[#777168]">
                A closer look at the details, materials and design behind
                this project.
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
                        ? `${project.title} project`
                        : image.alt || project.title
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
      {(project.storyEyebrow ||
        project.storyTitle ||
        project.storyDescription ||
        project.story?.length > 0) && (
        <section className="bg-[#f0ece3] px-6 py-20 md:px-12 md:py-32 lg:px-20">
          <div className="mx-auto max-w-[1400px]">
            <div className="project-reveal mb-16 max-w-3xl md:mb-24">
              {project.storyEyebrow && (
                <span className="mb-6 block text-[10px] uppercase tracking-[0.25em] text-[#a89576]">
                  {project.storyEyebrow}
                </span>
              )}

              {project.storyTitle && (
                <h2 className="text-4xl leading-[1.12] tracking-[-0.03em] md:text-6xl">
                  {project.storyTitle}
                </h2>
              )}

              {project.storyDescription && (
                <p className="mt-8 max-w-2xl text-sm leading-8 text-[#777168] md:text-base">
                  {project.storyDescription}
                </p>
              )}
            </div>

            {project.story?.length > 0 && (
              <div className="grid grid-cols-1 gap-12 border-t border-[#ded8cd] pt-12 md:grid-cols-2 md:gap-x-20 md:gap-y-16">
                {project.story.map((chapter, index) => (
                  <article key={index} className="project-reveal">
                    <h3 className="mb-5 text-2xl tracking-[-0.02em] md:text-3xl">
                      {chapter.title}
                    </h3>

                    <p className="max-w-xl text-sm leading-8 text-[#777168]">
                      {chapter.text}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* NEXT PROJECT
      {nextProject && nextProject.slug !== project.slug && (
        <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
          <div className="project-reveal mx-auto max-w-[1400px]">
            <span className="mb-8 block text-[10px] uppercase tracking-[0.25em] text-[#a89576]">
              Continue exploring
            </span>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex flex-col justify-between gap-8 border-b border-[#ded8cd] pb-10 md:flex-row md:items-end"
            >
              <div>
                <span className="mb-4 block text-[10px] uppercase tracking-[0.2em] text-[#8b857b]">
                  Next project
                </span>

                <h2 className="text-5xl tracking-[-0.04em] transition-colors duration-300 group-hover:text-[#a89576] md:text-7xl lg:text-8xl">
                  {nextProject.title}
                </h2>

                <span className="mt-5 block text-xs uppercase tracking-[0.15em] text-[#8b857b]">
                  {nextProject.category}
                </span>
              </div>

              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#ded8cd] transition-all duration-300 group-hover:border-[#a89576] group-hover:bg-[#a89576] group-hover:text-white">
                <ArrowRight size={20} strokeWidth={1.3} />
              </span>
            </Link>
          </div>
        </section> */}
      
    </main>
  );
}
