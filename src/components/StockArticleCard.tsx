import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Clock, User } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StockArticle, ArticleCategory } from '@/types'
import { MarketBadge } from './MarketBadge'
import { SectorBadge } from './SectorBadge'
import { cn } from '@/lib/utils'

dayjs.extend(relativeTime)

interface StockArticleCardProps {
  article: StockArticle
  className?: string
}

const categoryColors: Record<ArticleCategory, string> = {
  [ArticleCategory.ANALYSIS]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  [ArticleCategory.NEWS]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  [ArticleCategory.EDUCATION]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  [ArticleCategory.OPINION]: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  [ArticleCategory.EARNINGS]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  [ArticleCategory.MARKET_UPDATE]: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
}

export function StockArticleCard({ article, className }: StockArticleCardProps) {
  return (
    <Link to={`/articles/${article.slug}`}>
      <Card
        className={cn(
          'group hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col',
          className
        )}
      >
        {/* Image */}
        {article.imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.imageAlt || article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {article.featured && (
              <Badge className="absolute top-3 left-3 bg-primary">
                Featured
              </Badge>
            )}
          </div>
        )}

        <CardHeader className="space-y-3">
          {/* Stock Info */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono font-bold text-sm text-primary">
              {article.stockInfo.symbol}
            </span>
            <span className="text-sm text-muted-foreground">•</span>
            <MarketBadge market={article.stockInfo.market} />
            <SectorBadge sector={article.stockInfo.sector} />
          </div>

          {/* Title */}
          <h3 className="font-bold text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>

          {/* Category */}
          <Badge
            variant="secondary"
            className={cn('w-fit', categoryColors[article.category])}
          >
            {article.category}
          </Badge>
        </CardHeader>

        <CardContent className="flex-1">
          <p className="text-muted-foreground line-clamp-3">{article.excerpt}</p>
        </CardContent>

        <CardFooter className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{article.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} min read</span>
            </div>
          </div>
          <time dateTime={article.publishedAt.toISOString()}>
            {dayjs(article.publishedAt).fromNow()}
          </time>
        </CardFooter>
      </Card>
    </Link>
  )
}
