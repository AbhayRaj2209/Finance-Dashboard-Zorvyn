import { useMemo } from "react";
import { useApp } from "../../context/AppContext";

export default function SummaryCards() {
  const { transactions } = useApp();

  const summary = useMemo(() => {
    const income = transactions
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + tx.amount, 0);
    const expenses = transactions
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + tx.amount, 0);
    const balance = income - expenses;
    return { income, expenses, balance };
  }, [transactions]);

  const cards = [
    {
      title: "Total Balance",
      value: summary.balance,
      icon: "💰",
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      bgLight: "bg-blue-50 dark:bg-blue-900/20",
      textColor: summary.balance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
      shadowColor: "shadow-blue-500/20",
    },
    {
      title: "Total Income",
      value: summary.income,
      icon: "📈",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      bgLight: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400",
      shadowColor: "shadow-green-500/20",
    },
    {
      title: "Total Expenses",
      value: summary.expenses,
      icon: "📉",
      gradient: "from-red-500 via-rose-500 to-pink-500",
      bgLight: "bg-red-50 dark:bg-red-900/20",
      textColor: "text-red-600 dark:text-red-400",
      shadowColor: "shadow-red-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {cards.map((card, index) => (
        <div
          key={card.title}
          className={`card hover:shadow-xl ${card.shadowColor} transition-all duration-300 hover:-translate-y-1 group`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {card.title}
              </p>
              <p className={`text-2xl lg:text-3xl font-bold ${card.textColor} transition-all duration-300 group-hover:scale-105`}>
                ₹{card.value.toLocaleString("en-IN")}
              </p>
              <div className="mt-2 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <span className={`inline-block w-2 h-2 rounded-full bg-gradient-to-r ${card.gradient}`}></span>
                <span>Updated now</span>
              </div>
            </div>
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
              <span className="text-2xl filter drop-shadow">{card.icon}</span>
            </div>
          </div>
          
          {/* Animated gradient bar at bottom */}
          <div className="mt-4 h-1 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
            <div 
              className={`h-full rounded-full bg-gradient-to-r ${card.gradient} animate-shimmer`}
              style={{ 
                width: card.title === "Total Balance" ? "100%" : card.title === "Total Income" ? "75%" : "60%",
                backgroundSize: "200% 100%"
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}