import { useState, useMemo } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Search, SlidersHorizontal, TrendingUp } from 'lucide-react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Sidebar } from '@/components/layout/Sidebar'
import { StockArticleCard } from '@/components/StockArticleCard'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { mockStockArticles } from '@/data/mockStockArticles'
import { StockMarket, Sector } from '@/types'

type SortOption = 'newest' | 'oldest' | 'readTime' | 'category'

export default function MarketPage() {
  const { market } = useParams<{ market: string }>()

  // Validate market parameter
  const validMarket = Object.values(StockMarket).includes(market as StockMarket)
    ? (market as StockMarket)
    : null

  const [selectedSectors, setSelectedSectors] = useState<Sector[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('newest')

  // Redirect if invalid market
  if (!validMarket) {
    return <Navigate to="/articles" replace />
  }

  // Filter and sort articles
  const filteredAndSortedArticles = useMemo(() => {
    // Start with articles from the selected market
    let filtered = mockStockArticles.filter(
      article => article.stockInfo.market === validMarket
    )

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
  }, [validMarket, selectedSectors, searchQuery, sortBy])

  const handleClearFilters = () => {
    setSelectedSectors([])
    setSearchQuery('')
  }

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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
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
            />
          </div>

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
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Found {filteredAndSortedArticles.length} articles
              </p>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-xs"
                >
                  Clear filters
                </Button>
              )}
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
