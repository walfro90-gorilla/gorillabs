"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ModeToggleProps {
  closeMenu?: () => void
}

export function ModeToggle({ closeMenu }: ModeToggleProps) {
  const { setTheme } = useTheme()

  const handleSetTheme = (theme: string) => {
    setTheme(theme)
    if (closeMenu) {
      closeMenu()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleSetTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
