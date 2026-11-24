
"use client";

import { useEffect, useState } from "react";

export default function InitialLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let fallbackTimer;

    const hideLoader = () => {
      clearTimeout(fallbackTimer);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader);

      fallbackTimer = setTimeout(() => {
        setLoading(false);
      }, 4000);
    }

    return () => {
      window.removeEventListener("load", hideLoader);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className={`initial-loader ${!loading ? "fade-out" : ""}`}>
      <div className="loader-content">
        <div className="loader-logo">DISETO</div>

        <div className="loader-subtitle">
          ARCHITECTURE & INTERIOR DESIGN
        </div>

        <div className="loader-line">
          <div className="loader-progress" />
        </div>
      </div>

      <style jsx>{`
        .initial-loader {
          position: fixed;
          inset: 0;
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f7f4ed;
          opacity: 1;
          visibility: visible;
          transition:
            opacity 0.65s ease,
            visibility 0.65s ease;
        }

        .initial-loader.fade-out {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .loader-content {
          width: 180px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .loader-logo {
          color: #28231e;
          font-size: 30px;
          font-weight: 600;
          letter-spacing: 0.22em;
        }

        .loader-subtitle {
          margin-top: 9px;
          color: #81766a;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.19em;
          white-space: nowrap;
        }

        .loader-line {
          width: 100%;
          height: 1px;
          margin-top: 35px;
          overflow: hidden;
          background: #ded7cc;
        }

        .loader-progress {
          width: 35%;
          height: 100%;
          background: #a58c70;
          animation: loading 1.4s ease-in-out infinite;
        }

        @keyframes loading {
          from {
            transform: translateX(-110%);
          }

          to {
            transform: translateX(310%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .loader-progress {
            width: 100%;
            animation: none;
          }

          .initial-loader {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
