import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Obed Owusu | Cloud Platform Engineer",
    template: "%s | Obed Owusu",
  },

  description:
    "Cloud Platform Engineer focused on Microsoft Azure, platform engineering, identity, security, automation and modern endpoint management.",

  keywords: [
    "Obed Owusu",
    "Cloud Platform Engineer",
    "Azure Engineer",
    "Microsoft Azure",
    "Azure Platform Engineering",
    "Microsoft Entra ID",
    "Microsoft Intune",
    "Terraform",
    "PowerShell",
    "Cloud Security",
  ],

  authors: [
    {
      name: "Obed Owusu",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}