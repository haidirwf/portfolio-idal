"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ShieldAlert, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";

interface ConfirmationState {
  isOpen: boolean;
  title: string;
  url: string;
}

const ExternalLinkContext = React.createContext<{
  openConfirmation: (url: string, title: string) => void;
}>({
  openConfirmation: () => {},
});

export const useExternalLinkConfirm = () => React.useContext(ExternalLinkContext);

export function ExternalLinkConfirmProvider({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const [config, setConfig] = React.useState<ConfirmationState>({
    isOpen: false,
    title: "",
    url: "",
  });

  const openConfirmation = (url: string, title: string) => {
    setConfig({
      isOpen: true,
      title,
      url,
    });
  };

  const handleClose = () => {
    setConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const handleConfirm = () => {
    if (config.url) {
      window.open(config.url, "_blank", "noopener,noreferrer");
    }
    handleClose();
  };

  return (
    <ExternalLinkContext.Provider value={{ openConfirmation }}>
      {children}

      <AnimatePresence>
        {config.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-sm bg-card border border-border/80 rounded-2xl p-6 shadow-2xl space-y-5 text-center overflow-hidden z-10"
            >
              <div className="mx-auto size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                <ExternalLink className="size-6" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-base font-bold font-sans text-foreground leading-snug">
                  {t("Buka Halaman Eksternal?", "Open External Page?")}
                </h3>
                <p className="text-xs font-sans text-muted-foreground leading-relaxed">
                  {t(
                    `Anda akan diarahkan ke halaman eksternal untuk ${config.title}.`,
                    `You are about to open the external page for ${config.title}.`
                  )}
                </p>
                <div className="pt-2">
                  <span className="inline-block max-w-full truncate px-2.5 py-1 rounded-md bg-secondary/60 text-[11px] font-mono text-muted-foreground border border-border/40">
                    {config.url}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClose}
                  className="rounded-xl font-sans text-xs font-semibold"
                >
                  {t("Batal", "Cancel")}
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleConfirm}
                  className="rounded-xl font-sans text-xs font-semibold gap-1"
                >
                  <span>{t("Buka", "Open")}</span>
                  <ArrowUpRight className="size-3.5" />
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ExternalLinkContext.Provider>
  );
}
