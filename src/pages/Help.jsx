import { useState } from "react";
import { Link } from "react-router-dom";

export default function Help() {
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "getting-started", name: "Getting Started", icon: "🚀" },
    { id: "dashboard", name: "Dashboard", icon: "📊" },
    { id: "transactions", name: "Transactions", icon: "💳" },
    { id: "insights", name: "Insights", icon: "💡" },
    { id: "account", name: "Account", icon: "👤" },
  ];

  const faqs = {
    "getting-started": [
      {
        q: "How do I get started with Finora?",
        a: "Simply sign up for a free account and start adding your transactions. You can manually enter them or import from your bank statements. The dashboard will automatically show you insights based on your data.",
      },
      {
        q: "Is my data secure?",
        a: "Yes! We use industry-standard encryption to protect your data. Your financial information is stored securely and we never share it with third parties.",
      },
      {
        q: "Can I use Finora on mobile?",
        a: "Finora is fully responsive and works great on any device - phone, tablet, or desktop. We're also working on dedicated mobile apps for iOS and Android.",
      },
      {
        q: "What currencies are supported?",
        a: "We currently support INR, USD, EUR, and GBP. More currencies will be added based on user demand.",
      },
    ],
    dashboard: [
      {
        q: "What do the summary cards show?",
        a: "The summary cards display your Total Balance (income minus expenses), Total Income, and Total Expenses for the selected period. These update automatically as you add transactions.",
      },
      {
        q: "How is the balance trend calculated?",
        a: "The balance trend chart shows your monthly balance over time, calculated from your transaction history. It helps you visualize your financial progress.",
      },
      {
        q: "Can I customize the dashboard?",
        a: "Dashboard customization is available on Pro and Business plans. You can rearrange widgets, hide sections, and choose different chart types.",
      },
    ],
    transactions: [
      {
        q: "How do I add a new transaction?",
        a: "Click the '+ Add Transaction' button, fill in the details (amount, category, date, description), and click Save. Admin role is required to add transactions.",
      },
      {
        q: "Can I edit or delete transactions?",
        a: "Yes, if you have Admin role. Click the edit (pencil) or delete (trash) icon next to any transaction. Viewer role can only view transactions.",
      },
      {
        q: "What categories are available?",
        a: "We have 8 default categories: Income, Housing, Food, Shopping, Transport, Utilities, Entertainment, and Health. Custom categories are available on paid plans.",
      },
      {
        q: "Can I export my transactions?",
        a: "Yes! Use the Export button on the Transactions page to download your data as CSV or JSON. PDF export is available on Pro and Business plans.",
      },
    ],
    insights: [
      {
        q: "How are insights generated?",
        a: "Our system analyzes your transaction patterns to identify trends, unusual spending, and opportunities to save. Insights update automatically as you add more data.",
      },
      {
        q: "What is the savings rate?",
        a: "Your savings rate is the percentage of income you've saved (Income - Expenses) / Income × 100. A healthy savings rate is typically 20% or higher.",
      },
      {
        q: "Can I set budget alerts?",
        a: "Budget alerts are available on Pro and Business plans. You'll receive notifications when you're close to or exceeding your budget limits.",
      },
    ],
    account: [
      {
        q: "How do I switch between Admin and Viewer roles?",
        a: "Use the role switcher in the navigation bar (top right). This is for demo purposes - in production, roles would be managed by your organization.",
      },
      {
        q: "How do I enable dark mode?",
        a: "Click the moon/sun icon in the navigation bar, or go to Settings and toggle Dark Mode.",
      },
      {
        q: "How do I upgrade my plan?",
        a: "Go to the Pricing page from the sidebar or navigation menu. Choose your preferred plan and follow the payment process.",
      },
      {
        q: "Can I delete my account?",
        a: "Yes, go to Settings > Data Management > Delete Account. This action is permanent and cannot be undone.",
      },
    ],
  };

  const filteredFaqs = searchTerm
    ? Object.values(faqs)
        .flat()
        .filter(
          (faq) =>
            faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.a.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : faqs[activeCategory];

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Help Center</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Find answers to common questions and learn how to use Finora
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-xl">
          <input
            type="text"
            placeholder="Search for help..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-12 w-full"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Categories */}
        {!searchTerm && (
          <div className="md:col-span-1">
            <div className="card p-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${
                    activeCategory === cat.id
                      ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="font-medium">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        <div className={searchTerm ? "md:col-span-4" : "md:col-span-3"}>
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <FAQItem key={index} question={faq.q} answer={faq.a} />
              ))
            ) : (
              <div className="card text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No results found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Try a different search term or browse categories
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="mt-12 card bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 border-primary-200 dark:border-primary-800">
        <div className="text-center">
          <div className="text-4xl mb-4">💬</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Still need help?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Our support team is here to assist you
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-primary">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Start Chat
            </button>
            <a
              href="mailto:support@finora.app"
              className="btn-secondary inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="font-medium text-gray-900 dark:text-white pr-4">{question}</h3>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">{answer}</p>
        </div>
      )}
    </div>
  );
}
