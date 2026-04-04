import { useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function InsightsPanel() {
  const { transactions, darkMode } = useApp();

  const insights = useMemo(() => {
    if (transactions.length === 0) return null;

    // Group by month
    const monthlyData = {};
    const categorySpending = {};

    transactions.forEach((tx) => {
      const date = new Date(tx.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const monthLabel = date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { monthKey, month: monthLabel, income: 0, expenses: 0 };
      }

      if (tx.type === "income") {
        monthlyData[monthKey].income += tx.amount;
      } else {
        monthlyData[monthKey].expenses += tx.amount;
        if (!categorySpending[tx.category]) {
          categorySpending[tx.category] = 0;
        }
        categorySpending[tx.category] += tx.amount;
      }
    });

    const months = Object.values(monthlyData).sort((a, b) => a.monthKey.localeCompare(b.monthKey));
    const totalIncome = transactions.filter((tx) => tx.type === "income").reduce((s, tx) => s + tx.amount, 0);
    const totalExpenses = transactions.filter((tx) => tx.type === "expense").reduce((s, tx) => s + tx.amount, 0);

    // Highest spending category
    const sortedCategories = Object.entries(categorySpending)
      .sort((a, b) => b[1] - a[1])
      .map(([category, amount]) => ({ category, amount }));

    const highestCategory = sortedCategories[0] || { category: "N/A", amount: 0 };
    const lowestCategory = sortedCategories[sortedCategories.length - 1] || { category: "N/A", amount: 0 };

    // Monthly comparison
    let monthlyComparison = null;
    if (months.length >= 2) {
      const currentMonth = months[months.length - 1];
      const previousMonth = months[months.length - 2];
      const expenseChange = currentMonth.expenses - previousMonth.expenses;
      const expenseChangePercent = previousMonth.expenses > 0
        ? ((expenseChange / previousMonth.expenses) * 100).toFixed(1)
        : 0;
      monthlyComparison = {
        current: currentMonth,
        previous: previousMonth,
        expenseChange,
        expenseChangePercent,
      };
    }

    // Savings rate
    const savingsRate = totalIncome > 0 ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1) : 0;

    // Average daily spending
    const uniqueDays = new Set(transactions.filter((tx) => tx.type === "expense").map((tx) => tx.date)).size;
    const avgDailySpending = uniqueDays > 0 ? Math.round(totalExpenses / uniqueDays) : 0;

    return {
      totalIncome,
      totalExpenses,
      highestCategory,
      lowestCategory,
      monthlyComparison,
      savingsRate,
      avgDailySpending,
      months,
      sortedCategories,
    };
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ₹{entry.value.toLocaleString("en-IN")}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!insights) {
    return (
      <div className="card text-center py-12">
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No data for insights
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Add some transactions to see financial insights
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Key metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
              <span className="text-2xl">🔥</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Highest Spending</p>
              <p className="font-semibold text-gray-900 dark:text-white">{insights.highestCategory.category}</p>
              <p className="text-sm text-red-600 dark:text-red-400">
                ₹{insights.highestCategory.amount.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Savings Rate</p>
              <p className="font-semibold text-gray-900 dark:text-white">{insights.savingsRate}%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">of total income</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <span className="text-2xl">📅</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Daily Spending</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                ₹{insights.avgDailySpending.toLocaleString("en-IN")}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">per day</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
              <span className="text-2xl">✨</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Lowest Spending</p>
              <p className="font-semibold text-gray-900 dark:text-white">{insights.lowestCategory.category}</p>
              <p className="text-sm text-green-600 dark:text-green-400">
                ₹{insights.lowestCategory.amount.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly comparison */}
      {insights.monthlyComparison && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Monthly Comparison
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {insights.monthlyComparison.previous.month}
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                ₹{insights.monthlyComparison.previous.expenses.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">in expenses</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {insights.monthlyComparison.current.month}
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                ₹{insights.monthlyComparison.current.expenses.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">in expenses</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Change</p>
              <p className={`text-xl font-semibold ${
                insights.monthlyComparison.expenseChange > 0
                  ? "text-red-600 dark:text-red-400"
                  : "text-green-600 dark:text-green-400"
              }`}>
                {insights.monthlyComparison.expenseChange > 0 ? "+" : ""}
                ₹{insights.monthlyComparison.expenseChange.toLocaleString("en-IN")}
              </p>
              <p className={`text-xs ${
                insights.monthlyComparison.expenseChange > 0
                  ? "text-red-600 dark:text-red-400"
                  : "text-green-600 dark:text-green-400"
              }`}>
                {insights.monthlyComparison.expenseChangePercent}%{" "}
                {insights.monthlyComparison.expenseChange > 0 ? "increase" : "decrease"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Monthly bar chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Income vs Expenses by Month
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={insights.months} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
              <XAxis
                dataKey="month"
                tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 12 }}
                axisLine={{ stroke: darkMode ? "#374151" : "#e5e7eb" }}
              />
              <YAxis
                tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 12 }}
                axisLine={{ stroke: darkMode ? "#374151" : "#e5e7eb" }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Spending by Category
        </h3>
        <div className="space-y-3">
          {insights.sortedCategories.map((cat, index) => {
            const percentage = ((cat.amount / insights.totalExpenses) * 100).toFixed(1);
            return (
              <div key={cat.category} className="group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {cat.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ₹{cat.amount.toLocaleString("en-IN")} ({percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips section */}
      <div className="card bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border-primary-200 dark:border-primary-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <span>💡</span> Smart Tips
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {parseFloat(insights.savingsRate) < 20 && (
            <li className="flex items-start gap-2">
              <span className="text-yellow-500">⚠️</span>
              Your savings rate is below 20%. Consider reviewing your expenses in {insights.highestCategory.category}.
            </li>
          )}
          {parseFloat(insights.savingsRate) >= 20 && (
            <li className="flex items-start gap-2">
              <span className="text-green-500">✅</span>
              Great job! You're saving {insights.savingsRate}% of your income.
            </li>
          )}
          {insights.monthlyComparison && insights.monthlyComparison.expenseChange > 0 && (
            <li className="flex items-start gap-2">
              <span className="text-yellow-500">📈</span>
              Your expenses increased by {insights.monthlyComparison.expenseChangePercent}% compared to last month.
            </li>
          )}
          <li className="flex items-start gap-2">
            <span className="text-blue-500">💰</span>
            Consider setting a budget of ₹{Math.round(insights.avgDailySpending * 0.9).toLocaleString("en-IN")}/day to reduce spending by 10%.
          </li>
        </ul>
      </div>
    </div>
  );
}