"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { ArrowRight } from "lucide-react"

const Hero = () => {
  const { translations } = useLanguage()
  const [typedText, setTypedText] = useState("")
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const phrases = [translations.hero.phrase1, translations.hero.phrase2, translations.hero.phrase3]

  useEffect(() => {
    let isMounted = true
    let charIndex = 0
    let timer: NodeJS.Timeout

    const typeText = () => {
      if (!isMounted) return

      const currentPhrase = phrases[currentPhraseIndex]

      if (charIndex < currentPhrase.length) {
        setTypedText(currentPhrase.substring(0, charIndex + 1))
        charIndex++
        timer = setTimeout(typeText, 100)
      } else {
        // Wait before erasing
        timer = setTimeout(eraseText, 2000)
      }
    }

    const eraseText = () => {
      if (!isMounted) return

      if (charIndex > 0) {
        setTypedText(phrases[currentPhraseIndex].substring(0, charIndex - 1))
        charIndex--
        timer = setTimeout(eraseText, 50)
      } else {
        // Move to next phrase
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
        // Wait before typing next phrase
        timer = setTimeout(typeText, 500)
      }
    }

    timer = setTimeout(typeText, 1000)

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [currentPhraseIndex])

  return (
    <div className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-black text-primary-foreground">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/i3sD9iUSiaU?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&playlist=i3sD9iUSiaU"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute w-[300%] h-[300%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ pointerEvents: "none" }}
            frameBorder="0"
          ></iframe>
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 flex flex-col items-center justify-center gap-8 text-center">
        <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">{translations.hero.title}</h1>

        <div className="h-20">
          <h2 className="text-2xl font-medium text-primary md:text-3xl">
            {typedText}
            <span className="animate-pulse">|</span>
          </h2>
        </div>

        <p className="max-w-2xl text-lg text-gray-300">{translations.hero.description}</p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/services">
            <Button size="lg" className="gap-2">
              {translations.hero.cta}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/portfolio">
            <Button variant="outline" size="lg">
              {translations.hero.portfolio}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
