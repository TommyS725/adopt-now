"use client"

import * as React from "react"
import {Sun,Moon, Laptop2} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"

export function ToggleTheme() {
  const {theme,setTheme} = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Sun className='rotate-0 scale-100 transition-all hover:text-slate-900 dark:-rotate-90 dark:scale-0 dark:text-slate-400 dark:hover:text-slate-100' />
          <Moon className='absolute rotate-90 scale-0 transition-all hover:text-slate-900 dark:rotate-0 dark:scale-100 dark:text-slate-400 dark:hover:text-slate-100' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>The current theme is: <b>{theme}</b></DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="dark"><Moon className="h-4 pr-2"/>Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="light"><Sun className="h-4 pr-2"/>Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system"><Laptop2 className="h-4 pr-2"/>System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
