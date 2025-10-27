import { PrismaClient, StockMarket, Sector, Exchange, Currency, ArticleCategory, ReadingLevel, Sentiment } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create default author
  const author = await prisma.author.upsert({
    where: { id: 'default-author' },
    update: {},
    create: {
      id: 'default-author',
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      bio: 'Senior Financial Analyst specializing in tech stocks'
    }
  });

  console.log('✅ Author created');

  // Create sample articles
  const articles = [
    {
      title: 'Apple Reaches New All-Time High: What Investors Need to Know',
      slug: 'apple-reaches-new-all-time-high',
      excerpt: 'Apple Inc. continues its impressive run with record-breaking stock performance. We analyze the key drivers behind this surge and what it means for investors.',
      content: `Apple Inc. (AAPL) has reached a new all-time high, demonstrating the company's resilience and continued innovation in the tech sector.

## Key Drivers

The recent surge can be attributed to several factors:

1. **Strong iPhone Sales**: The latest iPhone models have exceeded expectations
2. **Services Growth**: Apple's services division continues to show robust growth
3. **Market Sentiment**: Positive outlook on tech stocks in general

## Investment Outlook

Analysts remain bullish on Apple's long-term prospects, citing its strong ecosystem and loyal customer base.`,
      category: ArticleCategory.ANALYSIS,
      readingLevel: ReadingLevel.INTERMEDIATE,
      authorId: author.id,
      stockSymbol: 'AAPL',
      stockCompanyName: 'Apple Inc.',
      stockMarket: StockMarket.US,
      stockExchange: Exchange.NASDAQ,
      stockSector: Sector.TECHNOLOGY,
      stockCurrency: Currency.USD,
      stockDescription: 'Technology company known for iPhone, iPad, and Mac products',
      stockMarketCap: '$2.8T',
      stockFoundedYear: 1976,
      publishedAt: new Date('2024-10-12'),
      readTime: 5,
      tags: ['AAPL', 'Technology', 'US Markets', 'Growth Stock'],
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800',
      imageAlt: 'Apple logo',
      sentiment: Sentiment.BULLISH,
      priceTarget: 200,
      priceTargetTimeframe: '12 months'
    },
    {
      title: 'Tesla Q3 Earnings Beat Expectations Despite Production Challenges',
      slug: 'tesla-q3-earnings-beat-expectations',
      excerpt: 'Tesla reports stronger-than-expected Q3 earnings, overcoming production hurdles and supply chain issues.',
      content: `Tesla (TSLA) has delivered impressive Q3 results, beating analyst expectations despite facing significant production challenges.

## Financial Highlights

- Revenue: $25.2B (vs. $24.1B expected)
- EPS: $1.05 (vs. $0.98 expected)
- Vehicle Deliveries: 466,000 units

## Production Challenges

The company successfully navigated supply chain disruptions and ramped up production at its new facilities.`,
      category: ArticleCategory.EARNINGS,
      readingLevel: ReadingLevel.INTERMEDIATE,
      authorId: author.id,
      stockSymbol: 'TSLA',
      stockCompanyName: 'Tesla Inc.',
      stockMarket: StockMarket.US,
      stockExchange: Exchange.NASDAQ,
      stockSector: Sector.CONSUMER,
      stockCurrency: Currency.USD,
      stockDescription: 'Electric vehicle and clean energy company',
      stockMarketCap: '$800B',
      stockFoundedYear: 2003,
      publishedAt: new Date('2024-10-10'),
      readTime: 6,
      tags: ['TSLA', 'EV', 'Earnings', 'Growth Stock'],
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
      imageAlt: 'Tesla vehicle',
      sentiment: Sentiment.BULLISH
    },
    // Add more articles following the same pattern from mockStockArticles.ts
  ];

  for (const articleData of articles) {
    await prisma.article.upsert({
      where: { slug: articleData.slug },
      update: {},
      create: articleData
    });
  }

  console.log(`✅ Created ${articles.length} articles`);
  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
