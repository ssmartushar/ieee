import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  path?: string; // e.g., "/about"
  image?: string; // absolute or root-relative path
}

// Site URL can be provided via Vite env (define VITE_SITE_URL) or left undefined
const SITE_URL: string | undefined = (import.meta as any)?.env?.VITE_SITE_URL as string | undefined;

const SEO: React.FC<SEOProps> = ({ title, description, path = '/', image = '/assets/ieee1.png' }) => {
  const base = typeof SITE_URL === 'string' && SITE_URL.length > 0 ? SITE_URL.replace(/\/$/, '') : undefined;
  const url = base && path ? `${base}${path}` : undefined;
  const imageUrl = image?.startsWith('http') ? image : (base ? `${base}${image}` : image);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical */}
      {url && <link rel="canonical" href={url} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
    </Helmet>
  );
};

export default SEO;
