"use client";

import * as React from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import fallbackSnapshot from "@/lib/github-contributions-snapshot.json";
import { createQuietSnake } from "@/lib/quiet-snake";
import { useLanguage } from "@/components/language-provider";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionsPayload {
  total: {
    lastYear: number;
  };
  contributions: ContributionDay[];
}

export function GithubActivity() {
  const { t } = useLanguage();
  const rootRef = React.useRef<HTMLElement>(null);
  const [data, setData] = React.useState<ContributionsPayload>(fallbackSnapshot as ContributionsPayload);
  const [updatedAt, setUpdatedAt] = React.useState<string>(new Date().toISOString());

  // Fetch live contributions
  React.useEffect(() => {
    let active = true;
    async function fetchActivity() {
      try {
        const res = await fetch("/api/github-activity");
        if (!res.ok) return;
        const json = await res.json();
        if (active && json.contributions && Array.isArray(json.contributions)) {
          setData(json);
          setUpdatedAt(new Date().toISOString());
        }
      } catch {
        // keep fallback data
      }
    }
    fetchActivity();
    return () => {
      active = false;
    };
  }, []);

  // Initialize interactive snake engine
  React.useEffect(() => {
    if (!rootRef.current) return;
    const engine = createQuietSnake(rootRef.current);
    return () => {
      engine.destroy();
    };
  }, [data]);

  const total = data.total?.lastYear || data.contributions.reduce((acc, c) => acc + c.count, 0);
  const firstDay = data.contributions[0]?.date
    ? new Date(data.contributions[0].date + "T00:00:00Z").getUTCDay()
    : 0;
  const columns = Math.ceil((firstDay + data.contributions.length) / 7);

  return (
    <section ref={rootRef} className="py-8 sm:py-10 space-y-5" data-github-activity>
      {/* Head */}
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-primary font-semibold">05</span>
          <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
            {t("Aktivitas GitHub", "On GitHub")}
          </h2>
        </div>

        <a
          href="https://github.com/haidirwf"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
        >
          <span>@haidirwf</span>
          <ArrowUpRight className="size-3" />
        </a>
      </div>

      {/* SVG GitHub Contributions & Snake Board */}
      <div
        tabIndex={0}
        role="group"
        aria-label="GitHub contributions and snake game"
        data-snake-board
        className="relative overflow-x-auto p-3 sm:p-4 rounded-xl border border-border bg-card/40 focus:outline-none focus:ring-1 focus:ring-primary/40 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={
          {
            "--green-0": "var(--gh-0, #ebedf0)",
            "--green-1": "var(--gh-1, #9be9a8)",
            "--green-2": "var(--gh-2, #40c463)",
            "--green-3": "var(--gh-3, #30a14e)",
            "--green-4": "var(--gh-4, #216e39)",
            "--accent": "var(--primary)",
          } as React.CSSProperties
        }
      >
        <style jsx>{`
          :global(.dark) [data-snake-board] {
            --gh-0: #161b22;
            --gh-1: #0e4429;
            --gh-2: #006d32;
            --gh-3: #26a641;
            --gh-4: #39d353;
          }
          [data-snake-segment] {
            stroke: #10b981;
            stroke-linecap: round;
          }
          :global(.dark) [data-snake-segment] {
            stroke: #34d399;
          }
          [data-snake-head] ellipse {
            fill: #059669;
          }
          :global(.dark) [data-snake-head] ellipse {
            fill: #10b981;
          }
          [data-snake-eye] {
            fill: #064e3b;
          }
          :global(.dark) [data-snake-eye] {
            fill: #022c22;
          }
          [data-snake-tongue] {
            fill: none;
            stroke: #ef4444;
            stroke-width: 0.9;
            stroke-linecap: round;
            transform-box: fill-box;
            transform-origin: 0 50%;
            animation: tongue 1.8s ease-in-out infinite;
          }
          @keyframes tongue {
            0%, 62%, 100% { transform: scaleX(0); }
            70%, 82% { transform: scaleX(1); }
          }
          [data-snake-food] {
            fill: #f59e0b;
            stroke: var(--background);
            stroke-width: 1.5;
          }
        `}</style>

        <svg
          viewBox={`-2 0 ${columns * 11 + 4} 110`}
          data-columns={columns}
          className="w-full h-auto min-w-[580px] block select-none"
          role="img"
          aria-label="GitHub contributions over the past year"
        >
          {/* Days contribution tiles */}
          <g>
            {data.contributions.map((entry, i) => {
              const col = Math.floor((i + firstDay) / 7);
              const row = (i + firstDay) % 7;
              return (
                <rect
                  key={entry.date}
                  data-contribution
                  data-col={col}
                  data-row={row}
                  data-level={entry.level}
                  x={col * 11}
                  y={row * 11 + 16}
                  width={8}
                  height={8}
                  rx={2}
                  style={{ fill: `var(--green-${entry.level})` }}
                  className="transition-colors duration-200"
                >
                  <title>{`${entry.count} kontribusi · ${entry.date}`}</title>
                </rect>
              );
            })}
          </g>

          {/* Snake Animated Layer */}
          <g aria-hidden="true" data-snake-body opacity="0">
            {Array.from({ length: 40 }, (_, i) => (
              <line key={i} data-snake-segment opacity="0" />
            ))}
            <g data-snake-head>
              <path
                data-snake-tongue
                d="M4.5 0h3.6M8.1 0l1.7-1.5M8.1 0l1.7 1.5"
              />
              <ellipse rx="5" ry="4.3" />
              <circle data-snake-eye cx="1.6" cy="-2" r="1.05" />
              <circle data-snake-eye cx="1.6" cy="2" r="1.05" />
            </g>
          </g>

          {/* Target Food for Snake Game */}
          <circle data-snake-food r="3" opacity="0" />
        </svg>
      </div>

      {/* Stats and Snake Controls */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs font-mono text-muted-foreground">
        <div>
          <strong className="text-foreground font-semibold">
            {total.toLocaleString()} {t("kontribusi", "contributions")}
          </strong>
          <span> {t("dalam setahun terakhir", "in the past year")}</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <button
            type="button"
            data-snake-pause
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            {t("Jeda ular", "Pause snake")}
          </button>
          <span>·</span>
          <button
            type="button"
            data-snake-play
            className="text-foreground hover:underline underline-offset-4 cursor-pointer"
          >
            {t("Mainkan game", "Play a round")}
          </button>
        </div>
      </div>

      {/* On-screen Direction Controls (Visible in Play Mode) */}
      <div
        className="flex items-center justify-between gap-4 pt-1 text-xs text-muted-foreground border-t border-border/50"
        data-snake-controls
        hidden
      >
        <span data-snake-status role="status" className="font-mono text-[11.5px]">
          {t("Gunakan tombol panah keyboard atau tombol kendali.", "Use arrow keys or touch controls.")}
        </span>

        <div className="flex items-center gap-1.5 shrink-0">
          {[
            ["up", "↑"],
            ["left", "←"],
            ["down", "↓"],
            ["right", "→"],
          ].map(([dir, label]) => (
            <button
              key={dir}
              type="button"
              data-snake-direction={dir}
              aria-label={`Move snake ${dir}`}
              className="size-7 rounded border border-border bg-secondary/60 hover:bg-secondary text-foreground grid place-items-center font-bold text-xs cursor-pointer active:scale-95 transition-transform"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
