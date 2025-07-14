"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  ArrowLeft,
  User,
  Bell,
  Palette,
  Shield,
  CreditCard,
  Globe,
  Trash2,
  Download,
  Upload,
  Moon,
  Sun,
  Monitor,
  RefreshCw,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useCurrency, CURRENCY_NAMES } from "@/contexts/currency-context"

interface SettingsPanelProps {
  onBack: () => void
}

// Changed to default export
export default function SettingsPanel({ onBack }: SettingsPanelProps) {
  const { theme, setTheme } = useTheme()
  const { currency, setCurrency, getCurrencySymbol, exchangeRates } = useCurrency()
  const [settings, setSettings] = useState({
    // Profile Settings
    name: "John Doe",
    email: "john.doe@example.com",
    language: "en",

    // Notification Settings
    budgetAlerts: true,
    goalReminders: true,
    investmentUpdates: false,
    weeklyReports: true,
    emailNotifications: true,
    pushNotifications: true,

    // Budget Settings
    monthlyBudget: 50000,
    budgetAlertThreshold: 80,
    savingsGoalPercentage: 20,

    // Privacy Settings
    dataSharing: false,
    analytics: true,
    biometricAuth: false,

    // Display Settings
    compactView: false,
    showBalance: true,
    hideAmounts: false,
  })

  const [mounted, setMounted] = useState(false)
  const [currencyUpdating, setCurrencyUpdating] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("finbot-settings")
    if (savedSettings) {
      setSettings({ ...settings, ...JSON.parse(savedSettings) })
    }
  }, [])

  const updateSetting = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    localStorage.setItem("finbot-settings", JSON.stringify(newSettings))
  }

  const handleCurrencyChange = async (newCurrency: string) => {
    setCurrencyUpdating(true)

    // Simulate API call delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    setCurrency(newCurrency)
    setCurrencyUpdating(false)

    // Show success message
    const event = new CustomEvent("currency-changed", {
      detail: {
        currency: newCurrency,
        symbol: CURRENCY_NAMES[newCurrency as keyof typeof CURRENCY_NAMES],
      },
    })
    window.dispatchEvent(event)
  }

  const exportData = () => {
    const data = {
      settings,
      currency,
      exportDate: new Date().toISOString(),
      version: "1.0",
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "finbot-data.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const clearAllData = () => {
    if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      localStorage.clear()
      setCurrency("INR") // Reset to default currency
      alert("All data has been cleared.")
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border bg-card/80 backdrop-blur-sm shadow-sm">
        <Button variant="ghost" size="icon" onClick={onBack} className="h-9 w-9 hover:bg-secondary">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Customize your FinBot experience</p>
        </div>
      </div>

      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* Profile Settings */}
        <Card className="interactive-card bg-card/60 backdrop-blur-sm border border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <User className="h-5 w-5 text-primary" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Name
                </Label>
                <Input
                  id="name"
                  value={settings.name}
                  onChange={(e) => updateSetting("name", e.target.value)}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateSetting("email", e.target.value)}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Currency</Label>
                <div className="flex items-center gap-2">
                  <Select value={currency} onValueChange={handleCurrencyChange} disabled={currencyUpdating}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(CURRENCY_NAMES).map(([code, name]) => (
                        <SelectItem key={code} value={code}>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm">{code}</span>
                            <span>{name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {currencyUpdating && <RefreshCw className="h-4 w-4 animate-spin text-primary" />}
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>
                    Current: {getCurrencySymbol()} {CURRENCY_NAMES[currency as keyof typeof CURRENCY_NAMES]}
                  </p>
                  <p>
                    Exchange rate: 1 INR = {exchangeRates[currency as keyof typeof exchangeRates]} {currency}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Language</Label>
                <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिंदी</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Currency Conversion Preview */}
        <Card className="interactive-card bg-secondary/50 border border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Globe className="h-5 w-5" />
              Currency Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Sample Budget</p>
                <p className="font-bold text-foreground">
                  {currency === "INR"
                    ? "₹50,000"
                    : `${getCurrencySymbol()}${(50000 * exchangeRates[currency as keyof typeof exchangeRates]).toFixed(2)}`}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Sample Expense</p>
                <p className="font-bold text-foreground">
                  {currency === "INR"
                    ? "₹1,200"
                    : `${getCurrencySymbol()}${(1200 * exchangeRates[currency as keyof typeof exchangeRates]).toFixed(2)}`}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Sample Goal</p>
                <p className="font-bold text-foreground">
                  {currency === "INR"
                    ? "₹100,000"
                    : `${getCurrencySymbol()}${(100000 * exchangeRates[currency as keyof typeof exchangeRates]).toFixed(2)}`}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Sample Investment</p>
                <p className="font-bold text-foreground">
                  {currency === "INR"
                    ? "₹25,000"
                    : `${getCurrencySymbol()}${(25000 * exchangeRates[currency as keyof typeof exchangeRates]).toFixed(2)}`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="interactive-card bg-card/60 backdrop-blur-sm border border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Palette className="h-5 w-5 text-primary" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label className="text-foreground">Theme</Label>
              <div className="flex gap-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                  className="flex items-center gap-2"
                >
                  <Sun className="h-4 w-4" />
                  Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className="flex items-center gap-2"
                >
                  <Moon className="h-4 w-4" />
                  Dark
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("system")}
                  className="flex items-center gap-2"
                >
                  <Monitor className="h-4 w-4" />
                  System
                </Button>
              </div>
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Compact View</Label>
                <p className="text-sm text-muted-foreground">Show more content in less space</p>
              </div>
              <Switch
                checked={settings.compactView}
                onCheckedChange={(checked) => updateSetting("compactView", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Show Balance</Label>
                <p className="text-sm text-muted-foreground">Display account balance on overview</p>
              </div>
              <Switch
                checked={settings.showBalance}
                onCheckedChange={(checked) => updateSetting("showBalance", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Hide Amounts</Label>
                <p className="text-sm text-muted-foreground">Hide sensitive financial amounts</p>
              </div>
              <Switch
                checked={settings.hideAmounts}
                onCheckedChange={(checked) => updateSetting("hideAmounts", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Budget Settings */}
        <Card className="interactive-card bg-card/60 backdrop-blur-sm border border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <CreditCard className="h-5 w-5 text-primary" />
              Budget & Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground">Monthly Budget ({getCurrencySymbol()})</Label>
              <Input
                type="number"
                value={settings.monthlyBudget}
                onChange={(e) => updateSetting("monthlyBudget", Number.parseInt(e.target.value))}
                className="bg-input border-border"
              />
              <p className="text-xs text-muted-foreground">
                Equivalent to{" "}
                {currency === "INR"
                  ? `${getCurrencySymbol()}${settings.monthlyBudget.toLocaleString()}`
                  : `₹${settings.monthlyBudget.toLocaleString()} (${getCurrencySymbol()}${(settings.monthlyBudget * exchangeRates[currency as keyof typeof exchangeRates]).toFixed(2)})`}
              </p>
            </div>
            <div className="space-y-3">
              <Label className="text-foreground">Budget Alert Threshold: {settings.budgetAlertThreshold}%</Label>
              <Slider
                value={[settings.budgetAlertThreshold]}
                onValueChange={(value) => updateSetting("budgetAlertThreshold", value[0])}
                max={100}
                min={50}
                step={5}
                className="w-full"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-foreground">Savings Goal: {settings.savingsGoalPercentage}%</Label>
              <Slider
                value={[settings.savingsGoalPercentage]}
                onValueChange={(value) => updateSetting("savingsGoalPercentage", value[0])}
                max={50}
                min={5}
                step={5}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="interactive-card bg-card/60 backdrop-blur-sm border border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Budget Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when approaching budget limits</p>
              </div>
              <Switch
                checked={settings.budgetAlerts}
                onCheckedChange={(checked) => updateSetting("budgetAlerts", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Goal Reminders</Label>
                <p className="text-sm text-muted-foreground">Reminders to contribute to your goals</p>
              </div>
              <Switch
                checked={settings.goalReminders}
                onCheckedChange={(checked) => updateSetting("goalReminders", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Investment Updates</Label>
                <p className="text-sm text-muted-foreground">Market updates and portfolio changes</p>
              </div>
              <Switch
                checked={settings.investmentUpdates}
                onCheckedChange={(checked) => updateSetting("investmentUpdates", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">Weekly spending and savings summary</p>
              </div>
              <Switch
                checked={settings.weeklyReports}
                onCheckedChange={(checked) => updateSetting("weeklyReports", checked)}
              />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications on device</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="interactive-card bg-card/60 backdrop-blur-sm border border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Shield className="h-5 w-5 text-primary" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Data Sharing</Label>
                <p className="text-sm text-muted-foreground">Share anonymized data for improvements</p>
              </div>
              <Switch
                checked={settings.dataSharing}
                onCheckedChange={(checked) => updateSetting("dataSharing", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Analytics</Label>
                <p className="text-sm text-muted-foreground">Help improve app with usage analytics</p>
              </div>
              <Switch checked={settings.analytics} onCheckedChange={(checked) => updateSetting("analytics", checked)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Biometric Authentication</Label>
                <p className="text-sm text-muted-foreground">Use fingerprint or face unlock</p>
              </div>
              <Switch
                checked={settings.biometricAuth}
                onCheckedChange={(checked) => updateSetting("biometricAuth", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="interactive-card bg-card/60 backdrop-blur-sm border border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Globe className="h-5 w-5 text-primary" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={exportData}
                className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 border-border"
              >
                <Download className="h-4 w-4" />
                Export Data
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 border-border"
              >
                <Upload className="h-4 w-4" />
                Import Data
              </Button>
            </div>
            <Separator className="bg-border" />
            <div className="space-y-2">
              <Label className="text-foreground">Danger Zone</Label>
              <Button
                variant="destructive"
                onClick={clearAllData}
                className="flex items-center gap-2 bg-destructive hover:bg-destructive/80"
              >
                <Trash2 className="h-4 w-4" />
                Clear All Data
              </Button>
              <p className="text-xs text-muted-foreground">
                This will permanently delete all your financial data and cannot be undone.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="interactive-card bg-card/60 backdrop-blur-sm border border-border shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Badge variant="secondary" className="bg-secondary text-foreground">
                  Version 1.0.0
                </Badge>
                <Badge variant="secondary" className="bg-secondary text-foreground">
                  Beta
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">FinBot - Your Personal Finance Assistant</p>
              <p className="text-xs text-muted-foreground">Made with ❤️ for better financial health</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
