"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Mail } from "lucide-react"
import Link from "next/link"
import { Seo } from "@/components/seo"
import { useLanguage } from "@/context/language-context"

export default function OrderConfirmationPage() {
  const { language } = useLanguage()
  const [orderNumber] = useState(() => Math.random().toString(36).substr(2, 9).toUpperCase())

  return (
    <div className="container mx-auto py-16">
      <Seo
        title="Order Confirmation - Thank You"
        description="Your order has been successfully placed. Thank you for choosing Gorilla Labs for your technology needs. Order confirmation and next steps."
        keywords="order confirmation, thank you, web development order, e-commerce services, mobile app development"
        canonical="https://gorillalabs.dev/order-confirmation"
        type="website"
        language={language}
      />

      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />

        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>

        <p className="text-lg text-muted-foreground mb-8">
          Thank you for your order. We've received your request and will be in touch shortly to discuss your project
          details.
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Order Number:</span>
              <span className="font-mono font-semibold">{orderNumber}</span>
            </div>

            <div className="flex justify-between">
              <span>Order Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>

            <div className="flex justify-between">
              <span>Status:</span>
              <span className="text-green-600 font-semibold">Confirmed</span>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">What's Next?</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="mx-auto h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Email Confirmation</h3>
                <p className="text-sm text-muted-foreground">
                  You'll receive a detailed confirmation email within the next few minutes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Download className="mx-auto h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Project Consultation</h3>
                <p className="text-sm text-muted-foreground">
                  Our team will contact you within 24 hours to schedule a consultation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 space-x-4">
          <Link href="/services">
            <Button variant="outline">Browse More Services</Button>
          </Link>

          <Link href="/contact">
            <Button>Contact Support</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
