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
import { ExternalLink, ArrowRight } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  category: string
  image: string
  gallery: string[]
  client: string
  date: string
  technologies: string[]
  link?: string
  featured: boolean
}

export default function PortfolioPage() {
  const { translations } = useLanguage()
  const [activeTab, setActiveTab] = useState("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: "project-1",
      title: "E-commerce Platform for Fashion Brand",
      description:
        "A complete e-commerce solution for a high-end fashion brand, featuring product catalog, secure checkout, and customer accounts.",
      category: "ecommerce",
      image: "/placeholder.svg?height=600&width=800",
      gallery: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      client: "Fashion Forward Inc.",
      date: "2023-04",
      technologies: ["Next.js", "Shopify", "Tailwind CSS", "Stripe"],
      link: "https://example.com",
      featured: true,
    },
    {
      id: "project-2",
      title: "Mobile App for Food Delivery",
      description:
        "A native mobile application for iOS and Android that allows users to order food from local restaurants for delivery or pickup.",
      category: "mobile",
      image: "/placeholder.svg?height=600&width=800",
      gallery: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      client: "QuickBite",
      date: "2023-02",
      technologies: ["React Native", "Firebase", "Google Maps API", "Stripe"],
      link: "https://example.com",
      featured: true,
    },
    {
      id: "project-3",
      title: "Corporate Website Redesign",
      description:
        "A complete redesign of a corporate website with a focus on user experience, performance, and modern design principles.",
      category: "web",
      image: "/placeholder.svg?height=600&width=800",
      gallery: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      client: "Global Enterprises Ltd.",
      date: "2023-01",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Sanity CMS"],
      link: "https://example.com",
      featured: false,
    },
    {
      id: "project-4",
      title: "Digital Marketing Campaign",
      description:
        "A comprehensive digital marketing campaign that increased online sales by 150% through SEO, PPC, and social media strategies.",
      category: "marketing",
      image: "/placeholder.svg?height=600&width=800",
      gallery: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      client: "Retail Solutions Inc.",
      date: "2022-11",
      technologies: ["Google Ads", "Facebook Ads", "SEO", "Content Marketing"],
      featured: false,
    },
    {
      id: "project-5",
      title: "Manufacturing ERP System",
      description:
        "A custom ERP system for a manufacturing company that streamlined operations, reduced costs, and improved efficiency.",
      category: "industry",
      image: "/placeholder.svg?height=600&width=800",
      gallery: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      client: "Industrial Innovations Co.",
      date: "2022-09",
      technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
      featured: true,
    },
    {
      id: "project-6",
      title: "Progressive Web App for News",
      description:
        "A progressive web app that delivers personalized news content with offline capabilities and push notifications.",
      category: "mobile",
      image: "/placeholder.svg?height=600&width=800",
      gallery: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
      client: "NewsNow Media",
      date: "2022-07",
      technologies: ["React", "PWA", "Firebase", "Service Workers"],
      link: "https://example.com",
      featured: false,
    },
  ]

  const filteredProjects = activeTab === "all" ? projects : projects.filter((project) => project.category === activeTab)

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
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="web">Web</TabsTrigger>
          <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
          <TabsTrigger value="mobile">Mobile</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="industry">Industry</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
              {project.featured && (
                <Badge className="absolute right-2 top-2 bg-primary text-primary-foreground">Featured</Badge>
              )}
            </div>

            <CardContent className="p-6">
              <div className="mb-2">
                <Badge variant="outline" className="capitalize">
                  {project.category}
                </Badge>
              </div>

              <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
              <p className="mb-4 text-muted-foreground">{project.description}</p>

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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" className="flex-1" onClick={() => setSelectedProject(project)}>
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    {selectedProject && (
                      <>
                        <DialogHeader>
                          <DialogTitle>{selectedProject.title}</DialogTitle>
                          <DialogDescription>
                            Client: {selectedProject.client} | Date:{" "}
                            {new Date(selectedProject.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                            })}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                            <Image
                              src={selectedProject.image || "/placeholder.svg"}
                              alt={selectedProject.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            {selectedProject.gallery.map((img, index) => (
                              <div key={index} className="relative aspect-video w-full overflow-hidden rounded-lg">
                                <Image
                                  src={img || "/placeholder.svg"}
                                  alt={`${selectedProject.title} - Gallery ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>

                          <div>
                            <h4 className="mb-2 text-lg font-medium">Description</h4>
                            <p className="text-muted-foreground">{selectedProject.description}</p>
                          </div>

                          <div>
                            <h4 className="mb-2 text-lg font-medium">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.technologies.map((tech, index) => (
                                <Badge key={index} variant="secondary">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {selectedProject.link && (
                            <div className="flex justify-end">
                              <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" className="gap-2">
                                  Visit Project
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </a>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </DialogContent>
                </Dialog>

                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
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
