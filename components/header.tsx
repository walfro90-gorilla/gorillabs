"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ShoppingCart, Menu, X, User, Globe, LayoutDashboard, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { ModeToggle } from "./mode-toggle"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { cartItems } = useCart()
  const { user, logout } = useAuth()
  const { language, setLanguage, translations } = useLanguage()
  const isMobile = useMobile()
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => setIsMenuOpen(false)

  // Close menu when route changes
  useEffect(() => {
    closeMenu()
  }, [pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navLinks = [
    { href: "/#hero", label: translations.nav.home, scroll: true },
    { href: "/#ai-showcase", label: language === "es" ? "IA" : language === "zh" ? "AI" : "AI", scroll: true },
    { href: "/#logistics", label: language === "es" ? "Logística" : language === "zh" ? "物流" : "Logistics", scroll: true },
    { href: "/#services", label: translations.nav.services, scroll: true },
    { href: "/#testimonials", label: language === "es" ? "Testimonios" : language === "zh" ? "评价" : "Testimonials", scroll: true },
    { href: "/#contact", label: translations.nav.contact, scroll: true },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, scroll: boolean) => {
    if (scroll && href.startsWith("/#")) {
      e.preventDefault()
      const id = href.replace("/#", "")
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
        closeMenu()
      }
    }
  }

  return (
    <header
      id="navigation"
      className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
        scrolled ? "bg-background/95 shadow-md" : "bg-background/80"
      }`}
      role="banner"
    >
      <div
        className={`container flex items-center justify-between px-4 md:px-6 transition-all duration-300 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glabs-logo.jpg-hrzbXAlZYwpe9notvpjbnI7ZB1vNWW.jpeg"
            alt="Gorilla-Labs Logo"
            width={40}
            height={40}
            className="rounded-md"
          />
          <span className="text-xl font-bold">Gorilla-Labs</span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.scroll || false)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                  pathname === link.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Only show cart and menu button on mobile, hide others */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Button
                variant={language === "en" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("en")}
                className="h-8 px-2 text-xs"
              >
                EN
              </Button>
              <Button
                variant={language === "es" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("es")}
                className="h-8 px-2 text-xs"
              >
                ES
              </Button>
              <Button
                variant={language === "zh" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("zh")}
                className="h-8 px-2 text-xs"
              >
                中文
              </Button>
            </div>

            <ModeToggle />

            {user?.role === "admin" && (
              <Link href="/admin">
                <Button variant="ghost" size="icon" aria-label="Admin Panel">
                  <LayoutDashboard className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {user ? (
              <Link href="/account">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  {translations.auth.login}
                </Button>
              </Link>
            )}
          </div>

          {/* Always show cart button */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Cerrar Menú" : "Abrir Menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu - Slide from right */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-[350px] bg-background shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          top: "64px",
          height: "calc(100vh - 64px)",
          visibility: isMenuOpen ? "visible" : "hidden",
          opacity: isMenuOpen ? "1" : "0",
        }}
      >
        {/* Contenedor con scroll - estructura simplificada */}
        <div className="h-full w-full overflow-y-auto">
          <div className="p-4">
            {/* Login Button - Prominent at the top */}
            {!user && (
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 py-4 px-4 bg-primary text-primary-foreground rounded-md font-medium text-xl mb-6"
                onClick={closeMenu}
              >
                <LogIn className="h-6 w-6" />
                {translations.auth.login}
              </Link>
            )}

            {/* Navigation Links */}
            <nav className="mb-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href, link.scroll || false)
                    closeMenu()
                  }}
                  className={cn(
                    "block py-3 text-xl font-medium transition-colors hover:text-primary cursor-pointer",
                    pathname === link.href ? "text-primary" : "text-foreground",
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Action Buttons for Mobile */}
            <div className="pt-4 border-t border-border">
              {/* Language Toggle */}
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground mb-1">Language / Idioma / 语言</span>
                <div className="flex gap-2">
                  <Button
                    variant={language === "en" ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setLanguage("en")
                      closeMenu()
                    }}
                    className="flex-1"
                  >
                    EN
                  </Button>
                  <Button
                    variant={language === "es" ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setLanguage("es")
                      closeMenu()
                    }}
                    className="flex-1"
                  >
                    ES
                  </Button>
                  <Button
                    variant={language === "zh" ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setLanguage("zh")
                      closeMenu()
                    }}
                    className="flex-1"
                  >
                    中文
                  </Button>
                </div>
              </div>

              {/* Theme Toggle */}
              <div className="flex w-full items-center gap-3 text-xl font-medium py-3">
                <ModeToggle />
                <span>{language === "en" ? "Toggle Theme" : "Cambiar Tema"}</span>
              </div>

              {/* Admin Panel Link */}
              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  className="flex w-full items-center gap-3 text-xl font-medium transition-colors hover:text-primary py-3"
                  onClick={closeMenu}
                >
                  <LayoutDashboard className="h-6 w-6" />
                  {language === "en" ? "Admin Panel" : "Panel de Administración"}
                </Link>
              )}

              {/* Account or Login */}
              {user ? (
                <>
                  <Link
                    href="/account"
                    className="flex w-full items-center gap-3 text-xl font-medium transition-colors hover:text-primary py-3"
                    onClick={closeMenu}
                  >
                    <User className="h-6 w-6" />
                    {language === "en" ? "My Account" : "Mi Cuenta"}
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-xl py-3"
                    onClick={() => {
                      logout()
                      closeMenu()
                    }}
                  >
                    {translations.auth.logout}
                  </Button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex w-full items-center gap-3 text-xl font-medium transition-colors hover:text-primary py-3"
                  onClick={closeMenu}
                >
                  <User className="h-6 w-6" />
                  {language === "en" ? "My Account" : "Mi Cuenta"}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for closing the menu when clicking outside */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          style={{
            top: "64px",
            visibility: isMenuOpen ? "visible" : "hidden",
            opacity: isMenuOpen ? "1" : "0",
            transition: "visibility 0.3s, opacity 0.3s",
          }}
          onClick={closeMenu}
        />
      )}
    </header>
  )
}

export default Header
