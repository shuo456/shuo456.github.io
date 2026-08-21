import { ArrowUpRight, FileText } from "lucide-react";
import Link from "next/link";
import type { Publication } from "@/lib/types";

type PublicationCardProps = {
  publication: Publication;
  expanded?: boolean;
};

export function PublicationCard({
  publication,
  expanded = false,
}: PublicationCardProps) {
  return (
    <article className="publicationCard">
      <div className="publicationMeta">
        <span>{publication.status}</span>
      </div>
      <h3>{publication.title}</h3>
      <p className="authors">
        {publication.authors.map((author, index) => (
          <span key={author}>
            {index > 0 ? ", " : null}
            {author === "Shuo Xu" ? <strong>{author}</strong> : author}
          </span>
        ))}
      </p>
      {expanded ? (
        <>
          <p className="publicationAbstract">{publication.abstract}</p>
          <ul aria-label="Keywords" className="keywordList">
            {publication.keywords.map((keyword) => (
              <li key={keyword}>{keyword}</li>
            ))}
          </ul>
        </>
      ) : null}
      <div className="publicationActions">
        <a href={publication.paperHref}>
          <FileText aria-hidden="true" size={16} />
          Paper
        </a>
        <Link href={publication.projectHref}>
          <ArrowUpRight aria-hidden="true" size={16} />
          Project
        </Link>
      </div>
    </article>
  );
}
