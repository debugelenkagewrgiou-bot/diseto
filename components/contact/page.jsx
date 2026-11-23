
"use client";

import { useState } from "react";
import { ArrowUpRight, MoveUpRight} from "lucide-react";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  project: "Κουζίνα",
  budget: "",
  area: "",
  message: "",
};

const projects = ["Κουζίνα", "Ντουλάπα", "Πόρτες"];

const budgets = [
  "Έως 3.000€",
  "3.000€ – 6.000€",
  "6.000€ – 10.000€",
  "10.000€+",
  "Δεν γνωρίζω ακόμη",
];

export default function ContactSection() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);

  function updateField(name, value) {
    setSent(false);
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Αίτημα για ${form.project} — ${form.name}`
    );

    const body = encodeURIComponent(
      `Ονοματεπώνυμο: ${form.name}
Τηλέφωνο: ${form.phone}
Email: ${form.email}
Χώρος: ${form.project}
Περιοχή: ${form.area || "—"}
Budget: ${form.budget || "—"}

Ιδέα / σημειώσεις:
${form.message || "—"}`
    );

    window.location.href = `mailto:diseto@diseto.gr?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const labelClass =
    "mb-3 block text-[9px] font-medium tracking-[0.2em] text-[#938a7d]";

  const inputClass =
    "w-full min-w-0 border-b border-[#ded8cd] bg-transparent py-3.5 text-[13px] text-[#28231e] outline-none transition-colors placeholder:text-[#aaa398] focus:border-[#a89576]";

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#f7f4ed] px-5 py-24 text-[#28231e] sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-[1300px]">

        {/* SECTION INTRO */}
        <div className="mb-16 flex items-center justify-between border-b border-[#ded8cd] pb-5 sm:mb-24">
          <span className="text-[9px] tracking-[0.22em] text-[#a89576]">
            DISETO / GET IN TOUCH
          </span>

          <span className="text-[9px] tracking-[0.16em] text-[#938a7d]">
            LETS CREATE SOMETHING
          </span>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">

          {/* LEFT SIDE */}
          <div className="flex flex-col justify-between">
            <div>
              
              <h2 className="max-w-[650px] font-serif text-[clamp(4rem,9vw,8rem)] leading-[0.82] tracking-[-0.075em]">
                Let&apos;s
                <br />
                make it
                <br />
                <span className="italic text-[#a89576]">personal.</span>
              </h2>

              <p className="mt-10 max-w-[390px] text-[13px] leading-8 text-[#777168]">
                Κάθε χώρος έχει τη δική του ιστορία.
                Πείτε μας τη δική σας και ας σχεδιάσουμε μαζί
                κάτι που αντανακλά πραγματικά εσάς.
              </p>
            </div>

            {/* CONTACT DETAILS */}
            <div className="mt-16 grid grid-cols-1 gap-9 border-t border-[#ded8cd] pt-8 sm:grid-cols-2 lg:mt-24">
              <div>
                <span className={labelClass}>EMAIL</span>
                <a
                  href="mailto:diseto@diseto.gr"
                  className="group inline-flex items-center gap-2 text-[13px] transition-colors hover:text-[#a89576]"
                >
                  diseto@diseto.gr
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>
              </div>

              <div>
                <span className={labelClass}>ΤΗΛΕΦΩΝΟ</span>
                <a
                  href="tel:6987452135"
                  className="group inline-flex items-center gap-2 text-[13px] transition-colors hover:text-[#a89576]"
                >
                  698 745 2135
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>
          </div>
         

          {/* RIGHT SIDE / FORM */}
          <div className="bg-[#f0ece3] p-6 sm:p-10 lg:p-12">
            <div className="mb-12 flex items-start justify-between gap-4">
              <div>
                

                <h3 className="font-serif text-3xl tracking-[-0.04em] sm:text-4xl">
                  Tell us about it.
                </h3>

                <p className="mt-3 text-[12px] leading-6 text-[#777168]">
                  Συμπληρώστε τα στοιχεία σας και θα επικοινωνήσουμε μαζί σας.
                </p>
              </div>

              <span className="hidden text-[11px] tracking-widest text-[#a89576] sm:block">
                DISETO.
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-9">

              {/* NAME + PHONE */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="name">
                    ΟΝΟΜΑΤΕΠΩΝΥΜΟ *
                  </label>
                  <input
                    id="name"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Το όνομά σας"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="phone">
                    ΤΗΛΕΦΩΝΟ *
                  </label>
                  <input
                    id="phone"
                    required
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+30"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className={labelClass} htmlFor="email">
                  EMAIL *
                </label>
                <input
                  id="email"
                  required
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="example@email.com"
                  className={inputClass}
                />
              </div>

              {/* PROJECT TYPE */}
              <fieldset>
                <legend className={labelClass}>
                  ΓΙΑ ΠΟΙΟΝ ΧΩΡΟ ΕΝΔΙΑΦΕΡΕΣΤΕ;
                </legend>

                <div className="flex flex-wrap gap-2">
                  {projects.map((project) => (
                    <button
                      key={project}
                      type="button"
                      aria-pressed={form.project === project}
                      onClick={() => updateField("project", project)}
                      className={`border px-5 py-3 text-[11px] transition-all duration-300 ${
                        form.project === project
                          ? "border-[#28231e] bg-[#28231e] text-[#f7f4ed]"
                          : "border-[#d9d1c5] bg-transparent text-[#777168] hover:border-[#a89576] hover:text-[#28231e]"
                      }`}
                    >
                      {project}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* AREA + BUDGET */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="area">
                    ΠΕΡΙΟΧΗ ΕΡΓΟΥ
                  </label>
                  <input
                    id="area"
                    autoComplete="address-level2"
                    value={form.area}
                    onChange={(e) => updateField("area", e.target.value)}
                    placeholder="Π.χ. Αθήνα"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="budget">
                    ΕΝΔΕΙΚΤΙΚΟ BUDGET
                  </label>
                  <select
                    id="budget"
                    value={form.budget}
                    onChange={(e) => updateField("budget", e.target.value)}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="">Επιλέξτε budget</option>
                    {budgets.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <label className={labelClass} htmlFor="message">
                  ΠΕΡΙΓΡΑΨΤΕ ΜΑΣ ΤΗΝ ΙΔΕΑ ΣΑΣ
                </label>

                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  rows={3}
                  placeholder="Πείτε μας λίγα λόγια για το project σας..."
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="group flex w-full items-center justify-between bg-[#28231e] px-6 py-5 text-[10px] tracking-[0.17em] text-[#f7f4ed] transition-colors duration-300 hover:bg-[#a89576]"
              >
                <span>ΣΤΕΙΛΤΕ ΤΟ ΑΙΤΗΜΑ ΣΑΣ</span>

                <MoveUpRight
                  size={18}
                  strokeWidth={1.3}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>

              <p
                aria-live="polite"
                className={`text-[11px] leading-6 text-[#8b7655] transition-opacity ${
                  sent ? "opacity-100" : "opacity-0"
                }`}
              >
                Το αίτημά σας ετοιμάστηκε στο πρόγραμμα email σας.
                Πατήστε «Αποστολή» για να ολοκληρωθεί.
              </p>
            </form>
          </div>
        </div>

        
      </div>
    </section>
  );
}
