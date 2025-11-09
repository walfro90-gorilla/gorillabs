"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// Removed direct import - now using API route
import { useLanguage } from "@/context/language-context"
import { Loader2, TrendingUp, TrendingDown, Minus } from "lucide-react"

export function SentimentAnalysis() {
  const { language, translations } = useLanguage()
  const [text, setText] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [sentiment, setSentiment] = useState<"positive" | "negative" | "neutral" | null>(null)

  const handleAnalyze = async () => {
    if (!text.trim()) return

    setLoading(true)
    setResult(null)
    setSentiment(null)

    try {
      const response = await fetch('/api/sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          language: language
        })
      })

      const data = await response.json()
      
      if (data.error) {
        setResult(`Error: ${data.error}`)
      } else {
        setResult(data.text)
        
        // Extract sentiment from response
        const lowerText = data.text.toLowerCase()
        if (lowerText.includes("positivo") || lowerText.includes("positive") || lowerText.includes("积极")) {
          setSentiment("positive")
        } else if (lowerText.includes("negativo") || lowerText.includes("negative") || lowerText.includes("消极")) {
          setSentiment("negative")
        } else {
          setSentiment("neutral")
        }
      }
    } catch (error) {
      console.error('Error calling sentiment API:', error)
      setResult("Error analyzing sentiment. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getSentimentIcon = () => {
    if (sentiment === "positive") return <TrendingUp className="h-6 w-6 text-green-500" />
    if (sentiment === "negative") return <TrendingDown className="h-6 w-6 text-red-500" />
    return <Minus className="h-6 w-6 text-gray-500" />
  }

  const getTitle = () => {
    if (language === "es") return "Análisis de Sentimientos"
    if (language === "zh") return "情感分析"
    return "Sentiment Analysis"
  }

  const getDescription = () => {
    if (language === "es") return "Analiza el sentimiento de cualquier texto usando IA"
    if (language === "zh") return "使用AI分析任何文本的情感"
    return "Analyze the sentiment of any text using AI"
  }

  const getPlaceholder = () => {
    if (language === "es") return "Escribe el texto que quieres analizar..."
    if (language === "zh") return "输入要分析的文本..."
    return "Enter the text you want to analyze..."
  }

  const getButtonText = () => {
    if (language === "es") return "Analizar"
    if (language === "zh") return "分析"
    return "Analyze"
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getSentimentIcon()}
          {getTitle()}
        </CardTitle>
        <CardDescription>{getDescription()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder={getPlaceholder()}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[120px]"
        />
        <Button onClick={handleAnalyze} disabled={loading || !text.trim()} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {language === "es" ? "Analizando..." : language === "zh" ? "分析中..." : "Analyzing..."}
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

