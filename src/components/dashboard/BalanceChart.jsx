import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useApp } from "../../context/AppContext";

export default function BalanceChart() {
  const { transactions, darkMode } = useApp();

  const monthlyData = useMemo(() => {
    const grouped = {};
    
    transactions.forEach((tx) => {
      const date = new Date(tx.date);
      const monthKey = date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      
      if (!grouped[monthKey]) {
        grouped[monthKey] = { month: monthKey, income: 0, expenses: 0, date };
      }
      
      if (tx.type === "income") {
        grouped[monthKey].income += tx.amount;
      } else {
        grouped[monthKey].expenses += tx.amount;
      }
    });

    return Object.values(grouped)
      .sort((a, b) => a.date - b.date)
      .map(({ month, income, expenses }) => ({
        month,
        income,
        expenses,
        savings: income - expenses,
      }));
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white mb-2">{label}</p>
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

  if (monthlyData.length === 0) {
    return (
      <div className="card h-80 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Monthly Balance Trend
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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
            <Legend />
            <Line
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="savings"
              name="Savings"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}