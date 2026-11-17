import { getProjectSummaries } from "@/lib/projects";
import { Hero } from "@/components/portfolio/hero";
import { Showcase } from "@/components/portfolio/showcase";
import { AchievementShowcase } from "@/components/portfolio/achievement-showcase";
import { TechStack } from "@/components/portfolio/tech-stack";
import { WritingSection } from "@/components/portfolio/writing-section";
import { Certifications } from "@/components/portfolio/certifications";
import { About } from "@/components/portfolio/about";
import { MainWrapper } from "@/components/portfolio/main-wrapper";

export default function Home() {
  const projects = getProjectSummaries();

  return (
    <MainWrapper>
      <Hero />
      <Showcase projects={projects} />
      <AchievementShowcase />
      <TechStack />
      <WritingSection />
      <Certifications />
      <About />
    </MainWrapper>
  );
}
