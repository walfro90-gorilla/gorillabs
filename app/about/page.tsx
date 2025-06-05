"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { Seo } from "@/components/seo"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

interface Value {
  title: string
  description: string
  icon: string
}

export default function AboutPage() {
  const { language } = useLanguage()

  const teamMembers: TeamMember[] = [
    {
      name: language === "en" ? "Alex Rodriguez" : "Alex Rodríguez",
      role: language === "en" ? "Founder & CEO" : "Fundador y CEO",
      bio:
        language === "en"
          ? "With over 15 years of experience in software development and business leadership, Alex founded Gorilla-Labs with a vision to help businesses leverage technology for growth."
          : "Con más de 15 años de experiencia en desarrollo de software y liderazgo empresarial, Alex fundó Gorilla-Labs con la visión de ayudar a las empresas a aprovechar la tecnología para crecer.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: language === "en" ? "Maria Gonzalez" : "María González",
      role: language === "en" ? "CTO" : "Directora de Tecnología",
      bio:
        language === "en"
          ? "Maria leads our technical team with her expertise in web and mobile development. She ensures that we deliver cutting-edge solutions that meet our clients' needs."
          : "María lidera nuestro equipo técnico con su experiencia en desarrollo web y móvil. Ella se asegura de que entreguemos soluciones de vanguardia que satisfagan las necesidades de nuestros clientes.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: language === "en" ? "David Kim" : "David Kim",
      role: language === "en" ? "Lead Designer" : "Diseñador Principal",
      bio:
        language === "en"
          ? "David brings creativity and user-centered design principles to every project. His designs are not just beautiful but also functional and intuitive."
          : "David aporta creatividad y principios de diseño centrados en el usuario a cada proyecto. Sus diseños no son solo hermosos, sino también funcionales e intuitivos.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: language === "en" ? "Sofia Patel" : "Sofía Patel",
      role: language === "en" ? "Marketing Director" : "Directora de Marketing",
      bio:
        language === "en"
          ? "Sofia develops and implements marketing strategies that help our clients reach their target audience and achieve their business goals."
          : "Sofía desarrolla e implementa estrategias de marketing que ayudan a nuestros clientes a llegar a su público objetivo y alcanzar sus metas comerciales.",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  const values: Value[] = [
    {
      title: language === "en" ? "Innovation" : "Innovación",
      description:
        language === "en"
          ? "We constantly explore new technologies and approaches to deliver the best solutions for our clients."
          : "Constantemente exploramos nuevas tecnologías y enfoques para ofrecer las mejores soluciones a nuestros clientes.",
      icon: "🚀",
    },
    {
      title: language === "en" ? "Quality" : "Calidad",
      description:
        language === "en"
          ? "We are committed to delivering high-quality work that exceeds our clients' expectations."
          : "Estamos comprometidos a entregar trabajo de alta calidad que supere las expectativas de nuestros clientes.",
      icon: "✨",
    },
    {
      title: language === "en" ? "Collaboration" : "Colaboración",
      description:
        language === "en"
          ? "We work closely with our clients to understand their needs and ensure their success."
          : "Trabajamos estrechamente con nuestros clientes para entender sus necesidades y asegurar su éxito.",
      icon: "🤝",
    },
    {
      title: language === "en" ? "Integrity" : "Integridad",
      description:
        language === "en"
          ? "We operate with honesty, transparency, and ethical business practices in all our dealings."
          : "Operamos con honestidad, transparencia y prácticas comerciales éticas en todas nuestras relaciones.",
      icon: "🛡️",
    },
  ]

  return (
    <div className="container py-16">
      <Seo
        title="Acerca de Nosotros"
        description="Conoce a Gorilla Labs, equipo de tecnólogos apasionados desde 2020. Especializados en desarrollo web, e-commerce y apps móviles. Transformamos negocios con soluciones digitales innovadoras."
        keywords="equipo desarrollo, empresa tecnológica, historia Gorilla Labs, desarrolladores web, diseñadores UX/UI"
        canonical="https://gorillalabs.dev/about"
        type="website"
        language={language}
      />
      {/* Hero Section */}
      <div className="mb-16 grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            {language === "en" ? "About Gorilla-Labs" : "Acerca de Gorilla-Labs"}
          </h1>
          <p className="mb-6 text-xl text-muted-foreground">
            {language === "en"
              ? "We are a team of passionate technologists dedicated to transforming businesses through innovative digital solutions."
              : "Somos un equipo de tecnólogos apasionados dedicados a transformar negocios a través de soluciones digitales innovadoras."}
          </p>
          <p className="mb-6 text-muted-foreground">
            {language === "en"
              ? "Founded in 2020, Gorilla-Labs has quickly established itself as a leader in web development, e-commerce solutions, and mobile applications. Our mission is to help businesses of all sizes leverage technology to grow, innovate, and succeed in the digital age."
              : "Fundada en 2020, Gorilla-Labs se ha establecido rápidamente como líder en desarrollo web, soluciones de comercio electrónico y aplicaciones móviles. Nuestra misión es ayudar a empresas de todos los tamaños a aprovechar la tecnología para crecer, innovar y tener éxito en la era digital."}
          </p>
          <Link href="/contact">
            <Button className="gap-2">
              {language === "en" ? "Get in Touch" : "Ponte en Contacto"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image src="/placeholder.svg?height=600&width=600" alt="Gorilla-Labs Team" fill className="object-cover" />
        </div>
      </div>

      {/* Our Story */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">{language === "en" ? "Our Story" : "Nuestra Historia"}</h2>

        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="order-2 md:order-1">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Gorilla-Labs Office"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h3 className="mb-4 text-2xl font-bold">
              {language === "en" ? "From Idea to Impact" : "De Idea a Impacto"}
            </h3>
            <p className="mb-4 text-muted-foreground">
              {language === "en"
                ? "Gorilla-Labs began with a simple idea: to create a technology company that truly understands the needs of businesses and delivers solutions that drive real results."
                : "Gorilla-Labs comenzó con una idea simple: crear una empresa de tecnología que realmente entienda las necesidades de los negocios y entregue soluciones que generen resultados reales."}
            </p>
            <p className="mb-4 text-muted-foreground">
              {language === "en"
                ? "Our founder, Alex Rodriguez, saw that many businesses were struggling to navigate the rapidly evolving digital landscape. He assembled a team of talented developers, designers, and marketers who shared his vision of creating impactful digital solutions."
                : "Nuestro fundador, Alex Rodríguez, vio que muchas empresas estaban luchando por navegar en el panorama digital en rápida evolución. Reunió un equipo de talentosos desarrolladores, diseñadores y especialistas en marketing que compartían su visión de crear soluciones digitales impactantes."}
            </p>
            <p className="text-muted-foreground">
              {language === "en"
                ? "Since then, we've grown from a small startup to a full-service technology company with clients across various industries. Our commitment to innovation, quality, and client satisfaction has been the driving force behind our success."
                : "Desde entonces, hemos crecido de una pequeña startup a una empresa de tecnología de servicio completo con clientes en varias industrias. Nuestro compromiso con la innovación, la calidad y la satisfacción del cliente ha sido la fuerza impulsora detrás de nuestro éxito."}
            </p>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">{language === "en" ? "Our Values" : "Nuestros Valores"}</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Card key={index} className="border-2 hover:border-primary">
              <CardContent className="p-6 text-center">
                <div className="mb-4 text-4xl">{value.icon}</div>
                <h3 className="mb-2 text-xl font-bold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Our Team */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">
          {language === "en" ? "Meet Our Team" : "Conoce a Nuestro Equipo"}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative aspect-square w-full">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>

              <CardContent className="p-6">
                <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
                <p className="mb-4 text-primary">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="rounded-lg bg-black p-8 text-white md:p-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl">
            {language === "en" ? "Ready to Transform Your Business?" : "¿Listo para Transformar tu Negocio?"}
          </h2>
          <p className="mb-8 text-lg text-gray-300">
            {language === "en"
              ? "Let's discuss how our technological solutions can help you achieve your goals."
              : "Hablemos sobre cómo nuestras soluciones tecnológicas pueden ayudarte a alcanzar tus objetivos."}
          </p>
          <Link href="/contact">
            <Button size="lg" className="gap-2">
              {language === "en" ? "Contact Us Today" : "Contáctanos Hoy"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
