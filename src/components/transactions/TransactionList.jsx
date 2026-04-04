import { useMemo, useState } from "react";
import { useApp } from "../../context/AppContext";
import { useRole } from "../../context/RoleContext";

export default function TransactionList({ onEdit }) {
  const { transactions, filterCategory, filterType, searchQuery, sortBy, deleteTransaction } = useApp();
  const { role } = useRole();
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const isAdmin = role === "Admin";

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Filter by category
    if (filterCategory !== "All") {
      result = result.filter((tx) => tx.category === filterCategory);
    }

    // Filter by type
    if (filterType !== "All") {
      result = result.filter((tx) => tx.type === filterType);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (tx) =>
          tx.description.toLowerCase().includes(query) ||
          tx.category.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(a.date) - new Date(b.date);
        case "date-desc":
          return new Date(b.date) - new Date(a.date);
        case "amount-asc":
          return a.amount - b.amount;
        case "amount-desc":
          return b.amount - a.amount;
        default:
          return 0;
      }
    });

    return result;
  }, [transactions, filterCategory, filterType, searchQuery, sortBy]);

  const handleDelete = (id) => {
    deleteTransaction(id);
    setDeleteConfirm(null);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Income: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      Housing: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      Food: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
      Shopping: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
      Transport: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      Utilities: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      Entertainment: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      Health: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
    };
    return colors[category] || "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
  };

  if (filteredTransactions.length === 0) {
    return (
      <div className="card text-center py-12 animate-fade-in">
        <div className="text-4xl mb-4">📭</div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No transactions found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {transactions.length === 0
            ? "Add your first transaction to get started"
            : "Try adjusting your filters"}
        </p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Transactions
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {filteredTransactions.length} of {transactions.length}
        </span>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Description
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Amount
              </th>
              {isAdmin && (
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredTransactions.map((tx) => (
              <tr
                key={tx.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                  {new Date(tx.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                  {tx.description}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getCategoryColor(tx.category)}`}>
                    {tx.category}
                  </span>
                </td>
                <td className={`py-3 px-4 text-sm font-semibold text-right ${
                  tx.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}>
                  {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
                </td>
                {isAdmin && (
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(tx)}
                        className="p-1.5 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      {deleteConfirm === tx.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(tx.id)}
                            className="p-1.5 text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
                            title="Confirm delete"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                            title="Cancel"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(tx.id)}
                          className="p-1.5 text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <div className="md:hidden space-y-3">
        {filteredTransactions.map((tx) => (
          <div
            key={tx.id}
            className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {tx.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(tx.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <span className={`font-semibold ${
                tx.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}>
                {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getCategoryColor(tx.category)}`}>
                {tx.category}
              </span>
              {isAdmin && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEdit(tx)}
                    className="p-1.5 text-gray-500 hover:text-primary-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteConfirm === tx.id ? handleDelete(tx.id) : setDeleteConfirm(tx.id)}
                    className={`p-1.5 ${deleteConfirm === tx.id ? "text-white bg-red-600 rounded" : "text-gray-500 hover:text-red-600"}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}