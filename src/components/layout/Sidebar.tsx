export default function Sidebar() {
  return (
    <aside className="w-full lg:w-80 space-y-6">
      {/* Market Overview Widget Placeholder */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Market Overview
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">S&P 500</span>
            <span className="text-sm font-medium text-financial-green">+0.45%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">NASDAQ</span>
            <span className="text-sm font-medium text-financial-green">+0.82%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">FTSE 100</span>
            <span className="text-sm font-medium text-financial-red">-0.23%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Nikkei 225</span>
            <span className="text-sm font-medium text-financial-green">+0.15%</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          * Placeholder data - Real-time updates coming soon
        </p>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Categories
        </h3>
        <ul className="space-y-2">
          <li>
            <button className="text-sm text-gray-600 hover:text-primary-600">
              Technical Analysis
            </button>
          </li>
          <li>
            <button className="text-sm text-gray-600 hover:text-primary-600">
              Fundamental Analysis
            </button>
          </li>
          <li>
            <button className="text-sm text-gray-600 hover:text-primary-600">
              Market News
            </button>
          </li>
          <li>
            <button className="text-sm text-gray-600 hover:text-primary-600">
              Investment Strategy
            </button>
          </li>
        </ul>
      </div>

      {/* Markets Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Filter by Market
        </h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-primary-600" defaultChecked />
            <span className="ml-2 text-sm text-gray-600">US Markets</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-primary-600" defaultChecked />
            <span className="ml-2 text-sm text-gray-600">European Markets</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-primary-600" defaultChecked />
            <span className="ml-2 text-sm text-gray-600">Asian Markets</span>
          </label>
        </div>
      </div>
    </aside>
  )
}
