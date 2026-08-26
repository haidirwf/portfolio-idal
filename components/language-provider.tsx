"use client";

import * as React from "react";

type Language = "ID" | "EN";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (idKey: string, enKey: string) => string;
}

const LanguageContext = React.createContext<LanguageContextType>({
  lang: "EN",
  setLang: () => {},
  t: (idKey, enKey) => enKey,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Language>("EN");

  React.useEffect(() => {
    const saved = localStorage.getItem("app_lang") as Language | null;
    if (saved === "ID" || saved === "EN") {
      setLangState(saved);
    } else if (typeof window !== "undefined") {
      // Auto-detect browser language ONLY on /projects routes:
      // If user visits project lab tutorials and uses Indonesian (id / id-ID), default to ID.
      // On homepage and other routes, default remains strictly English (EN).
      const isProjectRoute = window.location.pathname.startsWith("/projects");
      if (isProjectRoute) {
        const userLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || "";
        if (userLang.toLowerCase().startsWith("id")) {
          setLangState("ID");
        }
      }
    }
  }, []);

  const setLang = React.useCallback((newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("app_lang", newLang);
    } catch {
      // ignore
    }
  }, []);

  const t = React.useCallback(
    (idText: string, enText: string) => {
      return lang === "ID" ? idText : enText;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return React.useContext(LanguageContext);
}
