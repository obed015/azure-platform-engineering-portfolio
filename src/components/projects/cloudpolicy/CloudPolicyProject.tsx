"use client";

import Image from "next/image";
import Link from "next/link";

import { CloudPolicyGallery } from "./CloudPolicyGallery";
import { CloudPolicyValidation } from "./CloudPolicyValidation";

const impact = [
  "Standardized governance across Azure environments by deploying reusable policy definitions, initiatives, and assignments as code.",
  "Reduced cloud misconfiguration risk by detecting risky Storage Account settings through Azure Policy at management-group scope.",
  "Improved compliance visibility by centralizing policy state evidence into a Log Analytics-backed Azure Workbook dashboard.",
  "Reduced manual reporting effort with audit-ready compliance views, affected resources, and policy results in one dashboard.",
  "Improved operational response through Azure Monitor alerts and Action Group email notification.",
  "Reduced remediation effort using Azure Policy modify remediation with managed identity.",
  "Proved the complete lifecycle: detect, visualize, alert, remediate, and verify compliance restored to 100%.",
];

const controlFlow = [
  {
    title: "GitHub repository + Bicep modules",
    meta: "Management group and subscription templates",
    body:
      "The repo holds custom policy definitions, initiative wiring, assignment logic, workbook JSON, KQL queries, and subscription-scope governance modules.",
  },
  {
    title: "mg-platform baseline deployment",
    meta: "Azure Policy at management-group scope",
    body:
      "Bicep deploys the custom audit policy, remediation policy, and Cloud Governance Baseline initiative to mg-platform, then assigns it with a system-assigned managed identity.",
  },
  {
    title: "rg-governance-core observability layer",
    meta: "Subscription scope",
    body:
      "A governance resource group hosts the Log Analytics workspace, workbook, action group, and log search alert rules.",
  },
  {
    title: "Diagnostic settings + Policy states",
    meta: "Activity Log to workspace",
    body:
      "Subscription Activity Log categories, including Policy, are streamed to the workspace for validation and investigation.",
  },
  {
    title: "Alerting + remediation",
    meta: "Azure Monitor + Azure Policy modify",
    body:
      "Alert rules monitor policy state data, action groups deliver notifications, and remediation tasks correct eligible storage properties.",
  },
];

const lessons = [
  {
    title:
      "Workbook query failed because the wrong table name was used",
    body:
      'The first workbook and alert queries targeted PolicyResources directly. The working path used arg("").PolicyResources for workbook and alert use.',
    points: [
      "Symptom: workbook tile error and alert query resolution failure.",
      'Fix: switch to arg("").PolicyResources and redeploy workbook JSON.',
      "Outcome: donut, table, and alert logic aligned to the same live policy-state source.",
    ],
  },
  {
    title:
      "Activity-based alerting looked correct in theory but failed in practice",
    body:
      "An AzureActivity-based path was explored, but it did not validate consistently enough for the management-group scenario.",
    points: [
      "Symptom: activity alert deployed but did not produce dependable history.",
      "Fix: retain the validated policy-state non-compliance alert as the primary evidence path.",
      "Outcome: the final project story stayed aligned to what was actually proven.",
    ],
  },
  {
    title:
      "The first remediation design targeted the wrong property",
    body:
      "The remediation definition was redesigned around allowBlobPublicAccess because it produced a clean modify-based correction and a verifiable configuration change.",
    points: [
      "Symptom: accepted remediation with no useful deployments or unchanged resource.",
      "Fix: set allowBlobPublicAccess = false through Azure Policy modify.",
      "Outcome: remediation succeeded and the storage setting changed automatically.",
    ],
  },
  {
    title:
      "Remediation required assignment identity and RBAC",
    body:
      "Modify remediation depended on a system-assigned identity on the management-group initiative assignment plus adequate subscription-scope RBAC.",
    points: [
      "Fix: recreate the assignment with managed identity.",
      "Grant Contributor at subscription scope for the lab remediation path.",
      "Outcome: remediation executed successfully and restored compliance.",
    ],
  },
];

export function CloudPolicyProject() {
  return (
    <main className="cp-page">
      <div className="cp-grid" aria-hidden="true" />

      <header className="cp-header">
        <Link href="/" className="cp-brand" aria-label="Return home">
          OO
        </Link>

        <span>PROJECT SYSTEM / CLOUD POLICY COMPLIANCE</span>

        <Link href="/#projects">← PROJECT INDEX</Link>
      </header>

      <section className="cp-hero">
        <div className="cp-hero-copy">
          <div className="cp-eyebrow">
            <i />
            MANAGEMENT GROUP GOVERNANCE · AZURE POLICY · BICEP · REMEDIATION
          </div>

          <div className="cp-project-id">
            <span>PROJECT / 03</span>
            <strong>SYSTEM ONLINE</strong>
          </div>

          <h1>
            <span className="cp-project-name">
              CLOUD POLICY
              <br />
              COMPLIANCE DASHBOARD
            </span>

            <span className="cp-project-title">
              Azure governance that can detect, visualize,
              alert and automatically restore compliance.
            </span>
          </h1>

          <p className="cp-project-summary">
            A full Azure governance observability platform built
            at management-group scope. Custom policies and a
            Cloud Governance Baseline are deployed as code,
            non-compliance is visualized through a workbook,
            Azure Monitor alerts notify stakeholders, and policy
            remediation hardens Storage Accounts and returns the
            environment to compliant state.
          </p>

          <div className="cp-tags">
            {[
              "BICEP GOVERNANCE AS CODE",
              "MG-PLATFORM INITIATIVE",
              "LOG ANALYTICS + WORKBOOK",
              "AZURE MONITOR ALERTS",
              "MANAGED IDENTITY REMEDIATION",
              "POLICY STATES + KQL",
            ].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className="cp-actions">
            <a href="#overview">START PROJECT STORY ↓</a>
            <a href="#architecture">ARCHITECTURE</a>
            <a href="#gallery">GALLERY</a>
            <a href="#validation">VALIDATION FLOW</a>
            <Link href="/projects/cloud-policy-compliance-dashboard/deep-dive">
              ENGINEERING DEEP DIVE ↗
            </Link>
          </div>

          <div className="cp-meta">
            <span>● SCOPE / MG-PLATFORM + LEARNINGCLOUD SUBSCRIPTION</span>
            <span>● SIGNAL / WORKBOOK + POLICY STATE + ALERT HISTORY</span>
            <span>● OUTCOME / DETECT → ALERT → REMEDIATE → COMPLIANT</span>
          </div>

          <nav className="cp-nav">
            {[
              ["overview", "OVERVIEW"],
              ["business-impact", "BUSINESS IMPACT"],
              ["controls", "CONTROLS"],
              ["architecture", "ARCHITECTURE"],
              ["gallery", "GALLERY"],
              ["validation", "VALIDATION"],
              ["techstack", "TECH STACK"],
              ["lessons", "LESSONS"],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="cp-hero-visual">
          <div className="cp-arch-frame">
            <div className="cp-frame-top">
              <div>
                <span>GOVERNANCE / CONTROL SURFACE</span>
                <strong>LIVE POLICY LIFECYCLE</strong>
              </div>

              <em>● ACTIVE</em>
            </div>

            <div className="cp-hero-image">
              <Image
                src="/images/cloud-policy-architecture-main1.webp"
                alt="Cloud Policy Compliance Dashboard architecture"
                width={1400}
                height={900}
                priority
              />
            </div>

            <div className="cp-telemetry">
              <div>
                <span>SCOPE</span>
                <strong>MG-PLATFORM</strong>
              </div>
              <div>
                <span>VISIBILITY</span>
                <strong>WORKBOOK</strong>
              </div>
              <div>
                <span>RESPONSE</span>
                <strong>MODIFY</strong>
              </div>
            </div>

            <pre>{`GitHub → Bicep
→ mg-platform initiative
→ rg-governance-core
→ Log Analytics + Workbook
→ Scheduled Query Alert
→ Action Group
→ Policy Remediation
→ Storage hardened
→ Compliance restored`}</pre>

            <a
              href="https://github.com/obed015/azure-policy-governance"
              target="_blank"
              rel="noreferrer"
            >
              VIEW SOURCE REPOSITORY ↗
            </a>
          </div>
        </div>
      </section>

      <section id="overview" className="cp-section">
        <div className="cp-heading">
          <span>01 / OVERVIEW</span>
          <h2>WHAT THIS PLATFORM SOLVES.</h2>
          <p>
            In many Azure estates, policy exists but operations
            stop at basic auditing. This project turns governance
            into an operational platform: standards are defined
            as code, drift is surfaced visually, alerts notify
            stakeholders, and remediation can restore compliant
            configuration.
          </p>
        </div>

        <div className="cp-two-grid">
          <article className="cp-panel">
            <small>THE BASELINE</small>
            <h3>
              MANAGEMENT-GROUP GOVERNANCE INSTEAD OF ONE-OFF
              SUBSCRIPTION CHECKS.
            </h3>
            <p>
              A custom Cloud Governance Baseline initiative is
              assigned at mg-platform. A dedicated governance
              resource group hosts the workspace, workbook,
              action group, and alert rules.
            </p>
            <ul>
              <li>Custom policy definitions and initiative deployed with Bicep.</li>
              <li>Initiative assigned at management-group scope with managed identity.</li>
              <li>Governance workspace centralized in rg-governance-core.</li>
              <li>Workbook, alerts, and remediation operationalize policy state.</li>
            </ul>
          </article>

          <article className="cp-panel">
            <small>THE FINISHED STORY</small>
            <h3>
              A FULL GOVERNANCE LIFECYCLE, NOT JUST COMPLIANCE
              REPORTING.
            </h3>
            <p>
              A non-compliant Storage Account is detected,
              visualized, used to fire an alert, and then
              automatically remediated. The setting changes,
              compliance returns to 100%, and the workbook
              reflects a clean state.
            </p>

            <div className="cp-pills">
              {[
                "DETECT",
                "VISUALIZE",
                "ALERT",
                "REMEDIATE",
                "RESTORE COMPLIANCE",
              ].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="business-impact" className="cp-section">
        <div className="cp-heading">
          <span>02 / BUSINESS IMPACT</span>
          <h2>
            GOVERNANCE THAT MOVES FROM PASSIVE REPORTING TO
            OPERATIONAL RESPONSE.
          </h2>
        </div>

        <article className="cp-panel">
          <ul className="cp-impact">
            {impact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section id="controls" className="cp-section">
        <div className="cp-heading">
          <span>03 / GOVERNANCE CONTROLS</span>
          <h2>HOW THE CONTROLS WORK TOGETHER.</h2>
          <p>
            Policy enforces the standard. Diagnostic settings
            provide activity data. Workbook queries summarize
            policy state. Scheduled query alerts react to drift.
            Remediation uses assignment identity to correct a
            real resource property.
          </p>
        </div>

        <div className="cp-two-grid">
          <article className="cp-panel">
            <small>DETECTION + VISIBILITY</small>
            <ul>
              <li>Custom audit policy flags risky Storage Account configuration.</li>
              <li>Activity Log diagnostic settings stream Policy events.</li>
              <li>Workbook visuals show non-compliance and affected resources.</li>
              <li>KQL remains stored in repo beside the governance code.</li>
            </ul>
          </article>

          <article className="cp-panel">
            <small>RESPONSE + CORRECTION</small>
            <ul>
              <li>Azure Monitor log search alert reacts to non-compliance.</li>
              <li>Action Group email proves the notification path.</li>
              <li>Managed identity is attached to the initiative assignment.</li>
              <li>Modify remediation sets allowBlobPublicAccess = false.</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="architecture" className="cp-section">
        <div className="cp-heading">
          <span>04 / AZURE ARCHITECTURE</span>
          <h2>FROM GIT PUSH TO RESTORED COMPLIANCE.</h2>
          <p>
            The flow follows the real build: Bicep deployment,
            management-group policy, centralized governance
            resources, live policy-state detection, alerting,
            managed-identity remediation, and final verification.
          </p>
        </div>

        <div className="cp-two-grid">
          <article className="cp-panel">
            <div className="cp-panel-label">CONTROL-PLANE FLOW</div>

            <div className="cp-step-list">
              {controlFlow.map((step, index) => (
                <div key={step.title} className="cp-step">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <small>{step.meta}</small>
                    <p>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="cp-panel">
            <div className="cp-panel-label">VALIDATION FLOW</div>

            <div className="cp-step-list">
              {[
                ["Create a non-compliant Storage Account", "Blob public access and exposure settings create a real policy violation."],
                ["Force policy scan", "The resource appears as NonCompliant in Azure Policy and workbook queries."],
                ["Validate alerting", "The alert fires, appears in history, and sends Action Group email."],
                ["Grant assignment identity RBAC", "Contributor is granted at subscription scope for modify remediation."],
                ["Run remediation and verify", "allowBlobPublicAccess becomes false and policy returns to compliant."],
              ].map(([title, body], index) => (
                <div key={title} className="cp-step">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="cp-topology">
          <div className="cp-topology-head">
            <span>CONTROL SURFACE / GOVERNANCE LIFECYCLE</span>
            <strong>DETECT → VISUALIZE → ALERT → REMEDIATE</strong>
          </div>

          <pre>{`Repository
   ↓
Bicep deployment
   ↓
mg-platform / Cloud Governance Baseline
   ↓
Policy states ───────────────┐
   ↓                         │
Log Analytics + Workbook     │
   ↓                         │
Scheduled Query Alert        │
   ↓                         │
Action Group Email           │
   ↓                         │
Managed Identity Remediation │
   ↓                         │
Storage setting hardened     │
   ↓                         │
100% compliant ←─────────────┘`}</pre>
        </div>
      </section>

      <CloudPolicyGallery />
      <CloudPolicyValidation />

      <section id="techstack" className="cp-section">
        <div className="cp-heading">
          <span>07 / TECH STACK</span>
          <h2>
            AZURE-NATIVE GOVERNANCE AND OPERATIONS BUILDING
            BLOCKS.
          </h2>
        </div>

        <div className="cp-two-grid">
          <article className="cp-panel">
            <small>CONTROL PLANE</small>
            <ul>
              <li>Azure Policy custom definitions</li>
              <li>Management-group policy initiative</li>
              <li>Bicep management-group and subscription deployments</li>
              <li>Managed identity policy assignment</li>
            </ul>
          </article>

          <article className="cp-panel">
            <small>OBSERVABILITY + RESPONSE</small>
            <ul>
              <li>Log Analytics workspace</li>
              <li>Azure Workbook + KQL-backed visuals</li>
              <li>Azure Monitor log search alerts</li>
              <li>Action Group email notification</li>
              <li>Azure Policy remediation tasks</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-heading">
          <span>08 / PROJECT SNAPSHOT</span>
          <h2>CLOUD POLICY COMPLIANCE / SYSTEM STATE.</h2>
        </div>

        <div className="cp-snapshot">
          {[
            ["ASSIGNMENT SCOPE", "mg-platform management group"],
            ["GOVERNANCE RG", "rg-governance-core"],
            ["WORKSPACE", "law-governance-core"],
            ["ALERT PATH", "Policy state → scheduled query alert → Action Group email"],
            ["REMEDIATION TARGET", "Storage Account blob public access disabled automatically"],
            ["FINAL STATE", "Workbook clear, policy 100% compliant"],
          ].map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="lessons" className="cp-section">
        <div className="cp-heading">
          <span>09 / CHALLENGES & LESSONS</span>
          <h2>WHAT BROKE — AND HOW IT WAS FIXED.</h2>
          <p>
            The strongest engineering value came from real
            troubleshooting across policy state queries,
            workbook behaviour, alerting, assignment identity,
            and modify remediation.
          </p>
        </div>

        <div className="cp-lessons">
          {lessons.map((lesson, index) => (
            <details key={lesson.title} open={index === 0}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{lesson.title}</strong>
                <i>+</i>
              </summary>

              <div>
                <p>{lesson.body}</p>
                <ul>
                  {lesson.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </section>

      <footer className="cp-footer">
        <Link href="/#projects">← ALL PROJECTS</Link>
        <span>CLOUD POLICY COMPLIANCE / AZURE GOVERNANCE ENGINEERING</span>
        <Link href="/projects/cloud-policy-compliance-dashboard/deep-dive">
          ENGINEERING DEEP DIVE →
        </Link>
      </footer>
    </main>
  );
}
