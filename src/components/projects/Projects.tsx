import { projects } from "@/data/projects";
import { SectionShell } from "@/components/ui/SectionShell";

export function Projects() {
  return (
    <SectionShell
      id="projects"
      number="02"
      label="SELECTED WORK"
      title={
        <>
          SYSTEMS I&apos;VE
          <br />
          BUILT &amp; EXPLORED.
        </>
      }
    >
      <div className="project-preview-list">
        {projects.map((project) => (
          <article
            key={project.id}
            className="project-preview"
          >
            <div className="project-preview-number">
              {project.number}
            </div>

            <div className="project-preview-main">
              <p className="project-preview-category">
                {project.category} / {project.year}
              </p>

              <h3>{project.title}</h3>

              <p className="project-preview-description">
                {project.description}
              </p>

              <div className="project-preview-tech">
                {project.technologies.map((technology) => (
                  <span key={technology}>
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            <div className="project-preview-status">
              {project.status.toUpperCase()}
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}