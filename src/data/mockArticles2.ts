import { StockArticle, Author } from '@/types'

// Additional authors
const additionalAuthors: Author[] = [
  {
    id: '4',
    name: 'Michael Chen',
    title: 'European Markets Specialist',
    bio: 'Expert in European equities with 12 years of experience',
  },
  {
    id: '5',
    name: 'ปิยะ นักลงทุน',
    title: 'Asia-Pacific Analyst',
    bio: 'ผู้เชี่ยวชาญด้านตลาดหุ้นเอเชีย',
  },
]

// More mock articles (continuing from mockArticles.ts)
export const additionalArticles: StockArticle[] = [
  {
    id: '6',
    slug: 'asml-semiconductor-equipment-leader',
    title: 'ASML Holding: ผู้นำตลาด Semiconductor Equipment',
    summary: 'ASML ครองตลาด EUV lithography 100% มี Backlog แข็งแกร่ง แม้เผชิญแรงกดดันจาก China restrictions',
    content: `
# ASML Holding (ASML): European Tech Giant

ASML เป็นผู้ผลิตเครื่องมือ lithography ชั้นนำของโลก โดยเฉพาะ EUV technology

## Market Position
- **EUV Market Share**: 100% (monopoly)
- **Customers**: TSMC, Samsung, Intel
- **Backlog**: €38 billion

## Recent Performance
- Q3 Revenue: €7.5B (+30% YoY)
- Net Income: €2.1B
- New Orders: €2.6B

## China Exposure Risk
- ~29% of revenue from China
- Export restrictions impact
- Diversification to other regions

**Rating**: Buy
**Target**: €780 (18% upside)
`,
    ticker: {
      symbol: 'ASML',
      companyName: 'ASML Holding N.V.',
      market: 'EU',
      exchange: 'Euronext',
      sector: 'Technology',
      currentPrice: 661.50,
      priceChange: 2.1,
      currency: 'EUR',
    },
    category: 'Fundamental Analysis',
    priceTarget: {
      current: 661.50,
      target: 780.0,
      upside: 17.9,
      timeframe: '12 months',
    },
    analystRating: 'Buy',
    author: additionalAuthors[0],
    publishedAt: '2024-12-10T13:00:00Z',
    readingTime: 5,
    tags: ['ASML', 'Semiconductor', 'Europe', 'Tech'],
  },
  {
    id: '7',
    slug: 'lvmh-luxury-goods-china-recovery',
    title: 'LVMH: Luxury Giant Positioned for China Recovery',
    summary: 'LVMH showing resilience despite China slowdown. Strong brand portfolio and pricing power remain intact.',
    content: `
# LVMH: Luxury Sector Leader

LVMH remains the world's largest luxury goods company with iconic brands.

## Brand Portfolio
- **Fashion & Leather**: Louis Vuitton, Dior, Fendi
- **Watches & Jewelry**: TAG Heuer, Bulgari
- **Perfumes**: Dior, Givenchy
- **Wines & Spirits**: Moët Hennessy

## Financial Highlights
- Revenue: €86.2B (FY2023)
- Operating Margin: 26.7%
- Strong pricing power
- Global distribution network

## China Recovery Play
Current weakness = buying opportunity

**Rating**: Buy
**Target**: €850 (15% upside)
`,
    ticker: {
      symbol: 'MC.PA',
      companyName: 'LVMH Moët Hennessy Louis Vuitton',
      market: 'EU',
      exchange: 'Euronext',
      sector: 'Consumer',
      currentPrice: 738.40,
      priceChange: -0.8,
      currency: 'EUR',
    },
    category: 'Investment Strategy',
    priceTarget: {
      current: 738.40,
      target: 850.0,
      upside: 15.1,
      timeframe: '12 months',
    },
    analystRating: 'Buy',
    author: additionalAuthors[0],
    publishedAt: '2024-12-09T10:00:00Z',
    readingTime: 6,
    tags: ['LVMH', 'Luxury', 'Europe', 'Consumer'],
  },
  {
    id: '8',
    slug: 'toyota-7203-hybrid-ev-strategy',
    title: 'Toyota (7203.T): กลยุทธ์ Hybrid+EV สู่ปี 2025',
    summary: 'Toyota ยืนยันกลยุทธ์ multi-path พร้อมเปิดตัว EV ใหม่ 10 รุ่นในปี 2025 พร้อม Solid-state battery',
    content: `
# Toyota Motor (7203.T): Multi-Path Strategy

Toyota ดำเนินกลยุทธ์ multi-path สำหรับ powertrain

## Product Strategy
- **Hybrid**: ยังคงเป็นหลัก (50%+ sales)
- **BEV**: เป้าหมาย 1.5M units ในปี 2026
- **FCEV**: Hydrogen vehicles
- **ICE**: High-efficiency engines

## Technology Highlights
- Solid-state battery: Coming 2027-2028
- Next-gen hybrid system (5th gen)
- bZ series expansion

## Financial Strength
- Operating profit: ¥5.4 trillion
- ROE: 20%+
- Strong cash position

**Rating**: Buy
**Target**: ¥3,200 (25% upside)
`,
    ticker: {
      symbol: '7203.T',
      companyName: 'Toyota Motor Corporation',
      market: 'ASIA',
      exchange: 'TSE',
      sector: 'Consumer',
      currentPrice: 2558.0,
      priceChange: 1.5,
      currency: 'JPY',
    },
    category: 'Investment Strategy',
    priceTarget: {
      current: 2558.0,
      target: 3200.0,
      upside: 25.1,
      timeframe: '18 months',
    },
    analystRating: 'Buy',
    author: additionalAuthors[1],
    publishedAt: '2024-12-08T08:30:00Z',
    readingTime: 7,
    tags: ['Toyota', 'Auto', 'Japan', 'EV'],
  },
  {
    id: '9',
    slug: 'tencent-0700-gaming-recovery',
    title: 'Tencent (0700.HK): Gaming Recovery + AI Monetization',
    summary: 'Tencent แสดงสัญญาณฟื้นตัวจากธุรกิจ Gaming และเริ่มทำเงินจาก AI ได้แล้ว',
    content: `
# Tencent Holdings (0700.HK): Recovery Story

Tencent กำลังฟื้นตัวหลังจากถูกกดดันจาก Regulation

## Business Segments
- **Gaming**: 32% of revenue (กลับมาเติบโต)
- **Social Networks**: WeChat, QQ
- **Online Advertising**: AI-powered ads
- **FinTech**: WeChat Pay
- **Cloud Services**: Growing

## Key Catalysts
1. Gaming license approvals resuming
2. AI integration across platforms
3. International gaming expansion
4. Share buyback program

## Valuation
- P/E: 15x (historically traded at 25x+)
- FCF Yield: 6%+
- Discount to intrinsic value: ~40%

**Rating**: Strong Buy
**Target**: HK$450 (35% upside)
`,
    ticker: {
      symbol: '0700.HK',
      companyName: 'Tencent Holdings Limited',
      market: 'ASIA',
      exchange: 'HKEX',
      sector: 'Communication',
      currentPrice: 333.20,
      priceChange: 2.8,
      currency: 'HKD',
    },
    category: 'Fundamental Analysis',
    priceTarget: {
      current: 333.20,
      target: 450.0,
      upside: 35.1,
      timeframe: '12 months',
    },
    analystRating: 'Strong Buy',
    author: additionalAuthors[1],
    publishedAt: '2024-12-07T09:00:00Z',
    readingTime: 6,
    tags: ['Tencent', 'Gaming', 'HongKong', 'Tech'],
  },
  {
    id: '10',
    slug: 'sp500-technical-outlook-2025',
    title: 'S&P 500: Technical Outlook สำหรับปี 2025',
    summary: 'วิเคราะห์ภาพรวมตลาดหุ้นสหรัฐผ่าน S&P 500 Index พร้อมจุดซื้อ-ขายสำหรับปี 2025',
    content: `
# S&P 500 Technical Analysis: 2025 Outlook

วิเคราะห์ทางเทคนิคสำหรับดัชนี S&P 500

## Current Status (Dec 2024)
- **Level**: 4,783
- **YTD**: +24%
- **Trend**: Uptrend intact
- **Volatility**: Moderate (VIX ~13)

## Technical Levels
### Support
- **Primary**: 4,650 (50-day MA)
- **Secondary**: 4,500 (100-day MA)
- **Major**: 4,200 (200-day MA)

### Resistance
- **Immediate**: 4,800
- **Next**: 5,000 (psychological)
- **Extended**: 5,200

## Sector Rotation
- **Outperforming**: Tech, Communication, Consumer Discretionary
- **Underperforming**: Energy, Utilities, Real Estate

## 2025 Forecast
- **Bull Case**: 5,400 (+13%)
- **Base Case**: 5,200 (+9%)
- **Bear Case**: 4,400 (-8%)

**Strategy**: Buy dips to 4,650-4,700 zone
`,
    ticker: {
      symbol: 'SPX',
      companyName: 'S&P 500 Index',
      market: 'US',
      exchange: 'NYSE',
      sector: 'Financial',
      currentPrice: 4783.0,
      priceChange: 0.5,
      currency: 'USD',
    },
    category: 'Technical Analysis',
    author: additionalAuthors[1],
    publishedAt: '2024-12-06T15:00:00Z',
    readingTime: 8,
    tags: ['S&P500', 'Index', 'Technical', 'Market Outlook'],
  },
]

// Combine all articles
import { mockArticles } from './mockArticles'
export const allArticles = [...mockArticles, ...additionalArticles]

// Update helper functions
export function getAllArticles() {
  return allArticles
}

export function getArticlesByMarket(market: string) {
  return allArticles.filter(article => article.ticker.market === market)
}

export function getArticlesByCategory(category: string) {
  return allArticles.filter(article => article.category === category)
}

export function getArticleBySlug(slug: string) {
  return allArticles.find(article => article.slug === slug)
}

export function getArticleById(id: string) {
  return allArticles.find(article => article.id === id)
}
