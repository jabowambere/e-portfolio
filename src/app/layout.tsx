import type { Metadata, Viewport } from "next";
import ShaderBackground from "@/components/ShaderBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Portfolio | Software Engineer & Cybersecurity Specialist",
    template: "%s | Portfolio",
  },
  description:
    "Software engineer and cybersecurity specialist building secure, scalable solutions. Full-stack development, cloud infrastructure, and security architecture.",
  keywords: [
    "software engineer",
    "cybersecurity",
    "full-stack developer",
    "security architect",
    "penetration testing",
    "DevSecOps",
  ],
  authors: [{ name: "Your Name" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Portfolio",
    title: "Portfolio | Software Engineer & Cybersecurity Specialist",
    description:
      "Software engineer and cybersecurity specialist building secure, scalable solutions.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#05050c" },
    { media: "(prefers-color-scheme: dark)", color: "#05050c" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ShaderBackground />
        {children}
      </body>
    </html>
  );
}
