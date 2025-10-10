export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        About Stock Insights
      </h1>
      <div className="prose prose-lg text-gray-600">
        <p>
          Welcome to Stock Insights, your trusted source for foreign stock market analysis
          and investment research. We provide comprehensive coverage of US, European, and
          Asian-Pacific markets.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Coverage</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>US Markets (NYSE, NASDAQ)</li>
          <li>European Markets (LSE, Euronext, DAX)</li>
          <li>Asian Markets (Tokyo, Hong Kong, Singapore)</li>
        </ul>
      </div>
    </div>
  )
}
