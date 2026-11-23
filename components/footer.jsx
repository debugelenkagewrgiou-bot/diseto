
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#351019] text-[#f7f4ed]">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12">

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* LOGO & BRAND */}
          <div>
            <Link href="/" aria-label="Αρχική σελίδα DiSeto">
              <img
                src="/images/logo.jpg"
                alt="DiSeto"
                width="90"
                height="42"
                className="h-auto w-[90px] max-h-[42px] object-contain"
              />
            </Link>

            <p className="mt-5 max-w-[240px] text-sm leading-7 text-[#d1c1bd]">
              Σχεδιάζουμε και δημιουργούμε ξύλινες κατασκευές,
              έπιπλα και χώρους με διαχρονική αισθητική
              και έμφαση στην ποιότητα.
            </p>

            <p className="mt-5 text-[10px] tracking-[0.16em] text-[#c5a47d]">
              DISETO — ΑΠΟ ΤΟ 1982
            </p>

            {/* FACEBOOK */}
            <a
              href="https://www.facebook.com/disetokouzina/?locale=el_GR"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DiSeto στο Facebook"
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

          {/* ΠΛΟΗΓΗΣΗ */}
          <div>
            <h3 className="mb-6 text-[10px] tracking-[0.18em] text-[#c5a47d]">
              ΠΛΟΗΓΗΣΗ
            </h3>

            <ul className="space-y-4 text-sm text-[#d1c1bd]">
              <li><Link href="/" className="transition-colors duration-300 hover:text-white">Αρχική</Link></li>
              <li><Link href="/#projects" className="transition-colors duration-300 hover:text-white">Τα έργα μας</Link></li>
              <li><Link href="/lookbook" className="transition-colors duration-300 hover:text-white">Lookbook</Link></li>
              <li><Link href="/#what-we-do" className="transition-colors duration-300 hover:text-white">Οι υπηρεσίες μας</Link></li>
              <li><Link href="/#contact" className="transition-colors duration-300 hover:text-white">Επικοινωνία</Link></li>
            </ul>
          </div>

          {/* ΕΓΚΑΤΑΣΤΑΣΕΙΣ */}
          <div>
            <h3 className="mb-6 text-[10px] tracking-[0.18em] text-[#c5a47d]">
              ΠΟΥ ΘΑ ΜΑΣ ΒΡΕΙΤΕ
            </h3>

            <div className="space-y-7 text-sm">
              <div>
                <p className="mb-2 text-[#f7f4ed]">Εργοστάσιο</p>
                <p className="leading-6 text-[#d1c1bd]">Κόρινθος</p>
                <p className="mt-1 text-xs leading-6 text-[#b9a5a5]">
                  Παραγωγή και κατασκευή ξύλινων δημιουργιών.
                </p>
              </div>

              <div>
                <p className="mb-2 text-[#f7f4ed]">Εκθεσιακός χώρος</p>
                <p className="leading-6 text-[#d1c1bd]">Αιγάλεω, Αθήνα</p>
                <p className="mt-1 text-xs leading-6 text-[#b9a5a5]">
                  Επισκεφθείτε μας και γνωρίστε τις δημιουργίες μας.
                </p>
              </div>

              <div className="border-t border-white/10 pt-5">
                <p className="mb-2 text-[#f7f4ed]">Ωράριο λειτουργίας</p>
                <p className="text-sm leading-7 text-[#d1c1bd]">
                  <span className="text-[#c5a47d]">Ανοικτά:</span>
                  <br />
                  Δευτέρα – Παρασκευή
                  <br />
                  08:00 – 18:00
                </p>
              </div>
            </div>
          </div>

          {/* ΕΠΙΚΟΙΝΩΝΙΑ */}
          <div>
            <h3 className="mb-6 text-[10px] tracking-[0.18em] text-[#c5a47d]">
              ΕΠΙΚΟΙΝΩΝΙΑ
            </h3>

            <ul className="space-y-4 text-sm text-[#d1c1bd]">
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
                  className="group inline-flex items-center border-b border-[#c5a47d] pb-2 text-[10px] tracking-[0.15em] text-[#f7f4ed] transition-colors duration-300 hover:text-[#c5a47d]"
                >
                  ΖΗΤΗΣΤΕ ΠΡΟΣΦΟΡΑ
                  <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ΚΑΤΩ ΜΕΡΟΣ */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-center text-[10px] tracking-[0.08em] text-[#b9a5a5] md:flex-row md:text-left">
          <p>© 2026 DiSeto. Με επιφύλαξη παντός δικαιώματος.</p>

          <p className="text-[#c5a47d]">
            ΣΧΕΔΙΑΣΜΟΣ · ΠΟΙΟΤΗΤΑ · ΔΙΑΧΡΟΝΙΚΟΤΗΤΑ
          </p>
        </div>

      </div>
    </footer>
  );
}
