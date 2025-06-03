"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/context/language-context"
import { Save, Globe } from "lucide-react"

export default function LanguagesPage() {
  const { toast } = useToast()
  const { language } = useLanguage()
  const [loading, setLoading] = useState(false)

  // English translations
  const [enTranslations, setEnTranslations] = useState({
    // Navigation
    nav: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      about: "About",
      contact: "Contact",
      blog: "Blog",
    },
    // Auth
    auth: {
      login: "Login",
      signup: "Sign Up",
      logout: "Logout",
    },
    // Hero
    hero: {
      title: "We Transform Your Ideas into Technological Solutions",
      phrase1: "Web Development",
      phrase2: "Mobile Applications",
      phrase3: "E-commerce Solutions",
      description:
        "Gorilla-Labs is a technology startup specializing in creating websites, e-commerce platforms, and applications for businesses and companies.",
      cta: "Let's Talk About Your Project",
      portfolio: "View Our Work",
    },
    // Services
    services: {
      title: "Our Services",
      subtitle: "We offer a wide range of technological solutions to help your business grow",
      all: "All",
      mobile: "Mobile",
      ecomm: "E-commerce",
      market: "Marketing",
      indust: "Industry",
      webDev: "Web Development",
      webDevDesc: "Custom websites with modern design and optimal performance",
      mobileApps: "Mobile Apps & PWA",
      mobileAppsDesc: "Native and progressive web applications for iOS and Android",
      ecommerce: "E-commerce Solutions",
      ecommerceDesc: "Online stores with Shopify, Amazon, and TikTok Shop integration",
      marketing: "Growth Marketing",
      marketingDesc: "Digital strategies to increase your online presence and sales",
      industry: "Industry Solutions",
      industryDesc: "Specialized applications for the maquiladora industry",
    },
  })

  // Spanish translations
  const [esTranslations, setEsTranslations] = useState({
    // Navigation
    nav: {
      home: "Inicio",
      services: "Servicios",
      portfolio: "Portafolio",
      about: "Nosotros",
      contact: "Contacto",
      blog: "Blog",
    },
    // Auth
    auth: {
      login: "Iniciar Sesión",
      signup: "Registrarse",
      logout: "Cerrar Sesión",
    },
    // Hero
    hero: {
      title: "Transformamos tus Ideas en Soluciones Tecnológicas",
      phrase1: "Desarrollo Web",
      phrase2: "Aplicaciones Móviles",
      phrase3: "Soluciones E-commerce",
      description:
        "Gorilla-Labs es una startup de tecnología especializada en crear sitios web, plataformas de comercio electrónico y aplicaciones para negocios y empresas.",
      cta: "Hablemos de tu Proyecto",
      portfolio: "Ver Nuestro Trabajo",
    },
    // Services
    services: {
      title: "Nuestros Servicios",
      subtitle: "Ofrecemos una amplia gama de soluciones tecnológicas para ayudar a tu negocio a crecer",
      all: "Todos",
      mobile: "Móvil",
      ecomm: "E-commerce",
      market: "Marketing",
      indust: "Industria",
      webDev: "Desarrollo Web",
      webDevDesc: "Sitios web personalizados con diseño moderno y rendimiento óptimo",
      mobileApps: "Apps Móviles y PWA",
      mobileAppsDesc: "Aplicaciones nativas y web progresivas para iOS y Android",
      ecommerce: "Soluciones E-commerce",
      ecommerceDesc: "Tiendas online con integración de Shopify, Amazon y TikTok Shop",
      marketing: "Marketing de Crecimiento",
      marketingDesc: "Estrategias digitales para aumentar tu presencia online y ventas",
      industry: "Soluciones Industriales",
      industryDesc: "Aplicaciones especializadas para la industria maquiladora",
    },
  })

  // Handle English translations change
  const handleEnNavChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEnTranslations((prev) => ({
      ...prev,
      nav: {
        ...prev.nav,
        [name]: value,
      },
    }))
  }

  const handleEnAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEnTranslations((prev) => ({
      ...prev,
      auth: {
        ...prev.auth,
        [name]: value,
      },
    }))
  }

  const handleEnHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEnTranslations((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [name]: value,
      },
    }))
  }

  const handleEnServicesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEnTranslations((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [name]: value,
      },
    }))
  }

  // Handle Spanish translations change
  const handleEsNavChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEsTranslations((prev) => ({
      ...prev,
      nav: {
        ...prev.nav,
        [name]: value,
      },
    }))
  }

  const handleEsAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEsTranslations((prev) => ({
      ...prev,
      auth: {
        ...prev.auth,
        [name]: value,
      },
    }))
  }

  const handleEsHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEsTranslations((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [name]: value,
      },
    }))
  }

  const handleEsServicesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEsTranslations((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [name]: value,
      },
    }))
  }

  // Save translations
  const saveTranslations = async () => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: language === "en" ? "Translations Saved" : "Traducciones Guardadas",
      description:
        language === "en"
          ? "Website translations have been updated successfully"
          : "Las traducciones del sitio web se han actualizado con éxito",
    })

    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{language === "en" ? "Language Management" : "Gestión de Idiomas"}</h1>
        <Button onClick={saveTranslations} disabled={loading} className="gap-2">
          <Save className="h-4 w-4" />
          {loading
            ? language === "en"
              ? "Saving..."
              : "Guardando..."
            : language === "en"
              ? "Save Translations"
              : "Guardar Traducciones"}
        </Button>
      </div>

      <Tabs defaultValue="english">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="english" className="gap-2">
            <Globe className="h-4 w-4" />
            English
          </TabsTrigger>
          <TabsTrigger value="spanish" className="gap-2">
            <Globe className="h-4 w-4" />
            Español
          </TabsTrigger>
        </TabsList>

        {/* English Translations */}
        <TabsContent value="english">
          <div className="space-y-6">
            {/* Navigation */}
            <Card>
              <CardHeader>
                <CardTitle>Navigation</CardTitle>
                <CardDescription>Edit navigation menu translations</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="en-home">Home</Label>
                  <Input id="en-home" name="home" value={enTranslations.nav.home} onChange={handleEnNavChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="en-services">Services</Label>
                  <Input
                    id="en-services"
                    name="services"
                    value={enTranslations.nav.services}
                    onChange={handleEnNavChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="en-portfolio">Portfolio</Label>
                  <Input
                    id="en-portfolio"
                    name="portfolio"
                    value={enTranslations.nav.portfolio}
                    onChange={handleEnNavChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="en-about">About</Label>
                  <Input id="en-about" name="about" value={enTranslations.nav.about} onChange={handleEnNavChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="en-contact">Contact</Label>
                  <Input
                    id="en-contact"
                    name="contact"
                    value={enTranslations.nav.contact}
                    onChange={handleEnNavChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="en-blog">Blog</Label>
                  <Input id="en-blog" name="blog" value={enTranslations.nav.blog} onChange={handleEnNavChange} />
                </div>
              </CardContent>
            </Card>

            {/* Authentication */}
            <Card>
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
                <CardDescription>Edit authentication related translations</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="en-login">Login</Label>
                  <Input id="en-login" name="login" value={enTranslations.auth.login} onChange={handleEnAuthChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="en-signup">Sign Up</Label>
                  <Input
                    id="en-signup"
                    name="signup"
                    value={enTranslations.auth.signup}
                    onChange={handleEnAuthChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="en-logout">Logout</Label>
                  <Input
                    id="en-logout"
                    name="logout"
                    value={enTranslations.auth.logout}
                    onChange={handleEnAuthChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Hero Section */}
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Edit hero section translations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="en-hero-title">Title</Label>
                  <Input
                    id="en-hero-title"
                    name="title"
                    value={enTranslations.hero.title}
                    onChange={handleEnHeroChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="en-hero-description">Description</Label>
                  <Textarea
                    id="en-hero-description"
                    name="description"
                    value={enTranslations.hero.description}
                    onChange={handleEnHeroChange}
                    rows={3}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="en-hero-phrase1">Phrase 1</Label>
                    <Input
                      id="en-hero-phrase1"
                      name="phrase1"
                      value={enTranslations.hero.phrase1}
                      onChange={handleEnHeroChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="en-hero-phrase2">Phrase 2</Label>
                    <Input
                      id="en-hero-phrase2"
                      name="phrase2"
                      value={enTranslations.hero.phrase2}
                      onChange={handleEnHeroChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="en-hero-phrase3">Phrase 3</Label>
                    <Input
                      id="en-hero-phrase3"
                      name="phrase3"
                      value={enTranslations.hero.phrase3}
                      onChange={handleEnHeroChange}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="en-hero-cta">Call to Action</Label>
                    <Input id="en-hero-cta" name="cta" value={enTranslations.hero.cta} onChange={handleEnHeroChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="en-hero-portfolio">Portfolio Button</Label>
                    <Input
                      id="en-hero-portfolio"
                      name="portfolio"
                      value={enTranslations.hero.portfolio}
                      onChange={handleEnHeroChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services Section */}
            <Card>
              <CardHeader>
                <CardTitle>Services Section</CardTitle>
                <CardDescription>Edit services section translations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="en-services-title">Title</Label>
                    <Input
                      id="en-services-title"
                      name="title"
                      value={enTranslations.services.title}
                      onChange={handleEnServicesChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="en-services-subtitle">Subtitle</Label>
                    <Input
                      id="en-services-subtitle"
                      name="subtitle"
                      value={enTranslations.services.subtitle}
                      onChange={handleEnServicesChange}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-5">
                  <div className="space-y-2">
                    <Label htmlFor="en-services-all">All</Label>
                    <Input
                      id="en-services-all"
                      name="all"
                      value={enTranslations.services.all}
                      onChange={handleEnServicesChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="en-services-mobile">Mobile</Label>
                    <Input
                      id="en-services-mobile"
                      name="mobile"
                      value={enTranslations.services.mobile}
                      onChange={handleEnServicesChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="en-services-ecomm">E-commerce</Label>
                    <Input
                      id="en-services-ecomm"
                      name="ecomm"
                      value={enTranslations.services.ecomm}
                      onChange={handleEnServicesChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="en-services-market">Marketing</Label>
                    <Input
                      id="en-services-market"
                      name="market"
                      value={enTranslations.services.market}
                      onChange={handleEnServicesChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="en-services-indust">Industry</Label>
                    <Input
                      id="en-services-indust"
                      name="indust"
                      value={enTranslations.services.indust}
                      onChange={handleEnServicesChange}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="en-services-webDev">Web Development</Label>
                    <Input
                      id="en-services-webDev"
                      name="webDev"
                      value={enTranslations.services.webDev}
                      onChange={handleEnServicesChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="en-services-webDevDesc">Web Development Description</Label>
                    <Input
                      id="en-services-webDevDesc"
                      name="webDevDesc"
                      value={enTranslations.services.webDevDesc}
                      onChange={handleEnServicesChange}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="en-services-mobileApps">Mobile Apps</Label>
                    <Input
                      id="en-services-mobileApps"
                      name="mobileApps"
                      value={enTranslations.services.mobileApps}
                      onChange={handleEnServicesChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="en-services-mobileAppsDesc">Mobile Apps Description</Label>
                    <Input
                      id="en-services-mobileAppsDesc"
                      name="mobileAppsDesc"
                      value={enTranslations.services.mobileAppsDesc}
                      onChange={handleEnServicesChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Spanish Translations */}
        <TabsContent value="spanish">
          <div className="space-y-6">
            {/* Navigation */}
            <Card>
              <CardHeader>
                <CardTitle>Navegación</CardTitle>
                <CardDescription>Editar traducciones del menú de navegación</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="es-home">Inicio</Label>
                  <Input id="es-home" name="home" value={esTranslations.nav.home} onChange={handleEsNavChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="es-services">Servicios</Label>
                  <Input
                    id="es-services"
                    name="services"
                    value={esTranslations.nav.services}
                    onChange={handleEsNavChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="es-portfolio">Portafolio</Label>
                  <Input
                    id="es-portfolio"
                    name="portfolio"
                    value={esTranslations.nav.portfolio}
                    onChange={handleEsNavChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="es-about">Nosotros</Label>
                  <Input id="es-about" name="about" value={esTranslations.nav.about} onChange={handleEsNavChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="es-contact">Contacto</Label>
                  <Input
                    id="es-contact"
                    name="contact"
                    value={esTranslations.nav.contact}
                    onChange={handleEsNavChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="es-blog">Blog</Label>
                  <Input id="es-blog" name="blog" value={esTranslations.nav.blog} onChange={handleEsNavChange} />
                </div>
              </CardContent>
            </Card>

            {/* Authentication */}
            <Card>
              <CardHeader>
                <CardTitle>Autenticación</CardTitle>
                <CardDescription>Editar traducciones relacionadas con la autenticación</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="es-login">Iniciar Sesión</Label>
                  <Input id="es-login" name="login" value={esTranslations.auth.login} onChange={handleEsAuthChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="es-signup">Registrarse</Label>
                  <Input
                    id="es-signup"
                    name="signup"
                    value={esTranslations.auth.signup}
                    onChange={handleEsAuthChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="es-logout">Cerrar Sesión</Label>
                  <Input
                    id="es-logout"
                    name="logout"
                    value={esTranslations.auth.logout}
                    onChange={handleEsAuthChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Hero Section */}
            <Card>
              <CardHeader>
                <CardTitle>Sección Principal</CardTitle>
                <CardDescription>Editar traducciones de la sección principal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="es-hero-title">Título</Label>
                  <Input
                    id="es-hero-title"
                    name="title"
                    value={esTranslations.hero.title}
                    onChange={handleEsHeroChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="es-hero-description">Descripción</Label>
                  <Textarea
                    id="es-hero-description"
                    name="description"
                    value={esTranslations.hero.description}
                    onChange={handleEsHeroChange}
                    rows={3}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="es-hero-phrase1">Frase 1</Label>
                    <Input
                      id="es-hero-phrase1"
                      name="phrase1"
                      value={esTranslations.hero.phrase1}
                      onChange={handleEsHeroChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="es-hero-phrase2">Frase 2</Label>
                    <Input
                      id="es-hero-phrase2"
                      name="phrase2"
                      value={esTranslations.hero.phrase2}
                      onChange={handleEsHeroChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="es-hero-phrase3">Frase 3</Label>
                    <Input
                      id="es-hero-phrase3"
                      name="phrase3"
                      value={esTranslations.hero.phrase3}
                      onChange={handleEsHeroChange}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="es-hero-cta">Llamada a la Acción</Label>
                    <Input id="es-hero-cta" name="cta" value={esTranslations.hero.cta} onChange={handleEsHeroChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="es-hero-portfolio">Botón de Portafolio</Label>
                    <Input
                      id="es-hero-portfolio"
                      name="portfolio"
                      value={esTranslations.hero.portfolio}
                      onChange={handleEsHeroChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services Section */}
            <Card>
              <CardHeader>
                <CardTitle>Sección de Servicios</CardTitle>
                <CardDescription>Editar traducciones de la sección de servicios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="es-services-title">Título</Label>
                    <Input
                      id="es-services-title"
                      name="title"
                      value={esTranslations.services.title}
                      onChange={handleEsServicesChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="es-services-subtitle">Subtítulo</Label>
                    <Input
                      id="es-services-subtitle"
                      name="subtitle"
                      value={esTranslations.services.subtitle}
                      onChange={handleEsServicesChange}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-5">
                  <div className="space-y-2">
                    <Label htmlFor="es-services-all">Todos</Label>
                    <Input
                      id="es-services-all"
                      name="all"
                      value={esTranslations.services.all}
                      onChange={handleEsServicesChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="es-services-mobile">Móvil</Label>
                    <Input
                      id="es-services-mobile"
                      name="mobile"
                      value={esTranslations.services.mobile}
                      onChange={handleEsServicesChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="es-services-ecomm">E-commerce</Label>
                    <Input
                      id="es-services-ecomm"
                      name="ecomm"
                      value={esTranslations.services.ecomm}
                      onChange={handleEsServicesChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="es-services-market">Marketing</Label>
                    <Input
                      id="es-services-market"
                      name="market"
                      value={esTranslations.services.market}
                      onChange={handleEsServicesChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="es-services-indust">Industria</Label>
                    <Input
                      id="es-services-indust"
                      name="indust"
                      value={esTranslations.services.indust}
                      onChange={handleEsServicesChange}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="es-services-webDev">Desarrollo Web</Label>
                    <Input
                      id="es-services-webDev"
                      name="webDev"
                      value={esTranslations.services.webDev}
                      onChange={handleEsServicesChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="es-services-webDevDesc">Descripción de Desarrollo Web</Label>
                    <Input
                      id="es-services-webDevDesc"
                      name="webDevDesc"
                      value={esTranslations.services.webDevDesc}
                      onChange={handleEsServicesChange}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="es-services-mobileApps">Aplicaciones Móviles</Label>
                    <Input
                      id="es-services-mobileApps"
                      name="mobileApps"
                      value={esTranslations.services.mobileApps}
                      onChange={handleEsServicesChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="es-services-mobileAppsDesc">Descripción de Aplicaciones Móviles</Label>
                    <Input
                      id="es-services-mobileAppsDesc"
                      name="mobileAppsDesc"
                      value={esTranslations.services.mobileAppsDesc}
                      onChange={handleEsServicesChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
