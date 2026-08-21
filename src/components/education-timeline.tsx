import type { EducationEntry } from "@/lib/types";

export function EducationTimeline({
  entries,
}: {
  entries: readonly EducationEntry[];
}) {
  const sortedEntries = [...entries].sort(
    (a, b) => Number.parseInt(b.period, 10) - Number.parseInt(a.period, 10),
  );

  return (
    <ol className="educationTimeline">
      {sortedEntries.map((entry) => (
        <li key={`${entry.period}-${entry.school}`}>
          <time data-testid="education-period">{entry.period}</time>
          <div>
            <h3>
              {entry.role}
              {entry.field ? ` in ${entry.field}` : ""}
            </h3>
            <p>{entry.school}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
