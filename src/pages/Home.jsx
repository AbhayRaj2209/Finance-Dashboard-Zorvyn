import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Home() {
  const { darkMode } = useApp();

  const features = [
    {
      icon: "📊",
      title: "Dashboard Overview",
      description: "Get a complete view of your finances with interactive charts and summaries",
    },
    {
      icon: "💳",
      title: "Transaction Tracking",
      description: "Track all your income and expenses with powerful filtering and search",
    },
    {
      icon: "💡",
      title: "Smart Insights",
      description: "AI-powered insights to help you understand your spending patterns",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Your financial data stays on your device with local storage",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-purple-500/10 to-pink-500/10 dark:from-primary-900/20 dark:via-purple-900/20 dark:to-pink-900/20"></div>
        
        {/* Animated circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }}></div>

        <div className="relative max-w-6xl mx-auto px-4 py-16 lg:py-24">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-6 animate-bounce-in">
              <span className="animate-pulse">✨</span>
              <span>Smart Financial Management</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
              Take Control of Your
              <span className="block bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient" style={{ backgroundSize: "200% 200%" }}>
                Financial Future
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Track expenses, monitor income, and gain valuable insights into your spending habits with our beautiful and intuitive finance dashboard.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                Get Started Free →
              </Link>
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
              >
                View Demo
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">10K+</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">₹50Cr</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tracked</p>
              </div>
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">4.9★</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">User Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Powerful features to help you manage your money better
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-gradient-to-br hover:from-primary-500 hover:to-purple-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-white dark:bg-gray-700 group-hover:bg-white/20 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-white mb-2 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-white/80 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="p-8 lg:p-12 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl shadow-primary-500/30">
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4">
              Ready to Start Saving?
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Join thousands of users who are already managing their finances smarter with Finora.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              <span>Launch Dashboard</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
