
"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/components/languagecontext";

const ease = [0.22, 1, 0.36, 1];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [pendingHash, setPendingHash] = useState(null);

  const reduceMotion = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();

  const { language, setLanguage } = useLanguage();

  const links = [
    {
      label: language === "el" ? "ΑΡΧΙΚΗ" : "HOME",
      href: "/#home",
    },
    {
      label: language === "el" ? "ΠΟΙΟΙ ΕΙΜΑΣΤΕ" : "ABOUT US",
      href: "/#what-we-do",
    },
    {
      label: "PROJECTS",
      href: "/#projects",
    },
    
    {
      label: "LOOKBOOK",
      href: "/lookbook",
    },
    {
      label: language === "el" ? "ΕΠΙΚΟΙΝΩΝΙΑ" : "CONTACT",
      href: "/#contact",
    },
  ];

  // Scroll after returning to the homepage from another page
  useEffect(() => {
    if (pathname !== "/" || !pendingHash) return;

    const frame = requestAnimationFrame(() => {
      if (pendingHash === "home") {
        window.scrollTo({
          top: 0,
          behavior: reduceMotion ? "auto" : "smooth",
        });
      } else {
        const target = document.getElementById(pendingHash);

        if (target) {
          target.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "start",
          });
        }
      }

      setPendingHash(null);
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, pendingHash, reduceMotion]);

  const navigateTo = (event, href) => {
    event.preventDefault();
    setOpen(false);

    if (href === "/lookbook") {
      if (pathname !== "/lookbook") {
        router.push("/lookbook");
      }
      return;
    }

    const hash = href.split("#")[1];

    if (pathname !== "/") {
      setPendingHash(hash || "home");
      router.push("/");
      return;
    }

    if (!hash || hash === "home") {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth",
      });
      return;
    }

    const target = document.getElementById(hash);

    if (target) {
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  const closeMenu = () => setOpen(false);

  const LanguageSwitcher = () => (
    <div className="language-switcher" aria-label="Select language">
      <button
        type="button"
        onClick={() => setLanguage("el")}
        className={language === "el" ? "language-active" : ""}
        aria-pressed={language === "el"}
      >
        EL
      </button>

      <span>|</span>

      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={language === "en" ? "language-active" : ""}
        aria-pressed={language === "en"}
      >
        EN
      </button>
    </div>
  );

  return (
    <>
      <header className="site-header">
        {/* LOGO */}
        <a
          href="/#home"
          className="site-logo"
          onClick={(e) => navigateTo(e, "/#home")}
          aria-label="DiSeto Home"
        >
          <img
            src="/images/logo.jpg"
            alt="DiSeto"
            width="90"
            height="42"
            fetchPriority="high"
            style={{
              display: "block",
              width: "90px",
              height: "42px",
              objectFit: "contain",
              objectPosition: "left center",
            }}
          />
        </a>

        {/* DESKTOP NAVIGATION */}
        <div className="desktop-nav-wrap">
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => navigateTo(e, link.href)}
                className={
                  pathname === "/lookbook" && link.href === "/lookbook"
                    ? "nav-active"
                    : ""
                }
                aria-current={
                  pathname === "/lookbook" && link.href === "/lookbook"
                    ? "page"
                    : undefined
                }
              >
                {link.label}
              </a>
            ))}
          </nav>

          <LanguageSwitcher />
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? (
            <X size={24} strokeWidth={1.3} />
          ) : (
            <Menu size={24} strokeWidth={1.3} />
          )}
        </button>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
            }}
          >
            <div className="mobile-menu-header">
              <a
                href="/#home"
                onClick={(e) => navigateTo(e, "/#home")}
                className="mobile-menu-logo"
                aria-label="DiSeto Home"
              >
                <img
                  src="/images/logo.jpg"
                  alt="DiSeto"
                  width="90"
                  height="42"
                  style={{
                    display: "block",
                    width: "90px",
                    height: "42px",
                    objectFit: "contain",
                    objectPosition: "left center",
                  }}
                />
              </a>

              <button
                className="mobile-close"
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X size={24} strokeWidth={1.3} />
              </button>
            </div>

            <div className="mobile-menu-content">
              <span className="mobile-menu-label">
                DISETO — INTERIOR DESIGN
              </span>

              <nav
                className="mobile-menu-links"
                aria-label="Mobile navigation"
              >
                {links.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className={`mobile-menu-link ${
                      pathname === "/lookbook" &&
                      link.href === "/lookbook"
                        ? "nav-active"
                        : ""
                    }`}
                    onClick={(e) => navigateTo(e, link.href)}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.4,
                      delay: reduceMotion ? 0 : index * 0.08,
                      ease,
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="mobile-menu-bottom">
              <span>DESIGNED WITH PURPOSE.</span>
              <LanguageSwitcher />
              <span>© DISETO</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </>
  );
}
