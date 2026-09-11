import Image from "next/image";
import Link from "next/link";

import { IntegrationGallery } from "./IntegrationGallery";
import { IntegrationValidation } from "./IntegrationValidation";

const stack = [
  "Azure API Management",
  "Logic Apps",
  "Service Bus",
  "Dynamics 365 / Dataverse",
  "Azure Monitor",
  "PowerShell",
  "Operational Runbooks",
];

const flow = [
  ["01", "API GATEWAY", "Azure API Management", "Controlled ingress, backend routing, and rate limiting."],
  ["02", "PRODUCER", "Logic App", "Receives the API request and publishes account events."],
  ["03", "BUSINESS DATA", "Dynamics 365 / Dataverse", "Provides the account records used by the integration."],
  ["04", "MESSAGE BUS", "Service Bus Queue", "Decouples producer and consumer and absorbs downstream outages."],
  ["05", "CONSUMER", "Logic App", "Decodes ContentData, parses JSON, and processes queued events."],
  ["06", "OBSERVABILITY", "Azure Monitor", "Monitors gateway failures, workflow failures, queue depth, and dead-letter state."],
];

const incidents = [
  {
    id: "INC-01",
    title: "APIM 401 Unauthorized",
    body:
      "APIM failed while forwarding to the Logic App backend. A direct PowerShell test returned Accepted, isolating the fault to APIM policy and callback parameters.",
    result: "BACKEND HEALTHY / POLICY FIXED",
  },
  {
    id: "INC-02",
    title: "APIM 429 Rate Limit",
    body:
      "The gateway returned 429 after more than three requests in sixty seconds, proving that the configured rate-limit policy protected the backend.",
    result: "GATEWAY CONTROL VALIDATED",
  },
  {
    id: "INC-03",
    title: "Service Bus Backlog",
    body:
      "The consumer was deliberately disabled while APIM and the producer remained healthy. The queue reached 45 active messages and triggered the backlog alert.",
    result: "45 ACTIVE / ALERT FIRED",
  },
  {
    id: "INC-04",
    title: "Consumer Parse JSON Failure",
    body:
      "Logic App run history showed the Service Bus content was encoded. The parsing step was fixed by decoding ContentData before Parse JSON.",
    result: "PAYLOAD DECODED / RUN SUCCEEDED",
  },
];

const monitors = [
  ["PRODUCER", "Failed Logic App runs", "Detect failed HTTP-triggered producer executions."],
  ["CONSUMER", "Failed Logic App runs", "Detect consumer failures including parsing errors."],
  ["SERVICE BUS", "Backlog alert", "Detect active messages crossing the operational threshold."],
  ["SERVICE BUS", "Dead-letter alert", "Detect any dead-letter message count greater than zero."],
  ["APIM", "Failed gateway requests", "Support policy, routing, and backend-authentication investigation."],
];

const runbooks = [
  "Service Bus Backlog Alert Response",
  "Logic App Consumer Parse JSON Failure",
  "APIM 401 Unauthorized to Logic App",
  "APIM 429 Rate Limit",
  "Service Bus Dead-letter Investigation",
];

export function IntegrationProject() {
  return (
    <main className="int-project" id="top">
      <header className="int-project-topbar">
        <Link href="/#projects">← BACK TO PROJECTS</Link>
        <span>PROJECT SYSTEM / AZURE ENTERPRISE INTEGRATION PLATFORM</span>
      </header>

      <section className="int-hero">
        <div className="int-hero-grid" aria-hidden="true" />

        <div className="int-hero-copy">
          <div className="int-eyebrow">
            <i />
            APIM · LOGIC APPS · SERVICE BUS · DATAVERSE · AZURE MONITOR
          </div>

          <span className="int-project-number">PROJECT / 05</span>

          <h1>
            AZURE ENTERPRISE
            <br />
            <span>INTEGRATION PLATFORM.</span>
          </h1>

          <p>
            A production-style Azure integration operations platform proving
            that APIs, workflows, messaging, monitoring, incident recovery,
            and operational documentation can work together as one supportable
            cloud system.
          </p>

          <div className="int-hero-tags">
            {stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="int-hero-actions">
            <a href="#architecture">VIEW ARCHITECTURE ↓</a>
            <a href="#evidence">OPEN EVIDENCE ↓</a>
            <a href="#simulator">RUN INCIDENT SIMULATOR ↓</a>
          </div>

          <div className="int-hero-signals">
            <span><i /> APIM 202 VALIDATED</span>
            <span><i /> 45-MESSAGE BACKLOG TESTED</span>
            <span><i /> PARSE JSON FAILURE FIXED</span>
          </div>
        </div>

        <div className="int-hero-visual">
          <div className="int-hero-visual-label">
            <span>ARCHITECTURE / LIVE SYSTEM MAP</span>
            <strong>PLATFORM ONLINE</strong>
          </div>

          <div className="int-hero-image">
            <Image
              src="/images/integration-ops-architecture.webp"
              alt="Azure Enterprise Integration Platform architecture"
              width={1600}
              height={1000}
              priority
              sizes="(max-width: 1100px) 100vw, 52vw"
              className="int-hero-next-image"
            />
          </div>

          <div className="int-hero-flow">
            <span>APIM</span>
            <i />
            <span>PRODUCER</span>
            <i />
            <span>SERVICE BUS</span>
            <i />
            <span>CONSUMER</span>
            <i />
            <span>MONITOR</span>
          </div>
        </div>
      </section>

      <section className="int-section int-overview" id="overview">
        <div className="int-section-heading">
          <span>01 / SYSTEM OVERVIEW</span>
          <h2>BUILT, BROKEN, RECOVERED.</h2>
        </div>

        <div className="int-overview-grid">
          <article>
            <span>THE PLATFORM PATTERN</span>
            <h3>API-driven business-data integration with queue-based resilience.</h3>
            <p>
              API requests enter through Azure API Management and trigger a
              producer Logic App. The workflow reads account data from
              Dynamics 365 / Dataverse and publishes events to Service Bus.
              A separate consumer processes the queued messages, keeping the
              two sides decoupled.
            </p>
          </article>

          <article>
            <span>THE ENGINEERING OUTCOME</span>
            <h3>A platform tested beyond the happy path.</h3>
            <p>
              The environment was deliberately pushed through gateway
              authentication failure, rate limiting, consumer outage, queue
              backlog, and encoded-message parsing failure. Each fault was
              isolated, fixed, validated, monitored, and documented.
            </p>

            <div className="int-outcome-strip">
              <strong>202</strong><span>ACCEPTED</span>
              <strong>45</strong><span>ACTIVE MESSAGES</span>
              <strong>0</strong><span>DEAD-LETTER</span>
              <strong>5</strong><span>RUNBOOKS</span>
            </div>
          </article>
        </div>
      </section>

      <section className="int-section" id="architecture">
        <div className="int-section-heading">
          <span>02 / AZURE ARCHITECTURE</span>
          <h2>FROM API REQUEST TO PROCESSED EVENT.</h2>
          <p>
            Six operational layers form the end-to-end integration path.
          </p>
        </div>

        <div className="int-architecture">
          <div className="int-architecture-line" aria-hidden="true" />
          {flow.map(([id, code, title, body]) => (
            <article key={id}>
              <div className="int-architecture-id">{id}</div>
              <div className="int-architecture-node">
                <span>{code}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="int-section" id="incidents">
        <div className="int-section-heading">
          <span>03 / BREAK / FIX INCIDENTS</span>
          <h2>FAILURE IS PART OF THE DESIGN.</h2>
          <p>
            The strongest evidence comes from faults that were deliberately
            reproduced, investigated, and recovered.
          </p>
        </div>

        <div className="int-incidents">
          {incidents.map((incident) => (
            <article key={incident.id}>
              <div className="int-incident-id">{incident.id}</div>
              <h3>{incident.title}</h3>
              <p>{incident.body}</p>
              <span className="int-incident-result">{incident.result}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="int-section" id="monitoring">
        <div className="int-section-heading">
          <span>04 / MONITORING &amp; ALERTING</span>
          <h2>OBSERVABILITY AT EVERY FAILURE POINT.</h2>
          <p>
            Monitoring covers the gateway, producer, queue, consumer, and
            dead-letter path so an integration problem can be detected before
            it becomes invisible operational debt.
          </p>
        </div>

        <div className="int-monitor-grid">
          {monitors.map(([signal, title, body], index) => (
            <article key={`${signal}-${title}-${index}`}>
              <span>{String(index + 1).padStart(2, "0")} / {signal}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <i />
            </article>
          ))}
        </div>
      </section>

      <section className="int-section" id="evidence">
        <div className="int-section-heading">
          <span>05 / ENGINEERING EVIDENCE</span>
          <h2>THE PLATFORM, PROVEN IN AZURE.</h2>
          <p>
            Architecture, gateway tests, queue health, alerts, failures,
            recovery, and runbooks from the working environment.
          </p>
        </div>

        <IntegrationGallery />
      </section>

      <section className="int-section" id="simulator">
        <div className="int-section-heading">
          <span>06 / INCIDENT SIMULATOR</span>
          <h2>SEE HOW THE PLATFORM ABSORBS FAILURE.</h2>
          <p>
            A safe browser-only reconstruction of the downstream consumer
            outage used during the real validation.
          </p>
        </div>

        <IntegrationValidation />
      </section>

      <section className="int-section" id="runbooks">
        <div className="int-section-heading">
          <span>07 / OPERATIONAL RUNBOOKS</span>
          <h2>TROUBLESHOOTING MADE REPEATABLE.</h2>
        </div>

        <div className="int-runbooks">
          {runbooks.map((runbook, index) => (
            <article key={runbook}>
              <span>RUNBOOK / {String(index + 1).padStart(2, "0")}</span>
              <h3>{runbook}</h3>
              <p>Detect → triage → isolate → fix → validate → hand over.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="int-section int-lessons" id="lessons">
        <div className="int-section-heading">
          <span>08 / LESSONS LEARNED</span>
          <h2>WHAT THIS PLATFORM PROVED.</h2>
        </div>

        <div className="int-lessons-grid">
          <article>
            <span>01</span>
            <h3>APIM is more than an endpoint.</h3>
            <p>
              Backend authentication, callback parameters, rate limiting, and
              routing policy all affect whether the integration actually works.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Service Bus protects downstream systems.</h3>
            <p>
              The producer remained healthy during consumer failure because
              messages could wait safely in the queue until recovery.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Queue drain alone is not proof of success.</h3>
            <p>
              Consumer run history and dead-letter state still need to be
              checked after recovery to confirm clean end-to-end processing.
            </p>
          </article>

          <article>
            <span>04</span>
            <h3>Runbooks convert troubleshooting into operations.</h3>
            <p>
              Incident knowledge becomes repeatable when symptoms, triage,
              remediation, evidence, and validation are documented clearly.
            </p>
          </article>
        </div>
      </section>

      <footer className="int-footer">
        <span>AZURE ENTERPRISE INTEGRATION PLATFORM / 2026</span>
        <a href="#top">RETURN TO TOP ↑</a>
      </footer>
    </main>
  );
}
