import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gorilla-Labs",
    short_name: "GLabs",
    description: "Transformamos tus ideas en soluciones tecnológicas",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#FFD700",
    icons: [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glabs-logo.jpg-hrzbXAlZYwpe9notvpjbnI7ZB1vNWW.jpeg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glabs-logo.jpg-hrzbXAlZYwpe9notvpjbnI7ZB1vNWW.jpeg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  }
}

