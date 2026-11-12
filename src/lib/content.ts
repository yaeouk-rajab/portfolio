import projectsJson from '../data/projects.json';
import templatesJson from '../data/templates.json';
import { site } from '../data/site';

export interface ArchitectureNode {
  label: string;
  description: string;
  connectsTo: string[];
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  problem: string;
  highlights: string[];
  stack: string[];
  category: 'web' | 'mobile' | 'backend' | 'library';
  related: string[];
  repoUrl: string;
  architecture: ArchitectureNode[];
  status: string;
}

export interface Template {
  slug: string;
  name: string;
  description: string;
  stack: string[];
  platform: 'web' | 'mobile' | 'backend' | 'library';
  repoUrl: string;
  notableFeatures: string[];
}

export const projects = projectsJson as Project[];
export const templates = templatesJson as Template[];

function pick<T extends { slug: string }>(items: T[], slugs: string[], kind: string): T[] {
  return slugs.map((slug) => {
    const found = items.find((item) => item.slug === slug);
    // Fail the build loudly instead of silently dropping a featured item.
    if (!found) throw new Error(`site.ts lists unknown ${kind} slug "${slug}"`);
    return found;
  });
}

export const featuredProjects = pick(projects, site.featuredProjectSlugs, 'project');
export const featuredTemplates = pick(templates, site.featuredTemplateSlugs, 'template');

/** Technologies ranked by how many projects/templates list them. */
export function topTechnologies(limit: number): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const item of [...projects, ...templates]) {
    for (const tech of new Set(item.stack)) counts.set(tech, (counts.get(tech) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, limit);
}

export type Category = Project['category'];

/** Technologies used by projects and templates in one category, most used first. */
export function techForCategory(category: Category): string[] {
  const counts = new Map<string, number>();
  const items: { stack: string[] }[] = [
    ...projects.filter((p) => p.category === category),
    ...templates.filter((t) => t.platform === category),
  ];
  for (const item of items) {
    for (const tech of new Set(item.stack)) counts.set(tech, (counts.get(tech) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name]) => name);
}
