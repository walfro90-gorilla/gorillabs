"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import AdminSidebar from "@/components/admin/admin-sidebar"
import { useLanguage } from "@/context/language-context"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isAdmin } = useAuth()
  const router = useRouter()
  const { language } = useLanguage()

  useEffect(() => {
    // Check if user is logged in and is an admin
    if (!user) {
      router.push("/login?redirect=admin")
      return
    }

    if (!isAdmin) {
      router.push("/")
      return
    }
  }, [user, isAdmin, router])

  if (!user || !isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg">
          {language === "en" ? "Loading admin panel..." : "Cargando panel de administración..."}
        </p>
      </div>
    )
  }

  return (
    <div className="grid min-h-screen md:grid-cols-[240px_1fr]">
      <AdminSidebar />
      <main className="p-6">{children}</main>
    </div>
  )
}

