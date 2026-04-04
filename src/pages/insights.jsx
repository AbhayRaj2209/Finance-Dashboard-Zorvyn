import InsightsPanel from "../components/insights/InsightsPanel";

export default function Insights() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Insights
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Understand your spending patterns and financial health
        </p>
      </div>

      <InsightsPanel />
    </div>
  );
}