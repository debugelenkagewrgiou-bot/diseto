
"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { number: "01", label: "HOME", href: "#home" },
  { number: "02", label: "PROJECTS", href: "#projects" },
  { number: "03", label: "CONTACT", href: "#contact" },
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

    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <header className="site-header">
        <a
          href="#home"
          className="site-logo"
          onClick={(e) => navigateTo(e, "#home")}
        >
          DiSeto<span>.</span>
        </a>

        <nav className="desktop-nav">
          {links.map((link) => (
            <a
              key={link.number}
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
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={25} strokeWidth={1.3} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={25} strokeWidth={1.3} />
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
            initial={{
              clipPath: "inset(0 0 100% 0)",
            }}
            animate={{
              clipPath: "inset(0 0 0% 0)",
            }}
            exit={{
              clipPath: "inset(0 0 100% 0)",
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              ease,
            }}
          >
            <div className="mobile-menu-inner">
              <div className="mobile-menu-top">
                <span>DISETO — INTERIOR DESIGN</span>
                <span>MENU / 2026</span>
              </div>

              <nav className="mobile-menu-links">
                {links.map((link, index) => (
                  <motion.a
                    key={link.number}
                    href={link.href}
                    className="mobile-menu-link"
                    onClick={(e) => navigateTo(e, link.href)}
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.5,
                      delay: reduceMotion ? 0 : 0.12 + index * 0.1,
                      ease,
                    }}
                  >
                    <span className="mobile-link-number">
                      {link.number}
                    </span>

                    <span className="mobile-link-title">
                      {link.label}
                    </span>

                    <ArrowUpRight
                      className="mobile-link-arrow"
                      size={24}
                      strokeWidth={1}
                    />
                  </motion.a>
                ))}
              </nav>

              <motion.div
                className="mobile-menu-bottom"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: reduceMotion ? 0 : 0.5,
                  duration: 0.5,
                }}
              >
                <span>DESIGNED WITH PURPOSE.</span>
                <span>© DISETO</span>
              </motion.div>
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
          color: #28231e;
          font-family: Georgia, serif;
          font-size: 30px;
          letter-spacing: -1.5px;
          text-decoration: none;
        }

        .site-logo span {
          color: #a89576;
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
          width: 46px;
          height: 46px;
          border: 1px solid #ded8cd;
          border-radius: 50%;
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
          min-height: 500px;
          overflow-y: auto;
          background: #f0ece3;
          color: #28231e;
        }

        .mobile-menu-inner {
          min-height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 115px 8% 35px;
        }

        .mobile-menu-top,
        .mobile-menu-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          color: #8b857b;
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 1.8px;
        }

        .mobile-menu-links {
          width: 100%;
          margin: 55px 0;
        }

        .mobile-menu-link {
          position: relative;
          display: grid;
          grid-template-columns: 38px 1fr 28px;
          align-items: center;
          gap: 12px;
          padding: 24px 0;
          border-bottom: 1px solid #d6cfc2;
          color: #28231e;
          text-decoration: none;
          transition: padding 0.35s ease;
        }

        .mobile-menu-link:first-child {
          border-top: 1px solid #d6cfc2;
        }

        .mobile-menu-link:active {
          padding-left: 8px;
        }

        .mobile-link-number {
          align-self: start;
          padding-top: 9px;
          color: #a89576;
          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 1px;
        }

        .mobile-link-title {
          font-family: Georgia, serif;
          font-size: clamp(43px, 12vw, 66px);
          font-weight: 400;
          letter-spacing: -2.5px;
          line-height: 1;
        }

        .mobile-link-arrow {
          color: #a89576;
          transition: transform 0.3s ease;
        }

        .mobile-menu-link:active .mobile-link-arrow {
          transform: translate(4px, -4px);
        }

        .mobile-menu-bottom {
          padding-top: 22px;
          border-top: 1px solid #d6cfc2;
        }

        @media (max-width: 768px) {
          .site-header {
            height: 72px;
            padding: 0 6%;
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

          .mobile-link-title {
            font-size: 42px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mobile-menu-link,
          .mobile-link-arrow {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}
