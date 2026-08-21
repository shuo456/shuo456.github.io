import type { NewsItem } from "@/lib/types";

export function NewsList({ items }: { items: readonly NewsItem[] }) {
  const sortedItems = [...items].sort((a, b) => b.year - a.year);

  return (
    <ol className="newsList">
      {sortedItems.map((item) => (
        <li key={`${item.year}-${item.text}`}>
          <time data-testid="news-year">{item.year}</time>
          <p>{item.text}</p>
        </li>
      ))}
    </ol>
  );
}
