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
  title: "Gorilla Labs | Soluciones Tecnológicas IA",
  description:
    "Transformamos tus ideas en soluciones tecnológicas con inteligencia artificial. Desarrollo web, ecommerce y aplicaciones móviles.",
  keywords:
    "desarrollo web, ecommerce, aplicaciones móviles, inteligencia artificial, soluciones tecnológicas, IA, marketing digital",
  authors: [{ name: "Gorilla Labs" }],
  creator: "Gorilla Labs",
  publisher: "Gorilla Labs",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://gorilla-labs.com",
    title: "Gorilla Labs | Soluciones Tecnológicas IA",
    description:
      "Transformamos tus ideas en soluciones tecnológicas con inteligencia artificial. Desarrollo web, ecommerce y aplicaciones móviles.",
    siteName: "Gorilla Labs",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glabs-logo.jpg-hrzbXAlZYwpe9notvpjbnI7ZB1vNWW.jpeg",
        width: 1200,
        height: 630,
        alt: "Gorilla Labs Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gorilla Labs | Soluciones Tecnológicas IA",
    description:
      "Transformamos tus ideas en soluciones tecnológicas con inteligencia artificial. Desarrollo web, ecommerce y aplicaciones móviles.",
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
  return (
    <html lang="en" suppressHydrationWarning className="w-full overflow-x-hidden">
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
