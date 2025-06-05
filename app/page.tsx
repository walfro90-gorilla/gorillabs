import { Seo } from "@/components/seo"

export default function Home() {
  return (
    <>
      <Seo
        title="Desarrollo Web, Apps y E-commerce"
        description="Gorilla Labs - Startup de soluciones tecnológicas. Creamos websites, e-commerce y apps para empresas en El Paso TX y Ciudad Juárez. Transformamos ideas en soluciones digitales."
        keywords="desarrollo web, aplicaciones móviles, e-commerce, startup tecnológica, El Paso TX, Ciudad Juárez, web development, mobile apps"
        canonical="https://gorillalabs.dev"
        type="website"
        language="es"
        alternateLanguages={[
          { lang: "en", url: "https://gorillalabs.dev/en" },
          { lang: "es", url: "https://gorillalabs.dev" },
        ]}
      />
      <div>
        {/* Your page content here */}
        <h1>Welcome to Gorilla Labs</h1>
        <p>We build websites, apps, and e-commerce solutions.</p>
      </div>
    </>
  )
}
