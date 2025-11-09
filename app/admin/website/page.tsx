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
import { Save, Upload, Plus, Trash2 } from "lucide-react"

export default function WebsiteContentPage() {
  const { toast } = useToast()
  const { language } = useLanguage()
  const [loading, setLoading] = useState(false)

  // Hero section content
  const [heroContent, setHeroContent] = useState({
    title:
      language === "en"
        ? "Your Goal is Our!"
        : "Transformamos tus Ideas en Soluciones Tecnológicas",
    description:
      language === "en"
        ? "Gorilla-Labs is a technology startup specializing in creating websites, e-commerce platforms, and applications for businesses and companies."
        : "Gorilla-Labs es una startup de tecnología especializada en crear sitios web, plataformas de comercio electrónico y aplicaciones para negocios y empresas.",
    ctaText: language === "en" ? "Let's Talk About Your Project" : "Hablemos de tu Proyecto",
    backgroundVideo: "/placeholder.svg?height=1080&width=1920",
    phrases: [
      language === "en" ? "Web Development" : "Desarrollo Web",
      language === "en" ? "Mobile Applications" : "Aplicaciones Móviles",
      language === "en" ? "E-commerce Solutions" : "Soluciones E-commerce",
    ],
  })

  // About section content
  const [aboutContent, setAboutContent] = useState({
    title: language === "en" ? "About Gorilla-Labs" : "Acerca de Gorilla-Labs",
    description:
      language === "en"
        ? "We are a team of passionate technologists dedicated to transforming businesses through innovative digital solutions."
        : "Somos un equipo de tecnólogos apasionados dedicados a transformar negocios a través de soluciones digitales innovadoras.",
    longDescription:
      language === "en"
        ? "Founded in 2020, Gorilla-Labs has quickly established itself as a leader in web development, e-commerce solutions, and mobile applications. Our mission is to help businesses of all sizes leverage technology to grow, innovate, and succeed in the digital age."
        : "Fundada en 2020, Gorilla-Labs se ha establecido rápidamente como líder en desarrollo web, soluciones de comercio electrónico y aplicaciones móviles. Nuestra misión es ayudar a empresas de todos los tamaños a aprovechar la tecnología para crecer, innovar y tener éxito en la era digital.",
    image: "/placeholder.svg?height=600&width=600",
  })

  // Contact information
  const [contactInfo, setContactInfo] = useState({
    email: "info@gorillabs.dev",
    phone: "+52 (656) 573 1023",
    address: "Avenida Paseo Triunfo de la Republica, Cd Juarez, Chih, Mexico",
    businessHours: {
      weekdays: "9am - 6pm",
      saturday: "10am - 2pm",
      sunday: "Closed",
    },
  })

  // Social media links
  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  })

  // Footer content
  const [footerContent, setFooterContent] = useState({
    description:
      language === "en"
        ? "Gorilla-Labs is a technology startup specializing in creating websites, e-commerce platforms, and applications for businesses and companies."
        : "Gorilla-Labs es una startup de tecnología especializada en crear sitios web, plataformas de comercio electrónico y aplicaciones para negocios y empresas.",
    copyright: `© ${new Date().getFullYear()} Gorilla-Labs. ${language === "en" ? "All rights reserved." : "Todos los derechos reservados."}`,
  })

  // Handle hero content change
  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setHeroContent((prev) => ({ ...prev, [name]: value }))
  }

  // Handle about content change
  const handleAboutChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAboutContent((prev) => ({ ...prev, [name]: value }))
  }

  // Handle contact info change
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactInfo((prev) => ({ ...prev, [name]: value }))
  }

  // Handle business hours change
  const handleBusinessHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setContactInfo((prev) => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [name]: value,
      },
    }))
  }

  // Handle social links change
  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSocialLinks((prev) => ({ ...prev, [name]: value }))
  }

  // Handle footer content change
  const handleFooterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFooterContent((prev) => ({ ...prev, [name]: value }))
  }

  // Handle phrase change
  const handlePhraseChange = (index: number, value: string) => {
    const newPhrases = [...heroContent.phrases]
    newPhrases[index] = value
    setHeroContent((prev) => ({ ...prev, phrases: newPhrases }))
  }

  // Add new phrase
  const addPhrase = () => {
    setHeroContent((prev) => ({
      ...prev,
      phrases: [...prev.phrases, ""],
    }))
  }

  // Remove phrase
  const removePhrase = (index: number) => {
    const newPhrases = [...heroContent.phrases]
    newPhrases.splice(index, 1)
    setHeroContent((prev) => ({ ...prev, phrases: newPhrases }))
  }

  // Save all content
  const saveContent = async () => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: language === "en" ? "Content Saved" : "Contenido Guardado",
      description:
        language === "en"
          ? "Website content has been updated successfully"
          : "El contenido del sitio web se ha actualizado con éxito",
    })

    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{language === "en" ? "Website Content" : "Contenido del Sitio Web"}</h1>
        <Button onClick={saveContent} disabled={loading} className="gap-2">
          <Save className="h-4 w-4" />
          {loading
            ? language === "en"
              ? "Saving..."
              : "Guardando..."
            : language === "en"
              ? "Save Changes"
              : "Guardar Cambios"}
        </Button>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hero">{language === "en" ? "Hero Section" : "Sección Principal"}</TabsTrigger>
          <TabsTrigger value="about">{language === "en" ? "About" : "Acerca de"}</TabsTrigger>
          <TabsTrigger value="contact">{language === "en" ? "Contact" : "Contacto"}</TabsTrigger>
          <TabsTrigger value="social">{language === "en" ? "Social Media" : "Redes Sociales"}</TabsTrigger>
          <TabsTrigger value="footer">{language === "en" ? "Footer" : "Pie de Página"}</TabsTrigger>
        </TabsList>

        {/* Hero Section Tab */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Hero Section Content" : "Contenido de la Sección Principal"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Edit the main banner content that appears on the homepage"
                  : "Edita el contenido del banner principal que aparece en la página de inicio"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">{language === "en" ? "Title" : "Título"}</Label>
                <Input id="title" name="title" value={heroContent.title} onChange={handleHeroChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{language === "en" ? "Description" : "Descripción"}</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={heroContent.description}
                  onChange={handleHeroChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ctaText">
                  {language === "en" ? "Call to Action Text" : "Texto de Llamada a la Acción"}
                </Label>
                <Input id="ctaText" name="ctaText" value={heroContent.ctaText} onChange={handleHeroChange} />
              </div>

              <div className="space-y-2">
                <Label>{language === "en" ? "Background Video" : "Video de Fondo"}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="backgroundVideo"
                    name="backgroundVideo"
                    value={heroContent.backgroundVideo}
                    onChange={handleHeroChange}
                  />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "Upload a video or provide a URL" : "Sube un video o proporciona una URL"}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>{language === "en" ? "Animated Phrases" : "Frases Animadas"}</Label>
                  <Button variant="outline" size="sm" onClick={addPhrase} className="gap-1">
                    <Plus className="h-3 w-3" />
                    {language === "en" ? "Add Phrase" : "Añadir Frase"}
                  </Button>
                </div>

                {heroContent.phrases.map((phrase, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={phrase}
                      onChange={(e) => handlePhraseChange(index, e.target.value)}
                      placeholder={language === "en" ? `Phrase ${index + 1}` : `Frase ${index + 1}`}
                    />
                    {heroContent.phrases.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removePhrase(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Tab */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "About Section Content" : "Contenido de la Sección Acerca de"}</CardTitle>
              <CardDescription>
                {language === "en" ? "Edit the about section content" : "Edita el contenido de la sección acerca de"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aboutTitle">{language === "en" ? "Title" : "Título"}</Label>
                <Input id="aboutTitle" name="title" value={aboutContent.title} onChange={handleAboutChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aboutDescription">
                  {language === "en" ? "Short Description" : "Descripción Corta"}
                </Label>
                <Textarea
                  id="aboutDescription"
                  name="description"
                  value={aboutContent.description}
                  onChange={handleAboutChange}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aboutLongDescription">
                  {language === "en" ? "Long Description" : "Descripción Larga"}
                </Label>
                <Textarea
                  id="aboutLongDescription"
                  name="longDescription"
                  value={aboutContent.longDescription}
                  onChange={handleAboutChange}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>{language === "en" ? "About Image" : "Imagen de Acerca de"}</Label>
                <div className="flex items-center gap-2">
                  <Input id="aboutImage" name="image" value={aboutContent.image} onChange={handleAboutChange} />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Contact Information" : "Información de Contacto"}</CardTitle>
              <CardDescription>
                {language === "en" ? "Edit your contact details" : "Edita tus datos de contacto"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">{language === "en" ? "Email Address" : "Correo Electrónico"}</Label>
                <Input id="email" name="email" value={contactInfo.email} onChange={handleContactChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{language === "en" ? "Phone Number" : "Número de Teléfono"}</Label>
                <Input id="phone" name="phone" value={contactInfo.phone} onChange={handleContactChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">{language === "en" ? "Address" : "Dirección"}</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={contactInfo.address}
                  onChange={handleContactChange}
                  rows={2}
                />
              </div>

              <div className="space-y-4">
                <Label>{language === "en" ? "Business Hours" : "Horario de Atención"}</Label>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="weekdays">{language === "en" ? "Weekdays" : "Días Laborables"}</Label>
                    <Input
                      id="weekdays"
                      name="weekdays"
                      value={contactInfo.businessHours.weekdays}
                      onChange={handleBusinessHoursChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="saturday">{language === "en" ? "Saturday" : "Sábado"}</Label>
                    <Input
                      id="saturday"
                      name="saturday"
                      value={contactInfo.businessHours.saturday}
                      onChange={handleBusinessHoursChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sunday">{language === "en" ? "Sunday" : "Domingo"}</Label>
                    <Input
                      id="sunday"
                      name="sunday"
                      value={contactInfo.businessHours.sunday}
                      onChange={handleBusinessHoursChange}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Social Media Links" : "Enlaces de Redes Sociales"}</CardTitle>
              <CardDescription>
                {language === "en" ? "Edit your social media profiles" : "Edita tus perfiles de redes sociales"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input id="facebook" name="facebook" value={socialLinks.facebook} onChange={handleSocialChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input id="twitter" name="twitter" value={socialLinks.twitter} onChange={handleSocialChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" name="instagram" value={socialLinks.instagram} onChange={handleSocialChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input id="linkedin" name="linkedin" value={socialLinks.linkedin} onChange={handleSocialChange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Footer Tab */}
        <TabsContent value="footer">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Footer Content" : "Contenido del Pie de Página"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Edit the footer section content"
                  : "Edita el contenido de la sección del pie de página"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="footerDescription">
                  {language === "en" ? "Footer Description" : "Descripción del Pie de Página"}
                </Label>
                <Textarea
                  id="footerDescription"
                  name="description"
                  value={footerContent.description}
                  onChange={handleFooterChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="copyright">{language === "en" ? "Copyright Text" : "Texto de Derechos de Autor"}</Label>
                <Input id="copyright" name="copyright" value={footerContent.copyright} onChange={handleFooterChange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
