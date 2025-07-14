"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PieChart, AlertTriangle, Info, Star, ArrowUpRight, TrendingUp, Sparkles, Zap, Wallet, BarChart3 } from "lucide-react"
import { useCurrency } from "@/contexts/currency-context"

export function InvestmentDashboard() {
  const { formatAmount } = useCurrency()

  const portfolioValue = 250000
  const totalInvested = 200000
  const totalReturns = portfolioValue - totalInvested
  const returnPercentage = (totalReturns / totalInvested) * 100

  const investments = [
    {
      name: "Equity Mutual Funds",
      amount: 120000,
      returns: 18000,
      returnPercent: 15,
      risk: "High",
      allocation: 48,
      color: "bg-red-500", // Changed to solid color
      icon: "📈",
    },
    {
      name: "Debt Mutual Funds",
      amount: 60000,
      returns: 4800,
      returnPercent: 8,
      risk: "Low",
      allocation: 24,
      color: "bg-blue-500", // Changed to solid color
      icon: "🏦",
    },
    {
      name: "Fixed Deposits",
      amount: 40000,
      returns: 2800,
      returnPercent: 7,
      risk: "Very Low",
      allocation: 16,
      color: "bg-green-500", // Changed to solid color
      icon: "🏛️",
    },
    {
      name: "Gold ETF",
      amount: 30000,
      returns: 4400,
      returnPercent: 14.7,
      risk: "Medium",
      allocation: 12,
      color: "bg-yellow-500", // Changed to solid color
      icon: "🥇",
    },
  ]

  const recommendations = [
    {
      type: "SIP",
      title: "Start SIP in Large Cap Fund",
      description: "Consider starting a monthly SIP in a diversified large cap fund for stable long-term growth.",
      risk: "Medium",
      expectedReturn: "10-12%",
      priority: "High",
      icon: "🎯",
      color: "bg-blue-500", // Changed to solid color
    },
    {
      type: "Diversification",
      title: "Add International Exposure",
      description: "Consider allocating 10-15% to international funds for better diversification.",
      risk: "Medium",
      expectedReturn: "8-15%",
      priority: "Medium",
      icon: "🌍",
      color: "bg-purple-500", // Changed to solid color
    },
    {
      type: "Tax Saving",
      title: "ELSS for Tax Benefits",
      description: "Invest in ELSS funds to save tax under Section 80C while building wealth.",
      risk: "High",
      expectedReturn: "12-15%",
      priority: "High",
      icon: "💰",
      color: "bg-green-500", // Changed to solid color
    },
    {
      type: "Emergency",
      title: "Liquid Fund for Emergency",
      description: "Keep 3-6 months expenses in liquid funds for easy access during emergencies.",
      risk: "Very Low",
      expectedReturn: "4-6%",
      priority: "High",
      icon: "🛡️",
      color: "bg-orange-500", // Changed to solid color
    },
  ]

  const riskProfile = {
    conservative: 30,
    moderate: 50,
    aggressive: 20,
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Very Low":
        return "text-green-600 dark:text-green-400"
      case "Low":
        return "text-green-500 dark:text-green-400"
      case "Medium":
        return "text-yellow-500 dark:text-yellow-400"
      case "High":
        return "text-orange-500 dark:text-orange-400"
      case "Very High":
        return "text-red-500 dark:text-red-400"
      default:
        return "text-muted-foreground"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500 text-white" // Changed to solid color
      case "Medium":
        return "bg-yellow-500 text-white" // Changed to solid color
      case "Low":
        return "bg-green-500 text-white" // Changed to solid color
      default:
        return "bg-gray-500 text-white" // Changed to solid color
    }
  }

  return (
    <div className="space-y-8">
      {/* Portfolio Overview - Responsive Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm min-w-0">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 mb-1">
                <PieChart className="h-5 w-5 text-blue-400" />
                <span className="text-xs text-blue-300 font-medium">Portfolio Value</span>
              </div>
              <span className="font-bold text-lg text-blue-200">{formatAmount(portfolioValue)}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm min-w-0">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 mb-1">
                <Wallet className="h-5 w-5 text-pink-400" />
                <span className="text-xs text-pink-300 font-medium">Total Invested</span>
              </div>
              <span className="font-bold text-lg text-pink-200">{formatAmount(totalInvested)}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm min-w-0">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 mb-1">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span className="text-xs text-green-300 font-medium">Total Returns</span>
              </div>
              <span className="font-bold text-lg text-green-200">{formatAmount(totalReturns)}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm min-w-0">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 mb-1">
                <BarChart3 className="h-5 w-5 text-orange-400" />
                <span className="text-xs text-orange-300 font-medium">Return %</span>
              </div>
              <span className="font-bold text-lg text-orange-200">+{returnPercentage.toFixed(1)}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Investments */}
      <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm">
        {" "}
        {/* Toned down card styles */}
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-foreground">
            <div className="p-2 bg-primary rounded-lg">
              {" "}
              {/* Used primary color */}
              <PieChart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-foreground">Current Portfolio</span> {/* Changed to solid text color */}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {investments.map((investment, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border interactive-card animate-slide-up" // Toned down card styles
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-3xl">{investment.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-2">{investment.name}</h3>
                      <div className="flex items-center gap-3">
                        <Badge className={`${investment.color} text-white border-0`}>{investment.risk} Risk</Badge>
                        <span className="text-sm text-muted-foreground">{investment.allocation}% of portfolio</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-xl text-foreground">{formatAmount(investment.amount)}</div>
                    <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                      +{formatAmount(investment.returns)} ({investment.returnPercent}%)
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={investment.allocation} className="h-3 progress-bar" />
                  <div
                    className={`absolute inset-0 ${investment.color} rounded-full opacity-20`} // Removed animation
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Profile */}
      <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm">
        {" "}
        {/* Toned down card styles */}
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-foreground">
            <div className="p-2 bg-orange-500 rounded-lg">
              {" "}
              {/* Used solid orange */}
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <span className="text-foreground">Your Risk Profile</span> {/* Changed to solid text color */}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">Conservative</span>
                  <span className="text-2xl">🛡️</span>
                </div>
                <span className="text-sm text-muted-foreground font-medium">{riskProfile.conservative}%</span>
              </div>
              <Progress value={riskProfile.conservative} className="h-3 progress-bar" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">Moderate</span>
                  <span className="text-2xl">⚖️</span>
                </div>
                <span className="text-sm text-muted-foreground font-medium">{riskProfile.moderate}%</span>
              </div>
              <Progress value={riskProfile.moderate} className="h-3 progress-bar" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">Aggressive</span>
                  <span className="text-2xl">🚀</span>
                </div>
                <span className="text-sm text-muted-foreground font-medium">{riskProfile.aggressive}%</span>
              </div>
              <Progress value={riskProfile.aggressive} className="h-3 progress-bar" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Recommendations */}
      <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm">
        {" "}
        {/* Toned down card styles */}
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-foreground">
            <div className="p-2 bg-yellow-500 rounded-lg">
              {" "}
              {/* Used solid yellow */}
              <Star className="h-5 w-5 text-white" />
            </div>
            <span className="text-foreground">Personalized Recommendations</span> {/* Changed to solid text color */}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border interactive-card animate-slide-up" // Toned down card styles
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-3xl">{rec.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-semibold text-lg text-foreground">{rec.title}</h3>
                        <Badge className={`${getPriorityColor(rec.priority)} border-0`}>{rec.priority} Priority</Badge>
                      </div>
                      <p className="text-muted-foreground mb-3 leading-relaxed">{rec.description}</p>
                      <div className="flex items-center gap-6 text-sm">
                        <span className="text-muted-foreground">
                          Risk: <span className={getRiskColor(rec.risk)}>{rec.risk}</span>
                        </span>
                        <span className="text-muted-foreground">
                          Expected Return:{" "}
                          <span className="text-green-600 dark:text-green-400 font-medium">{rec.expectedReturn}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className={`ml-4 ${rec.color} hover:opacity-90 text-white border-0 rounded-lg transition-all duration-150 interactive-button`} // Toned down button styles
                  >
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Investment Tips */}
      <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm">
        {" "}
        {/* Toned down card styles */}
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-foreground">
            <div className="p-2 bg-cyan-500 rounded-lg">
              {" "}
              {/* Used solid cyan */}
              <Info className="h-5 w-5 text-white" />
            </div>
            <span className="text-foreground">Investment Tips</span> {/* Changed to solid text color */}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
              {" "}
              {/* Toned down background */}
              <div className="text-2xl">💡</div>
              <p className="text-muted-foreground leading-relaxed">
                Start early and invest regularly through SIPs to benefit from compounding.
              </p>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
              {" "}
              {/* Toned down background */}
              <div className="text-2xl">🎯</div>
              <p className="text-muted-foreground leading-relaxed">
                Diversify across asset classes to reduce risk and optimize returns.
              </p>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
              {" "}
              {/* Toned down background */}
              <div className="text-2xl">⚖️</div>
              <p className="text-muted-foreground leading-relaxed">
                Review and rebalance your portfolio annually or when life goals change.
              </p>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
              {" "}
              {/* Toned down background */}
              <div className="text-2xl">🛡️</div>
              <p className="text-muted-foreground leading-relaxed">
                Always maintain an emergency fund before making high-risk investments.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
