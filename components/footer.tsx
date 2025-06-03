"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const Footer = () => {
  const { translations } = useLanguage()

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glabs-logo.jpg-hrzbXAlZYwpe9notvpjbnI7ZB1vNWW.jpeg"
                alt="Gorilla-Labs Logo"
                width={40}
                height={40}
                className="rounded-md"
              />
              <span className="text-xl font-bold text-primary">Gorilla-Labs</span>
            </Link>
            <p className="text-sm text-gray-400">{translations.footer.description}</p>
            <div className="flex gap-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-primary" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-gray-400 hover:text-primary" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-gray-400 hover:text-primary" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-primary" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-primary-foreground">{translations.footer.quickLinks}</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/services" className="text-gray-400 hover:text-primary">
                  {translations.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-primary">
                  {translations.nav.portfolio}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary">
                  {translations.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary">
                  {translations.nav.contact}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-primary">
                  {translations.nav.blog}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-primary-foreground">{translations.footer.services}</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/services/web-development" className="text-gray-400 hover:text-primary">
                  {translations.services.webDev}
                </Link>
              </li>
              <li>
                <Link href="/services/mobile-apps" className="text-gray-400 hover:text-primary">
                  {translations.services.mobileApps}
                </Link>
              </li>
              <li>
                <Link href="/services/ecommerce" className="text-gray-400 hover:text-primary">
                  {translations.services.ecommerce}
                </Link>
              </li>
              <li>
                <Link href="/services/marketing" className="text-gray-400 hover:text-primary">
                  {translations.services.marketing}
                </Link>
              </li>
              <li>
                <Link href="/services/industry" className="text-gray-400 hover:text-primary">
                  {translations.services.industry}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-primary-foreground">{translations.footer.contact}</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-gray-400">123 Tech Street, Innovation District, 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-primary">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:info@gorilla-labs.com" className="text-gray-400 hover:text-primary">
                  info@gorilla-labs.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>
            © {currentYear} Gorilla-Labs. {translations.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
