import Link from "next/link";

export default function TimePage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Days Calculator</h1>
        <p className="text-gray-500 mb-8">Calculate the number of days between two dates.</p>

        <div className="max-w-md mx-auto space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none"
            />
          </div>
          <button className="w-full py-2.5 rounded-lg bg-[#FF6B00] text-white font-semibold hover:bg-[#E55D00] transition-colors">
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
}
