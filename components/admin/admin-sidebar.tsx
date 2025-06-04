"use client"

import type React from "react"

import { LayoutDashboard, Settings, User, MessageSquare } from "lucide-react"

import type { MainNavItem, SidebarNavItem } from "@/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLanguage } from "@/context/language-context"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface DashboardConfigProps {
  language: string
}

export const dashboardConfig = ({ language }: DashboardConfigProps) => {
  const mainNav: MainNavItem[] = [
    {
      title: language === "en" ? "Documentation" : "Documentation",
      href: "/docs",
    },
    {
      title: language === "en" ? "Support" : "Support",
      href: "/support",
      disabled: true,
    },
  ]

  const sidebarNav: SidebarNavItem[] = [
    {
      title: language === "en" ? "Dashboard" : "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: language === "en" ? "Users" : "Users",
      href: "/admin/users",
      icon: User,
    },
    {
      name: language === "en" ? "Chatbot" : "Chatbot",
      href: "/admin/chatbot",
      icon: MessageSquare,
    },
    {
      title: language === "en" ? "Settings" : "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return {
    mainNav,
    sidebarNav,
  }
}

interface AdminSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function AdminSidebar({ className }: AdminSidebarProps) {
  const { language } = useLanguage()
  const pathname = usePathname()
  const { sidebarNav } = dashboardConfig({ language })

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            {language === "en" ? "Admin Panel" : "Panel de Administración"}
          </h2>
          <div className="space-y-1">
            <ScrollArea className="h-[300px] w-full">
              {sidebarNav.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title || item.name}
                  </Link>
                </Button>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}
