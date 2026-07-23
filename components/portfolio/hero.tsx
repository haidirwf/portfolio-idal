"use client";

import { motion } from "motion/react";
import { ArrowDown, Mail, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="pt-24 pb-8 max-w-6xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card className="min-h-[50vh] sm:min-h-[55vh] flex flex-col justify-center overflow-hidden border-border bg-card/50 p-8 sm:p-14 md:p-16 hover:bg-card transition-all duration-300">
          <div className="space-y-6 max-w-4xl">
            <div className="space-y-3">
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground font-sans">
                Alex Rivera
              </h1>

              <p className="text-2xl sm:text-3xl text-muted-foreground font-medium font-sans leading-tight">
                Systems & Full-Stack Engineer crafting distributed tools & low-latency cloud architectures.
              </p>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground/80 font-sans max-w-3xl leading-relaxed">
              Show the work first. Explain later. Clean engineering, zero bloat.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className={cn(buttonVariants({ variant: "default", size: "lg" }), "font-sans text-sm gap-2 px-5")}
              >
                <span>View Projects</span>
                <ArrowDown className="size-4" />
              </a>

              <a
                href="#contact"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "font-sans text-sm gap-2 px-5")}
              >
                <Mail className="size-4" />
                <span>Contact</span>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "font-sans text-sm gap-1.5 text-muted-foreground px-4")}
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
