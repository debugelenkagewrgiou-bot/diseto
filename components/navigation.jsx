"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Menu, X, LogIn, LayoutDashboard } from "lucide-react";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { useLanguage } from "@/components/languagecontext";

const ease = [0.22, 1, 0.36, 1];

const styles = {
  authWrapDesktop: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginLeft: "16px",
    paddingLeft: "16px",
    borderLeft: "1px solid rgba(40, 35, 30, 0.15)",
  },
  btnLogin: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "9px 16px",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    background: "#ffffff",
    color: "#28231e",
    border: "1.5px solid #28231e",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
    fontFamily: "inherit",
    lineHeight: 1,
  },
  btnSignup: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "9px 16px",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    background: "#28231e",
    color: "#f7f4ed",
    border: "1.5px solid #28231e",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
    fontFamily: "inherit",
    lineHeight: 1,
  },
  btnDashboard: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "9px 16px",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    background: "#a89576",
    color: "#ffffff",
    border: "1.5px solid #a89576",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
    textDecoration: "none",
    fontFamily: "inherit",
    lineHeight: 1,
  },
  authWrapMobile: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    marginBottom: "20px",
  },
  mobileBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    padding: "14px 16px",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textDecoration: "none",
    fontFamily: "inherit",
    lineHeight: 1,
    boxSizing: "border-box",
  },
};

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [pendingHash, setPendingHash] = useState(null);
  const [mounted, setMounted] = useState(false);

  const reduceMotion = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();

  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLanguage = mounted ? language : "el";

  const links = [
    {
      label: currentLanguage === "el" ? "ΑΡΧΙΚΗ" : "HOME",
      href: "/#home",
    },
    {
      label: currentLanguage === "el" ? "ΠΟΙΟΙ ΕΙΜΑΣΤΕ" : "ABOUT US",
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
  label: currentLanguage === "el" ? "ΠΡΟΣΦΑΤΕΣ ΦΩΤΟΓΡΑΦΙΕΣ" : "LATEST PHOTOS",
  href: "/latest-photos",  // ✅ ΟΧΙ /gallery
},
    {
      label: currentLanguage === "el" ? "ΕΠΙΚΟΙΝΩΝΙΑ" : "CONTACT",
      href: "/#contact",
    },
  ];

  const isActive = (href) => {
    if (href === "/lookbook") return pathname === "/lookbook";
    if (href === "/latest-photos") return pathname === "/latest-photos";
    return false;
  };

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
      if (pathname !== "/lookbook") router.push("/lookbook");
      return;
    }
    if (href === "/latest-photos") {
      if (pathname !== "/latest-photos") router.push("/latest-photos");
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
        className={currentLanguage === "el" ? "language-active" : ""}
        aria-pressed={currentLanguage === "el"}
      >
        EL
      </button>
      <span>|</span>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={currentLanguage === "en" ? "language-active" : ""}
        aria-pressed={currentLanguage === "en"}
      >
        EN
      </button>
    </div>
  );

  const AuthActionsDesktop = () => (
    <div style={styles.authWrapDesktop}>
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button
            type="button"
            style={styles.btnLogin}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#28231e";
              e.currentTarget.style.color = "#f7f4ed";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.color = "#28231e";
            }}
          >
            <LogIn size={14} strokeWidth={2} />
            {currentLanguage === "el" ? "ΣΥΝΔΕΣΗ" : "SIGN IN"}
          </button>
        </SignInButton>

        <SignUpButton mode="modal">
          <button
            type="button"
            style={styles.btnSignup}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#a89576";
              e.currentTarget.style.borderColor = "#a89576";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#28231e";
              e.currentTarget.style.borderColor = "#28231e";
            }}
          >
            {currentLanguage === "el" ? "ΕΓΓΡΑΦΗ" : "SIGN UP"}
          </button>
        </SignUpButton>
      </Show>

      <Show when="signed-in">
        <a
          href="/dashboard"
          style={styles.btnDashboard}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#8a7659";
            e.currentTarget.style.borderColor = "#8a7659";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#a89576";
            e.currentTarget.style.borderColor = "#a89576";
          }}
        >
          <LayoutDashboard size={14} strokeWidth={2} />
          DASHBOARD
        </a>

        <div style={{ marginLeft: "4px", display: "flex" }}>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: { avatarBox: { width: 36, height: 36 } },
            }}
          />
        </div>
      </Show>
    </div>
  );

  const AuthActionsMobile = () => (
    <div style={styles.authWrapMobile}>
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button
            type="button"
            onClick={closeMenu}
            style={{
              ...styles.mobileBtn,
              background: "transparent",
              color: "#28231e",
              border: "1.5px solid #28231e",
            }}
          >
            <LogIn size={16} strokeWidth={2} />
            {currentLanguage === "el" ? "ΣΥΝΔΕΣΗ" : "SIGN IN"}
          </button>
        </SignInButton>

        <SignUpButton mode="modal">
          <button
            type="button"
            onClick={closeMenu}
            style={{
              ...styles.mobileBtn,
              background: "#28231e",
              color: "#f7f4ed",
              border: "1.5px solid #28231e",
            }}
          >
            {currentLanguage === "el" ? "ΕΓΓΡΑΦΗ" : "SIGN UP"}
          </button>
        </SignUpButton>
      </Show>

      <Show when="signed-in">
        <a
          href="/dashboard"
          onClick={closeMenu}
          style={{
            ...styles.mobileBtn,
            background: "#a89576",
            color: "#ffffff",
            border: "1.5px solid #a89576",
          }}
        >
          <LayoutDashboard size={16} strokeWidth={2} />
          DASHBOARD
        </a>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 4px",
            color: "#28231e",
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          <UserButton afterSignOutUrl="/" />
          <span>
            {currentLanguage === "el" ? "Ο λογαριασμός μου" : "My account"}
          </span>
        </div>
      </Show>
    </div>
  );

  return (
    <>
      <header className="site-header">
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

        <div className="desktop-nav-wrap">
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => navigateTo(e, link.href)}
                className={isActive(link.href) ? "nav-active" : ""}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <LanguageSwitcher />
          <AuthActionsDesktop />
        </div>

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

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
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

              <nav className="mobile-menu-links" aria-label="Mobile navigation">
                {links.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className={`mobile-menu-link ${
                      isActive(link.href) ? "nav-active" : ""
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
              <AuthActionsMobile />
              <LanguageSwitcher />
              <span>© DISETO</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}