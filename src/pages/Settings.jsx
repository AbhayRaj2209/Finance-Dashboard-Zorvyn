import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useRole } from "../context/RoleContext";

export default function Settings() {
  const { darkMode, setDarkMode, resetToDefault } = useApp();
  const { role } = useRole();
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: "Abhay Raj",
    email: "abhayraj3051@gmail.com",
    phone: "+91 9076906408",
    currency: "INR",
    language: "English",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekly: true,
    monthly: false,
  });

  const handleSave = () => {

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your account preferences</p>
      </div>

      {/* Success message */}
      {saved && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3 animate-slide-in">
          <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-green-700 dark:text-green-300 font-medium">Settings saved successfully!</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-xl">👤</span> Profile
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Currency
              </label>
              <select
                value={profile.currency}
                onChange={(e) => setProfile({ ...profile, currency: e.target.value })}
                className="select w-full"
              >
                <option value="INR">₹ INR - Indian Rupee</option>
                <option value="USD">$ USD - US Dollar</option>
                <option value="EUR">€ EUR - Euro</option>
                <option value="GBP">£ GBP - British Pound</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-xl">🎨</span> Appearance
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark theme</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  darkMode ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform shadow ${
                    darkMode ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Language</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Choose your preferred language</p>
              </div>
              <select
                value={profile.language}
                onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                className="select"
              >
                <option value="English">English</option>
                <option value="Hindi">हिंदी</option>
                <option value="Tamil">தமிழ்</option>
                <option value="Telugu">తెలుగు</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-xl">🔔</span> Notifications
          </h2>
          <div className="space-y-4">
            {[
              { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
              { key: "push", label: "Push Notifications", desc: "Browser push notifications" },
              { key: "weekly", label: "Weekly Summary", desc: "Weekly spending report" },
              { key: "monthly", label: "Monthly Report", desc: "Detailed monthly analysis" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
                <button
                  onClick={() =>
                    setNotifications({ ...notifications, [item.key]: !notifications[item.key] })
                  }
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    notifications[item.key] ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform shadow ${
                      notifications[item.key] ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Data Management */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-xl">💾</span> Data Management
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Export Data</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Download all your transactions</p>
              </div>
              <button className="btn-secondary text-sm">Export CSV</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Reset to Default</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Restore sample data</p>
              </div>
              <button
                onClick={resetToDefault}
                className="btn-secondary text-sm"
              >
                Reset Data
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
              <div>
                <p className="font-medium text-red-700 dark:text-red-400">Delete Account</p>
                <p className="text-sm text-red-600 dark:text-red-400/70">Permanently delete your account and data</p>
              </div>
              <button className="btn-danger text-sm">Delete</button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <button className="btn-secondary">Cancel</button>
          <button onClick={handleSave} className="btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
