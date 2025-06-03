"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/context/language-context"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const { toast } = useToast()
  const { translations, language } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    serviceType: "web",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, serviceType: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: language === "en" ? "Message Sent" : "Mensaje Enviado",
      description:
        language === "en"
          ? "We'll get back to you as soon as possible!"
          : "¡Nos pondremos en contacto contigo lo antes posible!",
    })

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      serviceType: "web",
    })

    setLoading(false)
  }

  return (
    <div className="container py-16">
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-4xl font-bold">{language === "en" ? "Contact Us" : "Contáctanos"}</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          {language === "en"
            ? "Have a question or want to discuss a project? Get in touch with our team and we'll get back to you as soon as possible."
            : "¿Tienes una pregunta o quieres discutir un proyecto? Ponte en contacto con nuestro equipo y te responderemos lo antes posible."}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Get in Touch" : "Ponte en Contacto"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "We're here to help with any questions you may have."
                  : "Estamos aquí para ayudarte con cualquier pregunta que puedas tener."}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{language === "en" ? "Email" : "Correo Electrónico"}</p>
                  <a href="mailto:info@gorilla-labs.com" className="text-muted-foreground hover:text-primary">
                    info@gorilla-labs.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{language === "en" ? "Phone" : "Teléfono"}</p>
                  <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{language === "en" ? "Address" : "Dirección"}</p>
                  <p className="text-muted-foreground">
                    123 Tech Street
                    <br />
                    Innovation District
                    <br />
                    {language === "en" ? "City, State 12345" : "Ciudad, Estado 12345"}
                  </p>
                </div>
              </div>

              <div className="rounded-md bg-muted p-4">
                <p className="mb-2 font-medium">{language === "en" ? "Business Hours" : "Horario de Atención"}</p>
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "Monday - Friday: 9am - 6pm" : "Lunes - Viernes: 9am - 6pm"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "Saturday: 10am - 2pm" : "Sábado: 10am - 2pm"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "Sunday: Closed" : "Domingo: Cerrado"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Send Us a Message" : "Envíanos un Mensaje"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Fill out the form below and we'll get back to you as soon as possible."
                  : "Completa el formulario a continuación y te responderemos lo antes posible."}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{language === "en" ? "Full Name" : "Nombre Completo"}</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder={language === "en" ? "John Doe" : "Juan Pérez"}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{language === "en" ? "Email" : "Correo Electrónico"}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={language === "en" ? "john@example.com" : "juan@ejemplo.com"}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{language === "en" ? "Phone (Optional)" : "Teléfono (Opcional)"}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+1 (234) 567-890"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{language === "en" ? "Subject" : "Asunto"}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder={language === "en" ? "Project Inquiry" : "Consulta de Proyecto"}
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{language === "en" ? "Service Type" : "Tipo de Servicio"}</Label>
                  <RadioGroup
                    value={formData.serviceType}
                    onValueChange={handleRadioChange}
                    className="grid gap-2 sm:grid-cols-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="web" id="web" />
                      <Label htmlFor="web" className="font-normal">
                        {language === "en" ? "Web Development" : "Desarrollo Web"}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mobile" id="mobile" />
                      <Label htmlFor="mobile" className="font-normal">
                        {language === "en" ? "Mobile Apps" : "Aplicaciones Móviles"}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ecommerce" id="ecommerce" />
                      <Label htmlFor="ecommerce" className="font-normal">
                        {language === "en" ? "E-commerce" : "Comercio Electrónico"}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="marketing" id="marketing" />
                      <Label htmlFor="marketing" className="font-normal">
                        {language === "en" ? "Marketing" : "Marketing"}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="industry" id="industry" />
                      <Label htmlFor="industry" className="font-normal">
                        {language === "en" ? "Industry Solutions" : "Soluciones Industriales"}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="font-normal">
                        {language === "en" ? "Other" : "Otro"}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{language === "en" ? "Message" : "Mensaje"}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={
                      language === "en"
                        ? "Tell us about your project or inquiry..."
                        : "Cuéntanos sobre tu proyecto o consulta..."
                    }
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full gap-2" disabled={loading}>
                  {loading
                    ? language === "en"
                      ? "Sending..."
                      : "Enviando..."
                    : language === "en"
                      ? "Send Message"
                      : "Enviar Mensaje"}
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-8 text-center text-2xl font-bold">{language === "en" ? "Find Us" : "Encuéntranos"}</h2>
        <div className="rounded-lg overflow-hidden h-[400px] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316249594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzEnMzkuNSJOIDPCsDIyJzMxLjEiRQ!5e0!3m2!1sen!2sng!4v1627309850095!5m2!1sen!2sng"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Gorilla-Labs Location"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

