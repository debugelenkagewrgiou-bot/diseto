
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

 
<style jsx global>{`
  .site-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 82px;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 6%;
    background: rgba(247, 244, 237, 0.97);
    border-bottom: 1px solid #ded8cd;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .site-logo {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 0 0 90px;
    width: 90px;
    height: 42px;
    overflow: hidden;
  }

  .site-logo img {
    display: block;
    flex: 0 0 90px;
    width: 90px !important;
    min-width: 90px;
    max-width: 90px;
    height: 42px !important;
    max-height: 42px;
    object-fit: contain;
    object-position: left center;
  }

  .desktop-nav-wrap {
    display: flex;
    align-items: center;
    gap: 30px;
  }

  .desktop-nav {
    display: flex;
    align-items: center;
    gap: 42px;
  }

  .desktop-nav a {
    position: relative;
    color: #28231e;
    font-family: Arial, sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.7px;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .desktop-nav a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -7px;
    width: 0;
    height: 1px;
    background: #a89576;
    transition: width 0.3s ease;
  }

  .desktop-nav a:hover,
  .desktop-nav a.nav-active {
    color: #a89576;
  }

  .desktop-nav a:hover::after,
  .desktop-nav a.nav-active::after {
    width: 100%;
  }

  .language-switcher {
    display: flex;
    align-items: center;
    gap: 9px;
    color: #a49b8e;
    font-family: Arial, sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    white-space: nowrap;
  }

  .language-switcher button {
    padding: 5px 0;
    border: none;
    background: transparent;
    color: #777168;
    font: inherit;
    letter-spacing: inherit;
    cursor: pointer;
    transition: color 0.25s ease;
  }

  .language-switcher button:hover,
  .language-switcher button.language-active {
    color: #a89576;
  }

  .menu-toggle {
    display: none;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 0;
    border: none;
    background: transparent;
    color: #28231e;
    cursor: pointer;
  }

  .mobile-menu {
    position: fixed;
    inset: 0;
    z-index: 100000;
    width: 100%;
    height: 100vh;
    height: 100dvh;
    overflow-y: auto;
    background: #f7f4ed;
    color: #28231e;
    display: flex;
    flex-direction: column;
    padding: 0 8% 30px;
  }

  .mobile-menu-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 72px;
    border-bottom: 1px solid #ded8cd;
  }

  .mobile-menu-logo {
    display: flex;
    align-items: center;
    width: 90px;
    height: 42px;
    overflow: hidden;
  }

  .mobile-menu-logo img {
    display: block;
    width: 90px !important;
    min-width: 90px;
    max-width: 90px;
    height: 42px !important;
    max-height: 42px;
    object-fit: contain;
    object-position: left center;
  }

  .mobile-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 0;
    border: none;
    background: transparent;
    color: #28231e;
    cursor: pointer;
  }

  .mobile-menu-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 35px 0;
  }

  .mobile-menu-label {
    margin-bottom: 28px;
    color: #777168;
    font-family: Arial, sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
  }

  .mobile-menu-links {
    width: 100%;
    border-top: 1px solid #ded8cd;
  }

  .mobile-menu-link {
    display: block;
    padding: 23px 0;
    border-bottom: 1px solid #ded8cd;
    color: #28231e !important;
    font-family: Georgia, serif;
    font-size: clamp(42px, 11vw, 58px);
    font-weight: 500;
    letter-spacing: -2px;
    line-height: 1.1;
    text-decoration: none;
    opacity: 1;
    transition:
      color 0.25s ease,
      padding-left 0.25s ease;
  }

  .mobile-menu-link:hover,
  .mobile-menu-link:active,
  .mobile-menu-link.nav-active {
    color: #a89576 !important;
    padding-left: 7px;
  }

  .mobile-menu-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding-top: 20px;
    border-top: 1px solid #ded8cd;
    color: #777168;
    font-family: Arial, sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 1.3px;
  }

  @media (max-width: 768px) {
    .site-header {
      height: 72px;
      padding: 0 6%;
    }

    .desktop-nav-wrap {
      display: none;
    }

    .menu-toggle {
      display: flex;
    }
  }

  @media (min-width: 769px) {
    .mobile-menu {
      display: none;
    }
  }

  @media (max-height: 600px) and (max-width: 768px) {
    .mobile-menu-content {
      padding: 20px 0;
    }

    .mobile-menu-link {
      padding: 15px 0;
      font-size: 38px;
    }

    .mobile-menu-bottom {
      padding-top: 12px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .desktop-nav a,
    .desktop-nav a::after,
    .mobile-menu-link {
      transition: none;
    }
  }

  #home,
  #projects,
  #what-we-do,
  #contact {
    scroll-margin-top: 90px;
  }
`}</style>
</>

    
  );
}
