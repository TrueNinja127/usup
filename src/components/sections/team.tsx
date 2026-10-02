"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EASE } from "@/components/motion/primitives";
import { Doodles, NotchCard, SectionHeading } from "@/components/decor";
import { SOCIALS } from "@/components/social-icons";

// Placeholder team — replace names, roles, bios and photos with the real team.
const TEAM = [
  {
    name: "Sarah Mitchell",
    role: "Head of Product",
    image: "/images/team-1.jpg",
    cutout: "/images/team-1-cut.png",
    bio: [
      "Sarah leads product strategy at usup.io and has launched more than 40 digital products across fintech, health and SaaS.",
      "She runs every discovery workshop, turning fuzzy ideas into clear roadmaps, measurable goals and a fixed-scope plan your whole team can rally behind.",
    ],
  },
  {
    name: "Daniel Reyes",
    role: "Lead Engineer",
    image: "/images/team-2.jpg",
    cutout: "/images/team-2-cut.png",
    bio: [
      "Daniel has spent 12 years building high-traffic platforms in TypeScript, Go and Python, from first commit to millions of users.",
      "He sets the engineering bar at usup.io: clean architecture, automated testing and weekly production releases from day one.",
    ],
  },
  {
    name: "Emma Collins",
    role: "Design Director",
    image: "/images/team-3.jpg",
    cutout: "/images/team-3-cut.png",
    bio: [
      "Emma leads our design practice with a passion for research-led products and accessible, delightful interfaces.",
      "Her design systems help teams ship features twice as fast while keeping every screen consistent and on-brand.",
    ],
  },
  {
    name: "Lucas Novak",
    role: "Cloud Architect",
    image: "/images/team-4.jpg",
    cutout: "/images/team-4-cut.png",
    bio: [
      "Lucas designs secure, cost-efficient infrastructure on AWS, GCP and Azure for products that need to scale overnight.",
      "From Kubernetes to CI/CD and observability, he makes sure your platform stays fast, reliable and predictable to run.",
    ],
  },
];

const PARTNERS = ["Northwind", "Lumora", "Vertexa", "Quantly", "Helio"];
const AUTOPLAY = 6000;

export function Team() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const member = TEAM[active];

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % TEAM.length), AUTOPLAY);
    return () => clearTimeout(t);
  }, [active, paused]);

  return (
    <section id="team" className="relative overflow-hidden bg-muted py-24 sm:py-32 [--notch-bg:var(--muted)]">
      <Doodles
        items={[
          { x: "5%", y: "5%", size: 72, rotate: -12, icon: 6 },
          { x: "62%", y: "4%", size: 64, rotate: 10, icon: 1 },
          { x: "92%", y: "30%", size: 60, rotate: -8, icon: 3 },
        ]}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <SectionHeading
            tag="Team Members"
            title="The people who lift your product up"
            highlight={["up"]}
            body="Our team is made up of seasoned specialists who share one goal: shipping software that moves your business up."
            className="max-w-2xl"
          />
          <Button
            nativeButton={false}
            render={<a href="#contact" />}
            variant="outline"
            className="h-14 w-fit shrink-0 rounded-full border-foreground/80 bg-transparent px-8 text-base hover:border-foreground hover:bg-foreground hover:text-background"
          >
            Explore All Experts
          </Button>
        </div>

        <div
          className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-12"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          {/* Member list */}
          <div role="tablist" aria-label="Team members" className="relative flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] lg:flex-col lg:gap-6 lg:overflow-visible lg:pb-0">
            <span aria-hidden className="absolute top-0 bottom-0 left-0 hidden w-[3px] rounded-full bg-foreground/10 lg:block" />
            {TEAM.map((m, i) => {
              const selected = i === active;
              return (
                <motion.button
                  key={m.name}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="team-panel"
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                  className="group relative flex shrink-0 items-center gap-5 rounded-full pr-6 text-left lg:pl-14"
                >
                  {selected && (
                    <motion.span
                      layoutId="team-indicator"
                      className="absolute top-0 bottom-0 left-0 hidden w-[3px] overflow-hidden rounded-full bg-brand/30 lg:block"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    >
                      {!paused && (
                        <motion.span
                          key={active}
                          className="block w-full bg-brand"
                          initial={{ height: "0%" }}
                          animate={{ height: "100%" }}
                          transition={{ duration: AUTOPLAY / 1000, ease: "linear" }}
                        />
                      )}
                      {paused && <span className="block h-full w-full bg-brand" />}
                    </motion.span>
                  )}
                  <span
                    className={`relative size-20 shrink-0 overflow-hidden rounded-full border-2 bg-card transition-colors duration-500 sm:size-[120px] ${
                      selected ? "border-brand" : "border-card group-hover:border-foreground/15"
                    }`}
                  >
                    <Image src={m.image} alt="" width={120} height={120} className="size-full object-cover" />
                  </span>
                  <span>
                    <span className={`block text-xl font-semibold whitespace-nowrap transition-colors duration-300 sm:text-2xl ${selected ? "text-foreground" : "text-foreground/60 group-hover:text-foreground"}`}>
                      {m.name}
                    </span>
                    <span className={`mt-0.5 block transition-colors duration-300 text-muted-foreground`}>{m.role}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Featured member card */}
          <motion.div
            id="team-panel"
            role="tabpanel"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <NotchCard
              corner="br"
              notch={76}
              radius={32}
              className="rounded-[2rem] bg-card"
              slot={
                <a
                  href="#contact"
                  aria-label={`Contact ${member.name}`}
                  className="grid size-14 place-items-center rounded-full border border-[#A1A4B1] text-foreground transition-all duration-500 hover:border-brand hover:bg-brand hover:text-white"
                >
                  <ArrowUpRight className="size-6" />
                </a>
              }
            >
              <div className="flex flex-col items-center gap-4 p-[10px] md:flex-row md:gap-[30px]">
                {/* Portrait on a soft panel */}
                <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-[2rem] bg-muted md:aspect-[4/5.3] px-[15px] pt-5 md:w-[46%]">
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-brand/10 to-transparent" />
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={member.cutout}
                      className="absolute inset-x-[15px] top-5 bottom-0"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.8, ease: EASE }}
                    >
                      <Image
                        src={member.cutout}
                        alt={member.name}
                        fill
                        sizes="(min-width:1024px) 400px, 90vw"
                        className="object-contain object-bottom"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Details */}
                <div className="w-full flex-1 px-4 pt-2 pb-20 text-center md:px-0 md:py-5 md:pr-10 md:text-left lg:pr-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={member.name}
                      initial="hidden"
                      animate="show"
                      exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
                      variants={{ show: { transition: { staggerChildren: 0.07 } } }}
                    >
                      {[
                        <h3 key="n" className="text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-[2.5rem] sm:leading-tight">
                          {member.name}
                        </h3>,
                        <p key="r" className="mt-1 text-lg text-foreground">{member.role}</p>,
                        <div key="b" className="mt-5 mb-6 space-y-2 leading-[1.75] text-muted-foreground">
                          {member.bio.map((para, j) => (
                            <p key={j}>{para}</p>
                          ))}
                        </div>,
                      ].map((el, j) => (
                        <motion.div
                          key={j}
                          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                        >
                          {el}
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  <Button
                    nativeButton={false}
                    render={<a href="#contact" />}
                    className="h-[60px] rounded-full px-8 text-base hover:bg-brand-pressed"
                  >
                    <Phone className="size-5" /> Contact Expert
                  </Button>
                  <ul className="mt-6 flex justify-center gap-2.5 md:justify-start">
                    {SOCIALS.map(({ label, Icon }) => (
                      <li key={label}>
                        <a
                          href="#"
                          aria-label={`${member.name} on ${label}`}
                          className="grid size-10 place-items-center rounded-full border border-[#C6C9D4]/70 text-foreground transition-all duration-300 hover:border-foreground hover:text-brand"
                        >
                          <Icon className="size-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </NotchCard>
          </motion.div>
        </div>

        {/* Partner strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-20 grid grid-cols-2 items-center gap-8 rounded-[2.5rem] bg-card px-8 py-10 sm:grid-cols-3 lg:grid-cols-5 lg:rounded-full lg:py-8"
        >
          {PARTNERS.map((p, i) => (
            <PartnerLogo key={p} name={p} variant={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/** Placeholder partner wordmarks built from simple SVG shapes. */
function PartnerLogo({ name, variant }: { name: string; variant: number }) {
  const shapes = [
    <circle key="c" cx="14" cy="14" r="12" fill="none" stroke="currentColor" strokeWidth="3" />,
    <rect key="r" x="3" y="3" width="22" height="22" rx="6" fill="currentColor" />,
    <path key="t" d="M14 2 L26 24 H2 Z" fill="currentColor" />,
    <path key="h" d="M4 14 a10 10 0 0 1 20 0 v10 h-6 v-10 a4 4 0 0 0 -8 0 v10 h-6z" fill="currentColor" />,
    <path key="s" d="M14 2 l3.5 7.5 8 1-6 5.5 1.6 8L14 20l-7.1 4 1.6-8-6-5.5 8-1z" fill="currentColor" />,
  ];
  return (
    <div className="flex items-center justify-center gap-2.5 text-brand/80 transition-all duration-300 hover:scale-105 hover:text-brand">
      <svg viewBox="0 0 28 28" className="size-8" aria-hidden>
        {shapes[variant % shapes.length]}
      </svg>
      <span className="text-2xl font-bold tracking-tight">{name}</span>
    </div>
  );
}
