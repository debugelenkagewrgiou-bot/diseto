
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("el");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("diseto-language");

    if (savedLanguage === "el" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    localStorage.setItem("diseto-language", language);
    document.documentElement.lang = language;
  }, [language, ready]);

  const changeLanguage = useCallback((nextLanguage) => {
    if (nextLanguage !== "el" && nextLanguage !== "en") return;

    setLanguage(nextLanguage);
  }, []);

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage: changeLanguage,
    }),
    [language, changeLanguage]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}
