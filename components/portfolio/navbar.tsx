"use client";

import * as React from "react";
import Link from "next/link";
import { Moon, Sun, Command, Router, Globe, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";

export function Navbar({ onOpenCommand }: { onOpenCommand?: () => void }) {
  const { theme, setTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const [mounted, setMounted] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("Proyek", "Projects"), href: "#projects" },
    { name: t("Tentang", "About"), href: "#about" },
    { name: t("Pengalaman", "Experience"), href: "#experience" },
    { name: t("Kontak", "Contact"), href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-2.5 shadow-xs"
          : "bg-background/60 backdrop-blur-xs py-3"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-mono text-xs sm:text-sm font-semibold tracking-tight hover:opacity-80 transition-opacity"
        >
          <img src="/icon.png" alt="wf logo" className="size-5 rounded-xs border border-border/40 object-cover" />
          <span>haidar portfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions & Mobile Menu Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Switcher */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLang(lang === "ID" ? "EN" : "ID")}
            className="h-8 px-2 sm:px-2.5 text-[11px] sm:text-xs font-mono gap-1 text-muted-foreground hover:text-foreground rounded-lg"
            aria-label="Toggle Language"
          >
            <Globe className="size-3 sm:size-3.5" />
            <span className="font-bold text-foreground">{lang}</span>
          </Button>

          {onOpenCommand && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenCommand}
              className="h-8 px-2.5 text-xs text-muted-foreground font-mono gap-1.5 hidden sm:inline-flex rounded-lg"
            >
              <Command className="size-3.5" />
              <span>⌘K</span>
            </Button>
          )}

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-lg"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="size-3.5 sm:size-4" /> : <Moon className="size-3.5 sm:size-4" />}
            </Button>
          )}

          {/* Mobile Hamburger Button */}
          <Button
            variant="ghost"
            size="icon"
            className="size-8 md:hidden rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border/50 bg-background/95 backdrop-blur-md px-4 py-3 space-y-2 font-mono text-xs animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-secondary/60 text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
