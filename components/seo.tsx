import Head from "next/head"

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  keywords?: string
  author?: string
  type?: "website" | "article" | "service" | "product"
  price?: string
  technologies?: string[]
  location?: string
  language?: "en" | "es"
  alternateLanguages?: { lang: string; url: string }[]
  serviceCategory?: string
}

export default function SEO({
  title,
  description,
  canonical,
  ogImage = "/og-default.jpg",
  keywords,
  author = "Gorilla Labs",
  type = "website",
  price,
  technologies,
  location = "El Paso TX, Ciudad Juárez",
  language = "es",
  alternateLanguages,
  serviceCategory,
}: SEOProps) {
  // Ensure title is a non-empty string and make it unique for each page
  const safeTitle = typeof title === "string" && title.trim() ? title : "Gorilla Labs"
  const fullTitle = safeTitle.includes("Gorilla Labs") ? safeTitle : `${safeTitle} - Gorilla Labs`

  const generateTechKeywords = (technologies?: string[], serviceCategory?: string) => {
    const baseKeywords = keywords || ""
    const techKeywords = technologies ? technologies.join(", ") : ""
    const locationKeywords = "El Paso TX, Ciudad Juárez, Texas, Chihuahua"

    return [baseKeywords, techKeywords, locationKeywords].filter(Boolean).join(", ")
  }

  const finalKeywords = generateTechKeywords(technologies, serviceCategory)

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <link rel="icon" href="/favicon.ico" />

      {/* Keywords */}
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}

      {/* Location */}
      <meta name="geo.region" content="US-TX" />
      <meta name="geo.placename" content={location} />

      {/* Language */}
      <meta httpEquiv="content-language" content={language} />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Alternate Languages */}
      {alternateLanguages?.map((alt) => (
        <link key={alt.lang} rel="alternate" hrefLang={alt.lang} href={alt.url} />
      ))}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Gorilla Labs" />
      <meta property="og:locale" content={language === "es" ? "es_MX" : "en_US"} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@gorillalabs" />

      {/* Service/Product specific */}
      {price && <meta property="product:price:amount" content={price} />}
      {price && <meta property="product:price:currency" content="USD" />}

      {/* Technologies for portfolio */}
      {technologies && <meta name="article:tag" content={technologies.join(", ")} />}

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": type === "service" ? "Service" : type === "article" ? "Article" : "Organization",
            name: fullTitle,
            description: description,
            url: canonical,
            image: ogImage,
            ...(type === "service" &&
              price && {
                offers: {
                  "@type": "Offer",
                  price: price,
                  priceCurrency: "USD",
                },
              }),
            ...(technologies && {
              keywords: technologies.join(", "),
            }),
            provider: {
              "@type": "Organization",
              name: "Gorilla Labs",
              url: "https://gorillalabs.dev",
              address: {
                "@type": "PostalAddress",
                addressLocality: "El Paso",
                addressRegion: "TX",
                addressCountry: "US",
              },
            },
          }),
        }}
      />
    </Head>
  )
}

// Add named export for compatibility
export const Seo = SEO
