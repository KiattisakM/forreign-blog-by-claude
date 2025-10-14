import { Link } from 'react-router-dom'
import { TrendingUp, Globe2, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MainLayout } from '@/components/layout/MainLayout'
import { StockArticleCard } from '@/components/StockArticleCard'
import { mockStockArticles } from '@/data/mockStockArticles'
import { StockMarket } from '@/types'

export default function HomePage() {
  // Get featured articles
  const featuredArticles = mockStockArticles.filter(article => article.featured).slice(0, 4)

  // Count articles by market
  const marketCounts = {
    US: mockStockArticles.filter(a => a.stockInfo.market === StockMarket.US).length,
    EU: mockStockArticles.filter(a => a.stockInfo.market === StockMarket.EU).length,
    ASIA: mockStockArticles.filter(a => a.stockInfo.market === StockMarket.ASIA).length,
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
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
            <Button asChild size="lg">
              <Link to="/articles">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse All Articles
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Market Overview Section */}
      <section className="py-12 border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Explore Markets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* US Markets */}
            <Link to="/markets/US">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
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
                    <span className="text-2xl font-bold text-primary">{marketCounts.US}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* EU Markets */}
            <Link to="/markets/EU">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
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
                    <span className="text-2xl font-bold text-purple-600">{marketCounts.EU}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Asian Markets */}
            <Link to="/markets/ASIA">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
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
                    <span className="text-2xl font-bold text-orange-600">{marketCounts.ASIA}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Featured Articles</h2>
            </div>
            <Button asChild variant="ghost">
              <Link to="/articles">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <StockArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
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
