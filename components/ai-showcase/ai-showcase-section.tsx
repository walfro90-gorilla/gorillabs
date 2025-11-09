"use client"

import { SentimentAnalysis } from "./sentiment-analysis"
import { TextGenerator } from "./text-generator"
import { useLanguage } from "@/context/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Sparkles, TrendingUp } from "lucide-react"

export function AIShowcaseSection() {
  const { language } = useLanguage()

  const getTitle = () => {
    if (language === "es") return "Demostración de IA"
    if (language === "zh") return "AI演示"
    return "AI Showcase"
  }

  const getSubtitle = () => {
    if (language === "es") return "Explora nuestras capacidades de inteligencia artificial"
    if (language === "zh") return "探索我们的人工智能能力"
    return "Explore our artificial intelligence capabilities"
  }

  return (
    <section id="ai-showcase" className="w-full py-20 bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold">{getTitle()}</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {getSubtitle()}
          </p>
        </div>

        <Tabs defaultValue="sentiment" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="sentiment" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              {language === "es" ? "Análisis" : language === "zh" ? "分析" : "Analysis"}
            </TabsTrigger>
            <TabsTrigger value="generator" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              {language === "es" ? "Generador" : language === "zh" ? "生成器" : "Generator"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sentiment" className="mt-8">
            <div className="max-w-2xl mx-auto">
              <SentimentAnalysis />
            </div>
          </TabsContent>

          <TabsContent value="generator" className="mt-8">
            <div className="max-w-2xl mx-auto">
              <TextGenerator />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

