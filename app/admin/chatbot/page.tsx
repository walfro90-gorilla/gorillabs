"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/context/language-context"
import { Save, MessageSquare, Settings, Info } from "lucide-react"

interface ChatbotConfig {
  apiKey: string
  businessName: string
  location: string
  services: string
  pricing: string
  contactInfo: string
  customInstructions: string
  model: string
  temperature: number
  maxTokens: number
  provider: string
}

export default function ChatbotConfigPage() {
  const { language } = useLanguage()
  const { toast } = useToast()
  const [config, setConfig] = useState<ChatbotConfig>({
    apiKey: "AIzaSyBbSSgrCMht1xHSGPSO1QSauy6ROYLn-_U",
    businessName: "Gorilla Labs",
    location: "El Paso, Texas & Ciudad Juárez, Mexico",
    services: "Web Development, E-commerce Solutions, Mobile App Development, Digital Marketing",
    pricing: "Basic Website ($1,200), E-commerce Standard ($1,600), Mobile App Development ($45/hour)",
    contactInfo: "info@gorilla-labs.com, +1 (234) 567-890",
    customInstructions:
      "Always respond in a helpful, professional manner. Focus on understanding client needs and directing them to appropriate services.",
    model: "gemini-1.5-flash-latest",
    temperature: 0.7,
    maxTokens: 200,
    provider: "google",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Here you would typically save to a database or configuration file
      // For now, we'll save to localStorage
      localStorage.setItem("chatbotConfig", JSON.stringify(config))

      toast({
        title: language === "en" ? "Success" : "Éxito",
        description:
          language === "en"
            ? "Chatbot configuration saved successfully"
            : "Configuración del chatbot guardada exitosamente",
      })
    } catch (error) {
      toast({
        title: language === "en" ? "Error" : "Error",
        description: language === "en" ? "Failed to save configuration" : "Error al guardar la configuración",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestChat = async () => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Hello, can you tell me about your services?",
          language: "en",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        toast({
          title: language === "en" ? "Test Successful" : "Prueba Exitosa",
          description:
            language === "en"
              ? `Chatbot is working correctly (Source: ${data.source})`
              : `El chatbot está funcionando correctamente (Fuente: ${data.source})`,
        })
      } else {
        throw new Error("Test failed")
      }
    } catch (error) {
      toast({
        title: language === "en" ? "Test Failed" : "Prueba Fallida",
        description:
          language === "en" ? "There was an error testing the chatbot" : "Hubo un error al probar el chatbot",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    // Load saved configuration
    const savedConfig = localStorage.getItem("chatbotConfig")
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {language === "en" ? "Chatbot Configuration" : "Configuración del Chatbot"}
          </h1>
          <p className="text-muted-foreground">
            {language === "en"
              ? "Configure your AI chatbot settings and business information (Now using Google Gemini API)"
              : "Configura los ajustes del chatbot IA e información del negocio (Ahora usando API de Google Gemini)"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleTestChat} variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            {language === "en" ? "Test Chat" : "Probar Chat"}
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {language === "en" ? "Save Configuration" : "Guardar Configuración"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* API Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              {language === "en" ? "API Configuration" : "Configuración de API"}
            </CardTitle>
            <CardDescription>
              {language === "en"
                ? "Google Gemini API settings and model configuration"
                : "Configuración de API de Google Gemini y modelo"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="provider">{language === "en" ? "AI Provider" : "Proveedor de IA"}</Label>
              <select
                id="provider"
                value={config.provider}
                onChange={(e) => setConfig({ ...config, provider: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="google">Google Gemini</option>
                <option value="openai">OpenAI (Backup)</option>
                <option value="deepseek">DeepSeek (Backup)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="apiKey">{language === "en" ? "Google API Key" : "Clave API de Google"}</Label>
              <Input
                id="apiKey"
                type="password"
                value={config.apiKey}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                placeholder="AIza..."
              />
            </div>
            <div>
              <Label htmlFor="model">{language === "en" ? "Model" : "Modelo"}</Label>
              <select
                id="model"
                value={config.model}
                onChange={(e) => setConfig({ ...config, model: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="gemini-1.5-flash-latest">Gemini 1.5 Flash (Latest)</option>
                <option value="gemini-1.5-pro-latest">Gemini 1.5 Pro (Latest)</option>
                <option value="gemini-pro">Gemini Pro</option>
              </select>
            </div>
            <div>
              <Label htmlFor="temperature">
                {language === "en" ? "Temperature" : "Temperatura"} ({config.temperature})
              </Label>
              <input
                id="temperature"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={config.temperature}
                onChange={(e) => setConfig({ ...config, temperature: Number.parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="maxTokens">{language === "en" ? "Max Tokens" : "Tokens Máximos"}</Label>
              <Input
                id="maxTokens"
                type="number"
                value={config.maxTokens}
                onChange={(e) => setConfig({ ...config, maxTokens: Number.parseInt(e.target.value) })}
                min="50"
                max="500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              {language === "en" ? "Business Information" : "Información del Negocio"}
            </CardTitle>
            <CardDescription>
              {language === "en"
                ? "Information about your business for the chatbot to use"
                : "Información sobre tu negocio para que use el chatbot"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="businessName">{language === "en" ? "Business Name" : "Nombre del Negocio"}</Label>
              <Input
                id="businessName"
                value={config.businessName}
                onChange={(e) => setConfig({ ...config, businessName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="location">{language === "en" ? "Location" : "Ubicación"}</Label>
              <Input
                id="location"
                value={config.location}
                onChange={(e) => setConfig({ ...config, location: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="services">{language === "en" ? "Services" : "Servicios"}</Label>
              <Textarea
                id="services"
                value={config.services}
                onChange={(e) => setConfig({ ...config, services: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="pricing">{language === "en" ? "Pricing Information" : "Información de Precios"}</Label>
              <Textarea
                id="pricing"
                value={config.pricing}
                onChange={(e) => setConfig({ ...config, pricing: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="contactInfo">
                {language === "en" ? "Contact Information" : "Información de Contacto"}
              </Label>
              <Input
                id="contactInfo"
                value={config.contactInfo}
                onChange={(e) => setConfig({ ...config, contactInfo: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "Custom Instructions" : "Instrucciones Personalizadas"}</CardTitle>
          <CardDescription>
            {language === "en"
              ? "Additional instructions for how the chatbot should behave"
              : "Instrucciones adicionales sobre cómo debe comportarse el chatbot"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={config.customInstructions}
            onChange={(e) => setConfig({ ...config, customInstructions: e.target.value })}
            rows={4}
            placeholder={
              language === "en"
                ? "Enter custom instructions for the chatbot..."
                : "Ingresa instrucciones personalizadas para el chatbot..."
            }
          />
        </CardContent>
      </Card>
    </div>
  )
}
