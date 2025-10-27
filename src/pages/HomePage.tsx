import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { TrendingUp, Globe2, BookOpen, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MainLayout } from '@/components/layout/MainLayout'
import { StockArticleCard } from '@/components/StockArticleCard'
import { GridPattern } from '@/components/magicui/grid-pattern'
import { NumberTicker } from '@/components/magicui/number-ticker'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { BorderBeam } from '@/components/magicui/border-beam'
import { SEO } from '@/components/SEO'
import { api } from '@/services/api'
import type { StockArticle } from '@/types'

export default function HomePage() {
  const [articles, setArticles] = useState<StockArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await api.articles.getAll({ limit: 20 })
        setArticles(data)
      } catch (err) {
        console.error('Failed to fetch articles:', err)
        setError('Failed to load articles. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [])

  // Get featured articles (first 4)
  const featuredArticles = articles.slice(0, 4)

  // Count articles by market
  const marketCounts = {
    US: articles.filter(a => a.stockInfo.market === 'US').length,
    EU: articles.filter(a => a.stockInfo.market === 'EU').length,
    ASIA: articles.filter(a => a.stockInfo.market === 'ASIA').length,
  }

  return (
    <MainLayout>
      <SEO
        title="Home"
        description="Your gateway to international stock markets. Expert analysis, insights, and education on US, European, and Asian stocks."
      />
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-gradient-to-b from-primary/5 to-background overflow-hidden">
        <GridPattern className="absolute inset-0 opacity-50" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <Globe2 className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Foreign Stock Blog
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Your gateway to international markets. Expert analysis, insights, and education on US, European, and Asian stocks.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/articles">
              <ShimmerButton
                className="shadow-2xl"
                background="linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 100%)"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                <span>Browse All Articles</span>
              </ShimmerButton>
            </Link>
            <Button asChild size="lg" variant="outline">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Market Overview Section */}
      <section className="py-12 border-t">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Explore Markets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* US Markets */}
            <Link to="/markets/US">
              <Card className="relative hover:shadow-lg dark:hover:shadow-primary/20 transition-shadow cursor-pointer h-full overflow-hidden">
                <BorderBeam size={250} duration={12} delay={0} />
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl">🇺🇸 US Markets</CardTitle>
                    <Badge variant="default">NYSE • NASDAQ</Badge>
                  </div>
                  <CardDescription>
                    Explore American stocks from technology giants to established blue chips
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Articles</span>
                    <span className="text-2xl font-bold text-primary">
                      <NumberTicker value={marketCounts.US} />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* EU Markets */}
            <Link to="/markets/EU">
              <Card className="relative hover:shadow-lg dark:hover:shadow-purple-500/20 transition-shadow cursor-pointer h-full overflow-hidden">
                <BorderBeam size={250} duration={12} delay={4} colorFrom="#a855f7" colorTo="#3b82f6" />
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl">🇪🇺 European Markets</CardTitle>
                    <Badge variant="secondary">LSE • Euronext</Badge>
                  </div>
                  <CardDescription>
                    Discover European leaders in luxury, pharma, energy, and technology
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Articles</span>
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      <NumberTicker value={marketCounts.EU} delay={0.2} />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Asian Markets */}
            <Link to="/markets/ASIA">
              <Card className="relative hover:shadow-lg dark:hover:shadow-orange-500/20 transition-shadow cursor-pointer h-full overflow-hidden">
                <BorderBeam size={250} duration={12} delay={8} colorFrom="#f97316" colorTo="#eab308" />
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl">🌏 Asian Markets</CardTitle>
                    <Badge variant="outline">TSE • HKEX</Badge>
                  </div>
                  <CardDescription>
                    Analyze Asian powerhouses from semiconductors to e-commerce
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Articles</span>
                    <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      <NumberTicker value={marketCounts.ASIA} delay={0.4} />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Featured Articles</h2>
            </div>
            <Button asChild variant="ghost">
              <Link to="/articles">View All</Link>
            </Button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <span className="ml-3 text-lg text-muted-foreground">Loading articles...</span>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <Card className="border-destructive">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-destructive">
                  <AlertCircle className="h-6 w-6" />
                  <div>
                    <p className="font-semibold">Error loading articles</p>
                    <p className="text-sm text-muted-foreground">{error}</p>
                  </div>
                </div>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="mt-4"
                >
                  Retry
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Articles Grid */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {featuredArticles.length === 0 ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No articles available yet.
                </div>
              ) : (
                featuredArticles.map((article) => (
                  <StockArticleCard key={article.id} article={article} />
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Informed About Global Markets</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of investors who rely on our analysis to make better investment decisions across international markets.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/articles">Start Reading</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  )
}
