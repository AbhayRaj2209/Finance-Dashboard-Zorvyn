import { useState } from "react";
import { Link } from "react-router-dom";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for getting started",
      features: [
        "Up to 50 transactions/month",
        "Basic dashboard",
        "3 categories",
        "Local storage only",
        "Community support",
      ],
      notIncluded: [
        "Advanced insights",
        "Export to CSV/PDF",
        "Multiple accounts",
        "Priority support",
      ],
      cta: "Current Plan",
      popular: false,
      gradient: "from-gray-500 to-gray-600",
    },
    {
      name: "Pro",
      price: { monthly: 199, yearly: 1999 },
      description: "For serious money managers",
      features: [
        "Unlimited transactions",
        "Advanced dashboard",
        "Unlimited categories",
        "Cloud sync & backup",
        "Export to CSV/PDF",
        "Advanced insights & AI tips",
        "Email support",
      ],
      notIncluded: [
        "Multiple accounts",
        "Priority support",
      ],
      cta: "Upgrade to Pro",
      popular: true,
      gradient: "from-primary-500 to-purple-600",
    },
    {
      name: "Business",
      price: { monthly: 499, yearly: 4999 },
      description: "For teams and businesses",
      features: [
        "Everything in Pro",
        "Multiple accounts",
        "Team collaboration",
        "Custom categories",
        "API access",
        "Priority support",
        "Dedicated account manager",
      ],
      notIncluded: [],
      cta: "Contact Sales",
      popular: false,
      gradient: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Choose the plan that works best for you. Upgrade or downgrade anytime.
        </p>

        {/* Billing toggle */}
        <div className="inline-flex items-center gap-3 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              billingCycle === "monthly"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              billingCycle === "yearly"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            Yearly
            <span className="ml-1 text-xs text-green-600 dark:text-green-400">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`card relative ${
              plan.popular ? "ring-2 ring-primary-500 shadow-xl" : ""
            } hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-primary-500 to-purple-600 text-white text-xs font-semibold rounded-full">
                Most Popular
              </div>
            )}

            <div className={`w-12 h-12 mb-4 bg-gradient-to-br ${plan.gradient} rounded-xl flex items-center justify-center text-white text-xl`}>
              {plan.name === "Free" ? "🆓" : plan.name === "Pro" ? "⚡" : "🏢"}
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{plan.description}</p>

            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                ₹{plan.price[billingCycle]}
              </span>
              {plan.price[billingCycle] > 0 && (
                <span className="text-gray-500 dark:text-gray-400">
                  /{billingCycle === "monthly" ? "mo" : "yr"}
                </span>
              )}
            </div>

            <button
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 mb-6 ${
                plan.popular
                  ? "bg-gradient-to-r from-primary-500 to-purple-600 text-white hover:shadow-lg hover:shadow-primary-500/30"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {plan.cta}
            </button>

            <div className="space-y-3">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                </div>
              ))}
              {plan.notIncluded.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm opacity-50">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-400">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "Can I switch plans anytime?",
              a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
            },
            {
              q: "Is my data secure?",
              a: "Absolutely. Your data is encrypted and stored securely. We never sell or share your information.",
            },
            {
              q: "Do you offer refunds?",
              a: "Yes, we offer a 30-day money-back guarantee on all paid plans.",
            },
            {
              q: "Can I export my data?",
              a: "Pro and Business plans include export to CSV and PDF. Free users can upgrade anytime to access this feature.",
            },
          ].map((faq) => (
            <div key={faq.q} className="card">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Back link */}
      <div className="text-center mt-12">
        <Link
          to="/dashboard"
          className="text-primary-600 dark:text-primary-400 hover:underline"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
