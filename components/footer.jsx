
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#28231e]/10 bg-[#f7f4ed] text-[#28231e]">
      <div className="mx-auto max-w-[1400px] px-6 py-8 md:px-12">

        {/* Logo */}
        <div className="flex items-center justify-center md:justify-start">
          <Link href="/" aria-label="DiSeto homepage">
            <img
              src="/images/logo.jpg"
              alt="DiSeto"
              className="h-auto w-[90px] max-h-[42px] object-contain"
            />
          </Link>
        </div>

        {/* Bottom */}
        <div className="mt-7 flex flex-col items-center justify-between gap-3 border-t border-[#ded8cd] pt-5 text-center text-[10px] tracking-[0.08em] text-[#777168] md:flex-row md:text-left">
          <p>© 2026 DiSeto. All rights reserved.</p>
          <p>Designed with intention.</p>
        </div>

      </div>
    </footer>
  );
}
