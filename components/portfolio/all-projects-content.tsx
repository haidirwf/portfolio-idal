"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Search, List, LayoutGrid } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import { useLanguage } from "@/components/language-provider";

type ViewMode = "list" | "grid";

export function AllProjectsContent() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [view, setView] = React.useState<ViewMode>("list");
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("view-all-projects-pref");
      if (saved === "list" || saved === "grid") setView(saved);
    } catch {
      // ignore
    }
  }, []);

  const changeView = (next: ViewMode) => {
    setView(next);
    try {
      localStorage.setItem("view-all-projects-pref", next);
    } catch {
      // ignore
    }
  };

  const filteredProjects = React.useMemo(() => {
    if (!searchQuery.trim()) return PROJECTS;
    const query = searchQuery.toLowerCase();
    return PROJECTS.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.descriptionId.toLowerCase().includes(query) ||
        p.descriptionEn.toLowerCase().includes(query) ||
        p.stack.some((s) => s.toLowerCase().includes(query)) ||
        p.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  return (
    <div className="py-8 sm:py-12 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>{t("Kembali ke Beranda", "Back to Home")}</span>
        </Link>
      </div>

      {/* Page Intro (matching sumit-pfp pageIntro) */}
      <header className="space-y-2 border-b border-border pb-6">
        <p className="font-mono text-xs uppercase tracking-wider text-primary font-semibold m-0">
          {t("Proyek", "Work")}
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground m-0">
          {t("Topologi & Simulasi Jaringan", "Things I’ve Built & Simulated")}
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl leading-relaxed m-0">
          {t(
            "Arsip lengkap topologi jaringan enterprise, simulasi Cisco Packet Tracer, dan manajemen edge MikroTik.",
            "Complete repository of enterprise network topologies, Cisco Packet Tracer simulations, and MikroTik setups."
          )}
        </p>
      </header>

      {/* Controls Bar: Search & View Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 size-3.5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("Cari proyek, protokol, atau teknologi...", "Search projects, protocols...")}
            className="w-full pl-8 pr-3 py-1.5 text-xs font-mono rounded-lg bg-secondary/40 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>

        {/* View Toggle */}
        <div
          className="relative inline-flex self-end sm:self-auto items-center p-0.5 rounded-lg border border-border bg-secondary/50 text-muted-foreground"
          role="radiogroup"
          aria-label="Project layout"
        >
          <div
            className={`absolute top-0.5 bottom-0.5 w-7 rounded-md bg-background border border-border shadow-2xs transition-transform duration-200 ease-out ${
              view === "grid" ? "translate-x-7" : "translate-x-0"
            }`}
            aria-hidden="true"
          />

          <button
            type="button"
            role="radio"
            aria-checked={view === "list"}
            aria-label="List view"
            onClick={() => changeView("list")}
            className={`relative z-10 grid place-items-center size-7 rounded-md transition-colors ${
              view === "list" ? "text-foreground" : "hover:text-foreground"
            }`}
          >
            <List className="size-3.5" />
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={view === "grid"}
            aria-label="Grid view"
            onClick={() => changeView("grid")}
            className={`relative z-10 grid place-items-center size-7 rounded-md transition-colors ${
              view === "grid" ? "text-foreground" : "hover:text-foreground"
            }`}
          >
            <LayoutGrid className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Projects List View */}
      {view === "list" && (
        <ul className="border-t border-border">
          {filteredProjects.map((p, idx) => {
            const isDimmed = hoveredIdx !== null && hoveredIdx !== idx;

            return (
              <li
                key={p.slug}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`py-4 border-b border-border space-y-1.5 transition-opacity duration-200 ${
                  isDimmed ? "opacity-40" : "opacity-100"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="size-5 rounded bg-secondary/80 border border-border/60 shrink-0 grid place-items-center text-[10px] font-mono font-bold text-foreground">
                      {p.title.charAt(0)}
                    </div>

                    <Link
                      href={`/projects/${p.slug}`}
                      className="font-medium text-sm sm:text-[15px] text-foreground hover:underline underline-offset-4 decoration-border transition-colors truncate"
                    >
                      {p.title}
                    </Link>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      <span>Detail</span>
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>

                <p className="text-xs sm:text-[13.5px] leading-relaxed text-muted-foreground max-w-2xl">
                  {t(p.descriptionId, p.descriptionEn)}
                </p>
              </li>
            );
          })}
        </ul>
      )}

      {/* Projects Grid View */}
      {view === "grid" && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filteredProjects.map((p) => (
            <li
              key={p.slug}
              className="group flex flex-col space-y-3 rounded-xl border border-border bg-card/40 p-3 hover:bg-card/80 hover:border-border transition-all duration-200"
            >
              <Link
                href={`/projects/${p.slug}`}
                className="relative block aspect-[16/10] w-full rounded-lg overflow-hidden bg-secondary/40 border border-border/60"
              >
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 360px"
                  className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </Link>

              <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="font-medium text-sm text-foreground hover:underline underline-offset-4 line-clamp-1"
                    >
                      {p.title}
                    </Link>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mt-1">
                    {t(p.descriptionId, p.descriptionEn)}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs font-mono text-muted-foreground border-t border-border/50">
                  <span>{p.year}</span>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-1 text-foreground hover:underline"
                  >
                    <span>Detail lab</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
