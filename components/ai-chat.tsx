"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLanguage } from "@/context/language-context"
import { MessageSquare, X, Send, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: string
  sender: "user" | "agent"
  text: string
  timestamp: Date
}

export default function AIChat() {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initial greeting message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage = {
        id: Date.now().toString(),
        sender: "agent",
        text:
          language === "en"
            ? "Hello! I'm Gorilla-Labs AI assistant. How can I help you today?"
            : "¡Hola! Soy el asistente de IA de Gorilla-Labs. ¿Cómo puedo ayudarte hoy?",
        timestamp: new Date(),
      }
      setMessages([initialMessage])
    }
  }, [isOpen, messages.length, language])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate AI response
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === "user") {
      setIsTyping(true)

      const timer = setTimeout(() => {
        // Here we would normally call the OpenAI API
        // For now, we'll simulate responses based on keywords
        const userMessage = messages[messages.length - 1].text.toLowerCase()
        let aiResponse = ""

        if (language === "en") {
          if (userMessage.includes("pricing") || userMessage.includes("cost") || userMessage.includes("price")) {
            aiResponse =
              "Our pricing varies depending on the specific requirements of your project. For a basic website, prices start at $999. For e-commerce solutions, prices start at $1,999. Would you like to schedule a consultation for a personalized quote?"
          } else if (userMessage.includes("contact") || userMessage.includes("talk") || userMessage.includes("call")) {
            aiResponse =
              "You can reach our team at info@gorilla-labs.com or call us at +1 (234) 567-890. Alternatively, you can fill out the contact form on our website, and we'll get back to you as soon as possible."
          } else if (userMessage.includes("service") || userMessage.includes("offer")) {
            aiResponse =
              "We offer a range of services including web development, e-commerce solutions, mobile app development, digital marketing, and industry-specific solutions. Each service is customized to meet your specific business needs. Would you like more information about any particular service?"
          } else if (
            userMessage.includes("portfolio") ||
            userMessage.includes("example") ||
            userMessage.includes("work")
          ) {
            aiResponse =
              "You can view our portfolio on our website. We've worked with clients across various industries, including fashion, food delivery, corporate, and manufacturing. Each project showcases our commitment to quality and innovation."
          } else {
            aiResponse =
              "Thank you for your message. Our team is dedicated to providing the best technological solutions for your business. How can we specifically help with your project needs?"
          }
        } else {
          // Spanish responses
          if (userMessage.includes("precio") || userMessage.includes("costo") || userMessage.includes("tarifa")) {
            aiResponse =
              "Nuestros precios varían según los requisitos específicos de tu proyecto. Para un sitio web básico, los precios comienzan en $999. Para soluciones de comercio electrónico, los precios comienzan en $1,999. ¿Te gustaría programar una consulta para obtener un presupuesto personalizado?"
          } else if (
            userMessage.includes("contacto") ||
            userMessage.includes("hablar") ||
            userMessage.includes("llamar")
          ) {
            aiResponse =
              "Puedes contactar a nuestro equipo en info@gorilla-labs.com o llamarnos al +1 (234) 567-890. Alternativamente, puedes completar el formulario de contacto en nuestro sitio web, y nos pondremos en contacto contigo lo antes posible."
          } else if (userMessage.includes("servicio") || userMessage.includes("ofrece")) {
            aiResponse =
              "Ofrecemos una variedad de servicios que incluyen desarrollo web, soluciones de comercio electrónico, desarrollo de aplicaciones móviles, marketing digital y soluciones específicas para la industria. Cada servicio está personalizado para satisfacer las necesidades específicas de tu negocio. ¿Te gustaría más información sobre algún servicio en particular?"
          } else if (
            userMessage.includes("portafolio") ||
            userMessage.includes("ejemplo") ||
            userMessage.includes("trabajo")
          ) {
            aiResponse =
              "Puedes ver nuestro portafolio en nuestro sitio web. Hemos trabajado con clientes en varias industrias, incluyendo moda, entrega de comida, corporativo y manufactura. Cada proyecto muestra nuestro compromiso con la calidad y la innovación."
          } else {
            aiResponse =
              "Gracias por tu mensaje. Nuestro equipo está dedicado a proporcionar las mejores soluciones tecnológicas para tu negocio. ¿Cómo podemos ayudarte específicamente con las necesidades de tu proyecto?"
          }
        }

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "agent",
            text: aiResponse,
            timestamp: new Date(),
          },
        ])

        setIsTyping(false)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [messages, language])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) return

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "user",
        text: message,
        timestamp: new Date(),
      },
    ])

    setMessage("")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-lg"
          size="icon"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card
          className={`fixed bottom-4 right-4 z-50 w-80 shadow-lg transition-all duration-300 md:w-96 ${
            isMinimized ? "h-auto" : "h-[500px]"
          }`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle className="text-sm font-medium">
              {language === "en" ? "Gorilla-Labs AI Assistant" : "Asistente IA de Gorilla-Labs"}
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={toggleMinimize}
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleChat} aria-label="Close chat">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="flex h-[380px] flex-col gap-4 overflow-y-auto p-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex max-w-[80%] gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {msg.sender === "agent" && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glabs-logo.jpg-hrzbXAlZYwpe9notvpjbnI7ZB1vNWW.jpeg"
                            alt="Agent"
                          />
                          <AvatarFallback>GL</AvatarFallback>
                        </Avatar>
                      )}

                      <div>
                        <div
                          className={`rounded-lg p-3 ${
                            msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <p
                          className={`mt-1 text-xs text-muted-foreground ${
                            msg.sender === "user" ? "text-right" : "text-left"
                          }`}
                        >
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex max-w-[80%] gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glabs-logo.jpg-hrzbXAlZYwpe9notvpjbnI7ZB1vNWW.jpeg"
                          alt="Agent"
                        />
                        <AvatarFallback>GL</AvatarFallback>
                      </Avatar>

                      <div className="rounded-lg bg-muted p-3">
                        <div className="flex gap-1">
                          <span className="animate-bounce">•</span>
                          <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                            •
                          </span>
                          <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                            •
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                  <Input
                    placeholder={language === "en" ? "Type your message..." : "Escribe tu mensaje..."}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={!message.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  )
}

