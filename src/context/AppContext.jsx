import { createContext, useContext, useState, useEffect } from "react";
import { transactions as initialTransactions } from "../data/mockData";

const AppContext = createContext();

const STORAGE_KEY = "finance_dashboard_transactions";

function loadTransactions() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialTransactions;
  } catch {
    return initialTransactions;
  }
}

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(loadTransactions);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("finance_dark_mode");
    return stored === "true";
  });

  // Persist transactions to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  // Persist dark mode preference
  useEffect(() => {
    localStorage.setItem("finance_dark_mode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  function addTransaction(tx) {
    const newTx = { ...tx, id: Date.now() };
    setTransactions((prev) => [newTx, ...prev]);
  }

  function editTransaction(updated) {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === updated.id ? updated : tx))
    );
  }

  function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }

  function resetToDefault() {
    setTransactions(initialTransactions);
  }

  return (
    <AppContext.Provider
      value={{
        transactions,
        filterCategory, setFilterCategory,
        filterType,     setFilterType,
        searchQuery,    setSearchQuery,
        sortBy,         setSortBy,
        darkMode,       setDarkMode,
        addTransaction,
        editTransaction,
        deleteTransaction,
        resetToDefault,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}