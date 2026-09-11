"use client";

import Image from "next/image";
import { useState } from "react";

const shots = [
  ["securecloud-hub-hero-architecture.webp", "Architecture diagram", "Overall system flow from CI/CD through upload, scan, storage separation, and secure download."],
  ["easyauth-configuration.webp", "Easy Auth configuration", "Identity-first access enforced before frontend or API requests reach application code."],
  ["client-ui-upload-download.webp", "Client UI", "Working frontend for upload, clean-file listing, and secure download."],
  ["storage-container-layout.webp", "Container layout", "Trust separation between untrusted uploads, clean files, and quarantined content."],
  ["storage-lifecycle-policy.webp", "Versioning & lifecycle", "Resilience and retention management at the storage layer."],
  ["event-grid-subscription.webp", "Event Grid → Scan Function", "Event-driven trigger path from upload to malware inspection."],
  ["scan-function-code.webp", "Scan Function implementation", "Code-level proof that the malware pipeline is implemented, not just diagrammed."],
  ["github-actions-pipeline.webp", "CI/CD pipelines", "Passwordless deployment with GitHub Actions and OIDC."],
  ["terraform-resources.webp", "Terraform stack", "Infrastructure resources provisioned and maintained as code."],
  ["safe-files-container-clean-uploads.webp", "Safe Files Container", "Verified clean files stored in safe-files after malware scanning and metadata validation."],
  ["download-function-sas.webp", "Download API Function", "Identity, authorization, clean-file checks, and SAS issuance intersect here."],
  ["log-analytics-audit.webp", "Audit logs", "Operational traces centralized for observability and investigation."],
];

export function SecureCloudGallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="gallery" className="securecloud-story-section">
      <div className="securecloud-story-heading">
        <span>06 / SCREENSHOT GALLERY</span>
        <h2>KEY HIGHLIGHTS OF SECURECLOUD HUB.</h2>
        <p>
          These screenshots mirror the real system: architecture, authentication, storage layout, event-driven scanning,
          Function code, CI/CD, monitoring, and the working client experience.
        </p>
      </div>

      <div className="securecloud-gallery-grid">
        {shots.map(([src, title, caption], index) => (
          <button
            key={src}
            type="button"
            className={`securecloud-shot ${index === 0 ? "securecloud-shot-featured" : ""}`}
            onClick={() => setActive(index)}
          >
            <div className="securecloud-shot-media">
              <span>KEY SCREENSHOT</span>
              <Image
                src={`/images/${src}`}
                alt={title}
                width={1200}
                height={720}
              />
            </div>
            <div className="securecloud-shot-copy">
              <small>{String(index + 1).padStart(2, "0")} / EVIDENCE</small>
              <h3>{title}</h3>
              <p>{caption}</p>
            </div>
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="securecloud-modal" role="dialog" aria-modal="true">
          <button className="securecloud-modal-backdrop" onClick={() => setActive(null)} aria-label="Close screenshot" />
          <div className="securecloud-modal-panel">
            <div className="securecloud-modal-header">
              <div>
                <span>PROJECT EVIDENCE</span>
                <strong>{shots[active][1]}</strong>
              </div>
              <button type="button" onClick={() => setActive(null)}>×</button>
            </div>
            <Image
              src={`/images/${shots[active][0]}`}
              alt={shots[active][1]}
              width={1600}
              height={950}
            />
            <p>{shots[active][2]}</p>
          </div>
        </div>
      )}
    </section>
  );
}
