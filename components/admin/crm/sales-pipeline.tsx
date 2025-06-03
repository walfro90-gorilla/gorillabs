"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { DollarSign, Calendar, User, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface Deal {
  id: string
  title: string
  client: string
  value: number
  stage: string
  dueDate: string
  probability: number
}

interface SalesPipelineProps {
  compact?: boolean
}

export function SalesPipeline({ compact = false }: SalesPipelineProps) {
  const { language } = useLanguage()

  // Pipeline stages
  const stages = [
    { id: "lead", name: language === "en" ? "Lead" : "Lead" },
    { id: "qualified", name: language === "en" ? "Qualified" : "Calificado" },
    { id: "proposal", name: language === "en" ? "Proposal" : "Propuesta" },
    { id: "negotiation", name: language === "en" ? "Negotiation" : "Negociación" },
    { id: "closed", name: language === "en" ? "Closed Won" : "Cerrado Ganado" },
  ]

  // Sample deals data
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: "deal-1",
      title: "Website Redesign",
      client: "TechCorp Inc.",
      value: 4500,
      stage: "lead",
      dueDate: "2023-12-15",
      probability: 20,
    },
    {
      id: "deal-2",
      title: "E-commerce Platform",
      client: "Fashion Boutique",
      value: 8500,
      stage: "qualified",
      dueDate: "2023-12-20",
      probability: 40,
    },
    {
      id: "deal-3",
      title: "Mobile App Development",
      client: "HealthTech Solutions",
      value: 12000,
      stage: "proposal",
      dueDate: "2023-12-30",
      probability: 60,
    },
    {
      id: "deal-4",
      title: "SEO Services",
      client: "Local Restaurant",
      value: 1500,
      stage: "negotiation",
      dueDate: "2023-12-10",
      probability: 80,
    },
    {
      id: "deal-5",
      title: "Corporate Website",
      client: "Global Enterprises",
      value: 7500,
      stage: "closed",
      dueDate: "2023-12-05",
      probability: 100,
    },
  ])

  // Function to handle drag start
  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    e.dataTransfer.setData("dealId", dealId)
  }

  // Function to handle drop
  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault()
    const dealId = e.dataTransfer.getData("dealId")

    // Update the deal's stage
    setDeals(deals.map((deal) => (deal.id === dealId ? { ...deal, stage: stageId } : deal)))
  }

  // Function to allow drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  // Function to move a deal to the next stage
  const moveToNextStage = (dealId: string) => {
    const deal = deals.find((d) => d.id === dealId)
    if (!deal) return

    const currentStageIndex = stages.findIndex((s) => s.id === deal.stage)
    if (currentStageIndex < stages.length - 1) {
      const nextStage = stages[currentStageIndex + 1].id
      setDeals(deals.map((d) => (d.id === dealId ? { ...d, stage: nextStage } : d)))
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(language === "en" ? "en-US" : "es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // If compact view is requested, show a simplified version
  if (compact) {
    return (
      <div className="space-y-4">
        {stages.map((stage) => {
          const stageDeals = deals.filter((deal) => deal.stage === stage.id)
          const totalValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0)

          return (
            <div key={stage.id} className="flex items-center gap-4">
              <div className="w-32 font-medium">{stage.name}</div>
              <div className="flex-1 rounded-full bg-muted h-2.5">
                <div
                  className="h-2.5 rounded-full bg-primary"
                  style={{ width: `${(stageDeals.length / deals.length) * 100}%` }}
                ></div>
              </div>
              <div className="w-20 text-right font-medium">{stageDeals.length}</div>
              <div className="w-32 text-right font-medium">${totalValue.toLocaleString()}</div>
            </div>
          )
        })}
      </div>
    )
  }

  // Full pipeline view with horizontal scroll for mobile
  return (
    <ScrollArea className="w-full">
      <div className="flex gap-4 pb-4 min-w-[800px]">
        {stages.map((stage) => {
          const stageDeals = deals.filter((deal) => deal.stage === stage.id)
          const totalValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0)

          return (
            <div
              key={stage.id}
              className="flex-shrink-0 w-[250px]"
              onDrop={(e) => handleDrop(e, stage.id)}
              onDragOver={handleDragOver}
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{stage.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {stageDeals.length} {language === "en" ? "deals" : "oportunidades"} · ${totalValue.toLocaleString()}
                  </p>
                </div>
                <Badge variant="outline">{stageDeals.length}</Badge>
              </div>

              <div className="space-y-3">
                {stageDeals.map((deal) => (
                  <Card
                    key={deal.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, deal.id)}
                    className="cursor-move"
                  >
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="font-medium">{deal.title}</h4>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => moveToNextStage(deal.id)}>
                              {language === "en" ? "Move to Next Stage" : "Mover a la Siguiente Etapa"}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {language === "en" ? "Edit Deal" : "Editar Oportunidad"}
                            </DropdownMenuItem>
                            <DropdownMenuItem>{language === "en" ? "Add Note" : "Añadir Nota"}</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{deal.client}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>${deal.value.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(deal.dueDate)}</span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs">
                          <span>
                            {language === "en" ? "Probability" : "Probabilidad"}: {deal.probability}%
                          </span>
                          <span>{deal.probability}%</span>
                        </div>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
                          <div
                            className="h-1.5 rounded-full bg-primary"
                            style={{ width: `${deal.probability}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {stageDeals.length === 0 && (
                  <div className="rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground">
                    {language === "en" ? "Drag and drop deals here" : "Arrastra y suelta oportunidades aquí"}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
