type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
};

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <header className="sectionHeading">
      {eyebrow ? <p>{eyebrow}</p> : null}
      <h2>{title}</h2>
    </header>
  );
}
