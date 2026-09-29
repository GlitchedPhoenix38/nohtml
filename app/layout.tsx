import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: "GlitchedPhoenix | Computer Science Engineering Portfolio",
  description:
    "Premium portfolio for GlitchedPhoenix, a Computer Science Engineering student focused on full-stack engineering, AI systems, and product-minded software.",
  keywords: [
    "GlitchedPhoenix",
    "Computer Science Engineering",
    "Portfolio",
    "Full Stack Developer",
    "AI ML",
    "Next.js",
    "React"
  ],
  authors: [{ name: "GlitchedPhoenix" }],
  creator: "GlitchedPhoenix",
  metadataBase: new URL("https://glitchedphoenix.dev"),
  openGraph: {
    title: "GlitchedPhoenix | Computer Science Engineering Portfolio",
    description:
      "A futuristic personal portfolio showcasing projects, skills, learning journey, and achievements.",
    type: "website",
    locale: "en_US",
    url: "https://glitchedphoenix.dev",
    siteName: "GlitchedPhoenix Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "GlitchedPhoenix | Computer Science Engineering Portfolio",
    description:
      "Computer Science Engineering student building elegant software and AI-powered experiences."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} bg-ink font-sans text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
