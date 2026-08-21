import { FileDown } from "lucide-react";
import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { VideoDemo } from "@/components/video-demo";
import { projects } from "@/content/projects";
import { publications } from "@/content/publications";

const project = projects[0];
const publication = publications[0];

export const metadata: Metadata = {
  title: "FMA-CBF Project",
  description:
    "Feasibility-margin-based control barrier functions under input constraints.",
};

export default function FmaCbfProjectPage() {
  return (
    <PageShell>
      <article className="projectDetail">
        <header className="projectHero">
          <p className="eyebrow">Research project · {publication.status}</p>
          <h1>{publication.title}</h1>
          <p className="projectAuthors">
            {publication.authors.map((author, index) => (
              <span key={author}>
                {index > 0 ? ", " : null}
                {author === "Shuo Xu" ? <strong>{author}</strong> : author}
              </span>
            ))}
          </p>
          <a className="primaryAction" download href={publication.paperHref}>
            <FileDown aria-hidden="true" size={17} />
            Download paper
          </a>
        </header>

        <section className="projectSection">
          <h2>Abstract</h2>
          <p>{publication.abstract}</p>
          <ul aria-label="Keywords" className="keywordList">
            {publication.keywords.map((keyword) => (
              <li key={keyword}>{keyword}</li>
            ))}
          </ul>
        </section>

        <section className="projectSection">
          <div className="projectSectionHeading">
            <p className="eyebrow">Simulation results</p>
            <h2>Demonstrations</h2>
          </div>
          <div className="videoGrid">
            {project.videos.map((video) => (
              <VideoDemo key={video.src} video={video} />
            ))}
          </div>
        </section>
      </article>
    </PageShell>
  );
}
