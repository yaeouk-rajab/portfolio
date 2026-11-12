import { getCollection } from 'astro:content';

/** Published (non-draft) posts, newest first. Used by the index, post pages and RSS. */
export async function getPublishedPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Calendar date in UTC, so the displayed day does not shift with the viewer's timezone. */
export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
