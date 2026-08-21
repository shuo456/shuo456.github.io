export type NavLink = {
  label: string;
  href: string;
};

export type NavItem = NavLink | {
  label: string;
  children: readonly NavLink[];
};

export type Advisor = {
  name: string;
  href: string;
};

export type Publication = {
  slug: string;
  title: string;
  authors: readonly string[];
  status: string;
  abstract: string;
  keywords: readonly string[];
  paperHref: string;
  projectHref: string;
};

export type ProjectVideo = {
  label: string;
  description: string;
  src: string;
  poster: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  href: string;
  videos: readonly ProjectVideo[];
};

export type EducationEntry = {
  period: string;
  role: string;
  field?: string;
  school: string;
};

export type NewsItem = {
  year: number;
  text: string;
};
