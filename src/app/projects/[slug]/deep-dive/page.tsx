import { notFound } from "next/navigation";

import {
  getProjectDeepDive,
  projectDeepDives,
} from "@/data/projectDeepDives";

import { ProjectDeepDiveView } from "@/components/projects/ProjectDeepDiveView";
import { SecureCloudDeepDive } from "@/components/projects/securecloud/SecureCloudDeepDive";
import { CloudPolicyDeepDive } from "@/components/projects/cloudpolicy/CloudPolicyDeepDive";
import { WeatherDeepDive } from "@/components/projects/weather/WeatherDeepDive";

export function generateStaticParams() {
  return projectDeepDives.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDeepDivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === "securecloud-hub") {
    return <SecureCloudDeepDive />;
  }

  if (slug === "cloud-policy-compliance-dashboard") {
    return <CloudPolicyDeepDive />;
  }

  if (slug === "weather-tracker") {
    return <WeatherDeepDive />;
  }

  const project = getProjectDeepDive(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDeepDiveView project={project} />;
}
