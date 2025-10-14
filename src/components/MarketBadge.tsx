import { Badge } from '@/components/ui/badge'
import { StockMarket } from '@/types'
import { cn } from '@/lib/utils'

interface MarketBadgeProps {
  market: StockMarket
  className?: string
}

const marketColors: Record<StockMarket, string> = {
  [StockMarket.US]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  [StockMarket.EU]: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  [StockMarket.ASIA]: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  [StockMarket.UK]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  [StockMarket.CANADA]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  [StockMarket.AUSTRALIA]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
}

const marketFlags: Record<StockMarket, string> = {
  [StockMarket.US]: '🇺🇸',
  [StockMarket.EU]: '🇪🇺',
  [StockMarket.ASIA]: '🌏',
  [StockMarket.UK]: '🇬🇧',
  [StockMarket.CANADA]: '🇨🇦',
  [StockMarket.AUSTRALIA]: '🇦🇺',
}

export function MarketBadge({ market, className }: MarketBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(marketColors[market], 'font-medium', className)}
    >
      <span className="mr-1">{marketFlags[market]}</span>
      {market}
    </Badge>
  )
}
