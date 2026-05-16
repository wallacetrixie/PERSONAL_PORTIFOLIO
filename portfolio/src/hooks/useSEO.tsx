import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOMetaData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterHandle?: string;
  author?: string;
  robots?: string;
  structuredData?: Record<string, unknown>;
}

/**
 * Custom hook to manage SEO meta tags for different pages
 * Uses react-helmet-async for dynamic meta tag injection
 */
export const useSEO = (metaData: SEOMetaData) => {
  const {
    title,
    description,
    keywords = 'Wallace Wambulwa, Full Stack Developer, Portfolio',
    canonical,
    ogImage = 'https://wallacewambulwa-gilt.vercel.app/og-image.jpg',
    ogType = 'website',
    twitterHandle = '@wallacewambulwa',
    author = 'Wallace Wambulwa',
    robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    structuredData,
  } = metaData;

  useEffect(() => {
    // Update page title for accessibility
    document.title = title;
    
    // Update canonical URL if provided
    if (canonical) {
      let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }
  }, [title, canonical]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={canonical || 'https://wallacewambulwa-gilt.vercel.app'} />
      <meta property="og:site_name" content="Wallace Wambulwa Portfolio" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content={twitterHandle} />
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default useSEO;
