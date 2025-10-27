import { ScraperConfig } from '../types';

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error | undefined;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        const delayMs = baseDelay * Math.pow(2, i);
        console.log(`Retry attempt ${i + 1}/${maxRetries} after ${delayMs}ms...`);
        await delay(delayMs);
      }
    }
  }

  throw lastError || new Error('Max retries exceeded');
};

export const parseNumber = (value: string | undefined): number => {
  if (!value) return 0;

  // Remove commas and other formatting
  const cleaned = value.replace(/,/g, '').trim();
  const parsed = parseFloat(cleaned);

  return isNaN(parsed) ? 0 : parsed;
};

export const parsePercentage = (value: string | undefined): number => {
  if (!value) return 0;

  // Remove % sign and parse
  const cleaned = value.replace(/%/g, '').trim();
  const parsed = parseFloat(cleaned);

  return isNaN(parsed) ? 0 : parsed;
};

export const validateScrapedData = (data: any): boolean => {
  if (!data) return false;
  if (typeof data.price !== 'number' || data.price <= 0) return false;
  if (!data.symbol || data.symbol.trim() === '') return false;

  return true;
};

export const defaultScraperConfig: ScraperConfig = {
  url: 'https://th.investing.com/',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 2000,
  rateLimit: 3000, // 3 seconds between requests
};
