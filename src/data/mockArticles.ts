import { StockArticle, Author } from '@/types'

// Mock authors
const authors: Author[] = [
  {
    id: '1',
    name: 'สมชาย วิเคราะห์หุ้น',
    title: 'Senior Market Analyst',
    bio: 'ผู้เชี่ยวชาญด้านการวิเคราะห์หุ้นต่างประเทศ มีประสบการณ์กว่า 15 ปี',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    title: 'Chief Investment Strategist',
    bio: 'Specializing in US tech stocks and growth investing strategies',
  },
  {
    id: '3',
    name: 'วรรณา เทรดเดอร์',
    title: 'Technical Analysis Expert',
    bio: 'ผู้เชี่ยวชาญด้าน Technical Analysis และการเทรดระยะสั้น',
  },
]

// Mock stock articles
export const mockArticles: StockArticle[] = [
  {
    id: '1',
    slug: 'apple-aapl-q4-earnings-analysis',
    title: 'Apple (AAPL): วิเคราะห์ผลประกอบการ Q4 และแนวโน้มปี 2025',
    summary: 'Apple ประกาศผลประกอบการ Q4 ที่แข็งแกร่ง โดดเด่นที่ยอดขาย iPhone และ Services เติบโตต่อเนื่อง มีโอกาสทะลุ $200 ในปี 2025',
    content: `
# Apple (AAPL): วิเคราะห์ผลประกอบการ Q4

Apple Inc. เปิดเผยผลประกอบการไตรมาสที่ 4 ปี 2024 ที่แข็งแกร่ง โดยมีรายได้รวม $124.3 พันล้านดอลลาร์ เติบโต 8% YoY

## ไฮไลท์สำคัญ
- ยอดขาย iPhone เติบโต 6% ถึง $69.7 พันล้านดอลลาร์
- Services revenue สูงถึง $25.3 พันล้านดอลลาร์ (+12% YoY)
- Gross margin ที่ 46.2% สูงกว่าที่ตลาดคาดการณ์
- ประกาศโปรแกรม Buyback เพิ่ม $110 พันล้านดอลลาร์

## การวิเคราะห์
Apple ยังคงแข็งแกร่งในฐานะผู้นำตลาด smartphone และมี ecosystem ที่แข็งแกร่ง ธุรกิจ Services เติบโตอย่างต่อเนื่องและมี margin สูง

### จุดแข็ง
1. Brand loyalty สูง
2. Ecosystem ที่ครบวงจร
3. Cash flow แข็งแกร่ง
4. Innovation ต่อเนื่อง (Vision Pro, Apple Intelligence)

### ความเสี่ยง
1. การพึ่งพา China market
2. แรงกดดันจาก Regulation
3. การแข่งขันที่รุนแรงขึ้น

## Recommendation: BUY
ราคาเป้าหมาย $210 (Upside 15%)
`,
    ticker: {
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      market: 'US',
      exchange: 'NASDAQ',
      sector: 'Technology',
      currentPrice: 182.45,
      priceChange: 2.3,
      currency: 'USD',
    },
    category: 'Earnings Report',
    priceTarget: {
      current: 182.45,
      target: 210.0,
      upside: 15.1,
      timeframe: '12 months',
    },
    analystRating: 'Buy',
    author: authors[0],
    publishedAt: '2024-12-15T10:00:00Z',
    readingTime: 8,
    tags: ['AAPL', 'Tech', 'iPhone', 'Earnings', 'US Stocks'],
    metaDescription: 'วิเคราะห์ผลประกอบการ Q4 ของ Apple และแนวโน้มในปี 2025',
  },
  {
    id: '2',
    slug: 'nvidia-nvda-ai-chip-dominance',
    title: 'NVIDIA (NVDA): The AI Chip King - Technical Analysis',
    summary: 'NVIDIA continues its dominance in AI chip market. Technical analysis shows strong momentum with potential breakout above $500.',
    content: `
# NVIDIA (NVDA): AI Chip Market Dominance

NVIDIA maintains its position as the leading AI chip manufacturer, with data center revenue reaching record highs.

## Technical Analysis

### Chart Pattern
- Strong uptrend since October 2024
- Trading above all major moving averages (50, 100, 200-day)
- RSI at 68 (not overbought yet)
- MACD showing bullish crossover

### Support & Resistance
- **Support**: $450 (previous breakout level)
- **Resistance**: $500 (psychological level)
- **Next Target**: $550

### Trading Volume
Volume has been consistently high, confirming the uptrend strength.

## Fundamental Highlights
- Data Center revenue: $18.4B (+279% YoY)
- AI chip market share: >80%
- H100/H200 chips in high demand
- Partnerships with major cloud providers

## Trading Strategy
**Entry**: $470-480 on pullbacks
**Stop Loss**: $445
**Target**: $550 (15-20% upside)

**Risk/Reward**: Favorable at 1:3 ratio
`,
    ticker: {
      symbol: 'NVDA',
      companyName: 'NVIDIA Corporation',
      market: 'US',
      exchange: 'NASDAQ',
      sector: 'Technology',
      currentPrice: 478.32,
      priceChange: 3.7,
      currency: 'USD',
    },
    category: 'Technical Analysis',
    priceTarget: {
      current: 478.32,
      target: 550.0,
      upside: 15.0,
      timeframe: '6 months',
    },
    analystRating: 'Strong Buy',
    author: authors[2],
    publishedAt: '2024-12-14T14:30:00Z',
    readingTime: 6,
    tags: ['NVDA', 'AI', 'Technical Analysis', 'Semiconductor'],
  },
  {
    id: '3',
    slug: 'tsla-tesla-cybertruck-production-ramp',
    title: 'Tesla (TSLA): Cybertruck กำลังผลิตเพิ่ม - โอกาสซื้อก่อน Rally?',
    summary: 'Tesla เร่งกำลังผลิต Cybertruck และขยาย Gigafactory ทั่วโลก มีโอกาสเห็น Rally ใหม่หลังปรับฐานมา 3 เดือน',
    content: `
# Tesla (TSLA): Cybertruck Production Ramp-Up

Tesla กำลังเพิ่มกำลังผลิต Cybertruck และมีแผนขยาย Gigafactory ในเอเชีย

## การวิเคราะห์ปัจจัยพื้นฐาน

### Cybertruck Production
- เป้าหมาย: 250,000 units/year ในปี 2025
- Current run rate: ~125,000 units/year
- Pre-orders: >1.9 million units

### Gigafactory Expansion
- **Shanghai**: ขยายกำลังการผลิต +50%
- **Berlin**: เพิ่ม Model Y production
- **Texas**: Focus on Cybertruck
- **Mexico**: Breaking ground in Q1 2025

### Financial Metrics
- P/E Ratio: 45x (ลดลงจาก 80x ปีที่แล้ว)
- Revenue Growth: 18% YoY predicted
- Operating Margin: 15.5%

## Catalyst ที่ต้องจับตา
1. Cybertruck delivery numbers (Q4 2024)
2. FSD (Full Self-Driving) subscription growth
3. Energy storage business expansion
4. China market share recovery

## การวิเคราะห์ทางเทคนิค
- หุ้นปรับฐานมา 3 เดือน (จาก $265 → $220)
- ใกล้ support zone ที่ $215-220
- Volume ลดลง = โอกาส accumulation

## Investment Thesis
Tesla ยังคงเป็นผู้นำตลาด EV และมี optionality จาก AI/Robotics

**Rating**: HOLD → BUY on dips below $220
**Price Target**: $285 (30% upside)
`,
    ticker: {
      symbol: 'TSLA',
      companyName: 'Tesla Inc.',
      market: 'US',
      exchange: 'NASDAQ',
      sector: 'Consumer',
      currentPrice: 238.45,
      priceChange: -1.2,
      currency: 'USD',
    },
    category: 'Fundamental Analysis',
    priceTarget: {
      current: 238.45,
      target: 285.0,
      upside: 19.5,
      timeframe: '12 months',
    },
    analystRating: 'Hold',
    author: authors[0],
    publishedAt: '2024-12-13T09:15:00Z',
    readingTime: 7,
    tags: ['TSLA', 'EV', 'Cybertruck', 'Growth Stock'],
  },
  {
    id: '4',
    slug: 'google-googl-gemini-ai-search',
    title: 'Alphabet (GOOGL): Gemini AI Integration Boosts Search Revenue',
    summary: 'Google\'s Gemini AI integration into Search is driving engagement and ad revenue. Strong Buy opportunity amid market consolidation.',
    content: `
# Alphabet (GOOGL): Gemini AI Transformation

Alphabet's integration of Gemini AI into Google Search is showing promising early results.

## Key Developments
- Gemini integration in Search (100M+ users)
- YouTube revenue growth acceleration
- Cloud platform gaining market share
- Android ecosystem strength

## Revenue Breakdown (Q3 2024)
- **Search & Ads**: $59.6B (+12% YoY)
- **YouTube**: $8.9B (+13% YoY)
- **Cloud**: $11.4B (+28% YoY)
- **Other**: $8.3B

## Competitive Position
- Search market share: 91%
- YouTube: #1 video platform
- Cloud: #3 player (gaining ground)
- Android: 70%+ smartphone OS share

## Valuation Analysis
- **P/E**: 23x (below 5-year average of 27x)
- **FCF Yield**: 5.2%
- **EV/EBITDA**: 12x

Undervalued compared to peers (MSFT, META)

## Investment Outlook
Strong fundamentals + attractive valuation = compelling opportunity

**Rating**: Strong Buy
**Target**: $165 (20% upside from $137)
`,
    ticker: {
      symbol: 'GOOGL',
      companyName: 'Alphabet Inc.',
      market: 'US',
      exchange: 'NASDAQ',
      sector: 'Communication',
      currentPrice: 137.28,
      priceChange: 1.8,
      currency: 'USD',
    },
    category: 'Fundamental Analysis',
    priceTarget: {
      current: 137.28,
      target: 165.0,
      upside: 20.2,
      timeframe: '12 months',
    },
    analystRating: 'Strong Buy',
    author: authors[1],
    publishedAt: '2024-12-12T11:00:00Z',
    readingTime: 5,
    tags: ['GOOGL', 'AI', 'Search', 'Cloud'],
  },
  {
    id: '5',
    slug: 'msft-microsoft-azure-growth',
    title: 'Microsoft (MSFT): Azure และ AI กำลังขับเคลื่อนการเติบโต',
    summary: 'Microsoft Azure เติบโต 30% YoY พร้อม AI integration ใน Office 365 ที่ได้รับการตอบรับดี',
    content: `
# Microsoft (MSFT): Azure & AI Growth Story

Microsoft ยังคงเติบโตแข็งแกร่งจาก Cloud และ AI

## Azure Cloud Platform
- Revenue growth: +30% YoY
- Market share: 24% (#2 after AWS)
- AI services: High demand
- Enterprise customers: Growing

## AI Integration
- **Copilot for Microsoft 365**: 1M+ subscribers
- **Azure OpenAI**: Strong adoption
- **Bing Chat**: Market share gains

## Financial Performance
- Total Revenue: $62.0B (+13% YoY)
- Operating Income: $27.9B
- EPS: $2.99 (beat estimate)

**Rating**: Buy
**Target**: $420 (12% upside)
`,
    ticker: {
      symbol: 'MSFT',
      companyName: 'Microsoft Corporation',
      market: 'US',
      exchange: 'NASDAQ',
      sector: 'Technology',
      currentPrice: 374.58,
      priceChange: 0.9,
      currency: 'USD',
    },
    category: 'Earnings Report',
    priceTarget: {
      current: 374.58,
      target: 420.0,
      upside: 12.1,
      timeframe: '12 months',
    },
    analystRating: 'Buy',
    author: authors[0],
    publishedAt: '2024-12-11T10:30:00Z',
    readingTime: 6,
    tags: ['MSFT', 'Azure', 'Cloud', 'AI'],
  },
]

// Export the articles array for use in index.ts
// Helper functions moved to mockArticles2.ts to avoid duplication
