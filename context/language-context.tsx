"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "es"

interface Translations {
  nav: {
    home: string
    services: string
    portfolio: string
    about: string
    contact: string
    blog: string
  }
  auth: {
    login: string
    signup: string
    logout: string
  }
  hero: {
    title: string
    phrase1: string
    phrase2: string
    phrase3: string
    description: string
    cta: string
    portfolio: string
  }
  services: {
    title: string
    subtitle: string
    all: string
    mobile: string
    ecomm: string
    market: string
    indust: string
    webDev: string
    webDevDesc: string
    mobileApps: string
    mobileAppsDesc: string
    ecommerce: string
    ecommerceDesc: string
    marketing: string
    marketingDesc: string
    industry: string
    industryDesc: string
  }
  featuredServices: {
    title: string
    subtitle: string
    viewAll: string
    featured: string
    details: string
    webBasic: string
    webBasicDesc: string
    ecommStandard: string
    ecommStandardDesc: string
    mobileApp: string
    mobileAppDesc: string
  }
  testimonials: {
    title: string
    subtitle: string
    quote1: string
    quote2: string
    quote3: string
  }
  cta: {
    title: string
    description: string
    button: string
  }
  game: {
    title: string
    subtitle: string
    name: string
    score: string
    time: string
    instructions: string
    start: string
    gameOver: string
    finalScore: string
    playAgain: string
  }
  cart: {
    title: string
    empty: string
    addToCart: string
    addedToCart: string
    checkout: string
    total: string
  }
  countdown: {
    days: string
    hours: string
    minutes: string
    seconds: string
  }
  footer: {
    description: string
    quickLinks: string
    services: string
    contact: string
    rights: string
  }
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      about: "About",
      contact: "Contact",
      blog: "Blog",
    },
    auth: {
      login: "Login",
      signup: "Sign Up",
      logout: "Logout",
    },
    hero: {
      title: "We Transform Your Ideas into Technological Solutions",
      phrase1: "Web Development",
      phrase2: "Mobile Applications",
      phrase3: "E-commerce Solutions",
      description:
        "Gorilla-Labs is a technology startup specializing in creating websites, e-commerce platforms, and applications for businesses and companies.",
      cta: "Let's Talk About Your Project",
      portfolio: "View Our Work",
    },
    services: {
      title: "Our Services",
      subtitle: "We offer a wide range of technological solutions to help your business grow",
      all: "All",
      mobile: "Mobile",
      ecomm: "E-commerce",
      market: "Marketing",
      indust: "Industry",
      webDev: "Web Development",
      webDevDesc: "Custom websites with modern design and optimal performance",
      mobileApps: "Mobile Apps & PWA",
      mobileAppsDesc: "Native and progressive web applications for iOS and Android",
      ecommerce: "E-commerce Solutions",
      ecommerceDesc: "Online stores with Shopify, Amazon, and TikTok Shop integration",
      marketing: "Growth Marketing",
      marketingDesc: "Digital strategies to increase your online presence and sales",
      industry: "Industry Solutions",
      industryDesc: "Specialized applications for the maquiladora industry",
    },
    featuredServices: {
      title: "Featured Services",
      subtitle: "Our most popular technological solutions",
      viewAll: "View All Services",
      featured: "Featured",
      details: "View Details",
      webBasic: "Basic Website",
      webBasicDesc: "Professional website with up to 5 pages, responsive design, and SEO optimization",
      ecommStandard: "Standard E-commerce",
      ecommStandardDesc: "Complete online store with product catalog, payment gateway, and order management",
      mobileApp: "Custom Mobile App",
      mobileAppDesc: "Native application for iOS and Android with custom design and functionality",
    },
    testimonials: {
      title: "What Our Clients Say",
      subtitle: "Read the success stories of businesses that have trusted us",
      quote1:
        "Gorilla-Labs transformed our business with an incredible e-commerce platform. Sales increased by 200% in the first three months!",
      quote2:
        "The mobile app they developed for us has revolutionized how we interact with our customers. The user experience is exceptional.",
      quote3:
        "Their industry solutions helped us optimize our production processes. The ROI was evident within weeks of implementation.",
    },
    cta: {
      title: "Ready to Transform Your Business?",
      description:
        "Contact us today to discuss your project and discover how our technological solutions can help you achieve your goals.",
      button: "Contact Us Now",
    },
    game: {
      title: "Test Your Skills",
      subtitle: "Try our interactive game to see our development capabilities in action",
      name: "Speed Click Challenge",
      score: "Score",
      time: "Time",
      instructions: "Click on the yellow circles as quickly as possible to score points!",
      start: "Start Game",
      gameOver: "Game Over!",
      finalScore: "Your Final Score",
      playAgain: "Play Again",
    },
    cart: {
      title: "Your Cart",
      empty: "Your cart is empty",
      addToCart: "Add to Cart",
      addedToCart: "Added to Cart",
      checkout: "Checkout",
      total: "Total",
    },
    countdown: {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
    footer: {
      description:
        "Gorilla-Labs is a technology startup specializing in creating websites, e-commerce platforms, and applications for businesses and companies.",
      quickLinks: "Quick Links",
      services: "Services",
      contact: "Contact Us",
      rights: "All rights reserved.",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      portfolio: "Portafolio",
      about: "Nosotros",
      contact: "Contacto",
      blog: "Blog",
    },
    auth: {
      login: "Iniciar Sesión",
      signup: "Registrarse",
      logout: "Cerrar Sesión",
    },
    hero: {
      title: "Transformamos tus Ideas en Soluciones Tecnológicas",
      phrase1: "Desarrollo Web",
      phrase2: "Aplicaciones Móviles",
      phrase3: "Soluciones E-commerce",
      description:
        "Gorilla-Labs es una startup de tecnología especializada en crear sitios web, plataformas de comercio electrónico y aplicaciones para negocios y empresas.",
      cta: "Hablemos de tu Proyecto",
      portfolio: "Ver Nuestro Trabajo",
    },
    services: {
      title: "Nuestros Servicios",
      subtitle: "Ofrecemos una amplia gama de soluciones tecnológicas para ayudar a tu negocio a crecer",
      all: "Todos",
      mobile: "Móvil",
      ecomm: "E-commerce",
      market: "Marketing",
      indust: "Industria",
      webDev: "Desarrollo Web",
      webDevDesc: "Sitios web personalizados con diseño moderno y rendimiento óptimo",
      mobileApps: "Apps Móviles y PWA",
      mobileAppsDesc: "Aplicaciones nativas y web progresivas para iOS y Android",
      ecommerce: "Soluciones E-commerce",
      ecommerceDesc: "Tiendas online con integración de Shopify, Amazon y TikTok Shop",
      marketing: "Marketing de Crecimiento",
      marketingDesc: "Estrategias digitales para aumentar tu presencia online y ventas",
      industry: "Soluciones Industriales",
      industryDesc: "Aplicaciones especializadas para la industria maquiladora",
    },
    featuredServices: {
      title: "Servicios Destacados",
      subtitle: "Nuestras soluciones tecnológicas más populares",
      viewAll: "Ver Todos los Servicios",
      featured: "Destacado",
      details: "Ver Detalles",
      webBasic: "Sitio Web Básico",
      webBasicDesc: "Sitio web profesional con hasta 5 páginas, diseño responsive y optimización SEO",
      ecommStandard: "E-commerce Estándar",
      ecommStandardDesc: "Tienda online completa con catálogo de productos, pasarela de pago y gestión de pedidos",
      mobileApp: "App Móvil Personalizada",
      mobileAppDesc: "Aplicación nativa para iOS y Android con diseño y funcionalidad personalizada",
    },
    testimonials: {
      title: "Lo que Dicen Nuestros Clientes",
      subtitle: "Lee las historias de éxito de empresas que han confiado en nosotros",
      quote1:
        "Gorilla-Labs transformó nuestro negocio con una increíble plataforma de comercio electrónico. ¡Las ventas aumentaron un 200% en los primeros tres meses!",
      quote2:
        "La aplicación móvil que desarrollaron para nosotros ha revolucionado la forma en que interactuamos con nuestros clientes. La experiencia de usuario es excepcional.",
      quote3:
        "Sus soluciones industriales nos ayudaron a optimizar nuestros procesos de producción. El ROI fue evidente en semanas de implementación.",
    },
    cta: {
      title: "¿Listo para Transformar tu Negocio?",
      description:
        "Contáctanos hoy para discutir tu proyecto y descubrir cómo nuestras soluciones tecnológicas pueden ayudarte a alcanzar tus objetivos.",
      button: "Contáctanos Ahora",
    },
    game: {
      title: "Prueba tus Habilidades",
      subtitle: "Prueba nuestro juego interactivo para ver nuestras capacidades de desarrollo en acción",
      name: "Desafío de Clics Rápidos",
      score: "Puntuación",
      time: "Tiempo",
      instructions: "¡Haz clic en los círculos amarillos lo más rápido posible para ganar puntos!",
      start: "Iniciar Juego",
      gameOver: "¡Juego Terminado!",
      finalScore: "Tu Puntuación Final",
      playAgain: "Jugar de Nuevo",
    },
    cart: {
      title: "Tu Carrito",
      empty: "Tu carrito está vacío",
      addToCart: "Añadir al Carrito",
      addedToCart: "Añadido al Carrito",
      checkout: "Finalizar Compra",
      total: "Total",
    },
    countdown: {
      days: "Días",
      hours: "Horas",
      minutes: "Minutos",
      seconds: "Segundos",
    },
    footer: {
      description:
        "Gorilla-Labs es una startup de tecnología especializada en crear sitios web, plataformas de comercio electrónico y aplicaciones para negocios y empresas.",
      quickLinks: "Enlaces Rápidos",
      services: "Servicios",
      contact: "Contáctanos",
      rights: "Todos los derechos reservados.",
    },
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  translations: Translations
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Check if there's a stored language preference
    const storedLanguage = localStorage.getItem("language") as Language
    if (storedLanguage && (storedLanguage === "en" || storedLanguage === "es")) {
      setLanguage(storedLanguage)
    }
  }, [])

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

