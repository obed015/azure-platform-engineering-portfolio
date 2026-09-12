export type PortfolioProject = {
  slug: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  outcome: string;
  stack: string[];
  sourceUrl: string;
  deepDiveUrl?: string;
  architecture: string[];
  panels: {
    kicker: string;
    title: string;
    body: string;
  }[];
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "azure-enterprise-integration-platform",
    number: "01",
    title: "AZURE ENTERPRISE INTEGRATION PLATFORM",
    category: "PLATFORM OPERATIONS",
    summary:
      "Production-style integration operations across APIM, Logic Apps, Service Bus, Dataverse and Azure Monitor — built, broken, investigated, recovered and documented.",
    outcome:
      "An integration platform designed around both the happy path and realistic day-two operational failure scenarios.",
    stack: [
      "API Management",
      "Logic Apps",
      "Service Bus",
      "Dataverse",
      "Azure Monitor",
      "Runbooks",
    ],
    sourceUrl:
      "https://oowusu.com/Azure%20Integration%20Operations.html",
    architecture: [
      "API client / APIM test console",
      "Azure API Management",
      "Producer Logic App",
      "Dynamics 365 / Dataverse",
      "Service Bus queue",
      "Consumer Logic App",
      "Decode + parse + process",
      "Azure Monitor alerts",
      "Operational runbooks",
    ],
    panels: [
      {
        kicker: "INTEGRATION",
        title: "APIM CONTROLS THE ENTRY POINT.",
        body:
          "API Management fronts the producer workflow, providing a controlled gateway layer for backend routing, policy behaviour and rate-limit testing.",
      },
      {
        kicker: "RESILIENCE",
        title: "SERVICE BUS DECOUPLES PRODUCER AND CONSUMER.",
        body:
          "Queued account events allow the downstream consumer to fail, recover and drain backlog without losing the producer-side integration flow.",
      },
      {
        kicker: "OPERATIONS",
        title: "FAILURES ARE PART OF THE DESIGN.",
        body:
          "The build intentionally tests authentication failures, throttling, queue backlog and parsing incidents, then captures recovery steps in monitoring evidence and runbooks.",
      },
    ],
  },

  {
    slug: "securecloud-hub",
    number: "02",
    title: "SECURECLOUD HUB",
    category: "ZERO-TRUST SERVERLESS",
    summary:
      "Azure-native secure file sharing using Entra ID, direct-to-Blob short-lived SAS, Event Grid malware scanning, private storage separation and secure downloads.",
    outcome:
      "Identity-first, private-by-default file distribution with automated content validation and short-lived access.",
    stack: [
      "Azure Functions",
      "Blob Storage",
      "Event Grid",
      "Entra ID",
      "Terraform",
      "GitHub Actions",
      "Managed Identity",
    ],
    sourceUrl:
      "https://oowusu.com/secure-cloud-hub.html",
    deepDiveUrl:
      "https://oowusu.com/secure-cloud-hub-engineering-deepdive.html",
    architecture: [
      "GitHub Actions + OIDC",
      "Terraform-managed Azure platform",
      "Easy Auth + Entra ID",
      "Short-lived write SAS",
      "incoming-raw private container",
      "Event Grid → scan_function",
      "safe-files / quarantine",
      "Identity + clean-state validation",
      "Short-lived read-only SAS",
    ],
    panels: [
      {
        kicker: "ZERO TRUST",
        title: "UNTRUSTED FILES NEVER BECOME TRUSTED BY DEFAULT.",
        body:
          "Uploads land in an untrusted private container, are scanned through an Event Grid-triggered pipeline and are promoted only when the clean state is proven.",
      },
      {
        kicker: "IDENTITY",
        title: "ACCESS IS USER-SCOPED AND SHORT-LIVED.",
        body:
          "Easy Auth, Managed Identity, RBAC and user-scoped blob paths remove the need for public storage or broad long-lived access links.",
      },
      {
        kicker: "DELIVERY",
        title: "INFRASTRUCTURE AND DEPLOYMENT ARE PASSWORDLESS.",
        body:
          "Terraform provisions the Azure stack and GitHub Actions authenticates with OIDC, keeping the deployment path reproducible without long-lived pipeline credentials.",
      },
    ],
  },

  {
    slug: "cloud-policy-compliance-dashboard",
    number: "03",
    title: "CLOUD POLICY COMPLIANCE DASHBOARD",
    category: "GOVERNANCE OBSERVABILITY",
    summary:
      "Management-group Azure governance that detects policy drift, visualizes compliance, alerts operators and automatically restores compliant configuration.",
    outcome:
      "A full detect → visualize → alert → remediate → restore compliance lifecycle managed as code.",
    stack: [
      "Azure Policy",
      "Bicep",
      "Azure Resource Graph",
      "Workbooks",
      "Log Analytics",
      "Azure Monitor",
      "Managed Identity",
    ],
    sourceUrl:
      "https://oowusu.com/cloud-policy-compliance-dashboard.html",
    deepDiveUrl:
      "https://oowusu.com/cloud-policy-compliance-dashboard-deepdive.html",
    architecture: [
      "GitHub / local repo",
      "Bicep governance deployment",
      "Management-group initiative assignment",
      "Azure Resource Graph / PolicyResources",
      "Azure Workbook compliance view",
      "Azure Monitor alert + Action Group",
      "Managed identity remediation",
      "Storage setting hardened",
      "Compliance restored",
    ],
    panels: [
      {
        kicker: "GOVERNANCE",
        title: "POLICY BECOMES AN OPERATIONAL PLATFORM.",
        body:
          "Definitions, initiatives and assignments are deployed as code at management-group scope rather than managed as isolated portal configuration.",
      },
      {
        kicker: "OBSERVABILITY",
        title: "COMPLIANCE IS VISIBLE AND ACTIONABLE.",
        body:
          "Azure Workbook views query Azure Resource Graph PolicyResources for compliance state, while Log Analytics supports operational telemetry and investigation.",
      },
      {
        kicker: "REMEDIATION",
        title: "DRIFT CAN BE AUTOMATICALLY CORRECTED.",
        body:
          "Managed-identity remediation changes risky Storage Account configuration and returns the environment to a compliant state.",
      },
    ],
  },

  {
    slug: "weather-tracker",
    number: "04",
    title: "WEATHER TRACKER",
    category: "CONTAINER PLATFORM",
    summary:
      "A FastAPI workload engineered into a monitored, containerised Azure service with Docker, ACR, Container Apps, CI/CD, Key Vault and managed identity.",
    outcome:
      "A local application evolved into a secure and observable cloud-native delivery path.",
    stack: [
      "FastAPI",
      "Docker",
      "ACR",
      "Container Apps",
      "GitHub Actions",
      "Application Insights",
      "Key Vault",
    ],
    sourceUrl:
      "https://oowusu.com/weather-tracker-azure.html",
    deepDiveUrl:
      "https://oowusu.com/weather-tracker-azure-deepdive.html",
    architecture: [
      "GitHub push",
      "GitHub Actions",
      "Docker build",
      "Azure Container Registry",
      "Azure Container Apps",
      "FastAPI runtime",
      "Application Insights + Azure Monitor",
      "Key Vault via managed identity",
    ],
    panels: [
      {
        kicker: "PLATFORM",
        title: "FROM LOCAL APP TO MANAGED CONTAINER RUNTIME.",
        body:
          "The project moves beyond a local FastAPI demo by packaging the service in Docker, publishing through ACR and running it on Azure Container Apps.",
      },
      {
        kicker: "OBSERVABILITY",
        title: "THE WORKLOAD EXPOSES OPERATIONAL SIGNALS.",
        body:
          "Structured logging, Application Insights and Azure Monitor alerts provide evidence of request health, latency and failure conditions.",
      },
      {
        kicker: "SECURITY",
        title: "SECRETS STAY OUT OF APPLICATION CODE.",
        body:
          "The Weather API secret is stored in Key Vault and consumed by the Container App through a system-assigned managed identity.",
      },
    ],
  },

  {
    slug: "azure-onboarding-automator",
    number: "05",
    title: "AZURE ONBOARDING AUTOMATOR",
    category: "IDENTITY AUTOMATION",
    summary:
      "HR-driven Azure identity automation that turns new-starter requests into repeatable Entra ID provisioning, group assignment, notifications and audit evidence.",
    outcome:
      "A controlled onboarding pattern that reduces manual identity work and makes access assignment easier to review and troubleshoot.",
    stack: [
      "Logic Apps",
      "Entra ID",
      "RBAC",
      "Security Groups",
      "Azure Monitor",
      "Outlook",
    ],
    sourceUrl:
      "https://oowusu.com/azure-onboard-automator.html",
    architecture: [
      "HR / manager onboarding request",
      "SharePoint list or email trigger",
      "Azure Logic App orchestration",
      "Microsoft Entra ID user creation",
      "Security group assignment",
      "Welcome + stakeholder notification",
      "Logic App run history + Entra logs",
    ],
    panels: [
      {
        kicker: "PROBLEM",
        title: "MANUAL ONBOARDING CREATES INCONSISTENCY.",
        body:
          "The project replaces repeated user creation and ad-hoc access handoffs with a structured workflow that receives starter data, provisions identity and applies standard access patterns.",
      },
      {
        kicker: "CONTROL",
        title: "IDENTITY AND ACCESS BECOME REPEATABLE.",
        body:
          "Microsoft Entra ID remains the identity source of truth while Logic Apps orchestrates creation, security-group assignment and stakeholder communication.",
      },
      {
        kicker: "OPERATIONS",
        title: "EVERY RUN LEAVES EVIDENCE.",
        body:
          "Logic App run history and Entra logs provide the operational trail needed to validate successful onboarding and investigate failures.",
      },
    ],
  },
];

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find(
    (project) => project.slug === slug
  );
}