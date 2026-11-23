
import { Navigation } from "@/components/navigation";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import ContactSection from "@/components/contact/page";
import Footer from "@/components/footer";
import Marquee from "@/components/marquee";
// import CreativeUniverse from "@/components/creativeuniverse";
import WhatWeDo from "@/components/whatwedo.";

export default function Home() {
  return (
    <main className="w-full min-w-0 overflow-x-clip">
      <Navigation />
      <Hero />
      <Marquee/>
      <WhatWeDo/>
      {/* <CreativeUniverse/> */}
      <Projects />
      <ContactSection />
      <Footer/>
    </main>
  );
}
