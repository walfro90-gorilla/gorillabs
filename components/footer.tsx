"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUp } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { SectionContainer } from "@/components/ui/section"
import { TouchButton } from "@/components/ui/mobile-optimizations"
import { motion } from "framer-motion"

const Footer = () => {
  const { translations } = useLanguage()

  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="footer" className="bg-bg-primary border-t border-gray-800/50 text-white relative" role="contentinfo">
      {/* Back to top button */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <TouchButton
          onClick={scrollToTop}
          variant="ghost"
          size="sm"
          className="bg-gorilla-yellow text-gorilla-black hover:bg-yellow-400 rounded-full p-3 shadow-lg"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </TouchButton>
      </div>

      <SectionContainer maxWidth="xl" className="py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glabs-logo.jpg-hrzbXAlZYwpe9notvpjbnI7ZB1vNWW.jpeg"
                  alt="Gorilla-Labs Logo"
                  width={48}
                  height={48}
                  className="rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-2xl font-bold text-gorilla-yellow">Gorilla-Labs</span>
            </Link>
            <p className="text-text-muted-dark leading-relaxed max-w-sm">
              {translations.footer.description}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" }
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 bg-bg-card rounded-lg border border-gray-700/50 hover:border-gorilla-yellow/50 hover:bg-gorilla-yellow/10 transition-all duration-300 group"
                >
                  <Icon className="h-5 w-5 text-text-muted-dark group-hover:text-gorilla-yellow transition-colors" />
                </Link>
              ))}
            </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="mb-6 text-lg font-bold text-white">{translations.footer.quickLinks}</h3>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/services", label: translations.nav.services },
                { href: "/portfolio", label: translations.nav.portfolio },
                { href: "/contact", label: translations.nav.contact },
                { href: "/about", label: "About Us" },
                { href: "/blog", label: "Blog" }
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link 
                    href={href} 
                    className="text-text-muted-dark hover:text-gorilla-yellow transition-colors duration-300 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="mb-6 text-lg font-bold text-white">{translations.footer.services}</h3>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/services/web-development", label: translations.services.webDev },
                { href: "/services/mobile-apps", label: translations.services.mobileApps },
                { href: "/services/ecommerce", label: translations.services.ecommerce },
                { href: "/services/marketing", label: translations.services.marketing },
                { href: "/services/industry", label: translations.services.industry }
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link 
                    href={href} 
                    className="text-text-muted-dark hover:text-gorilla-yellow transition-colors duration-300 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="mb-6 text-lg font-bold text-white">{translations.footer.contact}</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-bg-card rounded-lg border border-gray-700/50 group-hover:border-gorilla-yellow/50 transition-colors">
                  <MapPin className="h-4 w-4 text-gorilla-yellow" />
                </div>
                <div>
                  <p className="text-text-muted-dark leading-relaxed">
                    Avenida Paseo Triunfo de la Republica, 3200
                  </p>
                  <p className="text-sm text-gray-500">Ciudad Juárez, México</p>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-bg-card rounded-lg border border-gray-700/50 group-hover:border-gorilla-yellow/50 transition-colors">
                  <Phone className="h-4 w-4 text-gorilla-yellow" />
                </div>
                <a 
                  href="tel:+526565731023" 
                  className="text-text-muted-dark hover:text-gorilla-yellow transition-colors"
                >
                  +52 (656) 573 1023
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-bg-card rounded-lg border border-gray-700/50 group-hover:border-gorilla-yellow/50 transition-colors">
                  <Mail className="h-4 w-4 text-gorilla-yellow" />
                </div>
                <a 
                  href="mailto:info@gorillabs.dev" 
                  className="text-text-muted-dark hover:text-gorilla-yellow transition-colors"
                >
                  info@gorillabs.dev
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-gray-800/50">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-text-muted-dark text-sm">
              © {currentYear} Gorilla-Labs. {translations.footer.rights}
            </p>
            
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-text-muted-dark hover:text-gorilla-yellow transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-text-muted-dark hover:text-gorilla-yellow transition-colors">
                Terms of Service
              </Link>
              <div className="flex items-center gap-2 text-text-muted-dark">
                <span>Made with</span>
                <span className="text-red-400 animate-pulse">❤️</span>
                <span>in El Paso & Juárez</span>
              </div>
            </div>
          </div>
          </motion.div>
        </div>
      </SectionContainer>
    </footer>
  )
}

export default Footer
