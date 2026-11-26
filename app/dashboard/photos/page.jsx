"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Upload,
  Trash2,
  Star,
  StarOff,
  Loader2,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  CloudUpload,
  X,
  Search,
  Grid3x3,
  List,
} from "lucide-react";

const CATEGORIES = [
  { value: "kitchen", label: "Κουζίνες", color: "bg-orange-100 text-orange-700" },
  { value: "wardrobes", label: "Ντουλάπες", color: "bg-blue-100 text-blue-700" },
  { value: "doors", label: "Πόρτες", color: "bg-emerald-100 text-emerald-700" },
  { value: "other", label: "Άλλα", color: "bg-purple-100 text-purple-700" },
];

export default function PhotosDashboard() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // Upload state
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("kitchen");
  const [description, setDescription] = useState("");
  const [dragActive, setDragActive] = useState(false);

  // UI state
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [showUploadModal, setShowUploadModal] = useState(false);

  const fileInputRef = useRef(null);
  const abortRef = useRef(null);

  /* =========================================
     LOAD PHOTOS
  ========================================= */
  const loadPhotos = useCallback(async () => {
    setLoading(true);
    setError("");

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/photos", {
        cache: "no-store",
        signal: controller.signal,
      });

      const text = await response.text();
      if (!text) throw new Error("Κενή απάντηση από τον διακομιστή.");

      const data = JSON.parse(text);

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Αδυναμία φόρτωσης.");
      }

      setPhotos(data.photos || []);
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPhotos();
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [loadPhotos]);

  /* =========================================
     PREVIEW — καθαρίζει σωστά όταν file=null
  ========================================= */
  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  /* =========================================
     FILE HANDLING
  ========================================= */
  const processFile = (selected) => {
    if (!selected) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(selected.type)) {
      setError("Επιτρέπονται μόνο JPG, PNG, WEBP.");
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setError("Το αρχείο ξεπερνά τα 5MB.");
      return;
    }

    setError("");
    setFile(selected);

    if (!title) {
      const nameWithoutExt = selected.name.replace(/\.[^.]+$/, "");
      setTitle(nameWithoutExt);
    }
  };

  const handleFileChange = (e) => {
    processFile(e.target.files?.[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    processFile(e.dataTransfer.files?.[0]);
  };

  /* =========================================
     RESET FORM — καθαρίζει preview ΚΑΙ file
  ========================================= */
  const resetUploadForm = () => {
    setFile(null);
    setPreview("");
    setTitle("");
    setDescription("");
    setCategory("kitchen");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* =========================================
     UPLOAD
  ========================================= */
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title.trim()) return;

    setUploading(true);
    setError("");
    setNotice("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title.trim());
      formData.append("category", category);
      formData.append("description", description.trim());

      const response = await fetch("/api/photos/upload", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      if (!text) throw new Error("Κενή απάντηση από τον διακομιστή.");

      const data = JSON.parse(text);

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Το ανέβασμα απέτυχε.");
      }

      setNotice("✅ Η φωτογραφία ανέβηκε επιτυχώς.");
      resetUploadForm();
      await loadPhotos();
      setShowUploadModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  /* =========================================
     DELETE
  ========================================= */
  const handleDelete = async (photo) => {
    const confirmed = window.confirm(
      `Διαγραφή "${photo.title}";\n\nΗ ενέργεια δεν αναιρείται.`
    );
    if (!confirmed) return;

    setDeleting(photo._id);
    setError("");
    setNotice("");

    const previous = photos;
    setPhotos((prev) => prev.filter((p) => p._id !== photo._id));

    try {
      const response = await fetch(`/api/photos?id=${photo._id}`, {
        method: "DELETE",
      });

      const text = await response.text();
      if (!text) throw new Error("Κενή απάντηση από τον διακομιστή.");

      const data = JSON.parse(text);

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Η διαγραφή απέτυχε.");
      }

      setNotice("✅ Η φωτογραφία διαγράφηκε.");
    } catch (err) {
      setPhotos(previous);
      setError(err.message);
    } finally {
      setDeleting(null);
    }
  };

  /* =========================================
     TOGGLE FEATURED
  ========================================= */
  const handleToggleFeatured = async (photo) => {
    const newFeatured = !photo.featured;

    setPhotos((prev) =>
      prev.map((p) =>
        p._id === photo._id ? { ...p, featured: newFeatured } : p
      )
    );

    try {
      const response = await fetch("/api/photos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: photo._id, featured: newFeatured }),
      });

      const text = await response.text();
      if (!text) throw new Error("Κενή απάντηση από τον διακομιστή.");

      const data = JSON.parse(text);

      if (!response.ok || !data.success) {
        throw new Error(data.message);
      }
    } catch (err) {
      setPhotos((prev) =>
        prev.map((p) =>
          p._id === photo._id ? { ...p, featured: photo.featured } : p
        )
      );
      setError(err.message);
    }
  };

  /* =========================================
     FILTER
  ========================================= */
  const filteredPhotos = photos.filter((p) => {
    const matchesCategory =
      categoryFilter === "all" || p.category === categoryFilter;
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryInfo = (value) =>
    CATEGORIES.find((c) => c.value === value) || CATEGORIES[3];

  /* =========================================
     RENDER
  ========================================= */
  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-20 pt-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <header className="mb-8">
          <a
            href="/dashboard"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-amber-600"
          >
            <ArrowLeft size={16} />
            Πίσω στο Dashboard
          </a>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">
                  DISETO / Gallery Manager
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900">
                Φωτογραφίες
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                {photos.length} φωτογραφίες στη συλλογή σου
              </p>
            </div>

            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-amber-700 hover:shadow-lg"
            >
              <CloudUpload size={18} />
              Ανέβασε Φωτογραφία
            </button>
          </div>
        </header>

        {/* NOTICES */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {notice && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {/* TOOLBAR */}
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 md:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Αναζήτηση φωτογραφίας..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-700 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCategoryFilter("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                categoryFilter === "all"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Όλα ({photos.length})
            </button>
            {CATEGORIES.map((c) => {
              const count = photos.filter((p) => p.category === c.value).length;
              return (
                <button
                  key={c.value}
                  onClick={() => setCategoryFilter(c.value)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    categoryFilter === c.value
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {c.label} ({count})
                </button>
              );
            })}

            <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-md p-1.5 transition ${
                  viewMode === "grid"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
                aria-label="Grid view"
              >
                <Grid3x3 size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-md p-1.5 transition ${
                  viewMode === "list"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
                aria-label="List view"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* GALLERY */}
        {loading ? (
          <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-gray-500">
            <Loader2 size={20} className="animate-spin" />
            Φόρτωση φωτογραφιών...
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-16 text-center">
            <ImageIcon size={64} className="mx-auto text-gray-300" />
            <h3 className="mt-4 text-lg font-semibold text-gray-700">
              {searchQuery || categoryFilter !== "all"
                ? "Δεν βρέθηκαν φωτογραφίες"
                : "Δεν υπάρχουν φωτογραφίες"}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {searchQuery || categoryFilter !== "all"
                ? "Δοκίμασε διαφορετικά φίλτρα."
                : "Πάτα «Ανέβασε Φωτογραφία» για να ξεκινήσεις."}
            </p>
            {!searchQuery && categoryFilter === "all" && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700"
              >
                <CloudUpload size={16} />
                Ανέβασε την πρώτη φωτογραφία
              </button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPhotos.map((photo) => {
              const catInfo = getCategoryInfo(photo.category);
              return (
                <div
                  key={photo._id}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={`/api/photos/${photo._id}`}
                      alt={photo.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {photo.featured && (
                      <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white shadow">
                        <Star size={11} fill="currentColor" /> Featured
                      </span>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition group-hover:opacity-100">
                      <button
                        onClick={() => handleToggleFeatured(photo)}
                        className="rounded-lg bg-white p-2 text-gray-700 transition hover:bg-amber-100 hover:text-amber-700"
                        title={photo.featured ? "Αφαίρεση featured" : "Feature"}
                      >
                        {photo.featured ? (
                          <Star size={16} fill="currentColor" />
                        ) : (
                          <StarOff size={16} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(photo)}
                        disabled={deleting === photo._id}
                        className="rounded-lg bg-white p-2 text-rose-600 transition hover:bg-rose-100"
                        title="Διαγραφή"
                      >
                        {deleting === photo._id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="truncate font-semibold text-gray-900">
                      {photo.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${catInfo.color}`}
                      >
                        {catInfo.label}
                      </span>
                      {photo.size && (
                        <span className="text-xs text-gray-400">
                          {(photo.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="p-4 font-medium">Φωτογραφία</th>
                  <th className="p-4 font-medium">Τίτλος</th>
                  <th className="p-4 font-medium">Κατηγορία</th>
                  <th className="p-4 font-medium">Featured</th>
                  <th className="p-4 text-right font-medium">Ενέργειες</th>
                </tr>
              </thead>
              <tbody>
                {filteredPhotos.map((photo) => {
                  const catInfo = getCategoryInfo(photo.category);
                  return (
                    <tr
                      key={photo._id}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <img
                          src={`/api/photos/${photo._id}`}
                          alt={photo.title}
                          className="h-16 w-24 rounded-lg object-cover"
                          loading="lazy"
                        />
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-gray-900">
                          {photo.title}
                        </p>
                        {photo.description && (
                          <p className="mt-1 line-clamp-1 text-xs text-gray-500">
                            {photo.description}
                          </p>
                        )}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${catInfo.color}`}
                        >
                          {catInfo.label}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleFeatured(photo)}
                          className={`rounded-lg px-2 py-1 text-xs font-medium transition ${
                            photo.featured
                              ? "bg-amber-100 text-amber-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {photo.featured ? "★ Featured" : "☆ Feature"}
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDelete(photo)}
                          disabled={deleting === photo._id}
                          className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 transition hover:bg-rose-100 disabled:opacity-40"
                        >
                          {deleting === photo._id ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            "Διαγραφή"
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =========================================
          UPLOAD MODAL
      ========================================= */}
      {showUploadModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget && !uploading) {
              setShowUploadModal(false);
              resetUploadForm();
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Ανέβασε Φωτογραφία
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  JPG, PNG ή WEBP — μέγιστο 5MB
                </p>
              </div>
              <button
                onClick={() => {
                  if (!uploading) {
                    setShowUploadModal(false);
                    resetUploadForm();
                  }
                }}
                disabled={uploading}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-40"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpload} className="p-6">
              {/* ✅ Drag & Drop zone — ασφαλές render */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition ${
                  dragActive
                    ? "border-amber-500 bg-amber-50"
                    : file
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-gray-300 bg-gray-50 hover:border-amber-400 hover:bg-amber-50/50"
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                {preview && file ? (
                  <>
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-64 rounded-lg object-contain"
                    />
                    <p className="mt-3 text-xs text-gray-500">
                      {file.name} — {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <p className="mt-1 text-xs text-amber-600">
                      Κλικ για αλλαγή αρχείου
                    </p>
                  </>
                ) : (
                  <>
                    <div className="rounded-full bg-amber-100 p-4">
                      <CloudUpload size={32} className="text-amber-600" />
                    </div>
                    <p className="mt-4 text-sm font-medium text-gray-700">
                      Σύρετε μια φωτογραφία εδώ ή κλικ για επιλογή
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      JPG, PNG, WEBP — max 5MB
                    </p>
                  </>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Τίτλος *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="π.χ. Μοντέρνα κουζίνα 2024"
                    required
                    maxLength={100}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Κατηγορία
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Περιγραφή (προαιρετικό)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    maxLength={300}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    resetUploadForm();
                  }}
                  disabled={uploading}
                  className="flex-1 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Ακύρωση
                </button>
                <button
                  type="submit"
                  disabled={uploading || !file || !title.trim()}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Ανέβασμα...
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      Ανέβασε
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}