export type PanelId = "astrosis" | "projects" | "roadmap" | "contact" | "identity";

export interface TileConfig {
  id: PanelId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  backgroundColor: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  className?: string;
}

export interface Project {
  name: string;
  tech: string[];
  description: string;
  github: string;
}

export interface Roadmap {
  n: string;
  when: string;
  title: string;
  body: string;
  tags: string[];
}

export interface Links {
  github: string;
  linkedin: string;
  email: string;
  codeforces: string;
  resume: string;
}
