import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../data/site';
import { getPublishedPosts } from '../lib/blog';

export async function GET(context: APIContext) {
  if (!context.site) throw new Error('`site` must be set in astro.config.mjs for the RSS feed.');
  const posts = await getPublishedPosts();
  return rss({
    title: `${site.name}, blog`,
    description: 'Notes on backend, mobile and template work by Ahmed Rajab.',
    site: context.site,
    customData: '<language>en-us</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
  });
}
