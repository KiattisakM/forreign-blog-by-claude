import { Filter } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FilterCheckbox } from '@/components/FilterCheckbox'
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
  const totalSelected = selectedMarkets.length + selectedSectors.length

  return (
    <aside className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-lg">Filters</h2>
          {totalSelected > 0 && (
            <Badge variant="secondary" className="h-5 px-2 text-xs">
              {totalSelected}
            </Badge>
          )}
        </div>
        {totalSelected > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-auto py-1 px-2 text-xs hover:text-destructive"
          >
            Clear all
          </Button>
        )}
      </div>

      <Separator />

      {/* Markets */}
      <div className="space-y-3">
        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
          Markets
        </h3>
        <div className="space-y-1">
          {markets.map((market) => (
            <FilterCheckbox
              key={market}
              id={`market-${market}`}
              label={market}
              checked={selectedMarkets.includes(market)}
              onCheckedChange={(checked) => {
                if (!onMarketChange) return
                const newMarkets = checked
                  ? [...selectedMarkets, market]
                  : selectedMarkets.filter((m) => m !== market)
                onMarketChange(newMarkets)
              }}
            />
          ))}
        </div>
      </div>

      <Separator />

      {/* Sectors */}
      <div className="space-y-3">
        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
          Sectors
        </h3>
        <div className="space-y-1">
          {sectors.map((sector) => (
            <FilterCheckbox
              key={sector}
              id={`sector-${sector}`}
              label={sector}
              checked={selectedSectors.includes(sector)}
              onCheckedChange={(checked) => {
                if (!onSectorChange) return
                const newSectors = checked
                  ? [...selectedSectors, sector]
                  : selectedSectors.filter((s) => s !== sector)
                onSectorChange(newSectors)
              }}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}
