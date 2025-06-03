"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/context/language-context"
import { Users, DollarSign, BarChart3, Clock } from "lucide-react"

export function CrmStats() {
  const { language } = useLanguage()

  const stats = [
    {
      title: language === "en" ? "Total Leads" : "Total de Leads",
      value: "24",
      change: "+12%",
      icon: <Users className="h-5 w-5 text-primary" />,
    },
    {
      title: language === "en" ? "Open Deals" : "Oportunidades Abiertas",
      value: "8",
      change: "+5%",
      icon: <DollarSign className="h-5 w-5 text-primary" />,
    },
    {
      title: language === "en" ? "Conversion Rate" : "Tasa de Conversión",
      value: "33%",
      change: "+2%",
      icon: <BarChart3 className="h-5 w-5 text-primary" />,
    },
    {
      title: language === "en" ? "Avg. Sales Cycle" : "Ciclo de Venta Prom.",
      value: "18 " + (language === "en" ? "days" : "días"),
      change: "-3 " + (language === "en" ? "days" : "días"),
      icon: <Clock className="h-5 w-5 text-primary" />,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className="rounded-full bg-primary/10 p-2 text-primary">{stat.icon}</div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm text-green-500">
              <span>{stat.change}</span>
              <span className="text-muted-foreground">
                {language === "en" ? "from last month" : "desde el mes pasado"}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
