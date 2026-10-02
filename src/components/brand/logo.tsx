"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const RED = "#E91D25";

const MARK = {
  redHead: { cx: 33, cy: 21, r: 8 },
  redBody: "M3 70 C 18 67, 31 55, 35 35 L 45 37 C 41 59, 24 71, 3 70 Z",
  inkHead: { cx: 56, cy: 13, r: 9 },
  inkBody: "M21 74 C 38 70, 52 54, 55 29 L 66 31 C 62 58, 45 73, 21 74 Z",
  arrowShaft: "M40 76 C 63 72, 79 59, 86 37 L 92 40 C 84 63, 66 75, 40 76 Z",
  arrowHead: "M80 32 L 99 14 L 97 42 Z",
};

type MarkProps = {
  className?: string;
  /** Color of the second figure — ink on light backgrounds, white on dark. */
  tone?: "ink" | "white" | "auto";
  /** Render every piece in the tone color — the brand's one-color version, for use on red. */
  mono?: boolean;
  /** Assemble the mark piece by piece on mount. */
  animated?: boolean;
  delay?: number;
};

const piece: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.6 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay, type: "spring", stiffness: 260, damping: 18 },
  }),
};

const arrow: Variants = {
  hidden: { opacity: 0, x: -18, y: 18 },
  show: (delay: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: { delay, type: "spring", stiffness: 140, damping: 16 },
  }),
};

export function LogoMark({ className, tone = "white", mono = false, animated = false, delay = 0 }: MarkProps) {
  // "auto" follows the surrounding text color, so the mark adapts to light/dark themes.
  const second = tone === "ink" ? "#0A0A0A" : tone === "auto" ? "currentColor" : "#FFFFFF";
  const red = mono ? second : RED;
  const motionProps = animated ? { initial: "hidden", animate: "show" } : {};
  const o = (step: number) => delay + step * 0.12;

  return (
    <motion.svg
      viewBox="0 0 100 80"
      aria-hidden
      className={cn("overflow-visible", className)}
      {...motionProps}
    >
      <motion.path d={MARK.redBody} fill={red} variants={piece} custom={o(0)} style={{ originX: 0.3, originY: 1 }} />
      <motion.circle {...MARK.redHead} fill={red} variants={piece} custom={o(1)} />
      <motion.path d={MARK.inkBody} fill={second} variants={piece} custom={o(2)} style={{ originX: 0.4, originY: 1 }} />
      <motion.circle {...MARK.inkHead} fill={second} variants={piece} custom={o(3)} />
      <motion.g variants={arrow} custom={o(4)}>
        <path d={MARK.arrowShaft} fill={red} />
        <path d={MARK.arrowHead} fill={red} />
      </motion.g>
    </motion.svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-bold tracking-[-0.02em]", className)}>
      usup<span className="text-[#E91D25]">.</span>io
    </span>
  );
}

export function Logo({ className, tone = "white" }: { className?: string; tone?: "ink" | "white" }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark tone={tone} className="h-7 w-auto" />
      <Wordmark className={cn("text-xl", tone === "ink" ? "text-ink" : "text-white")} />
    </span>
  );
}
