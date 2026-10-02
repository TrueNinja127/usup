import { Mail, MapPin, Phone, Plus } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { SOCIALS } from "@/components/social-icons";

const COLUMNS = [
  { title: "Quick Links", links: ["Home", "About Us", "Services", "Our Team", "Start a Project"] },
  { title: "Services", links: ["Product Engineering", "Web & Mobile Apps", "AI & Data", "Cloud & DevOps", "UX/UI Design"] },
  { title: "Support", links: ["Help Center", "FAQs", "Contact Us", "Privacy Policy", "Terms"] },
];

export function Footer() {
  return (
    <footer className="relative bg-ink pt-20 text-white">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm leading-relaxed text-white/70">
              usup.io is a product engineering studio. We design, build and scale software that moves
              businesses up.
            </p>
            <ul className="mt-8 space-y-4 text-white/85">
              <li className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full border border-white/20"><Mail className="size-4" /></span>
                <a href="mailto:hello@usup.io" className="hover:text-brand">hello@usup.io</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full border border-white/20"><Phone className="size-4" /></span>
                <a href="tel:+10000000000" className="hover:text-brand">+1 (000) 000 0000</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full border border-white/20"><MapPin className="size-4" /></span>
                Remote-first · Worldwide
              </li>
            </ul>
          </div>
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <p className="text-xl font-semibold">{c.title}</p>
              <ul className="mt-6 space-y-3.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="group flex items-center gap-2.5 text-white/65 transition-colors hover:text-white">
                      <Plus className="size-4 transition-all duration-300 group-hover:rotate-90 group-hover:text-brand" />
                      <span className="transition-transform duration-300 group-hover:translate-x-1">{l}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 py-8 sm:flex-row sm:items-center">
          <p className="text-white/60">
            © {new Date().getFullYear()} <span className="text-brand">usup.io</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-brand">Follow us:</span>
            {SOCIALS.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:bg-brand"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
