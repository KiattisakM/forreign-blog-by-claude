import prisma from '../utils/prisma';
import { ScrapedIndexData, ScrapedStockData } from '../scrapers/types';

export class MarketDataService {
  // Save market index data
  async saveMarketIndex(data: ScrapedIndexData): Promise<void> {
    await prisma.marketIndex.create({
      data: {
        code: data.code,
        name: data.name,
        value: data.value,
        change: data.change,
        changePercent: data.changePercent,
        timestamp: data.timestamp,
      },
    });
  }

  async saveMarketIndices(indices: ScrapedIndexData[]): Promise<number> {
    const results = await Promise.allSettled(
      indices.map((index) => this.saveMarketIndex(index))
    );

    const successful = results.filter((r) => r.status === 'fulfilled').length;
    console.log(`💾 Saved ${successful}/${indices.length} market indices`);

    return successful;
  }

  // Save stock price data
  async saveStockPrice(data: ScrapedStockData): Promise<void> {
    await prisma.stockPrice.create({
      data: {
        symbol: data.symbol,
        name: data.name,
        price: data.price,
        change: data.change,
        changePercent: data.changePercent,
        volume: data.volume ? BigInt(data.volume) : null,
        timestamp: data.timestamp,
      },
    });
  }

  async saveStockPrices(stocks: ScrapedStockData[]): Promise<number> {
    const results = await Promise.allSettled(
      stocks.map((stock) => this.saveStockPrice(stock))
    );

    const successful = results.filter((r) => r.status === 'fulfilled').length;
    console.log(`💾 Saved ${successful}/${stocks.length} stock prices`);

    return successful;
  }

  // Log scraper activity
  async logScraperRun(
    type: string,
    status: 'success' | 'failed',
    recordCount: number = 0,
    error?: string,
    duration?: number
  ): Promise<void> {
    await prisma.scraperLog.create({
      data: {
        type,
        status,
        recordCount,
        error,
        duration,
        timestamp: new Date(),
      },
    });
  }

  // Get latest market index data
  async getLatestMarketIndex(code: string) {
    return await prisma.marketIndex.findFirst({
      where: { code },
      orderBy: { timestamp: 'desc' },
    });
  }

  async getLatestIndices() {
    // Get latest timestamp
    const latest = await prisma.marketIndex.findFirst({
      orderBy: { timestamp: 'desc' },
      select: { timestamp: true },
    });

    if (!latest) return [];

    // Get all indices from that timestamp
    return await prisma.marketIndex.findMany({
      where: { timestamp: latest.timestamp },
      orderBy: { code: 'asc' },
    });
  }

  // Get historical index data
  async getIndexHistory(code: string, limit: number = 100) {
    return await prisma.marketIndex.findMany({
      where: { code },
      orderBy: { timestamp: 'desc' },
      take: limit,
    });
  }

  // Get latest stock price
  async getLatestStockPrice(symbol: string) {
    return await prisma.stockPrice.findFirst({
      where: { symbol },
      orderBy: { timestamp: 'desc' },
    });
  }

  // Get scraper logs
  async getScraperLogs(limit: number = 50) {
    return await prisma.scraperLog.findMany({
      orderBy: { timestamp: 'desc' },
      take: limit,
    });
  }

  // Get scraper statistics
  async getScraperStats() {
    const logs = await prisma.scraperLog.findMany({
      orderBy: { timestamp: 'desc' },
      take: 100,
    });

    const totalRuns = logs.length;
    const successCount = logs.filter((l) => l.status === 'success').length;
    const errorCount = logs.filter((l) => l.status === 'failed').length;
    const lastRun = logs[0]?.timestamp;
    const lastSuccess = logs.find((l) => l.status === 'success')?.timestamp;

    return {
      totalRuns,
      successCount,
      errorCount,
      successRate: totalRuns > 0 ? (successCount / totalRuns) * 100 : 0,
      lastRun,
      lastSuccess,
    };
  }
}

export default new MarketDataService();
