"use client";

import { useState } from "react";

const steps = [
  ["Deploy management-group baseline", "Bicep deploys custom policy definitions, initiative, and assignment to mg-platform."],
  ["Deploy governance resources", "rg-governance-core receives the workspace, workbook, action group, and alert rules."],
  ["Create violating Storage Account", "A deliberately risky configuration produces a real policy violation."],
  ["Force policy scan", "Policy state becomes NonCompliant and the workbook shows the affected resource."],
  ["Validate alerting", "The non-compliance alert fires and Action Group email is delivered."],
  ["Execute remediation", "The assignment-managed identity runs a modify remediation task."],
  ["Verify property change", "allowBlobPublicAccess changes to false."],
  ["Confirm compliance restored", "Policy state returns to compliant and the workbook clears."],
];

export function CloudPolicyValidation() {
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);

  async function run() {
    if (running) return;
    setRunning(true);
    setActive(0);

    for (let index = 0; index < steps.length; index += 1) {
      setActive(index);
      await new Promise((resolve) => setTimeout(resolve, 650));
    }

    setRunning(false);
  }

  return (
    <section id="validation" className="cp-section">
      <div className="cp-heading">
        <span>06 / VALIDATION WALKTHROUGH</span>
        <h2>HOW THE PLATFORM WAS TESTED END TO END.</h2>
        <p>
          This simulation mirrors the real validation sequence:
          deploy, create drift, detect it, alert on it, remediate
          it, and verify the restored configuration.
        </p>
      </div>

      <div className="cp-validation">
        <div className="cp-validation-head">
          <div>
            <span>GOVERNANCE CONTROL RUN</span>
            <strong>DETECT → ALERT → REMEDIATE</strong>
          </div>

          <button type="button" onClick={run} disabled={running}>
            {running ? "RUNNING..." : "RUN VALIDATION"}
          </button>
        </div>

        <div className="cp-validation-grid">
          {steps.map(([title, body], index) => {
            const state =
              index < active
                ? "COMPLETE"
                : index === active
                  ? running
                    ? "ACTIVE"
                    : index === 0
                      ? "READY"
                      : "WAITING"
                  : "WAITING";

            return (
              <article
                key={title}
                className={`cp-validation-step ${
                  index <= active ? "cp-validation-step-active" : ""
                }`}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
                <strong>{state}</strong>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
