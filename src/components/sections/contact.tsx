"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Brain, Check, CheckCircle2, ChevronDown, Clock, Globe, Mail, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/logo";
import { EASE } from "@/components/motion/primitives";
import { Doodles, SectionHeading } from "@/components/decor";
import { cn } from "@/lib/utils";

const PROJECT_TYPES = [
  { id: "web", label: "Web App", icon: Globe },
  { id: "mobile", label: "Mobile App", icon: Smartphone },
  { id: "ai", label: "AI & Data", icon: Brain },
];

const BUDGETS = ["Under $10k", "$10k – $25k", "$25k – $50k", "$50k – $100k", "$100k+"];

const field =
  "h-16 w-full rounded-xl border border-border bg-card px-6 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand focus:ring-3 focus:ring-brand/15";

export function Contact() {
  const [type, setType] = useState("web");
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <Doodles
        items={[
          { x: "46%", y: "4%", size: 70, rotate: 10, icon: 2 },
          { x: "92%", y: "6%", size: 64, rotate: -12, icon: 5 },
        ]}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          tag="Contact Us"
          title="Let's move your next project up"
          highlight={["up"]}
          body="Need advice or have questions about our services? Tell us a little about your idea."
          className="max-w-2xl"
        />

        <div className="mt-14 grid items-end gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          {/* Person cut-out with floating badges */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE }}
            className="relative mx-auto hidden h-[620px] w-full max-w-[460px] md:block"
          >
            <div aria-hidden className="absolute inset-x-6 bottom-0 aspect-square rounded-full bg-brand" />
            <motion.div
              aria-hidden
              className="absolute inset-x-0 bottom-[-6%] aspect-square rounded-full border-2 border-dashed border-brand/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            <LogoMark tone="white" mono className="absolute bottom-[34%] left-[10%] w-24 opacity-25" />
            {/* Clipped to the circle's lower curve so the person rises out of it */}
            <div className="absolute inset-x-6 top-0 bottom-0 overflow-hidden rounded-b-[999px]">
              <Image
                src="/images/support-agent.webp"
                alt="usup.io support agent"
                width={1000}
                height={1388}
                sizes="460px"
                className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
              />
            </div>
            <FloatingBadge className="top-[22%] -left-2" delay={0.4} icon={<Clock className="size-5" />} title="Reply in 24h" meta="Every business day" />
            <FloatingBadge className="top-[48%] -right-4" delay={0.6} icon={<CheckCircle2 className="size-5" />} title="Free discovery call" meta="No commitment" />
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE }}
            className="rounded-[2rem] bg-muted p-6 sm:p-12 lg:p-14"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[520px] flex-col items-center justify-center text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
                    className="grid size-20 place-items-center rounded-full bg-brand text-white shadow-xl shadow-brand/30"
                  >
                    <Check className="size-10" strokeWidth={3} />
                  </motion.span>
                  <h3 className="mt-8 text-3xl font-bold text-foreground">Message sent!</h3>
                  <p className="mt-3 max-w-sm text-muted-foreground">
                    Thanks for reaching out. A senior member of our team will reply within one business day.
                  </p>
                  <Button variant="outline" onClick={() => setSent(false)} className="mt-8 h-12 rounded-full border-foreground/20 bg-transparent px-6">
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    // TODO: send the form data to your CRM / email endpoint
                    setSent(true);
                  }}
                >
                  <fieldset>
                    <legend className="sr-only">Project type</legend>
                    <div className="grid grid-cols-3 gap-3 sm:gap-6">
                      {PROJECT_TYPES.map(({ id, label, icon: Icon }) => {
                        const active = type === id;
                        return (
                          <label
                            key={id}
                            className={cn(
                              "relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 bg-card px-2 py-6 text-center transition-all duration-300 hover:-translate-y-1 sm:py-7",
                              active ? "border-brand shadow-lg shadow-brand/10" : "border-transparent"
                            )}
                          >
                            <input
                              type="radio"
                              name="projectType"
                              value={id}
                              checked={active}
                              onChange={() => setType(id)}
                              className="sr-only"
                            />
                            {active && (
                              <motion.span
                                layoutId="project-type-check"
                                className="absolute top-2.5 right-2.5 grid size-5 place-items-center rounded-full bg-brand text-white"
                              >
                                <Check className="size-3" strokeWidth={3} />
                              </motion.span>
                            )}
                            <span
                              className={cn(
                                "grid size-12 place-items-center rounded-xl transition-colors duration-300",
                                active ? "bg-brand text-white" : "bg-brand/10 text-brand"
                              )}
                            >
                              <Icon className="size-6" />
                            </span>
                            <span className="text-sm font-semibold text-foreground sm:text-[17px]">{label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6">
                    <label className="sr-only" htmlFor="c-name">Your name</label>
                    <input id="c-name" name="name" required placeholder="Your name*" autoComplete="name" className={field} />
                    <label className="sr-only" htmlFor="c-email">Work email</label>
                    <input id="c-email" name="email" type="email" required placeholder="Work email*" autoComplete="email" className={field} />
                    <label className="sr-only" htmlFor="c-company">Company</label>
                    <input id="c-company" name="company" placeholder="Company name" autoComplete="organization" className={field} />
                    <div className="relative">
                      <label className="sr-only" htmlFor="c-budget">Budget</label>
                      <select id="c-budget" name="budget" required defaultValue="" className={cn(field, "appearance-none pr-12 invalid:text-muted-foreground")}>
                        <option value="" disabled>
                          Estimated budget*
                        </option>
                        {BUDGETS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute top-1/2 right-5 size-5 -translate-y-1/2 text-muted-foreground" />
                    </div>
                    <label className="sr-only" htmlFor="c-details">Project details</label>
                    <textarea
                      id="c-details"
                      name="details"
                      required
                      rows={4}
                      placeholder="Tell us about your project, goals and timeline*"
                      className={cn(field, "h-auto resize-none py-5 sm:col-span-2")}
                    />
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
                    <Button type="submit" className="h-14 rounded-full px-8 text-base hover:bg-brand-pressed">
                      Send Message <ArrowRight className="size-5 transition-transform group-hover/button:translate-x-1" />
                    </Button>
                    <a href="mailto:hello@usup.io" className="group flex items-center gap-3 text-foreground">
                      <span className="grid size-11 place-items-center rounded-full border border-foreground/15 transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                        <Mail className="size-5" />
                      </span>
                      <span className="leading-tight">
                        <span className="block text-sm text-muted-foreground">Prefer email?</span>
                        <span className="block font-semibold">hello@usup.io</span>
                      </span>
                    </a>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloatingBadge({
  className,
  delay,
  icon,
  title,
  meta,
}: {
  className: string;
  delay: number;
  icon: React.ReactNode;
  title: string;
  meta: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 16 }}
      className={cn("absolute z-10", className)}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-xl shadow-black/10"
      >
        <span className="grid size-10 place-items-center rounded-xl bg-brand/10 text-brand">{icon}</span>
        <span className="leading-tight">
          <span className="block text-sm font-semibold text-foreground">{title}</span>
          <span className="block text-xs text-muted-foreground">{meta}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}
