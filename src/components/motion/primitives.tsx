"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useSpring,
  type HTMLMotionProps,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades + lifts its children into view once, when scrolled to. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers `StaggerItem` children as it enters the viewport. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Splits a heading into words that rise in one after another. */
export function WordsReveal({
  text,
  className,
  delay = 0,
  highlight = [],
  inView = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  /** Words (exact match) rendered in brand red. */
  highlight?: string[];
  /** Trigger on scroll instead of on mount. */
  inView?: boolean;
}) {
  const words = text.split(" ");
  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, margin: "-80px" } }
    : { animate: "show" };

  return (
    <motion.span
      initial="hidden"
      {...trigger}
      variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
      className={cn("inline", className)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top" aria-hidden>
          <motion.span
            className={cn("inline-block", highlight.includes(word) && "text-brand")}
            variants={{
              hidden: { y: "110%", opacity: 0, rotate: 4 },
              show: { y: "0%", opacity: 1, rotate: 0, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {word}
            {highlight.includes(word) && isUpWord(word) && <UpTick />}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}

const isUpWord = (word: string) => word.replace(/[^a-z]/gi, "").toLowerCase() === "up";

/** Small bobbing arrow that follows every highlighted "up" — the brand's rising motif. */
export function UpTick({ className }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={cn("ml-[0.06em] inline-block align-top text-brand", className)}
      animate={{ x: [0, 3, 0], y: [0, -4, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <ArrowUpRight className="mt-[0.14em] size-[0.55em]" strokeWidth={3.2} />
    </motion.span>
  );
}

/** Counts from 0 to `value` the first time it is visible. */
export function CountUp({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 2,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Pulls its child slightly toward the cursor while hovered. */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={cn("inline-block", className)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

