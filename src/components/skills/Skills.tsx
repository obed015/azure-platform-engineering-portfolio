import { SectionShell } from "@/components/ui/SectionShell";

const capabilityGroups = [
  {
    id: "01",
    code: "PLATFORM",
    title: "Azure Platform & Integration",
    signal: "CONTROL PLANE",
    description:
      "Designing and operating Azure services that connect APIs, workflows, messaging, secrets, compute, and storage.",
    tools: [
      "API Management",
      "Logic Apps",
      "Service Bus",
      "Key Vault",
      "Azure Functions",
      "Storage",
      "App Service",
    ],
  },
  {
    id: "02",
    code: "IDENTITY",
    title: "Identity & Endpoint",
    signal: "ACCESS PLANE",
    description:
      "Identity-first administration across users, devices, access policy, roles, and hybrid directory services.",
    tools: [
      "Entra ID",
      "Conditional Access",
      "RBAC",
      "Intune",
      "Autopilot",
      "Microsoft Graph",
      "Hybrid Identity",
    ],
  },
  {
    id: "03",
    code: "DELIVERY",
    title: "Infrastructure as Code & Delivery",
    signal: "CHANGE PLANE",
    description:
      "Repeatable platform delivery through version-controlled infrastructure, automation, and deployment pipelines.",
    tools: [
      "Terraform",
      "Bicep",
      "Git",
      "GitHub Actions",
      "CI/CD",
      "PowerShell",
      "Azure CLI",
    ],
  },
  {
    id: "04",
    code: "OPS",
    title: "Operations & Observability",
    signal: "TELEMETRY PLANE",
    description:
      "Building the visibility needed to detect drift, investigate failures, measure health, and automate response.",
    tools: [
      "Azure Monitor",
      "Log Analytics",
      "Application Insights",
      "KQL",
      "Sentinel",
      "Alerts",
      "Runbooks",
    ],
  },
  {
    id: "05",
    code: "HYBRID",
    title: "Windows & Hybrid Infrastructure",
    signal: "FOUNDATION PLANE",
    description:
      "Operating the infrastructure beneath cloud workloads, including Windows identity, networking, virtualization, and Linux.",
    tools: [
      "Windows Server",
      "Active Directory",
      "DNS",
      "DHCP",
      "Hyper-V",
      "pfSense",
      "Entra Connect",
      "Linux",
    ],
  },
  {
    id: "06",
    code: "SECURITY",
    title: "Security & Governance",
    signal: "GUARDRAIL PLANE",
    description:
      "Applying policy, identity, least privilege, detection, and compliance controls across the Azure platform.",
    tools: [
      "Azure Policy",
      "Managed Identity",
      "Defender",
      "Key Vault",
      "Least Privilege",
      "Zero Trust",
      "Compliance",
    ],
  },
];

export function Skills() {
  return (
    <SectionShell
      id="skills"
      number="02"
      label="PLATFORM CAPABILITIES"
      title={
        <>
          BUILT FOR <span className="text-cyber">OPERATIONS.</span>
        </>
      }
    >
      <div className="cloud-capabilities">
        <div className="cloud-capabilities-copy">
          <span className="cloud-capabilities-kicker">
            CLOUD PLATFORM ENGINEERING / CAPABILITY MAP
          </span>

          <p>
            My stack is organised around how a cloud platform actually runs:
            identity, delivery, integration, telemetry, infrastructure, and
            governance working as one operating system.
          </p>

          <div className="cloud-capabilities-status">
            <span><i /> AZURE PLATFORM</span>
            <span><i /> AUTOMATION</span>
            <span><i /> OPERATIONS</span>
          </div>
        </div>

        <div className="cloud-capability-map">
          <div className="cloud-capability-map-grid" aria-hidden="true" />

          <div className="cloud-capability-spine" aria-hidden="true">
            <div className="cloud-capability-spine-line" />
            <div className="cloud-capability-core">
              <small>AZURE</small>
              <strong>PLATFORM</strong>
              <span>ENGINEERING CORE</span>
            </div>

            {capabilityGroups.map((group, index) => (
              <span
                key={group.id}
                className={`cloud-capability-node cloud-capability-node-${index + 1}`}
              >
                <i />
                <b>{group.id}</b>
              </span>
            ))}
          </div>

          <div className="cloud-capability-columns">
            <div className="cloud-capability-column cloud-capability-column-left">
              {capabilityGroups
                .filter((_, index) => index % 2 === 0)
                .map((group) => (
                  <article className="cloud-capability-card" key={group.id}>
                    <div className="cloud-capability-card-head">
                      <span>{group.id} / {group.code}</span>
                      <small>{group.signal}</small>
                    </div>

                    <h3>{group.title}</h3>
                    <p>{group.description}</p>

                    <div className="cloud-capability-tools">
                      {group.tools.map((tool) => (
                        <span key={tool}>{tool}</span>
                      ))}
                    </div>
                  </article>
                ))}
            </div>

            <div className="cloud-capability-column cloud-capability-column-right">
              {capabilityGroups
                .filter((_, index) => index % 2 === 1)
                .map((group) => (
                  <article className="cloud-capability-card" key={group.id}>
                    <div className="cloud-capability-card-head">
                      <span>{group.id} / {group.code}</span>
                      <small>{group.signal}</small>
                    </div>

                    <h3>{group.title}</h3>
                    <p>{group.description}</p>

                    <div className="cloud-capability-tools">
                      {group.tools.map((tool) => (
                        <span key={tool}>{tool}</span>
                      ))}
                    </div>
                  </article>
                ))}
            </div>
          </div>

          <div className="cloud-capability-map-footer">
            <span>SYSTEM VIEW / SKILLS AS OPERATING CAPABILITIES</span>
            <strong>06 DOMAINS / 43 PLATFORM TOOLS & PATTERNS</strong>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
