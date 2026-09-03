import { getProjectSummaries } from "@/lib/projects";
import { Hero } from "@/components/portfolio/hero";
import { Showcase } from "@/components/portfolio/showcase";
import { AchievementShowcase } from "@/components/portfolio/achievement-showcase";
import { About } from "@/components/portfolio/about";
import { TechStack } from "@/components/portfolio/tech-stack";
import { Contact } from "@/components/portfolio/contact";
import { MainWrapper } from "@/components/portfolio/main-wrapper";

export default function Home() {
  const projects = getProjectSummaries();

  return (
    <MainWrapper>
      <Hero />
      <Showcase projects={projects} />
      <AchievementShowcase />
      <About />
      <TechStack />
      <Contact />
    </MainWrapper>
  );
}
