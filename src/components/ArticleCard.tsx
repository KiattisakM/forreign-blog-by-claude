import { Link } from 'react-router-dom'
import { StockArticle } from '@/types'

interface ArticleCardProps {
  article: StockArticle
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const marketColors = {
    US: 'bg-blue-100 text-blue-800',
    EU: 'bg-purple-100 text-purple-800',
    ASIA: 'bg-green-100 text-green-800',
  }

  const ratingColors = {
    'Strong Buy': 'text-financial-green font-semibold',
    'Buy': 'text-financial-green',
    'Hold': 'text-yellow-600',
    'Sell': 'text-financial-red',
    'Strong Sell': 'text-financial-red font-semibold',
  }

  const priceChangeColor = (article.ticker.priceChange ?? 0) >= 0
    ? 'text-financial-green'
    : 'text-financial-red'

  return (
    <Link to={`/articles/${article.id}`}>
      <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="p-6">
          {/* Header with Market Badge and Ticker */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${marketColors[article.ticker.market]}`}>
                {article.ticker.market}
              </span>
              <span className="text-sm font-mono font-semibold text-gray-700">
                {article.ticker.symbol}
              </span>
              {article.ticker.priceChange !== undefined && (
                <span className={`text-sm font-medium ${priceChangeColor}`}>
                  {article.ticker.priceChange > 0 ? '+' : ''}
                  {article.ticker.priceChange.toFixed(2)}%
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">
              {article.readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
            {article.title}
          </h2>

          {/* Company Name */}
          <p className="text-sm text-gray-600 mb-3">
            {article.ticker.companyName}
          </p>

          {/* Summary */}
          <p className="text-gray-700 mb-4 line-clamp-2">
            {article.summary}
          </p>

          {/* Footer: Category, Rating, Price Target */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
              {article.category}
            </span>

            {article.analystRating && (
              <span className={ratingColors[article.analystRating]}>
                {article.analystRating}
              </span>
            )}

            {article.priceTarget && (
              <span className="text-gray-600">
                Target: {article.ticker.currency} {article.priceTarget.target.toFixed(0)}
                <span className="text-financial-green ml-1">
                  (+{article.priceTarget.upside.toFixed(1)}%)
                </span>
              </span>
            )}
          </div>

          {/* Author and Date */}
          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
            <span>{article.author.name}</span>
            <span>{new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
