import { SectionShell } from "@/components/ui/SectionShell";

type ExperienceRole = {
  period: string;
  signal: string;
  title: string;
  company: string;
  current?: boolean;
  tags: string[];
  bullets: string[];
};

const experienceRoles: ExperienceRole[] = [
  {
    period: "JUL 2026 — PRESENT",
    signal: "AZURE PLATFORM · NON-PROFIT",
    title: "Cloud Platform Engineer",
    company: "NCVO",
    current: true,
    tags: [
      "API Management",
      "Logic Apps",
      "Service Bus",
      "Azure Monitor",
      "Log Analytics",
      "Application Insights",
      "Intune",
      "Entra ID",
    ],
    bullets: [
      "Building and supporting NCVO’s Azure platform transformation across API Management, Logic Apps, Service Bus, Azure Monitor, Log Analytics, and Application Insights.",
      "Implementing and testing Azure integration workflows using APIM as the API control layer, Logic Apps for orchestration, and Service Bus for resilient messaging.",
      "Developing operational runbooks and troubleshooting procedures covering API failures, Logic App runs, Service Bus backlogs, monitoring alerts, and integration dependencies.",
      "Building cloud operations visibility through Azure Monitor, Log Analytics, Application Insights, Microsoft Graph, and PowerShell automation.",
      "Built and piloted NCVO’s conference-suite shared Windows device platform using Microsoft Intune, Windows Autopilot, and Entra ID, creating a dedicated self-deploying device profile for conference-room laptops and validating enrolment, policy assignment, and repeatable reset/OOBE deployment.",
    ],
  },
  {
    period: "OCT 2024 — MAY 2026",
    signal: "AZURE · MSP",
    title: "Azure Support Engineer",
    company: "Lifeline IT (MSP)",
    tags: [
      "Azure",
      "Entra ID",
      "Conditional Access",
      "Intune",
      "PowerShell",
      "Logic Apps",
      "S2S VPN",
    ],
    bullets: [
      "Designed and enforced zero-trust identity controls across multiple client tenants using Entra ID Conditional Access, RBAC, and Intune compliance baselines, achieving 95% device compliance across the managed client base.",
      "Architected and configured Site-to-Site VPNs connecting on-premises networks to Azure VNets, implementing tunnel monitoring, failover planning, and hybrid connectivity documentation for production environments.",
      "Built and deployed identity lifecycle automation using PowerShell and Azure Logic Apps, reducing manual provisioning effort by approximately 50% and enforcing consistent access controls across client environments.",
      "Diagnosed and remediated complex email security failures using MXToolbox, Exchange message trace, and SPF/DKIM/DMARC analysis, improving domain deliverability across multiple clients.",
    ],
  },
  {
    period: "APR 2023 — AUG 2024",
    signal: "2ND LINE · ENTERPRISE",
    title: "2nd Line Technical Support Engineer",
    company: "News Corp UK",
    tags: [
      "Active Directory",
      "Group Policy",
      "DNS",
      "DHCP",
      "VPN",
      "Darktrace",
      "SonicWall",
      "Mimecast",
    ],
    bullets: [
      "Provided Tier 2 escalation support across Active Directory, Group Policy, networking, DNS/DHCP, and VPN connectivity for a distributed enterprise estate.",
      "Investigated and resolved replication issues, GPO failures, login delays, and hybrid identity inconsistencies.",
      "Created and maintained technical documentation and operational runbooks using IT Glue.",
      "Supported and monitored Darktrace, SonicWall, Mimecast, and Bitwarden across the environment.",
    ],
  },
  {
    period: "JAN 2024 — MAR 2024",
    signal: "AZURE · INTERNSHIP",
    title: "Junior Azure Cloud Engineer (Intern)",
    company: "Firebrand Training (Remote)",
    tags: [
      "Azure",
      "VNets",
      "NSGs",
      "Load Balancer",
      "Hub-Spoke",
      "AD Connect",
      "Azure Monitor",
    ],
    bullets: [
      "Built Azure lab environments with VNets, NSGs, Load Balancers, and hub-and-spoke networking patterns.",
      "Assisted with AD Connect and hybrid identity testing, including Site-to-Site VPNs for multi-environment connectivity.",
      "Configured Azure Monitor, Log Analytics, and alert rules for lab environments.",
    ],
  },
  {
    period: "NOV 2019 — APR 2023",
    signal: "1ST–2ND LINE",
    title: "IT Support Engineer",
    company: "ONTRAQ",
    tags: [
      "Windows",
      "VPN",
      "File Services",
      "Sage 50/200",
      "Duo MFA",
      "Access Control",
    ],
    bullets: [
      "Delivered Tier 1–2 support across Windows environments, printers, VPN access, and on-premises applications.",
      "Configured UNC paths, group-based access, and basic file permissions for shared data.",
      "Installed and maintained Sage 50/200 for finance users, resolving client and server connectivity issues.",
      "Supported Duo MFA rollout and VPN access for administrative and remote staff.",
    ],
  },
];

export function Experience() {
  return (
    <SectionShell
      id="experience"
      number="05"
      label="EXPERIENCE"
      title={
        <>
          FROM SUPPORT TO
          <br />
          <span className="text-cyber">AZURE-FIRST ENGINEERING.</span>
        </>
      }
    >
      <div className="experience-system">
        <div className="experience-intro">
          <p>
            I&apos;ve grown from hands-on IT support into an Azure-focused
            engineer trusted with escalations, hybrid connectivity, security,
            governance, and platform operations. Each role strengthened my
            ability to troubleshoot quickly, automate repeatable work, and
            build cloud services that remain supportable under real operational
            pressure.
          </p>

          <div className="experience-signals">
            <span>MSP &amp; ENTERPRISE</span>
            <span>HYBRID AZURE / ON-PREM</span>
            <span>SECURITY &amp; COMPLIANCE</span>
            <span>AUTOMATION &amp; SCRIPTING</span>
          </div>
        </div>

        <div className="experience-timeline">
          <div className="experience-rail" aria-hidden="true">
            <span className="experience-rail-scan" />
          </div>

          {experienceRoles.map((role, index) => (
            <article
              key={`${role.company}-${role.title}`}
              className={`experience-role ${
                role.current ? "experience-role-current" : ""
              }`}
            >
              <div className="experience-role-index">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i />
              </div>

              <div className="experience-role-meta">
                <span>{role.period}</span>
                <small>{role.signal}</small>
                {role.current && <strong>● CURRENT ROLE</strong>}
              </div>

              <div className="experience-role-main">
                <div className="experience-role-heading">
                  <div>
                    <h3>{role.title}</h3>
                    <p>{role.company}</p>
                  </div>

                  <span>{role.current ? "PLATFORM ACTIVE" : "ROLE COMPLETE"}</span>
                </div>

                <ul>
                  {role.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>

                <div className="experience-role-tags">
                  {role.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="experience-footer-strip">
          <span>CAREER PATH / SUPPORT → CLOUD → PLATFORM ENGINEERING</span>
          <strong>2019 — PRESENT</strong>
        </div>
      </div>
    </SectionShell>
  );
}
