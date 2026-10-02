"use client";

import { motion } from "motion/react";
import { Braces, Cloud, Code2, Cpu, GitBranch, Rocket, Settings, Smartphone, Terminal } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { cn } from "@/lib/utils";
import { Reveal, WordsReveal } from "@/components/motion/primitives";

/** Section label: small brand mark between two wavy dashed lines. */
export function SectionTag({ children, className, light }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <span className={cn("relative inline-flex flex-col items-start gap-1", className)}>
      <Wave light={light} />
      <span className="flex items-center gap-2 px-1 text-[15px] font-semibold text-brand">
        <LogoMark tone={light ? "white" : "auto"} className="h-4 w-auto text-foreground" />
        {children}
      </span>
      <Wave light={light} />
    </span>
  );
}

function Wave({ light }: { light?: boolean }) {
  return (
    <svg viewBox="0 0 150 6" className="h-1.5 w-full min-w-28 overflow-visible" preserveAspectRatio="none" aria-hidden>
      <path
        d="M0 3 Q 6.25 0 12.5 3 T 25 3 T 37.5 3 T 50 3 T 62.5 3 T 75 3 T 87.5 3 T 100 3 T 112.5 3 T 125 3 T 137.5 3 T 150 3"
        fill="none"
        stroke={light ? "rgba(255,255,255,.6)" : "currentColor"}
        className={light ? undefined : "text-foreground"}
        strokeWidth="1"
        strokeDasharray="3 2"
      />
    </svg>
  );
}

/**
 * Concave corner piece used to build "notched" cards. It paints the page
 * background (`--notch-bg`) with a quarter circle cut out of it.
 * `at` is which corner of this square the circle is centred on.
 */
export function InverseCorner({
  className,
  at = "bl",
  size = 28,
  style,
}: {
  className?: string;
  at?: "tl" | "tr" | "bl" | "br";
  size?: number;
  style?: React.CSSProperties;
}) {
  const pos = { tl: "0% 0%", tr: "100% 0%", bl: "0% 100%", br: "100% 100%" }[at];
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
      style={{
        ...style,
        width: size,
        height: size,
        background: `radial-gradient(circle at ${pos}, transparent ${size - 0.5}px, var(--notch-bg, #fff) ${size}px)`,
      }}
    />
  );
}

/** A rounded media card with a cut-out notch in one corner holding `slot`. */
export function NotchCard({
  children,
  slot,
  corner = "tr",
  notch = 84,
  radius = 28,
  className,
}: {
  children: React.ReactNode;
  slot: React.ReactNode;
  corner?: "tr" | "br";
  notch?: number;
  radius?: number;
  className?: string;
}) {
  const top = corner === "tr";
  const at = top ? "bl" : "tl";
  const edge = top ? "top" : "bottom";
  return (
    <div className={cn("relative overflow-hidden rounded-[2rem]", className, top ? "rounded-tr-none" : "rounded-br-none")}>
      {children}
      <span
        className={cn(
          "absolute right-0 z-10 grid place-items-center bg-[var(--notch-bg,#fff)]",
          top ? "top-0 rounded-bl-[1.75rem]" : "bottom-0 rounded-tl-[1.75rem]"
        )}
        style={{ width: notch, height: notch }}
      >
        {slot}
      </span>
      <InverseCorner size={radius} at={at} className="z-10" style={{ [edge]: 0, right: notch }} />
      <InverseCorner size={radius} at={at} className="z-10" style={{ [edge]: notch, right: 0 }} />
    </div>
  );
}

/** Text running around a circle that slowly rotates. */
export function RotatingBadge({ text, className, children }: { text: string; className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("relative grid size-36 place-items-center", className)}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slow" aria-hidden>
        <defs>
          <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-current text-[10.5px] font-semibold tracking-[0.2em] uppercase">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      {children}
    </div>
  );
}

const DOODLE_ICONS = [Code2, Cloud, Rocket, Cpu, Braces, GitBranch, Settings, Smartphone, Terminal];

/** Faint floating line-art icons scattered behind a section. */
export function Doodles({
  items,
  className,
}: {
  items: { x: string; y: string; size?: number; rotate?: number; icon?: number }[];
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {items.map((d, i) => {
        const Icon = DOODLE_ICONS[(d.icon ?? i) % DOODLE_ICONS.length];
        return (
          <motion.span
            key={i}
            className="absolute text-foreground/[0.07]"
            style={{ left: d.x, top: d.y, rotate: d.rotate ?? 0 }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          >
            <Icon strokeWidth={1} style={{ width: d.size ?? 72, height: d.size ?? 72 }} />
          </motion.span>
        );
      })}
    </div>
  );
}

/** Tag + large heading used at the top of most sections. */
export function SectionHeading({
  tag,
  title,
  highlight = [],
  body,
  center,
  light,
  className,
}: {
  tag: string;
  title: string;
  highlight?: string[];
  body?: string;
  center?: boolean;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(center && "mx-auto text-center", className)}>
      <Reveal className={cn(center && "flex justify-center")}>
        <SectionTag light={light}>{tag}</SectionTag>
      </Reveal>
      <h2
        className={cn(
          "mt-5 text-[2.1rem] leading-[1.15] font-bold tracking-[-0.03em] sm:text-5xl sm:leading-[1.15]",
          light ? "text-white" : "text-foreground",
          center && "mx-auto max-w-3xl"
        )}
      >
        <WordsReveal inView text={title} highlight={highlight} />
      </h2>
      {body && (
        <Reveal delay={0.15}>
          <p className={cn("mt-5 text-[17px] leading-relaxed", light ? "text-white/75" : "text-muted-foreground", center && "mx-auto max-w-xl")}>
            {body}
          </p>
        </Reveal>
      )}
    </div>
  );
}
