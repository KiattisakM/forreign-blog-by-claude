import { useMemo, useCallback, useTransition, useState, useEffect } from 'react'
import { useParams, useSearchParams, Navigate } from 'react-router-dom'
import { Search, SlidersHorizontal, TrendingUp, Loader2, AlertCircle } from 'lucide-react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Sidebar } from '@/components/layout/Sidebar'
import { StockArticleCard } from '@/components/StockArticleCard'
import { CopyLinkButton } from '@/components/CopyLinkButton'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { api } from '@/services/api'
import type { StockArticle, Sector } from '@/types'
import { StockMarket } from '@/types'
import {
  serializeArray,
  deserializeArray,
  validateSectors,
  validateSort,
  deserializeSearch,
} from '@/lib/urlParams'

type SortOption = 'newest' | 'oldest' | 'readTime' | 'category'

export default function MarketPage() {
  const { market } = useParams<{ market: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // API state
  const [allArticles, setAllArticles] = useState<StockArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Validate market parameter first
  const validMarket = useMemo(() => {
    return Object.values(StockMarket).includes(market as StockMarket)
      ? (market as StockMarket)
      : null
  }, [market])

  // Parse state from URL (moved before useEffect)
  const selectedSectors = useMemo(() => {
    const sectors = deserializeArray(searchParams.get('sectors'))
    return validateSectors(sectors)
  }, [searchParams])

  // Fetch articles from API with market and sector filters
  useEffect(() => {
    // Don't fetch if invalid market
    if (!validMarket) return

    const fetchArticles = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await api.articles.getAll({
          limit: 100,
          market: validMarket,  // Filter by market from URL param
          sectors: selectedSectors.length > 0 ? selectedSectors : undefined  // Filter by sectors from query param
        })
        setAllArticles(data)
      } catch (err) {
        console.error('Failed to fetch articles:', err)
        setError('Failed to load articles. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [validMarket, selectedSectors])

  const searchQuery = useMemo(() =>
    deserializeSearch(searchParams.get('q')),
    [searchParams]
  )

  const sortBy = useMemo(() =>
    validateSort(searchParams.get('sort'), 'newest') as SortOption,
    [searchParams]
  )

  // Update URL state
  const setSelectedSectors = useCallback((sectors: Sector[]) => {
    startTransition(() => {
      setSearchParams(prev => {
        if (sectors.length > 0) {
          prev.set('sectors', serializeArray(sectors))
        } else {
          prev.delete('sectors')
        }
        return prev
      }, { replace: true })
    })
  }, [setSearchParams])

  const setSearchQuery = useCallback((query: string) => {
    startTransition(() => {
      setSearchParams(prev => {
        if (query.trim()) {
          prev.set('q', query.trim())
        } else {
          prev.delete('q')
        }
        return prev
      }, { replace: true })
    })
  }, [setSearchParams])

  const setSortBy = useCallback((sort: SortOption) => {
    setSearchParams(prev => {
      if (sort !== 'newest') {
        prev.set('sort', sort)
      } else {
        prev.delete('sort')
      }
      return prev
    }, { replace: true })
  }, [setSearchParams])

  // Redirect if invalid market
  if (!validMarket) {
    return <Navigate to="/articles" replace />
  }

  // Filter and sort articles (API already filtered by market and sectors)
  const filteredAndSortedArticles = useMemo(() => {
    let filtered = allArticles

    // Filter by search query (client-side only)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.stockInfo.symbol.toLowerCase().includes(query) ||
        article.stockInfo.companyName.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Sort articles (client-side)
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.publishedAt.getTime() - a.publishedAt.getTime()
        case 'oldest':
          return a.publishedAt.getTime() - b.publishedAt.getTime()
        case 'readTime':
          return a.readTime - b.readTime
        case 'category':
          return a.category.localeCompare(b.category)
        default:
          return 0
      }
    })

    return sorted
  }, [allArticles, searchQuery, sortBy])

  const handleClearFilters = useCallback(() => {
    setSearchParams({}, { replace: true })
  }, [setSearchParams])

  const hasActiveFilters = selectedSectors.length > 0 || searchQuery.trim()

  // Get market emoji
  const getMarketEmoji = (market: StockMarket) => {
    const emojis = {
      [StockMarket.US]: '🇺🇸',
      [StockMarket.EU]: '🇪🇺',
      [StockMarket.ASIA]: '🌏',
      [StockMarket.UK]: '🇬🇧',
      [StockMarket.CANADA]: '🇨🇦',
      [StockMarket.AUSTRALIA]: '🇦🇺',
    }
    return emojis[market] || '🌍'
  }

  // Loading state
  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col justify-center items-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <span className="text-lg text-muted-foreground">Loading articles...</span>
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
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Error loading articles</h3>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">
              {getMarketEmoji(validMarket)} {validMarket} Market
            </h1>
          </div>
          <p className="text-muted-foreground">
            Articles and analysis covering stocks from the {validMarket} market
          </p>
        </div>

        {/* Loading Indicator */}
        {isPending && (
          <div className="fixed top-20 right-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium">Updating filters...</span>
            </div>
          </div>
        )}

        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search articles, stocks, or companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              disabled={isPending}
            />
          </div>

          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)} disabled={isPending}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="readTime">Reading Time</SelectItem>
              <SelectItem value="category">Category</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                    {selectedSectors.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <Sidebar
                  selectedMarkets={[validMarket]}
                  selectedSectors={selectedSectors}
                  onSectorChange={setSelectedSectors}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[280px_1fr] gap-8">
          <div className="hidden md:block">
            <div className="sticky top-24">
              <Sidebar
                selectedMarkets={[validMarket]}
                selectedSectors={selectedSectors}
                onSectorChange={setSelectedSectors}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
              <p className="text-sm text-muted-foreground">
                Found {filteredAndSortedArticles.length} articles
              </p>
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <>
                    <CopyLinkButton />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearFilters}
                      className="text-xs"
                    >
                      Clear filters
                    </Button>
                  </>
                )}
              </div>
            </div>

            {filteredAndSortedArticles.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredAndSortedArticles.map((article) => (
                  <StockArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                <Button onClick={handleClearFilters} variant="outline">
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
