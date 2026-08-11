"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { buttonVariants, Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ExternalLink,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  Award,
  Download,
  Terminal,
  Copy,
  Check,
  FileDown
} from "lucide-react";

export function ProjectDetailContent({ slug }: { slug: string }) {
  const project = getProjectBySlug(slug);
  const { t } = useLanguage();
  const [copiedConfig, setCopiedConfig] = React.useState(false);

  if (!project) return null;

  const handleCopyConfig = () => {
    if (!project.rawConfig) return;
    navigator.clipboard.writeText(project.rawConfig);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
      {/* Navigation back */}
      <div>
        <Link
          href="/#projects"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "font-mono text-xs gap-2")}
        >
          <ArrowLeft className="size-3.5" />
          <span>{t("Kembali ke Topologi", "Back to Topologies")}</span>
        </Link>
      </div>

      {/* Header Compact */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            {project.year}
          </Badge>
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-mono text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold font-sans tracking-tight">
          {project.title}
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground font-sans max-w-2xl leading-relaxed">
          {t(project.descriptionId, project.descriptionEn)}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((item) => (
            <span
              key={item}
              className="px-2 py-0.5 rounded-md font-mono text-[11px] bg-muted/80 text-muted-foreground border border-border/40"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Links Bar */}
        {project.demo && (
          <div className="pt-1">
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "font-mono text-xs gap-1.5 rounded-lg bg-background")}
            >
              <ExternalLink className="size-3.5" />
              <span>Live Demo / Documentation</span>
            </a>
          </div>
        )}
      </div>

      {/* Hero Screenshot / Topology Visual */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border/80 bg-secondary/30 shadow-xs">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Structured Grid: Overview, Problem, Solution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 sm:p-5 border-border/80 bg-card/60 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold font-sans text-foreground">
            <Cpu className="size-3.5 text-primary shrink-0" />
            <span>{t("Gambaran Umum", "Overview")}</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t(project.overviewId, project.overviewEn)}
          </p>
        </Card>

        <Card className="p-4 sm:p-5 border-border/80 bg-card/60 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold font-sans text-foreground">
            <AlertTriangle className="size-3.5 text-amber-500 shrink-0" />
            <span>{t("Masalah", "The Problem")}</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t(project.problemId, project.problemEn)}
          </p>
        </Card>

        <Card className="p-4 sm:p-5 border-border/80 bg-card/60 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold font-sans text-foreground">
            <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
            <span>{t("Solusi", "The Solution")}</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t(project.solutionId, project.solutionEn)}
          </p>
        </Card>
      </div>

      {/* Architecture & Result Card */}
      {(project.architectureId || project.resultId) && (
        <Card className="p-5 border-border/80 bg-card/60 rounded-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.architectureId && project.architectureEn && (
              <div className="space-y-1">
                <h4 className="text-xs font-bold font-sans uppercase text-muted-foreground">
                  {t("Arsitektur Jaringan", "Network Architecture")}
                </h4>
                <p className="text-xs font-mono text-foreground/90 bg-muted/30 p-3 rounded-lg border border-border/40 leading-relaxed">
                  {t(project.architectureId, project.architectureEn)}
                </p>
              </div>
            )}

            {project.resultId && project.resultEn && (
              <div className="space-y-1">
                <h4 className="text-xs font-bold font-sans uppercase text-muted-foreground flex items-center gap-1.5">
                  <Award className="size-3.5 text-primary" />
                  <span>{t("Hasil Terukur", "Quantified Result")}</span>
                </h4>
                <p className="text-xs font-mono text-foreground/90 bg-muted/30 p-3 rounded-lg border border-border/40 leading-relaxed">
                  {t(project.resultId, project.resultEn)}
                </p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Collapsible/Compact Script Config Block */}
      {project.rawConfig && (
        <Card className="p-5 border-border/80 bg-card/60 rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-foreground font-semibold">
              <Terminal className="size-3.5 text-primary" />
              <span>{t("Skrip Konfigurasi (Device Script)", "Device Script / Raw Config")}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyConfig}
              className="h-7 px-2.5 font-mono text-[11px] gap-1.5 rounded-md"
            >
              {copiedConfig ? (
                <>
                  <Check className="size-3 text-emerald-500" />
                  <span>{t("Tersalin", "Copied")}</span>
                </>
              ) : (
                <>
                  <Copy className="size-3" />
                  <span>{t("Salin Konfig", "Copy Config")}</span>
                </>
              )}
            </Button>
          </div>

          <pre className="p-3.5 rounded-lg bg-black/80 text-emerald-400 font-mono text-[11px] max-h-56 overflow-y-auto border border-border/40 leading-relaxed">
            <code>{project.rawConfig}</code>
          </pre>
        </Card>
      )}

      {/* Download Action Buttons (Boxy Modern Card Grid, Responsive) */}
      {(project.downloadPkt || project.downloadGns3) && (
        <div className="space-y-3 pt-2">
          <div className="space-y-1">
            <h3 className="text-sm font-bold font-sans text-foreground">
              {t("Unduh Berkas Lab & Topologi", "Download Lab & Topology Files")}
            </h3>
            <p className="text-xs text-muted-foreground font-sans">
              {t(
                "Pilih format berkas simulasi untuk dijalankan langsung di Packet Tracer atau GNS3.",
                "Select simulation file format to run directly in Packet Tracer or GNS3."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {project.downloadPkt && (
              <Card className="p-4 sm:p-5 border-border/80 bg-card/60 rounded-xl hover:border-primary/50 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-xs group">
                <div className="flex items-start justify-between gap-3">
                  <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary group-hover:scale-105 transition-transform">
                    <Download className="size-5 sm:size-6" />
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px] bg-background">
                    Cisco .PKT
                  </Badge>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold font-sans text-foreground">
                    Cisco Packet Tracer
                  </h4>
                  <p className="text-xs text-muted-foreground font-sans line-clamp-2">
                    {t(
                      "File skenario terkonfigurasi (.pkt) siap dibuka di Packet Tracer.",
                      "Pre-configured scenario file (.pkt) ready for Packet Tracer."
                    )}
                  </p>
                </div>

                <a
                  href={project.downloadPkt}
                  download
                  className={cn(
                    buttonVariants({ variant: "default", size: "default" }),
                    "w-full font-mono text-xs font-semibold gap-2 rounded-lg shadow-xs justify-center"
                  )}
                >
                  <Download className="size-4" />
                  <span>{t("Unduh .PKT File", "Download .PKT File")}</span>
                </a>
              </Card>
            )}

            {project.downloadGns3 && (
              <Card className="p-4 sm:p-5 border-border/80 bg-card/60 rounded-xl hover:border-emerald-500/50 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-xs group">
                <div className="flex items-start justify-between gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 group-hover:scale-105 transition-transform">
                    <FileDown className="size-5 sm:size-6" />
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px] bg-background text-emerald-600 border-emerald-500/30">
                    GNS3 Project
                  </Badge>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold font-sans text-foreground">
                    GNS3 Network Lab
                  </h4>
                  <p className="text-xs text-muted-foreground font-sans line-clamp-2">
                    {t(
                      "File proyek GNS3 beserta pemetaan topologi & appliance.",
                      "GNS3 project file with topology mapping & appliances."
                    )}
                  </p>
                </div>

                <a
                  href={project.downloadGns3}
                  download
                  className={cn(
                    buttonVariants({ variant: "outline", size: "default" }),
                    "w-full font-mono text-xs font-semibold gap-2 rounded-lg bg-background border-border/80 justify-center hover:border-emerald-500/50"
                  )}
                >
                  <FileDown className="size-4 text-emerald-500" />
                  <span>{t("Unduh GNS3 Project", "Download GNS3 Project")}</span>
                </a>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
