"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useLanguage } from "@/context/language-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ArrowUpRight, Mail, Phone } from "lucide-react"

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  company: string
  source: string
  status: "new" | "contacted" | "qualified" | "unqualified"
  createdAt: string
}

interface RecentLeadsProps {
  extended?: boolean
}

export function RecentLeads({ extended = false }: RecentLeadsProps) {
  const { language } = useLanguage()

  // Sample leads data
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "lead-1",
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      company: "ABC Corporation",
      source: "Website",
      status: "new",
      createdAt: "2023-12-01",
    },
    {
      id: "lead-2",
      name: "Maria Garcia",
      email: "maria@example.com",
      phone: "+1 (555) 987-6543",
      company: "XYZ Industries",
      source: "Referral",
      status: "contacted",
      createdAt: "2023-11-28",
    },
    {
      id: "lead-3",
      name: "David Johnson",
      email: "david@example.com",
      phone: "+1 (555) 456-7890",
      company: "Johnson & Co",
      source: "LinkedIn",
      status: "qualified",
      createdAt: "2023-11-25",
    },
    {
      id: "lead-4",
      name: "Sarah Williams",
      email: "sarah@example.com",
      phone: "+1 (555) 789-0123",
      company: "Williams Design",
      source: "Google",
      status: "unqualified",
      createdAt: "2023-11-22",
    },
  ])

  // Function to update lead status
  const updateLeadStatus = (leadId: string, newStatus: Lead["status"]) => {
    setLeads(leads.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead)))
  }

  // Function to convert lead to deal
  const convertToDeal = (leadId: string) => {
    // In a real app, this would create a deal and possibly update the lead
    alert(`Lead ${leadId} converted to deal`)
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

  // Get status badge color
  const getStatusColor = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-500"
      case "contacted":
        return "bg-yellow-500"
      case "qualified":
        return "bg-green-500"
      case "unqualified":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get status label
  const getStatusLabel = (status: Lead["status"]) => {
    if (language === "en") {
      return status.charAt(0).toUpperCase() + status.slice(1)
    } else {
      switch (status) {
        case "new":
          return "Nuevo"
        case "contacted":
          return "Contactado"
        case "qualified":
          return "Calificado"
        case "unqualified":
          return "No Calificado"
        default:
          return status
      }
    }
  }

  // If extended view is requested, show more details
  if (extended) {
    return (
      <div className="space-y-4">
        {leads.map((lead) => (
          <div key={lead.id} className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{lead.name}</h4>
                <p className="text-sm text-muted-foreground">{lead.company}</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{lead.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{lead.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge className={`${getStatusColor(lead.status)} text-white`}>{getStatusLabel(lead.status)}</Badge>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>{language === "en" ? "View Details" : "Ver Detalles"}</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "contacted")}>
                    {language === "en" ? "Mark as Contacted" : "Marcar como Contactado"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "qualified")}>
                    {language === "en" ? "Mark as Qualified" : "Marcar como Calificado"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => convertToDeal(lead.id)}>
                    {language === "en" ? "Convert to Deal" : "Convertir en Oportunidad"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Simple view for dashboard
  return (
    <div className="space-y-4">
      {leads.slice(0, 3).map((lead) => (
        <div key={lead.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{lead.name}</p>
              <p className="text-sm text-muted-foreground">{lead.company}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className={`${getStatusColor(lead.status)} text-white`}>{getStatusLabel(lead.status)}</Badge>
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/admin/crm/leads/${lead.id}`}>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      ))}

      <Button variant="outline" className="w-full" asChild>
        <Link href="/admin/crm/leads">{language === "en" ? "View All Leads" : "Ver Todos los Leads"}</Link>
      </Button>
    </div>
  )
}

