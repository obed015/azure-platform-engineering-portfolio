"use client";

import { useEffect, useState } from "react";

import { About } from "@/components/about/About";
import { BootSequence } from "@/components/boot/BootSequence";
import { Certifications } from "@/components/certifications/Certifications";
import { Contact } from "@/components/contact/Contact";
import { Experience } from "@/components/experience/Experience";
import { Hero } from "@/components/hero/Hero";
import { BottomNav } from "@/components/hud/BottomNav";
import { HudFrame } from "@/components/hud/HudFrame";
import { LeftRail } from "@/components/hud/LeftRail";
import { MenuOverlay } from "@/components/hud/MenuOverlay";
import { RightRail } from "@/components/hud/RightRail";
import { TopHud } from "@/components/hud/TopHud";
import { Projects } from "@/components/projects/Projects";
import { Skills } from "@/components/skills/Skills";

export function PlatformExperience() {
  const [bootComplete, setBootComplete] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        <HudFrame>
          <TopHud onMenuOpen={() => setMenuOpen(true)} />

          <LeftRail />
          <RightRail />
          <BottomNav />

          <Hero />
          <About />
          <Skills />
          <Certifications />
          <Projects />
          <Experience />
          <Contact />

          <MenuOverlay
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
          />
        </HudFrame>
      </div>
    </>
  );
}
