export type ProjectStatus =
  | "active"
  | "built"
  | "in-progress"
  | "planned";

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: number;
  description: string;
  technologies: string[];
  status: ProjectStatus;
  githubUrl?: string;
  caseStudyUrl?: string;
}

export interface Technology {
  id: string;
  name: string;
  category: string;
  description?: string;
}

export interface Capability {
  id: string;
  number: string;
  title: string;
  topics: string[];
}