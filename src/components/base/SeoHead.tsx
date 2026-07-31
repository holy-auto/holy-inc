import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_SITE_URL || 'https://holy-inc.jp';
const DEFAULT_OG_IMAGE =
  'https://readdy.ai/api/search-image?query=Premium%20Japanese%20automotive%20corporate%20brand%20visual%20with%20abstract%20minimalist%20dark%20background%20cool%20teal%20blue%20light%20rays%20and%20geometric%20patterns%20professional%20corporate%20identity%20design%20landscape%20format%20high%20quality%20editorial%20style%20elegant%20subtle%20glow&width=1200&height=630&seq=og-default-002&orientation=landscape';

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
  const pageOgImage = ogImage || DEFAULT_OG_IMAGE;

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