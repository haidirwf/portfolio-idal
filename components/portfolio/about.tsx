"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="py-12 max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
      <h2 className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
        About
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-border bg-card/40 p-6 sm:p-8">
          <div className="space-y-4 text-sm sm:text-base font-sans text-muted-foreground leading-relaxed max-w-3xl">
            <p className="text-foreground font-medium">
              I am a Software Engineer focused on high-performance backends, cloud primitives, and clean frontend engineering.
            </p>
            <p>
              I build low-latency distributed systems, Rust edge tooling, and production Next.js platforms that scale effortlessly under heavy concurrent traffic.
            </p>
            <p>
              My engineering philosophy prioritizes simple architectures, explicit data flows, strong typings, and strict performance metrics over unnecessary abstractions.
            </p>
            <p>
              Currently, I am exploring eBPF networking, Rust concurrency models, and web performance optimization for next-generation edge runtimes.
            </p>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
