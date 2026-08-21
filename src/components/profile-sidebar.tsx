import { Github, Mail } from "lucide-react";
import Image from "next/image";
import { site } from "@/content/site";

const emailHref = `mailto:${site.email}`;

export function ProfileSidebar() {
  return (
    <aside aria-label="Profile" className="profileSidebar">
      <div className="portraitFrame">
        <Image
          alt="Shuo Xu"
          className="portrait"
          height={2132}
          priority
          src="/profile/shuo-xu-portrait.jpg"
          width={1706}
        />
      </div>
      <div className="profileCopy">
        <p className="eyebrow">{site.role}</p>
        <h1>{site.name}</h1>
        <p className="affiliation">{site.affiliation}</p>
        <p className="advisor">
          Advisor:{" "}
          <a href={site.advisor.href} rel="noreferrer" target="_blank">
            {site.advisor.name}
          </a>
        </p>
      </div>
      <ul aria-label="Research interests" className="interestList">
        {site.researchInterests.map((interest) => (
          <li key={interest}>{interest}</li>
        ))}
      </ul>
      <div className="contactLinks">
        <a aria-label={`Email ${site.name}`} href={emailHref}>
          <Mail aria-hidden="true" size={17} />
          Email
        </a>
        <a
          aria-label={`${site.name} on GitHub`}
          href={site.github}
          rel="noreferrer"
          target="_blank"
        >
          <Github aria-hidden="true" size={17} />
          GitHub
        </a>
      </div>
    </aside>
  );
}
