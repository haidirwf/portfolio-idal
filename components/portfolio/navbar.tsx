"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Command, Code2, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";

export function Navbar({ onOpenCommand }: { onOpenCommand?: () => void }) {
  const { theme, setTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const [mounted, setMounted] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("Projects", "Projects"), href: "/#projects" },
    { name: t("About", "About"), href: "/#about" },
    { name: t("Pengalaman", "Experience"), href: "/#experience" },
    { name: t("Kontak", "Contact"), href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-2.5 shadow-sm"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight hover:opacity-80 transition-opacity"
        >
          <Code2 className="size-4" />
          <span>haidar.dev</span>
        </Link>

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

        <div className="flex items-center gap-2">
          {/* Language Switcher Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLang(lang === "ID" ? "EN" : "ID")}
            className="h-8 px-2.5 text-xs font-mono gap-1 text-muted-foreground hover:text-foreground"
            aria-label="Toggle Language"
          >
            <Globe className="size-3.5" />
            <span className="font-bold text-foreground">{lang}</span>
          </Button>

          {onOpenCommand && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenCommand}
              className="h-8 px-2.5 text-xs text-muted-foreground font-mono gap-1.5 hidden sm:inline-flex"
            >
              <Command className="size-3.5" />
              <span>⌘K</span>
            </Button>
          )}

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
