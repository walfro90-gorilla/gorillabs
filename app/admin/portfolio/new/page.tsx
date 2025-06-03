"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/context/language-context"
import { ArrowLeft, Upload, Plus, X, Save } from "lucide-react"

export default function NewPortfolioItemPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { language } = useLanguage()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    client: "",
    date: "",
    image: "",
    gallery: ["", "", ""],
    technologies: [""],
    link: "",
    featured: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, featured: checked }))
  }

  const handleTechnologyChange = (index: number, value: string) => {
    const newTechnologies = [...formData.technologies]
    newTechnologies[index] = value
    setFormData((prev) => ({ ...prev, technologies: newTechnologies }))
  }

  const addTechnology = () => {
    setFormData((prev) => ({ ...prev, technologies: [...prev.technologies, ""] }))
  }

  const removeTechnology = (index: number) => {
    const newTechnologies = [...formData.technologies]
    newTechnologies.splice(index, 1)
    setFormData((prev) => ({ ...prev, technologies: newTechnologies }))
  }

  const handleGalleryChange = (index: number, value: string) => {
    const newGallery = [...formData.gallery]
    newGallery[index] = value
    setFormData((prev) => ({ ...prev, gallery: newGallery }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validate form
    if (!formData.title || !formData.description || !formData.category || !formData.client) {
      toast({
        title: language === "en" ? "Error" : "Error",
        description:
          language === "en" ? "Please fill in all required fields" : "Por favor completa todos los campos requeridos",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: language === "en" ? "Portfolio Item Created" : "Elemento de Portafolio Creado",
      description:
        language === "en"
          ? `"${formData.title}" has been created successfully`
          : `"${formData.title}" ha sido creado con éxito`,
    })

    router.push("/admin/portfolio")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">
          {language === "en" ? "Add New Portfolio Item" : "Añadir Nuevo Elemento de Portafolio"}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === "en" ? "Basic Information" : "Información Básica"}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">{language === "en" ? "Project Title" : "Título del Proyecto"} *</Label>
                  <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">{language === "en" ? "Description" : "Descripción"} *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">{language === "en" ? "Category" : "Categoría"} *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder={language === "en" ? "Select category" : "Seleccionar categoría"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web">{language === "en" ? "Web Development" : "Desarrollo Web"}</SelectItem>
                        <SelectItem value="ecommerce">
                          {language === "en" ? "E-commerce" : "Comercio Electrónico"}
                        </SelectItem>
                        <SelectItem value="mobile">
                          {language === "en" ? "Mobile Apps" : "Aplicaciones Móviles"}
                        </SelectItem>
                        <SelectItem value="marketing">{language === "en" ? "Marketing" : "Marketing"}</SelectItem>
                        <SelectItem value="industry">{language === "en" ? "Industry" : "Industria"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="client">{language === "en" ? "Client" : "Cliente"} *</Label>
                    <Input id="client" name="client" value={formData.client} onChange={handleChange} required />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="date">{language === "en" ? "Completion Date" : "Fecha de Finalización"}</Label>
                    <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="link">{language === "en" ? "Project URL" : "URL del Proyecto"}</Label>
                    <Input
                      id="link"
                      name="link"
                      type="url"
                      placeholder="https://example.com"
                      value={formData.link}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch id="featured" checked={formData.featured} onCheckedChange={handleSwitchChange} />
                  <Label htmlFor="featured">{language === "en" ? "Featured Project" : "Proyecto Destacado"}</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{language === "en" ? "Media" : "Medios"}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{language === "en" ? "Main Image" : "Imagen Principal"} *</Label>
                  <div className="flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {language === "en"
                          ? "Click to upload or drag and drop"
                          : "Haz clic para subir o arrastra y suelta"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {language === "en" ? "SVG, PNG, JPG or GIF (max. 2MB)" : "SVG, PNG, JPG o GIF (máx. 2MB)"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">
                    {language === "en" ? "Or Enter Image URL" : "O Ingresa URL de la Imagen"}
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder={language === "en" ? "https://example.com/image.jpg" : "https://ejemplo.com/imagen.jpg"}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{language === "en" ? "Gallery Images" : "Imágenes de Galería"}</Label>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {formData.gallery.map((image, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex h-24 cursor-pointer items-center justify-center rounded-md border border-dashed">
                          <Upload className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <Input
                          placeholder={language === "en" ? "Image URL" : "URL de la Imagen"}
                          value={image}
                          onChange={(e) => handleGalleryChange(index, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === "en" ? "Technologies" : "Tecnologías"}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {formData.technologies.map((tech, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder={language === "en" ? `Technology ${index + 1}` : `Tecnología ${index + 1}`}
                      value={tech}
                      onChange={(e) => handleTechnologyChange(index, e.target.value)}
                    />
                    {formData.technologies.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeTechnology(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}

                <Button type="button" variant="outline" className="w-full gap-2" onClick={addTechnology}>
                  <Plus className="h-4 w-4" />
                  {language === "en" ? "Add Technology" : "Añadir Tecnología"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Button type="submit" className="w-full gap-2" disabled={loading}>
                  <Save className="h-4 w-4" />
                  {loading
                    ? language === "en"
                      ? "Saving..."
                      : "Guardando..."
                    : language === "en"
                      ? "Save Project"
                      : "Guardar Proyecto"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
