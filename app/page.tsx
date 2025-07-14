"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Send,
  Bot,
  User,
  Moon,
  Sun,
  PlusCircle,
  BarChart3,
  Target,
  TrendingUp,
  Wallet,
  PieChart,
  Settings,
  Zap,
} from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { useTheme } from "next-themes";
import { TransactionForm } from "@/components/transaction-form";
import { GoalTracker } from "@/components/goal-tracker";
import { InvestmentDashboard } from "@/components/investment-dashboard";
import SettingsPanel from "@/components/settings-panel"; // Changed to default import
import { FinancialOverview } from "@/components/financial-overview";
import Image from "next/image";

const quickActions = [
  {
    text: "Add Expense",
    icon: PlusCircle,
    action: "expense",
    color: "bg-red-500",
  },
  { text: "Set Goal", icon: Target, action: "goal", color: "bg-blue-500" },
  {
    text: "Investment Advice",
    icon: TrendingUp,
    action: "investment",
    color: "bg-green-500",
  },
  {
    text: "Budget Analysis",
    icon: BarChart3,
    action: "budget",
    color: "bg-purple-500",
  },
];

export default function FinBotApp() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("chat");
  const [mounted, setMounted] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      setShowQuickActions(false);
    }
  }, [messages]);

  useEffect(() => {
    if (isLoading) {
      setIsTyping(true);
    } else {
      setTimeout(() => setIsTyping(false), 500);
    }
  }, [isLoading]);

  const handleQuickAction = (action: string, text: string) => {
    if (action === "expense") {
      setActiveTab("transactions");
    } else if (action === "goal") {
      setActiveTab("goals");
    } else if (action === "investment") {
      setActiveTab("investments");
    } else {
      if (inputRef.current) {
        inputRef.current.value = text;
        handleInputChange({ target: { value: text } } as any);
        setShowQuickActions(false);
      }
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (showSettings) {
    return <SettingsPanel onBack={() => setShowSettings(false)} />;
  }

  if (showLanding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-background flex flex-col">
        <header className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-6 gap-4 sm:gap-0">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 bg-primary shadow-md">
              <AvatarFallback className="text-white font-bold bg-transparent">
                <Bot className="h-6 w-6 animate-float" />
              </AvatarFallback>
            </Avatar>
            <span className="text-2xl font-bold text-foreground">FinBot</span>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowLanding(false)}
            className="rounded-full px-6 py-2 font-semibold text-primary border-primary hover:bg-primary hover:text-primary-foreground transition w-full sm:w-auto"
          >
            Launch App
          </Button>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center text-center px-2 sm:px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-4 animate-slide-up">
            Your AI-Powered Finance Assistant
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-muted-foreground max-w-2xl mb-8 animate-slide-up delay-100">
            Track expenses, set goals, get investment insights, and manage your money smarter—all in one beautiful dashboard.
          </p>
          <Button
            size="lg"
            className="rounded-full px-8 py-4 text-base sm:text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg animate-fade-in w-full sm:w-auto"
            onClick={() => setShowLanding(false)}
          >
            Get Started
          </Button>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 w-full max-w-5xl animate-fade-in delay-200">
            <div className="bg-card/80 border border-border rounded-xl p-4 sm:p-6 shadow-md flex flex-col items-center">
              <PieChart className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-bold text-base sm:text-lg mb-1">Financial Overview</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">See your balances, spending, and trends at a glance.</p>
            </div>
            <div className="bg-card/80 border border-border rounded-xl p-4 sm:p-6 shadow-md flex flex-col items-center">
              <Target className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="font-bold text-base sm:text-lg mb-1">Goal Tracker</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Set, track, and achieve your financial goals with ease.</p>
            </div>
            <div className="bg-card/80 border border-border rounded-xl p-4 sm:p-6 shadow-md flex flex-col items-center">
              <TrendingUp className="h-8 w-8 text-green-500 mb-2" />
              <h3 className="font-bold text-base sm:text-lg mb-1">Investment Dashboard</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Monitor investments and get AI-powered advice.</p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 w-full max-w-4xl animate-fade-in delay-300">
            <div className="bg-card/80 border border-border rounded-xl p-4 sm:p-6 shadow-md flex flex-col items-center">
              <Wallet className="h-8 w-8 text-purple-500 mb-2" />
              <h3 className="font-bold text-base sm:text-lg mb-1">Expense Tracking</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Log transactions and analyze your spending patterns.</p>
            </div>
            <div className="bg-card/80 border border-border rounded-xl p-4 sm:p-6 shadow-md flex flex-col items-center">
              <Settings className="h-8 w-8 text-slate-500 mb-2" />
              <h3 className="font-bold text-base sm:text-lg mb-1">Personalized Settings</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Customize your experience and manage preferences.</p>
            </div>
          </div>
        </main>
        <footer className="text-xs text-muted-foreground text-center py-6 mt-8 px-2">
          &copy; {new Date().getFullYear()} FinBot. All rights reserved.
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-background overflow-x-hidden">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-border bg-card/80 backdrop-blur-sm shadow-sm gap-4 sm:gap-0">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-10 w-10 bg-primary shadow-sm">
              <AvatarFallback className="text-white font-bold bg-transparent">
                <Bot className="h-5 w-5 animate-float" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="animate-slide-up">
            <h1 className="font-bold text-2xl text-foreground">FinBot</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Zap className="h-3 w-3 text-yellow-500" />
              AI-Powered Finance Assistant
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <MobileNav setActiveTab={setActiveTab} activeTab={activeTab} />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9 rounded-full hover:bg-secondary transition-colors duration-200 icon-bounce" // Toned down hover, kept subtle bounce
          >
            {mounted &&
              (theme === "dark" ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5 text-slate-600" />
              ))}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(true)}
            className="h-9 w-9 rounded-full hover:bg-secondary transition-colors duration-200 icon-bounce" // Toned down hover, kept subtle bounce
          >
            <Settings className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </Button>
        </div>
      </div>
      {/* Main Content with Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col w-full max-w-screen-lg mx-auto px-2 sm:px-6 py-4 sm:py-6"
      >
        <TabsList className="hidden md:grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mx-0 sm:mx-4 mt-4 bg-card/60 backdrop-blur-sm border border-border shadow-sm rounded-xl text-xs sm:text-base">
          <TabsTrigger
            value="overview"
            className="flex items-center gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200" // Toned down active state
          >
            <PieChart className="h-4 w-4 icon-bounce" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger
            value="chat"
            className="flex items-center gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200" // Toned down active state
          >
            <Bot className="h-4 w-4 icon-bounce" />
            <span className="hidden sm:inline">Chat</span>
          </TabsTrigger>
          <TabsTrigger
            value="transactions"
            className="flex items-center gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200" // Toned down active state
          >
            <Wallet className="h-4 w-4 icon-bounce" />
            <span className="hidden sm:inline">Expenses</span>
          </TabsTrigger>
          <TabsTrigger
            value="goals"
            className="flex items-center gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200" // Toned down active state
          >
            <Target className="h-4 w-4 icon-bounce" />
            <span className="hidden sm:inline">Goals</span>
          </TabsTrigger>
          <TabsTrigger
            value="investments"
            className="flex items-center gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200" // Toned down active state
          >
            <TrendingUp className="h-4 w-4 icon-bounce" />
            <span className="hidden sm:inline">Invest</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="flex-1 animate-slide-up">
          <FinancialOverview />
        </TabsContent>

        {/* Chat Tab */}
        <TabsContent
          value="chat"
          className="flex-1 flex flex-col animate-slide-up min-h-[300px]"
        >
          <div className="flex-1 overflow-y-auto space-y-4 pb-2 sm:pb-0">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                {" "}
                {/* Removed bounce-in */}
                <div className="relative">
                  <Avatar className="h-20 w-20 bg-primary shadow-md">
                    {" "}
                    {/* Toned down avatar */}
                    <AvatarFallback className="text-white text-3xl bg-transparent">
                      <Bot className="h-10 w-10 animate-float" />{" "}
                      {/* Kept subtle float */}
                    </AvatarFallback>
                  </Avatar>
                  {/* Removed flashy sparkle */}
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-foreground">
                    Hi! I'm FinBot 🚀
                  </h2>{" "}
                  {/* Changed to solid text color */}
                  <p className="text-muted-foreground max-w-md leading-relaxed text-sm">
                    Your AI-powered personal finance assistant. I can help you
                    track expenses, set financial goals, provide investment
                    advice, and analyze your spending patterns with intelligent
                    insights.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Zap className="h-3 w-3 text-yellow-500" />
                    <span>Powered by advanced AI</span>
                  </div>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex gap-3 animate-slide-up ${message.role === "user" ? "justify-end" : "justify-start"}`} // Kept subtle slide-up
                style={{ animationDelay: `${index * 0.05}s` }} // Reduced delay
              >
                {message.role === "assistant" && (
                  <Avatar className="h-9 w-9 bg-primary flex-shrink-0 shadow-sm interactive-card">
                    {" "}
                    {/* Toned down avatar */}
                    <AvatarFallback className="text-white bg-transparent">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`flex flex-col max-w-[75%] ${message.role === "user" ? "items-end" : "items-start"}`}
                >
                  <Card
                    className={`p-3 shadow-sm border border-border interactive-card ${
                      // Toned down shadow, border
                      message.role === "user"
                        ? "bg-primary text-primary-foreground" // Changed to solid color
                        : "bg-card text-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </Card>
                  <span className="text-xs text-muted-foreground mt-1 px-1">
                    {formatTime(new Date(message.createdAt || Date.now()))}
                  </span>
                </div>

                {message.role === "user" && (
                  <Avatar className="h-9 w-9 bg-blue-500 flex-shrink-0 shadow-sm interactive-card">
                    {" "}
                    {/* Toned down avatar */}
                    <AvatarFallback className="text-white bg-transparent">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                {" "}
                {/* Removed bounce-in */}
                <Avatar className="h-9 w-9 bg-primary flex-shrink-0 shadow-sm">
                  <AvatarFallback className="text-white bg-transparent">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <Card className="p-3 bg-card border border-border shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                    <div
                      className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </Card>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {showQuickActions && messages.length === 0 && (
            <div
              className="pb-4 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              {" "}
              {/* Reduced delay */}
              <div className="grid grid-cols-2 gap-2">
                {" "}
                {/* Reduced gap */}
                {quickActions.map((action, index) => (
                  <Button
                    key={action.text}
                    variant="outline"
                    className={`h-14 justify-start gap-2 ${action.color} text-white border-0 shadow-sm hover:shadow-md transition-all duration-200 interactive-button`} // Toned down styles
                    onClick={() =>
                      handleQuickAction(action.action, action.text)
                    }
                    style={{ animationDelay: `${index * 0.05}s` }} // Reduced delay
                  >
                    <action.icon className="h-4 w-4" />{" "}
                    {/* Removed icon-bounce */}
                    <span className="font-medium">{action.text}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input */}
          <div className="p-2 sm:p-4 border-t border-border bg-card/80 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex gap-2 flex-col sm:flex-row">
              <Input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about your finances... (e.g., 'I spent $50 on groceries')"
                className="flex-1 h-11 bg-card border border-border focus:border-primary rounded-lg px-3 transition-all duration-200 text-sm sm:text-base"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="h-11 w-full sm:w-11 rounded-lg bg-primary hover:bg-primary/90 shadow-sm hover:shadow-md transition-all duration-200 interactive-button mt-2 sm:mt-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="flex-1 animate-slide-up">
          <TransactionForm />
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="flex-1 animate-slide-up">
          <GoalTracker />
        </TabsContent>

        {/* Investments Tab */}
        <TabsContent
          value="investments"
          className="flex-1 w-full max-w-full md:max-w-screen-lg mx-auto px-2 sm:px-6 py-4 sm:py-6 animate-slide-up"
        >
          {/* Responsive stat boxes row, fix overflow and alignment */}
          {/* <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
            <div className="flex flex-col items-center justify-center bg-card border border-border rounded-xl p-3 shadow-sm min-w-0">
              <div className="flex items-center gap-1 mb-1">
                <PieChart className="h-5 w-5 text-blue-400" />
                <span className="text-xs text-blue-300 font-medium">Portfolio Value</span>
              </div>
              <span className="font-bold text-lg text-blue-200">₹2,50,000</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-card border border-border rounded-xl p-3 shadow-sm min-w-0">
              <div className="flex items-center gap-1 mb-1">
                <Wallet className="h-5 w-5 text-pink-400" />
                <span className="text-xs text-pink-300 font-medium">Total Invested</span>
              </div>
              <span className="font-bold text-lg text-pink-200">₹2,00,000</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-card border border-border rounded-xl p-3 shadow-sm min-w-0">
              <div className="flex items-center gap-1 mb-1">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span className="text-xs text-green-300 font-medium">Total Returns</span>
              </div>
              <span className="font-bold text-lg text-green-200">₹50,000</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-card border border-border rounded-xl p-3 shadow-sm min-w-0">
              <div className="flex items-center gap-1 mb-1">
                <BarChart3 className="h-5 w-5 text-orange-400" />
                <span className="text-xs text-orange-300 font-medium">Return %</span>
              </div>
              <span className="font-bold text-lg text-orange-200">+25.0%</span>
            </div>
          </div> */}
          <InvestmentDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
