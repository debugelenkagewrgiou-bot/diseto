
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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

function CustomCursor({ isActive }) {
  const cursorRef = useRef(null);
  const positionRef = useRef({ x: -100, y: -100 });
  const frameRef = useRef(null);

  useEffect(() => {
    const updatePosition = (event) => {
      positionRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(
            ${positionRef.current.x - 12}px,
            ${positionRef.current.y - 12}px,
            0
          )`;
        }

        frameRef.current = null;
      });
    };

    window.addEventListener("mousemove", updatePosition, {
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", updatePosition);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[9999] hidden h-6 w-6 rounded-full bg-[#f7f4ed]/90 shadow-lg shadow-black/10 transition-opacity duration-200 md:block ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transform: "translate3d(-100px, -100px, 0)",
      }}
    />
  );
}

function VideoCard({ project, isHovered, onHoverChange, onClick }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered && project.video) {
      video.currentTime = 0;

      const playPromise = video.play();
      if (playPromise) playPromise.catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovered, project.video]);

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
      aria-label={`View ${project.title} projects`}
      className={`group relative h-[420px] min-w-[78vw] flex-1 cursor-none overflow-hidden rounded-[2rem] transition-[flex,opacity,box-shadow] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] sm:h-[500px] sm:min-w-[320px] lg:h-[600px] ${
        isHovered
          ? "lg:flex-[2] lg:shadow-2xl lg:shadow-black/10"
          : "lg:flex-[0.8] lg:opacity-90"
      }`}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onFocus={() => onHoverChange(true)}
      onBlur={() => onHoverChange(false)}
    >
      <div className="absolute inset-0">
        <img
          src={project.thumbnail}
          alt={project.title}
          className={`h-full w-full object-cover transition-all duration-700 ${
            isHovered
              ? "grayscale-0 brightness-100"
              : "grayscale brightness-75"
          }`}
          loading="lazy"
        />
      </div>

      {project.video && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            loop
            muted
            playsInline
            preload="none"
            poster={project.thumbnail}
          >
            <source src={project.video} type="video/mp4" />
          </video>
        </div>
      )}

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 p-4 transition-all duration-700 sm:p-8 ${
          isHovered
            ? "translate-y-0 opacity-100"
            : "translate-y-5 opacity-0"
        }`}
      >
        <div className="p-5 sm:p-6">
          <h3 className="font-serif text-sm font-medium leading-relaxed tracking-[0.16em] text-[#f7f4ed] sm:tracking-[0.22em]">
            {project.title}
          </h3>

          <div className="mt-3 flex items-center justify-between border-t border-[#f7f4ed]/40 pt-3">
            <span className="font-sans text-[10px] font-medium tracking-[0.15em] text-[#f7f4ed]/90">
              EXPLORE PROJECTS
            </span>
            <span className="text-xl text-[#a89576]">↗</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [hoveredId, setHoveredId] = useState(null);
  const router = useRouter();

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-transparent px-5 pb-24 pt-16 text-[#28231e] sm:px-8 sm:pb-32 sm:pt-20"
    >
      <CustomCursor isActive={hoveredId !== null} />

      <div className="mx-auto flex max-w-[1600px] flex-col items-center">
        <div className="mb-14 flex flex-col items-center text-center sm:mb-20">
          <h2 className="text-center font-serif text-6xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-7xl md:text-8xl lg:text-9xl">
            PROJECTS<span className="text-[#a89576]">.</span>
          </h2>

          <span className="mt-5 max-w-xl font-sans text-sm font-normal leading-7 text-[#777168]">
            Ανακαλύψτε έργα που συνδυάζουν σύγχρονο σχεδιασμό,
            ποιότητα και διαχρονική αισθητική.
          </span>
        </div>

        <div className="mx-auto flex w-full max-w-[1350px] items-stretch justify-center gap-5 overflow-x-auto bg-transparent px-2 pb-4 sm:px-4 lg:overflow-visible">
          {projects.map((project) => (
            <VideoCard
              key={project.id}
              project={project}
              isHovered={hoveredId === project.id}
              onHoverChange={(hovered) =>
                setHoveredId(hovered ? project.id : null)
              }
              onClick={() => router.push(`/projects/${project.slug}`)}
            />
          ))}
        </div>

        <div className="mt-8 flex w-full flex-col items-center justify-between gap-3 text-center font-sans text-[9px] font-medium tracking-[0.16em] text-[#999184] sm:flex-row">
          <span>HOVER TO EXPLORE</span>
          <span>CLICK TO DISCOVER</span>
        </div>
      </div>
    </section>
  );
}
