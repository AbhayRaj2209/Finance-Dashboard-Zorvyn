# Finora - Smart Finance Dashboard

A beautiful and interactive finance dashboard built with React to track income, expenses, and understand spending patterns.

![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?logo=tailwindcss)

## Features

### 🏠 Landing Page
- Beautiful animated hero section
- Feature highlights with hover effects
- Call-to-action buttons
- Responsive design

### 📊 Dashboard Overview
- **Summary Cards**: View Total Balance, Income, and Expenses at a glance
- **Balance Trend Chart**: Line chart showing monthly income, expenses, and savings trends
- **Spending Breakdown**: Interactive donut chart showing spending by category
- **Recent Transactions**: Quick view of your latest financial activity

### 💳 Transactions Management
- **Full Transaction List**: View all transactions with date, description, amount, category, and type
- **Search**: Find transactions by description or category
- **Filters**: Filter by category (Housing, Food, Shopping, etc.) and type (Income/Expense)
- **Sorting**: Sort by date or amount (ascending/descending)
- **Add/Edit/Delete**: Full CRUD operations (Admin role only)
- **Export**: Download transactions as CSV or JSON

### 💡 Financial Insights
- **Highest/Lowest Spending Categories**: Identify where your money goes
- **Savings Rate**: Track what percentage of income you're saving
- **Average Daily Spending**: Monitor your daily expenses
- **Monthly Comparison**: Compare expenses between months
- **Income vs Expenses Chart**: Bar chart visualization
- **Category Breakdown**: Progress bars showing spending distribution
- **Smart Tips**: Personalized financial advice based on your data

### 👤 Role-Based Access
- **Admin**: Full access to add, edit, and delete transactions
- **Viewer**: Read-only access to view all data
- Switch roles using the dropdown in the navbar

### 🎨 UI/UX Features
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Subtle transitions for better experience
- **Empty State Handling**: Graceful display when no data is available
- **Data Persistence**: Transactions are saved to localStorage

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Charts and visualizations
- **React Router** - Navigation
- **Context API** - State management

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd finance-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── SummaryCards.jsx    # Balance, income, expense cards
│   │   ├── BalanceChart.jsx    # Monthly trend line chart
│   │   └── SpendingChart.jsx   # Category pie/donut chart
│   ├── transactions/
│   │   ├── Filters.jsx         # Search, filter, sort controls
│   │   ├── TransactionList.jsx # Transaction table/list
│   │   └── TransactionForm.jsx # Add/edit modal
│   ├── insights/
│   │   └── InsightsPanel.jsx   # All financial insights
│   └── layout/
│       ├── Navbar.jsx          # Top navigation bar
│       └── Sidebar.jsx         # Side navigation
├── context/
│   ├── AppContext.jsx          # Global state (transactions, filters, theme)
│   └── RoleContext.jsx         # User role state
├── data/
│   └── mockData.js             # Sample transaction data
├── pages/
│   ├── Dashboard.jsx           # Dashboard page
│   ├── Transactions.jsx        # Transactions page
│   └── Insights.jsx            # Insights page
├── App.jsx                     # Main app with routing
├── main.jsx                    # Entry point
└── index.css                   # Global styles
```

## Design Decisions

### State Management
Used React Context API for state management as it's simple, built-in, and sufficient for this application's complexity. The state includes:
- Transaction data with localStorage persistence
- Filter/search/sort state
- Dark mode preference
- User role

### Styling Approach
Tailwind CSS was chosen for rapid development and consistent design. Custom utility classes were created for common patterns (buttons, inputs, cards).

### Data Visualization
Recharts was used for its React-friendly API and responsive chart components. The dashboard includes:
- Line chart for time-series data (balance trends)
- Pie/donut chart for categorical data (spending breakdown)
- Bar chart for comparisons (monthly income vs expenses)

### Responsive Design
The layout uses a sidebar that collapses on mobile devices, with a hamburger menu for navigation. Tables convert to card-based lists on smaller screens.

## Mock Data

The application comes with 6 months of sample transaction data including:
- Income sources (Salary, Freelance, Dividends, Bonuses)
- Expense categories (Housing, Food, Shopping, Transport, Utilities, Entertainment, Health)

You can reset to default data or add your own transactions.

## Future Enhancements

- [ ] Budget setting and tracking
- [ ] Recurring transactions
- [ ] Multiple accounts support
- [ ] Data import from CSV
- [ ] PDF report generation
- [ ] Charts for specific date ranges
- [ ] Currency conversion

## License

MIT
