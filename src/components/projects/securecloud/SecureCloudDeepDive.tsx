"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type TabKey = "python" | "terraform" | "cicd" | "kql" | "malware";

const tabs: Array<{
  key: TabKey;
  index: string;
  title: string;
  meta: string;
}> = [
  {
    key: "python",
    index: "01",
    title: "PYTHON FUNCTIONS",
    meta: "DOWNLOAD ACCESS GATE",
  },
  {
    key: "terraform",
    index: "02",
    title: "TERRAFORM IAC",
    meta: "AZURE INFRASTRUCTURE",
  },
  {
    key: "cicd",
    index: "03",
    title: "CI/CD · OIDC",
    meta: "PASSWORDLESS DELIVERY",
  },
  {
    key: "kql",
    index: "04",
    title: "KQL & OBSERVABILITY",
    meta: "RUNTIME TELEMETRY",
  },
  {
    key: "malware",
    index: "05",
    title: "MALWARE PIPELINE",
    meta: "TRUST DECISION",
  },
];

const pythonCode = `def main(req: func.HttpRequest) -> func.HttpResponse:
    principal = parse_easy_auth_principal(req)
    user_id = principal.get("user_id", "unknown")

    if user_id == "unknown":
        return func.HttpResponse(
            "Unauthorized.",
            status_code=401,
        )

    file_name = req.params.get("fileName")

    if not file_name or not is_valid_filename(file_name):
        return func.HttpResponse(
            "Invalid file request.",
            status_code=400,
        )

    blob_name = f"{user_id}/{file_name}"

    credential = DefaultAzureCredential()

    blob_service = BlobServiceClient(
        account_url=os.environ["STORAGE_ACCOUNT_URL"],
        credential=credential,
    )

    blob_client = blob_service.get_blob_client(
        container=os.environ["SAFE_CONTAINER"],
        blob=blob_name,
    )

    properties = blob_client.get_blob_properties()
    metadata = properties.metadata or {}

    scan_status = metadata.get(
        "scanstatus",
        metadata.get("scanStatus", "unknown"),
    )

    if scan_status != "clean":
        return func.HttpResponse(
            "File is not available for download.",
            status_code=403,
        )

    now = datetime.datetime.now(datetime.timezone.utc)
    expiry = now + datetime.timedelta(minutes=15)

    delegation_key = blob_service.get_user_delegation_key(
        key_start_time=now,
        key_expiry_time=expiry,
    )

    sas_token = generate_blob_sas(
        account_name=account_name,
        container_name=safe_container,
        blob_name=blob_name,
        user_delegation_key=delegation_key,
        permission=BlobSasPermissions(read=True),
        expiry=expiry,
    )

    return func.HttpResponse(
        json.dumps({"downloadUrl": sas_url}),
        mimetype="application/json",
        status_code=200,
    )`;

const terraformCode = `resource "azurerm_storage_account" "main" {
  name                     = "st\${var.project_name}\${var.environment}001"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  allow_nested_items_to_be_public = false
  min_tls_version                 = "TLS1_2"
  https_traffic_only_enabled      = true

  blob_properties {
    versioning_enabled = true

    delete_retention_policy {
      days = 30
    }

    container_delete_retention_policy {
      days = 30
    }

    cors_rule {
      allowed_origins = [
        "https://\${local.function_app_name}.azurewebsites.net"
      ]

      allowed_methods = [
        "GET",
        "PUT",
        "OPTIONS",
      ]

      allowed_headers    = ["*"]
      exposed_headers    = ["*"]
      max_age_in_seconds = 3600
    }
  }
}

resource "azurerm_storage_container" "incoming_raw" {
  name                  = "incoming-raw"
  storage_account_id    = azurerm_storage_account.main.id
  container_access_type = "private"
}

resource "azurerm_storage_container" "safe_files" {
  name                  = "safe-files"
  storage_account_id    = azurerm_storage_account.main.id
  container_access_type = "private"
}

resource "azurerm_storage_container" "quarantine" {
  name                  = "quarantine"
  storage_account_id    = azurerm_storage_account.main.id
  container_access_type = "private"
}`;

const cicdCode = `INFRASTRUCTURE PIPELINE

GitHub Actions
    ↓
OIDC token
    ↓
Azure Login
    ↓
Terraform init
    ↓
Terraform validate
    ↓
Terraform plan
    ↓
Terraform apply


APPLICATION PIPELINE

GitHub Actions
    ↓
OIDC token
    ↓
Azure Login
    ↓
Python dependencies
    ↓
Function package
    ↓
Function App publish
    ↓
Runtime verification


SECURITY OUTCOME

✓ No stored Azure client secret
✓ Repo / branch scoped federation
✓ Infrastructure and application
  deployments stay separated`;

const scanKql = `AppTraces
| where TimeGenerated > ago(24h)
| where Message has_any (
    "Scan triggered",
    "Scan completed",
    "Uploaded scanned blob successfully",
    "Deleted original blob from incoming container"
)
| project
    TimeGenerated,
    Message,
    SeverityLevel
| order by TimeGenerated desc`;

const storageKql = `StorageBlobLogs
| where TimeGenerated > ago(24h)
| where OperationName in (
    "PutBlob",
    "PutBlockList",
    "CopyBlob",
    "GetBlob"
)
| project
    TimeGenerated,
    OperationName,
    ObjectKey,
    CallerIpAddress,
    AuthenticationType,
    StatusCode
| order by TimeGenerated desc`;

function HudCode({
  label,
  meta,
  children,
}: {
  label: string;
  meta: string;
  children: string;
}) {
  return (
    <div className="scdeep-code">
      <div className="scdeep-code-head">
        <div>
          <span>{label}</span>
          <strong>{meta}</strong>
        </div>

        <small>READ ONLY</small>
      </div>

      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}

export function SecureCloudDeepDive() {
  const [activeTab, setActiveTab] =
    useState<TabKey>("python");

  return (
    <main className="scdeep-page">
      <div
        className="scdeep-grid"
        aria-hidden="true"
      />

      <header className="scdeep-header">
        <Link
          href="/"
          className="scdeep-brand"
          aria-label="Return home"
        >
          OO
        </Link>

        <span>
          ENGINEERING / SECURECLOUD HUB
        </span>

        <Link href="/projects/securecloud-hub">
          ← PROJECT STORY
        </Link>
      </header>

      {/* =====================================================
          DEEP DIVE INTRO
      ===================================================== */}

      <section className="scdeep-hero">
        <div className="scdeep-hero-copy">
          <div className="scdeep-eyebrow">
            <i />
            ENGINEERING DEEP DIVE · IMPLEMENTATION LAYER
          </div>

          <div className="scdeep-project-id">
            <span>PROJECT / 02</span>
            <strong>TECHNICAL SYSTEM ONLINE</strong>
          </div>

          <h1>
            <span>SECURECLOUD HUB</span>

            <strong>
              Real implementation details behind the
              Azure-native zero-trust file sharing platform.
            </strong>
          </h1>

          <p>
            This is the engineering layer behind the project:
            authenticated Azure Functions, user-scoped Blob
            paths, short-lived SAS, private storage, Event Grid
            malware scanning, Terraform, OIDC-based CI/CD and
            operational telemetry.
          </p>

          <div className="scdeep-tags">
            {[
              "PYTHON FUNCTIONS",
              "TERRAFORM",
              "GITHUB ACTIONS · OIDC",
              "KQL",
              "EVENT GRID",
              "MANAGED IDENTITY",
            ].map((tag) => (
              <span key={tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className="scdeep-actions">
            <a href="#architecture">
              ARCHITECTURE ↓
            </a>

            <a href="#implementation">
              IMPLEMENTATION ↓
            </a>

            <Link href="/projects/securecloud-hub">
              PROJECT STORY ↗
            </Link>
          </div>

          <div className="scdeep-meta">
            <span>
              ● ACCESS / IDENTITY + CLEAN METADATA
            </span>

            <span>
              ● DOWNLOAD / READ SAS / 15 MIN
            </span>

            <span>
              ● DEPLOYMENT / PASSWORDLESS OIDC
            </span>
          </div>
        </div>

        <aside className="scdeep-summary">
          <div className="scdeep-summary-head">
            <div>
              <span>IMPLEMENTATION SUMMARY</span>
              <strong>DEPLOYED SYSTEM MODEL</strong>
            </div>

            <em>
              ● ACTIVE
            </em>
          </div>

          <div className="scdeep-summary-grid">
            <article>
              <span>FRONTEND</span>
              <strong>FUNCTION APP UI</strong>
              <p>
                Authenticated upload, clean-file listing,
                and secure downloads.
              </p>
            </article>

            <article>
              <span>UPLOAD PATH</span>
              <strong>DIRECT TO BLOB</strong>
              <p>
                request_upload → write SAS →
                incoming-raw.
              </p>
            </article>

            <article>
              <span>IDENTITY</span>
              <strong>ENTRA + EASY AUTH</strong>
              <p>
                Backend derives trusted identity from the
                platform principal.
              </p>
            </article>

            <article>
              <span>SCAN PATH</span>
              <strong>EVENT DRIVEN</strong>
              <p>
                Event Grid → scan_function →
                safe-files / quarantine.
              </p>
            </article>
          </div>

          <div className="scdeep-summary-flow">
            <span>CONTROL FLOW</span>

            <pre>{`Browser
  ↓
request_upload
  ↓
incoming-raw
  ↓
Event Grid
  ↓
scan_function
  ├─ clean → safe-files
  └─ infected → quarantine
                 ↓
          download_function
                 ↓
             read SAS`}</pre>
          </div>
        </aside>
      </section>

      {/* =====================================================
          ARCHITECTURE
      ===================================================== */}

      <section
        id="architecture"
        className="scdeep-section"
      >
        <div className="scdeep-heading">
          <span>01 / ENGINEERING ARCHITECTURE</span>

          <h2>
            PRODUCTION-STYLE AZURE
            SERVERLESS WORKFLOW.
          </h2>

          <p>
            The deployed design combines passwordless delivery,
            identity-first access, private storage, explicit
            trust zones, event-driven inspection and
            observable runtime behaviour.
          </p>
        </div>

        <div className="scdeep-architecture">
          <div className="scdeep-architecture-media">
            <div className="scdeep-media-head">
              <span>
                ARCHITECTURE / FULL SYSTEM
              </span>

              <strong>
                CONTROL SURFACE
              </strong>
            </div>

            <Image
              src="/images/securecloud-hub-hero-architecture.webp"
              alt="SecureCloud Hub engineering architecture"
              width={1500}
              height={900}
            />
          </div>

          <article className="scdeep-architecture-copy">
            <span>
              SYSTEM / END-TO-END
            </span>

            <h3>
              DEPLOYMENT, IDENTITY,
              STORAGE, SCANNING AND
              DOWNLOAD AUTHORIZATION.
            </h3>

            <p>
              The system separates control operations from
              file transfer. Functions authorize the action;
              Blob Storage handles the data path.
            </p>

            <ul>
              <li>
                GitHub Actions authenticates to Azure using
                OIDC federation.
              </li>

              <li>
                Terraform provisions the Azure platform.
              </li>

              <li>
                Entra ID + Easy Auth establishes the user
                identity boundary.
              </li>

              <li>
                Event Grid decouples upload from malware
                inspection.
              </li>

              <li>
                Only clean user-owned blobs receive
                temporary download access.
              </li>
            </ul>

            <a href="#implementation">
              ENTER IMPLEMENTATION ↓
            </a>
          </article>
        </div>
      </section>

      {/* =====================================================
          IMPLEMENTATION
      ===================================================== */}

      <section
        id="implementation"
        className="scdeep-section"
      >
        <div className="scdeep-heading scdeep-heading-compact">
          <span>02 / IMPLEMENTATION</span>

          <h2>
            EXPLORE THE REAL BUILD.
          </h2>

          <p>
            Each tab exposes a different engineering layer
            while keeping the implementation inside one
            control-surface view.
          </p>
        </div>

        <div className="scdeep-workbench">
          <div className="scdeep-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={
                  activeTab === tab.key
                    ? "scdeep-tab scdeep-tab-active"
                    : "scdeep-tab"
                }
                onClick={() =>
                  setActiveTab(tab.key)
                }
              >
                <span>{tab.index}</span>

                <div>
                  <strong>
                    {tab.title}
                  </strong>

                  <small>
                    {tab.meta}
                  </small>
                </div>
              </button>
            ))}
          </div>

          <div className="scdeep-workbench-body">
            {activeTab === "python" && (
              <>
                <div className="scdeep-workbench-intro">
                  <div>
                    <span>
                      PYTHON / DOWNLOAD_FUNCTION
                    </span>

                    <h3>
                      THE FINAL DOWNLOAD
                      ACCESS GATE.
                    </h3>
                  </div>

                  <p>
                    Identity, user ownership, Blob existence
                    and clean scan metadata are verified
                    before a short-lived read-only SAS URL
                    is generated.
                  </p>
                </div>

                <div className="scdeep-pills">
                  <span>EASY AUTH PRINCIPAL</span>
                  <span>USER-SCOPED PATH</span>
                  <span>SCANSTATUS=CLEAN</span>
                  <span>READ SAS / 15 MIN</span>
                </div>

                <HudCode
                  label="PYTHON"
                  meta="functions/download_function/__init__.py"
                >
                  {pythonCode}
                </HudCode>
              </>
            )}

            {activeTab === "terraform" && (
              <>
                <div className="scdeep-workbench-intro">
                  <div>
                    <span>
                      TERRAFORM / STORAGE
                    </span>

                    <h3>
                      PRIVATE STORAGE
                      DEFINED AS CODE.
                    </h3>
                  </div>

                  <p>
                    The storage account, private containers,
                    retention settings and browser CORS
                    requirements are version-controlled and
                    reproducible.
                  </p>
                </div>

                <div className="scdeep-pills">
                  <span>PRIVATE CONTAINERS</span>
                  <span>TLS 1.2</span>
                  <span>VERSIONING</span>
                  <span>CORS</span>
                </div>

                <HudCode
                  label="TERRAFORM"
                  meta="infra/storage.tf"
                >
                  {terraformCode}
                </HudCode>
              </>
            )}

            {activeTab === "cicd" && (
              <>
                <div className="scdeep-workbench-intro">
                  <div>
                    <span>
                      GITHUB ACTIONS / OIDC
                    </span>

                    <h3>
                      PASSWORDLESS DEPLOYMENT
                      WITHOUT STORED SECRETS.
                    </h3>
                  </div>

                  <p>
                    Infrastructure and application delivery
                    remain separate while Azure authentication
                    is handled through GitHub OIDC federation.
                  </p>
                </div>

                <div className="scdeep-pills">
                  <span>OIDC FEDERATION</span>
                  <span>TERRAFORM APPLY</span>
                  <span>FUNCTION PUBLISH</span>
                  <span>NO CLIENT SECRET</span>
                </div>

                <HudCode
                  label="CI/CD"
                  meta="PIPELINE CONTROL FLOW"
                >
                  {cicdCode}
                </HudCode>
              </>
            )}

            {activeTab === "kql" && (
              <>
                <div className="scdeep-workbench-intro">
                  <div>
                    <span>
                      OBSERVABILITY / KQL
                    </span>

                    <h3>
                      FOLLOW THE PLATFORM
                      AT RUNTIME.
                    </h3>
                  </div>

                  <p>
                    Application traces expose the scan lifecycle
                    while storage logs provide an independent
                    view of Blob operations.
                  </p>
                </div>

                <div className="scdeep-kql-grid">
                  <HudCode
                    label="KQL / APPTRACES"
                    meta="SCAN LIFECYCLE"
                  >
                    {scanKql}
                  </HudCode>

                  <HudCode
                    label="KQL / STORAGEBLOBLOGS"
                    meta="STORAGE AUDIT"
                  >
                    {storageKql}
                  </HudCode>
                </div>
              </>
            )}

            {activeTab === "malware" && (
              <>
                <div className="scdeep-workbench-intro">
                  <div>
                    <span>
                      MALWARE / TRUST TRANSITION
                    </span>

                    <h3>
                      CLEAN AND INFECTED
                      CONTENT TAKE DIFFERENT PATHS.
                    </h3>
                  </div>

                  <p>
                    The scanner makes an explicit trust decision,
                    persists metadata, moves the Blob to the
                    correct container and removes the original
                    untrusted copy.
                  </p>
                </div>

                <div className="scdeep-malware-grid">
                  <article className="scdeep-result scdeep-result-clean">
                    <div>
                      <span>CLEAN PATH</span>
                      <strong>VERIFIED</strong>
                    </div>

                    <pre>{`incoming-raw
    ↓
scan_function
    ↓
scanStatus = clean
    ↓
safe-files
    ↓
download allowed`}</pre>
                  </article>

                  <article className="scdeep-result scdeep-result-danger">
                    <div>
                      <span>INFECTED PATH</span>
                      <strong>ISOLATED</strong>
                    </div>

                    <pre>{`incoming-raw
    ↓
scan_function
    ↓
scanStatus = infected
    ↓
quarantine
    ↓
download blocked`}</pre>
                  </article>
                </div>

                <HudCode
                  label="SCAN FUNCTION"
                  meta="EXECUTION SEQUENCE"
                >
{`BlobCreated
→ Event Grid
→ scan_function
→ blob downloaded
→ scan performed
→ scan metadata written
→ destination container selected
→ Blob copied
→ incoming-raw original deleted`}
                </HudCode>
              </>
            )}
          </div>
        </div>
      </section>

      <footer className="scdeep-footer">
        <Link href="/projects/securecloud-hub">
          ← PROJECT STORY
        </Link>

        <span>
          SECURECLOUD HUB / ENGINEERING DEEP DIVE
        </span>

        <Link href="/#projects">
          ALL PROJECTS →
        </Link>
      </footer>
    </main>
  );
}
