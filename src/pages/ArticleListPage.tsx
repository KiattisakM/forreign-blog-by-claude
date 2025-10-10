import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAllArticles } from '@/data'
import ArticleCard from '@/components/ArticleCard'
import { Market, ArticleCategory } from '@/types'

export default function ArticleListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage] = useState(1)
  const articlesPerPage = 6

  // Get filter params from URL
  const marketFilter = searchParams.get('market')?.split(',').filter(Boolean) || []
  const categoryFilter = searchParams.get('category')?.split(',').filter(Boolean) || []
  const searchQuery = searchParams.get('q') || ''

  // Filter articles
  const filteredArticles = useMemo(() => {
    let articles = getAllArticles()

    // Filter by market
    if (marketFilter.length > 0) {
      articles = articles.filter(article =>
        marketFilter.includes(article.ticker.market)
      )
    }

    // Filter by category
    if (categoryFilter.length > 0) {
      articles = articles.filter(article =>
        categoryFilter.includes(article.category)
      )
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      articles = articles.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.ticker.symbol.toLowerCase().includes(query) ||
        article.ticker.companyName.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    return articles
  }, [marketFilter, categoryFilter, searchQuery])

  const totalArticles = filteredArticles.length
  const totalPages = Math.ceil(totalArticles / articlesPerPage)

  // Paginate articles
  const startIndex = (currentPage - 1) * articlesPerPage
  const endIndex = startIndex + articlesPerPage
  const displayedArticles = filteredArticles.slice(startIndex, endIndex)

  // Handle filter changes
  const handleMarketToggle = (market: Market) => {
    const markets = marketFilter.includes(market)
      ? marketFilter.filter(m => m !== market)
      : [...marketFilter, market]

    if (markets.length > 0) {
      searchParams.set('market', markets.join(','))
    } else {
      searchParams.delete('market')
    }
    setSearchParams(searchParams)
  }

  const handleCategoryClick = (category: ArticleCategory) => {
    const categories = categoryFilter.includes(category)
      ? categoryFilter.filter(c => c !== category)
      : [...categoryFilter, category]

    if (categories.length > 0) {
      searchParams.set('category', categories.join(','))
    } else {
      searchParams.delete('category')
    }
    setSearchParams(searchParams)
  }

  const handleSearch = (query: string) => {
    if (query.trim()) {
      searchParams.set('q', query)
    } else {
      searchParams.delete('q')
    }
    setSearchParams(searchParams)
  }

  const clearFilters = () => {
    setSearchParams({})
  }

  return (
    <div>
      {/* Header with Search */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Stock Analysis Articles
        </h1>
        <p className="text-gray-600 mb-4">
          Latest insights and analysis on foreign stock markets
        </p>

        {/* Search Bar */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by ticker, company, or keywords..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {(marketFilter.length > 0 || categoryFilter.length > 0 || searchQuery) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Active Filters */}
        {(marketFilter.length > 0 || categoryFilter.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {marketFilter.map(market => (
              <span
                key={market}
                className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm flex items-center gap-1"
              >
                {market}
                <button onClick={() => handleMarketToggle(market as Market)} className="hover:text-primary-900">
                  ×
                </button>
              </span>
            ))}
            {categoryFilter.map(category => (
              <span
                key={category}
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center gap-1"
              >
                {category}
                <button onClick={() => handleCategoryClick(category as ArticleCategory)} className="hover:text-purple-900">
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="text-sm text-gray-500">
          {totalArticles > 0 ? (
            <>Showing {startIndex + 1}-{Math.min(endIndex, totalArticles)} of {totalArticles} articles</>
          ) : (
            <>No articles found. Try adjusting your filters.</>
          )}
        </div>
      </div>

      {/* Filters passed to sidebar via context would go here */}
      {/* For now, sidebar filters are hardcoded in Sidebar component */}

      {/* Articles Grid */}
      {displayedArticles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {displayedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {/* Pagination Info */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-8">
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No articles found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filters
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
