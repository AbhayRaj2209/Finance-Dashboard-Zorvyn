import SummaryCards from "../components/dashboard/SummaryCards";
import BalanceChart from "../components/dashboard/BalanceChart";
import SpendingChart from "../components/dashboard/SpendingChart";
import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { transactions } = useApp();

  // Recent transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Overview of your financial activity
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceChart />
        <SpendingChart />
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Transactions
        </h3>
        {recentTransactions.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No transactions yet
          </p>
        ) : (
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === "income"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                        : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    }`}
                  >
                    {tx.type === "income" ? "↑" : "↓"}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {tx.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(tx.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                      {" · "}
                      {tx.category}
                    </p>
                  </div>
                </div>
                <span
                  className={`font-semibold ${
                    tx.type === "income"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}