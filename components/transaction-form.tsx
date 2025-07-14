"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Trash2, Calendar, Sparkles, TrendingUp, TrendingDown } from "lucide-react"
import { useCurrency } from "@/contexts/currency-context"

const expenseCategories = [
  { name: "Food & Dining", icon: "🍕", color: "bg-red-500" }, // Changed to solid color
  { name: "Transportation", icon: "🚗", color: "bg-blue-500" }, // Changed to solid color
  { name: "Shopping", icon: "🛍️", color: "bg-purple-500" }, // Changed to solid color
  { name: "Entertainment", icon: "🎬", color: "bg-orange-500" }, // Changed to solid color
  { name: "Bills & Utilities", icon: "⚡", color: "bg-yellow-500" }, // Changed to solid color
  { name: "Healthcare", icon: "🏥", color: "bg-green-500" }, // Changed to solid color
  { name: "Education", icon: "📚", color: "bg-indigo-500" }, // Changed to solid color
  { name: "Travel", icon: "✈️", color: "bg-cyan-500" }, // Changed to solid color
  { name: "Others", icon: "📦", color: "bg-gray-500" }, // Changed to solid color
]

const incomeCategories = [
  { name: "Salary", icon: "💰", color: "bg-green-500" }, // Changed to solid color
  { name: "Freelance", icon: "💻", color: "bg-blue-500" }, // Changed to solid color
  { name: "Investment Returns", icon: "📈", color: "bg-purple-500" }, // Changed to solid color
  { name: "Business", icon: "🏢", color: "bg-orange-500" }, // Changed to solid color
  { name: "Others", icon: "💎", color: "bg-yellow-500" }, // Changed to solid color
]

export function TransactionForm() {
  const { formatAmount, getCurrencySymbol } = useCurrency()

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "expense",
      category: "Food & Dining",
      amount: 1200,
      description: "Lunch at restaurant",
      date: "2024-01-15",
    },
    { id: 2, type: "income", category: "Salary", amount: 45000, description: "Monthly salary", date: "2024-01-14" },
    { id: 3, type: "expense", category: "Transportation", amount: 800, description: "Uber ride", date: "2024-01-14" },
  ])

  const [formData, setFormData] = useState({
    type: "expense",
    category: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.category && formData.amount) {
      setIsSubmitting(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      const newTransaction = {
        id: Date.now(),
        type: formData.type,
        category: formData.category,
        amount: Number.parseFloat(formData.amount),
        description: formData.description,
        date: formData.date,
      }
      setTransactions([newTransaction, ...transactions])
      setFormData({
        type: "expense",
        category: "",
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      })
      setIsSubmitting(false)
    }
  }

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const getCategoryIcon = (categoryName: string, type: string) => {
    const categories = type === "expense" ? expenseCategories : incomeCategories
    return categories.find((cat) => cat.name === categoryName)?.icon || "📦"
  }

  const getCategoryColor = (categoryName: string, type: string) => {
    const categories = type === "expense" ? expenseCategories : incomeCategories
    return categories.find((cat) => cat.name === categoryName)?.color || "bg-gray-500" // Changed to solid color
  }

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm">
          {" "}
          {/* Toned down card styles */}
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-green-600 dark:text-green-400 font-medium">Total Income</div>
                <div className="text-3xl font-bold text-green-700 dark:text-green-300">{formatAmount(totalIncome)}</div>
              </div>
              <div className="p-3 bg-green-500 rounded-xl">
                {" "}
                {/* Used solid green */}
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm">
          {" "}
          {/* Toned down card styles */}
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-red-600 dark:text-red-400 font-medium">Total Expenses</div>
                <div className="text-3xl font-bold text-red-700 dark:text-red-300">{formatAmount(totalExpenses)}</div>
              </div>
              <div className="p-3 bg-red-500 rounded-xl">
                {" "}
                {/* Used solid red */}
                <TrendingDown className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm">
          {" "}
          {/* Toned down card styles */}
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">Net Balance</div>
                <div
                  className={`text-3xl font-bold ${totalIncome - totalExpenses >= 0 ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}
                >
                  {formatAmount(totalIncome - totalExpenses)}
                </div>
              </div>
              <div
                className={`p-3 ${totalIncome - totalExpenses >= 0 ? "bg-green-500" : "bg-red-500"} rounded-xl`} // Used solid colors
              >
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Transaction Form */}
      <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm">
        {" "}
        {/* Toned down card styles */}
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-foreground">
            <div className="p-2 bg-primary rounded-lg">
              {" "}
              {/* Used primary color */}
              <PlusCircle className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-foreground">Add Transaction</span> {/* Changed to solid text color */}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="type" className="text-foreground font-medium">
                  Type
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value, category: "" })}
                >
                  <SelectTrigger className="h-11 bg-input border-border rounded-lg">
                    {" "}
                    {/* Toned down styles */}
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expense">💸 Expense</SelectItem>
                    <SelectItem value="income">💰 Income</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="category" className="text-foreground font-medium">
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="h-11 bg-input border-border rounded-lg">
                    {" "}
                    {/* Toned down styles */}
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {(formData.type === "expense" ? expenseCategories : incomeCategories).map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        <div className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          <span>{category.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="amount" className="text-foreground font-medium">
                  Amount ({getCurrencySymbol()})
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="h-11 bg-input border-border rounded-lg" // Toned down styles
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="date" className="text-foreground font-medium">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="h-11 bg-input border-border rounded-lg" // Toned down styles
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="text-foreground font-medium">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Add a note about this transaction..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-input border-border rounded-lg" // Toned down styles
                rows={3}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 interactive-button" // Toned down button styles
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  Adding Transaction...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <PlusCircle className="h-5 w-5" />
                  Add Transaction
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm">
        {" "}
        {/* Toned down card styles */}
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-foreground">
            <div className="p-2 bg-blue-500 rounded-lg">
              {" "}
              {/* Used solid blue */}
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="text-foreground">Recent Transactions</span> {/* Changed to solid text color */}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border interactive-card animate-slide-up" // Toned down card styles
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-4 flex-grow flex-wrap sm:flex-nowrap">
                  <div className="text-2xl">{getCategoryIcon(transaction.category, transaction.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <Badge
                        className={`${getCategoryColor(transaction.category, transaction.type)} text-white border-0`} // Used solid color
                      >
                        {transaction.type}
                      </Badge>
                      <span className="font-semibold text-foreground">{transaction.category}</span>
                    </div>
                    {transaction.description && (
                      <p className="text-sm text-muted-foreground mb-1">{transaction.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`font-bold text-lg ${transaction.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {formatAmount(transaction.amount)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTransaction(transaction.id)}
                    className="h-9 w-9 text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-150 interactive-button" // Toned down button styles
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
