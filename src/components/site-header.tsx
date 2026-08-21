import Link from "next/link";
import { site } from "@/content/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="siteHeader">
      <div className="headerInner">
        <Link className="wordmark" href="/">
          SX
        </Link>
        <nav aria-label="Primary navigation" className="mainNav">
          {site.navigation.map((item) =>
            "children" in item ? (
              <details className="moreMenu" key={item.label}>
                <summary>{item.label}</summary>
                <div className="moreMenuPanel">
                  {item.children.map((child) => (
                    <Link href={child.href} key={child.href}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
