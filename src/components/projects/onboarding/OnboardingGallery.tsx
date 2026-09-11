"use client";

import Image from "next/image";
import { useState } from "react";

type Shot = {
  src: string;
  category: string;
  title: string;
  caption: string;
  featured?: boolean;
};

const shots: Shot[] = [
  {
    src: "onboarding.webp",
    category: "OVERVIEW",
    title: "Onboarding automation overview",
    caption:
      "End-to-end identity automation scenario showing the onboarding workflow from request intake through provisioning, access assignment, notification, and audit evidence.",
    featured: true,
  },
  {
    src: "bume.jpg",
    category: "IDENTITY",
    title: "Entra ID identity foundation",
    caption:
      "Microsoft Entra ID configuration used as the identity foundation for user creation and access management.",
  },
  {
    src: "can.jpg",
    category: "WORKFLOW",
    title: "Access assignment logic",
    caption:
      "Logic App workflow evidence showing the access-assignment step used after onboarding request data is processed.",
  },
  {
    src: "and.jpg",
    category: "PROVISIONING",
    title: "User creation action",
    caption:
      "Logic App workflow evidence for creating or configuring the new starter account in Microsoft Entra ID.",
  },
  {
    src: "email-confirmation.webp",
    category: "NOTIFICATION",
    title: "Welcome email confirmation",
    caption:
      "Automated onboarding communication generated through the Office 365 Outlook connector.",
  },
];

export function OnboardingGallery() {
  const [active, setActive] = useState<number | null>(null);

  const featured = shots[0];
  const evidence = shots.slice(1);

  return (
    <section id="gallery" className="ob-section ob-gallery-section">
      <div className="ob-heading ob-gallery-heading">
        <span>05 / EVIDENCE GALLERY</span>
        <h2>KEY HIGHLIGHTS FROM THE ONBOARDING AUTOMATION BUILD.</h2>
        <p>
          Identity setup, Logic App workflow actions, access assignment, and
          automated communication from the real project evidence.
        </p>
      </div>

      <div className="ob-evidence-shell">
        <div className="ob-evidence-head">
          <div>
            <span>EVIDENCE CONSOLE</span>
            <strong>ONBOARDING AUTOMATION / VERIFIED BUILD ARTIFACTS</strong>
          </div>

          <div className="ob-evidence-status">
            <i />
            05 ITEMS
          </div>
        </div>

        <button
          type="button"
          className="ob-featured-evidence"
          onClick={() => setActive(0)}
        >
          <div className="ob-featured-media">
            <div className="ob-evidence-badge">{featured.category}</div>

            <Image
              src={`/images/${featured.src}`}
              alt={featured.title}
              width={1600}
              height={900}
            />

            <div className="ob-evidence-corner" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="ob-featured-copy">
            <div className="ob-featured-index">
              <span>01</span>
              <small>FEATURED EVIDENCE</small>
            </div>

            <h3>{featured.title}</h3>
            <p>{featured.caption}</p>

            <div className="ob-featured-meta">
              <span>TYPE / ARCHITECTURE</span>
              <span>STATE / CAPTURED</span>
            </div>

            <strong className="ob-open-proof">OPEN EVIDENCE ↗</strong>
          </div>
        </button>

        <div className="ob-evidence-grid">
          {evidence.map((shot, index) => (
            <button
              key={shot.src}
              type="button"
              className="ob-evidence-tile"
              onClick={() => setActive(index + 1)}
            >
              <div className="ob-evidence-tile-media">
                <div className="ob-evidence-badge">{shot.category}</div>

                <Image
                  src={`/images/${shot.src}`}
                  alt={shot.title}
                  width={1200}
                  height={720}
                />

                <span className="ob-evidence-number">
                  {String(index + 2).padStart(2, "0")}
                </span>
              </div>

              <div className="ob-evidence-tile-copy">
                <div>
                  <small>{shot.category} / BUILD PROOF</small>
                  <h3>{shot.title}</h3>
                </div>

                <span>↗</span>
              </div>
            </button>
          ))}
        </div>

        <div className="ob-evidence-foot">
          <span>CLICK ANY EVIDENCE TILE TO INSPECT THE FULL CAPTURE</span>
          <strong>IDENTITY · WORKFLOW · PROVISIONING · NOTIFICATION</strong>
        </div>
      </div>

      {active !== null && (
        <div className="ob-modal" role="dialog" aria-modal="true">
          <button
            type="button"
            className="ob-modal-backdrop"
            onClick={() => setActive(null)}
            aria-label="Close screenshot"
          />

          <div className="ob-modal-panel">
            <div className="ob-modal-head">
              <div>
                <span>{shots[active].category} / ONBOARDING EVIDENCE</span>
                <strong>{shots[active].title}</strong>
              </div>

              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close screenshot"
              >
                ×
              </button>
            </div>

            <div className="ob-modal-image">
              <Image
                src={`/images/${shots[active].src}`}
                alt={shots[active].title}
                width={1800}
                height={1100}
              />
            </div>

            <div className="ob-modal-caption">
              <span>{String(active + 1).padStart(2, "0")} / 05</span>
              <p>{shots[active].caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
