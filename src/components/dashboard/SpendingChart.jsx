import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useApp } from "../../context/AppContext";

const COLORS = ["#534AB7", "#1D9E75", "#D85A30", "#378ADD", "#BA7517", "#D4537E", "#639922", "#8B5CF6"];

export default function SpendingChart() {
  const { transactions } = useApp();

  const categoryData = useMemo(() => {
    const grouped = {};

    transactions
      .filter((tx) => tx.type === "expense")
      .forEach((tx) => {
        if (!grouped[tx.category]) {
          grouped[tx.category] = 0;
        }
        grouped[tx.category] += tx.amount;
      });

    return Object.entries(grouped)
      .map(([category, amount], index) => ({
        category,
        amount,
        color: COLORS[index % COLORS.length],
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  const totalExpenses = categoryData.reduce((sum, item) => sum + item.amount, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.amount / totalExpenses) * 100).toFixed(1);
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white">{data.category}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ₹{data.amount.toLocaleString("en-IN")} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-sm">
        {payload.map((entry, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-600 dark:text-gray-400">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  if (categoryData.length === 0) {
    return (
      <div className="card h-80 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No expense data available</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Spending by Category
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="amount"
              nameKey="category"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}