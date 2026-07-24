"use client";

import { motion } from "motion/react";
import { ArrowDown, Mail, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="pt-20 pb-8 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card className="min-h-[420px] sm:min-h-[480px] flex flex-col justify-center items-center text-center overflow-hidden border-border/80 bg-card/60 rounded-3xl p-8 sm:p-16 md:p-20 shadow-xs relative">
          {/* Background grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          <div className="relative space-y-6 max-w-3xl flex flex-col items-center">
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground font-sans leading-none">
                Muhammad Haidar Rauf Prayogo
              </h1>

              <p className="text-lg sm:text-2xl text-muted-foreground font-medium font-sans max-w-2xl leading-snug">
                {t(
                  "Network Engineer | MTCNA & MTCRE | Spesialis Infrastruktur Jaringan Computer & Security",
                  "Network Engineer | MTCNA & MTCRE | Computer Network Infrastructure & Security Specialist"
                )}
              </p>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground/80 font-sans max-w-xl leading-relaxed">
              {t(
                "Fokus pada perancangan jaringan komputer yang aman, andal, efisien, dan skalabel. Cikarang Selatan, Jawa Barat, Indonesia.",
                "Focusing on designing secure, reliable, efficient, and scalable computer network infrastructure. Cikarang Selatan, West Java, Indonesia."
              )}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#projects"
                className={cn(buttonVariants({ variant: "default", size: "lg" }), "rounded-full font-sans text-xs sm:text-sm font-medium px-6 gap-2")}
              >
                <span>{t("Lihat Topologi", "View Topologies")}</span>
                <ArrowDown className="size-4" />
              </a>

              <a
                href="#contact"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full font-sans text-xs sm:text-sm font-medium px-6 gap-2 bg-background")}
              >
                <Mail className="size-4" />
                <span>{t("Kontak", "Contact")}</span>
              </a>

              <a
                href="https://github.com/haidirwf"
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "rounded-full font-sans text-xs sm:text-sm gap-1.5 text-muted-foreground px-4")}
              >
                <span>GitHub</span>
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
