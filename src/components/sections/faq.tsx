"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { EASE, Stagger, StaggerItem } from "@/components/motion/primitives";
import { Doodles, SectionHeading } from "@/components/decor";

const FAQS = [
  {
    q: "What kind of projects do you take on?",
    a: "New products (MVPs and v2 rebuilds), scaling existing platforms, AI features, cloud migrations and design systems. Engagements run from 8 weeks to multi-year partnerships.",
  },
  {
    q: "How do you price your work?",
    a: "After a one-week discovery we give you a fixed-scope quote per milestone. For ongoing work we offer a dedicated team on a predictable monthly retainer.",
  },
  { q: "Who owns the code and IP?", a: "You do — 100%, from the first commit. Everything lives in your repositories and cloud accounts." },
  {
    q: "Can you work alongside our in-house team?",
    a: "Absolutely. We embed with internal teams, follow your rituals and tooling, and leave documentation and training behind.",
  },
  { q: "How quickly can we start?", a: "Usually within two weeks of our first call, with your first release landing within 14 days of kick-off." },
];

export function Faq() {
  return (
    <section id="faq" className="relative overflow-hidden bg-muted py-24 sm:py-32">
      <Doodles items={[{ x: "46%", y: "6%", size: 70, rotate: 10, icon: 8 }]} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <SectionHeading tag="FAQ" title="Frequently asked questions" highlight={["questions"]} />
          <Stagger className="mt-10">
            <AccordionPrimitive.Root defaultValue={[0]} className="flex flex-col gap-4">
              {FAQS.map((f, i) => (
                <StaggerItem key={f.q}>
                  <AccordionPrimitive.Item value={i} className="group rounded-2xl bg-card shadow-sm shadow-black/[0.03]">
                    <AccordionPrimitive.Header>
                      <AccordionPrimitive.Trigger className="flex w-full items-center gap-4 px-6 py-6 text-left text-[17px] font-semibold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-brand sm:px-8">
                        <span className="text-brand tabular-nums">{i + 1}.</span>
                        <span className="flex-1">{f.q}</span>
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-muted text-foreground transition-all duration-300 group-data-open:rotate-180 group-data-open:bg-brand group-data-open:text-white">
                          <Plus className="size-4 group-data-open:hidden" />
                          <Minus className="hidden size-4 group-data-open:block" />
                        </span>
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>
                    <AccordionPrimitive.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 ease-out data-ending-style:h-0 data-starting-style:h-0">
                      <p className="px-6 pb-6 pl-[3.25rem] leading-relaxed text-muted-foreground sm:px-8 sm:pl-[3.75rem]">{f.a}</p>
                    </AccordionPrimitive.Panel>
                  </AccordionPrimitive.Item>
                </StaggerItem>
              ))}
            </AccordionPrimitive.Root>
          </Stagger>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="relative aspect-[4/5] overflow-hidden rounded-[2rem]"
        >
          <Image src="/images/faq.jpg" alt="usup.io team workshop" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          <div className="absolute inset-x-6 bottom-6 rounded-3xl bg-card/95 p-6 backdrop-blur">
            <p className="text-lg font-semibold text-foreground">Still have questions?</p>
            <p className="mt-1 text-muted-foreground">
              Write to us at{" "}
              <a href="mailto:hello@usup.io" className="font-medium text-brand hover:underline">
                hello@usup.io
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
