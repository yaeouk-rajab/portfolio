/**
 * Single place for site-wide configuration.
 *
 * Social entries with `enabled: false` are rendered nowhere (page, footer,
 * JSON-LD) until a real URL is filled in and `enabled` is set to true.
 */

export interface SocialLink {
  label: string;
  url: string;
  /** false = hidden everywhere until a real URL is set */
  enabled: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export const site = {
  name: 'Ahmed Rajab',
  role: 'Developer',
  /** Short and honest: derived from what the project records actually say. */
  tagline:
    'I build backends, web apps and mobile clients, and I write down what has and has not been verified.',
  description:
    'Portfolio of Ahmed Rajab, a developer: multi-tenant APIs, web and mobile clients, and reusable starter templates, each with its verification status stated.',
  // The public origin lives in astro.config.mjs (`site`, overridable via SITE_URL).
  email: 'info@ahmed-rajab-developer.com',
  githubUser: 'yaeouk-rajab',
  phone: '+963 962 296 144',
  phoneHref: 'tel:+963962296144',
  /** Secondary public email (the primary one above is used by the mailto helper). */
  emailSecondary: 'ahmad.rajab@windowslive.com',
  ogImage: '/og.png' as string | undefined,

  nav: [
    { label: 'Projects', href: '/projects' },
    { label: 'Templates', href: '/templates' },
    { label: 'Blog', href: '/blog' },
    { label: 'Resume', href: '/resume' },
    { label: 'Contact', href: '/contact' },
  ] satisfies NavItem[],

  social: [
    { label: 'GitHub', url: 'https://github.com/yaeouk-rajab', enabled: true },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ahmed-rajab-109272133/', enabled: true },
    {
      label: 'Facebook',
      url: 'https://www.facebook.com/people/Ahmed-Rajab-Developer/100063922400099/',
      enabled: true,
    },
    { label: 'Instagram', url: 'https://www.instagram.com/ahmed_rajab_developer/', enabled: true },
    { label: 'Telegram', url: 'https://t.me/ahmedrajabdeveloper', enabled: true },
    { label: 'WhatsApp', url: 'https://wa.me/963962296144', enabled: true },
    { label: 'dev.to', url: 'https://dev.to/yaeouk', enabled: true },
    // Hidden until a URL is filled in and enabled is set to true.
    { label: 'X', url: '', enabled: false },
  ] satisfies SocialLink[],

  summary:
    'Software developer working with JavaScript, PHP, HTML, CSS and Dart, and with Flutter, React JS and Laravel. Currently learning web application security: defense-in-depth and secure coding. Strengths: rapid learning, problem solving and maintainable code.',
  education: [
    { title: 'IT student', place: 'Syrian Virtual University', period: 'Starting 2026' },
  ],
  experience: [
    {
      title: 'Flutter Developer',
      place: 'Teqnya',
      period: 'April 2021 – February 2023',
      points: [
        'Took part in developing 3 cross-platform Flutter apps.',
        'Built RESTful APIs with Laravel in 5 projects.',
        'Worked in Agile teams (sprint planning, stand-ups) in 5 projects.',
        'Troubleshot mobile and backend issues in 5 projects.',
      ],
    },
  ],
  shippedWork: [
    {
      name: 'Perfect',
      kind: 'Flutter educational app',
      text: 'MCQs, eBooks, voice notes, videos and flashcards. 1000+ users.',
      url: 'https://play.google.com/store/apps/details?id=edu.perfect' as string | undefined,
      linkLabel: 'Google Play',
    },
  ],
  skills: [
    { label: 'Languages', items: ['JavaScript', 'Dart', 'PHP', 'HTML', 'CSS'] },
    { label: 'Frameworks', items: ['React JS', 'Flutter', 'Laravel'] },
    { label: 'Tools', items: ['Git', 'Codemagic', 'Shorebird', 'Firebase Studio', 'Vibe Coding'] },
    { label: 'Strengths', items: ['Mathematics', 'Problem solving', 'Structured thinking'] },
  ],
  award: {
    title: 'Honorable Mention, International Mathematical Olympiad 2014',
    url: 'https://www.imo-official.org/participant_r.aspx?id=24786',
  },

  /** Slugs (from projects.json) shown in the home page grid, in this order. */
  featuredProjectSlugs: [
    'bookslot',
    'pulsewatch',
    'notifyhub',
    'lexicon',
    'flexcatalog',
    'privacy-forge',
  ],
  /** Slugs (from templates.json) shown in the home page templates teaser. */
  featuredTemplateSlugs: [
    'laravel-api-nuxt-template',
    'fastapi-nextjs-template',
    'flutter-template',
  ],
};
