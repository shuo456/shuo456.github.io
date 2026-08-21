import { Github, Mail } from "lucide-react";
import type { Metadata } from "next";
import { EducationTimeline } from "@/components/education-timeline";
import { PageShell } from "@/components/page-shell";
import { PublicationCard } from "@/components/publication-card";
import { education } from "@/content/education";
import { publications } from "@/content/publications";
import { site } from "@/content/site";

const emailHref = `mailto:${site.email}`;

export const metadata: Metadata = {
  title: "CV",
  description: "Curriculum vitae of Shuo Xu.",
};

export default function CvPage() {
  return (
    <PageShell>
      <header className="pageHeader cvHeader">
        <p className="eyebrow">Curriculum vitae</p>
        <h1>Shuo Xu</h1>
        <p>
          Ph.D. student at Peking University working on robotics,
          safety-critical control, and multi-agent systems.
        </p>
      </header>

      <div className="cvLayout">
        <aside className="cvAside">
          <section>
            <h2>Research interests</h2>
            <ul>
              {site.researchInterests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Contact</h2>
            <div className="cvLinks">
              <a href={emailHref}>
                <Mail aria-hidden="true" size={16} />
                {site.email}
              </a>
              <a href={site.github} rel="noreferrer" target="_blank">
                <Github aria-hidden="true" size={16} />
                github.com/shuo456
              </a>
            </div>
          </section>
        </aside>

        <div className="cvMain">
          <section className="cvSection">
            <h2>Education</h2>
            <EducationTimeline entries={education} />
          </section>
          <section className="cvSection">
            <h2>Publication</h2>
            <PublicationCard publication={publications[0]} />
          </section>
        </div>
      </div>
    </PageShell>
  );
}
