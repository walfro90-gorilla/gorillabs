"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// Removed direct import - now using API route
import { useLanguage } from "@/context/language-context"
import { Loader2, Sparkles } from "lucide-react"

export function TextGenerator() {
  const { language } = useLanguage()
  const [prompt, setPrompt] = useState("")
  const [context, setContext] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          context: context.trim(),
          language: language
        })
      })

      const data = await response.json()
      
      if (data.error) {
        setResult(`Error: ${data.error}`)
      } else {
        setResult(data.text)
      }
    } catch (error) {
      console.error('Error calling text generation API:', error)
      setResult("Error generating text. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getTitle = () => {
    if (language === "es") return "Generador de Texto con IA"
    if (language === "zh") return "AI文本生成器"
    return "AI Text Generator"
  }

  const getDescription = () => {
    if (language === "es") return "Genera texto creativo usando inteligencia artificial"
    if (language === "zh") return "使用人工智能生成创意文本"
    return "Generate creative text using artificial intelligence"
  }

  const getPromptPlaceholder = () => {
    if (language === "es") return "Describe qué quieres generar..."
    if (language === "zh") return "描述你想要生成的内容..."
    return "Describe what you want to generate..."
  }

  const getContextPlaceholder = () => {
    if (language === "es") return "Contexto adicional (opcional)..."
    if (language === "zh") return "附加上下文（可选）..."
    return "Additional context (optional)..."
  }

  const getButtonText = () => {
    if (language === "es") return "Generar"
    if (language === "zh") return "生成"
    return "Generate"
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          {getTitle()}
        </CardTitle>
        <CardDescription>{getDescription()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input
            placeholder={getContextPlaceholder()}
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
        </div>
        <Textarea
          placeholder={getPromptPlaceholder()}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[120px]"
        />
        <Button onClick={handleGenerate} disabled={loading || !prompt.trim()} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {language === "es" ? "Generando..." : language === "zh" ? "生成中..." : "Generating..."}
            </>
          ) : (
            getButtonText()
          )}
        </Button>
        {result && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm whitespace-pre-wrap">{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

