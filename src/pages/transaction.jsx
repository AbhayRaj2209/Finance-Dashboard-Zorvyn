import { useState } from "react";
import Filters from "../components/transactions/Filters";
import TransactionList from "../components/transactions/TransactionList";
import TransactionForm from "../components/transactions/Transactionform";
import { useRole } from "../context/RoleContext";
import { useApp } from "../context/AppContext";

export default function Transactions() {
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const { role } = useRole();
  const { transactions } = useApp();
  const isAdmin = role === "Admin";

  const handleEdit = (tx) => {
    setEditingTransaction(tx);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  // Export functionality
  const handleExport = (format) => {
    if (transactions.length === 0) return;

    let content, filename, type;

    if (format === "csv") {
      const headers = ["Date", "Description", "Amount", "Category", "Type"];
      const rows = transactions.map((tx) => [
        tx.date,
        `"${tx.description}"`,
        tx.amount,
        tx.category,
        tx.type,
      ]);
      content = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      filename = "transactions.csv";
      type = "text/csv";
    } else {
      content = JSON.stringify(transactions, null, 2);
      filename = "transactions.json";
      type = "application/json";
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Transactions
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your income and expenses
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Export dropdown */}
          <div className="relative group">
            <button className="btn-secondary flex items-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
            <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <button
                onClick={() => handleExport("csv")}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg"
              >
                Export as CSV
              </button>
              <button
                onClick={() => handleExport("json")}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg"
              >
                Export as JSON
              </button>
            </div>
          </div>

          {/* Add button (Admin only) */}
          {isAdmin && (
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Viewer notice */}
      {!isAdmin && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">
              You're viewing as a Viewer. Switch to Admin role to add or edit transactions.
            </span>
          </div>
        </div>
      )}

      <Filters />
      <TransactionList onEdit={handleEdit} />

      {/* Transaction Form Modal */}
      {showForm && (
        <TransactionForm
          transaction={editingTransaction}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}