import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/data";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const description =
  "Junaid Khan — Senior Software Engineer specialising in Java, Kotlin, Python, microservices, cloud (AWS/Azure) and DevSecOps. Enterprise systems, open-source and AI-driven solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Junaid Khan | Senior Software Engineer", template: "%s | Junaid Khan" },
  description,
  keywords: ["Junaid Khan", "Senior Software Engineer", "Java", "Kotlin", "Python", "Microservices", "Spring Boot", "Kafka", "Kubernetes", "DevSecOps"],
  authors: [{ name: site.name, url: site.links.github }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: "Junaid Khan | Senior Software Engineer",
    description,
    siteName: "Junaid Khan",
    images: [{ url: "/assets/img/about2.png", width: 1536, height: 1024, alt: "Junaid Khan portfolio" }],
  },
  twitter: { card: "summary_large_image", title: "Junaid Khan | Senior Software Engineer", description, images: ["/assets/img/about2.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07080d" },
    { media: "(prefers-color-scheme: light)", color: "#f6f7fb" },
  ],
};

// Runs before paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}else if(window.matchMedia('(prefers-color-scheme: light)').matches){document.documentElement.dataset.theme='light';}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
