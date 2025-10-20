import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogType?: string
}

export function SEO({
  title = 'Foreign Stock Blog',
  description = 'Expert analysis and insights on international stock markets including US, European, and Asian markets. Your gateway to global investing.',
  keywords = 'stocks, foreign markets, investment, analysis, US stocks, EU stocks, Asian stocks, international investing, market analysis',
  ogImage = '/og-image.png',
  ogType = 'website',
}: SEOProps) {
  const fullTitle = title === 'Foreign Stock Blog'
    ? title
    : `${title} | Foreign Stock Blog`

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const currentUrl = typeof window !== 'undefined' ? window.location.href : siteUrl
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Foreign Stock Blog" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Foreign Stock Blog" />
    </Helmet>
  )
}
