"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const technologies = [
  "AZURE",
  "ENTRA ID",
  "TERRAFORM",
  "POWERSHELL",
  "INTUNE",
  "MICROSOFT GRAPH",
];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".hero-eyebrow", {
          opacity: 0,
          y: 16,
          duration: 0.45,
        })
        .from(
          ".hero-name-line",
          {
            opacity: 0,
            y: 70,
            duration: 0.8,
            stagger: 0.12,
          },
          "-=0.15"
        )
        .from(
          ".hero-statement-item",
          {
            opacity: 0,
            y: 14,
            duration: 0.4,
            stagger: 0.08,
          },
          "-=0.35"
        )
        .from(
          ".hero-description",
          {
            opacity: 0,
            y: 14,
            duration: 0.45,
          },
          "-=0.15"
        )
        .from(
          ".hero-tech-item",
          {
            opacity: 0,
            y: 10,
            duration: 0.35,
            stagger: 0.05,
          },
          "-=0.15"
        );
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="foundation-screen"
    >
      <div className="foundation-content">
        <p className="eyebrow hero-eyebrow">
          CLOUD_PLATFORM_ENGINEER
        </p>

        <h1>
          <span className="hero-name-line">
            OBED
          </span>

          <br />

          <span className="hero-name-line">
            OWUSU
          </span>
        </h1>

        <div className="statement">
          <span className="hero-statement-item">
            BUILD.
          </span>

          <span className="hero-statement-item">
            SECURE.
          </span>

          <span className="hero-statement-item">
            AUTOMATE.
          </span>

          <span className="hero-statement-item">
            OPERATE.
          </span>
        </div>

        <p className="description hero-description">
          Building secure, automated and observable Azure
          platforms across infrastructure, identity,
          security, integration and endpoint management.
        </p>
      </div>

      <div className="foundation-footer">
        {technologies.map((technology) => (
          <span
            key={technology}
            className="hero-tech-item"
          >
            {technology}
          </span>
        ))}
      </div>
    </section>
  );
}