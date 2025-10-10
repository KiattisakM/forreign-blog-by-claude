import { useState } from 'react'
import { getAllArticles } from '@/data'
import ArticleCard from '@/components/ArticleCard'

export default function ArticleListPage() {
  const [currentPage] = useState(1)
  const articlesPerPage = 6

  const allArticles = getAllArticles()
  const totalArticles = allArticles.length
  const totalPages = Math.ceil(totalArticles / articlesPerPage)

  // Paginate articles
  const startIndex = (currentPage - 1) * articlesPerPage
  const endIndex = startIndex + articlesPerPage
  const displayedArticles = allArticles.slice(startIndex, endIndex)

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Stock Analysis Articles
        </h1>
        <p className="text-gray-600">
          Latest insights and analysis on foreign stock markets
        </p>
        <div className="mt-4 text-sm text-gray-500">
          Showing {startIndex + 1}-{Math.min(endIndex, totalArticles)} of {totalArticles} articles
        </div>
      </div>

      {/* Articles Grid */}
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

      {/* No Articles */}
      {allArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No articles found.</p>
        </div>
      )}
    </div>
  )
}
