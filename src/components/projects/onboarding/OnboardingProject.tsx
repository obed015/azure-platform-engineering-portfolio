"use client";

import Image from "next/image";
import Link from "next/link";

import { OnboardingGallery } from "./OnboardingGallery";
import { OnboardingValidation } from "./OnboardingValidation";

const impact = [
  "Reduced new-starter onboarding effort by automating user creation, group assignment, and welcome email delivery.",
  "Reduced manual permission errors by applying department or job-title based access patterns through a repeatable workflow.",
  "Improved security posture by standardizing group membership instead of relying on ad-hoc access requests.",
  "Improved operational visibility through Logic App run history and Entra ID logs.",
  "Standardized communication across HR, IT, managers, and new starters through automated email notifications.",
  "Reduced support delays by providing clear onboarding evidence and workflow execution status.",
  "Created a scalable pattern that can later add approvals, licence assignment, Teams notifications, and RBAC templates.",
];

const automationFlow = [
  {
    title: "Onboarding request submitted",
    meta: "SharePoint list, email, or request endpoint",
    body:
      "HR or a manager submits new-starter details such as display name, username, email, department, and job title.",
  },
  {
    title: "Logic App workflow starts",
    meta: "Event-driven orchestration",
    body:
      "The Logic App captures the trigger payload and passes dynamic values into downstream identity and notification actions.",
  },
  {
    title: "User created in Microsoft Entra ID",
    meta: "Azure AD / Entra connector",
    body:
      "The workflow creates the user profile using dynamic fields such as display name, UPN, mail nickname, and request metadata.",
  },
  {
    title: "Access group assigned",
    meta: "Department or job-title based access",
    body:
      "The workflow assigns the user to the correct security group so access follows a standard onboarding template.",
  },
  {
    title: "Emails and audit trail generated",
    meta: "Outlook connector + run history",
    body:
      "The new starter receives a welcome email, stakeholders are notified, and Logic App run history records execution.",
  },
];

const lessons = [
  {
    title: "Designing onboarding as a repeatable workflow instead of a manual checklist",
    body:
      "The project showed how Logic Apps can turn repeated service desk tasks into a controlled workflow with clear input, actions, outputs, and run history.",
    points: [
      "Benefit: fewer manual steps and more consistent onboarding outcomes.",
      "Trade-off: request data needs to be structured correctly before automation can trust it.",
      "Outcome: a practical automation pattern that maps well to real IT operations.",
    ],
  },
  {
    title: "Understanding why group-based access is safer than copying permissions manually",
    body:
      "Assigning access through groups makes onboarding more consistent and easier to audit than manually applying permissions to each user.",
    points: [
      "Security groups act as reusable access templates.",
      "Department or job-title logic keeps access decisions structured.",
      "This supports least privilege and reduces accidental over-permissioning.",
    ],
  },
  {
    title: "Using run history and logs as operational evidence",
    body:
      "The value of automation is not only that it runs, but that it can be reviewed, troubleshot, and evidenced later.",
    points: [
      "Logic App run history shows exactly where a workflow succeeded or failed.",
      "Entra ID logs support identity validation and audit review.",
      "Azure Monitor can centralize alerting and visibility.",
    ],
  },
  {
    title: "How this can evolve into a production-ready onboarding platform",
    body:
      "The current version proves the core workflow. Future improvements can make the same design more enterprise-ready.",
    points: [
      "Add manager approval before user creation or privileged access assignment.",
      "Add automatic Microsoft 365 licence assignment.",
      "Add Teams notifications for IT and HR.",
      "Add Bicep-defined access templates and environment-specific configuration.",
    ],
  },
];

export function OnboardingProject() {
  return (
    <main className="ob-page">
      <div className="ob-grid" aria-hidden="true" />

      <header className="ob-header">
        <Link href="/" className="ob-brand" aria-label="Return home">
          OO
        </Link>

        <span>PROJECT SYSTEM / AZURE ONBOARDING AUTOMATOR</span>

        <Link href="/#projects">← PROJECT INDEX</Link>
      </header>

      <section className="ob-hero">
        <div className="ob-hero-copy">
          <div className="ob-eyebrow">
            <i />
            LOGIC APPS · ENTRA ID · RBAC · HR-DRIVEN ONBOARDING AUTOMATION
          </div>

          <div className="ob-project-id">
            <span>PROJECT / 01</span>
            <strong>SYSTEM ONLINE</strong>
          </div>

          <h1>
            <span className="ob-project-name">
              AZURE ONBOARDING
              <br />
              AUTOMATOR
            </span>

            <span className="ob-project-title">
              Identity and access automation for new employee onboarding.
            </span>
          </h1>

          <p className="ob-project-summary">
            A hands-on Azure identity automation project using Logic Apps,
            Microsoft Entra ID, security groups, RBAC thinking, email
            notifications, and monitoring evidence to standardize the
            new-starter process.
          </p>

          <div className="ob-tags">
            {[
              "AZURE LOGIC APPS",
              "MICROSOFT ENTRA ID",
              "RBAC + SECURITY GROUPS",
              "OFFICE 365 OUTLOOK",
              "SHAREPOINT / EMAIL TRIGGER",
              "AZURE MONITOR",
              "AZ-104 ALIGNED",
            ].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className="ob-actions">
            <a href="#workflow">VIEW WORKFLOW ↓</a>
            <a href="#business-impact">BUSINESS IMPACT</a>
            <a href="#gallery">EVIDENCE GALLERY</a>
            <a href="#validation">VALIDATION FLOW</a>
          </div>

          <div className="ob-meta">
            <span>● TRIGGER / SHAREPOINT LIST · EMAIL · ONBOARDING REQUEST</span>
            <span>● IDENTITY / ENTRA USER CREATION + GROUP ASSIGNMENT</span>
            <span>● EVIDENCE / RUN HISTORY + EMAIL + DIRECTORY LOGS</span>
          </div>

          <nav className="ob-nav">
            {[
              ["overview", "OVERVIEW"],
              ["business-impact", "BUSINESS IMPACT"],
              ["workflow", "WORKFLOW"],
              ["identity", "IDENTITY"],
              ["gallery", "GALLERY"],
              ["validation", "VALIDATION"],
              ["techstack", "TECH STACK"],
              ["snapshot", "SNAPSHOT"],
              ["lessons", "LESSONS"],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="ob-hero-visual">
          <div className="ob-arch-frame">
            <div className="ob-frame-top">
              <div>
                <span>IDENTITY / CONTROL SURFACE</span>
                <strong>ONBOARDING AUTOMATION FLOW</strong>
              </div>

              <em>● ACTIVE</em>
            </div>

            <div className="ob-hero-image">
              <Image
                src="/images/onboarding.webp"
                alt="Azure Onboarding Automator"
                width={1400}
                height={900}
                priority
              />
            </div>

            <div className="ob-telemetry">
              <div>
                <span>TRIGGER</span>
                <strong>HR REQUEST</strong>
              </div>
              <div>
                <span>IDENTITY</span>
                <strong>ENTRA ID</strong>
              </div>
              <div>
                <span>AUDIT</span>
                <strong>RUN HISTORY</strong>
              </div>
            </div>

            <pre>{`HR / Manager request
→ SharePoint list or email trigger
→ Azure Logic App workflow
→ Create user in Microsoft Entra ID
→ Assign security group / access template
→ Send welcome + IT notification emails
→ Review Logic App run history + Entra logs`}</pre>
          </div>
        </div>
      </section>

      <section id="overview" className="ob-section">
        <div className="ob-heading">
          <span>01 / OVERVIEW</span>
          <h2>WHAT AZURE ONBOARDING AUTOMATOR SOLVES.</h2>
          <p>
            New employee onboarding is often repetitive, inconsistent, and
            dependent on manual IT checks. This project converts an HR or
            manager request into a controlled identity workflow that creates
            the user, assigns the right access group, sends onboarding
            communication, and leaves an operational audit trail.
          </p>
        </div>

        <div className="ob-two-grid">
          <article className="ob-panel">
            <small>THE PROBLEM</small>
            <h3>MANUAL ONBOARDING CREATES DELAY, INCONSISTENCY, AND ACCESS RISK.</h3>
            <p>
              Without automation, IT teams can create accounts inconsistently,
              copy access from existing users, miss group assignments, or rely
              on informal handoffs.
            </p>
            <ul>
              <li>Manual user creation can lead to inconsistent naming and profile standards.</li>
              <li>Department-based access is easy to apply incorrectly by hand.</li>
              <li>HR, IT, and managers may not know whether onboarding completed successfully.</li>
              <li>Support teams need run history and logs to investigate failures.</li>
            </ul>
          </article>

          <article className="ob-panel">
            <small>THE SOLUTION</small>
            <h3>AUTOMATED IDENTITY PROVISIONING WITH REPEATABLE ACCESS PATTERNS.</h3>
            <p>
              Logic Apps orchestrates request intake, user creation, group
              assignment, welcome email, and operational review in a repeatable
              Azure-native workflow.
            </p>

            <div className="ob-pills">
              {[
                "CREATE USER",
                "ASSIGN GROUP",
                "NOTIFY HR / IT",
                "MONITOR RUN HISTORY",
                "AUDIT EVIDENCE",
              ].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="business-impact" className="ob-section">
        <div className="ob-heading">
          <span>02 / BUSINESS IMPACT</span>
          <h2>FASTER ONBOARDING, FEWER ACCESS ERRORS, CLEARER AUDIT EVIDENCE.</h2>
        </div>

        <article className="ob-panel">
          <ul className="ob-impact">
            {impact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section id="workflow" className="ob-section">
        <div className="ob-heading">
          <span>03 / WORKFLOW ARCHITECTURE</span>
          <h2>FROM ONBOARDING REQUEST TO READY-TO-USE ACCOUNT.</h2>
          <p>
            HR or a manager submits a request, Logic Apps handles orchestration,
            Entra ID becomes the identity source of truth, and the workflow
            produces notifications and operational evidence.
          </p>
        </div>

        <div className="ob-two-grid">
          <article className="ob-panel">
            <div className="ob-panel-label">AUTOMATION FLOW</div>

            <div className="ob-step-list">
              {automationFlow.map((step, index) => (
                <div key={step.title} className="ob-step">
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

          <article className="ob-panel">
            <div className="ob-panel-label">VALIDATION FLOW</div>

            <div className="ob-step-list">
              {[
                ["Submit a test onboarding request", "Use a SharePoint entry or email trigger with realistic employee details."],
                ["Check Logic App run history", "Confirm each action completed and inspect failed connector steps if needed."],
                ["Verify Entra ID user creation", "Confirm the expected display name, username, UPN, and profile details."],
                ["Verify group assignment", "Check the user was added to the correct access group."],
                ["Verify communication and logs", "Confirm welcome email delivery and review Entra/Logic App evidence."],
              ].map(([title, body], index) => (
                <div key={title} className="ob-step">
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

        <div className="ob-topology">
          <div className="ob-topology-head">
            <span>IDENTITY LIFECYCLE / ONBOARDING CONTROL FLOW</span>
            <strong>REQUEST → CREATE → ASSIGN → NOTIFY → AUDIT</strong>
          </div>

          <pre>{`HR / Manager
    ↓
Onboarding request
    ↓
SharePoint / Email trigger
    ↓
Azure Logic App
    ↓
Microsoft Entra ID user
    ↓
Security group assignment
    ↓
Outlook notifications
    ↓
Logic App run history + Entra logs`}</pre>
        </div>
      </section>

      <section id="identity" className="ob-section">
        <div className="ob-heading">
          <span>04 / IDENTITY & ACCESS</span>
          <h2>CONSISTENT IDENTITY PROVISIONING AND GROUP-BASED ACCESS.</h2>
        </div>

        <div className="ob-two-grid">
          <article className="ob-panel">
            <small>USER PROVISIONING</small>
            <ul>
              <li>Creates the Entra ID user from submitted onboarding details.</li>
              <li>Uses dynamic values for display name, username, UPN, and mail nickname.</li>
              <li>Supports HR or manager-driven requests from common Microsoft 365 tools.</li>
              <li>Leaves execution evidence in Logic App run history.</li>
            </ul>
          </article>

          <article className="ob-panel">
            <small>ACCESS ASSIGNMENT</small>
            <ul>
              <li>Assigns the new user to a department or role-based security group.</li>
              <li>Supports least privilege through predefined access templates.</li>
              <li>Reduces incorrect access caused by manual onboarding steps.</li>
              <li>Can later extend to licence assignment, approval gates, and RBAC role assignment.</li>
            </ul>
          </article>
        </div>
      </section>

      <OnboardingGallery />
      <OnboardingValidation />

      <section id="techstack" className="ob-section">
        <div className="ob-heading">
          <span>07 / TECH STACK</span>
          <h2>AZURE-NATIVE TOOLS USED IN THE ONBOARDING WORKFLOW.</h2>
        </div>

        <div className="ob-three-grid">
          <article className="ob-panel">
            <small>AUTOMATION & TRIGGERS</small>
            <ul>
              <li>Azure Logic Apps</li>
              <li>SharePoint list trigger</li>
              <li>Email trigger</li>
              <li>Dynamic content mapping</li>
            </ul>
          </article>

          <article className="ob-panel">
            <small>IDENTITY & ACCESS</small>
            <ul>
              <li>Microsoft Entra ID</li>
              <li>Security groups</li>
              <li>RBAC / least privilege thinking</li>
              <li>ARM/Bicep extension path</li>
            </ul>
          </article>

          <article className="ob-panel">
            <small>MONITORING & COMMUNICATION</small>
            <ul>
              <li>Logic App run history</li>
              <li>Azure Monitor</li>
              <li>Entra ID logs</li>
              <li>Office 365 Outlook connector</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="snapshot" className="ob-section">
        <div className="ob-heading">
          <span>08 / PROJECT SNAPSHOT</span>
          <h2>AZURE ONBOARDING AUTOMATOR / SYSTEM STATE.</h2>
        </div>

        <div className="ob-snapshot">
          {[
            ["TRIGGER MODEL", "SharePoint list, email, or onboarding request"],
            ["IDENTITY ACTION", "Create user in Microsoft Entra ID"],
            ["ACCESS ACTION", "Assign security group based on role or department"],
            ["COMMUNICATION", "Welcome email and stakeholder notification"],
            ["AUDIT EVIDENCE", "Logic App run history and Entra ID logs"],
            ["ROLE ALIGNMENT", "Azure Administrator · Identity · M365 · Cloud Support"],
          ].map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="lessons" className="ob-section">
        <div className="ob-heading">
          <span>09 / CHALLENGES & LESSONS</span>
          <h2>WHAT THIS BUILD TAUGHT ME.</h2>
        </div>

        <div className="ob-lessons">
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

      <footer className="ob-footer">
        <Link href="/#projects">← ALL PROJECTS</Link>
        <span>AZURE ONBOARDING AUTOMATOR / IDENTITY AUTOMATION</span>
        <span>ENGINEERING STORY / COMPLETE</span>
      </footer>
    </main>
  );
}
