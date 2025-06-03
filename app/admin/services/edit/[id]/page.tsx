"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Upload, Plus, X } from "lucide-react"

// Mock function to get service data
const getServiceData = (id: string) => {
  const services = [
    {
      id: "web-basic",
      title: "Basic Website",
      description: "Professional website with up to 5 pages, responsive design, and SEO optimization",
      longDescription:
        "Our Basic Website package provides everything you need to establish a professional online presence. This package includes up to 5 custom-designed pages, fully responsive layout for all devices, basic SEO optimization, contact form integration, and Google Analytics setup.",
      price: "999",
      category: "web",
      featured: true,
      deliveryTime: "2-3 weeks",
      features: [
        "Up to 5 custom pages",
        "Mobile responsive design",
        "Basic SEO optimization",
        "Contact form",
        "Google Analytics integration",
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: "ecomm-standard",
      title: "Standard E-commerce",
      description: "Complete online store with product catalog, payment gateway, and order management",
      longDescription:
        "Launch your online store with our Standard E-commerce package. This solution includes a professionally designed online store, product catalog management, secure payment gateway integration, shopping cart functionality, and order management system.",
      price: "1999",
      category: "ecommerce",
      featured: true,
      deliveryTime: "3-5 weeks",
      features: [
        "Product catalog management",
        "Secure payment gateway",
        "Shopping cart functionality",
        "Order management system",
        "Customer accounts",
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
  ]

  return services.find((service) => service.id === id)
}

export default function EditServicePage() {
  const params = useParams()
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    price: "",
    category: "",
    featured: false,
    deliveryTime: "",
    features: [""],
    gallery: ["", "", ""],
  })

  useEffect(() => {
    if (params.id) {
      const serviceData = getServiceData(params.id as string)
      if (serviceData) {
        setFormData({
          title: serviceData.title,
          description: serviceData.description,
          longDescription: serviceData.longDescription,
          price: serviceData.price,
          category: serviceData.category,
          featured: serviceData.featured,
          deliveryTime: serviceData.deliveryTime,
          features: serviceData.features,
          gallery: serviceData.gallery,
        })
      } else {
        // Service not found, redirect to services page
        router.push("/admin/services")
      }
      setInitialLoading(false)
    }
  }, [params.id, router])

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

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData((prev) => ({ ...prev, features: newFeatures }))
  }

  const addFeature = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }))
  }

  const removeFeature = (index: number) => {
    const newFeatures = [...formData.features]
    newFeatures.splice(index, 1)
    setFormData((prev) => ({ ...prev, features: newFeatures }))
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
    if (!formData.title || !formData.description || !formData.price || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Service Updated",
      description: "The service has been updated successfully",
    })

    router.push("/admin/services")
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Edit Service</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Service Title *</Label>
                  <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Short Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longDescription">Long Description</Label>
                  <Textarea
                    id="longDescription"
                    name="longDescription"
                    value={formData.longDescription}
                    onChange={handleChange}
                    rows={6}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web">Web Development</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="mobile">Mobile Apps</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="industry">Industry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryTime">Delivery Time</Label>
                  <Input
                    id="deliveryTime"
                    name="deliveryTime"
                    placeholder="e.g., 2-3 weeks"
                    value={formData.deliveryTime}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Switch id="featured" checked={formData.featured} onCheckedChange={handleSwitchChange} />
                  <Label htmlFor="featured">Featured Service</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Main Image *</Label>
                  <div className="flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 2MB)</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Gallery Images</Label>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {formData.gallery.map((image, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex h-24 cursor-pointer items-center justify-center rounded-md border border-dashed">
                          <Upload className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <Input
                          placeholder="Image URL"
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
                <CardTitle>Features</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder={`Feature ${index + 1}`}
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                    />
                    {formData.features.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeFeature(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}

                <Button type="button" variant="outline" className="w-full gap-2" onClick={addFeature}>
                  <Plus className="h-4 w-4" />
                  Add Feature
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Related Services</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  <Label>Select Related Services</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-basic">Basic Website</SelectItem>
                      <SelectItem value="web-premium">Premium Website</SelectItem>
                      <SelectItem value="ecomm-standard">Standard E-commerce</SelectItem>
                      <SelectItem value="mobile-app">Custom Mobile App</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Selected Related Services</p>
                  <p className="text-sm text-muted-foreground">No related services selected</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Updating..." : "Update Service"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
