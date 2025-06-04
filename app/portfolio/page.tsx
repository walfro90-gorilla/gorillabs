"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/context/language-context"
import { ExternalLink, ArrowRight, Calendar, User } from "lucide-react"
import { getAllProjects, getProjectsByCategory } from "@/lib/portfolio"

export default function PortfolioPage() {
  const { translations } = useLanguage()
  const [activeTab, setActiveTab] = useState("all")

  const allProjects = getAllProjects()
  const filteredProjects = getProjectsByCategory(activeTab)

  return (
    <div className="container py-16">
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-4xl font-bold">Our Portfolio</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Explore our latest projects and see how we've helped businesses transform their digital presence
        </p>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mx-auto grid max-w-md grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="web">Web</TabsTrigger>
          <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
          <TabsTrigger value="gaming">Gaming</TabsTrigger>
          <TabsTrigger value="industry">Industria</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Dialog key={project.id}>
            <DialogTrigger asChild>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer group">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {project.featured && (
                    <Badge className="absolute right-2 top-2 bg-primary text-primary-foreground">Destacado</Badge>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="mb-2">
                    <Badge variant="outline" className="capitalize">
                      {project.category === "web"
                        ? "Web"
                        : project.category === "ecommerce"
                          ? "E-commerce"
                          : project.category === "gaming"
                            ? "Gaming"
                            : project.category === "industry"
                              ? "Industria"
                              : project.category}
                    </Badge>
                  </div>

                  <h3 className="mb-2 text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="mb-4 text-muted-foreground line-clamp-3">{project.description}</p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{project.client}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(project.date).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary">+{project.technologies.length - 3}</Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="default" className="flex-1">
                      Ver Detalles
                    </Button>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button variant="outline" size="icon">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>

            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    Cliente: {project.client}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(project.date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                    })}
                  </span>
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {project.gallery.map((img, index) => (
                    <div key={index} className="relative aspect-video w-full overflow-hidden rounded-lg">
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`${project.title} - Galería ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="mb-3 text-lg font-medium">Descripción del Proyecto</h4>
                  <p className="text-muted-foreground leading-relaxed">{project.fullDescription}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-3 text-lg font-medium">Desafíos Técnicos</h4>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-primary mt-1">•</span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 text-lg font-medium">Resultados Obtenidos</h4>
                    <ul className="space-y-2">
                      {project.results.map((result, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 text-lg font-medium">Tecnologías Utilizadas</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {project.link && (
                  <div className="flex justify-end">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Button className="gap-2">
                        Visitar Proyecto
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="mb-4 text-2xl font-bold">Ready to Start Your Project?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
          Let's discuss how we can help you achieve your business goals with our technological solutions.
        </p>
        <Link href="/contact">
          <Button size="lg" className="gap-2">
            Contact Us
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
