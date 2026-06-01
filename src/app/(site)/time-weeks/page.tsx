import Link from "next/link";

export default function TimeWeeksPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Weeks Calculator</h1>
        <p className="text-gray-500 mb-8">Calculate the number of weeks between two dates.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input type="date" className="w-full px-4 py-2.5 rounded-lg border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input type="date" className="w-full px-4 py-2.5 rounded-lg border border-gray-300" />
          </div>
          <button className="w-full py-2.5 rounded-lg bg-[#0D9488] text-white font-semibold hover:bg-[#0F766E] transition-colors">
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
}
