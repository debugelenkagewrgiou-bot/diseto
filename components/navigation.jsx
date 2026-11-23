
"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "HOME", href: "#home" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

const ease = [0.22, 1, 0.36, 1];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const navigateTo = (event, href) => {
    event.preventDefault();
    setOpen(false);

    if (href === "#home") {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth",
      });
      return;
    }

    document.querySelector(href)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      <header className="site-header">
        <a
          href="#home"
          className="site-logo"
          onClick={(e) => navigateTo(e, "#home")}
        >
          <img src="/images/logo.jpg" alt="DiSeto" />
        </a>

        <nav className="desktop-nav">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => navigateTo(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                <X size={23} strokeWidth={1.3} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0, rotate: 45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -45 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={23} strokeWidth={1.3} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            className="mobile-menu"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{
              duration: reduceMotion ? 0 : 0.4,
              ease,
            }}
          >
            <div className="mobile-menu-inner">
              <span className="mobile-menu-label">
                DISETO — INTERIOR DESIGN
              </span>

              <nav className="mobile-menu-links">
                {links.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="mobile-menu-link"
                    onClick={(e) => navigateTo(e, link.href)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.4,
                      delay: reduceMotion ? 0 : 0.08 * index,
                      ease,
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mobile-menu-bottom">
                <span>DESIGNED WITH PURPOSE.</span>
                <span>© DISETO</span>
              </div>
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
          background: rgba(247, 244, 237, 0.96);
          border-bottom: 1px solid #ded8cd;
          backdrop-filter: blur(12px);
        }

        .site-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .site-logo img {
          display: block;
          width: 105px;
          height: auto;
          max-height: 48px;
          object-fit: contain;
          object-position: left center;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 42px;
        }

        .desktop-nav a {
          color: #777168;
          font-size: 10px;
          letter-spacing: 2px;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .desktop-nav a:hover {
          color: #a89576;
        }

        .menu-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border: none;
          background: transparent;
          color: #28231e;
          cursor: pointer;
          position: relative;
          z-index: 100001;
        }

        .menu-toggle span {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 100000;
          width: 100%;
          height: 100dvh;
          background: #f7f4ed;
          color: #28231e;
        }

        .mobile-menu-inner {
          min-height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 125px 8% 35px;
        }

        .mobile-menu-label {
          color: #777168;
          font-family: Arial, sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 2px;
        }

        .mobile-menu-links {
          width: 100%;
          margin: 55px 0;
          border-top: 1px solid #ded8cd;
        }

        .mobile-menu-link {
          display: block;
          padding: 25px 0;
          border-bottom: 1px solid #ded8cd;
          color: #28231e;
          font-family: Georgia, serif;
          font-size: clamp(43px, 12vw, 62px);
          font-weight: 400;
          letter-spacing: -2px;
          line-height: 1;
          text-decoration: none;
          transition: color 0.3s ease, padding-left 0.3s ease;
        }

        .mobile-menu-link:hover,
        .mobile-menu-link:active {
          color: #a89576;
          padding-left: 6px;
        }

        .mobile-menu-bottom {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding-top: 22px;
          border-top: 1px solid #ded8cd;
          color: #777168;
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 1.5px;
        }

        @media (max-width: 768px) {
          .site-header {
            height: 72px;
            padding: 0 6%;
          }

          .site-logo img {
            width: 90px;
            max-height: 42px;
          }

          .desktop-nav {
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

        @media (max-width: 360px) {
          .mobile-menu-inner {
            padding-left: 6%;
            padding-right: 6%;
          }

          .mobile-menu-link {
            font-size: 42px;
          }
        }
      `}</style>
    </>
  );
}
