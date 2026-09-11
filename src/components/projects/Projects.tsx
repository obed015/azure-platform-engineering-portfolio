import { portfolioProjects } from "@/data/projects";
import { SectionShell } from "@/components/ui/SectionShell";

function ProjectTopology({ slug }: { slug: string }) {
  if (slug === "azure-onboarding-automator") {
    return (
      <div
        className="project-index-topology project-index-topology-onboarding"
        aria-hidden="true"
      >
        <div className="project-index-node project-index-node-a">
          <span>REQUEST</span>
        </div>
        <i className="project-index-link project-index-link-a" />
        <div className="project-index-node project-index-node-core">
          <span>LOGIC</span>
        </div>
        <i className="project-index-link project-index-link-b" />
        <div className="project-index-node project-index-node-b">
          <span>ENTRA</span>
        </div>
        <div className="project-index-node project-index-node-c">
          <span>RBAC</span>
        </div>
      </div>
    );
  }

  if (slug === "securecloud-hub") {
    return (
      <div
        className="project-index-topology project-index-topology-securecloud"
        aria-hidden="true"
      >
        <div className="project-index-node project-index-node-a">
          <span>AUTH</span>
        </div>
        <i className="project-index-link project-index-link-a" />
        <div className="project-index-node project-index-node-b">
          <span>RAW</span>
        </div>
        <i className="project-index-link project-index-link-b" />
        <div className="project-index-node project-index-node-core">
          <span>SCAN</span>
        </div>
        <i className="project-index-link project-index-link-c" />
        <div className="project-index-node project-index-node-c">
          <span>SAFE</span>
        </div>
        <div className="project-index-node project-index-node-alert">
          <span>Q</span>
        </div>
      </div>
    );
  }

  if (slug === "cloud-policy-compliance-dashboard") {
    return (
      <div
        className="project-index-topology project-index-topology-policy"
        aria-hidden="true"
      >
        <div className="project-index-node project-index-node-core">
          <span>POLICY</span>
        </div>
        <div className="project-index-node project-index-node-a">
          <span>MG</span>
        </div>
        <div className="project-index-node project-index-node-b">
          <span>LOGS</span>
        </div>
        <div className="project-index-node project-index-node-c">
          <span>FIX</span>
        </div>
        <i className="project-index-policy-ring project-index-policy-ring-a" />
        <i className="project-index-policy-ring project-index-policy-ring-b" />
      </div>
    );
  }

  if (slug === "weather-tracker") {
    return (
      <div
        className="project-index-topology project-index-topology-weather"
        aria-hidden="true"
      >
        <div className="project-index-node project-index-node-a">
          <span>GIT</span>
        </div>
        <i className="project-index-link project-index-link-a" />
        <div className="project-index-node project-index-node-b">
          <span>ACR</span>
        </div>
        <i className="project-index-link project-index-link-b" />
        <div className="project-index-node project-index-node-core">
          <span>ACA</span>
        </div>
        <i className="project-index-link project-index-link-c" />
        <div className="project-index-node project-index-node-c">
          <span>MON</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="project-index-topology project-index-topology-integration"
      aria-hidden="true"
    >
      <div className="project-index-node project-index-node-a">
        <span>APIM</span>
      </div>
      <i className="project-index-link project-index-link-a" />
      <div className="project-index-node project-index-node-b">
        <span>LOGIC</span>
      </div>
      <i className="project-index-link project-index-link-b" />
      <div className="project-index-node project-index-node-core">
        <span>BUS</span>
      </div>
      <i className="project-index-link project-index-link-c" />
      <div className="project-index-node project-index-node-c">
        <span>CONSUMER</span>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <SectionShell
      id="projects"
      number="04"
      label="PROJECTS / SYSTEMS"
      title={
        <>
          SELECTED CLOUD
          <br />
          SYSTEMS.
        </>
      }
    >
      <div className="projects-index-intro">
        <p className="projects-header-note">
          Five hands-on systems spanning identity,
          zero-trust file handling, governance,
          container platforms and Azure integration
          operations.
        </p>

        <div className="projects-index-status" aria-label="Project portfolio status">
          <span className="projects-index-status-dot" />
          <span>05 SYSTEMS</span>
          <span>AZURE / AUTOMATION / OPERATIONS</span>
        </div>
      </div>

      <div className="project-case-grid project-index-grid">
        {portfolioProjects.map((project) => (
          <a
            key={project.slug}
            href={`/projects/${project.slug}`}
            className={`project-case-card project-index-card project-index-card-${project.slug}`}
          >
            <div className="project-index-rail" aria-hidden="true">
              <span>{project.number}</span>
              <i />
            </div>

            <div className="project-index-main">
              <div className="project-case-top project-index-top">
                <span className="project-case-category">
                  {project.category}
                </span>

                <span className="project-index-state">
                  SYSTEM / READY
                </span>
              </div>

              <div className="project-index-content">
                <div className="project-index-copy">
                  <h3>{project.title}</h3>

                  <p className="project-case-summary">
                    {project.summary}
                  </p>
                </div>

                <div className="project-index-visual">
                  <div className="project-index-visual-head">
                    <span>ARCHITECTURE SIGNAL</span>
                    <span>{project.number} / 05</span>
                  </div>

                  <ProjectTopology slug={project.slug} />

                  <div className="project-index-visual-foot">
                    <span>TOPOLOGY / ACTIVE</span>
                    <i />
                  </div>
                </div>
              </div>

              <div className="project-case-bottom project-index-bottom">
                <div className="project-case-stack">
                  {project.stack.slice(0, 5).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <span className="project-case-open">
                  OPEN CASE STUDY
                  <b aria-hidden="true">↗</b>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </SectionShell>
  );
}
