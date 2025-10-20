import { StockMarket, Sector } from '@/types'

/**
 * Serialize array to comma-separated string
 * Example: ['US', 'EU'] => 'US,EU'
 */
export function serializeArray(arr: string[]): string {
  return arr.filter(Boolean).join(',')
}

/**
 * Deserialize comma-separated string to array
 * Example: 'US,EU' => ['US', 'EU']
 */
export function deserializeArray(str: string | null): string[] {
  if (!str) return []
  return str.split(',').filter(Boolean)
}

/**
 * Validate and filter market codes
 * Removes invalid market codes from array
 */
export function validateMarkets(markets: string[]): StockMarket[] {
  const validMarkets = Object.values(StockMarket)
  return markets.filter(m =>
    validMarkets.includes(m as StockMarket)
  ) as StockMarket[]
}

/**
 * Validate and filter sector names
 * Removes invalid sector names from array
 */
export function validateSectors(sectors: string[]): Sector[] {
  const validSectors = Object.values(Sector)
  return sectors.filter(s =>
    validSectors.includes(s as Sector)
  ) as Sector[]
}

/**
 * Validate sort option, fallback to default if invalid
 */
export function validateSort(
  sort: string | null,
  defaultValue: string = 'newest'
): string {
  const validSorts = ['newest', 'oldest', 'readTime', 'category']
  return sort && validSorts.includes(sort) ? sort : defaultValue
}

/**
 * Serialize search query (trim whitespace)
 */
export function serializeSearch(query: string): string {
  return query.trim()
}

/**
 * Deserialize search query from URL
 */
export function deserializeSearch(query: string | null): string {
  return query?.trim() || ''
}
