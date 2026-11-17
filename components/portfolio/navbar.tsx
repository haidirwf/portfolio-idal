"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const [mounted, setMounted] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu on route change
  React.useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Handle escape & outside clicks
  React.useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const toggleLang = () => {
    setLang(lang === "ID" ? "EN" : "ID");
  };

  const navLinks = [
    { label: t("Proyek", "Projects"), href: "/projects" },
    { label: t("Artikel", "Articles"), href: "/articles" },
    { label: t("Tentang", "About"), href: "/#about" },
    { label: t("Sertifikat", "Certs"), href: "/#certifications" },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-40 h-[60px] px-4 sm:px-8 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between text-[13.5px]"
      >
        {/* Left: Mark */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 py-1.5 px-2 -ml-2 rounded-lg hover:bg-secondary/60 transition-colors"
          aria-label="Haidar Rauf, home"
        >
          <div className="size-6 rounded-md overflow-hidden bg-secondary border border-border/60 shrink-0 transition-transform duration-200 group-hover:-rotate-6">
            <Image
              src="/icon.png"
              alt="Haidar"
              width={24}
              height={24}
              className="size-full object-cover"
              priority
            />
          </div>
          <span className="font-semibold tracking-tight text-foreground">
            Haidar Rauf
          </span>
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 text-muted-foreground" aria-label="Main navigation">
          {navLinks.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : item.href.startsWith("/#")
                ? false
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-1.5 px-2.5 rounded-md transition-colors ${
                  isActive
                    ? "text-foreground bg-secondary/80 font-medium"
                    : "hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Tools & Social */}
        <div className="flex items-center gap-1">
          {/* Social Icons */}
          <a
            href="https://github.com/haidirwf"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden sm:grid place-items-center size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
          >
            <svg className="size-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/haidar-rauf/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hidden sm:grid place-items-center size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
          >
            <svg className="size-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          <span className="hidden sm:block w-px h-4 bg-border mx-1" aria-hidden="true" />

          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLang}
            className="grid place-items-center px-2 h-8 rounded-lg text-xs font-mono font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
            aria-label="Toggle language"
            title={lang === "ID" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
          >
            {lang === "ID" ? "ID" : "EN"}
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="grid place-items-center size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
            aria-label="Toggle color theme"
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </button>

          {/* Mobile Menu Button (Hamburger animated into X) */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden grid place-content-center size-9 -mr-1 rounded-lg text-foreground hover:bg-secondary/60 transition-colors"
          >
            <div className="w-[18px] h-3.5 flex flex-col justify-between">
              <span
                className={`block h-[1.8px] w-full rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "translate-y-[5.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.8px] w-full rounded-full bg-current transition-all duration-200 ${
                  menuOpen ? "opacity-0 scale-x-50" : ""
                }`}
              />
              <span
                className={`block h-[1.8px] w-full rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden absolute left-0 right-0 top-full bg-background border-b border-border shadow-xl px-6 py-5 transition-all duration-300 ease-out origin-top ${
            menuOpen
              ? "opacity-100 scale-y-100 pointer-events-auto visible"
              : "opacity-0 scale-y-95 pointer-events-none invisible"
          }`}
        >
          <nav className="flex flex-col space-y-1 text-base font-medium">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="py-2.5 border-b border-border/50 text-foreground hover:text-muted-foreground transition-colors"
            >
              {t("Beranda", "Home")}
            </Link>
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="py-2.5 border-b border-border/50 text-foreground hover:text-muted-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="py-2.5 border-b border-border/50 text-foreground hover:text-muted-foreground transition-colors"
            >
              {t("Kontak", "Contact")}
            </Link>
          </nav>

          <div className="flex items-center gap-3 pt-4 mt-2">
            <a
              href="https://github.com/haidirwf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 h-9 px-3.5 rounded-full border border-border bg-secondary/40 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
            >
              <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/haidar-rauf/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 h-9 px-3.5 rounded-full border border-border bg-secondary/40 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
            >
              <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </header>

      {/* Backdrop overlay for mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/20 backdrop-blur-xs transition-opacity"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
