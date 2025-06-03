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
  title: "Centro de Visas | Servicios Migratorios",
  description: "Centro especializado en trámites y servicios de visas para diferentes países.",
  keywords: "visas, trámites migratorios, pasaportes, servicios consulares",
  authors: [{ name: "Centro de Visas" }],
  creator: "Centro de Visas",
  publisher: "Centro de Visas",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://centrodevisas.com",
    title: "Centro de Visas | Servicios Migratorios",
    description: "Centro especializado en trámites y servicios de visas para diferentes países.",
    siteName: "Centro de Visas",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/visas_center-logo-TWDMZXAfZaJw0v8mfYNKXKPBUt17vA.png",
        width: 1200,
        height: 630,
        alt: "Centro de Visas Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Centro de Visas | Servicios Migratorios",
    description: "Centro especializado en trámites y servicios de visas para diferentes países.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/visas_center-logo-TWDMZXAfZaJw0v8mfYNKXKPBUt17vA.png",
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

