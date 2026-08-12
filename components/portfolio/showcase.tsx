"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { GitBranch, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "@/lib/projects";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

export function Showcase({ projects }: { projects: Project[] }) {
  const { t } = useLanguage();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const [pageCount, setPageCount] = React.useState(1);
  const [activePage, setActivePage] = React.useState(0);

  const checkScroll = React.useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setPageCount(1);
      setActivePage(0);
      return;
    }

    // Number of pages is total scrollable distance / page scroll distance + 1
    const pages = Math.ceil(maxScroll / clientWidth) + 1;
    setPageCount(pages);

    const currentPage = Math.round((scrollLeft / maxScroll) * (pages - 1));
    setActivePage(Math.min(Math.max(currentPage, 0), pages - 1));
  }, []);

  React.useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  const scrollToPage = (pageIndex: number) => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (pageCount <= 1 || maxScroll <= 0) return;

    const targetScroll = (pageIndex / (pageCount - 1)) * maxScroll;
    scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  const [isMouseDown, setIsMouseDown] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeftPos, setScrollLeftPos] = React.useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftPos(scrollRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed multiplier
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };

  return (
    <section id="projects" className="py-12 px-4 sm:px-6 space-y-6">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
          {t("Topologi & Proyek Jaringan", "Network Topologies & Works")}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
          {t(
            "Arsitektur jaringan enterprise, simulasi Cisco Packet Tracer, dan manajemen edge MikroTik.",
            "Enterprise network architecture, Cisco Packet Tracer simulations, and MikroTik edge management."
          )}
        </p>

        <div className="pt-1">
          <Link
            href="/projects"
            className="inline-flex items-center text-xs font-mono font-medium text-foreground hover:underline bg-muted/50 hover:bg-muted px-3.5 py-1.5 rounded-lg border border-border/50 transition-colors"
          >
            {t("Lihat Semua Proyek →", "See All Projects →")}
          </Link>
        </div>
      </div>

      {/* Horizontal Carousel: Shows 3 cards on desktop, scrollable & drag-scrollable */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        className={cn(
          "flex gap-6 overflow-x-auto scrollbar-none pb-4 pt-1 select-none transition-cursor",
          isMouseDown ? "cursor-grabbing scroll-auto" : "cursor-grab scroll-smooth snap-x snap-mandatory"
        )}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects.map((project, idx) => (
          <div
            key={project.slug}
            className="w-full min-w-[280px] sm:min-w-[320px] lg:w-[calc(33.333%-16px)] shrink-0 snap-start"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col justify-between overflow-hidden border-border/80 bg-card/60 rounded-xl p-2.5 hover:bg-card hover:shadow-md transition-all duration-300 group">
                <div className="space-y-3">
                  <div className="relative aspect-video rounded-lg bg-secondary/40 overflow-hidden border border-border/40">
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      priority={idx < 2}
                    />
                  </div>

                  <div className="px-3 pt-1 space-y-1.5">
                    <CardTitle className="text-base font-bold font-sans tracking-tight">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="hover:underline group-hover:text-primary transition-colors"
                      >
                        {project.title}
                      </Link>
                    </CardTitle>

                    <CardDescription className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {t(project.descriptionId, project.descriptionEn)}
                    </CardDescription>
                  </div>
                </div>

                <div className="p-3 pt-2">
                  <div className="flex items-end justify-between gap-2">
                    <div className="flex flex-wrap gap-1 flex-1">
                      {project.stack.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-muted/80 text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xs font-sans font-medium text-foreground hover:underline shrink-0 pb-0.5"
                    >
                      Details →
                    </Link>
                  </div>

                  {project.demo && (
                    <div className="pt-2 border-t border-border/40 mt-2 text-xs font-mono">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="size-3.5" />
                        <span>Demo</span>
                      </a>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Pagination Indicator Dots */}
      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-2 pt-1">
          {Array.from({ length: pageCount }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToPage(idx)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 focus:outline-none cursor-pointer",
                activePage === idx
                  ? "w-6 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
