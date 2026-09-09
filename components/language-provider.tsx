"use client";

import * as React from "react";

type Language = "ID" | "EN";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (idKey: string, enKey: string) => string;
}

const LanguageContext = React.createContext<LanguageContextType>({
  lang: "ID",
  setLang: () => {},
  t: (idKey, _enKey) => idKey,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Language>("ID");

  React.useEffect(() => {
    const saved = localStorage.getItem("app_lang") as Language | null;
    if (saved === "ID" || saved === "EN") {
      setLangState(saved);
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
