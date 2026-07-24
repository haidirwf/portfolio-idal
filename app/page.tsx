import { getProjects } from "@/lib/projects";
import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { Showcase } from "@/components/portfolio/showcase";
import { About } from "@/components/portfolio/about";
import { Experience } from "@/components/portfolio/experience";
import { TechStack } from "@/components/portfolio/tech-stack";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { MainWrapper } from "@/components/portfolio/main-wrapper";



export default function Home() {
  const projects = getProjects();

  return (
    <MainWrapper projects={projects}>
      <Hero />
      <Showcase projects={projects} />
      <About />
      <Experience />
      <TechStack />
      <Contact />
    </MainWrapper>
  );
}
