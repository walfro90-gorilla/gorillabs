"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle, Check, Code, FileCode, Globe, RefreshCw, Search, Share2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface PageSeoSettings {
  title: string
  description: string
  keywords: string
  ogImage: string
}

interface SeoSettings {
  global: {
    siteName: string
    titleSeparator: string
    defaultTitle: string
    defaultDescription: string
    defaultKeywords: string
    defaultOgImage: string
    favicon: string
  }
  pages: {
    home: PageSeoSettings
    services: PageSeoSettings
    portfolio: PageSeoSettings
    blog: PageSeoSettings
    about: PageSeoSettings
    contact: PageSeoSettings
  }
  technical: {
    generateSitemap: boolean
    sitemapChangeFreq: string
    sitemapPriority: string
    robotsTxt: string
    googleVerification: string
    bingVerification: string
    analyticsId: string
  }
  social: {
    twitterUsername: string
    facebookAppId: string
    linkedinProfile: string
    instagramProfile: string
  }
  schema: {
    organizationType: string
    organizationName: string
    organizationLogo: string
    contactType: string
    contactEmail: string
    contactPhone: string
  }
}

const defaultSettings: SeoSettings = {
  global: {
    siteName: "Gorilla-Labs",
    titleSeparator: "|",
    defaultTitle: "Soluciones Tecnológicas para Empresas",
    defaultDescription: "Desarrollo web, ecommerce y aplicaciones móviles para negocios y empresas",
    defaultKeywords: "desarrollo web, ecommerce, aplicaciones móviles, marketing digital, soluciones tecnológicas",
    defaultOgImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glabs-logo.jpg-hrzbXAlZYwpe9notvpjbnI7ZB1vNWW.jpeg",
    favicon: "/favicon.ico",
  },
  pages: {
    home: {
      title: "Gorilla-Labs | Soluciones Tecnológicas",
      description:
        "Transformamos tus ideas en soluciones tecnológicas. Desarrollo web, ecommerce y aplicaciones móviles.",
      keywords: "desarrollo web, ecommerce, aplicaciones móviles, marketing digital, soluciones tecnológicas",
      ogImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glabs-logo.jpg-hrzbXAlZYwpe9notvpjbnI7ZB1vNWW.jpeg",
    },
    services: {
      title: "Servicios | Gorilla-Labs",
      description: "Ofrecemos servicios de desarrollo web, ecommerce, aplicaciones móviles y marketing digital.",
      keywords: "servicios, desarrollo web, ecommerce, aplicaciones móviles, marketing digital",
      ogImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glabs-logo.jpg-hrzbXAlZYwpe9notvpjbnI7ZB1vNWW.jpeg",
    },
    portfolio: {
      title: "Portafolio | Gorilla-Labs",
      description: "Explora nuestros proyectos de desarrollo web, ecommerce y aplicaciones móviles.",
      keywords: "portafolio, proyectos, desarrollo web, ecommerce, aplicaciones móviles",
      ogImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glabs-logo.jpg-hrzbXAlZYwpe9notvpjbnI7ZB1vNWW.jpeg",
    },
    blog: {
      title: "Blog | Gorilla-Labs",
      description: "Artículos sobre desarrollo web, ecommerce, aplicaciones móviles y marketing digital.",
      keywords: "blog, artículos, desarrollo web, ecommerce, aplicaciones móviles, marketing digital",
      ogImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glabs-logo.jpg-hrzbXAlZYwpe9notvpjbnI7ZB1vNWW.jpeg",
    },
    about: {
      title: "Sobre Nosotros | Gorilla-Labs",
      description: "Conoce más sobre Gorilla-Labs y nuestro equipo de expertos en tecnología.",
      keywords: "sobre nosotros, equipo, empresa, tecnología",
      ogImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glabs-logo.jpg-hrzbXAlZYwpe9notvpjbnI7ZB1vNWW.jpeg",
    },
    contact: {
      title: "Contacto | Gorilla-Labs",
      description: "Contáctanos para discutir tu proyecto de desarrollo web, ecommerce o aplicaciones móviles.",
      keywords: "contacto, formulario, email, teléfono, ubicación",
      ogImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glabs-logo.jpg-hrzbXAlZYwpe9notvpjbnI7ZB1vNWW.jpeg",
    },
  },
  technical: {
    generateSitemap: true,
    sitemapChangeFreq: "weekly",
    sitemapPriority: "0.7",
    robotsTxt: "User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: https://gorilla-labs.com/sitemap.xml",
    googleVerification: "",
    bingVerification: "",
    analyticsId: "",
  },
  social: {
    twitterUsername: "@gorillalabs",
    facebookAppId: "",
    linkedinProfile: "gorilla-labs",
    instagramProfile: "gorillalabs",
  },
  schema: {
    organizationType: "Organization",
    organizationName: "Gorilla-Labs",
    organizationLogo:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glabs-logo.jpg-hrzbXAlZYwpe9notvpjbnI7ZB1vNWW.jpeg",
    contactType: "customer service",
    contactEmail: "info@gorilla-labs.com",
    contactPhone: "+1234567890",
  },
}

export default function SeoAdminPage() {
  const { language } = useLanguage()
  const { toast } = useToast()
  const [settings, setSettings] = useState<SeoSettings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("global")
  const [activePage, setActivePage] = useState("home")

  const handleSave = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real application, you would save the settings to a database or API
      // For now, we'll just show a success toast

      toast({
        title: language === "en" ? "Settings saved" : "Configuración guardada",
        description:
          language === "en"
            ? "Your SEO settings have been saved successfully"
            : "Tu configuración de SEO ha sido guardada exitosamente",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: language === "en" ? "Error" : "Error",
        description: language === "en" ? "Failed to save SEO settings" : "Error al guardar la configuración de SEO",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (section: keyof SeoSettings, field: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handlePageChange = (field: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        [activePage]: {
          ...prev.pages[activePage as keyof typeof prev.pages],
          [field]: value,
        },
      },
    }))
  }

  const generatePreview = () => {
    const { global } = settings

    return {
      title: `${global.defaultTitle} ${global.titleSeparator} ${global.siteName}`,
      description: global.defaultDescription,
      url: "https://gorilla-labs.com",
      image: global.defaultOgImage,
    }
  }

  const preview = generatePreview()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{language === "en" ? "SEO Settings" : "Configuración de SEO"}</h1>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              {language === "en" ? "Saving..." : "Guardando..."}
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              {language === "en" ? "Save Settings" : "Guardar Configuración"}
            </>
          )}
        </Button>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{language === "en" ? "Important" : "Importante"}</AlertTitle>
        <AlertDescription>
          {language === "en"
            ? "These settings affect how your site appears in search engines and social media."
            : "Esta configuración afecta cómo aparece tu sitio en motores de búsqueda y redes sociales."}
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
          <TabsTrigger value="global">
            <Search className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">{language === "en" ? "Global" : "Global"}</span>
          </TabsTrigger>
          <TabsTrigger value="pages">
            <FileCode className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">{language === "en" ? "Pages" : "Páginas"}</span>
          </TabsTrigger>
          <TabsTrigger value="technical">
            <Globe className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">{language === "en" ? "Technical" : "Técnico"}</span>
          </TabsTrigger>
          <TabsTrigger value="social">
            <Share2 className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">{language === "en" ? "Social" : "Social"}</span>
          </TabsTrigger>
          <TabsTrigger value="schema">
            <Code className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">{language === "en" ? "Schema" : "Esquema"}</span>
          </TabsTrigger>
        </TabsList>

        {/* Global Settings */}
        <TabsContent value="global" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Global SEO Settings" : "Configuración Global de SEO"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "These settings apply to all pages unless overridden"
                  : "Esta configuración se aplica a todas las páginas a menos que se sobrescriba"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="siteName">{language === "en" ? "Site Name" : "Nombre del Sitio"}</Label>
                  <Input
                    id="siteName"
                    value={settings.global.siteName}
                    onChange={(e) => handleChange("global", "siteName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="titleSeparator">
                    {language === "en" ? "Title Separator" : "Separador de Título"}
                  </Label>
                  <Input
                    id="titleSeparator"
                    value={settings.global.titleSeparator}
                    onChange={(e) => handleChange("global", "titleSeparator", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultTitle">{language === "en" ? "Default Title" : "Título Predeterminado"}</Label>
                <Input
                  id="defaultTitle"
                  value={settings.global.defaultTitle}
                  onChange={(e) => handleChange("global", "defaultTitle", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultDescription">
                  {language === "en" ? "Default Description" : "Descripción Predeterminada"}
                </Label>
                <Textarea
                  id="defaultDescription"
                  value={settings.global.defaultDescription}
                  onChange={(e) => handleChange("global", "defaultDescription", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  {language === "en"
                    ? `Character count: ${settings.global.defaultDescription.length}/160`
                    : `Cantidad de caracteres: ${settings.global.defaultDescription.length}/160`}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultKeywords">
                  {language === "en" ? "Default Keywords" : "Palabras Clave Predeterminadas"}
                </Label>
                <Textarea
                  id="defaultKeywords"
                  value={settings.global.defaultKeywords}
                  onChange={(e) => handleChange("global", "defaultKeywords", e.target.value)}
                  placeholder={language === "en" ? "Comma separated keywords" : "Palabras clave separadas por comas"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultOgImage">
                  {language === "en" ? "Default Social Image URL" : "URL de Imagen Social Predeterminada"}
                </Label>
                <Input
                  id="defaultOgImage"
                  value={settings.global.defaultOgImage}
                  onChange={(e) => handleChange("global", "defaultOgImage", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  {language === "en" ? "Recommended size: 1200x630 pixels" : "Tamaño recomendado: 1200x630 píxeles"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="favicon">{language === "en" ? "Favicon Path" : "Ruta del Favicon"}</Label>
                <Input
                  id="favicon"
                  value={settings.global.favicon}
                  onChange={(e) => handleChange("global", "favicon", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Preview" : "Vista Previa"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "How your site might appear in search results"
                  : "Cómo podría aparecer tu sitio en los resultados de búsqueda"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4">
                <div className="text-sm text-green-600 mb-1">https://gorilla-labs.com</div>
                <div className="text-blue-600 text-xl font-medium mb-1">{preview.title}</div>
                <div className="text-gray-600 text-sm">{preview.description}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pages Settings */}
        <TabsContent value="pages" className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={activePage === "home" ? "default" : "outline"}
              onClick={() => setActivePage("home")}
              className="w-full"
            >
              {language === "en" ? "Home" : "Inicio"}
            </Button>
            <Button
              variant={activePage === "services" ? "default" : "outline"}
              onClick={() => setActivePage("services")}
              className="w-full"
            >
              {language === "en" ? "Services" : "Servicios"}
            </Button>
            <Button
              variant={activePage === "portfolio" ? "default" : "outline"}
              onClick={() => setActivePage("portfolio")}
              className="w-full"
            >
              {language === "en" ? "Portfolio" : "Portafolio"}
            </Button>
            <Button
              variant={activePage === "blog" ? "default" : "outline"}
              onClick={() => setActivePage("blog")}
              className="w-full"
            >
              {language === "en" ? "Blog" : "Blog"}
            </Button>
            <Button
              variant={activePage === "about" ? "default" : "outline"}
              onClick={() => setActivePage("about")}
              className="w-full"
            >
              {language === "en" ? "About" : "Acerca de"}
            </Button>
            <Button
              variant={activePage === "contact" ? "default" : "outline"}
              onClick={() => setActivePage("contact")}
              className="w-full"
            >
              {language === "en" ? "Contact" : "Contacto"}
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {language === "en"
                  ? `${activePage.charAt(0).toUpperCase() + activePage.slice(1)} Page SEO`
                  : `SEO de la Página ${activePage.charAt(0).toUpperCase() + activePage.slice(1)}`}
              </CardTitle>
              <CardDescription>
                {language === "en"
                  ? `Specific SEO settings for your ${activePage} page`
                  : `Configuración específica de SEO para tu página de ${activePage}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pageTitle">{language === "en" ? "Page Title" : "Título de la Página"}</Label>
                <Input
                  id="pageTitle"
                  value={settings.pages[activePage as keyof typeof settings.pages].title}
                  onChange={(e) => handlePageChange("title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pageDescription">
                  {language === "en" ? "Page Description" : "Descripción de la Página"}
                </Label>
                <Textarea
                  id="pageDescription"
                  value={settings.pages[activePage as keyof typeof settings.pages].description}
                  onChange={(e) => handlePageChange("description", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  {language === "en"
                    ? `Character count: ${settings.pages[activePage as keyof typeof settings.pages].description.length}/160`
                    : `Cantidad de caracteres: ${settings.pages[activePage as keyof typeof settings.pages].description.length}/160`}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pageKeywords">
                  {language === "en" ? "Page Keywords" : "Palabras Clave de la Página"}
                </Label>
                <Textarea
                  id="pageKeywords"
                  value={settings.pages[activePage as keyof typeof settings.pages].keywords}
                  onChange={(e) => handlePageChange("keywords", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pageOgImage">
                  {language === "en" ? "Page Social Image URL" : "URL de Imagen Social de la Página"}
                </Label>
                <Input
                  id="pageOgImage"
                  value={settings.pages[activePage as keyof typeof settings.pages].ogImage}
                  onChange={(e) => handlePageChange("ogImage", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  {language === "en" ? "Recommended size: 1200x630 pixels" : "Tamaño recomendado: 1200x630 píxeles"}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Technical Settings */}
        <TabsContent value="technical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Technical SEO" : "SEO Técnico"}</CardTitle>
              <CardDescription>
                {language === "en" ? "Configure technical SEO settings" : "Configura ajustes técnicos de SEO"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="generateSitemap"
                  checked={settings.technical.generateSitemap as boolean}
                  onCheckedChange={(checked) => handleChange("technical", "generateSitemap", checked)}
                />
                <Label htmlFor="generateSitemap">
                  {language === "en" ? "Generate Sitemap" : "Generar Mapa del Sitio"}
                </Label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sitemapChangeFreq">
                    {language === "en" ? "Sitemap Change Frequency" : "Frecuencia de Cambio del Mapa del Sitio"}
                  </Label>
                  <Select
                    value={settings.technical.sitemapChangeFreq}
                    onValueChange={(value) => handleChange("technical", "sitemapChangeFreq", value)}
                  >
                    <SelectTrigger id="sitemapChangeFreq">
                      <SelectValue placeholder={language === "en" ? "Select frequency" : "Seleccionar frecuencia"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="always">{language === "en" ? "Always" : "Siempre"}</SelectItem>
                      <SelectItem value="hourly">{language === "en" ? "Hourly" : "Cada hora"}</SelectItem>
                      <SelectItem value="daily">{language === "en" ? "Daily" : "Diariamente"}</SelectItem>
                      <SelectItem value="weekly">{language === "en" ? "Weekly" : "Semanalmente"}</SelectItem>
                      <SelectItem value="monthly">{language === "en" ? "Monthly" : "Mensualmente"}</SelectItem>
                      <SelectItem value="yearly">{language === "en" ? "Yearly" : "Anualmente"}</SelectItem>
                      <SelectItem value="never">{language === "en" ? "Never" : "Nunca"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sitemapPriority">
                    {language === "en" ? "Sitemap Priority" : "Prioridad del Mapa del Sitio"}
                  </Label>
                  <Select
                    value={settings.technical.sitemapPriority}
                    onValueChange={(value) => handleChange("technical", "sitemapPriority", value)}
                  >
                    <SelectTrigger id="sitemapPriority">
                      <SelectValue placeholder={language === "en" ? "Select priority" : "Seleccionar prioridad"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.0">0.0</SelectItem>
                      <SelectItem value="0.1">0.1</SelectItem>
                      <SelectItem value="0.2">0.2</SelectItem>
                      <SelectItem value="0.3">0.3</SelectItem>
                      <SelectItem value="0.4">0.4</SelectItem>
                      <SelectItem value="0.5">0.5</SelectItem>
                      <SelectItem value="0.6">0.6</SelectItem>
                      <SelectItem value="0.7">0.7</SelectItem>
                      <SelectItem value="0.8">0.8</SelectItem>
                      <SelectItem value="0.9">0.9</SelectItem>
                      <SelectItem value="1.0">1.0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="robotsTxt">
                  {language === "en" ? "Robots.txt Content" : "Contenido de Robots.txt"}
                </Label>
                <Textarea
                  id="robotsTxt"
                  value={settings.technical.robotsTxt}
                  onChange={(e) => handleChange("technical", "robotsTxt", e.target.value)}
                  className="font-mono text-sm"
                  rows={6}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="googleVerification">
                  {language === "en" ? "Google Site Verification" : "Verificación de Sitio de Google"}
                </Label>
                <Input
                  id="googleVerification"
                  value={settings.technical.googleVerification}
                  onChange={(e) => handleChange("technical", "googleVerification", e.target.value)}
                  placeholder="google-site-verification=..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bingVerification">
                  {language === "en" ? "Bing Site Verification" : "Verificación de Sitio de Bing"}
                </Label>
                <Input
                  id="bingVerification"
                  value={settings.technical.bingVerification}
                  onChange={(e) => handleChange("technical", "bingVerification", e.target.value)}
                  placeholder="msvalidate.01=..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="analyticsId">
                  {language === "en" ? "Google Analytics ID" : "ID de Google Analytics"}
                </Label>
                <Input
                  id="analyticsId"
                  value={settings.technical.analyticsId}
                  onChange={(e) => handleChange("technical", "analyticsId", e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Settings */}
        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Social Media" : "Redes Sociales"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Configure social media integration"
                  : "Configura la integración con redes sociales"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twitterUsername">
                  {language === "en" ? "Twitter Username" : "Nombre de Usuario de Twitter"}
                </Label>
                <Input
                  id="twitterUsername"
                  value={settings.social.twitterUsername}
                  onChange={(e) => handleChange("social", "twitterUsername", e.target.value)}
                  placeholder="@username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebookAppId">
                  {language === "en" ? "Facebook App ID" : "ID de Aplicación de Facebook"}
                </Label>
                <Input
                  id="facebookAppId"
                  value={settings.social.facebookAppId}
                  onChange={(e) => handleChange("social", "facebookAppId", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedinProfile">{language === "en" ? "LinkedIn Profile" : "Perfil de LinkedIn"}</Label>
                <Input
                  id="linkedinProfile"
                  value={settings.social.linkedinProfile}
                  onChange={(e) => handleChange("social", "linkedinProfile", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagramProfile">
                  {language === "en" ? "Instagram Profile" : "Perfil de Instagram"}
                </Label>
                <Input
                  id="instagramProfile"
                  value={settings.social.instagramProfile}
                  onChange={(e) => handleChange("social", "instagramProfile", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schema Settings */}
        <TabsContent value="schema" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Structured Data Schema" : "Esquema de Datos Estructurados"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Configure structured data for rich search results"
                  : "Configura datos estructurados para resultados de búsqueda enriquecidos"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="organizationType">
                  {language === "en" ? "Organization Type" : "Tipo de Organización"}
                </Label>
                <Select
                  value={settings.schema.organizationType}
                  onValueChange={(value) => handleChange("schema", "organizationType", value)}
                >
                  <SelectTrigger id="organizationType">
                    <SelectValue placeholder={language === "en" ? "Select type" : "Seleccionar tipo"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Organization">{language === "en" ? "Organization" : "Organización"}</SelectItem>
                    <SelectItem value="LocalBusiness">
                      {language === "en" ? "Local Business" : "Negocio Local"}
                    </SelectItem>
                    <SelectItem value="Corporation">{language === "en" ? "Corporation" : "Corporación"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizationName">
                  {language === "en" ? "Organization Name" : "Nombre de la Organización"}
                </Label>
                <Input
                  id="organizationName"
                  value={settings.schema.organizationName}
                  onChange={(e) => handleChange("schema", "organizationName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizationLogo">
                  {language === "en" ? "Organization Logo URL" : "URL del Logo de la Organización"}
                </Label>
                <Input
                  id="organizationLogo"
                  value={settings.schema.organizationLogo}
                  onChange={(e) => handleChange("schema", "organizationLogo", e.target.value)}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="contactType">{language === "en" ? "Contact Type" : "Tipo de Contacto"}</Label>
                <Select
                  value={settings.schema.contactType}
                  onValueChange={(value) => handleChange("schema", "contactType", value)}
                >
                  <SelectTrigger id="contactType">
                    <SelectValue placeholder={language === "en" ? "Select type" : "Seleccionar tipo"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer service">
                      {language === "en" ? "Customer Service" : "Servicio al Cliente"}
                    </SelectItem>
                    <SelectItem value="technical support">
                      {language === "en" ? "Technical Support" : "Soporte Técnico"}
                    </SelectItem>
                    <SelectItem value="sales">{language === "en" ? "Sales" : "Ventas"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">{language === "en" ? "Contact Email" : "Email de Contacto"}</Label>
                <Input
                  id="contactEmail"
                  value={settings.schema.contactEmail}
                  onChange={(e) => handleChange("schema", "contactEmail", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">{language === "en" ? "Contact Phone" : "Teléfono de Contacto"}</Label>
                <Input
                  id="contactPhone"
                  value={settings.schema.contactPhone}
                  onChange={(e) => handleChange("schema", "contactPhone", e.target.value)}
                />
              </div>

              <div className="mt-4 p-4 bg-muted rounded-md">
                <h4 className="font-medium mb-2">
                  {language === "en" ? "Schema Preview" : "Vista Previa del Esquema"}
                </h4>
                <pre className="text-xs overflow-auto p-2 bg-background rounded border">
                  {JSON.stringify(
                    {
                      "@context": "https://schema.org",
                      "@type": settings.schema.organizationType,
                      name: settings.schema.organizationName,
                      logo: settings.schema.organizationLogo,
                      contactPoint: {
                        "@type": "ContactPoint",
                        contactType: settings.schema.contactType,
                        email: settings.schema.contactEmail,
                        telephone: settings.schema.contactPhone,
                      },
                    },
                    null,
                    2,
                  )}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              {language === "en" ? "Saving..." : "Guardando..."}
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              {language === "en" ? "Save Settings" : "Guardar Configuración"}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

