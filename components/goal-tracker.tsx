"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  PlusCircle,
  Trash2,
  Target,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { useCurrency } from "@/contexts/currency-context";

const goalCategories = [
  { name: "Emergency Fund", icon: "🛡️", color: "bg-blue-500" }, // Changed to solid color
  { name: "Vacation", icon: "🏖️", color: "bg-purple-500" }, // Changed to solid color
  { name: "House Down Payment", icon: "🏠", color: "bg-green-500" }, // Changed to solid color
  { name: "Car Purchase", icon: "🚗", color: "bg-red-500" }, // Changed to solid color
  { name: "Education", icon: "📚", color: "bg-indigo-500" }, // Changed to solid color
  { name: "Retirement", icon: "🏖️", color: "bg-yellow-500" }, // Changed to solid color
  { name: "Investment", icon: "📈", color: "bg-violet-500" }, // Changed to solid color
  { name: "Debt Payoff", icon: "💳", color: "bg-pink-500" }, // Changed to solid color
  { name: "Others", icon: "🎯", color: "bg-gray-500" }, // Changed to solid color
];

export function GoalTracker() {
  const { formatAmount, getCurrencySymbol } = useCurrency();

  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Emergency Fund",
      category: "Emergency Fund",
      targetAmount: 100000,
      currentAmount: 75000,
      targetDate: "2024-12-31",
      description: "6 months of expenses",
      monthlyContribution: 5000,
    },
    {
      id: 2,
      name: "Dream Vacation",
      category: "Vacation",
      targetAmount: 30000,
      currentAmount: 15000,
      targetDate: "2024-08-15",
      description: "Trip to Japan",
      monthlyContribution: 3000,
    },
    {
      id: 3,
      name: "New Laptop",
      category: "Others",
      targetAmount: 80000,
      currentAmount: 25000,
      targetDate: "2024-06-30",
      description: "MacBook Pro for work",
      monthlyContribution: 8000,
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    targetAmount: "",
    currentAmount: "",
    targetDate: "",
    description: "",
    monthlyContribution: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.targetAmount && formData.targetDate) {
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newGoal = {
        id: Date.now(),
        name: formData.name,
        category: formData.category,
        targetAmount: Number.parseFloat(formData.targetAmount),
        currentAmount: Number.parseFloat(formData.currentAmount) || 0,
        targetDate: formData.targetDate,
        description: formData.description,
        monthlyContribution:
          Number.parseFloat(formData.monthlyContribution) || 0,
      };
      setGoals([...goals, newGoal]);
      setFormData({
        name: "",
        category: "",
        targetAmount: "",
        currentAmount: "",
        targetDate: "",
        description: "",
        monthlyContribution: "",
      });
      setShowForm(false);
      setIsSubmitting(false);
    }
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  const addContribution = (goalId: number, amount: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              currentAmount: Math.min(
                goal.currentAmount + amount,
                goal.targetAmount,
              ),
            }
          : goal,
      ),
    );
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const calculateMonthsRemaining = (targetDate: string) => {
    const target = new Date(targetDate);
    const now = new Date();
    const diffTime = target.getTime() - now.getTime();
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return Math.max(diffMonths, 0);
  };

  const getCategoryIcon = (categoryName: string) => {
    return (
      goalCategories.find((cat) => cat.name === categoryName)?.icon || "🎯"
    );
  };

  const getCategoryColor = (categoryName: string) => {
    return (
      goalCategories.find((cat) => cat.name === categoryName)?.color ||
      "bg-gray-500"
    ); // Changed to solid color
  };

  return (
    <div className="space-y-6">
      {/* Goals Overview */}
      <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm">
        {" "}
        {/* Toned down card styles */}
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                Saved So Far
              </div>
              <div className="text-3xl font-bold text-green-700 dark:text-green-300">
                {formatAmount(
                  goals.reduce((sum, g) => sum + g.currentAmount, 0),
                )}
              </div>
            </div>
            <div className="p-3 bg-green-500 rounded-xl">
              {" "}
              {/* Used solid green */}
              <Trophy className="h-5 w-5 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm">
          {" "}
          {/* Toned down card styles */}
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  Total Goals
                </div>
                <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                  {goals.length}
                </div>
              </div>
              <div className="p-3 bg-blue-500 rounded-xl">
                {" "}
                {/* Used solid blue */}
                <Target className="h-5 w-5 text-white" />
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
                <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                  Target Amount
                </div>
                <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                  {formatAmount(
                    goals.reduce((sum, g) => sum + g.targetAmount, 0),
                  )}
                </div>
              </div>
              <div className="p-3 bg-purple-500 rounded-xl">
                {" "}
                {/* Used solid purple */}
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Goal Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Your Financial Goals
          </h2>{" "}
          {/* Changed to solid text color */}
          <p className="text-muted-foreground mt-1">
            Track and achieve your financial dreams
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 h-11 px-5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 interactive-button" // Toned down button styles
        >
          <PlusCircle className="h-5 w-5" />
          Add Goal
        </Button>
      </div>

      {/* Add Goal Form */}
      {showForm && (
        <Card className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm animate-slide-up">
          {" "}
          {/* Toned down card styles */}
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-foreground">
              <div className="p-2 bg-orange-500 rounded-lg">
                {" "}
                {/* Used solid orange */}
                <Target className="h-5 w-5 text-white" />
              </div>
              <span className="text-foreground">Create New Goal</span>{" "}
              {/* Changed to solid text color */}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Goal Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g., Emergency Fund"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="h-11 bg-input border-border rounded-lg" // Toned down styles
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="category"
                    className="text-foreground font-medium"
                  >
                    Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger className="h-11 bg-input border-border rounded-lg">
                      {" "}
                      {/* Toned down styles */}
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {goalCategories.map((category) => (
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
                  <Label
                    htmlFor="targetAmount"
                    className="text-foreground font-medium"
                  >
                    Target Amount ({getCurrencySymbol()})
                  </Label>
                  <Input
                    id="targetAmount"
                    type="number"
                    placeholder="100000"
                    value={formData.targetAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, targetAmount: e.target.value })
                    }
                    className="h-11 bg-input border-border rounded-lg" // Toned down styles
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="currentAmount"
                    className="text-foreground font-medium"
                  >
                    Current Amount ({getCurrencySymbol()})
                  </Label>
                  <Input
                    id="currentAmount"
                    type="number"
                    placeholder="0"
                    value={formData.currentAmount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currentAmount: e.target.value,
                      })
                    }
                    className="h-11 bg-input border-border rounded-lg" // Toned down styles
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="targetDate"
                    className="text-foreground font-medium"
                  >
                    Target Date
                  </Label>
                  <Input
                    id="targetDate"
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) =>
                      setFormData({ ...formData, targetDate: e.target.value })
                    }
                    className="h-11 bg-input border-border rounded-lg" // Toned down styles
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="monthlyContribution"
                    className="text-foreground font-medium"
                  >
                    Monthly Contribution ({getCurrencySymbol()})
                  </Label>
                  <Input
                    id="monthlyContribution"
                    type="number"
                    placeholder="5000"
                    value={formData.monthlyContribution}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        monthlyContribution: e.target.value,
                      })
                    }
                    className="h-11 bg-input border-border rounded-lg" // Toned down styles
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="description"
                  className="text-foreground font-medium"
                >
                  Description (Optional)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Add details about your goal..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="bg-input border-border rounded-lg" // Toned down styles
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 interactive-button" // Toned down button styles
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                      Creating Goal...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Create Goal
                    </div>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="h-11 px-5 bg-secondary hover:bg-secondary/80 border-border rounded-lg transition-all duration-200" // Toned down button styles
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Goals List */}
      <div className="space-y-6">
        {goals.map((goal, index) => {
          const progress = calculateProgress(
            goal.currentAmount,
            goal.targetAmount,
          );
          const monthsRemaining = calculateMonthsRemaining(goal.targetDate);
          const isCompleted = progress >= 100;

          return (
            <Card
              key={goal.id}
              className="interactive-card bg-card/80 backdrop-blur-sm border border-border shadow-sm animate-slide-up" // Toned down card styles
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-3xl">
                      {getCategoryIcon(goal.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-xl text-foreground">
                          {goal.name}
                        </h3>{" "}
                        {/* Changed to solid text color */}
                        <Badge
                          className={`${getCategoryColor(goal.category)} text-white border-0`}
                        >
                          {goal.category}
                        </Badge>
                        {isCompleted && (
                          <Badge className="bg-green-500 text-white border-0">
                            {" "}
                            {/* Removed animation */}
                            <Trophy className="h-5 w-5 mr-1" />
                            Completed!
                          </Badge>
                        )}
                      </div>
                      {goal.description && (
                        <p className="text-muted-foreground mb-2">
                          {goal.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteGoal(goal.id)}
                    className="h-9 w-9 text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-150 interactive-button" // Toned down button styles
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">
                      Progress
                    </span>
                    <span className="font-bold text-foreground">
                      {formatAmount(goal.currentAmount)} /{" "}
                      {formatAmount(goal.targetAmount)}
                    </span>
                  </div>
                  <div className="relative">
                    <Progress value={progress} className="h-3 progress-bar" />
                    <div
                      className={`absolute inset-0 ${getCategoryColor(goal.category)} rounded-full opacity-20`} // Removed animation
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        {progress.toFixed(1)}% complete
                      </span>
                      {progress > 50 && (
                        <div className="flex items-center gap-1">
                          <Zap className="h-5 w-5 text-yellow-500" />
                          <span className="text-green-600 dark:text-green-400 text-xs">
                            Great progress!
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-muted-foreground">
                      {monthsRemaining} months remaining
                    </span>
                  </div>

                  {!isCompleted && (
                    <div className="flex gap-3 pt-4">
                      <Button
                        size="sm"
                        onClick={() => addContribution(goal.id, 1000)}
                        className="bg-blue-500 hover:bg-blue-600 text-white border-0 rounded-lg transition-all duration-150 interactive-button" // Toned down button styles
                      >
                        +{formatAmount(1000)}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => addContribution(goal.id, 5000)}
                        className="bg-green-500 hover:bg-green-600 text-white border-0 rounded-lg transition-all duration-150 interactive-button" // Toned down button styles
                      >
                        +{formatAmount(5000)}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          addContribution(goal.id, goal.monthlyContribution)
                        }
                        className="bg-purple-500 hover:bg-purple-600 text-white border-0 rounded-lg transition-all duration-150 interactive-button" // Toned down button styles
                      >
                        +{formatAmount(goal.monthlyContribution)} (Monthly)
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
