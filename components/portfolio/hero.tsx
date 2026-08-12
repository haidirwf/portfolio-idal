"use client";

import { motion } from "motion/react";
import {
  ArrowDown,
  Mail,
  ArrowUpRight,
  Router,
  Server,
  Cpu,
  Globe,
  Wifi,
  ShieldCheck,
  Layers,
  Terminal,
  Activity,
  Radio,
  Lock,
  Cable
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

// Floating background icons pattern for Network Engineering theme
const FLOATING_ICONS = [
  { Icon: Router, top: "10%", left: "6%", size: "size-5 sm:size-6" },
  { Icon: Server, top: "14%", right: "8%", size: "size-5 sm:size-6" },
  { Icon: Cpu, top: "35%", left: "10%", size: "size-4 sm:size-5" },
  { Icon: Globe, top: "40%", right: "12%", size: "size-5 sm:size-6" },
  { Icon: Wifi, top: "65%", left: "8%", size: "size-4 sm:size-5" },
  { Icon: ShieldCheck, top: "70%", right: "9%", size: "size-5 sm:size-6" },
  { Icon: Layers, top: "82%", left: "15%", size: "size-4 sm:size-5" },
  { Icon: Activity, top: "85%", right: "16%", size: "size-4 sm:size-5" },
  { Icon: Lock, top: "22%", left: "22%", size: "size-3.5 sm:size-4" },
  { Icon: Cable, top: "25%", right: "24%", size: "size-3.5 sm:size-4" },
  { Icon: Terminal, top: "78%", left: "28%", size: "size-4" },
  { Icon: Radio, top: "76%", right: "30%", size: "size-4" }
];

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="pt-8 pb-8 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card className="min-h-[360px] sm:min-h-[480px] flex flex-col justify-center items-center text-center overflow-hidden border-border/80 bg-card/60 rounded-xl p-6 sm:p-16 md:p-20 shadow-xs relative">
          {/* Background grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-35 pointer-events-none" />

          {/* Floating Subtle Network Icons (Inspired by shadcn.io landing background) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {FLOATING_ICONS.map((item, idx) => {
              const IconComponent = item.Icon;
              return (
                <div
                  key={idx}
                  style={{ top: item.top, left: item.left, right: item.right }}
                  className={cn(
                    "absolute text-muted-foreground/20 dark:text-muted-foreground/25 transition-all duration-700 pointer-events-none select-none",
                    item.size
                  )}
                >
                  <IconComponent className="w-full h-full" />
                </div>
              );
            })}
          </div>

          <div className="relative space-y-4 sm:space-y-6 max-w-3xl flex flex-col items-center z-10">
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground font-sans leading-tight">
                Muhammad Haidar Rauf Prayogo
              </h1>

              <p className="text-base sm:text-2xl text-muted-foreground font-medium font-sans max-w-2xl leading-snug">
                {t(
                  "Network Engineer | MTCNA & MTCRE | Spesialis Infrastruktur Jaringan Computer & Security",
                  "Network Engineer | MTCNA & MTCRE | Computer Network Infrastructure & Security Specialist"
                )}
              </p>
            </div>

            <p className="text-xs sm:text-base text-muted-foreground/80 font-sans max-w-xl leading-relaxed">
              {t(
                "Fokus pada perancangan jaringan komputer yang aman, andal, efisien, dan skalabel. Bekasi, Jawa Barat, Indonesia.",
                "Focusing on designing secure, reliable, efficient, and scalable computer network infrastructure. Bekasi, West Java, Indonesia."
              )}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <a
                href="#projects"
                className={cn(buttonVariants({ variant: "default", size: "lg" }), "rounded-full font-sans text-xs sm:text-sm font-medium px-6 gap-2 shadow-xs w-full sm:w-auto justify-center")}
              >
                <span>{t("Lihat Topologi", "View Topologies")}</span>
                <ArrowDown className="size-4" />
              </a>

              <a
                href="#contact"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full font-sans text-xs sm:text-sm font-medium px-6 gap-2 bg-background w-full sm:w-auto justify-center")}
              >
                <Mail className="size-4" />
                <span>{t("Kontak", "Contact")}</span>
              </a>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
