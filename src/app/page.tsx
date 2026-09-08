import { About } from "@/components/about/About";
import { Contact } from "@/components/contact/Contact";
import { Experience } from "@/components/experience/Experience";
import { Hero } from "@/components/hero/Hero";
import { Lab } from "@/components/lab/Lab";
import { Navigation } from "@/components/navigation/Navigation";
import { Projects } from "@/components/projects/Projects";

export default function Home() {
  return (
    <main
      id="top"
      className="platform-shell"
    >
      <Navigation />

      <Hero />

      <About />

      <Projects />

      <Lab />

      <Experience />

      <Contact />
    </main>
  );
}