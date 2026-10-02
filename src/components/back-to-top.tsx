"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { ChevronsUp } from "lucide-react";

/** Floating button with a ring that fills as the page scrolls. */
export function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 600));

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#top"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          className="fixed right-5 bottom-5 z-40 grid size-14 place-items-center rounded-full bg-card text-brand shadow-xl shadow-black/10 transition-colors hover:bg-brand hover:text-white sm:right-8 sm:bottom-8"
        >
          <svg viewBox="0 0 56 56" className="absolute inset-0 size-full -rotate-90" aria-hidden>
            <circle cx="28" cy="28" r="26" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
            <motion.circle cx="28" cy="28" r="26" fill="none" stroke="#e91d25" strokeWidth="2" style={{ pathLength: scrollYProgress }} />
          </svg>
          <ChevronsUp className="size-5" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
