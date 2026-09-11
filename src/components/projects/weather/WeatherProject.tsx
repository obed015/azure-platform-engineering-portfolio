import Image from "next/image";
import Link from "next/link";

import { WeatherGallery } from "./WeatherGallery";

const liveUrl =
  "https://weather-tracker-ca.purpleglacier-4ce16430.ukwest.azurecontainerapps.io";
const githubUrl = "https://github.com/obed015/weather-tracker-azure";

const deliveryFlow = [
  ["01", "APPLICATION", "FastAPI Weather App", "Python 3.12, Jinja2, SQLite, HTTPX, favourites, search, forecast, and /health."],
  ["02", "PACKAGE", "Docker", "Production-style image using Gunicorn and Uvicorn workers on port 8000."],
  ["03", "REGISTRY", "Azure Container Registry", "Private image storage used by the Azure container runtimes."],
  ["04", "VALIDATE", "Azure Container Instances", "Short-lived validation runtime used before the final Container Apps deployment."],
  ["05", "RUNTIME", "Azure Container Apps", "Public HTTPS ingress, scale-to-zero, and the final production-style workload."],
];

const opsFlow = [
  ["01", "TELEMETRY", "Application Insights", "Captures requests and application behaviour through Azure Monitor OpenTelemetry."],
  ["02", "LOGGING", "Structured application logs", "Weather request start, success, latency, HTTP failures, and context."],
  ["03", "ALERTING", "Azure Monitor", "KQL-based scheduled-query alert detects WeatherAPI HTTP errors."],
  ["04", "NOTIFY", "Action Group", "Email action confirms the alert path reaches the operator."],
  ["05", "SECRETS", "Key Vault + Managed Identity", "The WeatherAPI key is referenced securely by the Container App."],
];

const validationSteps = [
  "Build local FastAPI MVP",
  "Deploy to Azure App Service",
  "Add Application Insights telemetry",
  "Configure Azure Monitor alerts",
  "Containerize with Docker",
  "Publish image to ACR",
  "Validate image with ACI",
  "Deploy to Azure Container Apps",
  "Automate with GitHub Actions",
  "Move WeatherAPI secret to Key Vault",
];

const lessons = [
  ["Startup dependencies must match runtime commands.", "The App Service deployment failed until Gunicorn was included in the application dependencies."],
  ["Telemetry needs real instrumentation.", "Application Insights existed before useful request and trace data flowed; Azure Monitor OpenTelemetry fixed the observability gap."],
  ["Alert rules are implementation details too.", "Scheduled-query alert syntax needed CLI-specific condition/query formatting before deployment succeeded."],
  ["Containers expose networking assumptions.", "Docker, WSL, local port mapping, ACI, and Container Apps each forced the runtime configuration to be explicit."],
  ["Managed identity removes application secret handling.", "Key Vault plus Container Apps managed identity replaced plaintext WeatherAPI secret configuration in the final runtime."],
];

export function WeatherProject() {
  return (
    <main className="weather-project" id="top">
      <header className="weather-topbar">
        <Link href="/#projects">← BACK TO PROJECTS</Link>
        <span>PROJECT SYSTEM / WEATHER TRACKER AZURE</span>
        <a href={githubUrl} target="_blank" rel="noreferrer">
          GITHUB ↗
        </a>
      </header>

      <section className="weather-hero">
        <div className="weather-hero-grid" aria-hidden="true" />

        <div className="weather-hero-copy">
          <div className="weather-eyebrow">
            <i />
            FASTAPI · DOCKER · ACR · CONTAINER APPS · AZURE MONITOR · KEY VAULT
          </div>

          <span className="weather-project-number">PROJECT / WEATHER TRACKER</span>

          <h1>
            CLOUD-NATIVE
            <br />
            <span>WEATHER PLATFORM.</span>
          </h1>

          <p>
            A FastAPI weather application engineered into a secure,
            observable Azure workload with containers, CI/CD, structured
            telemetry, alerting, and managed-identity-backed secret delivery.
          </p>

          <div className="weather-tags">
            <span>Azure Container Apps</span>
            <span>Docker + ACR</span>
            <span>GitHub Actions</span>
            <span>Application Insights</span>
            <span>Azure Monitor</span>
            <span>Key Vault</span>
          </div>

          <div className="weather-actions">
            <a href={liveUrl} target="_blank" rel="noreferrer" className="weather-primary-action">
              OPEN LIVE APP ↗
            </a>
            <Link href="/projects/weather-tracker/deep-dive">
              ENGINEERING DEEP DIVE →
            </Link>
            <a href="#architecture">VIEW ARCHITECTURE ↓</a>
          </div>

          <div className="weather-coldstart">
            <span>LIVE RUNTIME NOTE</span>
            <p>
              The Container App can scale to zero. After idle time, the first
              request may take roughly 30–60 seconds while the container
              starts; subsequent requests return normally.
            </p>
          </div>

          <div className="weather-signals">
            <span><i /> RUNTIME / CONTAINER APPS</span>
            <span><i /> IMAGE / ACR</span>
            <span><i /> SECRET / KEY VAULT</span>
          </div>
        </div>

        <div className="weather-hero-visual">
          <div className="weather-visual-head">
            <span>DEPLOYMENT PATH / FINAL ARCHITECTURE</span>
            <strong>LIVE ON AZURE</strong>
          </div>

          <div className="weather-architecture-image">
            <Image
              src="/images/weather-tracker-architecture-main1.webp"
              alt="Weather Tracker Azure architecture"
              width={1600}
              height={1000}
              priority
              sizes="(max-width: 1100px) 100vw, 52vw"
            />
          </div>

          <div className="weather-runtime-flow">
            <span>GITHUB</span><i />
            <span>DOCKER</span><i />
            <span>ACR</span><i />
            <span>CONTAINER APPS</span><i />
            <span>MONITOR</span>
          </div>
        </div>
      </section>

      <section className="weather-section weather-overview" id="overview">
        <div className="weather-section-heading">
          <span>01 / SYSTEM OVERVIEW</span>
          <h2>FROM LOCAL APP TO AZURE WORKLOAD.</h2>
        </div>

        <div className="weather-overview-grid">
          <article>
            <span>THE ENGINEERING PROBLEM</span>
            <h3>Move beyond a local demo into an operable cloud workload.</h3>
            <p>
              The original FastAPI application was progressively hardened with
              cloud hosting, telemetry, Docker packaging, automated
              deployment, and secure runtime configuration.
            </p>
          </article>

          <article>
            <span>THE FINISHED OUTCOME</span>
            <h3>A secure cloud-native deployment path.</h3>
            <p>
              Container Apps runs the live workload, ACR stores the image,
              GitHub Actions handles deployment, Azure Monitor provides
              operational visibility, and Key Vault delivers the WeatherAPI
              secret through managed identity.
            </p>

            <div className="weather-outcomes">
              <strong>10</strong><small>VALIDATION STAGES</small>
              <strong>HTTPS</strong><small>PUBLIC INGRESS</small>
              <strong>0</strong><small>MIN REPLICAS</small>
              <strong>MI</strong><small>KEY VAULT ACCESS</small>
            </div>
          </article>
        </div>
      </section>

      <section className="weather-section" id="architecture">
        <div className="weather-section-heading">
          <span>02 / BUILD &amp; DEPLOYMENT</span>
          <h2>CODE → IMAGE → REGISTRY → RUNTIME.</h2>
          <p>
            The final delivery path separates application development,
            container packaging, image storage, validation, and production
            hosting.
          </p>
        </div>

        <div className="weather-flow-grid">
          {deliveryFlow.map(([id, label, title, body]) => (
            <article key={id}>
              <span>{id}</span>
              <small>{label}</small>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="weather-section" id="operations">
        <div className="weather-section-heading">
          <span>03 / SECURITY &amp; OPERATIONS</span>
          <h2>OBSERVABLE. ALERTED. SECRET-SAFE.</h2>
          <p>
            The project deliberately treats telemetry, alerting, and secret
            management as part of the platform rather than extras around the
            application.
          </p>
        </div>

        <div className="weather-ops-grid">
          {opsFlow.map(([id, label, title, body]) => (
            <article key={id}>
              <div className="weather-ops-signal">
                <span>{id}</span>
                <i />
              </div>
              <small>{label}</small>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="weather-section" id="evidence">
        <div className="weather-section-heading">
          <span>04 / ENGINEERING EVIDENCE</span>
          <h2>THE BUILD, PROVEN IN AZURE.</h2>
          <p>
            Real screenshots from application hosting, containers, telemetry,
            monitoring, alerting, troubleshooting, and CI/CD.
          </p>
        </div>

        <WeatherGallery />
      </section>

      <section className="weather-section" id="validation">
        <div className="weather-section-heading">
          <span>05 / END-TO-END VALIDATION</span>
          <h2>TEN STAGES FROM MVP TO SECURED RUNTIME.</h2>
        </div>

        <div className="weather-validation">
          {validationSteps.map((step, index) => (
            <article key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step}</h3>
              <i />
            </article>
          ))}
        </div>
      </section>

      <section className="weather-section" id="stack">
        <div className="weather-section-heading">
          <span>06 / IMPLEMENTATION STACK</span>
          <h2>APPLICATION + PLATFORM ENGINEERING.</h2>
        </div>

        <div className="weather-stack">
          <article>
            <span>APPLICATION / RUNTIME</span>
            <ul>
              <li>Python 3.12</li>
              <li>FastAPI</li>
              <li>Jinja2 templates</li>
              <li>SQLite development storage</li>
              <li>HTTPX</li>
              <li>Gunicorn + Uvicorn workers</li>
            </ul>
          </article>

          <article>
            <span>AZURE / DEVOPS</span>
            <ul>
              <li>Azure App Service</li>
              <li>Application Insights</li>
              <li>Azure Monitor</li>
              <li>Azure Container Registry</li>
              <li>Azure Container Instances</li>
              <li>Azure Container Apps</li>
              <li>Azure Key Vault + managed identity</li>
              <li>GitHub Actions CI/CD</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="weather-section" id="lessons">
        <div className="weather-section-heading">
          <span>07 / BUILD LESSONS</span>
          <h2>WHAT BROKE — AND WHAT THE PLATFORM TAUGHT.</h2>
        </div>

        <div className="weather-lessons">
          {lessons.map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="weather-live-cta">
        <div>
          <span>LIVE AZURE CONTAINER APPS WORKLOAD</span>
          <h2>SEE THE APPLICATION RUNNING.</h2>
          <p>
            The first request may take 30–60 seconds after scale-to-zero.
          </p>
        </div>

        <div>
          <a href={liveUrl} target="_blank" rel="noreferrer">
            OPEN WEATHER TRACKER ↗
          </a>
          <a href={githubUrl} target="_blank" rel="noreferrer">
            VIEW GITHUB REPOSITORY ↗
          </a>
          <Link href="/projects/weather-tracker/deep-dive">
            OPEN ENGINEERING DEEP DIVE →
          </Link>
        </div>
      </section>

      <footer className="weather-footer">
        <span>WEATHER TRACKER / AZURE CLOUD ENGINEERING PROJECT / 2026</span>
        <a href="#top">RETURN TO TOP ↑</a>
      </footer>
    </main>
  );
}
