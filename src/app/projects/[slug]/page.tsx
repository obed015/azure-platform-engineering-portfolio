import { notFound } from "next/navigation";

import { portfolioProjects } from "@/data/projects";

import { SecureCloudProject } from "@/components/projects/securecloud/SecureCloudProject";
import { CloudPolicyProject } from "@/components/projects/cloudpolicy/CloudPolicyProject";
import { OnboardingProject } from "@/components/projects/onboarding/OnboardingProject";
import { IntegrationProject } from "@/components/projects/integration/IntegrationProject";
import { WeatherProject } from "@/components/projects/weather/WeatherProject";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === "securecloud-hub") {
    return <SecureCloudProject />;
  }

  if (slug === "cloud-policy-compliance-dashboard") {
    return <CloudPolicyProject />;
  }

  if (slug === "azure-onboarding-automator") {
    return <OnboardingProject />;
  }

  if (slug === "azure-enterprise-integration-platform") {
    return <IntegrationProject />;
  }

  if (slug === "weather-tracker") {
    return <WeatherProject />;
  }

  notFound();
}
