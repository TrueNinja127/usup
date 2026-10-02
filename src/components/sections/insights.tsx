"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EASE } from "@/components/motion/primitives";
import { SectionHeading } from "@/components/decor";

// Placeholder articles — link these to real posts.
const POSTS = [
  { title: "How to ship your MVP in 8 weeks without cutting corners", image: "/images/blog-1.jpg", author: "Daniel Reyes", date: "Sep 18, 2026", tag: "Engineering" },
  { title: "The product discovery workshop that saves months of rework", image: "/images/blog-2.jpg", author: "Sarah Mitchell", date: "Sep 04, 2026", tag: "Product" },
  { title: "Adding AI features your users will actually pay for", image: "/images/blog-3.jpg", author: "Emma Collins", date: "Aug 21, 2026", tag: "AI" },
];

export function Insights() {
  return (
    <section id="insights" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading tag="Articles & Tips" title="Insights to level your product up" highlight={["up"]} className="max-w-2xl" />
          <Button
            nativeButton={false}
            render={<a href="#" />}
            variant="outline"
            className="h-14 w-fit rounded-full border-foreground/80 bg-transparent px-8 text-base hover:border-foreground hover:bg-foreground hover:text-background"
          >
            View All Articles
          </Button>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
              className="group"
            >
              <a href="#" className="block">
                <div className="relative aspect-[3/2] overflow-hidden rounded-[2rem]">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110 group-hover:rotate-1"
                  />
                  <span className="absolute top-5 left-5 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-ink">{p.tag}</span>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-5 text-[15px] text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <User className="size-4 text-brand" /> {p.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="size-4 text-brand" /> {p.date}
                  </span>
                </div>
                <h3 className="mt-3 text-[22px] leading-snug font-semibold text-foreground transition-colors group-hover:text-brand">{p.title}</h3>
                <div className="mt-6 flex items-center gap-2 border-t border-border pt-6 font-medium text-foreground">
                  Read More
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-2" />
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
