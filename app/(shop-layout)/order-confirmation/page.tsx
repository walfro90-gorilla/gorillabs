"use client"

import { useEffect, useState } from "react"
import { useContext } from "react"
import { LanguageContext } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Seo } from "@/components/seo"

export default function OrderConfirmationPage() {
  const router = useRouter()
  const { language } = useContext(LanguageContext)
  const [isClient, setIsClient] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")

  useEffect(() => {
    setIsClient(true)
    // Generate a random order number
    const randomOrderNumber = Math.floor(100000 + Math.random() * 900000).toString()
    setOrderNumber(randomOrderNumber)
  }, [])

  const translations = {
    en: {
      title: "Order Confirmation",
      thankYou: "Thank you for your order!",
      orderNumber: "Order Number",
      orderProcessing: "Your order is being processed.",
      nextSteps: "Next Steps",
      nextStepsText:
        "You will receive an email confirmation shortly. Our team will contact you within 24 hours to discuss the details of your project.",
      contactInfo: "If you have any questions, please contact us at:",
      email: "support@gorilla-labs.com",
      phone: "+1 (555) 123-4567",
      continueShopping: "Continue Shopping",
      backToHome: "Back to Home",
      meta: {
        title: "Order Confirmation | Gorilla Labs",
        description: "Thank you for your order with Gorilla Labs. Your digital services request has been received.",
      },
    },
    es: {
      title: "Confirmación de Pedido",
      thankYou: "¡Gracias por tu pedido!",
      orderNumber: "Número de Pedido",
      orderProcessing: "Tu pedido está siendo procesado.",
      nextSteps: "Próximos Pasos",
      nextStepsText:
        "Recibirás un correo electrónico de confirmación en breve. Nuestro equipo se pondrá en contacto contigo dentro de las próximas 24 horas para discutir los detalles de tu proyecto.",
      contactInfo: "Si tienes alguna pregunta, contáctanos en:",
      email: "soporte@gorilla-labs.com",
      phone: "+1 (555) 123-4567",
      continueShopping: "Continuar Comprando",
      backToHome: "Volver al Inicio",
      meta: {
        title: "Confirmación de Pedido | Gorilla Labs",
        description: "Gracias por tu pedido con Gorilla Labs. Tu solicitud de servicios digitales ha sido recibida.",
      },
    },
  }

  const t = translations[language || "en"]

  // Show a loading state during server-side rendering
  if (!isClient) {
    return (
      <div className="container mx-auto py-10 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">{t.title}</h1>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Seo title={t.meta.title} description={t.meta.description} />
      <div className="container mx-auto py-10 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">{t.title}</h1>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">{t.thankYou}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="bg-muted px-4 py-2 rounded-md">
                <span className="font-medium">{t.orderNumber}: </span>
                <span className="font-bold">{orderNumber}</span>
              </div>
            </div>

            <p className="text-center text-muted-foreground">{t.orderProcessing}</p>

            <div className="space-y-2">
              <h3 className="font-bold text-lg">{t.nextSteps}</h3>
              <p>{t.nextStepsText}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-lg">{t.contactInfo}</h3>
              <p>{t.email}</p>
              <p>{t.phone}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" onClick={() => router.push("/services")}>
              {t.continueShopping}
            </Button>
            <Button onClick={() => router.push("/")}>{t.backToHome}</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
