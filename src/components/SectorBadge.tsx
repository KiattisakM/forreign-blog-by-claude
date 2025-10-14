import { Badge } from '@/components/ui/badge'
import { Sector } from '@/types'
import { cn } from '@/lib/utils'

interface SectorBadgeProps {
  sector: Sector
  className?: string
}

const sectorColors: Record<Sector, string> = {
  [Sector.TECHNOLOGY]: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  [Sector.FINANCE]: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  [Sector.HEALTHCARE]: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
  [Sector.ENERGY]: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  [Sector.CONSUMER]: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
  [Sector.INDUSTRIALS]: 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200',
  [Sector.MATERIALS]: 'bg-stone-100 text-stone-800 dark:bg-stone-900 dark:text-stone-200',
  [Sector.UTILITIES]: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
  [Sector.REAL_ESTATE]: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
  [Sector.COMMUNICATIONS]: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-200',
}

export function SectorBadge({ sector, className }: SectorBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(sectorColors[sector], 'font-medium', className)}
    >
      {sector}
    </Badge>
  )
}
