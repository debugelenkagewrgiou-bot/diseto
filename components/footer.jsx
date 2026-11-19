
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" text-[#28231e] border-t border-[#28231e]/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <Link
            href="/"
            className="text-xl tracking-[0.18em] font-medium"
          >
            DiSeto<span className="text-[#a89576]">.</span>
          </Link>

          

          
        </div>

        {/* Bottom */}
        <div className="mt-7 pt-5 border-t border-[#28231e]/10 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] tracking-[0.08em] text-[#28231e]/45">
          <p>© 2026 DiSeto. All rights reserved.</p>
          <p>Designed with intention.</p>
        </div>

      </div>
    </footer>
  );
}
