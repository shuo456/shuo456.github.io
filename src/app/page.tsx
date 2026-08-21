import { NewsList } from "@/components/news-list";
import { PageShell } from "@/components/page-shell";
import { PublicationCard } from "@/components/publication-card";
import { SectionHeading } from "@/components/section-heading";
import { news } from "@/content/news";
import { publications } from "@/content/publications";

export default function HomePage() {
  return (
    <PageShell withProfile>
      <section className="contentSection introSection">
        <SectionHeading eyebrow="About" title="Researching safer autonomous systems." />
        <p className="introText">
          I am a Ph.D. student at Peking University. My research interests
          include robotics, safety-critical control, and multi-agent systems.
        </p>
      </section>

      <section className="contentSection">
        <SectionHeading eyebrow="Research" title="Selected publication" />
        <PublicationCard publication={publications[0]} />
      </section>

      <section className="contentSection">
        <SectionHeading eyebrow="Updates" title="News" />
        <NewsList items={news} />
      </section>
    </PageShell>
  );
}
