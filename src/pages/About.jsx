import { Link } from "react-router-dom";

export default function About() {
  const team = [
    { name: "Rahul Sharma", role: "Founder & CEO", avatar: "RS" },
    { name: "Priya Patel", role: "Lead Developer", avatar: "PP" },
    { name: "Amit Kumar", role: "UI/UX Designer", avatar: "AK" },
    { name: "Sneha Gupta", role: "Data Analyst", avatar: "SG" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-fade-in">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About <span className="bg-gradient-to-r from-primary-500 to-purple-600 bg-clip-text text-transparent">Finora</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We're on a mission to make personal finance management simple, beautiful, and accessible to everyone.
        </p>
      </div>

      {/* Story */}
      <div className="card mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <p>
            Finora was born out of frustration with complicated financial tools that required a finance degree to understand. We believed there had to be a better way.
          </p>
          <p>
            Founded in 2024, our team set out to create a finance dashboard that anyone could use - from college students tracking their first budget to professionals managing multiple income streams.
          </p>
          <p>
            Today, Finora helps thousands of users across India take control of their financial future with intuitive design, powerful insights, and a commitment to user privacy.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="card text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            🔒
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Privacy First</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your data stays on your device. We never sell or share your financial information.
          </p>
        </div>
        <div className="card text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            💡
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Simple by Design</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Complex finances, simple interface. We make understanding money easy.
          </p>
        </div>
        <div className="card text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            🚀
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Always Improving</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            We ship new features every week based on your feedback.
          </p>
        </div>
      </div>

      {/* Team */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Meet the Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {team.map((member) => (
            <div key={member.name} className="card text-center group hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
                {member.avatar}
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white">{member.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="card bg-gradient-to-r from-primary-500 to-purple-600 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Ready to Get Started?</h2>
        <p className="text-white/80 mb-6">Join thousands of users managing their finances with Finora.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          >
            Go to Dashboard
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
