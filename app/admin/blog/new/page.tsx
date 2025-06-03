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
import { ArrowLeft, Upload, Save } from "lucide-react"

export default function NewBlogPostPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { language } = useLanguage()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    readTime: "",
    featured: false,
    status: "draft",
    coverImage: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
      setFormData((prev) => ({ ...prev, slug }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, featured: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validate form
    if (!formData.title || !formData.excerpt || !formData.category || !formData.author) {
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
      title: language === "en" ? "Post Created" : "Publicación Creada",
      description:
        language === "en"
          ? `"${formData.title}" has been created successfully`
          : `"${formData.title}" ha sido creada con éxito`,
    })

    router.push("/admin/blog")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">
          {language === "en" ? "Create New Blog Post" : "Crear Nueva Publicación de Blog"}
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
                  <Label htmlFor="title">{language === "en" ? "Post Title" : "Título de la Publicación"} *</Label>
                  <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">{language === "en" ? "URL Slug" : "Slug de URL"} *</Label>
                  <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
                  <p className="text-xs text-muted-foreground">
                    {language === "en"
                      ? "The URL-friendly version of the title. Automatically generated but can be edited."
                      : "La versión amigable para URL del título. Generada automáticamente pero puede ser editada."}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">{language === "en" ? "Excerpt" : "Extracto"} *</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    rows={3}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    {language === "en"
                      ? "A short summary of the post that will appear in blog listings."
                      : "Un breve resumen de la publicación que aparecerá en los listados del blog."}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">{language === "en" ? "Category" : "Categoría"} *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder={language === "en" ? "Select category" : "Seleccionar categoría"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="design">{language === "en" ? "Design" : "Diseño"}</SelectItem>
                        <SelectItem value="ecommerce">
                          {language === "en" ? "E-commerce" : "Comercio Electrónico"}
                        </SelectItem>
                        <SelectItem value="mobile">{language === "en" ? "Mobile" : "Móvil"}</SelectItem>
                        <SelectItem value="marketing">{language === "en" ? "Marketing" : "Marketing"}</SelectItem>
                        <SelectItem value="industry">{language === "en" ? "Industry" : "Industria"}</SelectItem>
                        <SelectItem value="security">{language === "en" ? "Security" : "Seguridad"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">{language === "en" ? "Author" : "Autor"} *</Label>
                    <Input id="author" name="author" value={formData.author} onChange={handleChange} required />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="readTime">
                      {language === "en" ? "Read Time (minutes)" : "Tiempo de Lectura (minutos)"}
                    </Label>
                    <Input
                      id="readTime"
                      name="readTime"
                      type="number"
                      min="1"
                      value={formData.readTime}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">{language === "en" ? "Status" : "Estado"}</Label>
                    <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder={language === "en" ? "Select status" : "Seleccionar estado"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">{language === "en" ? "Draft" : "Borrador"}</SelectItem>
                        <SelectItem value="published">{language === "en" ? "Published" : "Publicado"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch id="featured" checked={formData.featured} onCheckedChange={handleSwitchChange} />
                  <Label htmlFor="featured">{language === "en" ? "Featured Post" : "Publicación Destacada"}</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{language === "en" ? "Cover Image" : "Imagen de Portada"}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{language === "en" ? "Upload Cover Image" : "Subir Imagen de Portada"}</Label>
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
                  <Label htmlFor="coverImage">
                    {language === "en" ? "Or Enter Image URL" : "O Ingresa URL de la Imagen"}
                  </Label>
                  <Input
                    id="coverImage"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleChange}
                    placeholder={language === "en" ? "https://example.com/image.jpg" : "https://ejemplo.com/imagen.jpg"}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === "en" ? "Content" : "Contenido"}</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="content">
                    {language === "en" ? "Post Content" : "Contenido de la Publicación"} *
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={20}
                    required
                    placeholder={
                      language === "en"
                        ? "Write your post content here... HTML is supported."
                        : "Escribe el contenido de tu publicación aquí... Se admite HTML."
                    }
                  />
                </div>
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
                      ? "Save Post"
                      : "Guardar Publicación"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
