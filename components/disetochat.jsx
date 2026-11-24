
"use client";

import { useEffect, useRef, useState } from "react";

const initialMessage = {
  role: "assistant",
  content:
    "Καλώς ήρθατε στο DISETO.\nΠώς μπορούμε να σας βοηθήσουμε να διαμορφώσετε τον χώρο σας;\n\nWelcome to DISETO.\nHow can we help you shape your space?",
};

const quickQuestions = [
  { el: "Ανακαίνιση κατοικίας", en: "Home renovation" },
  { el: "Interior design", en: "Interior design" },
  { el: "Νέο project", en: "New project" },
];

export default function DISETOChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("el");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, isOpen]);

  function detectLanguage(text) {
    return /[\u0370-\u03FF\u1F00-\u1FFF]/.test(text)
      ? "el"
      : "en";
  }

  async function sendMessage(text) {
    const trimmed = text.trim();

    if (!trimmed || loading) return;

    const currentLanguage = detectLanguage(trimmed);
    setLanguage(currentLanguage);

    const updatedMessages = [
      ...messages,
      { role: "user", content: trimmed },
    ];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.slice(-12),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            data.reply ||
            (currentLanguage === "el"
              ? "Δεν υπάρχει διαθέσιμη απάντηση αυτή τη στιγμή."
              : "No answer is available right now."),
        },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            currentLanguage === "el"
              ? "Δεν ήταν δυνατή η σύνδεση αυτή τη στιγμή. Παρακαλώ δοκιμάστε ξανά."
              : "We couldn't connect right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const isGreek = language === "el";

  return (
    <>
      <style jsx global>{`
        .diseto-launcher {
          position: fixed;
          right: 28px;
          bottom: 28px;
          z-index: 9998;
          width: 58px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #d7d3cb;
          border-radius: 50%;
          background: #252620;
          color: #f7f6f2;
          cursor: pointer;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.09);
          transition: all 0.3s ease;
        }

        .diseto-launcher:hover {
          background: #44443b;
          transform: translateY(-3px);
        }

        .diseto-window {
          position: fixed;
          right: 28px;
          bottom: 100px;
          z-index: 9999;
          width: min(390px, calc(100vw - 32px));
          height: min(590px, calc(100dvh - 125px));
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid #e5e2dc;
          border-radius: 5px;
          background: #fbfaf7;
          color: #292923;
          box-shadow: 0 12px 45px rgba(0, 0, 0, 0.12);
          font-family: inherit;
          animation: disetoMinimalIn 0.25s ease-out;
        }

        @keyframes disetoMinimalIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .diseto-header {
          padding: 24px 25px 20px;
          border-bottom: 1px solid #e9e6df;
          background: #fbfaf7;
        }

        .diseto-brand {
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.2em;
        }

        .diseto-subtitle {
          margin-top: 7px;
          color: #969187;
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .diseto-close {
          width: 30px;
          height: 30px;
          border: 0;
          background: transparent;
          color: #55544d;
          font-size: 23px;
          font-weight: 300;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .diseto-close:hover {
          transform: rotate(90deg);
        }

        .diseto-messages {
          flex: 1;
          overflow-y: auto;
          padding: 25px 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          scrollbar-width: thin;
          scrollbar-color: #d8d4cb transparent;
        }

        .diseto-message {
          max-width: 87%;
          padding: 13px 15px;
          font-size: 13px;
          line-height: 1.8;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }

        .diseto-assistant {
          align-self: flex-start;
          background: #f0eee8;
          color: #393932;
          border-radius: 2px 8px 8px 8px;
        }

        .diseto-user {
          align-self: flex-end;
          background: #292a24;
          color: #fff;
          border-radius: 8px 2px 8px 8px;
        }

        .diseto-suggestions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 12px;
        }

        .diseto-suggestion {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 13px;
          border: 1px solid #e5e1d9;
          border-radius: 2px;
          background: transparent;
          color: #55544d;
          text-align: left;
          font-family: inherit;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .diseto-suggestion:hover {
          border-color: #999487;
          background: #f2f0ea;
        }

        .diseto-suggestion span:last-child {
          color: #9d988d;
          font-size: 15px;
        }

        .diseto-input-area {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px;
          border-top: 1px solid #e9e6df;
          background: #fbfaf7;
        }

        .diseto-input {
          min-width: 0;
          flex: 1;
          padding: 13px 14px;
          border: 1px solid #e3dfd7;
          border-radius: 2px;
          outline: none;
          background: #fff;
          color: #292923;
          font-family: inherit;
          font-size: 12px;
          transition: border-color 0.2s ease;
        }

        .diseto-input:focus {
          border-color: #999487;
        }

        .diseto-input::placeholder {
          color: #aaa59b;
        }

        .diseto-send {
          width: 43px;
          height: 43px;
          flex-shrink: 0;
          border: 0;
          border-radius: 2px;
          background: #292a24;
          color: white;
          font-size: 19px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .diseto-send:hover {
          background: #55564b;
        }

        .diseto-send:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .diseto-footer {
          padding: 0 12px 12px;
          background: #fbfaf7;
          color: #aaa59b;
          text-align: center;
          font-size: 9px;
          letter-spacing: 0.03em;
        }

        .diseto-thinking {
          display: flex;
          align-items: center;
          gap: 5px;
          width: fit-content;
        }

        .diseto-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #999487;
          animation: disetoPulse 1s infinite ease-in-out;
        }

        .diseto-dot:nth-child(2) {
          animation-delay: 0.15s;
        }

        .diseto-dot:nth-child(3) {
          animation-delay: 0.3s;
        }

        @keyframes disetoPulse {
          0%, 60%, 100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          30% {
            opacity: 1;
            transform: translateY(-3px);
          }
        }

        @media (max-width: 480px) {
          .diseto-launcher {
            right: 17px;
            bottom: 17px;
            width: 54px;
            height: 54px;
          }

          .diseto-window {
            right: 10px;
            bottom: 82px;
            width: calc(100vw - 20px);
            height: min(590px, calc(100dvh - 100px));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .diseto-window,
          .diseto-dot {
            animation: none;
          }

          .diseto-launcher,
          .diseto-close,
          .diseto-suggestion,
          .diseto-send {
            transition: none;
          }
        }
      `}</style>

      {!isOpen && (
        <button
          type="button"
          className="diseto-launcher"
          onClick={() => setIsOpen(true)}
          aria-label="Open DISETO AI chat"
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.16em",
            }}
          >
            CHAT
          </span>
        </button>
      )}

      {isOpen && (
        <section
          className="diseto-window"
          aria-label="DISETO AI assistant"
        >
          <header className="diseto-header">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div className="diseto-brand">DISETO</div>
                <div className="diseto-subtitle">
                  AI Design Assistant
                </div>
              </div>

              <button
                type="button"
                className="diseto-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
          </header>

          <div className="diseto-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`diseto-message ${
                  message.role === "user"
                    ? "diseto-user"
                    : "diseto-assistant"
                }`}
              >
                {message.content}
              </div>
            ))}

            {messages.length === 1 && (
              <div>
                <div
                  style={{
                    marginBottom: 12,
                    color: "#999487",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Explore
                </div>

                <div className="diseto-suggestions">
                  {quickQuestions.map((question) => (
                    <button
                      type="button"
                      key={question.en}
                      className="diseto-suggestion"
                      onClick={() =>
                        sendMessage(
                          isGreek ? question.el : question.en
                        )
                      }
                    >
                      <span>
                        {isGreek ? question.el : question.en}
                      </span>
                      <span>↗</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="diseto-message diseto-assistant">
                <div className="diseto-thinking">
                  <span className="diseto-dot" />
                  <span className="diseto-dot" />
                  <span className="diseto-dot" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <form
            className="diseto-input-area"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              className="diseto-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={
                isGreek
                  ? "Γράψτε το μήνυμά σας..."
                  : "Write your message..."
              }
              maxLength={2000}
              aria-label={isGreek ? "Μήνυμα" : "Message"}
            />

            <button
              className="diseto-send"
              type="submit"
              disabled={!input.trim() || loading}
              aria-label={isGreek ? "Αποστολή" : "Send"}
            >
              ↗
            </button>
          </form>

          <div className="diseto-footer">
            DISETO · ARCHITECTURE & INTERIOR DESIGN
          </div>
        </section>
      )}
    </>
  );
}
