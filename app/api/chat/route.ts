import { type NextRequest, NextResponse } from "next/server"

// This will be configurable from admin panel
const getBusinessContext = () => {
  return `You are a helpful AI assistant for Gorilla Labs, a technology startup that provides web development, e-commerce solutions, and mobile app development services.

Company Information:
- Name: Gorilla Labs
- Location: El Paso, Texas & Ciudad Juárez, Mexico
- Services: Web Development, E-commerce Solutions, Mobile App Development, Digital Marketing
- Pricing: Basic Website ($1,200), E-commerce Standard ($1,600), Mobile App Development ($45/hour)
- Contact: info@gorilla-labs.com, +1 (234) 567-890

Always respond in a helpful, professional manner. If asked about services, pricing, or contact information, provide accurate details. If you don't know something specific about the company, direct them to contact the team directly.`
}

// Fallback responses when API is unavailable
const getFallbackResponse = (message: string, language: string) => {
  const lowerMessage = message.toLowerCase()

  // English responses
  if (language === "en") {
    if (lowerMessage.includes("pricing") || lowerMessage.includes("cost") || lowerMessage.includes("price")) {
      return "Our pricing varies depending on the specific requirements of your project. For a basic website, prices start at $1,200. For e-commerce solutions, prices start at $1,600. Mobile app development is charged at $45/hour. Would you like to schedule a consultation for a personalized quote?"
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("talk") || lowerMessage.includes("call")) {
      return "You can reach our team at info@gorilla-labs.com or call us at +1 (234) 567-890. We're located in El Paso, Texas & Ciudad Juárez, Mexico. We'd love to discuss your project!"
    } else if (lowerMessage.includes("service") || lowerMessage.includes("offer") || lowerMessage.includes("what")) {
      return "We offer comprehensive technology solutions including: Web Development (custom websites, responsive design), E-commerce Solutions (online stores, payment integration), Mobile App Development (iOS & Android), and Digital Marketing. Each service is tailored to your business needs."
    } else if (
      lowerMessage.includes("portfolio") ||
      lowerMessage.includes("example") ||
      lowerMessage.includes("work")
    ) {
      return "You can view our portfolio on our website. We've successfully delivered projects across various industries including fashion, food delivery, corporate solutions, and manufacturing. Each project showcases our commitment to quality and innovation."
    } else if (
      lowerMessage.includes("time") ||
      lowerMessage.includes("how long") ||
      lowerMessage.includes("duration")
    ) {
      return "Project timelines vary based on complexity. A basic website typically takes 2-4 weeks, e-commerce solutions 4-8 weeks, and mobile apps 8-16 weeks. We'll provide a detailed timeline during our consultation."
    } else if (lowerMessage.includes("technology") || lowerMessage.includes("tech") || lowerMessage.includes("stack")) {
      return "We use modern technologies including React, Next.js, Node.js, Python, React Native, and cloud platforms like AWS and Vercel. We choose the best technology stack for each project's specific requirements."
    } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! Welcome to Gorilla Labs! We're a technology startup specializing in web development, e-commerce solutions, and mobile apps. How can we help transform your ideas into technological solutions today?"
    } else {
      return "Thank you for your interest in Gorilla Labs! We're here to help transform your ideas into technological solutions. Whether you need a website, e-commerce platform, or mobile app, our team is ready to assist. What specific project are you considering?"
    }
  }
  // Spanish responses
  else {
    if (lowerMessage.includes("precio") || lowerMessage.includes("costo") || lowerMessage.includes("tarifa")) {
      return "Nuestros precios varían según los requisitos específicos de tu proyecto. Para un sitio web básico, los precios comienzan en $1,200. Para soluciones de comercio electrónico, los precios comienzan en $1,600. El desarrollo de aplicaciones móviles se cobra a $45/hora. ¿Te gustaría programar una consulta para obtener un presupuesto personalizado?"
    } else if (
      lowerMessage.includes("contacto") ||
      lowerMessage.includes("hablar") ||
      lowerMessage.includes("llamar")
    ) {
      return "Puedes contactar a nuestro equipo en info@gorilla-labs.com o llamarnos al +1 (234) 567-890. Estamos ubicados en El Paso, Texas y Ciudad Juárez, México. ¡Nos encantaría discutir tu proyecto!"
    } else if (lowerMessage.includes("servicio") || lowerMessage.includes("ofrece") || lowerMessage.includes("qué")) {
      return "Ofrecemos soluciones tecnológicas integrales que incluyen: Desarrollo Web (sitios web personalizados, diseño responsivo), Soluciones de E-commerce (tiendas en línea, integración de pagos), Desarrollo de Apps Móviles (iOS y Android), y Marketing Digital. Cada servicio está adaptado a las necesidades de tu negocio."
    } else if (
      lowerMessage.includes("portafolio") ||
      lowerMessage.includes("ejemplo") ||
      lowerMessage.includes("trabajo")
    ) {
      return "Puedes ver nuestro portafolio en nuestro sitio web. Hemos entregado exitosamente proyectos en varias industrias incluyendo moda, entrega de comida, soluciones corporativas y manufactura. Cada proyecto muestra nuestro compromiso con la calidad y la innovación."
    } else if (
      lowerMessage.includes("tiempo") ||
      lowerMessage.includes("cuánto") ||
      lowerMessage.includes("duración")
    ) {
      return "Los tiempos de proyecto varían según la complejidad. Un sitio web básico típicamente toma 2-4 semanas, soluciones de e-commerce 4-8 semanas, y aplicaciones móviles 8-16 semanas. Proporcionaremos un cronograma detallado durante nuestra consulta."
    } else if (lowerMessage.includes("tecnología") || lowerMessage.includes("tech") || lowerMessage.includes("stack")) {
      return "Utilizamos tecnologías modernas incluyendo React, Next.js, Node.js, Python, React Native, y plataformas en la nube como AWS y Vercel. Elegimos el mejor stack tecnológico para los requisitos específicos de cada proyecto."
    } else if (lowerMessage.includes("hola") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "¡Hola! ¡Bienvenido a Gorilla Labs! Somos una startup tecnológica especializada en desarrollo web, soluciones de e-commerce y aplicaciones móviles. ¿Cómo podemos ayudarte a transformar tus ideas en soluciones tecnológicas hoy?"
    } else {
      return "¡Gracias por tu interés en Gorilla Labs! Estamos aquí para ayudarte a transformar tus ideas en soluciones tecnológicas. Ya sea que necesites un sitio web, plataforma de e-commerce o aplicación móvil, nuestro equipo está listo para asistirte. ¿Qué proyecto específico estás considerando?"
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, language } = await request.json()

    // Try DeepSeek API first
    const apiKey = process.env.DEEPSEEK_API_KEY || "sk-dd49bbc217924b7f85a3bd607a83dc2b"

    if (apiKey) {
      try {
        const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
              {
                role: "system",
                content: `${getBusinessContext()}\n\nRespond in ${language === "en" ? "English" : "Spanish"}. Keep responses concise and helpful, around 100-150 words.`,
              },
              {
                role: "user",
                content: message,
              },
            ],
            max_tokens: 200,
            temperature: 0.7,
            stream: false,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const aiResponse = data.choices[0]?.message?.content || "I apologize, but I cannot respond right now."
          return NextResponse.json({ response: aiResponse, source: "deepseek" })
        } else {
          const errorData = await response.text()
          console.error("DeepSeek API Error:", response.status, errorData)
          throw new Error(`DeepSeek API returned ${response.status}: ${errorData}`)
        }
      } catch (apiError) {
        console.error("DeepSeek API call failed:", apiError)
        // Fall back to predefined responses
      }
    }

    // Use fallback responses if API fails or is not available
    const fallbackResponse = getFallbackResponse(message, language)
    return NextResponse.json({ response: fallbackResponse, source: "fallback" })
  } catch (error: any) {
    console.error("Error in chat API:", error)

    // Return a fallback response instead of an error
    const { language } = await request.json().catch(() => ({ language: "en" }))
    const fallbackResponse =
      language === "en"
        ? "I'm sorry, I'm having technical difficulties right now. Please contact our team directly at info@gorilla-labs.com or call +1 (234) 567-890 for immediate assistance."
        : "Lo siento, tengo dificultades técnicas en este momento. Por favor contacta directamente a nuestro equipo en info@gorilla-labs.com o llama al +1 (234) 567-890 para asistencia inmediata."

    return NextResponse.json({ response: fallbackResponse, source: "error" })
  }
}
