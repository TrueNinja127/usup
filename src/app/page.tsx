import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Why } from "@/components/sections/why";
import { Process } from "@/components/sections/process";
import { Band } from "@/components/sections/band";
import { Team } from "@/components/sections/team";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Insights } from "@/components/sections/insights";
import { Contact } from "@/components/sections/contact";
import { Cta } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";
import { BackToTop } from "@/components/back-to-top";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-x-clip">
        <Hero />
        <About />
        <Services />
        <Why />
        <Process />
        <Band />
        <Team />
        <Testimonials />
        <Faq />
        <Insights />
        <Contact />
        <Cta />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
