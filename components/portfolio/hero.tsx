"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

const GREETINGS = ["Halo", "Hello", "Assalamu’alaikum"];

export function Hero() {
  const { t } = useLanguage();
  const [greetingIndex, setGreetingIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-10 sm:py-14 space-y-6">
      {/* Identity row */}
      <div className="flex items-center gap-4 sm:gap-5">
        {/* Avatar */}
        <div className="size-14 sm:size-16 rounded-2xl overflow-hidden border border-border shadow-xs -rotate-3 hover:rotate-0 hover:scale-105 transition-transform duration-300 relative shrink-0 bg-secondary">
          <Image
            src="/haidarphoto.webp"
            alt="Muhammad Haidar Rauf Prayogo"
            width={64}
            height={64}
            className="size-full object-cover object-top"
            priority
          />
        </div>

        {/* Greeting + Name + Role */}
        <div className="min-w-0">
          <div className="h-5 overflow-hidden text-xs sm:text-[13px] font-medium text-muted-foreground mb-1">
            <span
              key={greetingIndex}
              className="inline-block animate-in fade-in slide-in-from-bottom-1 duration-300"
            >
              {GREETINGS[greetingIndex]}
            </span>
          </div>

          <h1 className="text-2xl sm:text-[34px] font-semibold tracking-tight leading-tight text-foreground">
            Muhammad Haidar Rauf Prayogo
          </h1>

          <p className="text-xs sm:text-[14.5px] text-muted-foreground mt-1">
            {t("Network Engineer · Siswa TKJ di ", "Network Engineer · Networking Student at ")}
            <a
              href="https://idn.sch.id"
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
            >
              IDN Boarding School Solo
            </a>
          </p>
        </div>
      </div>

      {/* Lead Paragraph with Inline Chips */}
      <p className="max-w-[620px] text-[15px] sm:text-[17px] leading-[1.7] text-muted-foreground tracking-tight">
        {t(
          "Saya merancang dan mengonfigurasi infrastruktur jaringan komputer, dari simulasi topologi enterprise hingga pengerasan keamanan edge router. Tersertifikasi ",
          "I design and configure computer network infrastructure, from enterprise topology simulations to edge router security hardening. Certified "
        )}
        <span className="inline-flex items-center px-2 py-0.5 mx-0.5 rounded-md border border-border bg-secondary/60 text-xs sm:text-sm font-medium text-foreground">
          MTCNA
        </span>
        {t(" & ", " & ")}
        <span className="inline-flex items-center px-2 py-0.5 mx-0.5 rounded-md border border-border bg-secondary/60 text-xs sm:text-sm font-medium text-foreground">
          MTCRE
        </span>
        {t(
          ", dengan fokus mendalam pada ",
          ", with deep focus on "
        )}
        <Link
          href="/#projects"
          className="inline-flex items-center px-2 py-0.5 mx-0.5 rounded-md border border-border bg-secondary/60 text-xs sm:text-sm font-medium text-foreground hover:border-foreground/40 transition-colors"
        >
          Inter-VLAN
        </Link>
        {t(", redistribusi routing dinamis ", ", dynamic routing redistribution ")}
        <span className="inline-flex items-center px-2 py-0.5 mx-0.5 rounded-md border border-border bg-secondary/60 text-xs sm:text-sm font-medium text-foreground">
          OSPF & EIGRP
        </span>
        {t(", serta filtrasi akses ", ", and access filtering via ")}
        <span className="inline-flex items-center px-2 py-0.5 mx-0.5 rounded-md border border-border bg-secondary/60 text-xs sm:text-sm font-medium text-foreground">
          ACL & NAT
        </span>
        {t(".", ".")}
      </p>

      {/* Quick Hero Links */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-sm font-medium">
        <a
          href="https://wa.me/6282173662010"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
        >
          <span>{t("Hubungi via WhatsApp", "Chat on WhatsApp")}</span>
          <ArrowUpRight className="size-3.5" />
        </a>

        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
        >
          <span>{t("Kirim Email", "Email me")}</span>
        </a>

        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
        >
          <span>{t("Lihat Semua Proyek", "Browse all projects")}</span>
          <ArrowRight className="size-3" />
        </Link>
      </div>
    </section>
  );
}
