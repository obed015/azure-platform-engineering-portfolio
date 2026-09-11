"use client";

const logicalComponents = [
  {
    number: "01",
    title: "GitHub Actions CI/CD",
    meta: "deploy-infrastructure · deploy-application",
    body: "GitHub Actions deploys infrastructure and Function code using OIDC federation, avoiding long-lived Azure credentials.",
    chips: ["OIDC LOGIN", "INFRA / APP SEPARATION"],
  },
  {
    number: "02",
    title: "Terraform IaC layer",
    meta: "Resource Group · Storage · Function App · Event Grid · Monitoring",
    body: "Terraform provisions the storage account, containers, Flex Function App, Event Grid subscription, monitoring resources, and RBAC assignments.",
  },
  {
    number: "03",
    title: "Frontend + Easy Auth",
    meta: "frontend Function · Microsoft Entra ID",
    body: "The frontend is served through the Function App, and Easy Auth forces Microsoft sign-in before users can see files or request operations.",
    chips: ["FRONTEND", "EASY AUTH"],
  },
  {
    number: "04",
    title: "Upload SAS issuer",
    meta: "request_upload_function",
    body: "The backend creates a short-lived write-only SAS URL for the authenticated user, scoped to their blob path in incoming-raw.",
  },
  {
    number: "05",
    title: "Storage account + containers",
    meta: "incoming-raw · safe-files · quarantine · function-packages",
    body: "Files move across private containers according to trust state. Clean files never mix with unscanned or infected content.",
  },
  {
    number: "06",
    title: "Event Grid + scan_function",
    meta: "BlobCreated → scan pipeline",
    body: "Event Grid watches incoming-raw and triggers scan_function when new uploads arrive.",
  },
  {
    number: "07",
    title: "Clean file listing",
    meta: "list_function",
    body: "The frontend retrieves only the authenticated user's clean files from safe-files, using user-scoped blob paths.",
  },
  {
    number: "08",
    title: "Secure download SAS generator",
    meta: "download_function",
    body: "The backend checks identity, blob existence, and scanStatus=clean, then issues a short-lived read-only SAS URL.",
  },
  {
    number: "09",
    title: "Monitoring & observability",
    meta: "Application Insights · Log Analytics",
    body: "Logs capture upload SAS issuance, scan execution, clean/infected outcomes, and secure download activity for troubleshooting and auditability.",
  },
];

const workflow = [
  ["User signs in with Microsoft", "The browser accesses the Function App frontend and is authenticated through Easy Auth with Microsoft Entra ID."],
  ["User requests upload SAS", "The frontend calls request_upload_function, which returns a short-lived write-only SAS URL."],
  ["Browser uploads directly to Blob", "The selected file uploads directly into incoming-raw/<user-id>/filename without streaming through the Function App."],
  ["Event Grid triggers scan", "BlobCreated events from incoming-raw invoke scan_function."],
  ["File is scanned and tagged", "The scan pipeline writes metadata including scanStatus, scanReason, and scannedAtUtc."],
  ["Promote or quarantine", "Clean files move to safe-files. Infected files move to quarantine."],
  ["User refreshes clean file list", "list_function shows only clean files belonging to the authenticated user."],
  ["User requests secure download link", "download_function validates the blob and generates a short-lived read-only SAS URL if the file is approved."],
  ["Browser downloads from Storage", "The browser downloads directly from Blob Storage and the SAS expires automatically."],
];

export function SecureCloudArchitecture() {
  return (
    <section id="architecture" className="securecloud-story-section">
      <div className="securecloud-story-heading">
        <span>04 / AZURE ARCHITECTURE</span>
        <h2>FROM UPLOAD REQUEST TO SECURE DOWNLOAD.</h2>
        <p>
          SecureCloud Hub is built from discrete Azure components that map directly to deployed resources and Python Functions.
          The platform is fully rebuildable through Terraform and mirrors a production serverless design.
        </p>
      </div>

      <div className="securecloud-arch-split">
        <article className="securecloud-hud-panel">
          <div className="securecloud-panel-label">LOGICAL COMPONENTS</div>
          <div className="securecloud-step-list">
            {logicalComponents.map((item) => (
              <div key={item.number} className="securecloud-step-row">
                <span className="securecloud-step-number">{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <small>{item.meta}</small>
                  <p>{item.body}</p>
                  {item.chips && (
                    <div className="securecloud-mini-chips">
                      {item.chips.map((chip) => <span key={chip}>{chip}</span>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="securecloud-hud-panel">
          <div className="securecloud-panel-label">END-TO-END WORKFLOW</div>
          <div className="securecloud-step-list">
            {workflow.map(([title, body], index) => (
              <div key={title} className="securecloud-step-row">
                <span className="securecloud-step-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="securecloud-topology">
        <div className="securecloud-topology-header">
          <span>CONTROL SURFACE / LIVE ARCHITECTURE</span>
          <strong>ZERO-TRUST DATA PATH</strong>
        </div>
        <pre>{`GitHub Actions → Terraform → Flex Function App
Easy Auth (Entra ID) → Managed Identity + RBAC

Browser
   ↓
request_upload_function
   ↓  write SAS / 10m
incoming-raw
   ↓  BlobCreated
Event Grid
   ↓
scan_function
   ├── CLEAN    → safe-files
   └── INFECTED → quarantine
                      ↓
list_function → download_function
                      ↓
                read SAS / 15m
                      ↓
                  Browser`}</pre>
      </div>
    </section>
  );
}
