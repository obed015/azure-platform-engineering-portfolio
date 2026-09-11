"use client";

import Link from "next/link";
import { useState } from "react";

type TabKey =
  | "bicep"
  | "workbook"
  | "alerts"
  | "remediation"
  | "cli";

const tabs: Array<{
  key: TabKey;
  index: string;
  title: string;
  meta: string;
}> = [
  {
    key: "bicep",
    index: "01",
    title: "BICEP",
    meta: "POLICY BASELINE",
  },
  {
    key: "workbook",
    index: "02",
    title: "WORKBOOK & KQL",
    meta: "OBSERVABILITY",
  },
  {
    key: "alerts",
    index: "03",
    title: "ALERTS",
    meta: "NON-COMPLIANCE SIGNAL",
  },
  {
    key: "remediation",
    index: "04",
    title: "REMEDIATION",
    meta: "MODIFY + IDENTITY",
  },
  {
    key: "cli",
    index: "05",
    title: "CLI EVIDENCE",
    meta: "LIVE VALIDATION",
  },
];

const managementGroupBaseline = `targetScope = 'managementGroup'

@description('Management group ID where the governance baseline will be deployed.')
param mgId string

module policyPublicNetworkAccess './policy-public-network-access.bicep' = {
  name: 'policy-public-network-access'
  scope: managementGroup(mgId)
  params: {}
}

module policyRemediateStorage './policy-remediate-storage-network-default-deny.bicep' = {
  name: 'policy-remediate-storage-disable-blob-public-access'
  scope: managementGroup(mgId)
  params: {}
}

module initiativeCloudGovernance './initiative-cloud-governance.bicep' = {
  name: 'initiative-cloud-governance'
  scope: managementGroup(mgId)
  params: {
    publicNetworkAuditPolicyDefinitionId: policyPublicNetworkAccess.outputs.policyDefinitionId
    publicNetworkRemediationPolicyDefinitionId: policyRemediateStorage.outputs.policyDefinitionId
  }
}

module assignmentCloudGovernance './assignment-cloud-governance.bicep' = {
  name: 'assignment-cloud-governance'
  scope: managementGroup(mgId)
  params: {
    initiativeDefinitionId: initiativeCloudGovernance.outputs.initiativeDefinitionId
  }
}

output policyDefinitionId string = policyPublicNetworkAccess.outputs.policyDefinitionId
output remediationPolicyDefinitionId string = policyRemediateStorage.outputs.policyDefinitionId
output initiativeDefinitionId string = initiativeCloudGovernance.outputs.initiativeDefinitionId
output assignmentId string = assignmentCloudGovernance.outputs.assignmentId
output assignmentPrincipalId string = assignmentCloudGovernance.outputs.assignmentPrincipalId`;

const remediationPolicy = `targetScope = 'managementGroup'

@description('Name of the remediation policy definition.')
param policyName string = 'modify-storage-disable-blob-public-access'

@description('Display name shown in Azure Policy.')
param policyDisplayName string = 'Remediate Storage Accounts to disable blob public access'

@description('Description for the remediation policy.')
param policyDescription string = 'Modifies Storage Accounts so allowBlobPublicAccess is set to false when found non-compliant.'

resource policyDefinition 'Microsoft.Authorization/policyDefinitions@2025-03-01' = {
  name: policyName
  properties: {
    policyType: 'Custom'
    mode: 'Indexed'
    displayName: policyDisplayName
    description: policyDescription
    metadata: {
      category: 'Storage'
      version: '2.0.0'
    }
    parameters: {}
    policyRule: {
      if: {
        allOf: [
          {
            field: 'type'
            equals: 'Microsoft.Storage/storageAccounts'
          }
          {
            field: 'Microsoft.Storage/storageAccounts/allowBlobPublicAccess'
            notEquals: false
          }
        ]
      }
      then: {
        effect: 'modify'
        details: {
          roleDefinitionIds: [
            '/providers/Microsoft.Authorization/roleDefinitions/17d1049b-9a84-46fb-8f53-869881c3d3ab'
          ]
          conflictEffect: 'audit'
          operations: [
            {
              operation: 'addOrReplace'
              field: 'Microsoft.Storage/storageAccounts/allowBlobPublicAccess'
              value: false
            }
          ]
        }
      }
    }
  }
}

output policyDefinitionId string = policyDefinition.id
output policyDefinitionName string = policyDefinition.name`;

const workbookModule = `targetScope = 'resourceGroup'

@description('Location for the workbook resource.')
param location string

@description('Name of the workbook.')
param workbookDisplayName string = 'Cloud Policy Compliance Dashboard'

@description('Resource ID of the Log Analytics workspace.')
param logAnalyticsWorkspaceId string

@description('Serialized workbook data JSON.')
param workbookData string

resource workbook 'Microsoft.Insights/workbooks@2023-06-01' = {
  name: guid(workbookDisplayName, resourceGroup().id)
  location: location
  kind: 'shared'
  properties: {
    displayName: workbookDisplayName
    sourceId: logAnalyticsWorkspaceId
    category: 'workbook'
    serializedData: workbookData
  }
}

output workbookId string = workbook.id
output workbookName string = workbook.name`;

const workbookJson = `{
  "version": "Notebook/1.0",
  "items": [
    {
      "type": 1,
      "content": {
        "json": "# Cloud Policy Compliance Dashboard\\n\\nThis workbook provides a governance-focused view of Azure Policy compliance, non-compliant resources, and policy-related activity across environments."
      },
      "name": "text-intro"
    },
    {
      "type": 3,
      "content": {
        "version": "KqlItem/1.0",
        "query": "arg(\\"\\").PolicyResources\\n| where type =~ \\"microsoft.policyinsights/policystates\\"\\n| extend complianceState = tostring(properties.complianceState)\\n| where complianceState == \\"NonCompliant\\"\\n| extend policyDefinitionName = tostring(properties.policyDefinitionName)\\n| summarize nonCompliantResources = count() by policyDefinitionName\\n| order by nonCompliantResources desc",
        "title": "Non-Compliance by Policy Definition",
        "resourceType": "microsoft.operationalinsights/workspaces",
        "visualization": "piechart"
      },
      "name": "noncompliance-donut"
    }
  ]
}`;

const policyStateDetection = `arg("").PolicyResources
| where type =~ "microsoft.policyinsights/policystates"
| extend complianceState = tostring(properties.complianceState)
| where complianceState == "NonCompliant"`;

const nonComplianceSummaryKql = `PolicyResources
| where type =~ 'Microsoft.PolicyInsights/PolicyStates'
| where tostring(properties.complianceState) == 'NonCompliant'
| extend
    assignmentName = tostring(properties.policyAssignmentName),
    definitionName = tostring(properties.policyDefinitionName),
    initiativeName = tostring(properties.policySetDefinitionName),
    resourceId = tostring(properties.resourceId),
    resourceType = tostring(properties.resourceType),
    resourceLocation = tostring(properties.resourceLocation),
    timestamp = todatetime(properties.timestamp)
| summarize nonCompliantResources = count() by assignmentName, initiativeName, definitionName, resourceType, resourceLocation
| order by nonCompliantResources desc`;

const policyDenyEventsKql = `AzureActivity
| where CategoryValue =~ 'Policy'
| where ActivityStatusValue in~ ('Failure', 'Succeeded')
| where OperationNameValue has 'policy'
| extend
    resourceId = _ResourceId,
    caller = Caller,
    operationName = OperationNameValue,
    activityStatus = ActivityStatusValue,
    subscriptionId = SubscriptionId,
    resourceGroup = ResourceGroup,
    eventTime = TimeGenerated
| project eventTime, caller, operationName, activityStatus, subscriptionId, resourceGroup, resourceId
| order by eventTime desc`;

const diagnosticSettings = `Name: diag-activity-to-law

Categories selected:
- Administrative
- Policy
- Security
- ServiceHealth
- Recommendation
- ResourceHealth

Destination:
- Send to Log Analytics workspace
- Workspace: law-governance-core`;

const assignmentIdentityCli = `ASSIGNMENT_PRINCIPAL_ID="223eac89-e62f-426c-8aea-99c252c3112a"
SUB_ID=$(az account show --query id -o tsv)

az role assignment create \\
  --assignee-object-id "$ASSIGNMENT_PRINCIPAL_ID" \\
  --assignee-principal-type ServicePrincipal \\
  --role Contributor \\
  --scope /subscriptions/$SUB_ID`;

const remediationTaskCli = `az policy remediation create \\
  --management-group mg-platform \\
  --name remediate-storage-default-deny \\
  --policy-assignment /providers/Microsoft.Management/managementGroups/mg-platform/providers/Microsoft.Authorization/policyAssignments/asg-cloud-gov-base \\
  --definition-reference-id remediateStorageDefaultDeny`;

const remediationResult = `{
  "deploymentStatus": {
    "failedDeployments": 0,
    "successfulDeployments": 2,
    "totalDeployments": 2
  },
  "provisioningState": "Succeeded"
}`;

const subscriptionDeployCli = `az deployment sub create \\
  --name governance-core-sub-deploy \\
  --location uksouth \\
  --template-file infra/governance-core-subscription.bicep \\
  --parameters alertEmailAddress=owusuobed15@yahoo.com`;

const managementGroupDeployCli = `az deployment mg create \\
  --name mg-platform-baseline-deploy \\
  --management-group-id mg-platform \\
  --location uksouth \\
  --template-file mg/main-mg-platform.bicep \\
  --parameters mgId=mg-platform`;

const finalVerificationCli = `az storage account show \\
  --name stnoncompliance7348 \\
  --resource-group rg-governance-core \\
  --query "allowBlobPublicAccess" \\
  -o tsv

az policy state list \\
  --resource-group rg-governance-core \\
  --query "[?contains(resourceId, 'stnoncompliance7348')].{definition:policyDefinitionName, referenceId:policyDefinitionReferenceId, compliance:complianceState}" \\
  -o table`;

const observedResult = `false

Definition                                 ReferenceId                      Compliance
-----------------------------------------  -------------------------------  ------------
modify-storage-disable-blob-public-access  remediatestoragedefaultdeny      Compliant
audit-storage-public-network-access        auditstoragepublicnetworkaccess  Compliant
modify-storage-network-default-deny        remediatestoragedefaultdeny      Compliant`;

function Code({
  label,
  meta,
  children,
}: {
  label: string;
  meta: string;
  children: string;
}) {
  return (
    <div className="cpdeep-code">
      <div className="cpdeep-code-head">
        <div>
          <span>{label}</span>
          <strong>{meta}</strong>
        </div>

        <small>READ ONLY / REAL IMPLEMENTATION</small>
      </div>

      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}

function Pills({
  items,
}: {
  items: string[];
}) {
  return (
    <div className="cpdeep-inline-pills">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

export function CloudPolicyDeepDive() {
  const [activeTab, setActiveTab] =
    useState<TabKey>("bicep");

  return (
    <main className="cpdeep-page">
      <div
        className="cpdeep-grid"
        aria-hidden="true"
      />

      <header className="cpdeep-header">
        <Link
          href="/"
          className="cpdeep-brand"
          aria-label="Return home"
        >
          OO
        </Link>

        <span>
          ENGINEERING / CLOUD POLICY COMPLIANCE
        </span>

        <Link href="/projects/cloud-policy-compliance-dashboard">
          ← PROJECT STORY
        </Link>
      </header>

      <section className="cpdeep-hero">
        <div className="cpdeep-hero-copy">
          <div className="cpdeep-eyebrow">
            <i />
            ENGINEERING DEEP DIVE · REAL BICEP · REAL KQL · REAL CLI EVIDENCE
          </div>

          <div className="cpdeep-project-id">
            <span>PROJECT / 03</span>
            <strong>TECHNICAL SYSTEM ONLINE</strong>
          </div>

          <h1>
            <span>
              CLOUD POLICY COMPLIANCE DASHBOARD
            </span>

            <strong>
              Real implementation details behind the Azure
              governance observability platform.
            </strong>
          </h1>

          <p>
            This page documents the live implementation used
            in the project: custom Azure Policy definitions,
            management-group initiative assignment, workbook
            deployment, Log Analytics KQL, alert rule
            construction, remediation identity and RBAC, and
            the exact CLI path used to validate detection,
            alerting, and remediation end to end.
          </p>

          <div className="cpdeep-tags">
            {[
              "BICEP",
              "AZURE POLICY",
              "WORKBOOK JSON",
              "KQL",
              "AZURE MONITOR ALERTS",
              "CLI VALIDATION EVIDENCE",
            ].map((tag) => (
              <span key={tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className="cpdeep-actions">
            <a href="#implementation">
              JUMP TO IMPLEMENTATION ↓
            </a>

            <Link href="/projects/cloud-policy-compliance-dashboard">
              PROJECT STORY ↗
            </Link>
          </div>

          <div className="cpdeep-meta">
            <span>
              ● POLICY STATES / ARG(&quot;&quot;).POLICYRESOURCES
            </span>

            <span>
              ● REMEDIATION / ASSIGNMENT MANAGED IDENTITY
            </span>

            <span>
              ● RESULT / AUTOMATIC HARDENING + RESTORED COMPLIANCE
            </span>
          </div>
        </div>

        <aside className="cpdeep-summary">
          <div className="cpdeep-summary-head">
            <div>
              <span>IMPLEMENTATION SUMMARY</span>
              <strong>DEPLOYED GOVERNANCE MODEL</strong>
            </div>

            <em>● ACTIVE</em>
          </div>

          <div className="cpdeep-summary-grid">
            <article>
              <span>MANAGEMENT SCOPE</span>
              <strong>MG-PLATFORM</strong>
              <p>
                Custom policy initiative assigned at
                management-group scope.
              </p>
            </article>

            <article>
              <span>SUBSCRIPTION LAYER</span>
              <strong>RG-GOVERNANCE-CORE</strong>
              <p>
                Workspace, workbook, action group, and
                alert rules.
              </p>
            </article>

            <article>
              <span>DETECTION QUERY</span>
              <strong>POLICYRESOURCES</strong>
              <p>
                Policy state filtering through
                Resource Graph integration.
              </p>
            </article>

            <article>
              <span>FINAL REMEDIATION</span>
              <strong>MODIFY</strong>
              <p>
                allowBlobPublicAccess = false through
                Azure Policy modify.
              </p>
            </article>
          </div>

          <div className="cpdeep-summary-flow">
            <span>CONTROL FLOW</span>

            <pre>{`GitHub / local repo
→ Bicep deployment
→ mg-platform policy baseline
→ workbook + alerts
→ non-compliance detected
→ alert email
→ remediation task
→ storage hardened
→ policy compliant`}</pre>
          </div>
        </aside>
      </section>

      <section
        id="implementation"
        className="cpdeep-section"
      >
        <div className="cpdeep-heading">
          <span>01 / IMPLEMENTATION TABS</span>

          <h2>
            EXPLORE THE REAL IMPLEMENTATION.
          </h2>

          <p>
            The tabs follow the build itself: policy
            definitions and initiative wiring, workbook and
            KQL, alerting, remediation configuration, and the
            CLI validation path that proved the platform
            worked in practice.
          </p>
        </div>

        <div className="cpdeep-workbench">
          <div className="cpdeep-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={
                  activeTab === tab.key
                    ? "cpdeep-tab cpdeep-tab-active"
                    : "cpdeep-tab"
                }
                onClick={() => setActiveTab(tab.key)}
              >
                <span>{tab.index}</span>

                <div>
                  <strong>{tab.title}</strong>
                  <small>{tab.meta}</small>
                </div>
              </button>
            ))}
          </div>

          <div className="cpdeep-body">
            {activeTab === "bicep" && (
              <>
                <div className="cpdeep-intro">
                  <div>
                    <span>
                      BICEP / GOVERNANCE BASELINE
                    </span>

                    <h3>
                      MANAGEMENT-GROUP GOVERNANCE
                      AS A REUSABLE PLATFORM.
                    </h3>
                  </div>

                  <p>
                    These are the real Bicep files from the
                    final build: the management-group entry
                    point, the working modify remediation
                    policy, and the workbook resource module.
                  </p>
                </div>

                <article className="cpdeep-build-section">
                  <h4>
                    Bicep – management-group baseline deployment
                  </h4>

                  <p>
                    The main management-group template
                    orchestrates the baseline: audit policy,
                    remediation policy, initiative wiring, and
                    assignment. This is the central entry point
                    that turned the project into a reusable
                    governance platform instead of a manual
                    portal build.
                  </p>

                  <Pills
                    items={[
                      "mg/main-mg-platform.bicep",
                      "managementGroup scope",
                      "initiative + assignment",
                    ]}
                  />

                  <Code
                    label="BICEP"
                    meta="mg/main-mg-platform.bicep"
                  >
                    {managementGroupBaseline}
                  </Code>
                </article>

                <article className="cpdeep-build-section">
                  <h4>
                    Bicep – final remediation policy definition
                  </h4>

                  <p>
                    The final working remediation path used
                    Azure Policy modify against Storage Account
                    blob public access. This replaced an earlier
                    remediation approach that did not produce a
                    reliable remediable target.
                  </p>

                  <Pills
                    items={[
                      "modify effect",
                      "allowBlobPublicAccess",
                      "roleDefinitionIds",
                    ]}
                  />

                  <Code
                    label="BICEP"
                    meta="mg/policy-remediate-storage-network-default-deny.bicep"
                  >
                    {remediationPolicy}
                  </Code>
                </article>

                <article className="cpdeep-build-section">
                  <h4>
                    Bicep – workbook resource module
                  </h4>

                  <p>
                    The workbook is also deployed as code.
                    That matters because the visual layer stays
                    versioned in the same repository as the
                    policy and alert logic.
                  </p>

                  <Code
                    label="BICEP"
                    meta="infra/modules/workbook.bicep"
                  >
                    {workbookModule}
                  </Code>
                </article>
              </>
            )}

            {activeTab === "workbook" && (
              <>
                <div className="cpdeep-intro">
                  <div>
                    <span>WORKBOOK / KQL</span>

                    <h3>
                      LIVE POLICY STATE AS AN
                      OPERATIONAL CONTROL SURFACE.
                    </h3>
                  </div>

                  <p>
                    The workbook and query layer was reworked
                    around the actual policy state source that
                    validated successfully in the environment.
                  </p>
                </div>

                <article className="cpdeep-build-section">
                  <h4>
                    Workbook JSON – non-compliance donut and
                    summary table
                  </h4>

                  <p>
                    The final workbook JSON uses
                    {" "}
                    <code>arg(&quot;&quot;).PolicyResources</code>
                    {" "}
                    for policy state data and includes the
                    non-compliance visual used in the final
                    validation screenshots.
                  </p>

                  <Code
                    label="WORKBOOK JSON"
                    meta="workbooks/policy-dashboard.json (core fragments)"
                  >
                    {workbookJson}
                  </Code>
                </article>

                <article className="cpdeep-build-section">
                  <h4>
                    KQL – final policy state query used for
                    workbook and alerts
                  </h4>

                  <p>
                    This was the decisive query change in the
                    build. Using
                    {" "}
                    <code>arg(&quot;&quot;).PolicyResources</code>
                    {" "}
                    fixed the workbook and alert path after
                    earlier attempts using the wrong table
                    name failed.
                  </p>

                  <Pills
                    items={[
                      'arg("").PolicyResources',
                      "Policy states",
                      "Reusable for workbook + alerts",
                    ]}
                  />

                  <Code
                    label="KQL"
                    meta="CORE POLICY STATE DETECTION QUERY"
                  >
                    {policyStateDetection}
                  </Code>
                </article>

                <article className="cpdeep-build-section">
                  <h4>
                    KQL files stored in repo
                  </h4>

                  <p>
                    Operational queries were stored in the
                    repository so workbook logic and alert
                    logic remained aligned with the codebase.
                  </p>

                  <Code
                    label="KQL"
                    meta="kql/non-compliance-summary.kql"
                  >
                    {nonComplianceSummaryKql}
                  </Code>

                  <Code
                    label="KQL"
                    meta="kql/policy-deny-events.kql"
                  >
                    {policyDenyEventsKql}
                  </Code>
                </article>
              </>
            )}

            {activeTab === "alerts" && (
              <>
                <div className="cpdeep-intro">
                  <div>
                    <span>AZURE MONITOR / ALERTS</span>

                    <h3>
                      THE VALIDATED NON-COMPLIANCE
                      ALERT PATH.
                    </h3>
                  </div>

                  <p>
                    The final evidence path uses the
                    non-compliance query that actually fired,
                    appeared in alert history, and delivered
                    email through the Action Group.
                  </p>
                </div>

                <article className="cpdeep-build-section">
                  <h4>
                    Alerting – non-compliance query and
                    validation path
                  </h4>

                  <p>
                    The activity-based alert path was explored
                    but was not retained as the primary evidence
                    path because the live behaviour did not
                    validate consistently enough for the final
                    story.
                  </p>

                  <Code
                    label="KQL"
                    meta="WORKING ALERT QUERY"
                  >
                    {policyStateDetection}
                  </Code>

                  <div className="cpdeep-note">
                    <span>VALIDATED RESULT</span>

                    <p>
                      This query crossed a threshold greater
                      than zero and fired the
                      {" "}
                      <code>alert-policy-noncompliance</code>
                      {" "}
                      rule, which was then visible in alert
                      history and email evidence.
                    </p>
                  </div>
                </article>

                <article className="cpdeep-build-section">
                  <h4>
                    Diagnostic settings – why they mattered
                  </h4>

                  <p>
                    Alert validation also required the
                    subscription Activity Log to be streamed
                    into Log Analytics. Without that,
                    activity investigations and some query
                    experiments had no underlying data.
                  </p>

                  <Code
                    label="AZURE PORTAL"
                    meta="DIAGNOSTIC SETTINGS VALIDATED DURING BUILD"
                  >
                    {diagnosticSettings}
                  </Code>
                </article>
              </>
            )}

            {activeTab === "remediation" && (
              <>
                <div className="cpdeep-intro">
                  <div>
                    <span>REMEDIATION / IDENTITY</span>

                    <h3>
                      MODIFY EFFECT + MANAGED IDENTITY
                      + RBAC.
                    </h3>
                  </div>

                  <p>
                    Remediation only became reliable after the
                    initiative assignment received a
                    system-assigned identity and the policy
                    targeted a supported Storage Account
                    property.
                  </p>
                </div>

                <article className="cpdeep-build-section">
                  <h4>
                    Remediation design – final working pattern
                  </h4>

                  <Pills
                    items={[
                      "System-assigned identity",
                      "Contributor RBAC",
                      "Modify effect",
                      "allowBlobPublicAccess",
                    ]}
                  />

                  <Code
                    label="AZURE CLI"
                    meta="ASSIGNMENT IDENTITY AND RBAC (LIVE CLI)"
                  >
                    {assignmentIdentityCli}
                  </Code>
                </article>

                <article className="cpdeep-build-section">
                  <h4>
                    Remediation task – management-group
                    execution
                  </h4>

                  <p>
                    The remediation task was created directly
                    against the management-group assignment
                    and initiative reference ID.
                  </p>

                  <Code
                    label="AZURE CLI"
                    meta="REMEDIATION TASK CREATION (LIVE CLI)"
                  >
                    {remediationTaskCli}
                  </Code>

                  <Code
                    label="JSON"
                    meta="SUCCESSFUL REMEDIATION RESULT (LIVE CLI)"
                  >
                    {remediationResult}
                  </Code>

                  <div className="cpdeep-result cpdeep-result-success">
                    <span>REMEDIATION RESULT</span>
                    <strong>
                      SUCCEEDED / 2 OF 2 DEPLOYMENTS
                    </strong>
                  </div>
                </article>
              </>
            )}

            {activeTab === "cli" && (
              <>
                <div className="cpdeep-intro">
                  <div>
                    <span>CLI / LIVE VALIDATION</span>

                    <h3>
                      DEPLOY, REMEDIATE,
                      VERIFY.
                    </h3>
                  </div>

                  <p>
                    These are the exact command patterns used
                    repeatedly through the build to deploy the
                    subscription layer, deploy the
                    management-group baseline, and prove the
                    final resource state.
                  </p>
                </div>

                <article className="cpdeep-build-section">
                  <h4>
                    CLI evidence – deployment sequence used in
                    the live build
                  </h4>

                  <Code
                    label="AZURE CLI"
                    meta="SUBSCRIPTION GOVERNANCE DEPLOYMENT"
                  >
                    {subscriptionDeployCli}
                  </Code>

                  <Code
                    label="AZURE CLI"
                    meta="MANAGEMENT-GROUP BASELINE DEPLOYMENT"
                  >
                    {managementGroupDeployCli}
                  </Code>
                </article>

                <article className="cpdeep-build-section">
                  <h4>
                    CLI evidence – final verification commands
                  </h4>

                  <p>
                    These commands were the final proof that
                    the platform completed the remediation
                    story and restored compliance.
                  </p>

                  <Code
                    label="AZURE CLI"
                    meta="FINAL PROPERTY + COMPLIANCE VERIFICATION"
                  >
                    {finalVerificationCli}
                  </Code>

                  <Code
                    label="TERMINAL OUTPUT"
                    meta="OBSERVED LIVE RESULT"
                  >
                    {observedResult}
                  </Code>

                  <div className="cpdeep-result cpdeep-result-success">
                    <span>FINAL VERIFIED STATE</span>
                    <strong>
                      ALLOWBLOBPUBLICACCESS = FALSE /
                      COMPLIANT
                    </strong>
                  </div>
                </article>
              </>
            )}
          </div>
        </div>
      </section>

      <footer className="cpdeep-footer">
        <Link href="/projects/cloud-policy-compliance-dashboard">
          ← PROJECT STORY
        </Link>

        <span>
          CLOUD POLICY COMPLIANCE / ENGINEERING DEEP DIVE
        </span>

        <Link href="/#projects">
          ALL PROJECTS →
        </Link>
      </footer>
    </main>
  );
}
