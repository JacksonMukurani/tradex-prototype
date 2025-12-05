import { Firm, MarketSession, NewsItem } from './types';

// ==========================================
// AFFILIATE DATA - ACTION REQUIRED
// Replace placeholders with your actual links
// ==========================================

export const FIRMS_DATA: Firm[] = [
  {
    id: "ftmo",
    name: "FTMO",
    headquarters: "Prague, Czech Republic",
    challengeFee: "$155-$250",
    profitSplit: "80-90%",
    founded: 2015,
    type: "prop",
    affiliateUrl: "https://ftmo.com/?ref=YOUR_NAME" // ← REPLACE THIS
  },
  {
    id: "topstep",
    name: "Topstep",
    headquarters: "Chicago, USA",
    challengeFee: "$165-$375",
    profitSplit: "80-90%",
    founded: 2012,
    type: "prop",
    affiliateUrl: "https://topstep.com/r/YOUR_ID" // ← REPLACE THIS
  },
  {
    id: "myforexfunds",
    name: "My Forex Funds",
    headquarters: "Toronto, Canada",
    challengeFee: "$84-$1,200",
    profitSplit: "75-85%",
    founded: 2020,
    type: "prop",
    affiliateUrl: "https://myforexfunds.com/affiliate/YOUR_CODE" // ← REPLACE THIS
  },
  {
    id: "the5ers",
    name: "The5ers",
    headquarters: "London, UK",
    challengeFee: "$95-$495",
    profitSplit: "50-100%",
    founded: 2019,
    type: "prop",
    affiliateUrl: "https://the5ers.com/ref/YOUR_NAME" // ← REPLACE THIS
  },
  {
    id: "e8markets",
    name: "E8 Markets",
    headquarters: "Dallas, USA",
    challengeFee: "$138-$998",
    profitSplit: "80%",
    founded: 2021,
    type: "prop",
    affiliateUrl: "https://e8funding.com/affiliate/YOUR_ID" // ← REPLACE THIS
  },
  {
    id: "fundednext",
    name: "FundedNext",
    headquarters: "Dubai, UAE",
    challengeFee: "$99-$999",
    profitSplit: "60-90%",
    founded: 2022,
    type: "prop",
    affiliateUrl: "https://fundednext.com/ref/YOUR_CODE" // ← REPLACE THIS
  }
];

export const BROKERS_DATA: Firm[] = [
  {
    id: "ig",
    name: "IG Markets",
    headquarters: "London, UK",
    regulators: ["FCA", "ASIC"],
    founded: 1974,
    type: "broker",
    affiliateUrl: "YOUR_IG_LINK" // ← REPLACE THIS
  },
  {
    id: "etoro",
    name: "eToro",
    headquarters: "Tel Aviv, Israel",
    regulators: ["FCA", "CySEC"],
    founded: 2007,
    type: "broker",
    affiliateUrl: "YOUR_ETORO_LINK" // ← REPLACE THIS
  },
  {
    id: "icmarkets",
    name: "IC Markets",
    headquarters: "Sydney, Australia",
    regulators: ["ASIC", "CySEC"],
    founded: 2007,
    type: "broker",
    affiliateUrl: "YOUR_ICM_LINK" // ← REPLACE THIS
  },
  {
    id: "pepperstone",
    name: "Pepperstone",
    headquarters: "Melbourne, Australia",
    regulators: ["ASIC", "FCA"],
    founded: 2010,
    type: "broker",
    affiliateUrl: "YOUR_PEPPERSTONE_LINK" // ← REPLACE THIS
  }
];

// ==========================================
// SESSION DATA (DST AWARE)
// ==========================================

export const MARKET_SESSIONS: MarketSession[] = [
  { 
    id: 'nyse', 
    name: 'NYSE', 
    region: 'New York', 
    openLocal: '09:30', 
    closeLocal: '16:00', 
    timezone: 'America/New_York' 
  },
  { 
    id: 'london', 
    name: 'LSE', 
    region: 'London', 
    openLocal: '08:00', 
    closeLocal: '16:30', 
    timezone: 'Europe/London' 
  },
  { 
    id: 'tokyo', 
    name: 'TSE', 
    region: 'Tokyo', 
    openLocal: '09:00', 
    closeLocal: '15:00', 
    timezone: 'Asia/Tokyo' 
  },
  { 
    id: 'hk', 
    name: 'HKEX', 
    region: 'Hong Kong', 
    openLocal: '09:30', 
    closeLocal: '16:00', 
    timezone: 'Asia/Hong_Kong' 
  },
  { 
    id: 'forex', 
    name: 'FOREX', 
    region: 'Global', 
    openLocal: '00:00', // Technically opens Sunday 5PM EST, handled in logic
    closeLocal: '24:00', 
    timezone: 'UTC' 
  }, 
  { 
    id: 'crypto', 
    name: 'CRYPTO', 
    region: '24/7', 
    openLocal: '00:00', 
    closeLocal: '24:00', 
    timezone: 'UTC' 
  },
];

// ==========================================
// NEWS DATA
// ==========================================

const now = Date.now();
const minute = 60 * 1000;
const hour = 60 * minute;

export const MOCK_NEWS: (NewsItem & { timestamp: number })[] = [
  {
    id: '1',
    title: 'Jerome Powell hints at possible rate pauses in upcoming FOMC meeting.',
    source: 'ForexLive',
    timeAgo: '2m',
    category: 'ECONOMY',
    impact: 'HIGH',
    timestamp: now - 2 * minute
  },
  {
    id: '2',
    title: 'Bitcoin surges past $65,000 as ETF inflows reach record highs.',
    source: 'CoinDesk',
    timeAgo: '15m',
    category: 'CRYPTO',
    impact: 'HIGH',
    timestamp: now - 15 * minute
  },
  {
    id: '3',
    title: 'EUR/USD facing resistance at 1.0900 amidst weak German manufacturing data.',
    source: 'FXStreet',
    timeAgo: '32m',
    category: 'FOREX',
    impact: 'MEDIUM',
    timestamp: now - 32 * minute
  },
  {
    id: '4',
    title: 'Topstep announces new "X" account type with 95% profit split.',
    source: 'PropNews',
    timeAgo: '1h',
    category: 'STOCKS',
    impact: 'LOW',
    isAd: true,
    timestamp: now - 1 * hour
  },
  {
    id: '5',
    title: 'Oil prices drop as OPEC+ production cuts fail to meet market expectations.',
    source: 'Investing.com',
    timeAgo: '1h',
    category: 'ECONOMY',
    impact: 'MEDIUM',
    timestamp: now - 1.1 * hour
  },
  {
    id: '6',
    title: 'NVIDIA quarterly earnings beat estimates by 15%, shares up 4% pre-market.',
    source: 'Bloomberg',
    timeAgo: '2h',
    category: 'STOCKS',
    impact: 'HIGH',
    timestamp: now - 2 * hour
  },
  {
    id: '7',
    title: 'Small cap index sees minor correction in early trading session.',
    source: 'MarketWatch',
    timeAgo: '3h',
    category: 'STOCKS',
    impact: 'LOW',
    timestamp: now - 3 * hour
  }
];