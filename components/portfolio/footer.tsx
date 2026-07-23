import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="py-8 max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
      <Separator className="bg-border/60" />
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-muted-foreground gap-2">
        <div>
          © {new Date().getFullYear()} Haidar Rauf. All rights reserved.
        </div>
        <div>
          Built using Next.js + shadcn/ui
        </div>
      </div>
    </footer>
  );
}
