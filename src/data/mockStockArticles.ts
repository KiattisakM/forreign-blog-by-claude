import {
  StockArticle,
  ArticleCategory,
  ReadingLevel,
  StockMarket,
  Sector,
  Exchange,
  Currency,
} from '@/types'

export const mockStockArticles: StockArticle[] = [
  {
    id: '1',
    title: 'Apple Reaches New All-Time High: What Investors Need to Know',
    slug: 'apple-reaches-new-all-time-high',
    excerpt:
      'Apple Inc. continues its impressive run with record-breaking stock performance. We analyze the key drivers behind this surge and what it means for investors.',
    content: `
Apple Inc. (AAPL) has reached a new all-time high, demonstrating the company's resilience and continued innovation in the tech sector.

## Key Drivers

The recent surge can be attributed to several factors:

1. **Strong iPhone Sales**: The latest iPhone models have exceeded expectations
2. **Services Growth**: Apple's services division continues to show robust growth
3. **Market Sentiment**: Positive outlook on tech stocks in general

## Investment Outlook

Analysts remain bullish on Apple's long-term prospects, citing its strong ecosystem and loyal customer base.
    `,
    category: ArticleCategory.ANALYSIS,
    readingLevel: ReadingLevel.INTERMEDIATE,
    author: {
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      bio: 'Senior Financial Analyst specializing in tech stocks',
    },
    publishedAt: new Date('2024-10-12'),
    readTime: 5,
    tags: ['AAPL', 'Technology', 'US Markets', 'Growth Stock'],
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800',
    imageAlt: 'Apple logo',
    stockInfo: {
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      market: StockMarket.US,
      exchange: Exchange.NASDAQ,
      sector: Sector.TECHNOLOGY,
      currency: Currency.USD,
      description: 'Technology company known for iPhone, iPad, and Mac products',
      marketCap: '$2.8T',
      foundedYear: 1976,
    },
    sentiment: 'BULLISH',
    priceTarget: {
      target: 200,
      timeframe: '12 months',
    },
  },
  {
    id: '2',
    title: 'Tesla Q3 Earnings Beat Expectations Despite Production Challenges',
    slug: 'tesla-q3-earnings-beat-expectations',
    excerpt:
      'Tesla reports stronger-than-expected Q3 earnings, overcoming production hurdles and supply chain issues.',
    content: `
Tesla (TSLA) has delivered impressive Q3 results, beating analyst expectations despite facing significant production challenges.

## Financial Highlights

- Revenue: $25.2B (vs. $24.1B expected)
- EPS: $1.05 (vs. $0.98 expected)
- Vehicle Deliveries: 466,000 units

## Production Challenges

The company successfully navigated supply chain disruptions and ramped up production at its new facilities.
    `,
    category: ArticleCategory.EARNINGS,
    readingLevel: ReadingLevel.INTERMEDIATE,
    author: {
      name: 'Michael Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      bio: 'Automotive industry analyst with focus on EV sector',
    },
    publishedAt: new Date('2024-10-10'),
    readTime: 6,
    tags: ['TSLA', 'EV', 'Earnings', 'Growth Stock'],
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
    imageAlt: 'Tesla vehicle',
    stockInfo: {
      symbol: 'TSLA',
      companyName: 'Tesla Inc.',
      market: StockMarket.US,
      exchange: Exchange.NASDAQ,
      sector: Sector.CONSUMER,
      currency: Currency.USD,
      description: 'Electric vehicle and clean energy company',
      marketCap: '$800B',
      foundedYear: 2003,
    },
    sentiment: 'BULLISH',
  },
  {
    id: '3',
    title: 'Microsoft Azure Growth Continues to Accelerate',
    slug: 'microsoft-azure-growth-accelerates',
    excerpt:
      'Microsoft\'s cloud computing platform Azure shows no signs of slowing down, capturing more market share from competitors.',
    content: `
Microsoft (MSFT) continues to see impressive growth in its Azure cloud platform, solidifying its position as a major player in cloud computing.

## Cloud Market Dynamics

Azure's growth is driven by:
- Enterprise migration to cloud
- AI and ML integrations
- Hybrid cloud solutions

## Competitive Position

Microsoft is gaining ground on AWS while maintaining a strong lead over Google Cloud.
    `,
    category: ArticleCategory.ANALYSIS,
    readingLevel: ReadingLevel.ADVANCED,
    author: {
      name: 'Jennifer Kim',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer',
      bio: 'Cloud computing specialist and enterprise tech analyst',
    },
    publishedAt: new Date('2024-10-08'),
    readTime: 7,
    tags: ['MSFT', 'Cloud Computing', 'Enterprise', 'Technology'],
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=800',
    imageAlt: 'Microsoft logo',
    stockInfo: {
      symbol: 'MSFT',
      companyName: 'Microsoft Corporation',
      market: StockMarket.US,
      exchange: Exchange.NASDAQ,
      sector: Sector.TECHNOLOGY,
      currency: Currency.USD,
      description: 'Software, cloud computing, and AI company',
      marketCap: '$2.5T',
      foundedYear: 1975,
    },
    sentiment: 'BULLISH',
  },
  {
    id: '4',
    title: 'ASML: The Hidden Giant Powering the Semiconductor Industry',
    slug: 'asml-hidden-giant-semiconductor',
    excerpt:
      'Deep dive into ASML, the Dutch company that has become indispensable to the global chip industry.',
    content: `
ASML Holding (ASML) may not be a household name, but it's crucial to the semiconductor industry.

## Why ASML Matters

ASML produces extreme ultraviolet (EUV) lithography machines, essential for manufacturing advanced chips. No other company in the world can produce these machines at scale.

## Investment Thesis

- Monopoly position in EUV lithography
- Growing demand for advanced chips
- Strong order backlog

## Risks to Consider

- Geopolitical tensions affecting chip supply chains
- High capital requirements
- Technology obsolescence risk
    `,
    category: ArticleCategory.EDUCATION,
    readingLevel: ReadingLevel.INTERMEDIATE,
    author: {
      name: 'Thomas van der Berg',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas',
      bio: 'European markets analyst specializing in semiconductors',
    },
    publishedAt: new Date('2024-10-07'),
    readTime: 8,
    tags: ['ASML', 'Semiconductors', 'European Markets', 'Technology'],
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    imageAlt: 'Semiconductor manufacturing',
    stockInfo: {
      symbol: 'ASML',
      companyName: 'ASML Holding N.V.',
      market: StockMarket.EU,
      exchange: Exchange.EURONEXT,
      sector: Sector.TECHNOLOGY,
      currency: Currency.EUR,
      description: 'Semiconductor equipment manufacturer',
      marketCap: '€250B',
      foundedYear: 1984,
    },
    sentiment: 'BULLISH',
  },
  {
    id: '5',
    title: 'LVMH: Luxury Market Resilience in Uncertain Times',
    slug: 'lvmh-luxury-market-resilience',
    excerpt:
      'How LVMH continues to thrive despite global economic headwinds and changing consumer behavior.',
    content: `
LVMH Moët Hennessy Louis Vuitton (MC.PA) demonstrates the resilience of the luxury goods sector.

## Luxury Market Dynamics

Despite economic uncertainty, luxury brands continue to perform well due to:
- Wealthy consumer base less affected by economic downturns
- Strong brand equity
- Limited supply creating exclusivity

## LVMH Portfolio Strength

LVMH's diverse portfolio of brands provides stability and growth opportunities across different luxury segments.

## Geographic Diversification

Strong performance in Asia, particularly China, offsets weakness in other regions.
    `,
    category: ArticleCategory.ANALYSIS,
    readingLevel: ReadingLevel.INTERMEDIATE,
    author: {
      name: 'Sophie Dubois',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
      bio: 'Luxury goods and consumer discretionary analyst',
    },
    publishedAt: new Date('2024-10-05'),
    readTime: 6,
    tags: ['LVMH', 'Luxury', 'European Markets', 'Consumer'],
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1591348278863-ee0d03f4e4d6?w=800',
    imageAlt: 'Luxury shopping',
    stockInfo: {
      symbol: 'MC.PA',
      companyName: 'LVMH Moët Hennessy Louis Vuitton',
      market: StockMarket.EU,
      exchange: Exchange.EURONEXT,
      sector: Sector.CONSUMER,
      currency: Currency.EUR,
      description: 'Luxury goods conglomerate',
      marketCap: '€350B',
      foundedYear: 1987,
    },
    sentiment: 'NEUTRAL',
  },
  {
    id: '6',
    title: 'Nvidia: AI Revolution Drives Unprecedented Growth',
    slug: 'nvidia-ai-revolution-drives-growth',
    excerpt:
      'Nvidia emerges as the biggest winner of the AI boom, with data center revenue skyrocketing.',
    content: `
Nvidia (NVDA) has become synonymous with the AI revolution, delivering exceptional growth as demand for AI chips explodes.

## Data Center Dominance

Nvidia's data center segment has become its largest revenue source, driven by:
- ChatGPT and generative AI applications
- Cloud providers building AI infrastructure
- Enterprise AI adoption

## Competitive Moat

Nvidia's CUDA software ecosystem creates high switching costs and maintains its dominant position in AI computing.

## Valuation Considerations

While growth is impressive, investors should consider whether current valuations adequately price in future risks and competition.
    `,
    category: ArticleCategory.ANALYSIS,
    readingLevel: ReadingLevel.ADVANCED,
    author: {
      name: 'David Park',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      bio: 'AI and semiconductor industry analyst',
    },
    publishedAt: new Date('2024-10-03'),
    readTime: 9,
    tags: ['NVDA', 'AI', 'Semiconductors', 'Growth Stock'],
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800',
    imageAlt: 'AI and computing',
    stockInfo: {
      symbol: 'NVDA',
      companyName: 'Nvidia Corporation',
      market: StockMarket.US,
      exchange: Exchange.NASDAQ,
      sector: Sector.TECHNOLOGY,
      currency: Currency.USD,
      description: 'Graphics processing units and AI chips manufacturer',
      marketCap: '$1.2T',
      foundedYear: 1993,
    },
    sentiment: 'BULLISH',
    priceTarget: {
      target: 600,
      timeframe: '12 months',
    },
  },
  {
    id: '7',
    title: 'Toyota: Hybrid Strategy Pays Off Amid EV Transition',
    slug: 'toyota-hybrid-strategy-pays-off',
    excerpt:
      'While others rush to EVs, Toyota\'s balanced approach with hybrids proves prescient as EV adoption slows.',
    content: `
Toyota Motor Corporation (7203.T) vindicated its hybrid-first strategy as pure EV adoption faces headwinds.

## Strategic Positioning

Toyota's multi-pathway approach includes:
- Hybrid vehicles (current strength)
- Plug-in hybrids (PHEV)
- Battery electric vehicles (BEV)
- Hydrogen fuel cells (FCEV)

## Market Reality

Consumer hesitation around EVs due to charging infrastructure and range anxiety has benefited Toyota's hybrid lineup.

## Future Outlook

Toyota plans solid-state battery technology that could leapfrog current EV limitations.
    `,
    category: ArticleCategory.OPINION,
    readingLevel: ReadingLevel.INTERMEDIATE,
    author: {
      name: 'Yuki Tanaka',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki',
      bio: 'Asian markets and automotive industry specialist',
    },
    publishedAt: new Date('2024-10-01'),
    readTime: 7,
    tags: ['Toyota', 'EV', 'Hybrid', 'Asian Markets'],
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1623639404399-457fde38d9f4?w=800',
    imageAlt: 'Toyota vehicle',
    stockInfo: {
      symbol: '7203.T',
      companyName: 'Toyota Motor Corporation',
      market: StockMarket.ASIA,
      exchange: Exchange.TSE,
      sector: Sector.CONSUMER,
      currency: Currency.JPY,
      description: 'Automotive manufacturer',
      marketCap: '¥40T',
      foundedYear: 1937,
    },
    sentiment: 'NEUTRAL',
  },
  {
    id: '8',
    title: 'Understanding Stock Valuation: P/E Ratios Explained',
    slug: 'understanding-pe-ratios',
    excerpt:
      'A beginner-friendly guide to one of the most important metrics in stock analysis: the Price-to-Earnings ratio.',
    content: `
The Price-to-Earnings (P/E) ratio is one of the most widely used valuation metrics for stocks.

## What is P/E Ratio?

P/E ratio = Stock Price / Earnings Per Share (EPS)

It tells you how much investors are willing to pay for each dollar of earnings.

## Interpreting P/E Ratios

- High P/E: Market expects strong future growth (or stock is overvalued)
- Low P/E: Market has modest expectations (or stock is undervalued)
- Industry Average: Compare with sector peers for context

## Limitations

P/E ratios should not be used in isolation. Consider:
- Growth rates
- Industry dynamics
- Company-specific factors
- Economic conditions

## Examples

Let's look at actual companies and their P/E ratios to understand practical applications.
    `,
    category: ArticleCategory.EDUCATION,
    readingLevel: ReadingLevel.BEGINNER,
    author: {
      name: 'Robert Williams',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
      bio: 'Financial educator and investment coach',
    },
    publishedAt: new Date('2024-09-28'),
    readTime: 5,
    tags: ['Education', 'Valuation', 'Fundamentals', 'Beginner'],
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    imageAlt: 'Financial charts',
    stockInfo: {
      symbol: 'SPY',
      companyName: 'S&P 500 ETF',
      market: StockMarket.US,
      exchange: Exchange.NYSE,
      sector: Sector.FINANCE,
      currency: Currency.USD,
      description: 'S&P 500 Index tracking ETF',
      marketCap: '$450B',
      foundedYear: 1993,
    },
    sentiment: 'NEUTRAL',
  },
  {
    id: '9',
    title: 'Samsung: Semiconductor Cycle Bottom in Sight?',
    slug: 'samsung-semiconductor-cycle-bottom',
    excerpt:
      'Analyzing whether Samsung Electronics has hit bottom in the chip downturn and what recovery might look like.',
    content: `
Samsung Electronics (005930.KS) faces challenges in its semiconductor business but signs suggest the worst may be over.

## Semiconductor Cycle Analysis

The chip industry is notoriously cyclical:
- 2021-2022: Massive oversupply and high prices
- 2023: Inventory correction and price collapse
- 2024: Signs of bottoming

## Samsung's Position

- Memory chips: Still facing headwinds
- Foundry business: Gaining traction
- Consumer electronics: Stable contributor

## Recovery Indicators

- Inventory normalization
- Pricing stabilization
- AI-driven demand increase

## Investment Considerations

Timing semiconductor cycles is difficult. A dollar-cost averaging approach may be prudent.
    `,
    category: ArticleCategory.ANALYSIS,
    readingLevel: ReadingLevel.ADVANCED,
    author: {
      name: 'Min-jun Park',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Minjun',
      bio: 'Korean markets and technology sector analyst',
    },
    publishedAt: new Date('2024-09-25'),
    readTime: 8,
    tags: ['Samsung', 'Semiconductors', 'Korean Markets', 'Cyclical'],
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800',
    imageAlt: 'Semiconductor chip',
    stockInfo: {
      symbol: '005930.KS',
      companyName: 'Samsung Electronics',
      market: StockMarket.ASIA,
      exchange: Exchange.TSE,
      sector: Sector.TECHNOLOGY,
      currency: Currency.USD,
      description: 'Electronics and semiconductor conglomerate',
      marketCap: '$300B',
      foundedYear: 1969,
    },
    sentiment: 'NEUTRAL',
  },
  {
    id: '10',
    title: 'Shell: Navigating the Energy Transition',
    slug: 'shell-energy-transition',
    excerpt:
      'How Royal Dutch Shell is balancing fossil fuel profits with renewable energy investments.',
    content: `
Shell plc (SHEL) faces the challenge of maintaining profitability while transitioning to cleaner energy.

## Dual Strategy

Shell pursues a two-pronged approach:
1. Maximizing cash flow from oil & gas
2. Building renewable energy portfolio

## Financial Performance

Oil and gas still drive the majority of profits, funding the transition to renewables.

## Renewable Investments

- Offshore wind
- Solar farms
- EV charging networks
- Hydrogen production

## Investor Dilemma

Is Shell moving fast enough on renewables, or sacrificing too much oil & gas profitability?
    `,
    category: ArticleCategory.ANALYSIS,
    readingLevel: ReadingLevel.INTERMEDIATE,
    author: {
      name: 'Emma Thompson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      bio: 'Energy sector analyst specializing in transition strategies',
    },
    publishedAt: new Date('2024-09-22'),
    readTime: 6,
    tags: ['Shell', 'Energy', 'ESG', 'Transition'],
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1615719413546-198b25453f85?w=800',
    imageAlt: 'Oil refinery',
    stockInfo: {
      symbol: 'SHEL',
      companyName: 'Shell plc',
      market: StockMarket.EU,
      exchange: Exchange.LSE,
      sector: Sector.ENERGY,
      currency: Currency.GBP,
      description: 'Integrated energy company',
      marketCap: '£180B',
      foundedYear: 1907,
    },
    sentiment: 'NEUTRAL',
  },
  {
    id: '11',
    title: 'Alibaba: China Tech Regulatory Headwinds Easing?',
    slug: 'alibaba-china-tech-regulatory-easing',
    excerpt:
      'Signs that Chinese regulatory pressure on tech giants may be easing, potentially benefiting Alibaba and peers.',
    content: `
Alibaba Group (BABA) has endured years of regulatory scrutiny, but recent signals suggest a thaw in government relations.

## Regulatory Background

China's crackdown on tech companies since 2020 has:
- Resulted in massive fines
- Blocked major acquisitions
- Constrained business models
- Hammered stock prices

## Recent Developments

Positive signs include:
- Easing rhetoric from officials
- Approval of some previously blocked deals
- More predictable regulatory environment

## Business Fundamentals

Despite regulatory challenges, Alibaba's core e-commerce and cloud businesses remain strong.

## Investment Risks

Political risk remains significant. Investors must be comfortable with uncertainty.
    `,
    category: ArticleCategory.NEWS,
    readingLevel: ReadingLevel.ADVANCED,
    author: {
      name: 'Li Wei',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LiWei',
      bio: 'China markets specialist focusing on tech and regulatory affairs',
    },
    publishedAt: new Date('2024-09-20'),
    readTime: 7,
    tags: ['Alibaba', 'China', 'Regulation', 'E-commerce'],
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800',
    imageAlt: 'Chinese technology',
    stockInfo: {
      symbol: 'BABA',
      companyName: 'Alibaba Group',
      market: StockMarket.ASIA,
      exchange: Exchange.HKEX,
      sector: Sector.TECHNOLOGY,
      currency: Currency.USD,
      description: 'E-commerce and cloud computing conglomerate',
      marketCap: '$200B',
      foundedYear: 1999,
    },
    sentiment: 'NEUTRAL',
  },
  {
    id: '12',
    title: 'Berkshire Hathaway: Warren Buffett\'s Latest Portfolio Moves',
    slug: 'berkshire-hathaway-buffett-portfolio-moves',
    excerpt:
      'Analyzing Berkshire Hathaway\'s recent 13F filing and what it reveals about Buffett\'s market outlook.',
    content: `
Warren Buffett's Berkshire Hathaway (BRK.B) latest 13F filing reveals interesting shifts in portfolio positioning.

## Key Portfolio Changes

Recent moves include:
- Increased: Japanese trading houses
- Reduced: Bank holdings
- Maintained: Large Apple position

## What It Means

Buffett's actions suggest:
- Caution on US banks
- Optimism on Japanese value
- Continued faith in Apple

## Learning from the Oracle

Individual investors can learn from Buffett's patient, value-oriented approach even if they can't replicate his positions.

## Berkshire as Investment

Beyond the portfolio, Berkshire itself offers diversified exposure to Buffett's strategy.
    `,
    category: ArticleCategory.ANALYSIS,
    readingLevel: ReadingLevel.INTERMEDIATE,
    author: {
      name: 'Amanda Foster',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda',
      bio: 'Value investing specialist and Berkshire Hathaway watcher',
    },
    publishedAt: new Date('2024-09-18'),
    readTime: 6,
    tags: ['Berkshire', 'Warren Buffett', 'Value Investing', 'Portfolio'],
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
    imageAlt: 'Investment strategy',
    stockInfo: {
      symbol: 'BRK.B',
      companyName: 'Berkshire Hathaway Inc.',
      market: StockMarket.US,
      exchange: Exchange.NYSE,
      sector: Sector.FINANCE,
      currency: Currency.USD,
      description: 'Diversified holding company',
      marketCap: '$900B',
      foundedYear: 1839,
    },
    sentiment: 'BULLISH',
  },
  {
    id: '13',
    title: 'Novo Nordisk: Weight Loss Drug Revolution',
    slug: 'novo-nordisk-weight-loss-revolution',
    excerpt:
      'How Novo Nordisk\'s Ozempic and Wegovy are transforming both healthcare and the company\'s stock price.',
    content: `
Novo Nordisk (NVO) has become one of Europe's most valuable companies on the strength of its diabetes and weight loss drugs.

## Game-Changing Drugs

GLP-1 drugs like Ozempic and Wegovy represent a breakthrough in treating:
- Type 2 diabetes
- Obesity
- Potentially other conditions

## Market Opportunity

The obesity treatment market could be worth $100B+ annually, with Novo Nordisk and Eli Lilly competing for dominance.

## Production Challenges

Demand far exceeds supply, leading to shortages and rationing.

## Competitive Landscape

While Novo leads, numerous competitors are developing rival drugs.

## Valuation Questions

Has the stock run too far, too fast? Or is this just the beginning?
    `,
    category: ArticleCategory.ANALYSIS,
    readingLevel: ReadingLevel.INTERMEDIATE,
    author: {
      name: 'Dr. Henrik Larsen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Henrik',
      bio: 'Healthcare and pharmaceutical sector analyst',
    },
    publishedAt: new Date('2024-09-15'),
    readTime: 8,
    tags: ['Novo Nordisk', 'Healthcare', 'Pharmaceuticals', 'Growth'],
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800',
    imageAlt: 'Medical research',
    stockInfo: {
      symbol: 'NVO',
      companyName: 'Novo Nordisk A/S',
      market: StockMarket.EU,
      exchange: Exchange.EURONEXT,
      sector: Sector.HEALTHCARE,
      currency: Currency.USD,
      description: 'Pharmaceutical company specializing in diabetes care',
      marketCap: '$420B',
      foundedYear: 1923,
    },
    sentiment: 'BULLISH',
    priceTarget: {
      target: 150,
      timeframe: '18 months',
    },
  },
  {
    id: '14',
    title: 'AMD vs Intel: The Battle for CPU Market Share',
    slug: 'amd-vs-intel-cpu-battle',
    excerpt:
      'Comparing AMD and Intel as AMD continues to gain ground in the processor market.',
    content: `
Advanced Micro Devices (AMD) continues to chip away at Intel's (INTC) historically dominant position in CPUs.

## Market Share Trends

AMD has been gaining share in both:
- Consumer PCs
- Data center servers

## Technology Leadership

AMD's chiplet architecture and partnership with TSMC have given it manufacturing advantages over Intel's struggles with its own fabs.

## Intel's Response

Intel is investing heavily in:
- New manufacturing processes
- Foundry services for third parties
- Graphics and AI chips

## Investment Implications

Is AMD's momentum sustainable, or will Intel's massive resources allow it to fight back?
    `,
    category: ArticleCategory.ANALYSIS,
    readingLevel: ReadingLevel.ADVANCED,
    author: {
      name: 'Kevin Chang',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin',
      bio: 'Semiconductor industry analyst and technology investor',
    },
    publishedAt: new Date('2024-09-12'),
    readTime: 9,
    tags: ['AMD', 'Intel', 'Semiconductors', 'Competition'],
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800',
    imageAlt: 'Computer processor',
    stockInfo: {
      symbol: 'AMD',
      companyName: 'Advanced Micro Devices',
      market: StockMarket.US,
      exchange: Exchange.NASDAQ,
      sector: Sector.TECHNOLOGY,
      currency: Currency.USD,
      description: 'Semiconductor company producing CPUs and GPUs',
      marketCap: '$180B',
      foundedYear: 1969,
    },
    relatedStocks: [
      {
        symbol: 'INTC',
        companyName: 'Intel Corporation',
        market: StockMarket.US,
        exchange: Exchange.NASDAQ,
        sector: Sector.TECHNOLOGY,
        currency: Currency.USD,
      },
    ],
    sentiment: 'NEUTRAL',
  },
  {
    id: '15',
    title: 'Understanding Dividend Investing: Passive Income Through Stocks',
    slug: 'understanding-dividend-investing',
    excerpt:
      'A comprehensive guide to building passive income through dividend-paying stocks.',
    content: `
Dividend investing focuses on stocks that pay regular cash distributions to shareholders.

## Why Dividends Matter

Benefits of dividend stocks:
- Regular income stream
- Lower volatility
- Compound growth through reinvestment
- Sign of financial health

## Dividend Metrics

Key metrics to evaluate:
- **Dividend Yield**: Annual dividend / stock price
- **Payout Ratio**: Dividends / earnings
- **Dividend Growth Rate**: Year-over-year increase

## Dividend Aristocrats

Companies that have increased dividends for 25+ consecutive years demonstrate exceptional stability.

## Building a Dividend Portfolio

Diversification across sectors and geographies is crucial for reducing risk.

## Tax Considerations

Understand how dividends are taxed in your jurisdiction.
    `,
    category: ArticleCategory.EDUCATION,
    readingLevel: ReadingLevel.BEGINNER,
    author: {
      name: 'Patricia Morgan',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia',
      bio: 'Income investing specialist and retirement planning expert',
    },
    publishedAt: new Date('2024-09-10'),
    readTime: 7,
    tags: ['Dividend', 'Income', 'Education', 'Beginner'],
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=800',
    imageAlt: 'Dividend concept',
    stockInfo: {
      symbol: 'JNJ',
      companyName: 'Johnson & Johnson',
      market: StockMarket.US,
      exchange: Exchange.NYSE,
      sector: Sector.HEALTHCARE,
      currency: Currency.USD,
      description: 'Healthcare and pharmaceutical company',
      marketCap: '$380B',
      foundedYear: 1886,
    },
    sentiment: 'NEUTRAL',
  },
  {
    id: '16',
    title: 'Tencent: Gaming Giant Faces Regulatory Challenges',
    slug: 'tencent-gaming-regulatory-challenges',
    excerpt:
      'How Tencent is navigating China\'s gaming restrictions while expanding globally.',
    content: `
Tencent Holdings (0700.HK) remains China's largest gaming company despite facing significant regulatory headwinds.

## Gaming Business

Tencent's gaming empire includes:
- Honor of Kings (mobile)
- League of Legends (via Riot Games)
- Numerous investments in global studios

## Regulatory Environment

Chinese gaming regulations have imposed:
- Time limits for minors
- Content restrictions
- License approval delays

## Diversification Strategy

Beyond gaming, Tencent has:
- WeChat ecosystem
- Cloud services
- Entertainment content
- Fintech (though regulated)

## Global Expansion

Tencent is increasingly looking overseas for growth opportunities.
    `,
    category: ArticleCategory.ANALYSIS,
    readingLevel: ReadingLevel.INTERMEDIATE,
    author: {
      name: 'Zhang Lin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang',
      bio: 'Gaming industry analyst covering Asian markets',
    },
    publishedAt: new Date('2024-09-08'),
    readTime: 6,
    tags: ['Tencent', 'Gaming', 'China', 'Technology'],
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800',
    imageAlt: 'Mobile gaming',
    stockInfo: {
      symbol: '0700.HK',
      companyName: 'Tencent Holdings',
      market: StockMarket.ASIA,
      exchange: Exchange.HKEX,
      sector: Sector.COMMUNICATIONS,
      currency: Currency.HKD,
      description: 'Technology conglomerate focused on gaming and social media',
      marketCap: 'HK$3.5T',
      foundedYear: 1998,
    },
    sentiment: 'NEUTRAL',
  },
  {
    id: '17',
    title: 'Shopify: E-commerce Infrastructure Play',
    slug: 'shopify-ecommerce-infrastructure',
    excerpt:
      'Why Shopify remains attractive despite e-commerce slowdown and competition.',
    content: `
Shopify (SHOP) provides the picks and shovels for the e-commerce gold rush.

## Business Model

Shopify enables businesses to:
- Create online stores
- Process payments
- Manage inventory
- Fulfill orders

## Competitive Advantages

- User-friendly platform
- Extensive app ecosystem
- Integrated payment processing
- Multi-channel sales

## Challenges

- Amazon's competing services
- Post-pandemic normalization
- Increased competition

## Recent Moves

Shopify's sale of its logistics business refocuses the company on its core platform strength.

## Growth Prospects

International expansion and B2B commerce offer new opportunities.
    `,
    category: ArticleCategory.ANALYSIS,
    readingLevel: ReadingLevel.INTERMEDIATE,
    author: {
      name: 'Rachel Cohen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel',
      bio: 'E-commerce and SaaS specialist',
    },
    publishedAt: new Date('2024-09-05'),
    readTime: 7,
    tags: ['Shopify', 'E-commerce', 'SaaS', 'Technology'],
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
    imageAlt: 'Online shopping',
    stockInfo: {
      symbol: 'SHOP',
      companyName: 'Shopify Inc.',
      market: StockMarket.CANADA,
      exchange: Exchange.TSX,
      sector: Sector.TECHNOLOGY,
      currency: Currency.CAD,
      description: 'E-commerce platform provider',
      marketCap: 'C$120B',
      foundedYear: 2006,
    },
    sentiment: 'BULLISH',
  },
  {
    id: '18',
    title: 'BHP Group: Copper Demand and the EV Revolution',
    slug: 'bhp-copper-demand-ev-revolution',
    excerpt:
      'How the electric vehicle revolution is driving demand for copper, benefiting mining giants like BHP.',
    content: `
BHP Group (BHP) stands to benefit from the massive copper demand expected from electrification.

## Copper's Critical Role

Electric vehicles use 2-3x more copper than traditional vehicles:
- Electric motors
- Battery systems
- Charging infrastructure

## Supply Constraints

New copper mine development takes 10-15 years, creating potential supply shortages.

## BHP's Position

As one of the world's largest copper producers, BHP is well-positioned for this transition.

## Additional Commodities

BHP also produces:
- Iron ore
- Coal (thermal and metallurgical)
- Nickel

## ESG Considerations

Mining companies face increasing pressure on environmental and social governance.
    `,
    category: ArticleCategory.ANALYSIS,
    readingLevel: ReadingLevel.INTERMEDIATE,
    author: {
      name: 'James Richardson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      bio: 'Natural resources and mining sector analyst',
    },
    publishedAt: new Date('2024-09-03'),
    readTime: 6,
    tags: ['BHP', 'Mining', 'Copper', 'Commodities'],
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1530981279185-9f5627bc0948?w=800',
    imageAlt: 'Mining operations',
    stockInfo: {
      symbol: 'BHP',
      companyName: 'BHP Group Limited',
      market: StockMarket.AUSTRALIA,
      exchange: Exchange.ASX,
      sector: Sector.MATERIALS,
      currency: Currency.AUD,
      description: 'Mining and metals company',
      marketCap: 'A$180B',
      foundedYear: 1885,
    },
    sentiment: 'BULLISH',
  },
  {
    id: '19',
    title: 'Coca-Cola: The Ultimate Dividend Aristocrat',
    slug: 'coca-cola-dividend-aristocrat',
    excerpt:
      'Why Coca-Cola remains a favorite for dividend investors seeking stability and growth.',
    content: `
The Coca-Cola Company (KO) exemplifies the dividend aristocrat strategy with 61 consecutive years of dividend increases.

## Business Moat

Coca-Cola's advantages:
- Unmatched brand recognition
- Global distribution network
- Pricing power
- Diverse portfolio beyond soda

## Dividend Track Record

- 61 years of consecutive increases
- Current yield: ~3%
- Sustainable payout ratio
- Growing dividend even during recessions

## Challenges

- Health consciousness reducing soda consumption
- Input cost inflation
- Currency headwinds

## Adaptation

Coca-Cola is adapting through:
- Portfolio diversification (water, coffee, tea)
- Zero-sugar options
- Strategic acquisitions

## Investment Case

For conservative investors seeking reliable income with modest growth potential.
    `,
    category: ArticleCategory.ANALYSIS,
    readingLevel: ReadingLevel.BEGINNER,
    author: {
      name: 'Margaret Sullivan',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Margaret',
      bio: 'Consumer staples analyst and income investing expert',
    },
    publishedAt: new Date('2024-09-01'),
    readTime: 5,
    tags: ['Coca-Cola', 'Dividend', 'Consumer Staples', 'Stable'],
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800',
    imageAlt: 'Coca-Cola',
    stockInfo: {
      symbol: 'KO',
      companyName: 'The Coca-Cola Company',
      market: StockMarket.US,
      exchange: Exchange.NYSE,
      sector: Sector.CONSUMER,
      currency: Currency.USD,
      description: 'Beverage company',
      marketCap: '$260B',
      foundedYear: 1892,
    },
    sentiment: 'NEUTRAL',
  },
  {
    id: '20',
    title: 'TSMC: The Most Important Company in Tech?',
    slug: 'tsmc-most-important-company-tech',
    excerpt:
      'Why Taiwan Semiconductor Manufacturing Company is crucial to the global tech industry.',
    content: `
Taiwan Semiconductor Manufacturing Company (TSM) manufactures chips for virtually every major tech company.

## Foundry Business Model

Unlike Intel, TSMC doesn't design chips—it manufactures them for others:
- Apple (iPhone, Mac chips)
- Nvidia (AI chips)
- AMD (CPUs and GPUs)
- Qualcomm (mobile chips)

## Technology Leadership

TSMC leads in advanced chip manufacturing:
- 3nm process in production
- 2nm in development
- High yields and reliability

## Geopolitical Risk

Taiwan's political situation creates unique risks:
- China-Taiwan tensions
- Critical importance to global economy
- US government support for diversification

## Expansion Plans

TSMC is building fabs in:
- Arizona, USA
- Germany
- Japan

## Investment Considerations

Strong fundamentals but geopolitical risk requires careful consideration.
    `,
    category: ArticleCategory.ANALYSIS,
    readingLevel: ReadingLevel.ADVANCED,
    author: {
      name: 'Dr. Alan Wu',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alan',
      bio: 'Semiconductor industry expert and Taiwan markets specialist',
    },
    publishedAt: new Date('2024-08-28'),
    readTime: 8,
    tags: ['TSMC', 'Semiconductors', 'Taiwan', 'Geopolitics'],
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=800',
    imageAlt: 'Semiconductor manufacturing',
    stockInfo: {
      symbol: 'TSM',
      companyName: 'Taiwan Semiconductor Manufacturing',
      market: StockMarket.ASIA,
      exchange: Exchange.TSE,
      sector: Sector.TECHNOLOGY,
      currency: Currency.USD,
      description: 'Semiconductor foundry',
      marketCap: '$650B',
      foundedYear: 1987,
    },
    sentiment: 'BULLISH',
    priceTarget: {
      target: 180,
      timeframe: '18 months',
    },
  },
]
