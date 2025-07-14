"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface CurrencyContextType {
  currency: string
  setCurrency: (currency: string) => void
  convertAmount: (amount: number, fromCurrency?: string) => number
  formatAmount: (amount: number) => string
  getCurrencySymbol: () => string
  exchangeRates: Record<string, number>
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

// Mock exchange rates (in a real app, you'd fetch these from an API)
const EXCHANGE_RATES = {
  INR: 1, // Base currency
  USD: 0.012, // 1 INR = 0.012 USD
  EUR: 0.011, // 1 INR = 0.011 EUR
  GBP: 0.0095, // 1 INR = 0.0095 GBP
  JPY: 1.8, // 1 INR = 1.8 JPY
  CAD: 0.016, // 1 INR = 0.016 CAD
  AUD: 0.018, // 1 INR = 0.018 AUD
}

const CURRENCY_SYMBOLS = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "C$",
  AUD: "A$",
}

const CURRENCY_NAMES = {
  INR: "Indian Rupee",
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  CAD: "Canadian Dollar",
  AUD: "Australian Dollar",
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState("INR")

  useEffect(() => {
    // Load currency from localStorage
    const savedCurrency = localStorage.getItem("finbot-currency")
    if (savedCurrency && EXCHANGE_RATES[savedCurrency as keyof typeof EXCHANGE_RATES]) {
      setCurrencyState(savedCurrency)
    }
  }, [])

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency)
    localStorage.setItem("finbot-currency", newCurrency)
  }

  const convertAmount = (amount: number, fromCurrency = "INR"): number => {
    if (fromCurrency === currency) return amount

    // Convert from source currency to INR first, then to target currency
    const inrAmount =
      fromCurrency === "INR" ? amount : amount / EXCHANGE_RATES[fromCurrency as keyof typeof EXCHANGE_RATES]
    const convertedAmount =
      currency === "INR" ? inrAmount : inrAmount * EXCHANGE_RATES[currency as keyof typeof EXCHANGE_RATES]

    return Math.round(convertedAmount * 100) / 100 // Round to 2 decimal places
  }

  const formatAmount = (amount: number): string => {
    const convertedAmount = convertAmount(amount)
    const symbol = getCurrencySymbol()

    // Format based on currency
    switch (currency) {
      case "INR":
        return `${symbol}${convertedAmount.toLocaleString("en-IN")}`
      case "USD":
      case "CAD":
      case "AUD":
        return `${symbol}${convertedAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      case "EUR":
        return `${symbol}${convertedAmount.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      case "GBP":
        return `${symbol}${convertedAmount.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      case "JPY":
        return `${symbol}${Math.round(convertedAmount).toLocaleString("ja-JP")}`
      default:
        return `${symbol}${convertedAmount.toLocaleString()}`
    }
  }

  const getCurrencySymbol = (): string => {
    return CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS] || currency
  }

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        convertAmount,
        formatAmount,
        getCurrencySymbol,
        exchangeRates: EXCHANGE_RATES,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}

export { CURRENCY_NAMES }
