"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, Phone } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { EASE } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";

export const NAV = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#team", label: "Team" },
  { href: "#insights", label: "Insights" },
];

export function Header() {
  const { scrollY } = useScroll();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setStuck(y > 120));

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className={cn(
        "fixed z-50 transition-[top,left,right,background-color,box-shadow,border-radius] duration-500",
        stuck
          ? "inset-x-0 top-0 bg-ink/95 shadow-xl shadow-black/10 backdrop-blur-md"
          : "inset-x-4 top-4 sm:inset-x-8"
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between gap-6 px-5 transition-[height] duration-500 sm:px-8",
          stuck ? "h-[76px] max-w-7xl" : "h-[96px]"
        )}
      >
        <a href="#top" aria-label="usup.io home" className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative px-3.5 py-2 text-[15px] text-white/85 transition-colors hover:text-white"
                >
                  {l.label}
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-right scale-x-0 rounded-full bg-brand transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 sm:gap-6">
          <a href="tel:+10000000000" className="group hidden items-center gap-3 xl:flex">
            <span className="relative grid size-11 place-items-center rounded-full bg-brand text-white">
              <span className="absolute inset-0 animate-ping rounded-full bg-brand/40 [animation-duration:2.4s]" />
              <Phone className="relative size-[18px]" />
            </span>
            <span className="leading-tight text-white">
              <span className="block text-sm font-semibold">Call us:</span>
              <span className="block text-[15px] text-white/85 transition-colors group-hover:text-white">
                +1 (000) 000 0000
              </span>
            </span>
          </a>
          <ThemeToggle />
          <Button
            nativeButton={false}
            render={<a href="#contact" />}
            variant="outline"
            className="hidden h-12 rounded-full border-white/80 bg-transparent px-7 text-[15px] text-white hover:border-brand hover:bg-brand hover:text-white sm:inline-flex dark:bg-transparent"
          >
            Book a call
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  size="icon-lg"
                  className="size-11 rounded-full bg-brand text-white hover:bg-brand-pressed lg:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-full border-0 bg-ink text-white sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="px-6 pt-6">
                <Logo />
              </div>
              <ul className="mt-8 flex flex-col px-4">
                {NAV.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: EASE }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-white/10 px-2 py-4 text-xl font-semibold transition-colors hover:text-brand"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto p-6">
                <Button
                  nativeButton={false}
                  render={<a href="#contact" onClick={() => setOpen(false)} />}
                  className="h-12 w-full rounded-full text-base"
                >
                  Book a call
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
