import puppeteer, { Browser, Page } from 'puppeteer';
import { ScrapedIndexData, ScrapedStockData, ScraperResult, ScraperConfig } from '../types';
import { delay, retryWithBackoff, parseNumber, parsePercentage, defaultScraperConfig } from './utils';

export class InvestingComScraper {
  private config: ScraperConfig;
  private browser: Browser | null = null;

  constructor(config?: Partial<ScraperConfig>) {
    this.config = { ...defaultScraperConfig, ...config };
  }

  async initialize(): Promise<void> {
    if (this.browser) return;

    console.log('🚀 Initializing Puppeteer browser...');
    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
      ],
    });
    console.log('✅ Browser initialized');
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      console.log('🔒 Browser closed');
    }
  }

  async scrapeSETIndex(): Promise<ScraperResult<ScrapedIndexData>> {
    const timestamp = new Date();
    const source = 'investing.com';

    try {
      await this.initialize();

      if (!this.browser) {
        throw new Error('Browser not initialized');
      }

      const data = await retryWithBackoff(async () => {
        const page = await this.browser!.newPage();

        try {
          // Set user agent to appear as regular browser
          await page.setUserAgent(
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          );

          console.log('📡 Navigating to investing.com...');
          await page.goto('https://th.investing.com/indices/thailand-indices', {
            waitUntil: 'networkidle2',
            timeout: this.config.timeout,
          });

          console.log('⏳ Waiting for page to load...');
          await delay(2000); // Give page time to fully render

          // Try to scrape SET index data
          const indexData = await page.evaluate(() => {
            const results: any[] = [];

            // Get all tables on the page
            const tables = document.querySelectorAll('table');

            tables.forEach((table: Element) => {
              const rows = table.querySelectorAll('tr');

              rows.forEach((row: Element) => {
                const cells = row.querySelectorAll('td');

                // Check if this row has enough cells
                if (cells.length >= 7) {
                  // Index name is in the 2nd column (index 1)
                  const nameCell = cells[1];
                  const name = nameCell?.textContent?.trim() || '';

                  // Only process rows containing SET-related indices
                  if (name.includes('SET') || name.includes('ดัชนี')) {
                    const price = cells[2]?.textContent?.trim() || '0';      // ล่าสุด (Last)
                    const change = cells[5]?.textContent?.trim() || '0';     // เปลี่ยน (Change)
                    const changePercent = cells[6]?.textContent?.trim() || '0'; // % เปลี่ยน (Change %)

                    results.push({
                      name: name,
                      price: price,
                      change: change,
                      changePercent: changePercent,
                    });
                  }
                }
              });
            });

            return results;
          });

          console.log(`📊 Found ${indexData.length} index entries`);

          if (indexData.length === 0) {
            // Fallback: Try to get page HTML for debugging
            const html = await page.content();
            console.log('⚠️  No data found. Page title:', await page.title());
            throw new Error('No index data found on page');
          }

          // Transform to ScrapedIndexData
          const scrapedData: ScrapedIndexData[] = indexData.map((item) => {
            // Determine index code based on name
            let code = 'SET';
            if (item.name.includes('SET 50') || item.name.includes('SET50')) {
              code = 'SET50';
            } else if (item.name.includes('MAI')) {
              code = 'MAI';
            } else if (item.name.includes('All-Share')) {
              code = 'SET-ALL';
            }

            return {
              code,
              name: item.name,
              value: parseNumber(item.price),
              change: parseNumber(item.change),
              changePercent: parsePercentage(item.changePercent),
              timestamp,
            };
          });

          return scrapedData;
        } finally {
          await page.close();
        }
      }, this.config.retryAttempts, this.config.retryDelay);

      console.log('✅ Scraping successful');

      return {
        success: true,
        data,
        timestamp,
        source,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Scraping failed:', errorMessage);

      return {
        success: false,
        error: errorMessage,
        timestamp,
        source,
      };
    }
  }

  // Future: Scrape individual stocks
  async scrapeStocks(symbols: string[]): Promise<ScraperResult<ScrapedStockData>> {
    // TODO: Implement stock scraping
    return {
      success: false,
      error: 'Not implemented yet',
      timestamp: new Date(),
      source: 'investing.com',
    };
  }
}

// Singleton instance
export const investingScraper = new InvestingComScraper();
