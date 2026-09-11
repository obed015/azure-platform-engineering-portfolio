export type DeepDiveChapter = {
  id: string;
  number: string;
  label: string;
  title: string;
  body: string;
  points?: string[];
  technologies?: string[];
  evidence?: {
    title: string;
    description: string;
  }[];
};

export type ProjectDeepDive = {
  slug: string;
  projectNumber: string;
  title: string;
  subtitle: string;
  summary: string;
  technologies: string[];
  architecture: string[];
  chapters: DeepDiveChapter[];
  sourceUrl: string;
  legacyDeepDiveUrl?: string;
};

export const projectDeepDives: ProjectDeepDive[] = [
  {
    slug: "azure-onboarding-automator",
    projectNumber: "01",
    title: "AZURE ONBOARDING AUTOMATOR",
    subtitle: "IDENTITY AUTOMATION / ENGINEERING DEEP DIVE",
    summary:
      "A deeper look at the request-to-identity workflow: structured intake, Logic Apps orchestration, Entra ID provisioning, group-based access, stakeholder notification and operational evidence.",
    technologies: [
      "Logic Apps",
      "Microsoft Entra ID",
      "Security Groups",
      "RBAC",
      "Outlook",
      "Azure Monitor",
      "SharePoint",
    ],
    architecture: [
      "HR or manager submits new-starter data",
      "SharePoint list, email or onboarding request triggers the workflow",
      "Logic Apps maps dynamic employee attributes",
      "Microsoft Entra ID user is created",
      "Department / role security group is assigned",
      "Welcome and stakeholder notifications are sent",
      "Logic App run history and Entra logs provide evidence",
    ],
    sourceUrl:
      "https://oowusu.com/azure-onboard-automator.html",
    chapters: [
      {
        id: "request-model",
        number: "01",
        label: "REQUEST MODEL",
        title: "STRUCTURED INPUT BEFORE AUTOMATION.",
        body:
          "The workflow starts by turning an informal HR or manager handoff into structured employee data that the automation can trust. Display name, username, department, job title and other attributes become dynamic values used throughout provisioning.",
        points: [
          "Supports SharePoint-list, email or request-driven intake.",
          "Keeps identity attributes consistent instead of relying on copy-and-paste account creation.",
          "Creates a repeatable contract between HR, managers and IT operations.",
        ],
      },
      {
        id: "orchestration",
        number: "02",
        label: "ORCHESTRATION",
        title: "LOGIC APPS OWNS THE CONTROL FLOW.",
        body:
          "Azure Logic Apps coordinates request processing, identity actions, access assignment and notifications. Each action leaves run-history evidence, which makes failed onboarding attempts easier to isolate than a manual checklist.",
        technologies: [
          "Logic Apps",
          "Dynamic Content",
          "Connectors",
          "Run History",
        ],
      },
      {
        id: "identity",
        number: "03",
        label: "IDENTITY",
        title: "ENTRA ID IS THE SOURCE OF TRUTH.",
        body:
          "The workflow creates the user from submitted attributes and applies access through reusable security-group patterns. Group-based assignment is easier to audit and safer than copying permissions from another account.",
        points: [
          "Creates the user profile from request metadata.",
          "Uses department or job-title based group assignment.",
          "Supports least-privilege thinking through predefined access templates.",
        ],
      },
      {
        id: "operations",
        number: "04",
        label: "OPERATIONS",
        title: "THE WORKFLOW MUST BE REVIEWABLE AFTER IT RUNS.",
        body:
          "Automation value comes from both execution and evidence. Logic App run history shows where a workflow succeeded or failed, while Entra directory logs support identity and audit review.",
        evidence: [
          {
            title: "LOGIC APP RUN HISTORY",
            description:
              "Step-by-step success and failure evidence for connector actions.",
          },
          {
            title: "ENTRA DIRECTORY EVIDENCE",
            description:
              "Identity creation and access state can be validated after provisioning.",
          },
          {
            title: "NOTIFICATION CONFIRMATION",
            description:
              "Welcome and stakeholder messages provide a visible completion signal.",
          },
        ],
      },
      {
        id: "production",
        number: "05",
        label: "PRODUCTION EVOLUTION",
        title: "EXTEND THE PATTERN WITHOUT BREAKING THE CONTROL MODEL.",
        body:
          "The same orchestration can be extended with approvals, Microsoft 365 licence assignment, Teams notifications and environment-specific access templates while keeping the original identity workflow intact.",
      },
    ],
  },
  {
    slug: "securecloud-hub",
    projectNumber: "02",
    title: "SECURECLOUD HUB",
    subtitle: "ZERO-TRUST FILE PLATFORM / ENGINEERING DEEP DIVE",
    summary:
      "The real implementation path behind identity-first upload, short-lived SAS, private trust-state containers, event-driven malware validation, secure download checks, Terraform and observability.",
    technologies: [
      "Azure Functions",
      "Blob Storage",
      "Event Grid",
      "Entra ID",
      "Managed Identity",
      "Terraform",
      "GitHub Actions",
      "KQL",
    ],
    architecture: [
      "GitHub Actions authenticates to Azure and deploys infrastructure/application",
      "Entra Easy Auth protects the Function App experience",
      "Authenticated user requests a short-lived write SAS",
      "Browser uploads directly to incoming-raw",
      "Event Grid invokes scan_function",
      "Clean content moves to safe-files; infected content moves to quarantine",
      "list_function returns only user-owned clean files",
      "download_function validates identity, ownership and clean metadata",
      "A short-lived read SAS is issued for approved files",
      "Application Insights / Log Analytics capture operational evidence",
    ],
    sourceUrl:
      "https://oowusu.com/secure-cloud-hub.html",
    legacyDeepDiveUrl:
      "https://oowusu.com/secure-cloud-hub-engineering-deepdive.html",
    chapters: [
      {
        id: "identity-boundary",
        number: "01",
        label: "IDENTITY BOUNDARY",
        title: "AUTHENTICATION HAPPENS BEFORE APPLICATION TRUST.",
        body:
          "Microsoft Entra ID Easy Auth protects the Function App experience before application code handles file operations. User identity is derived from platform-provided identity context rather than a client-supplied user identifier.",
        points: [
          "Unauthenticated users are redirected to Microsoft sign-in.",
          "User-scoped paths keep file listings and downloads separated by identity.",
          "Managed Identity and RBAC replace storage account keys in the application flow.",
        ],
      },
      {
        id: "upload-path",
        number: "02",
        label: "UPLOAD PATH",
        title: "THE BROWSER UPLOADS DIRECTLY TO PRIVATE BLOB STORAGE.",
        body:
          "The backend issues a short-lived write-only SAS scoped to the authenticated user's blob path. The file then travels directly from the browser to the private incoming-raw container rather than streaming through the Function App.",
        points: [
          "Short-lived upload capability limits exposure.",
          "No public container or permanent blob URL is required.",
          "Untrusted files always enter the raw trust zone first.",
        ],
      },
      {
        id: "malware-pipeline",
        number: "03",
        label: "MALWARE PIPELINE",
        title: "EVENT GRID MOVES CONTENT THROUGH TRUST STATES.",
        body:
          "Blob creation in incoming-raw triggers scan_function through Event Grid. The scanner records scan metadata and routes clean content to safe-files while infected content is isolated in quarantine.",
        technologies: [
          "Event Grid",
          "scan_function",
          "incoming-raw",
          "safe-files",
          "quarantine",
          "Blob Metadata",
        ],
        evidence: [
          {
            title: "CLEAN PATH",
            description:
              "The file is marked clean and promoted into safe-files.",
          },
          {
            title: "INFECTED PATH",
            description:
              "The file is isolated in quarantine instead of becoming downloadable.",
          },
        ],
      },
      {
        id: "download-control",
        number: "04",
        label: "DOWNLOAD CONTROL",
        title: "CLEAN METADATA IS A REQUIRED AUTHORIZATION CHECK.",
        body:
          "download_function checks the authenticated identity, file ownership, blob existence and clean scan state before returning a short-lived read-only SAS. A file is not downloadable merely because it exists.",
        points: [
          "Identity and ownership are evaluated before SAS creation.",
          "scanStatus must represent an approved clean result.",
          "Read access is per-file and time bounded.",
        ],
      },
      {
        id: "iac-cicd",
        number: "05",
        label: "IaC / CI/CD",
        title: "THE PLATFORM IS REBUILDABLE AND PIPELINE AUTH IS PASSWORDLESS.",
        body:
          "Terraform manages storage, private containers, Function hosting, Event Grid, monitoring and RBAC. GitHub Actions uses Azure federation/OIDC for the deployment path rather than a long-lived application credential.",
        technologies: [
          "Terraform",
          "GitHub Actions",
          "OIDC",
          "RBAC",
          "Flex Consumption",
        ],
      },
      {
        id: "observability",
        number: "06",
        label: "OBSERVABILITY",
        title: "APPLICATION AND STORAGE TELEMETRY SHOW BOTH SIDES OF THE WORKFLOW.",
        body:
          "Function runtime logs confirm executions and host-level failures, while storage audit logs show blob writes, copies and reads across the trust-state containers.",
        evidence: [
          {
            title: "FUNCTION RUNTIME",
            description:
              "Function App log messages support execution and error troubleshooting.",
          },
          {
            title: "STORAGE AUDIT",
            description:
              "Blob write, copy and read operations provide evidence of file movement.",
          },
          {
            title: "SECURITY TRACE",
            description:
              "Upload, scan and download events can be investigated as one end-to-end path.",
          },
        ],
      },
    ],
  },
  {
    slug: "cloud-policy-compliance-dashboard",
    projectNumber: "03",
    title: "CLOUD POLICY COMPLIANCE DASHBOARD",
    subtitle: "GOVERNANCE PLATFORM / ENGINEERING DEEP DIVE",
    summary:
      "A management-group governance baseline built as code, wired into compliance visualization, alerting and managed-identity remediation so policy drift becomes observable and correctable.",
    technologies: [
      "Azure Policy",
      "Bicep",
      "Management Groups",
      "Workbooks",
      "Log Analytics",
      "Azure Monitor",
      "Managed Identity",
      "KQL",
    ],
    architecture: [
      "Bicep deploys the management-group governance baseline",
      "Custom policy definitions are grouped into an initiative",
      "The initiative is assigned at management-group scope",
      "Policy state is queried for non-compliance",
      "Workbook visualizes governance posture",
      "Azure Monitor raises operational alerts",
      "Managed-identity remediation changes the non-compliant resource",
      "Policy state returns to compliant",
    ],
    sourceUrl:
      "https://oowusu.com/cloud-policy-compliance-dashboard.html",
    legacyDeepDiveUrl:
      "https://oowusu.com/cloud-policy-compliance-dashboard-deepdive.html",
    chapters: [
      {
        id: "management-group",
        number: "01",
        label: "MANAGEMENT GROUP",
        title: "THE GOVERNANCE BASELINE STARTS ABOVE A SINGLE SUBSCRIPTION.",
        body:
          "The main Bicep entry point operates at management-group scope and composes the audit policy, remediation policy, initiative and assignment. This turns the build into a reusable governance baseline rather than a portal-only configuration.",
        technologies: [
          "Bicep",
          "Management Group Scope",
          "Policy Definitions",
          "Initiatives",
        ],
      },
      {
        id: "policy-model",
        number: "02",
        label: "POLICY MODEL",
        title: "AUDIT AND REMEDIATION ARE WIRED THROUGH ONE INITIATIVE.",
        body:
          "Policy definitions are composed into an initiative and assigned centrally. The model separates detection from correction while preserving one governance control plane.",
        points: [
          "Audit policy exposes non-compliant state.",
          "Remediation policy provides the corrective path.",
          "Initiative assignment keeps both controls deployable together.",
        ],
      },
      {
        id: "workbook",
        number: "03",
        label: "WORKBOOK",
        title: "COMPLIANCE STATE BECOMES AN OPERATIONS VIEW.",
        body:
          "An Azure Workbook is deployed against the observability layer so teams can move from raw policy state to a reusable dashboard. The workbook is infrastructure-managed rather than manually assembled after deployment.",
        technologies: [
          "Azure Workbooks",
          "Log Analytics",
          "Policy Insights",
          "KQL",
        ],
      },
      {
        id: "detection",
        number: "04",
        label: "DETECTION",
        title: "NON-COMPLIANCE IS QUERIED AS AN OPERATIONAL CONDITION.",
        body:
          "Policy state is filtered for non-compliant resources and fed into the monitoring path. The important design choice is treating governance drift as a signal that can be surfaced and acted on rather than a static compliance report.",
        evidence: [
          {
            title: "POLICY STATE",
            description:
              "Policy Insights exposes resources whose compliance state is NonCompliant.",
          },
          {
            title: "ALERT PATH",
            description:
              "Azure Monitor can turn that state into an operational notification.",
          },
        ],
      },
      {
        id: "remediation",
        number: "05",
        label: "REMEDIATION",
        title: "MANAGED IDENTITY EXECUTES THE CORRECTIVE CONTROL.",
        body:
          "A remediation task is launched against the management-group assignment and the remediation definition reference. The successful run executes the required deployments and restores the environment to compliant state.",
        points: [
          "Remediation is tied to the assigned initiative.",
          "The corrective action runs through an Azure identity rather than operator credentials.",
          "Compliance is re-evaluated after the resource change.",
        ],
      },
      {
        id: "evidence",
        number: "06",
        label: "EVIDENCE",
        title: "THE PLATFORM SHOWS DETECT → VISUALIZE → ALERT → REMEDIATE.",
        body:
          "The deep-dive evidence is strongest when viewed as a lifecycle rather than individual resources: policy drift is detected, visualized, alerted and then corrected with measurable return to compliance.",
      },
    ],
  },
  {
    slug: "weather-tracker",
    projectNumber: "04",
    title: "WEATHER TRACKER",
    subtitle: "CONTAINER PLATFORM / ENGINEERING DEEP DIVE",
    summary:
      "The implementation path behind a FastAPI application packaged with Docker, published through ACR, deployed to Azure Container Apps, monitored through Application Insights and secured with Key Vault via managed identity.",
    technologies: [
      "FastAPI",
      "Docker",
      "Azure Container Registry",
      "Azure Container Apps",
      "GitHub Actions",
      "Application Insights",
      "Azure Monitor",
      "Key Vault",
      "Managed Identity",
    ],
    architecture: [
      "GitHub push triggers the delivery workflow",
      "Docker image is built",
      "Image is published to Azure Container Registry",
      "Azure Container Apps is updated to the new image",
      "FastAPI handles the runtime workload",
      "Application Insights captures requests and traces",
      "Azure Monitor alerting watches external API failures",
      "Weather API secret is referenced from Key Vault through managed identity",
    ],
    sourceUrl:
      "https://oowusu.com/weather-tracker-azure.html",
    legacyDeepDiveUrl:
      "https://oowusu.com/weather-tracker-azure-deepdive.html",
    chapters: [
      {
        id: "application",
        number: "01",
        label: "APPLICATION",
        title: "THE CLOUD BUILD STARTS WITH AN OPERABLE FASTAPI SERVICE.",
        body:
          "The application layer includes weather search and forecast behaviour together with structured logs and a health endpoint so the runtime can expose both user functionality and operational signals.",
        technologies: [
          "FastAPI",
          "Health Endpoint",
          "Structured Logging",
        ],
      },
      {
        id: "container",
        number: "02",
        label: "CONTAINER",
        title: "DOCKER MAKES THE RUNTIME REPEATABLE.",
        body:
          "The application is packaged into a container image, pushed to Azure Container Registry and executed by Azure Container Apps. The same image becomes the unit promoted through the delivery path.",
        technologies: [
          "Docker",
          "ACR",
          "Container Apps",
        ],
      },
      {
        id: "cicd",
        number: "03",
        label: "CI/CD",
        title: "SOURCE CHANGES FLOW INTO A NEW CONTAINER REVISION.",
        body:
          "GitHub Actions builds the Docker image, publishes it to ACR and updates the Container App. Deployment configuration is kept outside the application code and the workflow avoids hardcoding credential values in source.",
        points: [
          "GitHub push starts the build.",
          "Container image is published to ACR.",
          "Container Apps receives the updated image.",
        ],
      },
      {
        id: "observability",
        number: "04",
        label: "OBSERVABILITY",
        title: "APPLICATION INSIGHTS TURNS REQUESTS AND ERRORS INTO EVIDENCE.",
        body:
          "Application Insights is used to inspect recent requests, structured weather traces and external API failures. Azure Monitor alerting then turns selected failure conditions into an operational response path.",
        evidence: [
          {
            title: "REQUEST TELEMETRY",
            description:
              "Recent request activity validates the live application path.",
          },
          {
            title: "STRUCTURED TRACES",
            description:
              "Weather-specific messages support runtime troubleshooting.",
          },
          {
            title: "ERROR ALERT",
            description:
              "External Weather API failure traces can trigger an Azure Monitor alert.",
          },
        ],
      },
      {
        id: "key-vault",
        number: "05",
        label: "KEY VAULT",
        title: "THE WEATHER API SECRET IS NOT AN APPLICATION SETTING VALUE.",
        body:
          "A system-assigned managed identity on the Container App receives Key Vault Secrets User access. The application then references the Key Vault-backed secret rather than embedding the external API key in code.",
        technologies: [
          "Key Vault",
          "Managed Identity",
          "RBAC",
          "Container Apps Secret Reference",
        ],
      },
    ],
  },
  {
    slug: "azure-enterprise-integration-platform",
    projectNumber: "05",
    title: "AZURE ENTERPRISE INTEGRATION PLATFORM",
    subtitle: "INTEGRATION OPERATIONS / ENGINEERING DEEP DIVE",
    summary:
      "An operational deep dive into the API gateway, producer workflow, Dataverse source, Service Bus queue, consumer workflow, monitoring and the break/fix scenarios used to prove day-two platform behaviour.",
    technologies: [
      "API Management",
      "Logic Apps",
      "Service Bus",
      "Dataverse",
      "Azure Monitor",
      "Runbooks",
    ],
    architecture: [
      "Client sends request through API Management",
      "APIM routes to the producer Logic App and applies gateway policy",
      "Producer reads Dynamics 365 / Dataverse accounts",
      "Account events are published to Service Bus",
      "Queue decouples the producer from downstream processing",
      "Consumer Logic App receives and decodes the message",
      "Azure Monitor watches failures, queue backlog, dead-letter and gateway behaviour",
      "Operational runbooks capture the recovery path",
    ],
    sourceUrl:
      "https://oowusu.com/Azure%20Integration%20Operations.html",
    chapters: [
      {
        id: "gateway",
        number: "01",
        label: "API GATEWAY",
        title: "APIM CONTROLS THE ENTRY POINT AND PROTECTS THE BACKEND.",
        body:
          "API Management sits in front of the producer Logic App so routing and rate-limit behaviour can be validated independently from the workflow. Successful requests return an accepted response while gateway failures remain observable at the APIM layer.",
        evidence: [
          {
            title: "202 ACCEPTED",
            description:
              "A successful gateway-to-Logic-App request proves the intended API path.",
          },
          {
            title: "401 BREAK/FIX",
            description:
              "Backend authentication issues are isolated by comparing APIM behaviour with a direct Logic App test.",
          },
          {
            title: "429 RATE LIMIT",
            description:
              "Rate limiting is intentionally tested as expected gateway protection.",
          },
        ],
      },
      {
        id: "producer",
        number: "02",
        label: "PRODUCER",
        title: "THE PRODUCER WORKFLOW READS BUSINESS DATA AND PUBLISHES EVENTS.",
        body:
          "The producer Logic App receives the API request, retrieves account data from Dynamics 365 / Dataverse and publishes account events to the Service Bus queue.",
        technologies: [
          "Logic Apps",
          "Dataverse",
          "Service Bus",
        ],
      },
      {
        id: "queue",
        number: "03",
        label: "QUEUE",
        title: "SERVICE BUS CREATES THE OPERATIONAL BUFFER.",
        body:
          "The queue decouples the producer from the consumer so downstream failure does not stop account-event publication. When the consumer is disabled, active-message backlog becomes a measurable platform signal.",
        points: [
          "Backlog increases when downstream processing is unavailable.",
          "Azure Monitor can alert on active-message growth.",
          "Recovery is proven when the queue drains back to zero.",
        ],
      },
      {
        id: "consumer",
        number: "04",
        label: "CONSUMER",
        title: "MESSAGE ENCODING IS PART OF THE FAILURE MODEL.",
        body:
          "The consumer Logic App receives Service Bus messages, decodes the message content and parses the JSON payload. A deliberate Parse JSON failure demonstrates why the encoded Service Bus content must be converted before parsing.",
        technologies: [
          "Logic Apps",
          "Service Bus Trigger",
          "ContentData",
          "JSON Parsing",
        ],
      },
      {
        id: "monitoring",
        number: "05",
        label: "MONITORING",
        title: "ALERTS COVER GATEWAY, WORKFLOW AND QUEUE CONDITIONS.",
        body:
          "Monitoring spans the integration layers: failed APIM requests, Logic App failures, active queue backlog and dead-letter conditions. That gives operators a view of where the integration is degrading rather than one generic health signal.",
      },
      {
        id: "runbooks",
        number: "06",
        label: "RUNBOOKS",
        title: "RECOVERY KNOWLEDGE IS PART OF THE PLATFORM.",
        body:
          "The project records operational response for incidents such as consumer parse failure, APIM 401 and APIM 429. The runbooks turn one-off troubleshooting into repeatable team knowledge.",
      },
    ],
  },
];

export function getProjectDeepDive(slug: string) {
  return projectDeepDives.find(
    (project) => project.slug === slug
  );
}
