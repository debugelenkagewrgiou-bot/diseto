
export default function Loading() {
  return (
    <main className="diseto-loading">
      <div className="diseto-loading-content">
        <img
          src="/images/logo.jpg"
          alt="DiSeto"
          width="120"
          height="56"
          style={{
            display: "block",
            width: 120,
            height: 56,
            objectFit: "contain",
          }}
        />

        <div className="diseto-loading-line">
          <span />
        </div>

        <p>DESIGNED WITH PURPOSE</p>
      </div>

      <style>{`
        .diseto-loading {
          position: fixed;
          inset: 0;
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f7f4ed;
        }

        .diseto-loading-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .diseto-loading-line {
          position: relative;
          width: 90px;
          height: 1px;
          margin-top: 35px;
          overflow: hidden;
          background: #ded8cd;
        }

        .diseto-loading-line span {
          position: absolute;
          top: 0;
          left: -40%;
          width: 40%;
          height: 1px;
          background: #a89576;
          animation: diseto-loading-slide 1.5s ease-in-out infinite;
        }

        .diseto-loading-content p {
          margin-top: 17px;
          color: #8a8175;
          font-family: Arial, sans-serif;
          font-size: 8px;
          font-weight: 400;
          letter-spacing: 2.5px;
        }

        @keyframes diseto-loading-slide {
          0% {
            left: -40%;
          }
          100% {
            left: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .diseto-loading-line span {
            animation: none;
            left: 30%;
          }
        }
      `}</style>
    </main>
  );
}
