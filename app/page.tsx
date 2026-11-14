import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { GitHubSection, GitHubSkeleton } from "@/components/GitHubSection";
import { Certifications } from "@/components/Certifications";
import { Education, Achievements } from "@/components/Highlights";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { Stats } from "@/components/Stats";
import { Spotlight } from "@/components/Spotlight";
import { site, skills, experience, certifications } from "@/lib/data";

export default function Home() {
  const years = new Date().getFullYear() - site.careerStart;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    url: site.url,
    email: `mailto:${site.email}`,
    sameAs: [site.links.github, site.links.linkedin, site.links.linktree],
  };

  return (
    <>
      <div className="ambient" aria-hidden="true" />
      <ScrollProgress />
      <Spotlight />
      <Navbar />
      <main>
        <Hero years={years} githubHandle={site.githubUser} />
        <Marquee />
        <Stats
          stats={[
            { label: "Years in software", value: years, suffix: "+" },
            { label: "Roles held", value: experience.length },
            { label: "Technologies", value: skills.reduce((n, g) => n + g.items.length, 0), suffix: "+" },
            { label: "Certificates", value: certifications.length },
          ]}
        />
        <About years={years} />
        <Skills />
        <Experience />
        <Projects />
        <Suspense fallback={<GitHubSkeleton />}>
          <GitHubSection />
        </Suspense>
        <Certifications />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
