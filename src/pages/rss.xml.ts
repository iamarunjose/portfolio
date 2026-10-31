import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { PROFILE } from '../data/portfolio';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ? site.toString().replace(/\/$/, '') : 'https://arun-jose.github.io';
  const posts = (await getCollection('writing')).sort(
    (a, b) => a.data.order - b.data.order
  );

  // Note: Unpublished draft articles deliberately omit <pubDate> per editorial policy.
  const itemsXml = posts
    .map((post) => {
      const url = `${baseUrl}/writing/${post.id}`;
      return `    <item>
      <title>${escapeXml(`[DRAFT] ${post.data.title}`)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(post.data.summary)}</description>
      <category>${escapeXml(post.data.category)}</category>
    </item>`;
    })
    .join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${PROFILE.name} — Technical Writing & Research Notebook`)}</title>
    <description>${escapeXml(PROFILE.shortBio)}</description>
    <link>${escapeXml(baseUrl)}</link>
    <atom:link href="${escapeXml(`${baseUrl}/rss.xml`)}" rel="self" type="application/rss+xml" />
    <language>en-us</language>
${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};

