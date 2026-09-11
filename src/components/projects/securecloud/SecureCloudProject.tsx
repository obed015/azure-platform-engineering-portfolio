"use client";

import Image from "next/image";
import Link from "next/link";

import { SecureCloudArchitecture } from "./SecureCloudArchitecture";
import { SecureCloudGallery } from "./SecureCloudGallery";
import { SecureCloudDemo } from "./SecureCloudDemo";

const principles = [
  {
    title: "PRIVATE BY DEFAULT",
    body:
      "Storage accounts disable anonymous blob access. All containers remain private and valid data paths use short-lived SAS or authenticated requests.",
    chips: [
      "PRIVATE BLOB STORAGE",
      "NO PUBLIC BLOB URLS",
    ],
  },
  {
    title: "IDENTITY-FIRST ACCESS",
    body:
      "Easy Auth with Microsoft Entra ID is enabled on the Function App. Users authenticate before reaching the frontend or APIs.",
    chips: [
      "EASY AUTH ENFORCED",
      "X-MS-CLIENT-PRINCIPAL",
    ],
  },
  {
    title: "LEAST-PRIVILEGE ACCESS",
    body:
      "Uploads receive short-lived write SAS. Downloads receive read-only SAS only after backend validation.",
    chips: [
      "WRITE SAS / 10 MIN",
      "READ SAS / 15 MIN",
      "PER-FILE SCOPE",
    ],
  },
  {
    title: "EVENT-DRIVEN SCANNING",
    body:
      "Uploads enter incoming-raw as untrusted content. Event Grid invokes scan_function to classify each new blob.",
    chips: [
      "EVENT GRID",
      "SAFE / QUARANTINE",
    ],
  },
  {
    title: "VERSIONING & LIFECYCLE",
    body:
      "Versioning, retention, soft delete and lifecycle policies improve recovery while controlling storage growth.",
    chips: [
      "VERSIONING",
      "SOFT DELETE",
      "LIFECYCLE RULES",
    ],
  },
  {
    title: "IAC + PASSWORDLESS CI/CD",
    body:
      "Terraform provisions the platform and GitHub Actions deploys through OpenID Connect federation without long-lived pipeline secrets.",
    chips: [
      "TERRAFORM",
      "GITHUB ACTIONS + OIDC",
      "NO STORED SECRETS",
    ],
  },
];

const lessons = [
  {
    title:
      "Switching from streamed uploads to direct-to-Blob upload SAS",
    body:
      "The original design could proxy uploads through the Function App. I moved the data path directly from the browser to Blob Storage instead.",
    points: [
      "Lower Function App load and more scalable upload handling.",
      "Required Storage CORS and tighter browser-side flow design.",
      "Resulted in an enterprise-style short-lived write-SAS upload path.",
    ],
  },
  {
    title:
      "Getting user-scoped blob paths correct end-to-end",
    body:
      "The frontend and backend needed a consistent distinction between display names and the real user-scoped Blob path.",
    points: [
      "The interface only displays the base filename.",
      "The backend reconstructs the Blob path using authenticated identity.",
      "Authorization remains inside the trusted backend boundary.",
    ],
  },
  {
    title:
      "Reworking infrastructure for Flex Consumption",
    body:
      "Moving the Function App to Flex Consumption required infrastructure and deployment changes rather than a simple SKU replacement.",
    points: [
      "Flex provisioning differs from classic Linux Consumption.",
      "Several application settings and site configuration patterns changed.",
      "Event Grid and application deployment had to be revalidated.",
    ],
  },
  {
    title:
      "Solving runtime issues in Event Grid and Easy Auth",
    body:
      "The strongest engineering lessons came from troubleshooting the actual integration between authentication and platform events.",
    points: [
      "Event Grid subscriptions had to be recreated after infrastructure changes.",
      "Easy Auth needed the Event Grid webhook path handled correctly.",
      "Additional Function and Application Insights telemetry exposed the real runtime behaviour.",
    ],
  },
];

const heroTags = [
  "AZURE FUNCTIONS FLEX",
  "TERRAFORM IAC",
  "GITHUB ACTIONS · OIDC",
  "EASY AUTH · ENTRA ID",
  "MANAGED IDENTITY + RBAC",
  "EVENT GRID",
  "DIRECT-TO-BLOB SAS",
];

export function SecureCloudProject() {
  return (
    <main className="securecloud-story-page">
      <div
        className="securecloud-story-grid"
        aria-hidden="true"
      />

      <header className="securecloud-story-header">
        <Link
          href="/"
          className="securecloud-story-brand"
          aria-label="Return home"
        >
          OO
        </Link>

        <span>
          PROJECT SYSTEM / SECURECLOUD HUB
        </span>

        <Link href="/#projects">
          ← PROJECT INDEX
        </Link>
      </header>

      <section className="securecloud-story-hero">
        <div className="securecloud-story-hero-copy">
          <div className="securecloud-story-eyebrow">
            <i />
            ZERO-TRUST · AZURE SERVERLESS · FILE SECURITY
          </div>

          <div className="securecloud-project-id">
            <span>PROJECT / 02</span>
            <strong>SYSTEM ONLINE</strong>
          </div>

          <h1>
            <span className="securecloud-project-name">
              SECURECLOUD HUB
            </span>

            <span className="securecloud-project-title">
              Azure-native zero-trust file sharing
              with identity, scanning and
              short-lived access.
            </span>
          </h1>

          <p className="securecloud-project-summary">
            A production-style Azure serverless platform
            using Microsoft Entra ID authentication,
            direct-to-Blob uploads with temporary write
            SAS, Event Grid malware scanning,
            clean/quarantine storage separation and
            temporary read-only downloads.
          </p>

          <div className="securecloud-story-tags">
            {heroTags.map((tag) => (
              <span key={tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className="securecloud-story-actions">
            <a href="#overview">
              START PROJECT STORY ↓
            </a>

            <a href="#architecture">
              ARCHITECTURE
            </a>

            <a href="#gallery">
              GALLERY
            </a>

            <a href="#demo">
              LIVE SIMULATION
            </a>

            <Link href="/projects/securecloud-hub/deep-dive">
              ENGINEERING DEEP DIVE ↗
            </Link>
          </div>

          <div className="securecloud-story-meta">
            <span>
              ● UPLOAD / WRITE SAS / 10 MIN
            </span>

            <span>
              ● DOWNLOAD / READ SAS / 15 MIN
            </span>

            <span>
              ● DEPLOYMENT / GITHUB OIDC
            </span>
          </div>

          <nav className="securecloud-story-nav">
            {[
              ["overview", "OVERVIEW"],
              ["business-impact", "BUSINESS IMPACT"],
              ["principles", "ZERO TRUST"],
              ["architecture", "ARCHITECTURE"],
              ["security", "SECURITY"],
              ["gallery", "GALLERY"],
              ["demo", "DEMO"],
              ["techstack", "TECH STACK"],
              ["lessons", "LESSONS"],
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="securecloud-story-hero-visual">
          <div className="securecloud-hero-arch-frame">
            <div className="securecloud-hero-frame-top">
              <div>
                <span>
                  ARCHITECTURE / CONTROL SURFACE
                </span>

                <strong>
                  DEPLOYED AZURE SYSTEM
                </strong>
              </div>

              <div className="securecloud-hero-health">
                <i />
                ACTIVE
              </div>
            </div>

            <div className="securecloud-hero-image-wrap">
              <Image
                src="/images/securecloud-hub-hero-architecture.webp"
                alt="SecureCloud Hub Azure architecture"
                width={1200}
                height={800}
                priority
              />
            </div>

            <div className="securecloud-hero-telemetry">
              <div>
                <span>IDENTITY</span>
                <strong>ENTRA ID</strong>
              </div>

              <div>
                <span>STORAGE</span>
                <strong>PRIVATE</strong>
              </div>

              <div>
                <span>SCAN</span>
                <strong>EVENT DRIVEN</strong>
              </div>
            </div>

            <pre>{`Browser
  ↓
request_upload
  ↓ write SAS
incoming-raw
  ↓
Event Grid → scan_function
              ├── safe-files
              └── quarantine
                     ↓
              download_function
                     ↓
                read SAS`}</pre>

            <a
              href="https://github.com/obed015/SecureCloud-Hub"
              target="_blank"
              rel="noreferrer"
            >
              VIEW SOURCE REPOSITORY ↗
            </a>
          </div>
        </div>
      </section>

      <section
        id="overview"
        className="securecloud-story-section"
      >
        <div className="securecloud-story-heading">
          <span>01 / OVERVIEW</span>

          <h2>
            WHAT SECURECLOUD HUB SOLVES.
          </h2>

          <p>
            Many teams still move sensitive files using
            emailed attachments, public Blob URLs or
            long-lived shared SAS tokens. SecureCloud Hub
            demonstrates a stronger Azure-native pattern:
            authenticate first, upload directly to private
            storage, inspect automatically and expose only
            approved files through temporary read-only SAS.
          </p>
        </div>

        <div className="securecloud-overview-grid">
          <article className="securecloud-hud-panel">
            <small>
              THE PATTERN
            </small>

            <h3>
              ZERO-TRUST FILE DISTRIBUTION,
              FROM UPLOAD TO DOWNLOAD.
            </h3>

            <p>
              Files never sit in public containers.
              The browser never receives account keys.
              New uploads begin in an untrusted state and
              only verified content becomes downloadable.
            </p>

            <ul>
              <li>
                Microsoft Entra ID sign-in enforced with
                Easy Auth.
              </li>

              <li>
                Direct-to-Blob upload using temporary
                write SAS.
              </li>

              <li>
                All new content initially lands in
                incoming-raw.
              </li>

              <li>
                scan_function promotes clean files or
                isolates infected content.
              </li>

              <li>
                download_function validates identity and
                scanStatus before SAS issuance.
              </li>
            </ul>
          </article>

          <article className="securecloud-hud-panel">
            <small>
              KEY OUTCOMES
            </small>

            <h3>
              IDENTITY-FIRST, SERVERLESS
              AND AUDIT-FRIENDLY.
            </h3>

            <p>
              The platform is a practical Azure reference
              implementation spanning Infrastructure as
              Code, automation, identity, storage security,
              serverless compute and observability.
            </p>

            <div className="securecloud-mini-chips">
              {[
                "EASY AUTH",
                "PRIVATE CONTAINERS",
                "EVENT-DRIVEN SCANNING",
                "CLEAN / QUARANTINE",
                "MANAGED IDENTITY",
                "GITHUB OIDC",
              ].map((chip) => (
                <span key={chip}>
                  {chip}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section
        id="business-impact"
        className="securecloud-story-section"
      >
        <div className="securecloud-story-heading">
          <span>
            02 / BUSINESS IMPACT
          </span>

          <h2>
            BUSINESS VALUE DELIVERED
            BY SECURECLOUD HUB.
          </h2>

          <p>
            The security architecture translates into
            practical outcomes: reduced exposure,
            improved auditability and identity-first
            access across the complete file lifecycle.
          </p>
        </div>

        <article className="securecloud-hud-panel">
          <ul className="securecloud-impact-list">
            <li>
              Reduced malware distribution risk by
              enforcing inspection before files become
              downloadable.
            </li>

            <li>
              Minimized data exposure through temporary SAS
              instead of permanent public links.
            </li>

            <li>
              Improved compliance readiness with
              audit-friendly upload, scan, quarantine and
              download telemetry.
            </li>

            <li>
              Removed storage-key exposure from the
              application path using Managed Identity,
              RBAC and OIDC.
            </li>

            <li>
              Enabled secure internal file sharing without
              email attachments or long-lived shared links.
            </li>

            <li>
              Separated untrusted, clean and quarantined
              content into dedicated private containers.
            </li>
          </ul>
        </article>
      </section>

      <section
        id="principles"
        className="securecloud-story-section"
      >
        <div className="securecloud-story-heading">
          <span>
            03 / ZERO-TRUST PRINCIPLES
          </span>

          <h2>
            ZERO TRUST BY DESIGN.
          </h2>

          <p>
            Every stage reduces implicit trust and narrows
            the blast radius of a leaked link, malformed
            upload or misrouted request.
          </p>
        </div>

        <div className="securecloud-principles-grid">
          {principles.map((principle, index) => (
            <article
              key={principle.title}
              className="securecloud-hud-panel"
            >
              <small>
                {String(index + 1).padStart(2, "0")}
                {" / CONTROL"}
              </small>

              <h3>
                {principle.title}
              </h3>

              <p>
                {principle.body}
              </p>

              <div className="securecloud-mini-chips">
                {principle.chips.map((chip) => (
                  <span key={chip}>
                    {chip}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <SecureCloudArchitecture />

      <section
        id="security"
        className="securecloud-story-section"
      >
        <div className="securecloud-story-heading">
          <span>
            05 / SECURITY CONTROLS
          </span>

          <h2>
            DEFENSE-IN-DEPTH
            ARCHITECTURE.
          </h2>

          <p>
            Security controls operate across identity,
            storage, application flow, content safety,
            CI/CD and operations.
          </p>
        </div>

        <div className="securecloud-security-grid">
          {[
            {
              title: "STORAGE HARDENING",
              items: [
                "Public Blob access disabled.",
                "incoming-raw, safe-files and quarantine remain private.",
                "CORS scoped for direct browser upload with SAS.",
                "Lifecycle rules manage retention and cleanup.",
              ],
            },
            {
              title: "IDENTITY-FIRST ACCESS",
              items: [
                "Easy Auth blocks unauthenticated access before application code.",
                "Backend identity is derived from trusted platform headers.",
                "Managed Identity + RBAC replace storage keys.",
                "User-scoped paths isolate ownership.",
              ],
            },
            {
              title: "MALWARE & CONTENT SAFETY",
              items: [
                "All uploads initially remain untrusted.",
                "Event Grid triggers scan_function automatically.",
                "Scan metadata records the trust decision.",
                "download_function refuses SAS unless scanStatus=clean.",
              ],
            },
            {
              title: "SECRETS & CI/CD",
              items: [
                "GitHub Actions authenticates through OIDC.",
                "Managed Identity minimizes application secrets.",
                "Key Vault can support future secret-backed integrations.",
                "Terraform keeps infrastructure reproducible.",
              ],
            },
          ].map((domain, index) => (
            <article
              key={domain.title}
              className="securecloud-hud-panel"
            >
              <small>
                {String(index + 1).padStart(2, "0")}
                {" / SECURITY DOMAIN"}
              </small>

              <h3>
                {domain.title}
              </h3>

              <ul>
                {domain.items.map((item) => (
                  <li key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <SecureCloudGallery />

      <SecureCloudDemo />

      <section
        id="techstack"
        className="securecloud-story-section"
      >
        <div className="securecloud-story-heading">
          <span>
            08 / TECH STACK
          </span>

          <h2>
            AZURE-NATIVE.
            IAC-DRIVEN.
            IDENTITY-FIRST.
          </h2>
        </div>

        <div className="securecloud-tech-grid">
          {[
            {
              title: "CORE PLATFORM",
              items: [
                "Azure Functions Flex Consumption",
                "Azure Blob Storage",
                "Azure Event Grid",
                "Application Insights",
                "Log Analytics",
              ],
            },
            {
              title: "IDENTITY & SECURITY",
              items: [
                "Microsoft Entra ID",
                "Easy Auth",
                "Managed Identity",
                "RBAC",
                "User delegation SAS",
              ],
            },
            {
              title: "DEVOPS & AUTOMATION",
              items: [
                "Terraform",
                "GitHub Actions",
                "OIDC federation",
                "Function deployment",
                "Operational telemetry",
              ],
            },
          ].map((domain) => (
            <article
              key={domain.title}
              className="securecloud-hud-panel"
            >
              <small>
                PLATFORM DOMAIN
              </small>

              <h3>
                {domain.title}
              </h3>

              <ul>
                {domain.items.map((item) => (
                  <li key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="securecloud-story-section">
        <div className="securecloud-story-heading">
          <span>
            09 / PROJECT SNAPSHOT
          </span>

          <h2>
            SECURECLOUD HUB /
            SYSTEM STATE.
          </h2>
        </div>

        <div className="securecloud-snapshot">
          {[
            [
              "UPLOAD MODEL",
              "Browser → request_upload → short-lived write SAS → incoming-raw",
            ],
            [
              "DOWNLOAD MODEL",
              "download_function → read-only SAS → direct Blob download",
            ],
            [
              "AUTHENTICATION",
              "Easy Auth + Microsoft Entra ID",
            ],
            [
              "CONTENT SAFETY",
              "incoming-raw → Event Grid → scan_function → safe-files / quarantine",
            ],
            [
              "IDENTITY MODEL",
              "Managed Identity + RBAC",
            ],
            [
              "CI/CD & IAC",
              "Terraform + GitHub Actions OIDC",
            ],
          ].map(([label, value]) => (
            <div key={label}>
              <span>
                {label}
              </span>

              <strong>
                {value}
              </strong>
            </div>
          ))}
        </div>
      </section>

      <section
        id="lessons"
        className="securecloud-story-section"
      >
        <div className="securecloud-story-heading">
          <span>
            10 / CHALLENGES & LESSONS
          </span>

          <h2>
            WHAT I LEARNED BUILDING
            SECURECLOUD HUB.
          </h2>

          <p>
            The strongest engineering lessons came from
            architecture changes, runtime debugging and
            production-style fixes.
          </p>
        </div>

        <div className="securecloud-lessons">
          {lessons.map((lesson, index) => (
            <details
              key={lesson.title}
              open={index === 0}
            >
              <summary>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong>
                  {lesson.title}
                </strong>

                <i>+</i>
              </summary>

              <div>
                <p>
                  {lesson.body}
                </p>

                <ul>
                  {lesson.points.map((point) => (
                    <li key={point}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </section>

      <footer className="securecloud-story-footer">
        <Link href="/#projects">
          ← ALL PROJECTS
        </Link>

        <span>
          SECURECLOUD HUB / AZURE PLATFORM ENGINEERING
        </span>

        <Link href="/projects/securecloud-hub/deep-dive">
          ENGINEERING DEEP DIVE →
        </Link>
      </footer>
    </main>
  );
}
