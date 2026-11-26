"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { useLanguage } from "@/components/languagecontext";
import { translations } from "@/lib/translations";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  clientType: "Ιδιώτης",
  project: "Κουζίνα",
  budget: "",
  area: "",
  message: "",
  date: "",
  time: "",
};

const clientTypes = [
  { value: "Ιδιώτης", el: "Ιδιώτης", en: "Private client" },
  { value: "Ξενοδοχείο", el: "Ξενοδοχείο", en: "Hotel" },
  { value: "Επιχείρηση", el: "Επιχείρηση", en: "Business" },
  {
    value: "Αρχιτέκτονας / Διακοσμητής",
    el: "Αρχιτέκτονας / Διακοσμητής",
    en: "Architect / Interior designer",
  },
];

const projects = [
  { value: "Κουζίνα", el: "Κουζίνα", en: "Kitchen" },
  {
    value: "Έπιπλα κατά παραγγελία",
    el: "Έπιπλα κατά παραγγελία",
    en: "Custom furniture",
  },
  { value: "Ντουλάπες", el: "Ντουλάπες", en: "Wardrobes" },
  {
    value: "Ειδικές ξύλινες κατασκευές",
    el: "Ειδικές ξύλινες κατασκευές",
    en: "Custom woodwork",
  },
  {
    value: "Εσωτερικός σχεδιασμός",
    el: "Εσωτερικός σχεδιασμός",
    en: "Interior design",
  },
  {
    value: "Ανακαίνιση κατοικίας",
    el: "Ανακαίνιση κατοικίας",
    en: "Home renovation",
  },
  {
    value: "Ανακαίνιση ξενοδοχείου",
    el: "Ανακαίνιση ξενοδοχείου",
    en: "Hotel renovation",
  },
  {
    value: "Επαγγελματικός χώρος",
    el: "Επαγγελματικός χώρος",
    en: "Commercial space",
  },
  { value: "Άλλο", el: "Άλλο", en: "Other" },
];

const budgets = [
  { value: "Έως 3.000€", el: "Έως 3.000€", en: "Up to €3,000" },
  { value: "3.000€ – 6.000€", el: "3.000€ – 6.000€", en: "€3,000 – €6,000" },
  { value: "6.000€ – 10.000€", el: "6.000€ – 10.000€", en: "€6,000 – €10,000" },
  { value: "10.000€ – 20.000€", el: "10.000€ – 20.000€", en: "€10,000 – €20,000" },
  { value: "20.000€+", el: "20.000€+", en: "€20,000+" },
  {
    value: "Δεν γνωρίζω ακόμη",
    el: "Δεν γνωρίζω ακόμη",
    en: "Not sure yet",
  },
];

const MAX_FILES = 5;
const MAX_FILE_SIZE = 3 * 1024 * 1024;
const MAX_TOTAL_SIZE = 3 * 1024 * 1024;

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
];

const bookingTranslations = {
  el: {
    date: "ΕΠΙΛΟΓΗ ΗΜΕΡΟΜΗΝΙΑΣ (ΠΡΟΑΙΡΕΤΙΚΟ)",
    time: "ΔΙΑΘΕΣΙΜΕΣ ΩΡΕΣ",
    selectDate: "Επιλέξτε πρώτα μια ημερομηνία.",
    loading: "Έλεγχος διαθεσιμότητας...",
    noSlots: "Δεν υπάρχουν διαθέσιμες ώρες για αυτή την ημερομηνία.",
    duration: "Διάρκεια ραντεβού: 45 λεπτά",
    weekdays: "Δευτέρα – Παρασκευή",
    optional:
      "Αν θέλετε να κλείσετε και ραντεβού, επιλέξτε ημερομηνία και ώρα. Διαφορετικά, απλώς στείλτε το μήνυμά σας.",
    successTitle: "Το αίτημά σας καταχωρήθηκε!",
    successWithAppointment:
      "Το ραντεβού και το μήνυμά σας καταχωρήθηκαν. Θα λάβετε email επιβεβαίωσης σύντομα.",
    successWithoutAppointment:
      "Το μήνυμά σας καταχωρήθηκε. Θα επικοινωνήσουμε μαζί σας σύντομα.",
  },
  en: {
    date: "SELECT DATE (OPTIONAL)",
    time: "AVAILABLE TIMES",
    selectDate: "Please select a date first.",
    loading: "Checking availability...",
    noSlots: "There are no available times for this date.",
    duration: "Appointment duration: 45 minutes",
    weekdays: "Monday – Friday",
    optional:
      "If you want to book an appointment too, select a date and time. Otherwise, just send your message.",
    successTitle: "Your request has been submitted!",
    successWithAppointment:
      "Your appointment and message have been submitted. You will receive a confirmation email soon.",
    successWithoutAppointment:
      "Your message has been submitted. We will contact you soon.",
  },
};

export default function ContactSection() {
  const { language } = useLanguage();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const currentLanguage = mounted && language === "en" ? "en" : "el";
  const t = translations[currentLanguage].contact;
  const bt = bookingTranslations[currentLanguage];

  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [sentWithAppointment, setSentWithAppointment] = useState(false);

  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState("");

  const [todayAthens, setTodayAthens] = useState("");

  useEffect(() => {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Athens",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());
    const v = Object.fromEntries(parts.map((p) => [p.type, p.value]));
    setTodayAthens(`${v.year}-${v.month}-${v.day}`);
  }, []);

  const fileInputRef = useRef(null);

  // Reveal animations
  useEffect(() => {
    const elements = document.querySelectorAll(".contact-reveal");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Load availability όταν αλλάζει η ημερομηνία
  useEffect(() => {
    if (!form.date) {
      setAvailableSlots([]);
      setForm((prev) => ({ ...prev, time: "" }));
      return;
    }

    let cancelled = false;
    const controller = new AbortController();

    async function loadSlots() {
      setLoadingSlots(true);
      setSlotsError("");
      setForm((prev) => ({ ...prev, time: "" }));
      setAvailableSlots([]);

      try {
        const response = await fetch(
          `/api/availability?date=${encodeURIComponent(form.date)}`,
          { cache: "no-store", signal: controller.signal }
        );
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Σφάλμα διαθεσιμότητας.");
        }

        if (!cancelled) setAvailableSlots(result.availableSlots || []);
      } catch (error) {
        if (error.name === "AbortError") return;
        if (!cancelled) setSlotsError(error.message);
      } finally {
        if (!cancelled) setLoadingSlots(false);
      }
    }

    loadSlots();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [form.date]);

  function updateField(name, value) {
    setSent(false);
    setSubmitError("");
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleFiles(event) {
    const selected = Array.from(event.target.files || []);
    setSent(false);
    setSubmitError("");

    if (selected.length > MAX_FILES) {
      setSubmitError(t.fileLimit);
      event.target.value = "";
      setFiles([]);
      return;
    }

    for (const file of selected) {
      if (!allowedTypes.includes(file.type)) {
        setSubmitError(t.fileTypes);
        event.target.value = "";
        setFiles([]);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setSubmitError(t.fileSize(file.name));
        event.target.value = "";
        setFiles([]);
        return;
      }
    }

    const totalSize = selected.reduce((total, file) => total + file.size, 0);
    if (totalSize > MAX_TOTAL_SIZE) {
      setSubmitError(t.totalSize);
      event.target.value = "";
      setFiles([]);
      return;
    }

    setFiles(selected);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setSent(false);
    setSubmitError("");

    try {
      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });

      files.forEach((file) => {
        data.append("files", file);
      });

      data.append("website", "");

      const response = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || result.message || t.requestError);
      }

      setSentWithAppointment(Boolean(result.appointmentCreated));
      setSent(true);
      setForm(initialForm);
      setFiles([]);

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setSubmitError(error.message || t.generalError);
    } finally {
      setSubmitting(false);
    }
  }

  const labelClass =
    "mb-3 block text-[11px] font-semibold tracking-[0.2em] text-[#938a7d]";
  const inputClass =
    "w-full min-w-0 border-b border-[#ded8cd] bg-transparent py-3.5 text-[15px] font-medium text-[#28231e] outline-none transition-colors placeholder:text-[#aaa398] focus:border-[#a89576]";

  return (
    <section
      id="contact"
      className="contact-section relative w-full overflow-hidden bg-[#f7f4ed] px-5 py-24 text-[#28231e] sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-[1300px]">
        <div className="contact-reveal mb-16 flex flex-col gap-3 border-b border-[#ded8cd] pb-5 sm:mb-24 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[11px] font-semibold tracking-[0.22em] text-[#a89576]">
            {t.introLabel}
          </span>
          <span className="text-[11px] font-semibold tracking-[0.16em] text-[#938a7d]">
            {t.introTagline}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          {/* LEFT SIDE */}
          <div className="flex flex-col justify-between">
            <div className="contact-reveal">
              <h2 className="contact-main-title max-w-[650px] font-serif text-[clamp(3.5rem,8vw,7rem)] font-medium leading-[0.9] tracking-[-0.075em]">
                {t.titleFirst}
                <br />
                {t.titleSecond}
                <br />
                <span className="italic text-[#a89576]">{t.titleThird}</span>
              </h2>

              <p className="mt-10 max-w-[390px] text-[15px] font-medium leading-8 text-[#777168]">
                {t.description}
              </p>
            </div>

            <div className="contact-info mt-16 grid grid-cols-1 gap-9 border-t border-[#ded8cd] pt-8 sm:grid-cols-2 lg:mt-24">
              <div className="contact-reveal" style={{ "--delay": "100ms" }}>
                <span className={labelClass}>EMAIL</span>
                <a
                  href="mailto:diseto@diseto.gr"
                  className="group inline-flex items-center gap-2 text-[15px] font-medium transition-colors hover:text-[#a89576]"
                >
                  diseto@diseto.gr
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>
              </div>

              <div className="contact-reveal" style={{ "--delay": "220ms" }}>
                <span className={labelClass}>{t.phone}</span>
                <a
                  href="tel:+302741038181"
                  className="group inline-flex items-center gap-2 text-[15px] font-medium transition-colors hover:text-[#a89576]"
                >
                  27410.38181
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — ΕΝΙΑΙΑ ΦΟΡΜΑ */}
          <div
            id="contact-form"
            className="contact-form-panel contact-reveal bg-[#f0ece3] p-6 sm:p-10 lg:p-12"
            style={{ "--delay": "180ms" }}
          >
            <div className="mb-8">
              <h3 className="font-serif text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                {t.formTitle}
              </h3>
              <p className="mt-3 text-[14px] font-medium leading-6 text-[#777168]">
                {t.formDescription}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Honeypot */}
              <div
                aria-hidden="true"
                className="absolute -left-[9999px] h-px w-px overflow-hidden"
              >
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Στοιχεία επικοινωνίας */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="contact-field">
                  <label className={labelClass} htmlFor="name">
                    {t.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    maxLength={120}
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder={t.namePlaceholder}
                    className={inputClass}
                  />
                </div>

                <div className="contact-field">
                  <label className={labelClass} htmlFor="phone">
                    {t.phone} *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    required
                    type="tel"
                    maxLength={40}
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder={t.phonePlaceholder}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="contact-field">
                <label className={labelClass} htmlFor="email">
                  {t.email}
                </label>
                <input
                  id="email"
                  name="email"
                  required
                  type="email"
                  maxLength={254}
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="example@email.com"
                  className={inputClass}
                />
              </div>

              <div className="contact-field">
                <label className={labelClass} htmlFor="clientType">
                  {t.clientType}
                </label>
                <select
                  id="clientType"
                  name="clientType"
                  value={form.clientType}
                  onChange={(e) => updateField("clientType", e.target.value)}
                  className={`${inputClass} cursor-pointer`}
                >
                  {clientTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type[currentLanguage] || type.el}
                    </option>
                  ))}
                </select>
              </div>

              <div className="contact-field">
                <label className={labelClass} htmlFor="project">
                  {t.project}
                </label>
                <select
                  id="project"
                  name="project"
                  value={form.project}
                  onChange={(e) => updateField("project", e.target.value)}
                  className={`${inputClass} cursor-pointer`}
                >
                  {projects.map((project) => (
                    <option key={project.value} value={project.value}>
                      {project[currentLanguage] || project.el}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="contact-field">
                  <label className={labelClass} htmlFor="area">
                    {t.area}
                  </label>
                  <input
                    id="area"
                    name="area"
                    maxLength={150}
                    autoComplete="address-level2"
                    value={form.area}
                    onChange={(e) => updateField("area", e.target.value)}
                    placeholder={t.areaPlaceholder}
                    className={inputClass}
                  />
                </div>

                <div className="contact-field">
                  <label className={labelClass} htmlFor="budget">
                    {t.budget}
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={(e) => updateField("budget", e.target.value)}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="">{t.select}</option>
                    {budgets.map((budget) => (
                      <option key={budget.value} value={budget.value}>
                        {budget[currentLanguage] || budget.el}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="contact-field">
                <label className={labelClass} htmlFor="message">
                  {t.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={5000}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  rows={4}
                  placeholder={t.messagePlaceholder}
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* ============ ΡΑΝΤΕΒΟΥ (ΠΡΟΑΙΡΕΤΙΚΟ) ============ */}
              <div className="border-t border-[#ded8cd] pt-8">
                <p className="mb-6 text-[12px] font-medium leading-5 text-[#938a7d]">
                  {bt.optional}
                </p>

                <div>
                  <label className={labelClass} htmlFor="date">
                    {bt.date}
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={todayAthens || undefined}
                    disabled={!todayAthens}
                    value={form.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    className={`${inputClass} cursor-pointer disabled:opacity-50`}
                  />
                </div>

                {form.date && (
                  <div className="mt-6">
                    <label className={labelClass}>{bt.time}</label>

                    {loadingSlots && (
                      <p className="text-[13px] text-[#938a7d]">
                        {bt.loading}
                      </p>
                    )}

                    {!loadingSlots &&
                      availableSlots.length === 0 &&
                      !slotsError && (
                        <p className="text-[13px] text-[#938a7d]">
                          {bt.noSlots}
                        </p>
                      )}

                    {slotsError && (
                      <p className="text-[13px] text-red-700">{slotsError}</p>
                    )}

                    {!loadingSlots && availableSlots.length > 0 && (
                      <div
                        role="group"
                        aria-label={bt.time}
                        className="grid grid-cols-3 gap-2 sm:grid-cols-4"
                      >
                        {availableSlots.map((slot) => {
                          const selected = form.time === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => updateField("time", slot)}
                              aria-pressed={selected}
                              className={`border px-3 py-3 text-[13px] font-medium transition-colors ${
                                selected
                                  ? "border-[#28231e] bg-[#28231e] text-[#f7f4ed]"
                                  : "border-[#ded8cd] bg-transparent text-[#28231e] hover:border-[#a89576]"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-medium tracking-wide text-[#938a7d]">
                      <span>{bt.duration}</span>
                      <span>{bt.weekdays}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* ============ ΑΡΧΕΙΑ ============ */}
              <div className="contact-field">
                <label className={labelClass} htmlFor="files">
                  {t.files}
                </label>
                <input
                  id="files"
                  name="files"
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
                  onChange={handleFiles}
                  ref={fileInputRef}
                  className="block w-full text-[13px] text-[#777168] file:mr-4 file:border file:border-[#d9d1c5] file:bg-transparent file:px-4 file:py-3 file:text-[12px] file:font-semibold file:tracking-wider file:text-[#28231e] hover:file:border-[#a89576]"
                />

                {files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-[13px] font-medium text-[#777168]">
                      {t.fileCount(files.length)}
                    </p>
                    {files.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="flex items-center justify-between gap-3 text-[12px] text-[#938a7d]"
                      >
                        <span className="min-w-0 truncate">{file.name}</span>
                        <span className="shrink-0">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <p className="mt-2 text-[12px] font-medium leading-5 text-[#938a7d]">
                  {t.fileInfo}
                </p>
              </div>

              {/* ============ ΕΝΑ ΚΟΥΜΠΙ ============ */}
              <button
                type="submit"
                disabled={submitting}
                className="contact-submit group flex w-full items-center justify-between bg-[#28231e] px-6 py-5 text-[12px] font-semibold tracking-[0.17em] text-[#f7f4ed] transition-colors duration-300 hover:bg-[#a89576] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>{submitting ? t.sending : t.submit}</span>
                <MoveUpRight
                  size={18}
                  strokeWidth={1.3}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>

              {sent && (
                <div
                  role="status"
                  aria-live="polite"
                  className="border-l-2 border-[#a89576] pl-4 text-[13px] font-medium leading-7 text-[#8b7655]"
                >
                  <strong className="block font-semibold">
                    {bt.successTitle}
                  </strong>
                  {sentWithAppointment
                    ? bt.successWithAppointment
                    : bt.successWithoutAppointment}
                </div>
              )}

              {submitError && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="border-l-2 border-red-700 pl-4 text-[13px] font-medium leading-6 text-red-700"
                >
                  {submitError}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="contact-reveal mt-20 flex flex-col gap-3 border-t border-[#ded8cd] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[11px] font-semibold tracking-[0.16em] text-[#a89576]">
            {t.footerLabel}
          </span>
          <span className="text-[11px] font-semibold tracking-[0.16em] text-[#938a7d]">
            {t.footerTagline}
          </span>
        </div>
      </div>

      <style jsx>{`
        .contact-reveal {
          opacity: 0;
          transform: translate3d(0, 45px, 0);
          transition:
            opacity 0.95s cubic-bezier(0.2, 0.7, 0.2, 1),
            transform 1.05s cubic-bezier(0.2, 0.7, 0.2, 1);
          transition-delay: var(--delay, 0ms);
          will-change: opacity, transform;
        }
        .contact-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
        .contact-main-title {
          animation: contactTitleIn 1.2s cubic-bezier(0.2, 0.7, 0.2, 1) both;
        }
        @keyframes contactTitleIn {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .contact-form-panel {
          transition:
            background 0.5s ease,
            box-shadow 0.5s ease;
        }
        .contact-form-panel.is-visible {
          box-shadow: 0 15px 55px rgba(40, 35, 30, 0.035);
        }
        .contact-section input,
        .contact-section select,
        .contact-section textarea {
          transition:
            border-color 0.3s ease,
            background 0.3s ease;
        }
        .contact-section input:focus,
        .contact-section select:focus,
        .contact-section textarea:focus {
          border-color: #a89576;
        }
        .contact-submit {
          position: relative;
          overflow: hidden;
        }
        .contact-submit span,
        .contact-submit svg {
          position: relative;
          z-index: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .contact-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .contact-main-title {
            animation: none;
          }
          .contact-section * {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}