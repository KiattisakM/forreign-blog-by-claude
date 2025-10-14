import { Filter } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { StockMarket, Sector } from '@/types'

interface SidebarProps {
  selectedMarkets?: StockMarket[]
  selectedSectors?: Sector[]
  onMarketChange?: (markets: StockMarket[]) => void
  onSectorChange?: (sectors: Sector[]) => void
  onClearFilters?: () => void
}

export function Sidebar({
  selectedMarkets = [],
  selectedSectors = [],
  onMarketChange,
  onSectorChange,
  onClearFilters,
}: SidebarProps) {
  const markets = Object.values(StockMarket)
  const sectors = Object.values(Sector)

  const handleMarketToggle = (market: StockMarket) => {
    if (!onMarketChange) return
    const newMarkets = selectedMarkets.includes(market)
      ? selectedMarkets.filter((m) => m !== market)
      : [...selectedMarkets, market]
    onMarketChange(newMarkets)
  }

  const handleSectorToggle = (sector: Sector) => {
    if (!onSectorChange) return
    const newSectors = selectedSectors.includes(sector)
      ? selectedSectors.filter((s) => s !== sector)
      : [...selectedSectors, sector]
    onSectorChange(newSectors)
  }

  return (
    <aside className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <h2 className="font-semibold text-lg">Filters</h2>
        </div>
        {(selectedMarkets.length > 0 || selectedSectors.length > 0) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-auto p-0 text-xs"
          >
            Clear all
          </Button>
        )}
      </div>

      <Separator />

      {/* Markets */}
      <div className="space-y-3">
        <h3 className="font-medium text-sm text-muted-foreground">Markets</h3>
        <div className="space-y-2">
          {markets.map((market) => (
            <label
              key={market}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedMarkets.includes(market)}
                onChange={() => handleMarketToggle(market)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm">{market}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Sectors */}
      <div className="space-y-3">
        <h3 className="font-medium text-sm text-muted-foreground">Sectors</h3>
        <div className="space-y-2">
          {sectors.map((sector) => (
            <label
              key={sector}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedSectors.includes(sector)}
                onChange={() => handleSectorToggle(sector)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm">{sector}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}
