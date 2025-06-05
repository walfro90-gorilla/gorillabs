"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/context/language-context"
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { Seo } from "@/components/seo"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  slug: string
  coverImage: string
  category: string
  author: string
  authorImage?: string
  authorBio?: string
  publishedAt: string
  readTime: number
  featured: boolean
}

// Sample blog post content
const blogPostContent = `
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.</p>

<h2>The Importance of Digital Transformation</h2>

<p>Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>

<p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec ullamcorper nulla non metus auctor fringilla.</p>

<h2>Key Strategies for Success</h2>

<p>Cras mattis consectetur purus sit amet fermentum. Donec id elit non mi porta gravida at eget metus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>

<ul>
  <li>Focus on user experience</li>
  <li>Implement data-driven decision making</li>
  <li>Embrace agile methodologies</li>
  <li>Invest in continuous learning</li>
</ul>

<h2>Looking Ahead</h2>

<p>Maecenas sed diam eget risus varius blandit sit amet non magna. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo.</p>

<blockquote>
  <p>"Innovation distinguishes between a leader and a follower."</p>
  <cite>— Steve Jobs</cite>
</blockquote>

<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ullamcorper nulla non metus auctor fringilla.</p>
`

// Sample blog posts data for related posts
const sampleBlogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "10 Web Design Trends for 2023",
    excerpt: "Discover the latest web design trends that are dominating the digital landscape in 2023.",
    content: blogPostContent,
    slug: "web-design-trends-2023",
    coverImage: "/placeholder.svg?height=600&width=800",
    category: "design",
    author: "Maria Gonzalez",
    authorImage: "/placeholder.svg?height=100&width=100",
    authorBio:
      "Maria is a senior web designer with over 10 years of experience in creating beautiful and functional websites.",
    publishedAt: "2023-03-15",
    readTime: 5,
    featured: true,
  },
  {
    id: "post-2",
    title: "How E-commerce is Evolving in 2023",
    excerpt: "Learn about the latest e-commerce trends and how they're shaping the future of online retail.",
    content: blogPostContent,
    slug: "ecommerce-evolution-2023",
    coverImage: "/placeholder.svg?height=600&width=800",
    category: "ecommerce",
    author: "Alex Rodriguez",
    authorImage: "/placeholder.svg?height=100&width=100",
    authorBio: "Alex is the founder and CEO of Gorilla-Labs with extensive experience in e-commerce solutions.",
    publishedAt: "2023-04-22",
    readTime: 7,
    featured: true,
  },
  {
    id: "post-3",
    title: "The Rise of Progressive Web Apps",
    excerpt: "Progressive Web Apps are changing how users interact with mobile websites. Here's what you need to know.",
    content: blogPostContent,
    slug: "progressive-web-apps-rise",
    coverImage: "/placeholder.svg?height=600&width=800",
    category: "mobile",
    author: "David Kim",
    authorImage: "/placeholder.svg?height=100&width=100",
    authorBio: "David is a mobile app developer specializing in cross-platform solutions and progressive web apps.",
    publishedAt: "2023-05-10",
    readTime: 6,
    featured: false,
  },
  {
    id: "post-4",
    title: "SEO Strategies That Actually Work",
    excerpt: "Cut through the noise and discover SEO strategies that deliver real results for your business.",
    content: blogPostContent,
    slug: "effective-seo-strategies",
    coverImage: "/placeholder.svg?height=600&width=800",
    category: "marketing",
    author: "Sofia Patel",
    authorImage: "/placeholder.svg?height=100&width=100",
    authorBio: "Sofia is a digital marketing expert with a focus on SEO and content strategy.",
    publishedAt: "2023-06-05",
    readTime: 8,
    featured: false,
  },
]

export default function BlogPostPage() {
  const { language } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    // In a real app, you would fetch the post data from an API
    // For now, we'll simulate this by finding the post in our sample data
    const slug = params.slug as string
    const foundPost = sampleBlogPosts.find((p) => p.slug === slug)

    if (foundPost) {
      setPost(foundPost)

      // Find related posts (same category, excluding current post)
      const related = sampleBlogPosts
        .filter((p) => p.category === foundPost.category && p.id !== foundPost.id)
        .slice(0, 3)

      setRelatedPosts(related)
    } else {
      // Post not found, redirect to blog index
      router.push("/blog")
    }
  }, [params.slug, router])

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "design":
        return language === "en" ? "Design" : "Diseño"
      case "ecommerce":
        return language === "en" ? "E-commerce" : "Comercio Electrónico"
      case "mobile":
        return language === "en" ? "Mobile" : "Móvil"
      case "marketing":
        return language === "en" ? "Marketing" : "Marketing"
      case "industry":
        return language === "en" ? "Industry" : "Industria"
      case "security":
        return language === "en" ? "Security" : "Seguridad"
      default:
        return category
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(language === "en" ? "en-US" : "es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  if (!post) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center py-16">
        <p className="text-lg text-muted-foreground">{language === "en" ? "Loading..." : "Cargando..."}</p>
      </div>
    )
  }

  return (
    <div className="container py-16">
      {post && (
        <Seo
          title={post.title}
          description={post.excerpt}
          keywords={`${getCategoryLabel(post.category)}, ${post.title.split(" ").slice(0, 5).join(", ")}`}
          canonical={`https://gorillalabs.dev/blog/${post.slug}`}
          type="article"
          author={post.author}
          ogImage={post.coverImage}
        />
      )}
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {language === "en" ? "Back to Blog" : "Volver al Blog"}
      </Link>

      <div className="mb-8">
        <Badge className="mb-4">{getCategoryLabel(post.category)}</Badge>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>
              {post.readTime} {language === "en" ? "min read" : "min de lectura"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
        </div>
      </div>

      <div className="relative mb-8 aspect-[21/9] w-full overflow-hidden rounded-lg">
        <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_300px]">
        <div>
          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Section */}
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-bold">
              {language === "en" ? "Share this article" : "Comparte este artículo"}
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" aria-label="Share on Facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" aria-label="Share on Twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" aria-label="Share on LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" aria-label="Share">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Author Section */}
          {post.authorBio && (
            <div className="mt-8 rounded-lg border p-6">
              <div className="flex items-start gap-4">
                {post.authorImage && (
                  <div className="relative h-16 w-16 overflow-hidden rounded-full">
                    <Image
                      src={post.authorImage || "/placeholder.svg"}
                      alt={post.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold">{post.author}</h3>
                  <p className="text-muted-foreground">{post.authorBio}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          {relatedPosts.length > 0 && (
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 text-lg font-bold">
                {language === "en" ? "Related Articles" : "Artículos Relacionados"}
              </h3>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <div key={relatedPost.id}>
                    <Link href={`/blog/${relatedPost.slug}`} className="group block">
                      <div className="relative mb-2 aspect-video w-full overflow-hidden rounded-md">
                        <Image
                          src={relatedPost.coverImage || "/placeholder.svg"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h4 className="font-medium group-hover:text-primary">{relatedPost.title}</h4>
                      <p className="text-sm text-muted-foreground">{formatDate(relatedPost.publishedAt)}</p>
                    </Link>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
