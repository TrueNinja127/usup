"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useMotionValueEvent, useSpring } from "motion/react";
import { ChevronLeft, ChevronRight, CircleCheckBig } from "lucide-react";
import { EASE } from "@/components/motion/primitives";
import { Doodles, NotchCard, SectionHeading } from "@/components/decor";

const STEPS = [
  {
    title: "Discover & plan",
    body: "Workshops with your team to map users, goals and constraints. You leave with a scoped roadmap and a fixed quote.",
  },
  {
    title: "Design & prototype",
    body: "Clickable prototypes tested with real users, plus a design system your engineers will enjoy using.",
  },
  {
    title: "Build, launch & grow",
    body: "Two-week sprints, weekly demos and production releases from the very first sprint — then we measure and iterate.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-24 sm:py-32 [--notch-bg:var(--background)]">
      <Doodles
        items={[
          { x: "3%", y: "6%", size: 80, rotate: -10, icon: 0 },
          { x: "22%", y: "2%", size: 56, rotate: 14, icon: 4 },
          { x: "70%", y: "4%", size: 64, rotate: -6, icon: 2 },
          { x: "92%", y: "16%", size: 72, rotate: 10, icon: 5 },
        ]}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          center
          tag="How We Work"
          title="Every step takes your idea further up"
          highlight={["up"]}
          body="Drag the slider to see how a whiteboard idea becomes a shipped product."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE }}
          >
            <Compare />
          </motion.div>

          <ol className="flex flex-col gap-6">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
                className="group flex-1"
              >
                <NotchCard
                  corner="tr"
                  notch={68}
                  radius={22}
                  className="h-full rounded-[1.75rem] bg-muted transition-colors duration-500 group-hover:bg-ink dark:group-hover:bg-card"
                  slot={<span className="text-3xl font-bold text-foreground">0{i + 1}</span>}
                >
                  <div className="flex gap-5 p-7 pr-20 sm:p-9 sm:pr-24">
                    <CircleCheckBig className="mt-1 size-7 shrink-0 text-foreground transition-colors duration-500 group-hover:text-brand" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground transition-colors duration-500 group-hover:text-white sm:text-2xl">
                        {s.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-white/70">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </NotchCard>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Before / after image comparison with a draggable handle. */
function Compare() {
  const ref = useRef<HTMLDivElement>(null);
  const target = useMotionValue(50);
  const pos = useSpring(target, { stiffness: 300, damping: 35 });
  const [clip, setClip] = useState(50);
  const dragging = useRef(false);

  useMotionValueEvent(pos, "change", (v) => setClip(v));

  const update = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    target.set(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3.4] touch-pan-y overflow-hidden rounded-[2rem] select-none lg:aspect-auto lg:h-full lg:min-h-[560px]"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clip)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") target.set(Math.max(0, target.get() - 5));
        if (e.key === "ArrowRight") target.set(Math.min(100, target.get() + 5));
      }}
    >
      <Image src="/images/after.jpg" alt="Finished mobile app" fill sizes="(min-width:1024px) 45vw, 90vw" className="object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - clip}% 0 0)` }}>
        <Image
          src="/images/before.jpg"
          alt="Wireframe sketch"
          fill
          sizes="(min-width:1024px) 45vw, 90vw"
          className="object-cover grayscale"
          draggable={false}
        />
      </div>

      <span className="absolute top-5 left-5 rounded-full bg-ink/70 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">Before</span>
      <span className="absolute top-5 right-5 rounded-full bg-brand px-4 py-1.5 text-sm font-medium text-white">After</span>

      <div className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white" style={{ left: `${clip}%` }}>
        <span className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-brand text-white shadow-xl shadow-brand/40 ring-4 ring-white/40">
          <ChevronLeft className="size-5" />
          <ChevronRight className="-ml-1 size-5" />
        </span>
      </div>
    </div>
  );
}
