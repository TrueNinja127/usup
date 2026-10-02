import { LogoMark } from "@/components/brand/logo";

const WORDS = ["Product Engineering", "Web Apps", "Mobile Apps", "AI & Data", "Cloud & DevOps", "UX/UI Design", "QA & Security"];

/** Tilted red ticker with a dark counter-ticker behind it. */
export function Band() {
  return (
    <section aria-hidden className="relative overflow-hidden py-20">
      <Row className="rotate-[2.5deg] bg-ink text-white/90 [--marquee-duration:50s]" reverse />
      <Row className="relative -mt-[4.5rem] -rotate-[2.5deg] bg-brand text-white shadow-2xl shadow-brand/20 [--marquee-duration:40s]" />
    </section>
  );
}

function Row({ className = "", reverse }: { className?: string; reverse?: boolean }) {
  return (
    <div className={`flex w-[110%] -translate-x-[5%] overflow-hidden py-5 ${className}`}>
      <ul className={`flex shrink-0 items-center gap-10 pr-10 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {[...WORDS, ...WORDS, ...WORDS, ...WORDS].map((w, i) => (
          <li key={i} className="flex items-center gap-10 text-2xl font-bold whitespace-nowrap sm:text-3xl">
            {w}
            <LogoMark tone="white" mono className="h-7 w-auto" />
          </li>
        ))}
      </ul>
    </div>
  );
}
