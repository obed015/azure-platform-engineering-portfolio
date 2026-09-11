import { portfolioProjects } from "@/data/projects";
import { SectionShell } from "@/components/ui/SectionShell";

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
      <p className="projects-header-note">
        Five hands-on systems spanning identity,
        zero-trust file handling, governance,
        container platforms and Azure integration
        operations.
      </p>

      <div className="project-case-grid">
        {portfolioProjects.map((project) => (
          <a
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="project-case-card"
          >
            <div className="project-case-top">
              <span className="project-case-number">
                {project.number}
              </span>

              <span className="project-case-category">
                {project.category}
              </span>
            </div>

            <div>
              <h3>{project.title}</h3>

              <p className="project-case-summary">
                {project.summary}
              </p>
            </div>

            <div className="project-case-bottom">
              <div className="project-case-stack">
                {project.stack.slice(0, 5).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <span className="project-case-open">
                OPEN CASE STUDY
              </span>
            </div>
          </a>
        ))}
      </div>
    </SectionShell>
  );
}
