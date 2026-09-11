"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

import type { ProjectDeepDive } from "@/data/projectDeepDives";

interface ProjectDeepDiveViewProps {
  project: ProjectDeepDive;
}

export function ProjectDeepDiveView({
  project,
}: ProjectDeepDiveViewProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap
        .timeline({
          defaults: {
            ease: "power3.out",
          },
        })
        .from(".deep-project-kicker", {
          opacity: 0,
          y: 12,
          duration: 0.35,
        })
        .from(
          ".deep-project-title",
          {
            opacity: 0,
            y: 44,
            duration: 0.7,
          },
          "-=0.15"
        )
        .from(
          ".deep-project-summary",
          {
            opacity: 0,
            y: 16,
            duration: 0.45,
          },
          "-=0.3"
        );
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <main
      ref={rootRef}
      className="deep-project"
    >
      <div className="deep-project-grid-overlay" />

      <header className="deep-project-header">
        <Link
          href="/"
          className="deep-project-brand"
        >
          OO
        </Link>

        <span>
          ENGINEERING / TECHNICAL DEEP DIVE
        </span>

        <Link
          href={`/projects/${project.slug}`}
          className="deep-project-back"
        >
          ← PROJECT OVERVIEW
        </Link>
      </header>

      <section className="deep-project-hero">
        <div className="deep-project-kicker">
          {project.projectNumber} / {project.subtitle}
        </div>

        <h1 className="deep-project-title">
          {project.title}
        </h1>

        <p className="deep-project-summary">
          {project.summary}
        </p>

        <div className="deep-project-tech">
          {project.technologies.map((technology) => (
            <span key={technology}>
              {technology}
            </span>
          ))}
        </div>
      </section>

      <section className="deep-project-architecture">
        <div className="deep-project-heading">
          <span>00 / SYSTEM MAP</span>
          <h2>ARCHITECTURE FLOW.</h2>
        </div>

        <div className="deep-project-flow">
          {project.architecture.map((step, index) => (
            <div
              key={step}
              className="deep-project-flow-item"
            >
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="deep-project-layout">
        <aside className="deep-project-rail">
          <div className="deep-project-rail-sticky">
            <span className="deep-project-rail-label">
              ENGINEERING INDEX
            </span>

            <nav>
              {project.chapters.map((chapter) => (
                <a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                >
                  <span>{chapter.number}</span>
                  {chapter.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <div className="deep-project-content">
          {project.chapters.map((chapter) => (
            <article
              key={chapter.id}
              id={chapter.id}
              className="deep-project-chapter"
            >
              <div className="deep-project-chapter-header">
                <span>{chapter.number}</span>

                <div>
                  <small>{chapter.label}</small>
                  <h2>{chapter.title}</h2>
                </div>
              </div>

              <p className="deep-project-chapter-body">
                {chapter.body}
              </p>

              {chapter.points && (
                <div className="deep-project-points">
                  {chapter.points.map((point, index) => (
                    <div
                      key={point}
                      className="deep-project-point"
                    >
                      <span>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p>{point}</p>
                    </div>
                  ))}
                </div>
              )}

              {chapter.technologies && (
                <div className="deep-project-chapter-tech">
                  {chapter.technologies.map((technology) => (
                    <span key={technology}>
                      {technology}
                    </span>
                  ))}
                </div>
              )}

              {chapter.evidence && (
                <div className="deep-project-evidence">
                  {chapter.evidence.map((item) => (
                    <article key={item.title}>
                      <span>IMPLEMENTATION NOTE</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </article>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <footer className="deep-project-footer">
        <Link href={`/projects/${project.slug}`}>
          ← RETURN TO PROJECT OVERVIEW
        </Link>

        <Link href="/#projects">
          VIEW ALL SYSTEMS →
        </Link>
      </footer>
    </main>
  );
}