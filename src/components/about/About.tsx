import Image from "next/image";
import { SectionShell } from "@/components/ui/SectionShell";

const capabilities = [
  "AZURE",
  "ENTRA ID",
  "INTUNE",
  "TERRAFORM",
  "POWERSHELL",
  "MICROSOFT GRAPH",
];

const stats = [
  {
    value: "5+",
    heading: "YEARS IN IT",
    copy: "Infrastructure & Cloud Platform Engineering",
  },
  {
    value: "5 LIVE",
    heading: "CLOUD PROJECTS",
    copy: "Azure, automation & governance",
  },
  {
    value: "CORE",
    heading: "STACK",
    copy: "APIM · Logic Apps · Service Bus · Key Vault",
  },
];

export function About() {
  return (
    <SectionShell
      id="about"
      number="01"
      label="ABOUT ME"
      title={
        <>
          <span className="about-title-lead">
            I focus on{" "}
          </span>

          <span className="about-title-cyber">
            secure, scalable cloud architecture
          </span>

          <span className="about-title-lead">
            {" "}using{" "}
          </span>

          <span className="about-title-azure">
            Infrastructure-as-Code
          </span>

          <span className="about-title-lead">
            ,{" "}
          </span>

          <span className="about-title-warm">
            CI/CD
          </span>

          <span className="about-title-lead">
            , monitoring, and reusable design patterns.
          </span>
        </>
      }
    >
      <div className="persona-layout">
        <div className="persona-visual">
          <div className="persona-frame">
            <div
              className="persona-frame-grid"
              aria-hidden="true"
            />

            <div
              className="persona-scan-line"
              aria-hidden="true"
            />

            <Image
              src="/obed-profile.png"
              alt="Obed Owusu"
              width={520}
              height={620}
              className="persona-image"
            />

            <div
              className="persona-corner persona-corner-tl"
              aria-hidden="true"
            />
            <div
              className="persona-corner persona-corner-tr"
              aria-hidden="true"
            />
            <div
              className="persona-corner persona-corner-bl"
              aria-hidden="true"
            />
            <div
              className="persona-corner persona-corner-br"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="persona-content">
          <div className="persona-heading-row">
            <div>
              <p className="persona-kicker">
                CLOUD PLATFORM ENGINEER
              </p>

              <h3 className="persona-name">
                OBED OWUSU
              </h3>
            </div>
          </div>

          <div className="persona-rule" />

          <p className="persona-lead">
            I work across Azure platform operations,
            cloud security, hybrid identity, endpoint
            management and automation.
          </p>

          <p className="persona-body-copy">
            My engineering approach is to understand the
            architecture first, automate repeatable work,
            apply least privilege and make systems
            observable by default. I build with operations
            in mind — not just deployment.
          </p>

          <div className="persona-stats-grid">
            {stats.map((stat) => (
              <article
                key={stat.heading}
                className="persona-stat-card"
              >
                <span className="persona-stat-value">
                  {stat.value}
                </span>

                <div>
                  <strong className="persona-stat-heading">
                    {stat.heading}
                  </strong>

                  <span className="persona-stat-copy">
                    {stat.copy}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="persona-stack">
            <span className="persona-stack-label">
              PLATFORM TOOLKIT
            </span>

            <div className="persona-stack-items">
              {capabilities.map((capability) => (
                <span key={capability}>
                  {capability}
                </span>
              ))}
            </div>
          </div>

          <div className="persona-footer-meta">
            <span>IDENTITY</span>
            <span>SECURITY</span>
            <span>AUTOMATION</span>
            <span>INFRASTRUCTURE</span>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
