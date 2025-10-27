import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, User, Loader2, AlertCircle } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { MainLayout } from '@/components/layout/MainLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { MarketBadge } from '@/components/MarketBadge'
import { SectorBadge } from '@/components/SectorBadge'
import { StockArticleCard } from '@/components/StockArticleCard'
import { api } from '@/services/api'
import type { StockArticle } from '@/types'

dayjs.extend(relativeTime)

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  // API state
  const [article, setArticle] = useState<StockArticle | null>(null)
  const [allArticles, setAllArticles] = useState<StockArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  // Fetch article and all articles for related
  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return

      try {
        setIsLoading(true)
        setError(null)

        // Fetch article by slug and all articles in parallel
        const [articleData, allArticlesData] = await Promise.all([
          api.articles.getBySlug(slug),
          api.articles.getAll({ limit: 100 }),
        ])

        setArticle(articleData)
        setAllArticles(allArticlesData)
      } catch (err) {
        console.error('Failed to fetch article:', err)
        if (err instanceof Error && err.message === 'Article not found') {
          setNotFound(true)
        } else {
          setError('Failed to load article. Please try again later.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [slug])

  // If article not found, redirect to articles page
  if (notFound) {
    return <Navigate to="/articles" replace />
  }

  // Get related articles (same market or sector, excluding current)
  const relatedArticles = article
    ? allArticles
        .filter(a =>
          a.id !== article.id &&
          (a.stockInfo.market === article.stockInfo.market ||
            a.stockInfo.sector === article.stockInfo.sector)
        )
        .slice(0, 3)
    : []

  // Get category badge color
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      ANALYSIS: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      NEWS: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      EDUCATION: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      OPINION: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      EARNINGS: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  // Get sentiment badge
  const getSentimentBadge = () => {
    if (!article.sentiment) return null
    const colors = {
      BULLISH: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      BEARISH: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      NEUTRAL: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    }
    return (
      <Badge className={colors[article.sentiment]}>
        {article.sentiment}
      </Badge>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Button asChild variant="ghost" className="mb-6">
            <Link to="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>
          <div className="flex flex-col justify-center items-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <span className="text-lg text-muted-foreground">Loading article...</span>
          </div>
        </div>
      </MainLayout>
    )
  }

  // Error state
  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Button asChild variant="ghost" className="mb-6">
            <Link to="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Error loading article</h3>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </div>
        </div>
      </MainLayout>
    )
  }

  // If article is null but not loading/error, shouldn't happen
  if (!article) {
    return <Navigate to="/articles" replace />
  }

  return (
    <MainLayout>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/articles">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          {/* Main Content */}
          <article className="space-y-6">
            {/* Article Header */}
            <div className="space-y-4">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge className={getCategoryColor(article.category)}>
                  {article.category}
                </Badge>
                <Badge variant="outline">{article.readingLevel}</Badge>
                <MarketBadge market={article.stockInfo.market} />
                <SectorBadge sector={article.stockInfo.sector} />
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {article.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{article.author.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{dayjs(article.publishedAt).format('MMMM D, YYYY')}</span>
                  <span className="text-xs">({dayjs(article.publishedAt).fromNow()})</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime} min read</span>
                </div>
              </div>

              {/* Excerpt */}
              <p className="text-xl text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            <Separator />

            {/* Article Image */}
            {article.imageUrl && (
              <div className="rounded-lg overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.imageAlt || article.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="whitespace-pre-line">
                {article.content}
              </div>
            </div>

            <Separator />

            {/* Tags */}
            <div>
              <h3 className="text-sm font-medium mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <CardTitle className="text-lg">About {article.author.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{article.author.bio}</p>
              </CardContent>
            </Card>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Stock Info Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {article.stockInfo.symbol}
                </CardTitle>
                <p className="text-muted-foreground">{article.stockInfo.companyName}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Market</p>
                    <MarketBadge market={article.stockInfo.market} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Exchange</p>
                    <Badge variant="outline">{article.stockInfo.exchange}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Sector</p>
                    <SectorBadge sector={article.stockInfo.sector} />
                  </div>
                  {article.stockInfo.currency && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Currency</p>
                      <Badge variant="secondary">{article.stockInfo.currency}</Badge>
                    </div>
                  )}
                  {article.stockInfo.marketCap && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Market Cap</p>
                      <p className="font-semibold">{article.stockInfo.marketCap}</p>
                    </div>
                  )}
                  {article.sentiment && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Sentiment</p>
                      {getSentimentBadge()}
                    </div>
                  )}
                  {article.priceTarget && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground mb-1">Price Target</p>
                      <p className="font-semibold text-lg">
                        {article.stockInfo.currency} {article.priceTarget.target}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {article.priceTarget.timeframe}
                      </p>
                    </div>
                  )}
                </div>

                <Separator />

                <div>
                  <p className="text-xs text-muted-foreground mb-2">About</p>
                  <p className="text-sm">{article.stockInfo.description}</p>
                </div>

                {article.stockInfo.foundedYear && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Founded</p>
                    <p className="text-sm">{article.stockInfo.foundedYear}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <StockArticleCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  )
}
