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
    try {
      // Clean up legacy auto-saved 'EN' from previous versions
      if (localStorage.getItem("app_lang")) {
        localStorage.removeItem("app_lang");
      }
      const saved = localStorage.getItem("user_selected_lang") as Language | null;
      if (saved === "ID" || saved === "EN") {
        setLangState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = React.useCallback((newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("user_selected_lang", newLang);
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
