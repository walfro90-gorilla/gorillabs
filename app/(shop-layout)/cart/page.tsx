"use client"

import { useContext, useState, useEffect } from "react"
import { useCart } from "@/context/cart-context"
import { LanguageContext } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Seo } from "@/components/seo"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CartPage() {
  const { language } = useContext(LanguageContext)
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  const [isUpdating, setIsUpdating] = useState(false)

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
      title: "Your Cart",
      empty: "Your cart is empty",
      product: "Product",
      price: "Price",
      quantity: "Quantity",
      total: "Total",
      subtotal: "Subtotal",
      checkout: "Proceed to Checkout",
      continueShopping: "Continue Shopping",
      clearCart: "Clear Cart",
      meta: {
        title: "Shopping Cart | Gorilla Labs",
        description: "Review your selected services and proceed to checkout.",
      },
    },
    es: {
      title: "Tu Carrito",
      empty: "Tu carrito está vacío",
      product: "Producto",
      price: "Precio",
      quantity: "Cantidad",
      total: "Total",
      subtotal: "Subtotal",
      checkout: "Proceder al Pago",
      continueShopping: "Continuar Comprando",
      clearCart: "Vaciar Carrito",
      meta: {
        title: "Carrito de Compras | Gorilla Labs",
        description: "Revisa tus servicios seleccionados y procede al pago.",
      },
    },
  }

  const t = translations[language || "en"]

  const handleQuantityChange = (id, newQuantity) => {
    if (!isClient || !cart) return
    if (newQuantity < 1) return
    setIsUpdating(true)
    cart.updateQuantity(id, newQuantity)
    setTimeout(() => setIsUpdating(false), 500)
  }

  const calculateSubtotal = () => {
    if (!isClient || !cartItems || !cartItems.length) return 0
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCheckout = () => {
    router.push("/checkout")
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

  return (
    <>
      <Seo title={t.meta.title} description={t.meta.description} />
      <div className="container mx-auto py-10 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">{t.title}</h1>

        {!cartItems || cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl mb-6">{t.empty}</p>
            <Button onClick={() => router.push("/services")}>{t.continueShopping}</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="hidden md:grid md:grid-cols-12 font-medium mb-4 text-muted-foreground">
                  <div className="col-span-6">{t.product}</div>
                  <div className="col-span-2 text-right">{t.price}</div>
                  <div className="col-span-2 text-center">{t.quantity}</div>
                  <div className="col-span-2 text-right">{t.total}</div>
                </div>
                <Separator className="mb-4" />

                <ScrollArea className="w-full">
                  <div className="min-w-[600px] md:min-w-0">
                    {cartItems.map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-4 py-4 items-center border-b">
                        <div className="col-span-6 flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted">
                            <Image
                              src={item.image || "/placeholder.svg?height=64&width=64"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                        </div>

                        <div className="col-span-2 text-right">
                          <div className="md:hidden font-medium inline-block mr-2">{t.price}:</div>$
                          {item.price.toFixed(2)}
                        </div>

                        <div className="col-span-2 flex justify-center">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={isUpdating}
                            >
                              -
                            </Button>
                            <div className="h-8 px-3 flex items-center justify-center border-y">{item.quantity}</div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              disabled={isUpdating}
                            >
                              +
                            </Button>
                          </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                          <div>
                            <div className="md:hidden font-medium inline-block mr-2">{t.total}:</div>$
                            {(item.price * item.quantity).toFixed(2)}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => cart.removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex flex-col items-end gap-4">
                <div className="text-lg font-medium">
                  {t.subtotal}: ${calculateSubtotal().toFixed(2)}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" onClick={() => router.push("/services")}>
                    {t.continueShopping}
                  </Button>
                  <Button variant="outline" onClick={() => cart.clearCart()} className="text-destructive">
                    {t.clearCart}
                  </Button>
                  <Button onClick={handleCheckout}>{t.checkout}</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </>
  )
}
