import Link from "next/link";

export default function ConvertPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Centimeters to Inches</h1>
        <p className="text-gray-500 mb-8">Quick unit conversion tool.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Centimeters</label>
            <input
              type="number"
              placeholder="0"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300"
            />
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Result in inches</p>
            <p className="text-2xl font-bold text-gray-900">0&quot;</p>
          </div>
        </div>
      </div>
    </div>
  );
}
