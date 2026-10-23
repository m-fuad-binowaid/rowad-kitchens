import { useLocation } from 'react-router-dom';
import { meta } from '../content/site';
import { useLocale } from '../localization/Locale';
export function Metadata() {
  const { pathname } = useLocation();
  const { locale, pick, t } = useLocale();
  const path = pathname.replace(/^\/en(?=\/|$)/, '').replace(/\/$/, '') || '/';
  const data = meta[path];
  const title = data
    ? pick(data.title)
    : t('الصفحة غير موجودة | رواد المطابخ', 'Page not found | ROWAD Kitchens');
  const description = data
    ? pick(data.description)
    : t('العودة إلى موقع رواد المطابخ.', 'Return to ROWAD Kitchens.');
  const origin = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '');
  const pagePath = pathname.replace(/\/$/, '') || '/';
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale === 'ar' ? 'ar_SA' : 'en_US'} />
      {origin && data && (
        <>
          <link rel="canonical" href={`${origin}${pagePath}`} />
          <link rel="alternate" hrefLang="ar" href={`${origin}${path}`} />
          <link
            rel="alternate"
            hrefLang="en"
            href={`${origin}${path === '/' ? '/en' : `/en${path}`}`}
          />
          <link rel="alternate" hrefLang="x-default" href={`${origin}${path}`} />
          <meta property="og:url" content={`${origin}${pagePath}`} />
          <meta property="og:image" content={`${origin}/images/kitchen-04.webp`} />
        </>
      )}
    </>
  );
}
