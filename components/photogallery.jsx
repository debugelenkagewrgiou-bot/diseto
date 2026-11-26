"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Image as ImageIcon,
  Maximize2,
  Star,
} from "lucide-react";
import { useLanguage } from "@/components/languagecontext";

/* =========================================
   TRANSLATIONS
========================================= */
const content = {
  el: {
    eyebrow: "DISETO · LATEST PHOTOS",
    title: "Πρόσφατες Φωτογραφίες",
    subtitle:
      "Οι τελευταίες φωτογραφίες από τη δουλειά μας — ενημερώνεται συνεχώς",
    filters: {
      all: "Όλα",
      kitchen: "Κουζίνες",
      wardrobes: "Ντουλάπες",
      doors: "Πόρτες",
      other: "Άλλα",
    },
    featured: "Featured",
    loading: "Φόρτωση φωτογραφιών...",
    empty: "Δεν υπάρχουν φωτογραφίες",
    emptyHint:
      "Οι φωτογραφίες θα εμφανιστούν εδώ όταν προστεθούν από τον διαχειριστή.",
    error: "Σφάλμα φόρτωσης",
    close: "Κλείσιμο",
    previous: "Προηγούμενη",
    next: "Επόμενη",
  },
  en: {
    eyebrow: "DISETO · LATEST PHOTOS",
    title: "Latest Photos",
    subtitle:
      "The latest photos from our work — updated continuously",
    filters: {
      all: "All",
      kitchen: "Kitchens",
      wardrobes: "Wardrobes",
      doors: "Doors",
      other: "Other",
    },
    featured: "Featured",
    loading: "Loading photos...",
    empty: "No photos yet",
    emptyHint:
      "Photos will appear here once added by the administrator.",
    error: "Loading error",
    close: "Close",
    previous: "Previous",
    next: "Next",
  },
};

export default function PhotoGallery({
  title,
  subtitle,
  showFilters = true,
  limit,
}) {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // ✅ Αποφυγή hydration mismatch
  const currentLanguage = mounted && language === "en" ? "en" : "el";
  const t = content[currentLanguage];

  const finalTitle = title || t.title;
  const finalSubtitle = subtitle || t.subtitle;

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  /* =========================================
     LOAD PHOTOS
  ========================================= */
  const loadPhotos = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/photos", {
        cache: "no-store",
      });

      const text = await response.text();
      if (!text) throw new Error(t.error);

      const data = JSON.parse(text);

      if (!response.ok || !data.success) {
        throw new Error(data.message || t.error);
      }

      setPhotos(data.photos || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [t.error]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  /* =========================================
     FILTER + SORT
  ========================================= */
  const visiblePhotos = useMemo(() => {
    let result = photos;

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Featured πρώτα
    result = [...result].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

    if (limit) result = result.slice(0, limit);

    return result;
  }, [photos, activeCategory, limit]);

  const categoriesWithCount = [
    { value: "all", label: t.filters.all },
    { value: "kitchen", label: t.filters.kitchen },
    { value: "wardrobes", label: t.filters.wardrobes },
    { value: "doors", label: t.filters.doors },
    { value: "other", label: t.filters.other },
  ]
    .map((cat) => ({
      ...cat,
      count:
        cat.value === "all"
          ? photos.length
          : photos.filter((p) => p.category === cat.value).length,
    }))
    .filter((c) => c.count > 0 || c.value === "all");

  /* =========================================
     LIGHTBOX ACTIONS
  ========================================= */
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextPhoto = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % visiblePhotos.length
    );
  }, [visiblePhotos.length]);

  const prevPhoto = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + visiblePhotos.length) % visiblePhotos.length
    );
  }, [visiblePhotos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, nextPhoto, prevPhoto]);

  /* =========================================
     RENDER
  ========================================= */
  return (
    <section className="relative w-full overflow-hidden bg-[#f7f4ed] px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        {/* HEADER */}
        <div className="mb-16 border-b border-[#ded8cd] pb-8 sm:mb-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mb-4 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#a89576]">
                {t.eyebrow}
              </span>
              <h1 className="max-w-[700px] font-serif text-[clamp(2.8rem,6vw,5rem)] font-medium leading-[0.95] tracking-[-0.06em] text-[#28231e]">
                {finalTitle}
              </h1>
            </div>

            <p className="max-w-[360px] text-[15px] font-medium leading-7 text-[#777168] sm:text-right">
              {finalSubtitle}
            </p>
          </div>
        </div>

        {/* FILTERS */}
        {showFilters && categoriesWithCount.length > 1 && (
          <div className="mb-12 flex flex-wrap gap-2">
            {categoriesWithCount.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`group relative border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 ${
                  activeCategory === cat.value
                    ? "border-[#28231e] bg-[#28231e] text-[#f7f4ed]"
                    : "border-[#ded8cd] bg-transparent text-[#938a7d] hover:border-[#a89576] hover:text-[#28231e]"
                }`}
              >
                {cat.label}
                <span
                  className={`ml-2 text-[10px] ${
                    activeCategory === cat.value
                      ? "text-[#a89576]"
                      : "text-[#c0b8a8]"
                  }`}
                >
                  {String(cat.count).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* CONTENT */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center gap-3 text-sm text-[#777168]">
            <Loader2 size={20} className="animate-spin" />
            {t.loading}
          </div>
        ) : error ? (
          <div className="border-l-2 border-rose-700 pl-4 text-sm text-rose-700">
            {error}
          </div>
        ) : visiblePhotos.length === 0 ? (
          <div className="border-2 border-dashed border-[#ded8cd] bg-white/40 p-20 text-center">
            <ImageIcon size={56} className="mx-auto text-[#a89576]/40" />
            <h3 className="mt-6 font-serif text-2xl font-medium text-[#28231e]">
              {t.empty}
            </h3>
            <p className="mt-2 text-sm text-[#777168]">{t.emptyHint}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePhotos.map((photo, index) => (
              <button
                key={photo._id}
                onClick={() => openLightbox(index)}
                className="group relative aspect-[4/3] overflow-hidden bg-[#e8e3d8] text-left transition-all duration-500 hover:shadow-2xl"
              >
                <img
                  src={`/api/photos/${photo._id}`}
                  alt={photo.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 translate-y-6 p-6 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a89576]">
                    {t.filters[photo.category] || t.filters.other} ·{" "}
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-2xl font-medium leading-tight">
                    {photo.title}
                  </h3>
                  {photo.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-white/70">
                      {photo.description}
                    </p>
                  )}
                </div>

                {/* Featured badge */}
                {photo.featured && (
                  <div className="absolute left-3 top-3 flex items-center gap-1 bg-[#a89576] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                    <Star size={10} fill="currentColor" />
                    {t.featured}
                  </div>
                )}

                {/* Expand icon */}
                <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center bg-white/90 text-[#28231e] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Maximize2 size={16} />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* =========================================
          LIGHTBOX
      ========================================= */}
      {lightboxIndex !== null && visiblePhotos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label={t.close}
          >
            <X size={22} />
          </button>

          <div className="absolute left-1/2 top-4 -translate-x-1/2 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
            {String(visiblePhotos.length).padStart(2, "0")}
          </div>

          {visiblePhotos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
              aria-label={t.previous}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div
            className="max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`/api/photos/${visiblePhotos[lightboxIndex]._id}`}
              alt={visiblePhotos[lightboxIndex].title}
              className="max-h-[80vh] max-w-[90vw] object-contain shadow-2xl"
            />

            <div className="mt-6 text-center text-white">
              <h3 className="font-serif text-2xl font-medium">
                {visiblePhotos[lightboxIndex].title}
              </h3>
              {visiblePhotos[lightboxIndex].description && (
                <p className="mt-2 text-sm text-white/70">
                  {visiblePhotos[lightboxIndex].description}
                </p>
              )}
            </div>
          </div>

          {visiblePhotos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
              aria-label={t.next}
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      )}
    </section>
  );
}