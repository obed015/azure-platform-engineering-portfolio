"use client";

import { useEffect, useState } from "react";
import { About } from "@/components/about/About";
import { BootSequence } from "@/components/boot/BootSequence";
import { Contact } from "@/components/contact/Contact";
import { Experience } from "@/components/experience/Experience";
import { Hero } from "@/components/hero/Hero";
import { Lab } from "@/components/lab/Lab";
import { Navigation } from "@/components/navigation/Navigation";
import { Projects } from "@/components/projects/Projects";

export function PlatformExperience() {
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);

  function handleBootComplete() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    setBootComplete(true);
  }

  return (
    <>
      {!bootComplete && (
        <BootSequence onComplete={handleBootComplete} />
      )}

      <div
        className={
          bootComplete
            ? "platform-experience platform-experience-ready"
            : "platform-experience"
        }
        aria-hidden={!bootComplete}
      >
        <Navigation />

        <Hero />

        <About />

        <Projects />

        <Lab />

        <Experience />

        <Contact />
      </div>
    </>
  );
}