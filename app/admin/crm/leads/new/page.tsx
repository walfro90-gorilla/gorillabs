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
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/context/language-context"
import { ArrowLeft, Save } from "lucide-react"

export default function NewLeadPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { language } = useLanguage()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    source: "",
    notes: "",
    assignedTo: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validate form
    if (!formData.name || !formData.email || !formData.company) {
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
      title: language === "en" ? "Lead Created" : "Lead Creado",
      description:
        language === "en"
          ? `${formData.name} has been added successfully`
          : `${formData.name} ha sido añadido con éxito`,
    })

    router.push("/admin/crm/leads")
  }

  // Sample team members for assignment
  const teamMembers = [
    { id: "1", name: "Maria Gonzalez" },
    { id: "2", name: "Alex Rodriguez" },
    { id: "3", name: "David Kim" },
    { id: "4", name: "Sofia Patel" },
  ]

  // Lead source options
  const sourceOptions = [
    { value: "website", label: language === "en" ? "Website" : "Sitio Web" },
    { value: "referral", label: language === "en" ? "Referral" : "Referencia" },
    { value: "google", label: language === "en" ? "Google" : "Google" },
    { value: "linkedin", label: language === "en" ? "LinkedIn" : "LinkedIn" },
    { value: "tradeshow", label: language === "en" ? "Trade Show" : "Feria Comercial" },
    { value: "other", label: language === "en" ? "Other" : "Otro" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">{language === "en" ? "Add New Lead" : "Añadir Nuevo Lead"}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === "en" ? "Contact Information" : "Información de Contacto"}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{language === "en" ? "Full Name" : "Nombre Completo"} *</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{language === "en" ? "Email" : "Correo Electrónico"} *</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{language === "en" ? "Phone Number" : "Número de Teléfono"}</Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company">{language === "en" ? "Company" : "Empresa"} *</Label>
                    <Input id="company" name="company" value={formData.company} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">{language === "en" ? "Position" : "Cargo"}</Label>
                    <Input id="position" name="position" value={formData.position} onChange={handleChange} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === "en" ? "Lead Details" : "Detalles del Lead"}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="source">{language === "en" ? "Lead Source" : "Fuente del Lead"}</Label>
                  <Select value={formData.source} onValueChange={(value) => handleSelectChange("source", value)}>
                    <SelectTrigger id="source">
                      <SelectValue placeholder={language === "en" ? "Select source" : "Seleccionar fuente"} />
                    </SelectTrigger>
                    <SelectContent>
                      {sourceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignedTo">{language === "en" ? "Assigned To" : "Asignado A"}</Label>
                  <Select
                    value={formData.assignedTo}
                    onValueChange={(value) => handleSelectChange("assignedTo", value)}
                  >
                    <SelectTrigger id="assignedTo">
                      <SelectValue
                        placeholder={language === "en" ? "Select team member" : "Seleccionar miembro del equipo"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">{language === "en" ? "Notes" : "Notas"}</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={5}
                    placeholder={
                      language === "en"
                        ? "Add any additional information about this lead..."
                        : "Añade cualquier información adicional sobre este lead..."
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
                      ? "Save Lead"
                      : "Guardar Lead"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
