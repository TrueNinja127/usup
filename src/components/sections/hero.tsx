"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp, EASE } from "@/components/motion/primitives";
import { InverseCorner, RotatingBadge } from "@/components/decor";
import { RisingParticles, UpSwoosh } from "@/components/rise";

const SLIDES = [
  {
    image: "/images/hero1.webp",
    title: ["Software That", "Moves You", "Up"],
    body: "We design, build and scale web, mobile, cloud and AI products for ambitious teams — from first prototype to millions of users.",
  },
  {
    image: "/images/hero2.webp",
    title: ["Senior Teams That", "Level You", "Up"],
    body: "A dedicated team of senior designers and engineers who ship to production every week — so your product keeps climbing."
  },
  {
    image: "/images/hero3.webp",
    title: ["Ideas That", "Scale All The Way", "Up"],
    body: "Research-led design and rock-solid engineering, delivered with fixed-scope pricing and total transparency.",
  },
];

const AVATARS = ["/images/avatar-1.jpg", "/images/avatar-2.jpg", "/images/avatar-3.jpg"];
const STATS = [
  { value: 120, suffix: "+", label: "Products shipped" },
  { value: 45, suffix: "+", label: "Senior experts" },
  { value: 98, suffix: "%", label: "Client retention" },
];
const DURATION = 7000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const go = useCallback((dir: number) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    const t = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(t);
  }, [index, go]);

  const slide = SLIDES[index];

  return (
    <section id="top" className="relative px-4 pt-4 sm:px-8 [--notch-bg:var(--background)]">
      <div className="relative h-[max(640px,min(100svh-2rem,880px))] overflow-hidden rounded-[2rem] bg-ink sm:rounded-[2.5rem]">
        {/* Slides */}
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.image}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.18 }}
              animate={{ scale: 1 }}
              transition={{ duration: DURATION / 1000 + 1.5, ease: "linear" }}
            >
              <Image src={slide.image} alt="" fill priority sizes="100vw" className="object-cover" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/40" />
        <RisingParticles />

        {/* Copy */}
        <div className="relative flex h-full flex-col justify-center px-6 pt-20 pb-16 sm:px-12 lg:pb-32 xl:px-16">
          <AnimatePresence mode="wait">
            <motion.div key={index} exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}>
              <h1 className="max-w-3xl text-[2.6rem] leading-[1.08] font-bold tracking-[-0.03em] text-white sm:text-6xl lg:text-[5.25rem]">
                {[
                  slide.title[0],
                  <>
                    {slide.title[1]}{" "}
                    <span className="relative inline-block text-brand">
                      <motion.span
                        className="inline-block"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ delay: 2.2, duration: 2.4, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
                      >
                        {slide.title[2]}
                      </motion.span>
                      <UpSwoosh delay={1} className="absolute -right-[0.95em] -bottom-[0.05em] h-[0.95em] w-[0.95em] text-brand" />
                    </span>
                  </>,
                ].map((line, li) => (
                  <span key={li} className="block overflow-hidden pb-1">
                    <motion.span
                      className="inline-block"
                      initial={{ y: "105%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, delay: 0.15 + li * 0.12, ease: EASE }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
              >
                {slide.body}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button
              nativeButton={false}
              render={<a href="#contact" />}
              className="h-14 rounded-full px-8 text-base shadow-lg shadow-brand/30 hover:bg-brand-pressed"
            >
              Start a Project
            </Button>
            <Button
              nativeButton={false}
              render={<a href="#services" />}
              variant="outline"
              className="h-14 rounded-full border-white/80 bg-transparent px-8 text-base text-white hover:border-white hover:bg-white hover:text-ink"
            >
              Explore Services
            </Button>
          </motion.div>
        </div>

        {/* Slider controls */}
        <div className="absolute right-6 bottom-8 flex items-center gap-4 sm:right-12 lg:bottom-40">
          <SlideButton label="Previous slide" onClick={() => go(-1)}>
            <ArrowLeft />
          </SlideButton>
          <SlideButton label="Next slide" onClick={() => go(1)}>
            <ArrowRight />
          </SlideButton>
        </div>
        <div className="absolute bottom-8 left-6 flex gap-2 sm:left-12 lg:hidden">
          {SLIDES.map((_, i) => (
            <span key={i} className="h-1 w-8 overflow-hidden rounded-full bg-white/25">
              {i === index && (
                <motion.span
                  className="block h-full bg-brand"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: DURATION / 1000, ease: "linear" }}
                />
              )}
            </span>
          ))}
        </div>

        {/* White tabs that carve the notched bottom edge (desktop) */}
        <div className="absolute bottom-0 left-0 hidden h-[118px] w-[38%] rounded-tr-[2rem] bg-background lg:block">
          <InverseCorner at="tr" size={32} style={{ bottom: "100%", left: 0 }} />
          <InverseCorner at="tr" size={32} style={{ bottom: 0, left: "100%" }} />
          <Reviews className="h-full pt-6 pr-6" />
        </div>
        <div className="absolute right-0 bottom-0 hidden h-[118px] w-[38%] rounded-tl-[2rem] bg-background lg:block">
          <InverseCorner at="tl" size={32} style={{ bottom: "100%", right: 0 }} />
          <InverseCorner at="tl" size={32} style={{ bottom: 0, right: "100%" }} />
          <Stats className="h-full justify-end pt-6 pl-6" />
        </div>
      </div>

      {/* Rotating badge straddling the bottom edge */}
      <a
        href="#about"
        aria-label="Scroll to about"
        className="group absolute bottom-0 left-1/2 z-10 hidden -translate-x-1/2 translate-y-[35%] lg:block"
      >
        <RotatingBadge
          text="• 10+ years of experience • usup.io "
          className="size-40 rounded-full bg-ink text-white ring-[10px] ring-background dark:bg-card dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]"
        >
          <span className="grid size-16 place-items-center rounded-full bg-white text-ink transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
            <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
              <ArrowDown className="size-6" />
            </motion.span>
          </span>
        </RotatingBadge>
      </a>

      {/* Mobile / tablet version of the bottom strip */}
      <div className="mt-8 flex flex-col gap-8 px-2 lg:hidden">
        <Reviews />
        <Stats />
      </div>
    </section>
  );
}

function SlideButton({ children, label, onClick }: { children: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-14 place-items-center rounded-full border border-white/70 text-white transition-all duration-300 hover:scale-105 hover:border-brand hover:bg-brand [&_svg]:size-5"
    >
      {children}
    </button>
  );
}

function Reviews({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8, ease: EASE }}
      className={`flex items-center gap-4 ${className}`}
    >
      <div className="flex -space-x-3">
        {AVATARS.map((src) => (
          <Image key={src} src={src} alt="" width={56} height={56} className="size-14 rounded-full border-[3px] border-background object-cover" />
        ))}
      </div>
      <div>
        <div className="flex gap-0.5 text-brand">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-4 fill-current" />
          ))}
        </div>
        <p className="mt-1 text-[15px] text-muted-foreground">
          <span className="font-semibold text-foreground">4.9</span> rating from 200+ client reviews
        </p>
      </div>
    </motion.div>
  );
}

function Stats({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.8, ease: EASE }}
      className={`flex flex-wrap gap-x-10 gap-y-4 ${className}`}
    >
      {STATS.map((s) => (
        <div key={s.label}>
          <p className="flex items-center gap-1.5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <CountUp value={s.value} suffix={s.suffix} />
            <motion.span
              className="grid size-7 place-items-center rounded-full bg-brand text-white"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <TrendingUp className="size-4" strokeWidth={2.75} />
            </motion.span>
          </p>
          <p className="mt-0.5 text-[15px] text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </motion.div>
  );
}
