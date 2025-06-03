"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/context/language-context"
import { useToast } from "@/hooks/use-toast"
import { Plus, Search, MoreHorizontal, Filter, Mail, Phone, Building, Calendar } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  company: string
  source: string
  status: "new" | "contacted" | "qualified" | "unqualified"
  createdAt: string
  assignedTo?: string
}

export default function LeadsPage() {
  const { toast } = useToast()
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

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
      assignedTo: "Maria Gonzalez",
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
      assignedTo: "Alex Rodriguez",
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
      assignedTo: "Sofia Patel",
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
    {
      id: "lead-5",
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "+1 (555) 234-5678",
      company: "Brown Consulting",
      source: "Trade Show",
      status: "new",
      createdAt: "2023-11-20",
      assignedTo: "David Kim",
    },
    {
      id: "lead-6",
      name: "Jennifer Lee",
      email: "jennifer@example.com",
      phone: "+1 (555) 345-6789",
      company: "Lee Enterprises",
      source: "Website",
      status: "contacted",
      createdAt: "2023-11-18",
    },
  ])

  // Function to update lead status
  const updateLeadStatus = (leadId: string, newStatus: Lead["status"]) => {
    setLeads(leads.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead)))

    toast({
      title: language === "en" ? "Lead Updated" : "Lead Actualizado",
      description:
        language === "en" ? `Lead status changed to ${newStatus}` : `Estado del lead cambiado a ${newStatus}`,
    })
  }

  // Function to delete lead
  const deleteLead = (leadId: string) => {
    setLeads(leads.filter((lead) => lead.id !== leadId))

    toast({
      title: language === "en" ? "Lead Deleted" : "Lead Eliminado",
      description: language === "en" ? "The lead has been deleted successfully" : "El lead ha sido eliminado con éxito",
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

  // Filter leads based on search and status
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Mobile card view for each lead
  const LeadCard = ({ lead }: { lead: Lead }) => (
    <Card className="mb-4 md:hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium">{lead.name}</h3>
            <p className="text-sm text-muted-foreground">{lead.company}</p>
          </div>
          <Badge className={`${getStatusColor(lead.status)} text-white`}>{getStatusLabel(lead.status)}</Badge>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{lead.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{lead.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{lead.source}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{formatDate(lead.createdAt)}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm">
            {lead.assignedTo ? (
              <span>{lead.assignedTo}</span>
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
                <Link href={`/admin/crm/leads/${lead.id}`}>{language === "en" ? "View Details" : "Ver Detalles"}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/admin/crm/leads/edit/${lead.id}`}>{language === "en" ? "Edit Lead" : "Editar Lead"}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "contacted")}>
                {language === "en" ? "Mark as Contacted" : "Marcar como Contactado"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "qualified")}>
                {language === "en" ? "Mark as Qualified" : "Marcar como Calificado"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteLead(lead.id)}>
                {language === "en" ? "Delete Lead" : "Eliminar Lead"}
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
          {language === "en" ? "Leads Management" : "Gestión de Leads"}
        </h1>
        <Link href="/admin/crm/leads/new">
          <Button className="gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            {language === "en" ? "Add New Lead" : "Añadir Nuevo Lead"}
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>{language === "en" ? "All Leads" : "Todos los Leads"}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === "en" ? "Search leads..." : "Buscar leads..."}
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 w-full sm:w-auto">
                  <Filter className="h-4 w-4" />
                  {statusFilter === "all"
                    ? language === "en"
                      ? "All Status"
                      : "Todos los Estados"
                    : getStatusLabel(statusFilter as Lead["status"])}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  {language === "en" ? "All Status" : "Todos los Estados"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("new")}>
                  {language === "en" ? "New" : "Nuevo"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("contacted")}>
                  {language === "en" ? "Contacted" : "Contactado"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("qualified")}>
                  {language === "en" ? "Qualified" : "Calificado"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("unqualified")}>
                  {language === "en" ? "Unqualified" : "No Calificado"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent>
          {/* Mobile view - cards */}
          <div className="md:hidden">
            {filteredLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}

            {filteredLeads.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {language === "en" ? "No leads found" : "No se encontraron leads"}
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
                      <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Name" : "Nombre"}</th>
                      <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Contact" : "Contacto"}</th>
                      <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Company" : "Empresa"}</th>
                      <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Source" : "Fuente"}</th>
                      <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Created" : "Creado"}</th>
                      <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Status" : "Estado"}</th>
                      <th className="px-4 py-2 text-left font-medium">
                        {language === "en" ? "Assigned To" : "Asignado A"}
                      </th>
                      <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Actions" : "Acciones"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="border-b">
                        <td className="px-4 py-4">
                          <div className="font-medium">{lead.name}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{lead.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{lead.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span>{lead.company}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">{lead.source}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(lead.createdAt)}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Badge className={`${getStatusColor(lead.status)} text-white`}>
                            {getStatusLabel(lead.status)}
                          </Badge>
                        </td>
                        <td className="px-4 py-4">
                          {lead.assignedTo || (
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
                                <Link href={`/admin/crm/leads/${lead.id}`}>
                                  {language === "en" ? "View Details" : "Ver Detalles"}
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/crm/leads/edit/${lead.id}`}>
                                  {language === "en" ? "Edit Lead" : "Editar Lead"}
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "contacted")}>
                                {language === "en" ? "Mark as Contacted" : "Marcar como Contactado"}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "qualified")}>
                                {language === "en" ? "Mark as Qualified" : "Marcar como Calificado"}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteLead(lead.id)}>
                                {language === "en" ? "Delete Lead" : "Eliminar Lead"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}

                    {filteredLeads.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center">
                          <p className="text-muted-foreground">
                            {language === "en" ? "No leads found" : "No se encontraron leads"}
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

