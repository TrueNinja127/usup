"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EASE, WordsReveal } from "@/components/motion/primitives";
import { GrowthStairs } from "@/components/rise";

/** Slim call-to-action strip right above the footer, with an ascending growth chart. */
export function Cta() {
  return (
    <section className="relative border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl items-center justify-items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:justify-items-stretch">
        <h2 className="text-center text-3xl leading-tight font-bold tracking-[-0.03em] text-foreground sm:text-[2.4rem] lg:text-left">
          <WordsReveal inView text="Ready to move your product up?" highlight={["up?"]} />
        </h2>

        <GrowthStairs />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="flex flex-wrap justify-center gap-4 lg:justify-end"
        >
          <Button
            nativeButton={false}
            render={<a href="#contact" />}
            className="h-14 rounded-full px-7 text-base hover:bg-brand-pressed"
          >
            Start a Project <ArrowRight className="size-5 transition-transform group-hover/button:translate-x-1" />
          </Button>
          <Button
            nativeButton={false}
            render={<a href="#team" />}
            className="h-14 rounded-full bg-ink px-7 text-base text-white hover:bg-black dark:bg-white dark:text-ink dark:hover:bg-white/90"
          >
            Our Experts <ArrowRight className="size-5 transition-transform group-hover/button:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
