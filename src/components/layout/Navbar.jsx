import { useRole } from "../../context/RoleContext";
import { useApp } from "../../context/AppContext";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";

const pageNames = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/transactions": "Transactions",
  "/insights": "Insights",
  "/about": "About",
  "/pricing": "Pricing",
  "/settings": "Settings",
  "/help": "Help",
};

export default function Navbar() {
  const { role, setRole, roles } = useRole();
  const { darkMode, setDarkMode } = useApp();
  const location = useLocation();
  const currentPage = pageNames[location.pathname] || "Dashboard";
  const [showProfile, setShowProfile] = useState(false);

  const isHome = location.pathname === "/";

  return (
    <header className={`sticky top-0 z-10 ${isHome ? "bg-transparent" : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"}`}>
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        {/* Left side - Logo & Page title */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 via-primary-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform duration-300">
              F
            </div>
            <span className="hidden sm:block font-bold text-xl bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Finora
            </span>
          </Link>
          
          {!isHome && (
            <>
              <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
              <div className="animate-fade-in">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {currentPage}
                </h1>
              </div>
            </>
          )}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Navigation links for home page */}
          {isHome && (
            <nav className="hidden md:flex items-center gap-6 mr-4">
              <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
                Dashboard
              </Link>
              <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
                About
              </Link>
              <Link to="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
                Pricing
              </Link>
              <Link to="/help" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
                Help
              </Link>
            </nav>
          )}

          {!isHome && (
            <>
              {/* Search button */}
              <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {/* Divider */}
              <div className="hidden sm:block w-px h-8 bg-gray-200 dark:bg-gray-700"></div>

              {/* Role switcher */}
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="select text-sm py-1.5 pr-8 transition-all duration-200 hover:ring-2 hover:ring-primary-300"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              {/* Role badge */}
              <span
                className={`hidden lg:inline-flex px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
                  role === "Admin"
                    ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/30"
                    : "bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                }`}
              >
                {role === "Admin" ? "✨ Admin" : "👁 Viewer"}
              </span>
            </>
          )}

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-white dark:ring-gray-800">
                AR
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Abhay Raj</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Premium User</p>
              </div>
              <svg className={`hidden sm:block w-4 h-4 text-gray-500 transition-transform ${showProfile ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 animate-slide-in z-50">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                      AR
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Abhay Raj</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">john@example.com</p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <Link 
                    to="/settings" 
                    onClick={() => setShowProfile(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    onClick={() => setShowProfile(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </Link>
                  <Link 
                    to="/help" 
                    onClick={() => setShowProfile(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Help & Support
                  </Link>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                  <Link 
                    to="/" 
                    onClick={() => setShowProfile(false)}
                    className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}