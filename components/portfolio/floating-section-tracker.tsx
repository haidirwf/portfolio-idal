"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

interface NavSection {
  id: string;
  labelId: string;
  labelEn: string;
}

const SECTIONS: NavSection[] = [
  { id: "hero", labelId: "Intro", labelEn: "Intro" },
  { id: "projects", labelId: "Proyek", labelEn: "Projects" },
  { id: "about", labelId: "Tentang", labelEn: "About" },
  { id: "experience", labelId: "Pengalaman", labelEn: "Experiences" },
  { id: "tech-stack", labelId: "Keahlian", labelEn: "Stacks" },
  { id: "contact", labelId: "Kontak", labelEn: "Contact" }
];

export function FloatingSectionTracker() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = React.useState("hero");
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTIONS[i].id);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end pointer-events-auto select-none font-mono text-[11px]"
    >
      <div className="relative flex flex-col items-end space-y-4 pr-3 border-r border-border/40 py-2">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          const showLabel = isActive || isHovered;

          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={cn(
                "group relative flex items-center justify-end transition-all duration-300 gap-2 cursor-pointer focus:outline-none h-4",
                isActive
                  ? "text-foreground font-bold"
                  : "text-muted-foreground/50 hover:text-foreground/90 font-medium"
              )}
            >
              {/* Section Label (Hanya muncul jika section sedang AKTIF atau mouse HOVER) */}
              <AnimatePresence>
                {showLabel && (
                  <motion.span
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 6 }}
                    transition={{ duration: 0.15 }}
                    className="whitespace-nowrap"
                  >
                    {t(sec.labelId, sec.labelEn)}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Tock Mark Notch */}
              <span
                className={cn(
                  "absolute -right-3 transition-all duration-300",
                  isActive
                    ? "w-3.5 h-[1.5px] bg-foreground shadow-xs"
                    : "w-1.5 h-[1px] bg-border/60 group-hover:w-2.5 group-hover:bg-muted-foreground/80"
                )}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
