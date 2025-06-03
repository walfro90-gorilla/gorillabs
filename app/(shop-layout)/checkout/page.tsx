"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/context/cart-context"
import { useContext } from "react"
import { LanguageContext } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Seo } from "@/components/seo"

export default function CheckoutPage() {
  const router = useRouter()
  const { language } = useContext(LanguageContext)
  const [isClient, setIsClient] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "credit-card",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Use the cart hook safely only on the client side
  const cart = useCart()
  const [cartItems, setCartItems] = useState([])

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true)
    if (cart && cart.cartItems) {
      setCartItems(cart.cartItems)
    }
  }, [cart])

  const translations = {
    en: {
      title: "Checkout",
      empty: "Your cart is empty",
      continueShopping: "Continue Shopping",
      billingInfo: "Billing Information",
      name: "Full Name",
      email: "Email Address",
      address: "Address",
      city: "City",
      postalCode: "Postal Code",
      country: "Country",
      paymentMethod: "Payment Method",
      creditCard: "Credit Card",
      paypal: "PayPal",
      bankTransfer: "Bank Transfer",
      orderSummary: "Order Summary",
      subtotal: "Subtotal",
      tax: "Tax (10%)",
      total: "Total",
      placeOrder: "Place Order",
      backToCart: "Back to Cart",
      meta: {
        title: "Checkout | Gorilla Labs",
        description: "Complete your purchase of digital services from Gorilla Labs.",
      },
    },
    es: {
      title: "Finalizar Compra",
      empty: "Tu carrito está vacío",
      continueShopping: "Continuar Comprando",
      billingInfo: "Información de Facturación",
      name: "Nombre Completo",
      email: "Correo Electrónico",
      address: "Dirección",
      city: "Ciudad",
      postalCode: "Código Postal",
      country: "País",
      paymentMethod: "Método de Pago",
      creditCard: "Tarjeta de Crédito",
      paypal: "PayPal",
      bankTransfer: "Transferencia Bancaria",
      orderSummary: "Resumen del Pedido",
      subtotal: "Subtotal",
      tax: "Impuestos (10%)",
      total: "Total",
      placeOrder: "Realizar Pedido",
      backToCart: "Volver al Carrito",
      meta: {
        title: "Finalizar Compra | Gorilla Labs",
        description: "Completa tu compra de servicios digitales de Gorilla Labs.",
      },
    },
  }

  const t = translations[language || "en"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const calculateSubtotal = () => {
    if (!isClient || !cartItems || !cartItems.length) return 0
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.1
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate order processing
    setTimeout(() => {
      if (cart) {
        cart.clearCart()
      }
      router.push("/order-confirmation")
    }, 1500)
  }

  // Show a loading state or simplified view during server-side rendering
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

  // If cart is empty, show message and redirect button
  if (!cartItems || cartItems.length === 0) {
    return (
      <>
        <Seo title={t.meta.title} description={t.meta.description} />
        <div className="container mx-auto py-10 px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6">{t.title}</h1>
          <div className="text-center py-10">
            <p className="text-xl mb-6">{t.empty}</p>
            <Button onClick={() => router.push("/services")}>{t.continueShopping}</Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Seo title={t.meta.title} description={t.meta.description} />
      <div className="container mx-auto py-10 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">{t.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t.billingInfo}</CardTitle>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.name}</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.email}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">{t.address}</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">{t.city}</Label>
                      <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">{t.postalCode}</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">{t.country}</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{t.paymentMethod}</Label>
                    <RadioGroup
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card">{t.creditCard}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal">{t.paypal}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                        <Label htmlFor="bank-transfer">{t.bankTransfer}</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => router.push("/cart")}>
                    {t.backToCart}
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "..." : t.placeOrder}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t.orderSummary}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-2">
                      <div className="relative w-10 h-10 rounded-md overflow-hidden bg-muted">
                        <Image
                          src={item.image || "/placeholder.svg?height=40&width=40"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p>{t.subtotal}</p>
                    <p>${calculateSubtotal().toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>{t.tax}</p>
                    <p>${calculateTax().toFixed(2)}</p>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <p>{t.total}</p>
                    <p>${calculateTotal().toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
