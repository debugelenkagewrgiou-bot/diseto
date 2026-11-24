
"use client";

import Link from "next/link";
import { useLanguage } from "@/components/languagecontext";

const content = {
  el: {
    ariaHome: "Αρχική σελίδα DiSeto",
    description:
      "Σχεδιάζουμε και δημιουργούμε ξύλινες κατασκευές, έπιπλα και χώρους με διαχρονική αισθητική και έμφαση στην ποιότητα.",
    since: "DISETO — ΑΠΟ ΤΟ 1982",
    facebook: "DiSeto στο Facebook",
    navigation: "ΠΛΟΗΓΗΣΗ",
    home: "Αρχική",
    projects: "Τα έργα μας",
    lookbook: "Lookbook",
    services: "Οι υπηρεσίες μας",
    contact: "Επικοινωνία",
    locations: "ΠΟΥ ΘΑ ΜΑΣ ΒΡΕΙΤΕ",
    factory: "Εργοστάσιο",
    corinth: "Κόρινθος",
    factoryDescription: "Παραγωγή και κατασκευή ξύλινων δημιουργιών.",
    showroom: "Εκθεσιακός χώρος",
    athens: "Αιγάλεω, Αθήνα",
    showroomDescription: "Επισκεφθείτε μας και γνωρίστε τις δημιουργίες μας.",
    openingHours: "Ωράριο λειτουργίας",
    open: "Ανοικτά:",
    weekdays: "Δευτέρα – Παρασκευή",
    communication: "ΕΠΙΚΟΙΝΩΝΙΑ",
    requestQuote: "ΖΗΤΗΣΤΕ ΠΡΟΣΦΟΡΑ",
    copyright: "© 2026 DiSeto. Με επιφύλαξη παντός δικαιώματος.",
    slogan: "ΣΧΕΔΙΑΣΜΟΣ · ΠΟΙΟΤΗΤΑ · ΔΙΑΧΡΟΝΙΚΟΤΗΤΑ",
  },
  en: {
    ariaHome: "DiSeto Homepage",
    description:
      "We design and create wooden constructions, furniture and spaces with timeless aesthetics and a strong focus on quality.",
    since: "DISETO — SINCE 1982",
    facebook: "DiSeto on Facebook",
    navigation: "NAVIGATION",
    home: "Home",
    projects: "Our Projects",
    lookbook: "Lookbook",
    services: "Our Services",
    contact: "Contact",
    locations: "FIND US",
    factory: "Factory",
    corinth: "Corinth",
    factoryDescription: "Production and craftsmanship of bespoke wooden creations.",
    showroom: "Showroom",
    athens: "Aigaleo, Athens",
    showroomDescription: "Visit us and discover our creations.",
    openingHours: "Opening Hours",
    open: "Open:",
    weekdays: "Monday – Friday",
    communication: "CONTACT",
    requestQuote: "REQUEST A QUOTE",
    copyright: "© 2026 DiSeto. All rights reserved.",
    slogan: "DESIGN · QUALITY · TIMELESSNESS",
  },
};

export default function Footer() {
  const { language } = useLanguage();
  const t = content[language] || content.el;

  return (
    <footer className="border-t border-white/10 bg-[#351019] text-[#f7f4ed]">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12">

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* LOGO & BRAND */}
          <div>
            <Link href="/" aria-label={t.ariaHome}>
              <img
                src="/images/logo.jpg"
                alt="DiSeto"
                width="90"
                height="42"
                className="h-auto w-[90px] max-h-[42px] object-contain"
              />
            </Link>

            <p className="mt-5 max-w-[240px] text-base font-medium leading-7 text-[#d1c1bd]">
              {t.description}
            </p>

            <p className="mt-5 text-xs font-semibold tracking-[0.16em] text-[#c5a47d]">
              {t.since}
            </p>

            {/* FACEBOOK */}
            <a
              href="https://www.facebook.com/disetokouzina/?locale=el_GR"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.facebook}
              className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#c5a47d]/40 text-[#c5a47d] transition-all duration-300 hover:border-[#c5a47d] hover:bg-[#c5a47d] hover:text-[#351019]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.6-4.3 4.4v2.2H7v3.2h2.9V21h3.6Z" />
              </svg>
            </a>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="mb-6 text-xs font-semibold tracking-[0.18em] text-[#c5a47d]">
              {t.navigation}
            </h3>

            <ul className="space-y-4 text-base font-medium text-[#d1c1bd]">
              <li><Link href="/" className="transition-colors duration-300 hover:text-white">{t.home}</Link></li>
              <li><Link href="/#projects" className="transition-colors duration-300 hover:text-white">{t.projects}</Link></li>
              <li><Link href="/lookbook" className="transition-colors duration-300 hover:text-white">{t.lookbook}</Link></li>
              <li><Link href="/#what-we-do" className="transition-colors duration-300 hover:text-white">{t.services}</Link></li>
              <li><Link href="/#contact" className="transition-colors duration-300 hover:text-white">{t.contact}</Link></li>
            </ul>
          </div>

          {/* LOCATIONS */}
          <div>
            <h3 className="mb-6 text-xs font-semibold tracking-[0.18em] text-[#c5a47d]">
              {t.locations}
            </h3>

            <div className="space-y-7 text-base">
              <div>
                <p className="mb-2 font-semibold text-[#f7f4ed]">{t.factory}</p>
                <p className="font-medium leading-6 text-[#d1c1bd]">{t.corinth}</p>
                <p className="mt-1 text-sm leading-6 text-[#b9a5a5]">
                  {t.factoryDescription}
                </p>
              </div>

              <div>
                <p className="mb-2 font-semibold text-[#f7f4ed]">{t.showroom}</p>
                <p className="font-medium leading-6 text-[#d1c1bd]">{t.athens}</p>
                <p className="mt-1 text-sm leading-6 text-[#b9a5a5]">
                  {t.showroomDescription}
                </p>
              </div>

              <div className="border-t border-white/10 pt-5">
                <p className="mb-2 font-semibold text-[#f7f4ed]">{t.openingHours}</p>
                <p className="text-base font-medium leading-7 text-[#d1c1bd]">
                  <span className="font-semibold text-[#c5a47d]">{t.open}</span>
                  <br />
                  {t.weekdays}
                  <br />
                  08:00 – 18:00
                </p>
              </div>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="mb-6 text-xs font-semibold tracking-[0.18em] text-[#c5a47d]">
              {t.communication}
            </h3>

            <ul className="space-y-4 text-base font-medium text-[#d1c1bd]">
              <li>
                <a href="tel:+306987452135" className="transition-colors duration-300 hover:text-white">
                  698 745 2135
                </a>
              </li>

              <li>
                <a href="mailto:diseto@diseto.gr" className="transition-colors duration-300 hover:text-white">
                  diseto@diseto.gr
                </a>
              </li>

              <li className="pt-3">
                <Link
                  href="/#contact"
                  className="group inline-flex items-center border-b border-[#c5a47d] pb-2 text-xs font-semibold tracking-[0.15em] text-[#f7f4ed] transition-colors duration-300 hover:text-[#c5a47d]"
                >
                  {t.requestQuote}
                  <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-center text-xs font-medium tracking-[0.08em] text-[#b9a5a5] md:flex-row md:text-left">
          <p>{t.copyright}</p>

          <p className="font-semibold text-[#c5a47d]">
            {t.slogan}
          </p>
        </div>

      </div>
    </footer>
  );
}
