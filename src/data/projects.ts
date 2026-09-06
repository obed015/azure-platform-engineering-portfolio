import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    id: "m365-attack-surface",
    number: "001",
    title: "M365 Attack Surface & Remediation Toolkit",
    category: "Cloud Security Automation",
    year: 2026,
    description:
      "Automated Microsoft 365 security assessment tooling for identifying identity, Conditional Access and tenant security risks.",
    technologies: [
      "PowerShell",
      "Microsoft Graph",
      "Microsoft Entra ID",
      "Conditional Access",
      "Power BI",
    ],
    status: "active",
  },
  {
    id: "cloud-identity-risk",
    number: "002",
    title: "Cloud Identity Daily Risk Dashboard",
    category: "Identity Security",
    year: 2026,
    description:
      "Identity risk monitoring and reporting platform focused on MFA posture, failed sign-ins and privileged account visibility.",
    technologies: [
      "Microsoft Graph",
      "Microsoft Entra ID",
      "PowerShell",
      "Power BI",
      "Azure Automation",
    ],
    status: "active",
  },
  {
    id: "secureshare-hub",
    number: "003",
    title: "SecureShare Hub",
    category: "Zero Trust File Platform",
    year: 2026,
    description:
      "Azure-based secure file processing architecture using event-driven scanning, quarantine workflows and managed identity.",
    technologies: [
      "Azure Functions",
      "Terraform",
      "Event Grid",
      "Azure Storage",
      "Managed Identity",
      "Azure RBAC",
    ],
    status: "built",
  },
  {
    id: "azure-integration-platform",
    number: "004",
    title: "Azure Integration Platform",
    category: "Enterprise Integration",
    year: 2026,
    description:
      "Cloud integration architecture built around APIs, workflows, asynchronous messaging and operational monitoring.",
    technologies: [
      "API Management",
      "Logic Apps",
      "Service Bus",
      "Azure Functions",
      "Azure Monitor",
    ],
    status: "built",
  },
  {
    id: "hybrid-identity-lab",
    number: "005",
    title: "Hybrid Identity Lab",
    category: "Hybrid Cloud Infrastructure",
    year: 2026,
    description:
      "End-to-end hybrid identity environment integrating Active Directory, Entra ID, endpoint management and lab networking.",
    technologies: [
      "Windows Server",
      "Active Directory",
      "Microsoft Entra Connect",
      "Microsoft Entra ID",
      "Intune",
      "pfSense",
      "Hyper-V",
    ],
    status: "built",
  },
];