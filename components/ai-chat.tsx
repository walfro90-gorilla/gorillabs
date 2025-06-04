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

  const [isFirstVisit, setIsFirstVisit] = useState(true)
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(false)

  // Initial greeting message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage = {
        id: Date.now().toString(),
        sender: "agent",
        text:
          language === "en"
            ? "Hello! I'm Gorilla-Labs AI assistant. How can I help you today? Feel free to ask about our services, pricing, or any project you have in mind!"
            : "¡Hola! Soy el asistente de IA de Gorilla-Labs. ¿Cómo puedo ayudarte hoy? ¡Pregúntame sobre nuestros servicios, precios o cualquier proyecto que tengas en mente!",
        timestamp: new Date(),
      }
      setMessages([initialMessage])
    }
  }, [isOpen, messages.length, language])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle user messages and get responses
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === "user") {
      setIsTyping(true)

      // Add a delay to simulate thinking time
      const typingDelay = setTimeout(async () => {
        try {
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: messages[messages.length - 1].text,
              language: language,
            }),
          })

          const data = await response.json()

          // Add a small delay to make the response feel more natural
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                sender: "agent",
                text: data.response,
                timestamp: new Date(),
              },
            ])
            setIsTyping(false)
          }, 800)
        } catch (error) {
          console.error("Error calling chat API:", error)

          // Final fallback if everything fails
          const finalFallback =
            language === "en"
              ? "I'm experiencing technical difficulties. Please contact our team directly at info@gorilla-labs.com or call +1 (234) 567-890 for immediate assistance."
              : "Estoy experimentando dificultades técnicas. Por favor contacta directamente a nuestro equipo en info@gorilla-labs.com o llama al +1 (234) 567-890 para asistencia inmediata."

          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                sender: "agent",
                text: finalFallback,
                timestamp: new Date(),
              },
            ])
            setIsTyping(false)
          }, 800)
        }
      }, 1200)

      return () => {
        clearTimeout(typingDelay)
      }
    }
  }, [messages, language])

  // Handle first visit animation
  useEffect(() => {
    const hasVisited = localStorage.getItem("gorilla-labs-chat-visited")
    if (!hasVisited) {
      // Show electricity effect and welcome bubble after 2 seconds
      setTimeout(() => {
        setShowWelcomeBubble(true)
        // Hide welcome bubble after 5 seconds
        setTimeout(() => {
          setShowWelcomeBubble(false)
          localStorage.setItem("gorilla-labs-chat-visited", "true")
          setIsFirstVisit(false)
        }, 5000)
      }, 2000)
    } else {
      setIsFirstVisit(false)
    }
  }, [])

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
        <div className="fixed bottom-4 right-4 z-50">
          {/* Welcome Bubble */}
          {showWelcomeBubble && (
            <div className="absolute bottom-16 right-0 mb-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 shadow-lg max-w-xs border border-gray-200 dark:border-gray-700 animate-bounce">
              <p className="text-sm">
                {language === "en"
                  ? "Hello 👋, any questions or doubts, we're here 😊"
                  : "Hola 👋, cualquier duda o pregunta, aquí estamos 😊"}
              </p>
              {/* Arrow pointing to chat button */}
              <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700"></div>
            </div>
          )}

          <Button
            onClick={toggleChat}
            className={`h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 ${
              isFirstVisit ? "animate-pulse electricity-effect" : ""
            }`}
            size="icon"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card
          className={`fixed bottom-4 right-4 z-50 w-80 shadow-xl transition-all duration-300 md:w-96 ${
            isMinimized ? "h-auto" : "h-[500px]"
          }`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-t-lg">
            <CardTitle className="text-sm font-medium">
              {language === "en" ? "Gorilla-Labs AI Assistant" : "Asistente IA de Gorilla-Labs"}
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={toggleMinimize}
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={toggleChat}
                aria-label="Close chat"
              >
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
                            msg.sender === "user"
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                              : "bg-muted"
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
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!message.trim() || isTyping}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
      <style jsx>{`
        @keyframes electricity {
          0%, 100% { 
            box-shadow: 0 0 5px #eab308, 0 0 10px #eab308, 0 0 15px #eab308, 0 0 20px #eab308;
          }
          25% { 
            box-shadow: 0 0 10px #f59e0b, 0 0 20px #f59e0b, 0 0 30px #f59e0b, 0 0 40px #f59e0b;
          }
          50% { 
            box-shadow: 0 0 5px #f97316, 0 0 10px #f97316, 0 0 15px #f97316, 0 0 20px #f97316;
          }
          75% { 
            box-shadow: 0 0 10px #eab308, 0 0 20px #eab308, 0 0 30px #eab308, 0 0 40px #eab308;
          }
        }
        
        .electricity-effect {
          animation: electricity 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
