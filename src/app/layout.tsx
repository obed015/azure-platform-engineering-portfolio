import type { Metadata } from "next";
import {
  Orbitron,
  Rajdhani,
} from "next/font/google";

import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Obed Owusu | Cloud Platform Engineer",
  description:
    "Cloud Platform Engineer building secure, automated and observable Azure platforms across infrastructure, identity, security and endpoint management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${rajdhani.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
