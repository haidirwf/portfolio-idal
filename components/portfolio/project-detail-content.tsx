"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug } from "@/lib/projects";
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
  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExpanded(false);
    };
    if (isExpanded) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

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

        {/* Links & Download Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {project.downloadPkt && (
            <a
              href={project.downloadPkt}
              download
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "h-8 font-mono text-xs gap-1.5 rounded-lg px-3 shadow-xs"
              )}
            >
              <Download className="size-3.5" />
              <span>{t("Unduh .PKT (Packet Tracer)", "Download .PKT (Packet Tracer)")}</span>
            </a>
          )}

          {project.downloadGns3 && (
            <a
              href={project.downloadGns3}
              download
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "h-8 font-mono text-xs gap-1.5 rounded-lg bg-background border-border/80 px-3"
              )}
            >
              <FileDown className="size-3.5 text-emerald-500" />
              <span>{t("Unduh GNS3 Project", "Download GNS3 Project")}</span>
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "h-8 font-mono text-xs gap-1.5 rounded-lg bg-background border-border/80 px-3"
              )}
            >
              <ExternalLink className="size-3.5" />
              <span>Live Demo / Documentation</span>
            </a>
          )}
        </div>
      </div>

      {/* Hero Screenshot / Topology Visual */}
      <div
        onClick={() => setIsExpanded(true)}
        className="group relative aspect-video w-full rounded-xl overflow-hidden border border-border/80 bg-secondary/30 shadow-xs cursor-pointer select-none"
      >
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
          priority
        />
      </div>

      {/* Pure Full Screen Image Overlay (No black box card, no close button, no text) */}
      {isExpanded && (
        <div
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-2 sm:p-6 cursor-zoom-out animate-in fade-in duration-200"
        >
          <div className="relative w-full h-full max-w-7xl max-h-[95vh] flex items-center justify-center">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
              className="object-contain select-none"
              quality={100}
              priority
            />
          </div>
        </div>
      )}

      {/* Structured Grid: Overview, Problem, Solution (Only shown if project does not have a full tutorial article) */}
      {!project.articleContentId && !project.articleContentEn && (
        <>
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
        </>
      )}

      {/* Step-by-Step Lab & Configuration Guide (DiaryConfig / IPCisco Tutorial Style) */}
      {(project.articleContentId || project.articleContentEn) && (
        <Card className="p-6 sm:p-8 border-border/80 bg-card/60 rounded-xl space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-border/40">
            <Terminal className="size-4 text-primary" />
            <h2 className="text-base sm:text-lg font-bold font-sans tracking-tight text-foreground">
              {t("Panduan Konfigurasi & Lab Step-by-Step", "Step-by-Step Lab & Configuration Tutorial")}
            </h2>
          </div>

          <div className="text-muted-foreground font-sans text-sm leading-relaxed space-y-5">
            {(() => {
              const content = (t(project.articleContentId || "", project.articleContentEn || "")).trim();
              const sections = content.split(/\n(?=### )/);

              return sections.map((sec, idx) => {
                const lines = sec.trim().split("\n");
                const headingLine = lines[0].replace(/^###\s+/, "");
                const bodyLines = lines.slice(1);

                return (
                  <div key={idx} className="space-y-3 pt-2">
                    <h3 className="text-sm sm:text-base font-bold font-sans text-foreground flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-primary inline-block" />
                      {headingLine}
                    </h3>

                    {/* Parse content elements: code blocks, tables, lists, text */}
                    {(() => {
                      const textBlock = bodyLines.join("\n");
                      const parts = textBlock.split(/(```[\s\S]*?```|\|[\s\S]*?\|\n\n|\|[\s\S]*?\|$)/g);

                      return parts.map((part, pIdx) => {
                        const trimmed = part.trim();
                        if (!trimmed) return null;

                        // Render CLI Code Block (Refined & Balanced Typography UX)
                        if (trimmed.startsWith("```") && trimmed.endsWith("```")) {
                          const codeLines = trimmed.slice(3, -3).replace(/^[a-z]+\n/, "").trim();
                          
                          // Helper to parse line into prompt + command keyword + arguments with smooth visual hierarchy
                          const renderDiaryConfigLine = (line: string) => {
                            const trimmedLine = line.trim();
                            if (!trimmedLine) return <span>&nbsp;</span>;

                            // Comments: format // in soft muted slate with slight italic
                            if (trimmedLine.startsWith("!")) {
                              const commentText = line.replace(/^\s*!\s*/, "// ");
                              return <span className="text-slate-400 dark:text-zinc-500 font-mono text-[12px] italic select-none">{commentText}</span>;
                            }

                            // Match Cisco prompt like "Router>", "Router#", "R1(config)#", "Router(config-if)#", etc.
                            const promptMatch = line.match(/^(\s*[A-Za-z0-9_-]+(?:\([a-z0-9_-]+\))?[>#])(.*)$/);
                            if (promptMatch) {
                              const prompt = promptMatch[1];
                              const rest = promptMatch[2];
                              const restMatch = rest.match(/^(\s*)([^\s]+)(.*)$/);

                              if (restMatch) {
                                const space = restMatch[1];
                                const cmdKeyword = restMatch[2];
                                const cmdArgs = restMatch[3];

                                return (
                                  <span className="font-mono text-[12.5px] leading-relaxed">
                                    <span className="text-slate-500 dark:text-zinc-400 font-normal select-none mr-0.5">{prompt}</span>
                                    {space}
                                    <span className="text-amber-700 dark:text-amber-400 font-medium">{cmdKeyword}</span>
                                    <span className="text-slate-800 dark:text-zinc-200 font-normal">{cmdArgs}</span>
                                  </span>
                                );
                              }

                              return (
                                <span className="font-mono text-[12.5px] leading-relaxed">
                                  <span className="text-slate-500 dark:text-zinc-400 font-normal select-none mr-0.5">{prompt}</span>
                                  <span className="text-slate-800 dark:text-zinc-200 font-normal">{rest}</span>
                                </span>
                              );
                            }

                            // Status output lines (like "[OK]", "Building configuration...", "Reply from...", etc.)
                            if (trimmedLine.startsWith("[OK]") || trimmedLine.startsWith("[OK") || trimmedLine.includes("OK]")) {
                              return <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[12.5px] font-medium">{line}</span>;
                            }

                            return <span className="text-slate-700 dark:text-zinc-300 font-mono text-[12.5px]">{line}</span>;
                          };

                          return (
                            <div
                              key={pIdx}
                              className="my-3 rounded-lg overflow-x-auto border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/50 p-3.5 sm:p-4.5"
                            >
                              <pre className="font-mono text-[12.5px] leading-[1.55]">
                                <code>
                                  {codeLines.split("\n").map((line, lIdx) => (
                                    <div key={lIdx} className="min-h-[1.35rem]">
                                      {renderDiaryConfigLine(line)}
                                    </div>
                                  ))}
                                </code>
                              </pre>
                            </div>
                          );
                        }

                        // Render Markdown Table
                        if (trimmed.startsWith("|") && trimmed.includes("\n|")) {
                          const tableRows = trimmed
                            .split("\n")
                            .map((r) => r.trim())
                            .filter((r) => r.startsWith("|") && !r.includes("---"));

                          if (tableRows.length > 0) {
                            const headers = tableRows[0]
                              .split("|")
                              .slice(1, -1)
                              .map((c) => c.trim());
                            const rows = tableRows.slice(1).map((r) =>
                              r
                                .split("|")
                                .slice(1, -1)
                                .map((c) => c.trim())
                            );

                            return (
                              <div key={pIdx} className="my-3 overflow-x-auto rounded-lg border border-border/50 bg-background/50">
                                <table className="w-full text-left text-xs font-sans">
                                  <thead className="bg-muted/50 border-b border-border/50 text-foreground font-semibold font-mono text-[11px]">
                                    <tr>
                                      {headers.map((h, hIdx) => (
                                        <th key={hIdx} className="p-2.5 sm:px-3 sm:py-2">
                                          {h.replace(/\*\*/g, "")}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-border/30 font-mono text-[11px]">
                                    {rows.map((row, rIdx) => (
                                      <tr key={rIdx} className="hover:bg-muted/20 transition-colors">
                                        {row.map((cell, cIdx) => (
                                          <td key={cIdx} className="p-2.5 sm:px-3 sm:py-2 text-muted-foreground">
                                            {cell.replace(/\*\*/g, "")}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            );
                          }
                        }

                        // Helper to render bold (**text**), inline code (`code`), and italics (*text*)
                        const renderFormattedText = (str: string) => {
                          const tokens = str.split(/(\*\*.*?\*\*|`.*?`|\*.*?\*)/g);
                          return tokens.map((token, tIdx) => {
                            if (token.startsWith("**") && token.endsWith("**") && token.length >= 4) {
                              return (
                                <strong key={tIdx} className="font-semibold text-foreground">
                                  {token.slice(2, -2)}
                                </strong>
                              );
                            }
                            if (token.startsWith("`") && token.endsWith("`") && token.length >= 2) {
                              return (
                                <code
                                  key={tIdx}
                                  className="px-1.5 py-0.5 rounded-sm bg-muted/80 text-foreground font-mono text-[11px] border border-border/50"
                                >
                                  {token.slice(1, -1)}
                                </code>
                              );
                            }
                            if (token.startsWith("*") && token.endsWith("*") && token.length >= 2) {
                              return (
                                <em key={tIdx} className="italic text-foreground/90">
                                  {token.slice(1, -1)}
                                </em>
                              );
                            }
                            return <React.Fragment key={tIdx}>{token}</React.Fragment>;
                          });
                        };

                        // Render Normal Text, Subheadings, & Lists
                        return (
                          <div key={pIdx} className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                            {trimmed.split("\n").map((line, lIdx) => {
                              const cleanLine = line.trim();
                              if (!cleanLine) return null;

                              if (cleanLine.startsWith("#### ")) {
                                return (
                                  <h4 key={lIdx} className="text-xs sm:text-sm font-bold font-sans text-foreground pt-3">
                                    {renderFormattedText(cleanLine.replace("#### ", ""))}
                                  </h4>
                                );
                              }
                              if (cleanLine.startsWith("> ")) {
                                return (
                                  <div key={lIdx} className="p-3 my-2 rounded-lg bg-primary/5 border-l-2 border-primary text-xs font-sans text-foreground">
                                    {renderFormattedText(cleanLine.replace("> ", ""))}
                                  </div>
                                );
                              }
                              if (cleanLine.startsWith("* ") || cleanLine.startsWith("- ")) {
                                return (
                                  <div key={lIdx} className="flex items-start gap-2 pl-2">
                                    <span className="text-primary mt-0.5 font-bold">•</span>
                                    <span className="leading-relaxed">{renderFormattedText(cleanLine.slice(2))}</span>
                                  </div>
                                );
                              }
                              if (/^\d+\.\s/.test(cleanLine)) {
                                return (
                                  <div key={lIdx} className="flex items-start gap-2 pl-2">
                                    <span className="font-mono text-primary font-bold">{cleanLine.match(/^\d+\./)?.[0]}</span>
                                    <span className="leading-relaxed">{renderFormattedText(cleanLine.replace(/^\d+\.\s+/, ""))}</span>
                                  </div>
                                );
                              }
                              return (
                                <p key={lIdx} className="leading-relaxed">
                                  {renderFormattedText(cleanLine)}
                                </p>
                              );
                            })}
                          </div>
                        );
                      });
                    })()}
                  </div>
                );
              });
            })()}
          </div>
        </Card>
      )}

      {/* Collapsible/Compact Script Config Block */}
      {project.rawConfig && (
        <Card className="p-5 border-border/80 bg-card/60 rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-foreground font-semibold">
              <Terminal className="size-3.5 text-primary" />
              <span>{t("Skrip Konfigurasi Lengkap (Full Device Script)", "Full Device Script / Raw Config")}</span>
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

          <pre
            onWheel={(e) => {
              e.stopPropagation();
            }}
            className="p-4 rounded-lg bg-zinc-50/80 dark:bg-zinc-900/50 font-mono text-[12.5px] max-h-80 overflow-y-auto overscroll-contain border border-zinc-200/80 dark:border-zinc-800/80 leading-[1.55] touch-pan-y"
          >
            <code>
              {project.rawConfig.split("\n").map((line, rIdx) => {
                const trimmedLine = line.trim();
                if (!trimmedLine) return <div key={rIdx} className="min-h-[1.35rem]">&nbsp;</div>;

                if (trimmedLine.startsWith("!")) {
                  const commentText = line.replace(/^\s*!\s*/, "// ");
                  return (
                    <div key={rIdx} className="text-slate-400 dark:text-zinc-500 font-mono text-[12px] italic select-none min-h-[1.35rem]">
                      {commentText}
                    </div>
                  );
                }

                const promptMatch = line.match(/^(\s*[A-Za-z0-9_-]+(?:\([a-z0-9_-]+\))?[>#])(.*)$/);
                if (promptMatch) {
                  const prompt = promptMatch[1];
                  const rest = promptMatch[2];
                  const restMatch = rest.match(/^(\s*)([^\s]+)(.*)$/);

                  if (restMatch) {
                    return (
                      <div key={rIdx} className="min-h-[1.35rem]">
                        <span className="text-slate-500 dark:text-zinc-400 font-normal select-none mr-0.5">{prompt}</span>
                        {restMatch[1]}
                        <span className="text-amber-700 dark:text-amber-400 font-medium">{restMatch[2]}</span>
                        <span className="text-slate-800 dark:text-zinc-200 font-normal">{restMatch[3]}</span>
                      </div>
                    );
                  }

                  return (
                    <div key={rIdx} className="min-h-[1.35rem]">
                      <span className="text-slate-500 dark:text-zinc-400 font-normal select-none mr-0.5">{prompt}</span>
                      <span className="text-slate-800 dark:text-zinc-200 font-normal">{rest}</span>
                    </div>
                  );
                }

                return (
                  <div key={rIdx} className="text-slate-700 dark:text-zinc-300 font-normal min-h-[1.35rem]">
                    {line}
                  </div>
                );
              })}
            </code>
          </pre>
        </Card>
      )}
    </div>
  );
}
