import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PublicationCard } from "@/components/publication-card";
import { publications } from "@/content/publications";

export const metadata: Metadata = {
  title: "Publications",
  description: "Publications by Shuo Xu.",
};

export default function PublicationsPage() {
  return (
    <PageShell>
      <header className="pageHeader">
        <p className="eyebrow">Research</p>
        <h1>Publications</h1>
        <p>Research on safety-critical control and autonomous systems.</p>
      </header>
      <div className="publicationList">
        {publications.map((publication) => (
          <PublicationCard
            expanded
            key={publication.slug}
            publication={publication}
          />
        ))}
      </div>
    </PageShell>
  );
}
