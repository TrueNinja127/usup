"use client";

import { motion } from "motion/react";
import { ChevronUp } from "lucide-react";
import { EASE } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";

// Fixed positions keep server and client renders identical.
const PARTICLES = [
  { x: 6, size: 14, dur: 9, delay: 0 },
  { x: 14, size: 10, dur: 12, delay: 3 },
  { x: 23, size: 18, dur: 10, delay: 6 },
  { x: 35, size: 12, dur: 13, delay: 1.5 },
  { x: 47, size: 16, dur: 11, delay: 7.5 },
  { x: 58, size: 10, dur: 9.5, delay: 4 },
  { x: 66, size: 20, dur: 12.5, delay: 2 },
  { x: 74, size: 12, dur: 10.5, delay: 8 },
  { x: 83, size: 16, dur: 11.5, delay: 5 },
  { x: 92, size: 10, dur: 9, delay: 0.8 },
];

/** Chevrons that drift slowly upward — a quiet, constant sense of lift. */
export function RisingParticles({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className={cn("absolute -bottom-8", i % 3 === 0 ? "text-brand" : "text-white")}
          style={{ left: `${p.x}%` }}
          animate={{ y: [0, -900], opacity: [0, 0.55, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "linear" }}
        >
          <ChevronUp strokeWidth={3} style={{ width: p.size, height: p.size }} />
        </motion.span>
      ))}
    </div>
  );
}

/** The logo's rising arrow, drawn as a stroke. Used to underline "Up". */
export function UpSwoosh({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" aria-hidden className={cn("overflow-visible", className)}>
      <motion.path
        d="M4 92 C 44 88, 84 64, 104 18"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay, duration: 1, ease: EASE }}
      />
      <motion.path
        d="M86 22 L106 8 L110 32"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0, x: -10, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: delay + 0.85, duration: 0.4, ease: EASE }}
      />
    </svg>
  );
}

const STAIRS = [
  { label: "Idea", h: 28 },
  { label: "MVP", h: 48 },
  { label: "Launch", h: 70 },
  { label: "Scale", h: 96 },
];

/** Ascending bars with a dashed growth line rising across their tops. */
export function GrowthStairs({ className }: { className?: string }) {
  // Chart area is 300×132; bars are 60 wide with 20px gaps.
  const W = 60, GAP = 20, H = 132;
  const tops = STAIRS.map((s, i) => [i * (W + GAP) + W / 2, H - (s.h / 100) * H - 14] as const);
  const d = "M " + tops.map(([x, y]) => `${x} ${y}`).join(" L ");
  const [ex, ey] = tops[tops.length - 1];

  return (
    <div className={cn("relative w-[300px]", className)}>
      <div className="relative h-[132px]">
        {STAIRS.map((s, i) => (
          <motion.div
            key={s.label}
            className={cn(
              "absolute bottom-0 rounded-t-xl",
              i === STAIRS.length - 1 ? "bg-brand" : "bg-brand/15 dark:bg-brand/25"
            )}
            style={{ left: i * (W + GAP), width: W }}
            initial={{ height: 0 }}
            whileInView={{ height: `${s.h}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.15, duration: 0.8, ease: EASE }}
          />
        ))}
        <svg viewBox={`0 0 300 ${H}`} className="absolute inset-0 size-full overflow-visible" aria-hidden>
          <motion.path
            d={d}
            fill="none"
            stroke="var(--foreground)"
            strokeWidth="2"
            strokeDasharray="5 5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 1.1, ease: EASE }}
          />
        </svg>
        <motion.span
          className="absolute grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-foreground text-background shadow-lg"
          style={{ left: ex, top: ey }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.9, type: "spring", stiffness: 300, damping: 14 }}
        >
          <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
            <ChevronUp className="size-5" strokeWidth={3} />
          </motion.span>
        </motion.span>
      </div>
      <div className="mt-2.5 flex" style={{ gap: GAP }}>
        {STAIRS.map((s) => (
          <span key={s.label} className="text-center text-xs font-semibold tracking-wide text-muted-foreground uppercase" style={{ width: W }}>
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
