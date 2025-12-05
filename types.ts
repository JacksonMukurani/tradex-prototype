export type MarketStatus = 'OPEN' | 'CLOSED' | 'PRE-MARKET';

export interface MarketSession {
  id: string;
  name: string;
  region: string;
  openLocal: string; // Format "HH:mm" 24h e.g. "09:30"
  closeLocal: string; // Format "HH:mm" 24h e.g. "16:00"
  timezone: string; // IANA Timezone e.g. "America/New_York"
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  category: 'FOREX' | 'CRYPTO' | 'STOCKS' | 'ECONOMY';
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  isAd?: boolean;
  timestamp?: number;
}

export interface EconomicEvent {
  id: string;
  time: string;
  currency: string;
  event: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  actual?: string;
  forecast?: string;
  previous?: string;
}

export interface Firm {
  id: string;
  name: string;
  headquarters: string;
  founded: number;
  type: 'prop' | 'broker';
  affiliateUrl: string;
  // Prop specific
  challengeFee?: string;
  profitSplit?: string;
  // Broker specific
  regulators?: string[];
}