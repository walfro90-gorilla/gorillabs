"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  FileText,
  ImageIcon,
  Globe,
  MessageSquare,
  Briefcase,
  Home,
  Search,
} from "lucide-react"
import { useState } from "react"

export default function AdminSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { language } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    {
      title: language === "en" ? "Dashboard" : "Panel",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: language === "en" ? "CRM" : "CRM",
      href: "/admin/crm",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: language === "en" ? "Website" : "Sitio Web",
      href: "/admin/website",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: language === "en" ? "Services" : "Servicios",
      href: "/admin/services",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: language === "en" ? "Portfolio" : "Portafolio",
      href: "/admin/portfolio",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      title: language === "en" ? "Blog" : "Blog",
      href: "/admin/blog",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: language === "en" ? "SEO" : "SEO",
      href: "/admin/seo",
      icon: <Search className="h-5 w-5" />,
    },
    {
      title: language === "en" ? "Orders" : "Pedidos",
      href: "/admin/orders",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      title: language === "en" ? "Customers" : "Clientes",
      href: "/admin/customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: language === "en" ? "Media" : "Medios",
      href: "/admin/media",
      icon: <ImageIcon className="h-5 w-5" />,
    },
    {
      title: language === "en" ? "Messages" : "Mensajes",
      href: "/admin/messages",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: language === "en" ? "Languages" : "Idiomas",
      href: "/admin/languages",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      title: language === "en" ? "Settings" : "Configuración",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed left-4 top-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-background transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col border-r">
          <div className="border-b p-4">
            <Link href="/admin" className="flex items-center gap-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glabs-logo.jpg-hrzbXAlZYwpe9notvpjbnI7ZB1vNWW.jpeg"
                alt="Gorilla-Labs Logo"
                width={40}
                height={40}
                className="rounded-md"
              />
              <div>
                <p className="font-bold">Gorilla-Labs</p>
                <p className="text-xs text-muted-foreground">
                  {language === "en" ? "Admin Panel" : "Panel de Administración"}
                </p>
              </div>
            </Link>
          </div>

          <div className="flex-1 overflow-auto py-4">
            <nav className="grid gap-1 px-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant={pathname === item.href ? "secondary" : "ghost"} className="w-full justify-start">
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          <div className="border-t p-4">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="text-sm font-bold text-primary-foreground">{user?.name?.charAt(0) || "A"}</span>
              </div>
              <div>
                <p className="font-medium">{user?.name || "Admin"}</p>
                <p className="text-xs text-muted-foreground">{user?.email || "admin@example.com"}</p>
              </div>
            </div>

            <Button variant="outline" className="w-full gap-2" onClick={logout}>
              <LogOut className="h-4 w-4" />
              {language === "en" ? "Logout" : "Cerrar Sesión"}
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
