"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EASE } from "@/components/motion/primitives";
import { Doodles, NotchCard, SectionHeading } from "@/components/decor";

const SERVICES = [
  { title: "Product Engineering", image: "/images/svc-product.jpg", body: "Full-stack teams that own architecture, delivery and quality from MVP to scale." },
  { title: "Web & Mobile Apps", image: "/images/svc-mobile.jpg", body: "Fast, accessible apps on Next.js, React Native and Swift with one design language." },
  { title: "AI & Data", image: "/images/svc-ai.jpg", body: "LLM features, RAG search and analytics pipelines that ship to production." },
  { title: "Cloud & DevOps", image: "/images/svc-cloud.jpg", body: "Infrastructure as code, CI/CD and observability on AWS, GCP or Azure." },
  { title: "UX/UI Design", image: "/images/svc-design.jpg", body: "Research-led product design and design systems your users will love." },
  { title: "QA & Security", image: "/images/svc-security.jpg", body: "Automated testing and security reviews baked into every sprint." },
];

export function Services() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("article");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 400) + 24), behavior: "smooth" });
  };

  return (
    <section id="services" className="relative overflow-hidden bg-background py-24 sm:py-32 [--notch-bg:var(--background)]">
      <Doodles
        items={[
          { x: "40%", y: "6%", size: 70, rotate: -10, icon: 1 },
          { x: "88%", y: "14%", size: 64, rotate: 18, icon: 6 },
        ]}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading tag="Our Services" title="Everything you need to build and scale up" highlight={["up"]} className="max-w-2xl" />
          <div className="flex items-center gap-3">
            <Button
              nativeButton={false}
              render={<a href="#contact" />}
              variant="outline"
              className="mr-2 hidden h-14 rounded-full border-foreground/80 bg-transparent px-8 text-base hover:border-foreground hover:bg-foreground hover:text-background sm:inline-flex"
            >
              Browse All Services
            </Button>
            <ArrowButton label="Previous services" onClick={() => scroll(-1)}>
              <ArrowLeft />
            </ArrowButton>
            <ArrowButton label="Next services" onClick={() => scroll(1)}>
              <ArrowRight />
            </ArrowButton>
          </div>
        </div>

        <div
          ref={track}
          className="-mx-5 mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
        >
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.12, ease: EASE }}
              className="group w-[85%] shrink-0 snap-start sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]"
            >
              <NotchCard
                className="aspect-[4/5]"
                slot={
                  <a
                    href="#contact"
                    aria-label={`Learn more about ${s.title}`}
                    className="grid size-14 place-items-center rounded-full border border-foreground/25 text-foreground transition-all duration-500 group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-white"
                  >
                    <ArrowUpRight className="size-6" />
                  </a>
                }
              >
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 85vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent transition-colors duration-500 group-hover:from-brand-pressed/90" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                  <span className="text-sm font-semibold text-white/60">0{i + 1}</span>
                  <h3 className="mt-1 text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/85">{s.body}</p>
                </div>
              </NotchCard>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ArrowButton({
  children,
  label,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`grid size-14 place-items-center rounded-full border border-foreground/20 text-foreground transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white [&_svg]:size-5 ${className}`}
    >
      {children}
    </button>
  );
}
