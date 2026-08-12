"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ExternalLink, ArrowLeft, Download, FileDown, Search } from "lucide-react";
import { PROJECTS, Project } from "@/lib/projects";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

export function AllProjectsContent() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState("");

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "font-mono text-xs gap-1.5 rounded-lg text-muted-foreground hover:text-foreground"
          )}
        >
          <ArrowLeft className="size-3.5" />
          <span>{t("Kembali ke Beranda", "Back to Home")}</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight">
          {t("Semua Proyek Jaringan", "All Network Projects")}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground font-sans max-w-2xl leading-relaxed">
          {t(
            "Kumpulan lengkap simulasi topologi jaringan Cisco Packet Tracer, konfigurasi router IOS, filtrasi ACL, dan manajemen edge MikroTik.",
            "Complete repository of Cisco Packet Tracer network topology simulations, Cisco IOS router configs, ACL security filters, and MikroTik edge setups."
          )}
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md pt-2">
          <Search className="absolute left-3 top-5 size-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("Cari proyek, protokol, atau teknologi...", "Search projects, protocols, or tech stack...")}
            className="w-full pl-9 pr-4 py-2 text-xs font-sans rounded-xl bg-card border border-border/80 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="h-full"
          >
            <Card className="h-full flex flex-col justify-between overflow-hidden border-border/80 bg-card/60 rounded-xl p-3 hover:bg-card hover:shadow-md transition-all duration-300 group">
              <div className="space-y-3">
                <Link href={`/projects/${project.slug}`} className="block relative aspect-video rounded-lg bg-secondary/40 overflow-hidden border border-border/40">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-1 transition-transform duration-500 group-hover:scale-[1.02]"
                    priority={idx < 3}
                    loading={idx < 3 ? "eager" : "lazy"}
                  />
                </Link>

                <div className="space-y-1.5">
                  <CardTitle className="text-base font-bold font-sans tracking-tight">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="hover:underline group-hover:text-primary transition-colors"
                    >
                      {project.title}
                    </Link>
                  </CardTitle>

                  <CardDescription className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {t(project.descriptionId, project.descriptionEn)}
                  </CardDescription>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-muted/80 text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Footer Action Links */}
                <div className="flex items-center justify-between pt-2.5 border-t border-border/40 text-xs">
                  <div className="flex items-center gap-2">
                    {project.downloadPkt && (
                      <a
                        href={project.downloadPkt}
                        download
                        className="text-primary hover:underline font-mono text-[11px] flex items-center gap-1"
                      >
                        <Download className="size-3" />
                        <span>.PKT</span>
                      </a>
                    )}

                    {project.downloadGns3 && (
                      <a
                        href={project.downloadGns3}
                        download
                        className="text-emerald-500 hover:underline font-mono text-[11px] flex items-center gap-1"
                      >
                        <FileDown className="size-3" />
                        <span>.GNS3</span>
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-sans font-medium text-foreground hover:underline"
                  >
                    {t("Lihat Detail →", "View Details →")}
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 space-y-2">
          <p className="text-sm text-muted-foreground font-sans">
            {t("Tidak ada proyek yang sesuai dengan kata kunci pencarian.", "No projects match your search query.")}
          </p>
        </div>
      )}
    </div>
  );
}
