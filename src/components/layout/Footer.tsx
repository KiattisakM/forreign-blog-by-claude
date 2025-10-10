import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Stock Insights
            </h3>
            <p className="text-gray-600 text-sm">
              Professional analysis and insights on foreign stock markets.
              Covering US, European, and Asian-Pacific markets.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/articles" className="text-sm text-gray-600 hover:text-primary-600">
                  Articles
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-primary-600">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Markets</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>US Markets</li>
              <li>European Markets</li>
              <li>Asian Markets</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Stock Insights. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
