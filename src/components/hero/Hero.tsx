"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import {
  HiArrowDown,
  HiArrowRight,
  HiOutlineMail,
} from "react-icons/hi";

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
        .from(".hero-name", {
          opacity: 0,
          y: 38,
          duration: 0.7,
        })
        .from(
          ".hero-positioning",
          {
            opacity: 0,
            y: 22,
            duration: 0.55,
          },
          "-=0.32"
        )
        .from(
          ".hero-description-new",
          {
            opacity: 0,
            y: 18,
            duration: 0.5,
          },
          "-=0.28"
        )
        .from(
          ".hero-actions-zone",
          {
            opacity: 0,
            y: 18,
            duration: 0.45,
          },
          "-=0.22"
        )
        .from(
          ".hero-side-meta",
          {
            opacity: 0,
            x: 20,
            duration: 0.5,
          },
          "-=0.35"
        )
        .from(
          ".hero-scroll-cue",
          {
            opacity: 0,
            y: 12,
            duration: 0.4,
          },
          "-=0.25"
        );
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <section
      id="top"
      ref={heroRef}
      className="hero-screen"
    >
      <div className="hero-content-new">
        <h1 className="hero-name">
          OBED OWUSU
        </h1>

        <h2 className="hero-positioning">
          ENGINEERING SECURE, AUTOMATED{" "}
          <span>AZURE CLOUD PLATFORMS</span>
        </h2>

        <p className="hero-description-new">
          Cloud Platform Engineer building across Azure
          infrastructure, identity, security, automation
          and modern endpoint management.
        </p>

        <div className="hero-actions-zone">
          <div className="hero-primary-stack">
            <a
              href="#projects"
              className="hero-action hero-action-primary"
            >
              <span className="hero-action-decoration" />

              <HiArrowRight aria-hidden="true" />

              <span>VIEW PROJECTS</span>

              <small>WORK</small>
            </a>

            <a
              href="#projects"
              className="hero-explore-control"
              aria-label="Explore engineering projects"
            >
              <svg
                className="hero-explore-text"
                viewBox="0 0 200 200"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="heroExplorePath"
                    d="
                      M 100,100
                      m -72,0
                      a 72,72 0 1,1 144,0
                      a 72,72 0 1,1 -144,0
                    "
                  />
                </defs>

                <text>
                  <textPath
                    href="#heroExplorePath"
                    startOffset="0%"
                  >
                    DISCOVER MY WORK • EXPLORE PROJECTS •
                  </textPath>
                </text>
              </svg>

              <span className="hero-explore-inner">
                <HiArrowRight aria-hidden="true" />
              </span>
            </a>
          </div>

          <a
            href="#contact"
            className="hero-action hero-action-secondary"
          >
            <span className="hero-action-decoration" />

            <HiOutlineMail aria-hidden="true" />

            <span>CONTACT ME</span>

            <small>MAIL</small>
          </a>
        </div>
      </div>

      <div className="hero-side-meta">
        <div className="hero-meta-block">
          <span>BASED IN</span>

          <strong>
            UNITED
            <br />
            KINGDOM
          </strong>
        </div>

        <div className="hero-meta-block">
          <span>SPECIALISING IN</span>

          <strong>
            AZURE PLATFORM
            <br />
            ENGINEERING
          </strong>
        </div>

        <div className="hero-meta-block hero-meta-featured">
          <span>FEATURED WORK</span>

          <strong>
            SecureCloud
            <br />
            Hub
          </strong>
        </div>
      </div>

      <a
        href="#about"
        className="hero-scroll-cue"
      >
        <span>SCROLL DOWN</span>
        <HiArrowDown aria-hidden="true" />
      </a>
    </section>
  );
}