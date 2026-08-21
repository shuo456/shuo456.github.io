import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Research projects by Shuo Xu.",
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <header className="pageHeader">
        <p className="eyebrow">Research</p>
        <h1>Projects</h1>
        <p>Selected work in safety-critical control and robotics.</p>
      </header>
      <div className="projectGrid">
        {projects.map((project) => (
          <article className="projectCard" key={project.slug}>
            <p className="projectIndex">01</p>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
            <Link href={project.href}>
              View project
              <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
