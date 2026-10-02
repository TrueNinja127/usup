"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { Doodles, NotchCard, SectionHeading } from "@/components/decor";
import { ArrowButton } from "@/components/sections/services";
import { EASE } from "@/components/motion/primitives";

// Placeholder testimonials — replace with real, approved client quotes.
const QUOTES = [
  { name: "Maya Chen", role: "CTO, Lumora Finance", image: "/images/avatar-1.jpg", quote: "usup.io shipped in eight weeks what our previous vendor couldn't deliver in a year. The code quality is the best we've ever inherited." },
  { name: "James Porter", role: "VP Product, Helio Health", image: "/images/avatar-2.jpg", quote: "They think like product owners, not ticket-takers. Every sprint demo felt like a real step forward for our patients." },
  { name: "Sofia Martins", role: "CEO, Quantly", image: "/images/avatar-3.jpg", quote: "Our AI copilot went from whiteboard to paying customers in one quarter. Calm, senior and incredibly fast team." },
  { name: "Lucas Novak", role: "Head of Engineering, Orbitly", image: "/images/team-4.jpg", quote: "Transparent pricing, weekly releases and zero drama. They migrated our monolith without a single minute of downtime." },
];

export function Testimonials() {
  const [page, setPage] = useState(0);
  const pages = Math.ceil(QUOTES.length / 2);
  const [dir, setDir] = useState(1);
  const go = (d: number) => {
    setDir(d);
    setPage((p) => (p + d + pages) % pages);
  };

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 [--notch-bg:var(--background)]">
      <Doodles
        items={[
          { x: "6%", y: "10%", size: 80, rotate: -10, icon: 3 },
          { x: "88%", y: "8%", size: 70, rotate: 12, icon: 0 },
        ]}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            tag="Testimonials"
            title="Teams that moved up with us"
            highlight={["up"]}
            body="Real stories from founders and product leaders who scaled with us."
            className="max-w-2xl"
          />
          <div className="flex gap-3">
            <ArrowButton label="Previous testimonials" onClick={() => go(-1)}>
              <ArrowLeft />
            </ArrowButton>
            <ArrowButton label="Next testimonials" onClick={() => go(1)}>
              <ArrowRight />
            </ArrowButton>
          </div>
        </div>

        <div className="relative mt-14 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.div
              key={page}
              custom={dir}
              variants={{
                enter: (d: number) => ({ x: d * 80, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d: number) => ({ x: d * -80, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: EASE }}
              className="grid gap-6 md:grid-cols-2"
            >
              {QUOTES.slice(page * 2, page * 2 + 2).map((q) => (
                <motion.div
                  key={q.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  <NotchCard
                    corner="br"
                    notch={76}
                    radius={24}
                    className="h-full bg-muted"
                    slot={
                      <span className="grid size-14 place-items-center rounded-full bg-brand text-white">
                        <Quote className="size-6 fill-current" />
                      </span>
                    }
                  >
                    <figure className="flex h-full flex-col p-8 pb-12 sm:p-10 sm:pb-14">
                      <figcaption className="flex items-center gap-5">
                        <Image src={q.image} alt={q.name} width={80} height={80} className="size-20 rounded-full object-cover" />
                        <div>
                          <p className="text-xl font-semibold text-foreground">{q.name}</p>
                          <p className="mt-0.5 text-muted-foreground">{q.role}</p>
                        </div>
                      </figcaption>
                      <div className="mt-8 flex gap-1 text-brand">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="size-5 fill-current" />
                        ))}
                      </div>
                      <blockquote className="mt-4 pr-10 text-[17px] leading-relaxed text-foreground/75">&ldquo;{q.quote}&rdquo;</blockquote>
                    </figure>
                  </NotchCard>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to page ${i + 1}`}
              onClick={() => {
                setDir(i > page ? 1 : -1);
                setPage(i);
              }}
              className={`h-2.5 rounded-full transition-all duration-500 ${i === page ? "w-10 bg-brand" : "w-2.5 bg-foreground/15 hover:bg-foreground/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
