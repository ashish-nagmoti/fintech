"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Bot,
  Wallet,
  Target,
  TrendingUp,
  PieChart,
  Menu,
} from "lucide-react"

interface MobileNavProps {
  setActiveTab: (tab: string) => void
  activeTab: string
}

export function MobileNav({ setActiveTab, activeTab }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    setOpen(false) // Close the sheet after selecting a tab
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] sm:w-[300px]">
        <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
        <SheetDescription className="sr-only">Navigation links for the application.</SheetDescription>
        <nav className="flex flex-col gap-4 pt-8">
          <Button
            variant={activeTab === "overview" ? "secondary" : "ghost"}
            className="justify-start gap-3"
            onClick={() => handleTabClick("overview")}
          >
            <PieChart className="h-5 w-5" />
            Overview
          </Button>
          <Button
            variant={activeTab === "chat" ? "secondary" : "ghost"}
            className="justify-start gap-3"
            onClick={() => handleTabClick("chat")}
          >
            <Bot className="h-5 w-5" />
            Chat
          </Button>
          <Button
            variant={activeTab === "transactions" ? "secondary" : "ghost"}
            className="justify-start gap-3"
            onClick={() => handleTabClick("transactions")}
          >
            <Wallet className="h-5 w-5" />
            Expenses
          </Button>
          <Button
            variant={activeTab === "goals" ? "secondary" : "ghost"}
            className="justify-start gap-3"
            onClick={() => handleTabClick("goals")}
          >
            <Target className="h-5 w-5" />
            Goals
          </Button>
          <Button
            variant={activeTab === "investments" ? "secondary" : "ghost"}
            className="justify-start gap-3"
            onClick={() => handleTabClick("investments")}
          >
            <TrendingUp className="h-5 w-5" />
            Invest
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
