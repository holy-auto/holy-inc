import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_SITE_URL || 'https://holy-inc.jp';
const DEFAULT_OG_IMAGE = '/og/og-default.png';

// og:image must be an absolute URL for social crawlers; allow pages to pass a
// site-relative path and resolve it against BASE_URL here.
const toAbsolute = (src: string) =>
  src.startsWith('http') ? src : `${BASE_URL}${src.startsWith('/') ? '' : '/'}${src}`;

interface SeoHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  lastModified?: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

export default function SeoHead({
  title,
  description,
  keywords,
  ogType = 'website',
  ogImage,
  ogUrl,
  canonical,
  lastModified,
  noindex,
  structuredData,
}: SeoHeadProps) {
  const location = useLocation();

  const pageUrl = ogUrl || `${BASE_URL}${location.pathname}`;
  const pageCanonical = canonical || `${BASE_URL}${location.pathname}`;
  const pageOgImage = toAbsolute(ogImage || DEFAULT_OG_IMAGE);

  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, attr = 'name') => {
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    if (lastModified) setMeta('last-modified', lastModified);

    if (noindex) {
      setMeta('robots', 'noindex, nofollow');
    } else {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) robotsMeta.remove();
    }

    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', ogType, 'property');
    setMeta('og:url', pageUrl, 'property');
    setMeta('og:image', pageOgImage, 'property');
    setMeta('og:site_name', '株式会社HOLY', 'property');
    setMeta('og:locale', 'ja_JP', 'property');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', pageOgImage);

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', pageCanonical);

    // Add geo tags for Japan/Tokyo
    let metaGeoPosition = document.querySelector('meta[name="geo.position"]');
    if (!metaGeoPosition) {
      metaGeoPosition = document.createElement('meta');
      metaGeoPosition.setAttribute('name', 'geo.position');
      document.head.appendChild(metaGeoPosition);
    }
    metaGeoPosition.setAttribute('content', '35.6712;139.7640');

    let metaGeoRegion = document.querySelector('meta[name="geo.region"]');
    if (!metaGeoRegion) {
      metaGeoRegion = document.createElement('meta');
      metaGeoRegion.setAttribute('name', 'geo.region');
      document.head.appendChild(metaGeoRegion);
    }
    metaGeoRegion.setAttribute('content', 'JP-13');

    let metaGeoPlacename = document.querySelector('meta[name="geo.placename"]');
    if (!metaGeoPlacename) {
      metaGeoPlacename = document.createElement('meta');
      metaGeoPlacename.setAttribute('name', 'geo.placename');
      document.head.appendChild(metaGeoPlacename);
    }
    metaGeoPlacename.setAttribute('content', '東京都中央区銀座, Japan');
  }, [
    title,
    description,
    keywords,
    ogType,
    pageUrl,
    pageOgImage,
    pageCanonical,
    lastModified,
    noindex,
  ]);

  if (!structuredData) return null;

  const dataArray = Array.isArray(structuredData)
    ? structuredData
    : [structuredData];

  return (
    <>
      {dataArray.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}