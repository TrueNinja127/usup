"use client";

import { MotionConfig, useReducedMotion } from "motion/react";
import { ReactLenis } from "lenis/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MotionConfig reducedMotion="user">
        {reduceMotion ? (
          children
        ) : (
          <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -80 } }}>
            {children}
          </ReactLenis>
        )}
      </MotionConfig>
    </ThemeProvider>
  );
}
