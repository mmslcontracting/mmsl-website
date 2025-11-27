import type { APIRoute } from 'astro'

const getRobotsTxt = (sitemapURL: URL) => `\
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}

Disallow: /api/
Disallow: /_astro/
Disallow: /admin/
Disallow: /*.json$
`

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site)
  return new Response(getRobotsTxt(sitemapURL))
}
