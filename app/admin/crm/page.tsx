"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/context/language-context"
import { Plus } from "lucide-react"
import { SalesPipeline } from "@/components/admin/crm/sales-pipeline"
import { RecentLeads } from "@/components/admin/crm/recent-leads"
import { CrmStats } from "@/components/admin/crm/crm-stats"

export default function CrmDashboard() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{language === "en" ? "CRM Dashboard" : "Panel de CRM"}</h1>
        <Link href="/admin/crm/leads/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {language === "en" ? "Add New Lead" : "Añadir Nuevo Lead"}
          </Button>
        </Link>
      </div>

      <CrmStats />

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">{language === "en" ? "Overview" : "Resumen"}</TabsTrigger>
          <TabsTrigger value="pipeline">{language === "en" ? "Sales Pipeline" : "Pipeline de Ventas"}</TabsTrigger>
          <TabsTrigger value="leads">{language === "en" ? "Leads" : "Leads"}</TabsTrigger>
          <TabsTrigger value="deals">{language === "en" ? "Deals" : "Oportunidades"}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{language === "en" ? "Recent Leads" : "Leads Recientes"}</CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Latest potential customers added to the system"
                    : "Últimos clientes potenciales añadidos al sistema"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentLeads />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{language === "en" ? "Upcoming Tasks" : "Próximas Tareas"}</CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Your scheduled activities and follow-ups"
                    : "Tus actividades programadas y seguimientos"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border p-4 text-center text-muted-foreground">
                  {language === "en" ? "No upcoming tasks for today" : "No hay tareas programadas para hoy"}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Sales Pipeline Overview" : "Resumen del Pipeline de Ventas"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Current status of your sales opportunities"
                  : "Estado actual de tus oportunidades de venta"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SalesPipeline compact />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Sales Pipeline" : "Pipeline de Ventas"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Drag and drop deals between stages to update their status"
                  : "Arrastra y suelta oportunidades entre etapas para actualizar su estado"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SalesPipeline />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{language === "en" ? "Leads Management" : "Gestión de Leads"}</CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Manage your potential customers and leads"
                    : "Gestiona tus clientes potenciales y leads"}
                </CardDescription>
              </div>
              <Link href="/admin/crm/leads">
                <Button variant="outline">{language === "en" ? "View All Leads" : "Ver Todos los Leads"}</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <RecentLeads extended />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deals">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{language === "en" ? "Deals Management" : "Gestión de Oportunidades"}</CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Manage your active deals and opportunities"
                    : "Gestiona tus oportunidades y negocios activos"}
                </CardDescription>
              </div>
              <Link href="/admin/crm/deals">
                <Button variant="outline">
                  {language === "en" ? "View All Deals" : "Ver Todas las Oportunidades"}
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4 text-center text-muted-foreground">
                {language === "en"
                  ? "Convert leads to deals to see them here"
                  : "Convierte leads en oportunidades para verlos aquí"}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
