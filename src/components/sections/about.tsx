"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp, EASE, Stagger, StaggerItem } from "@/components/motion/primitives";
import { Doodles, SectionHeading } from "@/components/decor";

const POINTS = [
  "Senior-only engineers",
  "Fixed-scope pricing",
  "Weekly production releases",
  "You own 100% of the code",
  "Design & engineering in one team",
  "Post-launch support",
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -60]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden py-24 sm:py-32 lg:pt-40 [--notch-bg:var(--background)]">
      <Doodles
        items={[
          { x: "4%", y: "8%", size: 80, rotate: -12, icon: 0 },
          { x: "44%", y: "78%", size: 64, rotate: 10, icon: 2 },
          { x: "92%", y: "6%", size: 70, rotate: 14, icon: 4 },
        ]}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionHeading
            tag="Our Story"
            title="We exist to move your product up"
            highlight={["up"]}
            body="For over a decade, usup.io has helped startups and enterprises turn bold ideas into reliable software. To us you're not just a client — you're a partner we grow with."
          />
          <Stagger className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2" stagger={0.06}>
            {POINTS.map((p) => (
              <StaggerItem key={p} className="flex items-center gap-3 text-[16px] text-foreground/80">
                <span className="grid size-5 shrink-0 place-items-center rounded-md border-[1.5px] border-brand text-brand">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {p}
              </StaggerItem>
            ))}
          </Stagger>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-8"
          >
            <Button
              nativeButton={false}
              render={<a href="#services" />}
              className="h-14 rounded-full px-8 text-base hover:bg-brand-pressed"
            >
              Learn More
            </Button>
            <a href="tel:+10000000000" className="group flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full border border-foreground/20 text-foreground transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                <Phone className="size-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-lg font-semibold text-foreground">Call us:</span>
                <span className="block text-[15px] text-foreground/70">+1 (000) 000 0000</span>
              </span>
            </a>
          </motion.div>
        </div>

        {/* Image collage */}
        <div className="relative grid grid-cols-[1.4fr_1fr] grid-rows-[auto_1fr] gap-4">
          <motion.div
            style={{ y: y1 }}
            initial={{ clipPath: "inset(0 0 100% 0 round 2rem)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0 round 2rem)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: EASE }}
            className="relative row-span-2 min-h-[460px] overflow-hidden rounded-[2rem] sm:min-h-[560px]"
          >
            <Image src="/images/about-1.jpg" alt="The usup.io team celebrating a launch" fill sizes="(min-width:1024px) 40vw, 60vw" className="object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 160, damping: 18, delay: 0.3 }}
            className="flex flex-col items-center justify-center rounded-[2rem] bg-brand px-4 py-8 text-center text-white"
          >
            <p className="text-4xl font-bold sm:text-5xl">
              <CountUp value={120} suffix="+" />
            </p>
            <p className="mt-1 text-lg">Products Shipped</p>
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="relative -ml-[45%] min-h-[260px] overflow-visible rounded-[2rem] border-[12px] border-background bg-background sm:min-h-[300px]"
          >
            <div className="relative size-full overflow-hidden rounded-[1.4rem]">
              <Image src="/images/about-2.jpg" alt="Engineers reviewing a release" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
