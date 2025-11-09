"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "es" | "zh"

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
      title: "Your Goal is Our!",
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
      // about: "Nosotros",
      contact: "Contacto",
      // blog: "Blog",
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
  zh: {
    nav: {
      home: "首页",
      services: "服务",
      portfolio: "作品集",
      about: "关于",
      contact: "联系",
      blog: "博客",
    },
    auth: {
      login: "登录",
      signup: "注册",
      logout: "登出",
    },
    hero: {
      title: "我们将您的想法转化为技术解决方案",
      phrase1: "网站开发",
      phrase2: "移动应用",
      phrase3: "电子商务解决方案",
      description:
        "Gorilla-Labs 是一家专注于为企业创建网站、电子商务平台和应用程序的科技初创公司。",
      cta: "让我们谈谈您的项目",
      portfolio: "查看我们的作品",
    },
    services: {
      title: "我们的服务",
      subtitle: "我们提供广泛的技术解决方案，帮助您的业务增长",
      all: "全部",
      mobile: "移动",
      ecomm: "电子商务",
      market: "营销",
      indust: "工业",
      webDev: "网站开发",
      webDevDesc: "具有现代设计和最佳性能的自定义网站",
      mobileApps: "移动应用和PWA",
      mobileAppsDesc: "适用于 iOS 和 Android 的原生和渐进式 Web 应用程序",
      ecommerce: "电子商务解决方案",
      ecommerceDesc: "集成 Shopify、Amazon 和 TikTok Shop 的在线商店",
      marketing: "增长营销",
      marketingDesc: "增加您的在线影响力和销售额的数字策略",
      industry: "行业解决方案",
      industryDesc: "专为加工制造业设计的专业应用程序",
    },
    featuredServices: {
      title: "特色服务",
      subtitle: "我们最受欢迎的技术解决方案",
      viewAll: "查看所有服务",
      featured: "特色",
      details: "查看详情",
      webBasic: "基础网站",
      webBasicDesc: "最多 5 页的专业网站，响应式设计和 SEO 优化",
      ecommStandard: "标准电子商务",
      ecommStandardDesc: "完整的在线商店，包含产品目录、支付网关和订单管理",
      mobileApp: "自定义移动应用",
      mobileAppDesc: "适用于 iOS 和 Android 的原生应用程序，具有自定义设计和功能",
    },
    testimonials: {
      title: "客户评价",
      subtitle: "阅读信任我们的企业的成功故事",
      quote1:
        "Gorilla-Labs 用令人难以置信的电子商务平台改变了我们的业务。前三个月的销售额增长了 200%！",
      quote2:
        "他们为我们开发的移动应用程序彻底改变了我们与客户的互动方式。用户体验非常出色。",
      quote3:
        "他们的行业解决方案帮助我们优化了生产流程。投资回报率在实施几周内就很明显。",
    },
    cta: {
      title: "准备好改变您的业务了吗？",
      description:
        "今天就联系我们，讨论您的项目，了解我们的技术解决方案如何帮助您实现目标。",
      button: "立即联系我们",
    },
    game: {
      title: "测试您的技能",
      subtitle: "尝试我们的互动游戏，看看我们的开发能力",
      name: "快速点击挑战",
      score: "分数",
      time: "时间",
      instructions: "尽可能快地点击黄色圆圈来得分！",
      start: "开始游戏",
      gameOver: "游戏结束！",
      finalScore: "您的最终分数",
      playAgain: "再玩一次",
    },
    cart: {
      title: "您的购物车",
      empty: "您的购物车是空的",
      addToCart: "添加到购物车",
      addedToCart: "已添加到购物车",
      checkout: "结账",
      total: "总计",
    },
    countdown: {
      days: "天",
      hours: "小时",
      minutes: "分钟",
      seconds: "秒",
    },
    footer: {
      description:
        "Gorilla-Labs 是一家专注于为企业创建网站、电子商务平台和应用程序的科技初创公司。",
      quickLinks: "快速链接",
      services: "服务",
      contact: "联系我们",
      rights: "版权所有。",
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
    if (storedLanguage && (storedLanguage === "en" || storedLanguage === "es" || storedLanguage === "zh")) {
      setLanguage(storedLanguage)
    } else {
      // Auto-detect language from browser
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith("zh")) {
        setLanguage("zh")
      } else if (browserLang.startsWith("es")) {
        setLanguage("es")
      } else {
        setLanguage("en")
      }
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
