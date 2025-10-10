import { useParams, Link } from 'react-router-dom'
import { getArticleById } from '@/data'

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>()
  const article = id ? getArticleById(id) : null

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Link
            to="/articles"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Back to Articles
          </Link>
        </div>
      </div>
    )
  }

  const marketColors = {
    US: 'bg-blue-100 text-blue-800',
    EU: 'bg-purple-100 text-purple-800',
    ASIA: 'bg-green-100 text-green-800',
  }

  const ratingColors = {
    'Strong Buy': 'bg-green-100 text-green-800 border-green-300',
    'Buy': 'bg-green-50 text-green-700 border-green-200',
    'Hold': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'Sell': 'bg-red-50 text-red-700 border-red-200',
    'Strong Sell': 'bg-red-100 text-red-800 border-red-300',
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link to="/articles" className="text-primary-600 hover:text-primary-700">
          ← Back to Articles
        </Link>
      </nav>

      {/* Stock Info Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-wrap items-start justify-between mb-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold font-mono text-gray-900">
                {article.ticker.symbol}
              </h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${marketColors[article.ticker.market]}`}>
                {article.ticker.market} - {article.ticker.exchange}
              </span>
            </div>
            <p className="text-lg text-gray-700 mb-1">
              {article.ticker.companyName}
            </p>
            <p className="text-sm text-gray-500">
              {article.ticker.sector} • {article.category}
            </p>
          </div>

          {article.ticker.currentPrice && (
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">
                {article.ticker.currency} {article.ticker.currentPrice.toFixed(2)}
              </div>
              {article.ticker.priceChange !== undefined && (
                <div className={`text-lg font-semibold ${
                  article.ticker.priceChange >= 0 ? 'text-financial-green' : 'text-financial-red'
                }`}>
                  {article.ticker.priceChange > 0 ? '+' : ''}
                  {article.ticker.priceChange.toFixed(2)}%
                </div>
              )}
            </div>
          )}
        </div>

        {/* Price Target & Rating */}
        {(article.priceTarget || article.analystRating) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            {article.priceTarget && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Price Target</h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-primary-600">
                    {article.ticker.currency} {article.priceTarget.target.toFixed(0)}
                  </span>
                  <span className="text-financial-green font-semibold">
                    +{article.priceTarget.upside.toFixed(1)}% upside
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {article.priceTarget.timeframe}
                </p>
              </div>
            )}

            {article.analystRating && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Analyst Rating</h3>
                <span className={`inline-block px-4 py-2 rounded-lg border-2 font-semibold ${
                  ratingColors[article.analystRating]
                }`}>
                  {article.analystRating}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Article Content */}
      <article className="bg-white rounded-lg shadow-lg p-8">
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{article.author.name}</span>
              <span>•</span>
              <span>{article.author.title}</span>
            </div>
            <span>•</span>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>•</span>
            <span>{article.readingTime} min read</span>
          </div>

          <p className="text-xl text-gray-700 leading-relaxed">
            {article.summary}
          </p>
        </header>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none">
          <div
            className="article-content"
            dangerouslySetInnerHTML={{
              __html: article.content
                .split('\n')
                .map(line => {
                  if (line.startsWith('# ')) return `<h1 class="text-3xl font-bold mt-8 mb-4">${line.substring(2)}</h1>`
                  if (line.startsWith('## ')) return `<h2 class="text-2xl font-bold mt-6 mb-3">${line.substring(3)}</h2>`
                  if (line.startsWith('### ')) return `<h3 class="text-xl font-semibold mt-4 mb-2">${line.substring(4)}</h3>`
                  if (line.startsWith('- ')) return `<li class="ml-6">${line.substring(2)}</li>`
                  if (line.trim() === '') return '<br />'
                  if (line.match(/^\d+\./)) return `<li class="ml-6">${line.substring(line.indexOf('.') + 1)}</li>`
                  return `<p class="mb-4 text-gray-700 leading-relaxed">${line}</p>`
                })
                .join('')
            }}
          />
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Author Bio */}
      {article.author.bio && (
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            About the Author
          </h3>
          <div className="flex items-start space-x-4">
            <div>
              <p className="font-semibold text-gray-900">{article.author.name}</p>
              <p className="text-sm text-gray-600 mb-2">{article.author.title}</p>
              <p className="text-gray-700">{article.author.bio}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
