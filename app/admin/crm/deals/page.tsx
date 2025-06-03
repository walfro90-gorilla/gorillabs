"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/context/language-context"
import { useToast } from "@/hooks/use-toast"
import { Plus, Search, Filter, MoreHorizontal, DollarSign, User, Calendar, BarChart3 } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface Deal {
  id: string
  title: string
  client: string
  value: number
  stage: "lead" | "qualified" | "proposal" | "negotiation" | "closed"
  dueDate: string
  probability: number
  assignedTo?: string
}

export default function DealsPage() {
  const { toast } = useToast()
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [stageFilter, setStageFilter] = useState("all")

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
      assignedTo: "Maria Gonzalez",
    },
    {
      id: "deal-2",
      title: "E-commerce Platform",
      client: "Fashion Boutique",
      value: 8500,
      stage: "qualified",
      dueDate: "2023-12-20",
      probability: 40,
      assignedTo: "Alex Rodriguez",
    },
    {
      id: "deal-3",
      title: "Mobile App Development",
      client: "HealthTech Solutions",
      value: 12000,
      stage: "proposal",
      dueDate: "2023-12-30",
      probability: 60,
      assignedTo: "David Kim",
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
      assignedTo: "Sofia Patel",
    },
  ])

  // Function to update deal stage
  const updateDealStage = (dealId: string, newStage: Deal["stage"]) => {
    setDeals(deals.map((deal) => (deal.id === dealId ? { ...deal, stage: newStage } : deal)))

    toast({
      title: language === "en" ? "Deal Updated" : "Oportunidad Actualizada",
      description:
        language === "en"
          ? `Deal stage changed to ${getStageLabel(newStage)}`
          : `Etapa de la oportunidad cambiada a ${getStageLabel(newStage)}`,
    })
  }

  // Function to delete deal
  const deleteDeal = (dealId: string) => {
    setDeals(deals.filter((deal) => deal.id !== dealId))

    toast({
      title: language === "en" ? "Deal Deleted" : "Oportunidad Eliminada",
      description:
        language === "en" ? "The deal has been deleted successfully" : "La oportunidad ha sido eliminada con éxito",
    })
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

  // Get stage badge color
  const getStageColor = (stage: Deal["stage"]) => {
    switch (stage) {
      case "lead":
        return "bg-blue-500"
      case "qualified":
        return "bg-indigo-500"
      case "proposal":
        return "bg-yellow-500"
      case "negotiation":
        return "bg-orange-500"
      case "closed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get stage label
  const getStageLabel = (stage: Deal["stage"]) => {
    if (language === "en") {
      switch (stage) {
        case "lead":
          return "Lead"
        case "qualified":
          return "Qualified"
        case "proposal":
          return "Proposal"
        case "negotiation":
          return "Negotiation"
        case "closed":
          return "Closed Won"
        default:
          return stage
      }
    } else {
      switch (stage) {
        case "lead":
          return "Lead"
        case "qualified":
          return "Calificado"
        case "proposal":
          return "Propuesta"
        case "negotiation":
          return "Negociación"
        case "closed":
          return "Cerrado Ganado"
        default:
          return stage
      }
    }
  }

  // Filter deals based on search and stage
  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.client.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStage = stageFilter === "all" || deal.stage === stageFilter

    return matchesSearch && matchesStage
  })

  // Mobile card view for each deal
  const DealCard = ({ deal }: { deal: Deal }) => (
    <Card className="mb-4 md:hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium">{deal.title}</h3>
            <div className="flex items-center gap-1 mt-1">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{deal.client}</span>
            </div>
          </div>
          <Badge className={`${getStageColor(deal.stage)} text-white`}>{getStageLabel(deal.stage)}</Badge>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">${deal.value.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{formatDate(deal.dueDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{deal.probability}%</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm">
            {deal.assignedTo ? (
              <span>{deal.assignedTo}</span>
            ) : (
              <span className="text-muted-foreground">{language === "en" ? "Unassigned" : "Sin asignar"}</span>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/admin/crm/deals/${deal.id}`}>{language === "en" ? "View Details" : "Ver Detalles"}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/admin/crm/deals/edit/${deal.id}`}>
                  {language === "en" ? "Edit Deal" : "Editar Oportunidad"}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateDealStage(deal.id, "proposal")}>
                {language === "en" ? "Move to Proposal" : "Mover a Propuesta"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateDealStage(deal.id, "closed")}>
                {language === "en" ? "Mark as Won" : "Marcar como Ganada"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteDeal(deal.id)}>
                {language === "en" ? "Delete Deal" : "Eliminar Oportunidad"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6 px-4 md:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">
          {language === "en" ? "Deals Management" : "Gestión de Oportunidades"}
        </h1>
        <Link href="/admin/crm/deals/new">
          <Button className="gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            {language === "en" ? "Add New Deal" : "Añadir Nueva Oportunidad"}
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>{language === "en" ? "All Deals" : "Todas las Oportunidades"}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === "en" ? "Search deals..." : "Buscar oportunidades..."}
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 w-full sm:w-auto">
                  <Filter className="h-4 w-4" />
                  {stageFilter === "all"
                    ? language === "en"
                      ? "All Stages"
                      : "Todas las Etapas"
                    : getStageLabel(stageFilter as Deal["stage"])}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStageFilter("all")}>
                  {language === "en" ? "All Stages" : "Todas las Etapas"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStageFilter("lead")}>
                  {language === "en" ? "Lead" : "Lead"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStageFilter("qualified")}>
                  {language === "en" ? "Qualified" : "Calificado"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStageFilter("proposal")}>
                  {language === "en" ? "Proposal" : "Propuesta"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStageFilter("negotiation")}>
                  {language === "en" ? "Negotiation" : "Negociación"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStageFilter("closed")}>
                  {language === "en" ? "Closed Won" : "Cerrado Ganado"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent>
          {/* Mobile view - cards */}
          <div className="md:hidden">
            {filteredDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}

            {filteredDeals.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {language === "en" ? "No deals found" : "No se encontraron oportunidades"}
                </p>
              </div>
            )}
          </div>

          {/* Desktop view - table */}
          <div className="hidden md:block">
            <ScrollArea className="w-full">
              <div className="min-w-[1000px]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Deal" : "Oportunidad"}</th>
                      <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Client" : "Cliente"}</th>
                      <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Value" : "Valor"}</th>
                      <th className="px-4 py-2 text-left font-medium">
                        {language === "en" ? "Due Date" : "Fecha Límite"}
                      </th>
                      <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Stage" : "Etapa"}</th>
                      <th className="px-4 py-2 text-left font-medium">
                        {language === "en" ? "Probability" : "Probabilidad"}
                      </th>
                      <th className="px-4 py-2 text-left font-medium">
                        {language === "en" ? "Assigned To" : "Asignado A"}
                      </th>
                      <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Actions" : "Acciones"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDeals.map((deal) => (
                      <tr key={deal.id} className="border-b">
                        <td className="px-4 py-4">
                          <div className="font-medium">{deal.title}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{deal.client}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">${deal.value.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(deal.dueDate)}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Badge className={`${getStageColor(deal.stage)} text-white`}>
                            {getStageLabel(deal.stage)}
                          </Badge>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                            <span>{deal.probability}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          {deal.assignedTo || (
                            <span className="text-muted-foreground">
                              {language === "en" ? "Unassigned" : "Sin asignar"}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/crm/deals/${deal.id}`}>
                                  {language === "en" ? "View Details" : "Ver Detalles"}
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/crm/deals/edit/${deal.id}`}>
                                  {language === "en" ? "Edit Deal" : "Editar Oportunidad"}
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateDealStage(deal.id, "proposal")}>
                                {language === "en" ? "Move to Proposal" : "Mover a Propuesta"}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateDealStage(deal.id, "closed")}>
                                {language === "en" ? "Mark as Won" : "Marcar como Ganada"}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteDeal(deal.id)}>
                                {language === "en" ? "Delete Deal" : "Eliminar Oportunidad"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}

                    {filteredDeals.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center">
                          <p className="text-muted-foreground">
                            {language === "en" ? "No deals found" : "No se encontraron oportunidades"}
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

