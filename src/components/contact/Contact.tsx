import { SectionShell } from "@/components/ui/SectionShell";

const email = "owusuobed15@yahoo.com";

export function Contact() {
  return (
    <SectionShell
      id="contact"
      number="06"
      label="CONTACT"
      title={
        <span className="contact-section-title">
          <span className="contact-title-line contact-title-line-muted">
            LET&apos;S BUILD
          </span>
          <span className="contact-title-line contact-title-line-accent">
            SOMETHING RELIABLE.
          </span>
        </span>
      }
    >
      <div className="contact-terminal">
        <div className="contact-terminal-grid" aria-hidden="true" />
        <div className="contact-terminal-scan" aria-hidden="true" />

        <div className="contact-portal" aria-hidden="true">
          <span className="contact-portal-orbit contact-portal-orbit-1" />
          <span className="contact-portal-orbit contact-portal-orbit-2" />
          <span className="contact-portal-orbit contact-portal-orbit-3" />
          <span className="contact-portal-line contact-portal-line-left" />
          <span className="contact-portal-line contact-portal-line-right" />

          <div className="contact-portal-core">
            <span>AZURE</span>
            <strong>OPEN</strong>
            <small>CHANNEL</small>
          </div>
        </div>

        <div className="contact-terminal-content">
          <div className="contact-terminal-kicker">
            <span className="contact-live-dot" />
            AVAILABLE FOR PLATFORM / CLOUD ENGINEERING CONVERSATIONS
          </div>

          <div className="contact-terminal-heading">
            <span>BUILD.</span>
            <span>OPERATE.</span>
            <span>AUTOMATE.</span>
          </div>

          <p className="contact-terminal-copy">
            If you&apos;re building an Azure platform, improving cloud
            operations, modernising identity, or solving integration problems,
            I&apos;d be happy to connect.
          </p>

          <a className="contact-primary-link" href={`mailto:${email}`}>
            <span className="contact-primary-link-label">
              <small>PRIMARY CHANNEL</small>
              <strong>EMAIL ME DIRECTLY</strong>
            </span>

            <span className="contact-primary-link-action">
              OPEN MAIL
              <i aria-hidden="true">↗</i>
            </span>
          </a>

          <div className="contact-network-row">
            <a
              href="https://github.com/obed015"
              target="_blank"
              rel="noreferrer"
            >
              <span>01</span>
              <strong>GITHUB</strong>
              <small>VIEW ENGINEERING WORK ↗</small>
            </a>

            <a
              href="https://www.linkedin.com/in/obed-owusu15/"
              target="_blank"
              rel="noreferrer"
            >
              <span>02</span>
              <strong>LINKEDIN</strong>
              <small>CONNECT PROFESSIONALLY ↗</small>
            </a>
          </div>

          <div className="contact-status-bar">
            <span>
              <i />
              STATUS / AVAILABLE
            </span>
            <span>LOCATION / UNITED KINGDOM</span>
            <span>FOCUS / AZURE PLATFORM ENGINEERING</span>
          </div>
        </div>

        <div className="contact-edge-copy contact-edge-copy-left">
          <span>SECURE</span>
          <span>SCALABLE</span>
          <span>OPERABLE</span>
        </div>

        <div className="contact-edge-copy contact-edge-copy-right">
          <span>IDENTITY</span>
          <span>AUTOMATION</span>
          <span>OBSERVABILITY</span>
        </div>
      </div>
    </SectionShell>
  );
}
