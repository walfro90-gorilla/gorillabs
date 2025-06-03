"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Briefcase,
  MessageSquare,
} from "lucide-react"
import { useLanguage } from "@/context/language-context"

// Sample data for charts
const salesData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
  { name: "Jul", value: 7000 },
  { name: "Aug", value: 8000 },
  { name: "Sep", value: 7500 },
  { name: "Oct", value: 9000 },
  { name: "Nov", value: 8500 },
  { name: "Dec", value: 10000 },
]

const serviceData = [
  { name: "Web Development", value: 35 },
  { name: "E-commerce", value: 25 },
  { name: "Mobile Apps", value: 20 },
  { name: "Marketing", value: 15 },
  { name: "Industry", value: 5 },
]

const COLORS = ["#FFD700", "#0088FE", "#00C49F", "#FF8042", "#8884D8"]

const recentOrders = [
  {
    id: "ORD-1234",
    customer: "John Doe",
    service: "Basic Website",
    amount: 999,
    status: "completed",
    date: "2023-11-15",
  },
  {
    id: "ORD-5678",
    customer: "Jane Smith",
    service: "Standard E-commerce",
    amount: 1999,
    status: "processing",
    date: "2023-11-14",
  },
  {
    id: "ORD-9012",
    customer: "Bob Johnson",
    service: "Mobile App",
    amount: 2999,
    status: "pending",
    date: "2023-11-13",
  },
  {
    id: "ORD-3456",
    customer: "Alice Brown",
    service: "Digital Marketing Package",
    amount: 799,
    status: "completed",
    date: "2023-11-12",
  },
]

export default function AdminDashboard() {
  const { language } = useLanguage()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "processing":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{language === "en" ? "Dashboard" : "Panel de Control"}</h1>
        <p className="text-muted-foreground">
          {language === "en" ? "Welcome back, Admin" : "Bienvenido de nuevo, Admin"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === "en" ? "Total Revenue" : "Ingresos Totales"}
                </p>
                <p className="text-2xl font-bold">$45,231.89</p>
              </div>
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm text-green-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>{language === "en" ? "12.5% from last month" : "12.5% desde el mes pasado"}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === "en" ? "New Customers" : "Nuevos Clientes"}
                </p>
                <p className="text-2xl font-bold">+124</p>
              </div>
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm text-green-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>{language === "en" ? "18.2% from last month" : "18.2% desde el mes pasado"}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === "en" ? "Total Orders" : "Pedidos Totales"}
                </p>
                <p className="text-2xl font-bold">432</p>
              </div>
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <ShoppingBag className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm text-green-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>{language === "en" ? "8.3% from last month" : "8.3% desde el mes pasado"}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === "en" ? "Conversion Rate" : "Tasa de Conversión"}
                </p>
                <p className="text-2xl font-bold">3.2%</p>
              </div>
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm text-red-500">
              <ArrowDownRight className="h-4 w-4" />
              <span>{language === "en" ? "1.1% from last month" : "1.1% desde el mes pasado"}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{language === "en" ? "Services" : "Servicios"}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              {language === "en" ? "Active services in your catalog" : "Servicios activos en tu catálogo"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "en" ? "Portfolio Items" : "Elementos de Portafolio"}
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              {language === "en" ? "Projects in your portfolio" : "Proyectos en tu portafolio"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "en" ? "New Messages" : "Nuevos Mensajes"}
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              {language === "en" ? "Unread messages from customers" : "Mensajes no leídos de clientes"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales">{language === "en" ? "Sales" : "Ventas"}</TabsTrigger>
          <TabsTrigger value="services">{language === "en" ? "Services" : "Servicios"}</TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Sales Overview" : "Resumen de Ventas"}</CardTitle>
              <CardDescription>
                {language === "en" ? "Monthly revenue for the current year" : "Ingresos mensuales para el año actual"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, language === "en" ? "Revenue" : "Ingresos"]} />
                    <Bar dataKey="value" fill="#FFD700" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>{language === "en" ? "Service Distribution" : "Distribución de Servicios"}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Percentage of sales by service category"
                  : "Porcentaje de ventas por categoría de servicio"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {serviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, language === "en" ? "Percentage" : "Porcentaje"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "Recent Orders" : "Pedidos Recientes"}</CardTitle>
          <CardDescription>
            {language === "en" ? "Latest transactions from customers" : "Últimas transacciones de clientes"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Order ID" : "ID de Pedido"}</th>
                  <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Customer" : "Cliente"}</th>
                  <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Service" : "Servicio"}</th>
                  <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Amount" : "Monto"}</th>
                  <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Status" : "Estado"}</th>
                  <th className="px-4 py-2 text-left font-medium">{language === "en" ? "Date" : "Fecha"}</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">{order.customer}</td>
                    <td className="px-4 py-2">{order.service}</td>
                    <td className="px-4 py-2">${order.amount}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${getStatusColor(order.status)}`}
                      >
                        {language === "en"
                          ? order.status
                          : order.status === "completed"
                            ? "completado"
                            : order.status === "processing"
                              ? "procesando"
                              : order.status === "pending"
                                ? "pendiente"
                                : "cancelado"}
                      </span>
                    </td>
                    <td className="px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

