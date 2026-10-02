"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { EASE } from "@/components/motion/primitives";
import { Doodles, SectionHeading } from "@/components/decor";

// Points sit on a semicircle centred at (600, 600) with r = 500 in a 1200×600 box.
const POINTS = [
  { title: "Senior Engineering Excellence", angle: 162 },
  { title: "Secure & Scalable by Default", angle: 126 },
  { title: "Tailored to Your Business", angle: 90 },
  { title: "Transparent, Fixed Pricing", angle: 54 },
  { title: "Launch Faster, Grow Further", angle: 18 },
].map((p) => {
  const rad = (p.angle * Math.PI) / 180;
  return { ...p, x: (600 + 500 * Math.cos(rad)) / 12, y: (600 - 500 * Math.sin(rad)) / 6 };
});

export function Why() {
  return (
    <section className="relative overflow-hidden bg-muted pt-24 sm:pt-32 [--notch-bg:var(--muted)]">
      <Doodles
        items={[
          { x: "6%", y: "12%", size: 90, rotate: -14, icon: 3 },
          { x: "86%", y: "10%", size: 72, rotate: 12, icon: 5 },
          { x: "10%", y: "62%", size: 60, rotate: 8, icon: 7 },
          { x: "88%", y: "60%", size: 66, rotate: -8, icon: 8 },
        ]}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          center
          tag="Why Choose Us"
          title="Why teams level up with usup.io"
          highlight={["up"]}
          body="Easily find a long-term technology partner you can trust."
        />

        {/* Desktop arc */}
        <div className="relative mx-auto mt-6 hidden aspect-[2/1] max-w-[1200px] lg:block">
          <svg viewBox="0 0 1200 600" className="absolute inset-0 size-full overflow-visible" aria-hidden>
            <motion.path
              d="M 100 600 A 500 500 0 0 1 1100 600"
              fill="none"
              stroke="currentColor"
              className="text-foreground"
              strokeOpacity="0.15"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: EASE }}
            />
          </svg>

          {POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              className="absolute flex w-56 -translate-x-1/2 -translate-y-7 flex-col items-center text-center"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 + i * 0.25, type: "spring", stiffness: 200, damping: 16 }}
            >
              <span className="grid size-14 place-items-center rounded-full bg-card text-xl font-bold text-foreground shadow-lg shadow-black/5 ring-1 ring-foreground/5 transition-colors duration-300 hover:bg-brand hover:text-white">
                0{i + 1}
              </span>
              <p className="mt-4 text-xl leading-snug font-semibold text-foreground">{p.title}</p>
            </motion.div>
          ))}

          <motion.div
            className="absolute top-[36%] left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8, ease: EASE }}
          >
            <Button nativeButton={false} render={<a href="#contact" />} className="h-14 rounded-full px-8 text-base hover:bg-brand-pressed">
              Schedule a Call
            </Button>
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-1/2 aspect-[2/1] w-[46%] -translate-x-1/2 overflow-hidden rounded-t-full"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
          >
            <Image src="/images/why.jpg" alt="usup.io studio" fill sizes="560px" className="object-cover" />
          </motion.div>
        </div>

        {/* Mobile / tablet list */}
        <ol className="mt-12 grid gap-4 pb-24 sm:grid-cols-2 lg:hidden">
          {POINTS.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
              className="flex items-center gap-4 rounded-3xl bg-card p-5"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand text-lg font-bold text-white">0{i + 1}</span>
              <span className="text-lg font-semibold text-foreground">{p.title}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
