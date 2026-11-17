"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, List, LayoutGrid } from "lucide-react";
import { ProjectSummary } from "@/lib/projects";
import { useLanguage } from "@/components/language-provider";

type ViewMode = "list" | "grid";

export function Showcase({ projects }: { projects: ProjectSummary[] }) {
  const { t } = useLanguage();
  const [view, setView] = React.useState<ViewMode>("list");
  const [isHoveringList, setIsHoveringList] = React.useState(false);
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  // Read saved preference
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("view-projects-pref");
      if (saved === "list" || saved === "grid") {
        setView(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const changeView = (next: ViewMode) => {
    setView(next);
    try {
      localStorage.setItem("view-projects-pref", next);
    } catch {
      // ignore
    }
  };

  // Show top featured projects (up to 4 on homepage)
  const displayProjects = projects.slice(0, 4);

  return (
    <section id="projects" className="py-8 sm:py-10 space-y-5 scroll-mt-16">
      {/* Bar / Section Head + View Toggle */}
      <div className="flex items-center justify-between gap-4">
        {/* Head */}
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-primary font-semibold">01</span>
          <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
            {t("Topologi & Proyek Jaringan", "Things I’ve Built")}
          </h2>
        </div>

        {/* View Toggle (List vs Grid) */}
        <div
          className="relative inline-flex items-center p-0.5 rounded-lg border border-border bg-secondary/50 text-muted-foreground"
          role="radiogroup"
          aria-label="Project layout"
        >
          {/* Sliding indicator thumb */}
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
        <ul
          className="border-t border-border"
          onMouseEnter={() => setIsHoveringList(true)}
          onMouseLeave={() => {
            setIsHoveringList(false);
            setHoveredIdx(null);
          }}
        >
          {displayProjects.map((p, idx) => {
            const isDimmed = isHoveringList && hoveredIdx !== null && hoveredIdx !== idx;

            return (
              <li
                key={p.slug}
                onMouseEnter={() => setHoveredIdx(idx)}
                className={`py-4 border-b border-border space-y-1.5 transition-opacity duration-200 ${
                  isDimmed ? "opacity-40" : "opacity-100"
                }`}
              >
                {/* Top row: Name + Action Links */}
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <div className="flex items-center min-w-0">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="font-medium text-sm sm:text-[15px] text-foreground hover:underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors truncate"
                    >
                      {p.title}
                    </Link>
                  </div>

                  {/* Links */}
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

                {/* Description */}
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
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
          {displayProjects.map((p) => (
            <li
              key={p.slug}
              className="group flex flex-col space-y-3 rounded-xl border border-border bg-card/40 p-3 hover:bg-card/80 hover:border-border transition-all duration-200"
            >
              {/* Image shot */}
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

              {/* Head & Links */}
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

      {/* Centered Show More Projects Pill Button */}
      <div className="flex justify-center pt-2">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 h-8 px-4 rounded-full border border-border bg-secondary/50 hover:bg-secondary text-xs font-medium text-foreground transition-all duration-150 active:scale-95"
        >
          <span>{t("Tampilkan semua proyek", "Show more projects")}</span>
          <ArrowRight className="size-3" />
        </Link>
      </div>
    </section>
  );
}
