"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Sparkles,
  Zap,
} from "lucide-react"
import { useCurrency } from "@/contexts/currency-context"
import { useState, useEffect } from "react"

export function FinancialOverview() {
  const { formatAmount } = useCurrency()
  const [animatedValues, setAnimatedValues] = useState({
    monthlySpent: 0,
    budgetUsed: 0,
  })

  const monthlyBudget = 50000
  const monthlySpent = 32500
  const budgetUsed = (monthlySpent / monthlyBudget) * 100

  const goals = [
    { name: "Emergency Fund", current: 75000, target: 100000, progress: 75, color: "bg-blue-500" }, // Changed to solid color
    { name: "Vacation", current: 15000, target: 30000, progress: 50, color: "bg-purple-500" }, // Changed to solid color
    { name: "New Laptop", current: 25000, target: 80000, progress: 31, color: "bg-green-500" }, // Changed to solid color
  ]

  const recentTransactions = [
    { category: "Food", amount: 1200, type: "expense", date: "Today", icon: "🍕" },
    { category: "Salary", amount: 45000, type: "income", date: "Yesterday", icon: "💰" },
    { category: "Transport", amount: 800, type: "expense", date: "Yesterday", icon: "🚗" },
    { category: "Entertainment", amount: 2500, type: "expense", date: "2 days ago", icon: "🎬" },
  ]

  const categorySpending = [
    { category: "Food", amount: 8500, percentage: 26, color: "bg-red-500", icon: "🍕" }, // Changed to solid color
    { category: "Transport", amount: 6200, percentage: 19, color: "bg-blue-500", icon: "🚗" }, // Changed to solid color
    { category: "Bills", amount: 5800, percentage: 18, color: "bg-yellow-500", icon: "⚡" }, // Changed to solid color
    { category: "Entertainment", amount: 4200, percentage: 13, color: "bg-purple-500", icon: "🎬" }, // Changed to solid color
    { category: "Shopping", amount: 3800, percentage: 12, color: "bg-green-500", icon: "🛍️" }, // Changed to solid color
    { category: "Others", amount: 4000, percentage: 12, color: "bg-gray-500", icon: "📦" }, // Changed to solid color
  ]

  useEffect(() => {
    // Animate values on mount
    const timer = setTimeout(() => {
      setAnimatedValues({
        monthlySpent: monthlySpent,
        budgetUsed: budgetUsed,
      })
    }, 300)

    return () => clearTimeout(timer)
  }, [monthlySpent, budgetUsed])

  return (
    <div className="space-y-8">
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm">
          {" "}
          {/* Toned down card styles */}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Budget</CardTitle>
            <div className="p-2 bg-primary rounded-lg">
              {" "}
              {/* Used primary color */}
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">{formatAmount(animatedValues.monthlySpent)}</div>{" "}
            {/* Changed to solid text color */}
            <p className="text-sm text-muted-foreground mb-3">of {formatAmount(monthlyBudget)}</p>
            <Progress value={animatedValues.budgetUsed} className="h-3 progress-bar" />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">{animatedValues.budgetUsed.toFixed(1)}% used</p>
              <div className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-yellow-500" />
                <span className="text-xs text-green-600 dark:text-green-400">On track</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm">
          {" "}
          {/* Toned down card styles */}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
            <div className="p-2 bg-destructive rounded-lg">
              {" "}
              {/* Used destructive color */}
              <TrendingDown className="h-5 w-5 text-destructive-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive mb-2">-{formatAmount(32500)}</div>{" "}
            {/* Used destructive color */}
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-destructive" /> {/* Used destructive color */}
              <span className="text-destructive">12% increase</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm">
          {" "}
          {/* Toned down card styles */}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Savings Rate</CardTitle>
            <div className="p-2 bg-green-500 rounded-lg">
              {" "}
              {/* Used solid green */}
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">35%</div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">5% increase</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Goals Progress */}
      <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm">
        {" "}
        {/* Toned down card styles */}
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-foreground">
            <div className="p-2 bg-orange-500 rounded-lg">
              {" "}
              {/* Used solid orange */}
              <Target className="h-5 w-5 text-white" />
            </div>
            <span className="text-foreground">Financial Goals</span> {/* Changed to solid text color */}
            <Zap className="h-5 w-5 text-yellow-500" /> {/* Removed animation */}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {goals.map((goal, index) => (
            <div key={goal.name} className="space-y-3 animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
              {" "}
              {/* Reduced delay */}
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">{goal.name}</span>
                <span className="text-sm text-muted-foreground font-medium">
                  {formatAmount(goal.current)} / {formatAmount(goal.target)}
                </span>
              </div>
              <div className="relative">
                <Progress value={goal.progress} className="h-3 progress-bar" />
                <div
                  className={`absolute inset-0 ${goal.color} rounded-full opacity-20`} // Removed pulse animation
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{goal.progress}% complete</p>
                <div className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs text-green-600 dark:text-green-400">Great progress!</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Category Spending */}
      <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm">
        {" "}
        {/* Toned down card styles */}
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-foreground">
            <div className="p-2 bg-purple-500 rounded-lg">
              {" "}
              {/* Used solid purple */}
              <PieChart className="h-5 w-5 text-white" />
            </div>
            <span className="text-foreground">Spending by Category</span> {/* Changed to solid text color */}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categorySpending.map((item, index) => (
              <div
                key={item.category}
                className="flex items-center justify-between p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border interactive-card" // Toned down card styles
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{item.icon}</div>
                  <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                  <span className="font-medium text-foreground">{item.category}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-foreground">{formatAmount(item.amount)}</div>
                  <div className="text-sm text-muted-foreground">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm">
        {" "}
        {/* Toned down card styles */}
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-foreground">
            <div className="p-2 bg-blue-500 rounded-lg">
              {" "}
              {/* Used solid blue */}
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <span className="text-foreground">Recent Transactions</span> {/* Changed to solid text color */}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border interactive-card animate-slide-up" // Toned down card styles
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-4 flex-grow flex-wrap sm:flex-nowrap">
                  <div className="text-2xl">{transaction.icon}</div>
                  {transaction.type === "income" ? (
                    <ArrowUpRight className="h-5 w-5 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <div className="font-medium text-foreground">{transaction.category}</div>
                    <div className="text-sm text-muted-foreground">{transaction.date}</div>
                  </div>
                </div>
                <div
                  className={`font-bold text-lg ${transaction.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatAmount(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
