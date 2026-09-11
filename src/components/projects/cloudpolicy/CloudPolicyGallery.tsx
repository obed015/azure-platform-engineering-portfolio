"use client";

import Image from "next/image";
import { useState } from "react";

const shots = [
  ["cloud-policy-architecture-main1.webp", "End-to-end architecture diagram", "GitHub, Azure Policy, workbook, alerting, remediation, and restored compliance."],
  ["governance-resource-group.webp", "Governance resource group", "rg-governance-core with workbook, Log Analytics workspace, action group, and alert rules."],
  ["activity-log-diagnostic-settings.webp", "Diagnostic settings to Log Analytics", "Subscription Activity Log categories streaming into law-governance-core."],
  ["workbook-before-remediation.webp", "Workbook before remediation", "Non-compliance visible in the dashboard before correction."],
  ["policy-compliance-noncompliant.webp", "Policy compliance before remediation", "Live Azure Policy state showing non-compliant Storage Accounts."],
  ["alert-rule-overview.webp", "Alert rule overview", "Azure Monitor log search alert configured against governance policy state."],
  ["alert-history-fired.webp", "Alert history and fired condition", "Alert history proving the non-compliance threshold was crossed."],
  ["alert-email-notification.webp", "Email notification delivered", "Action Group email proving external notification delivery."],
  ["cli-remediation-succeeded.webp", "CLI remediation success", "Terminal evidence showing successful remediation deployments."],
  ["storage-config-disabled.webp", "Storage configuration after remediation", "Blob anonymous access disabled after the modify policy corrected the resource."],
  ["policy-compliance-final.webp", "Policy compliance after remediation", "Initiative state returned to fully compliant."],
  ["workbook-after-remediation.webp", "Workbook after remediation", "Dashboard showing no remaining non-compliance after automated correction."],
];

export function CloudPolicyGallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="gallery" className="cp-section">
      <div className="cp-heading">
        <span>05 / SCREENSHOT GALLERY</span>
        <h2>REAL EVIDENCE FROM THE LIVE BUILD.</h2>
        <p>
          The gallery follows the actual validation story from
          deployed governance resources and non-compliance
          through alerting, remediation, and the final compliant
          state.
        </p>
      </div>

      <div className="cp-gallery">
        {shots.map(([src, title, caption], index) => (
          <button
            key={src}
            type="button"
            className={`cp-shot ${index === 0 ? "cp-shot-featured" : ""}`}
            onClick={() => setActive(index)}
          >
            <div className="cp-shot-media">
              <span>{index === 0 ? "ARCHITECTURE" : "LIVE EVIDENCE"}</span>
              <Image
                src={`/images/${src}`}
                alt={title}
                width={1200}
                height={720}
              />
            </div>

            <div className="cp-shot-copy">
              <small>{String(index + 1).padStart(2, "0")} / VALIDATION</small>
              <h3>{title}</h3>
              <p>{caption}</p>
            </div>
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="cp-modal" role="dialog" aria-modal="true">
          <button
            type="button"
            className="cp-modal-backdrop"
            onClick={() => setActive(null)}
            aria-label="Close screenshot"
          />

          <div className="cp-modal-panel">
            <div className="cp-modal-head">
              <div>
                <span>GOVERNANCE EVIDENCE</span>
                <strong>{shots[active][1]}</strong>
              </div>

              <button type="button" onClick={() => setActive(null)}>
                ×
              </button>
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
