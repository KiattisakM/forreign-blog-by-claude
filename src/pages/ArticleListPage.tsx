import { useMemo, useCallback, useTransition } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Sidebar } from '@/components/layout/Sidebar'
import { StockArticleCard } from '@/components/StockArticleCard'
import { CopyLinkButton } from '@/components/CopyLinkButton'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { mockStockArticles } from '@/data/mockStockArticles'
import { StockMarket, Sector } from '@/types'
import {
  serializeArray,
  deserializeArray,
  validateMarkets,
  validateSectors,
  validateSort,
  deserializeSearch,
} from '@/lib/urlParams'

type SortOption = 'newest' | 'oldest' | 'readTime' | 'category'

export default function ArticleListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [, startTransition] = useTransition()

  // Parse state from URL
  const selectedMarkets = useMemo(() => {
    const markets = deserializeArray(searchParams.get('markets'))
    return validateMarkets(markets)
  }, [searchParams])

  const selectedSectors = useMemo(() => {
    const sectors = deserializeArray(searchParams.get('sectors'))
    return validateSectors(sectors)
  }, [searchParams])

  const searchQuery = useMemo(() =>
    deserializeSearch(searchParams.get('q')),
    [searchParams]
  )

  const sortBy = useMemo(() =>
    validateSort(searchParams.get('sort'), 'newest') as SortOption,
    [searchParams]
  )

  // Update URL state
  const setSelectedMarkets = useCallback((markets: StockMarket[]) => {
    startTransition(() => {
      setSearchParams(prev => {
        if (markets.length > 0) {
          prev.set('markets', serializeArray(markets))
        } else {
          prev.delete('markets')
        }
        return prev
      }, { replace: true })
    })
  }, [setSearchParams])

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

  // Filter and sort articles
  const filteredAndSortedArticles = useMemo(() => {
    let filtered = mockStockArticles

    // Filter by markets
    if (selectedMarkets.length > 0) {
      filtered = filtered.filter(article =>
        selectedMarkets.includes(article.stockInfo.market)
      )
    }

    // Filter by sectors
    if (selectedSectors.length > 0) {
      filtered = filtered.filter(article =>
        selectedSectors.includes(article.stockInfo.sector)
      )
    }

    // Filter by search query
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

    // Sort articles
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
  }, [selectedMarkets, selectedSectors, searchQuery, sortBy])

  const handleClearFilters = useCallback(() => {
    setSearchParams({}, { replace: true })
  }, [setSearchParams])

  const hasActiveFilters = selectedMarkets.length > 0 || selectedSectors.length > 0 || searchQuery.trim()

  return (
    <MainLayout>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">All Articles</h1>
          <p className="text-muted-foreground">
            Explore our comprehensive collection of stock analysis and market insights
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search articles, stocks, or companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
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

          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                    {selectedMarkets.length + selectedSectors.length}
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
                  selectedMarkets={selectedMarkets}
                  selectedSectors={selectedSectors}
                  onMarketChange={setSelectedMarkets}
                  onSectorChange={setSelectedSectors}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main Content: Sidebar + Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[280px_1fr] gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <div className="sticky top-24">
              <Sidebar
                selectedMarkets={selectedMarkets}
                selectedSectors={selectedSectors}
                onMarketChange={setSelectedMarkets}
                onSectorChange={setSelectedSectors}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          {/* Articles Grid */}
          <div>
            {/* Results Count */}
            <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
              <p className="text-sm text-muted-foreground">
                {filteredAndSortedArticles.length === mockStockArticles.length ? (
                  <>Showing all {filteredAndSortedArticles.length} articles</>
                ) : (
                  <>
                    Found {filteredAndSortedArticles.length} of {mockStockArticles.length} articles
                  </>
                )}
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
                      Clear all filters
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Articles Grid */}
            {filteredAndSortedArticles.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredAndSortedArticles.map((article) => (
                  <StockArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              /* Empty State */
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
