"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";

interface Certificate {
  code: string;
  name: string;
  image: string;
}

const CERTIFICATIONS: Certificate[] = [
  {
    code: "MTCNA",
    name: "MikroTik Certified Network Associate",
    image: "/certificates/MTCNA.webp",
  },
  {
    code: "MTCRE",
    name: "MikroTik Certified Routing Engineer",
    image: "/certificates/MTCNA.webp",
  },
  {
    code: "CCNA",
    name: "Cisco Certified Network Associate",
    image: "/certificates/MTCNA.webp",
  }
];

export function Certifications() {
  const { t } = useLanguage();
  const [selectedCert, setSelectedCert] = React.useState<Certificate | null>(null);

  // Handle ESC key for fullscreen lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };

    if (selectedCert) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCert]);

  return (
    <section id="certifications" className="py-12 px-4 sm:px-6 space-y-8 relative scroll-mt-20">
      {/* Header Section */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
          {t("Sertifikat", "Certifications")}
        </h2>
        <p className="text-sm text-muted-foreground font-sans">
          {t(
            "Sertifikasi kompetensi jaringan MikroTik dan Cisco.",
            "Networking certifications from MikroTik and Cisco."
          )}
        </p>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {CERTIFICATIONS.map((cert, idx) => (
          <motion.div
            key={cert.code}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: idx * 0.05 }}
          >
            <Card
              onClick={() => setSelectedCert(cert)}
              className="border-border/80 bg-card/60 rounded-xl overflow-hidden shadow-xs hover:border-primary/50 hover:bg-card/90 hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              {/* Certificate Image */}
              <div className="relative aspect-[16/10] w-full bg-secondary/30 overflow-hidden border-b border-border/60">
                <Image
                  src={cert.image}
                  alt={`${cert.code} - ${cert.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={idx === 0}
                />
              </div>

              {/* Title & Code */}
              <div className="p-4 space-y-1 text-center">
                <h3 className="text-base sm:text-lg font-bold font-sans text-foreground group-hover:text-primary transition-colors">
                  {cert.code}
                </h3>
                <p className="text-xs text-muted-foreground font-sans font-medium">
                  {cert.name}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Certificate Image Lightbox Modal */}
      {selectedCert && typeof document !== "undefined" && createPortal(
        <div
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 w-screen h-screen z-[9999] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 cursor-zoom-out animate-in fade-in duration-200"
          style={{ margin: 0, top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Top Bar with Title & Close Button */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl flex items-center justify-between pb-3 text-white cursor-default"
          >
            <span className="text-sm sm:text-base font-bold font-sans">
              {selectedCert.code} — {selectedCert.name}
            </span>

            <button
              type="button"
              onClick={() => setSelectedCert(null)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Certificate Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[70vh] sm:h-[80vh] flex items-center justify-center rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 cursor-default"
          >
            <Image
              src={selectedCert.image}
              alt={`${selectedCert.code} - ${selectedCert.name}`}
              fill
              sizes="100vw"
              className="object-contain select-none"
              quality={100}
              priority
            />
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
