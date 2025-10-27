import * as cron from 'node-cron';
import { investingScraper } from '../scrapers/investing';
import marketDataService from '../services/marketData.service';
import { ScraperHealthStatus, ScraperStatus } from '../scrapers/types';

class ScraperJob {
  private task: cron.ScheduledTask | null = null;
  private status: ScraperStatus = ScraperStatus.IDLE;
  private healthStatus: ScraperHealthStatus = {
    status: ScraperStatus.IDLE,
    totalRuns: 0,
    successCount: 0,
    errorCount: 0,
    successRate: 0,
  };

  // Run the scraper manually
  async runScraper(): Promise<void> {
    if (this.status === ScraperStatus.RUNNING) {
      console.log('⏳ Scraper already running, skipping...');
      return;
    }

    this.status = ScraperStatus.RUNNING;
    const startTime = Date.now();

    console.log('\n🚀 Starting scraper job...');
    console.log(`⏰ Time: ${new Date().toLocaleString()}`);

    try {
      // Scrape SET indices
      const result = await investingScraper.scrapeSETIndex();

      if (result.success && result.data) {
        // Save to database
        const saved = await marketDataService.saveMarketIndices(result.data);

        // Log success
        const duration = Date.now() - startTime;
        await marketDataService.logScraperRun('index', 'success', saved, undefined, duration);

        // Update health status
        this.healthStatus.lastRun = new Date();
        this.healthStatus.lastSuccess = new Date();
        this.healthStatus.totalRuns++;
        this.healthStatus.successCount++;
        this.status = ScraperStatus.SUCCESS;

        console.log(`✅ Scraper completed successfully in ${duration}ms`);
        console.log(`📊 Saved ${saved} indices to database\n`);
      } else {
        throw new Error(result.error || 'Unknown scraping error');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const duration = Date.now() - startTime;

      // Log failure
      await marketDataService.logScraperRun('index', 'failed', 0, errorMessage, duration);

      // Update health status
      this.healthStatus.lastRun = new Date();
      this.healthStatus.lastError = errorMessage;
      this.healthStatus.totalRuns++;
      this.healthStatus.errorCount++;
      this.status = ScraperStatus.FAILED;

      console.error(`❌ Scraper failed after ${duration}ms:`, errorMessage);
      console.error(error);
    } finally {
      // Update success rate
      if (this.healthStatus.totalRuns > 0) {
        this.healthStatus.successRate =
          (this.healthStatus.successCount / this.healthStatus.totalRuns) * 100;
      }

      // Return to idle
      setTimeout(() => {
        this.status = ScraperStatus.IDLE;
      }, 5000);
    }
  }

  // Start scheduled scraping
  start(schedule: string = '0 * * * *'): void {
    // Default: every hour on the hour

    if (this.task) {
      console.log('⚠️  Scraper job already scheduled');
      return;
    }

    // Validate cron expression
    if (!cron.validate(schedule)) {
      throw new Error(`Invalid cron schedule: ${schedule}`);
    }

    this.task = cron.schedule(schedule, async () => {
      await this.runScraper();
    });

    console.log(`📅 Scraper job scheduled: ${schedule}`);
    console.log(`   (Current: ${new Date().toLocaleString()})`);

    // Run immediately on start (optional)
    if (process.env.SCRAPER_RUN_ON_START === 'true') {
      console.log('🏃 Running scraper immediately...');
      setTimeout(() => this.runScraper(), 5000); // Delay 5s to let server start
    }
  }

  // Stop scheduled scraping
  stop(): void {
    if (this.task) {
      this.task.stop();
      this.task = null;
      console.log('⏹️  Scraper job stopped');
    }
  }

  // Get health status
  getHealth(): ScraperHealthStatus {
    return {
      ...this.healthStatus,
      status: this.status,
    };
  }

  // Reset health stats
  resetStats(): void {
    this.healthStatus = {
      status: this.status,
      totalRuns: 0,
      successCount: 0,
      errorCount: 0,
      successRate: 0,
    };
    console.log('🔄 Health stats reset');
  }
}

export const scraperJob = new ScraperJob();
