import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AIChat from "@/components/ai-chat"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/context/cart-context"
import { AuthProvider } from "@/context/auth-context"
import { LanguageProvider } from "@/context/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gorilla Labs | Desarrollo de Apps y Software IA - El Paso TX & Cd. Juárez",
  description:
    "Starup de desarrollo de software en El Paso Texas y Ciudad Juárez. Creamos apps móviles, software a la medida, e-commerce, websites y soluciones de IA para empresas.",
  keywords:
    "desarrollo de apps El Paso, software a la medida Ciudad Juárez, e-commerce El Paso Texas, desarrollo web Juárez Chihuahua, inteligencia artificial El Paso, programación software Juárez, aplicaciones móviles frontera México USA, desarrollo web El Paso TX, software empresarial Ciudad Juárez, soluciones tecnológicas frontera, desarrollo de aplicaciones El Paso Texas, software personalizado Juárez México, tiendas online El Paso, páginas web Ciudad Juárez, IA empresarial frontera",
  authors: [{ name: "Gorilla Labs" }],
  creator: "Gorilla Labs",
  publisher: "Gorilla Labs",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  robots: "index, follow",
  alternates: {
    canonical: "https://gorilla-labs.com",
  },
  other: {
    "geo.region": "US-TX, MX-CHH",
    "geo.placename": "El Paso, Ciudad Juárez",
    "geo.position": "31.7619;-106.4850",
    ICBM: "31.7619, -106.4850",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_US"],
    url: "https://gorilla-labs.com",
    title: "Gorilla Labs | Desarrollo de Apps y Software IA - El Paso TX & Cd. Juárez",
    description:
      "Startup líder en desarrollo de software en El Paso Texas y Ciudad Juárez. Especialistas en apps móviles, software a la medida, e-commerce, websites y soluciones de IA.",
    siteName: "Gorilla Labs",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glabs-logo.jpg-hrzbXAlZYwpe9notvpjbnI7ZB1vNWW.jpeg",
        width: 1200,
        height: 630,
        alt: "Gorilla Labs - Desarrollo de Software El Paso Texas y Ciudad Juárez",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gorilla Labs | Desarrollo de Apps y Software IA - El Paso TX & Cd. Juárez",
    description:
      "Empresa de desarrollo de software en El Paso Texas y Ciudad Juárez. Apps móviles, software a la medida, e-commerce, websites y IA.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glabs-logo.jpg-hrzbXAlZYwpe9notvpjbnI7ZB1vNWW.jpeg",
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://gorilla-labs.com",
    name: "Gorilla Labs",
    description: "Empresa de desarrollo de software, apps móviles, e-commerce, websites y soluciones de IA",
    url: "https://gorilla-labs.com",
    telephone: "+1-915-XXX-XXXX",
    email: "info@gorilla-labs.com",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "123 Tech Street",
        addressLocality: "El Paso",
        addressRegion: "TX",
        postalCode: "79901",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Av. Tecnológico 456",
        addressLocality: "Ciudad Juárez",
        addressRegion: "Chihuahua",
        postalCode: "32000",
        addressCountry: "MX",
      },
    ],
    geo: [
      {
        "@type": "GeoCoordinates",
        latitude: "31.7619",
        longitude: "-106.4850",
      },
      {
        "@type": "GeoCoordinates",
        latitude: "31.6904",
        longitude: "-106.4245",
      },
    ],
    areaServed: [
      {
        "@type": "City",
        name: "El Paso",
        containedInPlace: {
          "@type": "State",
          name: "Texas",
        },
      },
      {
        "@type": "City",
        name: "Ciudad Juárez",
        containedInPlace: {
          "@type": "State",
          name: "Chihuahua",
        },
      },
    ],
    serviceType: [
      "Desarrollo de aplicaciones móviles",
      "Software a la medida",
      "Desarrollo de e-commerce",
      "Desarrollo de websites",
      "Soluciones de inteligencia artificial",
      "Consultoría tecnológica",
    ],
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-18:00",
    sameAs: [
      "https://www.facebook.com/gorillalabs",
      "https://www.linkedin.com/company/gorilla-labs",
      "https://twitter.com/gorillalabs",
    ],
  }

  return (
    <html lang="es" suppressHydrationWarning className="w-full overflow-x-hidden">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className={`${inter.className} w-full overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <LanguageProvider>
            <AuthProvider>
              <CartProvider>
                <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
                  <Header />
                  <main className="flex-1 w-full">{children}</main>
                  <Footer />
                </div>
                <AIChat />
                <Toaster />
              </CartProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
