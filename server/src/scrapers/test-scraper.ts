/**
 * Test script to verify scraper works
 * Run with: npx ts-node src/scrapers/test-scraper.ts
 */

import { investingScraper } from './investing';

async function testScraper() {
  console.log('🧪 Testing Investing.com Scraper...\n');

  try {
    const result = await investingScraper.scrapeSETIndex();

    console.log('\n📊 Scraper Result:');
    console.log('Success:', result.success);
    console.log('Timestamp:', result.timestamp);
    console.log('Source:', result.source);

    if (result.success && result.data) {
      console.log(`\n✅ Found ${result.data.length} indices:\n`);
      result.data.forEach((index) => {
        console.log(`${index.name} (${index.code})`);
        console.log(`  Value: ${index.value.toLocaleString()}`);
        console.log(`  Change: ${index.change} (${index.changePercent}%)`);
        console.log('');
      });
    } else {
      console.log('\n❌ Error:', result.error);
    }
  } catch (error) {
    console.error('💥 Test failed:', error);
  } finally {
    await investingScraper.close();
    console.log('\n✅ Test complete');
    process.exit(0);
  }
}

testScraper();
