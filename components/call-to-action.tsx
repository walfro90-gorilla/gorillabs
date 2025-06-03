"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { ArrowRight } from "lucide-react"

const CallToAction = () => {
  const { translations } = useLanguage()

  return (
    <div className="container">
      <div className="rounded-lg bg-black p-8 text-primary-foreground md:p-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl">{translations.cta.title}</h2>
          <p className="mb-8 text-lg text-gray-300">{translations.cta.description}</p>
          <Link href="/contact">
            <Button size="lg" className="gap-2">
              {translations.cta.button}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CallToAction
