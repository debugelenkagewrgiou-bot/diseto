
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import ContactSection from "@/components/contact/page";
import Footer from "@/components/footer";
import Marquee from "@/components/marquee";
import WhatWeDo from "@/components/whatwedo";
import OurProcess from "@/components/process";

export default function Home() {
  return (
    <main className="w-full min-w-0 overflow-x-clip">
      <Hero />
      <Marquee/>
      <WhatWeDo/>
      <OurProcess/>
      <Projects />
      <ContactSection />
      <Footer/>
    </main>
  );
}
