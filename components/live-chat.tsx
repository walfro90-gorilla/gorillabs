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

export default function LiveChat() {
  const { translations } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate agent response
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === "user") {
      setIsTyping(true)

      const timer = setTimeout(() => {
        const responses = [
          "Thanks for reaching out! How can I help you today?",
          "I'd be happy to assist with your project needs.",
          "Could you provide more details about what you're looking for?",
          "Our team specializes in that! Let me get some more information.",
          "That's a great question. Let me find the best solution for you.",
        ]

        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "agent",
            text: randomResponse,
            timestamp: new Date(),
          },
        ])

        setIsTyping(false)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [messages])

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
            <CardTitle className="text-sm font-medium">Gorilla-Labs Support</CardTitle>
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
                {messages.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                    <MessageSquare className="mb-2 h-12 w-12 opacity-20" />
                    <p>How can we help you today?</p>
                    <p className="text-sm">Our team is ready to assist with your project.</p>
                  </div>
                ) : (
                  messages.map((msg) => (
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
                  ))
                )}

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
                    placeholder="Type your message..."
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
