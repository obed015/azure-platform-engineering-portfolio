"use client";

import { useState } from "react";

const steps = [
  ["Submit onboarding request", "HR or manager provides realistic new-starter details."],
  ["Trigger Logic App", "The workflow captures the request and maps dynamic values."],
  ["Create Entra ID user", "The account is provisioned with expected identity attributes."],
  ["Assign access group", "Department or job-title logic adds the user to the correct security group."],
  ["Send notifications", "The welcome email and stakeholder notification are generated."],
  ["Review run history", "Logic App execution confirms each action completed."],
  ["Review identity evidence", "Entra logs and directory state provide audit evidence."],
];

export function OnboardingValidation() {
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
    <section id="validation" className="ob-section">
      <div className="ob-heading">
        <span>06 / VALIDATION WALKTHROUGH</span>
        <h2>HOW THE ONBOARDING WORKFLOW IS VERIFIED END TO END.</h2>
        <p>
          A safe simulation of the same operational checks used in the project:
          request intake, identity creation, group assignment, communication,
          run history, and directory evidence.
        </p>
      </div>

      <div className="ob-validation">
        <div className="ob-validation-head">
          <div>
            <span>IDENTITY AUTOMATION RUN</span>
            <strong>REQUEST → PROVISION → ASSIGN → NOTIFY → AUDIT</strong>
          </div>

          <button type="button" onClick={run} disabled={running}>
            {running ? "RUNNING..." : "RUN VALIDATION"}
          </button>
        </div>

        <div className="ob-validation-grid">
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
                className={`ob-validation-step ${
                  index <= active ? "ob-validation-step-active" : ""
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
