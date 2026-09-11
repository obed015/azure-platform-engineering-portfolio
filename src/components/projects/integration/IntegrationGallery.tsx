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
    src: "integration-ops-architecture.webp",
    category: "ARCHITECTURE",
    title: "Azure Integration Operations architecture",
    caption:
      "End-to-end platform flow across API Management, producer Logic App, Dynamics 365 / Dataverse, Service Bus, consumer Logic App, and Azure Monitor.",
    featured: true,
  },
  {
    src: "apim-202-accepted.webp",
    category: "GATEWAY",
    title: "APIM 202 Accepted",
    caption:
      "Successful request through Azure API Management proving the gateway could trigger the producer Logic App.",
  },
  {
    src: "apim-401-unauthorized.webp",
    category: "BREAK / FIX",
    title: "APIM 401 Unauthorized",
    caption:
      "Backend authentication failure isolated to APIM policy and callback parameters.",
  },
  {
    src: "logicapp-direct-powershell-accepted.webp",
    category: "VALIDATION",
    title: "Direct Logic App test",
    caption:
      "PowerShell test returned Accepted, proving the Logic App backend was healthy outside APIM.",
  },
  {
    src: "apim-429-rate-limit.webp",
    category: "CONTROL",
    title: "APIM rate limiting",
    caption:
      "APIM returned 429 after exceeding the configured request limit, validating gateway protection.",
  },
  {
    src: "servicebus-backlog-45-active.webp",
    category: "INCIDENT",
    title: "Service Bus backlog",
    caption:
      "Consumer outage test produced 45 active messages in the queue and triggered the backlog monitoring path.",
  },
  {
    src: "azure-monitor-backlog-alert-fired.webp",
    category: "ALERT",
    title: "Backlog alert fired",
    caption:
      "Azure Monitor detected the downstream outage condition when active messages crossed the alert threshold.",
  },
  {
    src: "servicebus-queue-drained-zero.webp",
    category: "RECOVERY",
    title: "Queue drained to zero",
    caption:
      "After consumer recovery, active messages returned to zero while dead-letter remained clear.",
  },
  {
    src: "consumer-parse-json-failed.webp",
    category: "BREAK / FIX",
    title: "Consumer Parse JSON failed",
    caption:
      "Logic App run history exposed the parsing failure caused by encoded Service Bus message content.",
  },
  {
    src: "consumer-parse-json-fixed-expression.webp",
    category: "FIX",
    title: "Service Bus payload decoded",
    caption:
      "Parse JSON was corrected by decoding ContentData before parsing the message body.",
  },
  {
    src: "consumer-run-success.webp",
    category: "VALIDATION",
    title: "Consumer run succeeded",
    caption:
      "The Service Bus trigger, Parse JSON, and downstream processing completed successfully after the fix.",
  },
  {
    src: "runbooks-notion.webp",
    category: "OPERATIONS",
    title: "Operational runbooks",
    caption:
      "Runbooks capture detection, triage, remediation, validation, and handover steps for the tested incidents.",
  },
];

export function IntegrationGallery() {
  const [activeShot, setActiveShot] = useState<Shot | null>(null);

  return (
    <>
      <div className="int-gallery">
        {shots.map((shot) => (
          <button
            type="button"
            key={shot.src}
            className={`int-gallery-card ${shot.featured ? "int-gallery-featured" : ""}`}
            onClick={() => setActiveShot(shot)}
          >
            <div className="int-gallery-image">
              <span>{shot.category}</span>
              <Image
                src={`/images/${shot.src}`}
                alt={shot.title}
                fill
                sizes={
                  shot.featured
                    ? "(max-width: 700px) 100vw, (max-width: 1100px) 100vw, 50vw"
                    : "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"
                }
                className="int-gallery-next-image"
              />
            </div>

            <div className="int-gallery-copy">
              <small>{shot.featured ? "PRIMARY EVIDENCE" : "SYSTEM EVIDENCE"}</small>
              <h3>{shot.title}</h3>
              <p>{shot.caption}</p>
            </div>
          </button>
        ))}
      </div>

      {activeShot && (
        <div className="int-gallery-modal" role="dialog" aria-modal="true">
          <button
            className="int-gallery-modal-backdrop"
            type="button"
            aria-label="Close image"
            onClick={() => setActiveShot(null)}
          />

          <div className="int-gallery-modal-content">
            <div className="int-gallery-modal-head">
              <div>
                <span>{activeShot.category}</span>
                <h3>{activeShot.title}</h3>
              </div>

              <button type="button" onClick={() => setActiveShot(null)}>
                CLOSE ×
              </button>
            </div>

            <div className="int-gallery-modal-image">
              <Image
                src={`/images/${activeShot.src}`}
                alt={activeShot.title}
                width={1600}
                height={1000}
                sizes="94vw"
                className="int-gallery-modal-next-image"
              />
            </div>

            <p>{activeShot.caption}</p>
          </div>
        </div>
      )}
    </>
  );
}
