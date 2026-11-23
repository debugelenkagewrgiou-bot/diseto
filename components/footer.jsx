
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#28231e]/10 bg-[#f7f4ed] text-[#28231e]">
      <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-12">

        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">

          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" aria-label="DiSeto homepage">
              <img
                src="/images/logo.jpg"
                alt="DiSeto"
                className="h-auto w-[90px] max-h-[42px] object-contain"
              />
            </Link>
            <p className="mt-5 max-w-[220px] text-sm leading-7 text-[#777168]">
              Thoughtful design. Timeless living.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-5 text-[10px] tracking-[0.18em] text-[#a89576]">
              EXPLORE
            </h3>
            <ul className="space-y-3 text-sm text-[#777168]">
              <li>
                <Link href="/" className="hover:text-[#28231e]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="hover:text-[#28231e]">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/#what-we-do" className="hover:text-[#28231e]">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#28231e]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-[10px] tracking-[0.18em] text-[#a89576]">
              COMPANY
            </h3>
            <ul className="space-y-3 text-sm text-[#777168]">
              <li>
                <Link href="/about" className="hover:text-[#28231e]">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/factory" className="hover:text-[#28231e]">
                  Our factory
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-[10px] tracking-[0.18em] text-[#a89576]">
              GET IN TOUCH
            </h3>
            <ul className="space-y-3 text-sm text-[#777168]">
              <li>
                <a
                  href="mailto:diseto@diseto.gr"
                  className="hover:text-[#28231e]"
                >
                  diseto@diseto.gr
                </a>
              </li>
              <li>
                <a
                  href="tel:+306987452135"
                  className="hover:text-[#28231e]"
                >
                  698 745 2135
                </a>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#28231e]">
                  Contact form
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#ded8cd] pt-5 text-center text-[10px] tracking-[0.08em] text-[#777168] md:flex-row md:text-left">
          <p>© 2026 DiSeto. All rights reserved.</p>
          <p>Designed with intention.</p>
        </div>

      </div>
    </footer>
  );
}
