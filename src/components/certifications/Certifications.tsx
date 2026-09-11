import Image from "next/image";

import { SectionShell } from "@/components/ui/SectionShell";

const credentialUrl =
  "https://learn.microsoft.com/en-us/users/obedowusu-5856/credentials/certification/azure-fundamentals?tab=credentials-tab&source=docs";

export function Certifications() {
  return (
    <SectionShell
      id="certifications"
      number="03"
      label="CERTIFICATIONS / CONTINUOUS DEVELOPMENT"
      title={
        <>
          MICROSOFT CREDENTIALS.
          <br />
          <span className="text-cyber">
            BACKED BY HANDS-ON ENGINEERING.
          </span>
        </>
      }
    >
      <div className="cert-khud cert-khud-official">
        <div
          className="cert-khud-grid"
          aria-hidden="true"
        />
        <div
          className="cert-khud-scan"
          aria-hidden="true"
        />

        <div className="cert-khud-header">
          <div>
            <span className="cert-khud-live" />
            <strong>
              CREDENTIAL CONTROL / MICROSOFT AZURE
            </strong>
          </div>

          <span>
            PROFILE / ACTIVE DEVELOPMENT
          </span>
        </div>

        <div className="cert-khud-body">
          <article className="cert-khud-card cert-khud-card-earned">
            <div className="cert-khud-index">
              <span>01</span>
              <small>VERIFIED</small>
            </div>

            <div className="cert-khud-badge-stage">
              <div
                className="cert-khud-badge-orbit"
                aria-hidden="true"
              >
                <span className="cert-badge-orbit cert-badge-orbit-a" />
                <span className="cert-badge-orbit cert-badge-orbit-b" />
                <span className="cert-badge-crosshair cert-badge-crosshair-x" />
                <span className="cert-badge-crosshair cert-badge-crosshair-y" />
              </div>

              <div className="cert-khud-badge-wrap cert-khud-badge-wrap-az900">
                <Image
                  src="/images/certifications/microsoft-certified-azure-fundamentals.png"
                  alt="Microsoft Certified Azure Fundamentals badge"
                  width={180}
                  height={188}
                  className="cert-khud-badge-image"
                  priority={false}
                />
              </div>

              <span className="cert-khud-badge-caption">
                OFFICIAL BADGE / AZ-900
              </span>
            </div>

            <div className="cert-khud-info">
              <div className="cert-khud-info-top">
                <div>
                  <span>
                    MICROSOFT CERTIFIED
                  </span>

                  <h3>
                    Azure Fundamentals
                  </h3>
                </div>

                <b className="cert-khud-state cert-khud-state-earned">
                  ACTIVE
                </b>
              </div>

              <p>
                Validated knowledge across Azure services,
                cloud concepts, security, governance,
                pricing, and cost management.
              </p>

              <div className="cert-khud-signals">
                <span>AZURE FOUNDATION</span>
                <span>CLOUD CONCEPTS</span>
                <span>GOVERNANCE</span>
                <span>SECURITY</span>
              </div>

              <div className="cert-khud-actions">
                <div>
                  <small>
                    CREDENTIAL STATUS
                  </small>

                  <strong>
                    MICROSOFT VERIFIED
                  </strong>
                </div>

                <a
                  href={credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  VERIFY CREDENTIAL
                  <span aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </article>

          <article className="cert-khud-card cert-khud-card-progress">
            <div className="cert-khud-index">
              <span>02</span>
              <small>PATHWAY</small>
            </div>

            <div className="cert-khud-badge-stage cert-khud-badge-stage-progress">
              <div
                className="cert-khud-badge-orbit"
                aria-hidden="true"
              >
                <span className="cert-badge-orbit cert-badge-orbit-a" />
                <span className="cert-badge-orbit cert-badge-orbit-b" />
                <span className="cert-badge-crosshair cert-badge-crosshair-x" />
                <span className="cert-badge-crosshair cert-badge-crosshair-y" />
              </div>

              <div className="cert-khud-badge-wrap cert-khud-badge-wrap-az104">
                <Image
                  src="/images/certifications/microsoft-certified-azure-administrator-associate.png"
                  alt="Microsoft Certified Azure Administrator Associate badge"
                  width={352}
                  height={378}
                  className="cert-khud-badge-image"
                  priority={false}
                />
              </div>

              <span className="cert-khud-badge-caption">
                PATHWAY BADGE / AZ-104
              </span>
            </div>

            <div className="cert-khud-info">
              <div className="cert-khud-info-top">
                <div>
                  <span>
                    CURRENT CERTIFICATION PATHWAY
                  </span>

                  <h3>
                    Azure Administrator Associate
                  </h3>
                </div>

                <b className="cert-khud-state cert-khud-state-progress">
                  IN PROGRESS
                </b>
              </div>

              <p>
                Developing deeper administration capability
                across identity, governance, compute, storage,
                networking, monitoring, and operational Azure
                management.
              </p>

              <div className="cert-khud-signals">
                <span>IDENTITY</span>
                <span>NETWORKING</span>
                <span>COMPUTE</span>
                <span>MONITORING</span>
              </div>

              <div className="cert-khud-path">
                <div className="cert-khud-path-head">
                  <span>
                    PATH PROGRESS / 58%
                  </span>

                  <strong>
                    TARGET / Q3 2026
                  </strong>
                </div>

                <div className="cert-khud-track">
                  <span />
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="cert-khud-footer">
          <span>
            LEARNING MODEL / CERTIFICATION +
            PRODUCTION-MINDED CLOUD BUILDS
          </span>

          <strong>
            AZURE PLATFORM ENGINEERING
          </strong>
        </div>
      </div>
    </SectionShell>
  );
}
