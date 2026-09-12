import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { portfolioProjects } from "@/data/projects";

import { SecureCloudProject } from "@/components/projects/securecloud/SecureCloudProject";
import { CloudPolicyProject } from "@/components/projects/cloudpolicy/CloudPolicyProject";
import { OnboardingProject } from "@/components/projects/onboarding/OnboardingProject";
import { IntegrationProject } from "@/components/projects/integration/IntegrationProject";
import { WeatherProject } from "@/components/projects/weather/WeatherProject";

const projectMetadata: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  "azure-onboarding-automator": {
    title: "Azure Onboarding Automator | Cloud Automation — Obed Owusu",
    description:
      "Azure onboarding automation platform using Logic Apps, Microsoft Entra ID, RBAC, Microsoft 365 and monitoring to deliver repeatable user provisioning and access workflows.",
  },

  "securecloud-hub": {
    title: "SecureShare Hub | Azure Zero-Trust File Platform — Obed Owusu",
    description:
      "Azure zero-trust file distribution platform using Entra ID, Blob Storage, Functions, Event Grid, Managed Identity, Terraform and GitHub Actions.",
  },

  "cloud-policy-compliance-dashboard": {
    title: "Azure Policy Compliance Dashboard | Governance — Obed Owusu",
    description:
      "Azure governance platform using Azure Policy, Bicep, Azure Resource Graph, Workbooks, Log Analytics, Azure Monitor and managed identity remediation.",
  },

  "weather-tracker": {
    title: "Weather Tracker | Azure Container Apps Platform — Obed Owusu",
    description:
      "Containerized FastAPI weather application deployed with Azure Container Apps, Azure Container Registry, Key Vault, Azure Monitor and GitHub Actions.",
  },

  "azure-enterprise-integration-platform": {
    title: "Azure Integration Platform | APIM & Service Bus — Obed Owusu",
    description:
      "Azure enterprise integration platform using API Management, Logic Apps, Service Bus, Dataverse and Azure Monitor for secure, decoupled application workflows.",
  },
};

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const metadata = projectMetadata[slug];

  if (!metadata) {
    return {
      title: "Cloud Engineering Project — Obed Owusu",
      description:
        "Azure cloud platform engineering project by Obed Owusu.",
    };
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
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