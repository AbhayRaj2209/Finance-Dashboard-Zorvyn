import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: "📊", desc: "Overview" },
  { path: "/transactions", label: "Transactions", icon: "💳", desc: "Manage" },
  { path: "/insights", label: "Insights", icon: "💡", desc: "Analytics" },
];

const bottomNavItems = [
  { path: "/settings", label: "Settings", icon: "⚙️" },
  { path: "/help", label: "Help", icon: "❓" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity duration-300 ${
          collapsed ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        onClick={() => setCollapsed(true)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
          collapsed ? "-translate-x-full lg:translate-x-0 lg:w-20" : "translate-x-0 w-64"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-200 dark:border-gray-700">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 via-primary-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform duration-300 cursor-pointer animate-pulse-slow">
              F
            </div>
            {!collapsed && (
              <div className="animate-fade-in">
                <span className="font-bold text-xl bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  Finora
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Smart Money</p>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <p className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3 ${collapsed ? "hidden" : ""}`}>
            Menu
          </p>
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <li key={item.path} style={{ animationDelay: `${index * 100}ms` }} className="animate-slide-up">
                <NavLink
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && setCollapsed(true)}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:translate-x-1"
                    }`
                  }
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                  {!collapsed && (
                    <div className="flex-1">
                      <span className="font-medium">{item.label}</span>
                      <p className="text-xs opacity-70">{item.desc}</p>
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Promo card - compact */}
          {!collapsed && (
            <Link
              to="/pricing"
              className="mt-4 mx-1 p-3 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl text-white flex items-center gap-3 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-in group"
            >
              <span className="text-xl group-hover:animate-bounce">⚡</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">Go Pro</p>
                <p className="text-xs text-white/70 truncate">Unlock all features</p>
              </div>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}

          {/* Bottom nav items */}
          <div className={`mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 ${collapsed ? "mt-2" : ""}`}>
            <p className={`text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3 ${collapsed ? "hidden" : ""}`}>
              Support
            </p>
            <ul className="space-y-1">
              {bottomNavItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => window.innerWidth < 1024 && setCollapsed(true)}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-gray-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                      }`
                    }
                  >
                    <span className="text-lg">{item.icon}</span>
                    {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Collapse toggle for desktop */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center p-3 m-3 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </aside>

      {/* Mobile hamburger button */}
      <button
        onClick={() => setCollapsed(false)}
        className={`fixed bottom-4 left-4 z-20 lg:hidden p-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-lg shadow-primary-500/30 transition-all duration-300 hover:scale-110 ${
          collapsed ? "animate-bounce-in" : "scale-0"
        }`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </>
  );
}