import type React from "react"

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

// Make sure this layout is properly configured to handle all the routes
// that were previously in the root app directory

