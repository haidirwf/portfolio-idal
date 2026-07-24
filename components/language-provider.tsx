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
  const [lang, setLang] = React.useState<Language>("EN");

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
