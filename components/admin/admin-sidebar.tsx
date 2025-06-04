import { LayoutDashboard, Settings, User, MessageSquare } from "lucide-react"

import type { MainNavItem, SidebarNavItem } from "@/types"

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
