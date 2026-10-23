import { build, loadEnv } from 'vite';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const environment = loadEnv('production', process.cwd(), 'VITE_');
const siteUrl = environment.VITE_SITE_URL || process.env.VITE_SITE_URL;
if (siteUrl && (!/^https:\/\//.test(siteUrl) || new URL(siteUrl).hostname === 'localhost'))
  throw new Error('VITE_SITE_URL must be the verified public HTTPS origin.');
await build({ build: { ssr: 'src/entry-server.tsx', outDir: 'dist-server', emptyOutDir: true } });
const { render, routes } = await import(
  pathToFileURL(join(process.cwd(), 'dist-server/entry-server.js')).href
);
const template = await readFile('dist/index.html', 'utf8');
const allRoutes = [...routes, ...routes.map((p) => (p === '/' ? '/en' : `/en${p}`))];
for (const route of [...allRoutes, '/404']) {
  const locale = route.startsWith('/en') ? 'en' : 'ar';
  const markup = render(route);
  const metadata = [...markup.matchAll(/<(?:title|meta|link)\b[^>]*(?:>[^<]*<\/title>|\/?>)/g)]
    .map((m) => m[0])
    .join('');
  let html = template
    .replace(/<title>.*?<\/title>/, '')
    .replace(/<meta\s+name="description"[^>]*>/, '')
    .replace('lang="ar" dir="rtl"', `lang="${locale}" dir="${locale === 'ar' ? 'rtl' : 'ltr'}"`)
    .replace('</head>', metadata + '</head>')
    .replace(
      '<div id="root"></div>',
      `<div id="root" data-route="${route}">${markup.replace(/<(?:title|meta|link)\b[^>]*(?:>[^<]*<\/title>|\/?>)/g, '')}</div>`,
    );
  if (siteUrl && route !== '/404')
    html = html.replace('content="noindex,nofollow"', 'content="index,follow"');
  const output = route === '/404' ? 'dist/404.html' : join('dist', route, 'index.html');
  await mkdir(join(output, '..'), { recursive: true });
  await writeFile(output, html);
  if (route !== '/' && route !== '/404') await writeFile(join('dist', `${route}.html`), html);
}
await writeFile(
  'dist/robots.txt',
  siteUrl
    ? `User-agent: *\nAllow: /\nSitemap: ${siteUrl.replace(/\/$/, '')}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n',
);
if (siteUrl)
  await writeFile(
    'dist/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${allRoutes.map((p) => `<url><loc>${siteUrl.replace(/\/$/, '')}${p}</loc></url>`).join('')}</urlset>`,
  );
await rm('dist-server', { recursive: true, force: true });
console.log(
  `Pre-rendered ${allRoutes.length} localized routes and a 404 page. ${siteUrl ? 'Production SEO enabled.' : 'Prototype remains noindex until a verified VITE_SITE_URL is supplied.'}`,
);
