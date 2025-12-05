import { MarketSession, MarketStatus } from '../types';

/**
 * Returns a generic Date object where the local time components (hours, minutes)
 * match the wall-clock time in the target timezone.
 * 
 * Example: If it's 15:00 UTC and 10:00 EST. 
 * This returns a Date object where .getHours() is 10.
 * Useful for comparing generic open/close hours.
 */
const getZonedTime = (date: Date, timeZone: string): Date => {
  try {
    const str = date.toLocaleString('en-US', {
      timeZone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });
    return new Date(str);
  } catch (e) {
    console.error(`Invalid timezone: ${timeZone}`);
    return date; // Fallback
  }
};

const parseTime = (timeStr: string) => {
  const [h, m] = timeStr.split(':').map(Number);
  return { h, m };
};

export const getMarketStatus = (session: MarketSession): MarketStatus => {
  const now = new Date();
  
  // 1. Handle Continuous Markets
  if (session.id === 'crypto') return 'OPEN';

  // 2. Handle Forex Weekends (Simplified Global Rule: Closed Sat/Sun in UTC effectively)
  // Accurate Forex: Opens Sunday 5pm NY, Closes Friday 5pm NY.
  if (session.id === 'forex') {
    const nyTime = getZonedTime(now, 'America/New_York');
    const day = nyTime.getDay(); // 0=Sun, 6=Sat
    const hours = nyTime.getHours();
    
    // Closed Friday after 17:00
    if (day === 5 && hours >= 17) return 'CLOSED';
    // Closed all Saturday
    if (day === 6) return 'CLOSED';
    // Closed Sunday before 17:00
    if (day === 0 && hours < 17) return 'CLOSED';
    
    return 'OPEN';
  }

  // 3. Handle Standard Stock Exchanges with DST Support
  const zonedNow = getZonedTime(now, session.timezone);
  const day = zonedNow.getDay();

  // Closed Weekends
  if (day === 0 || day === 6) return 'CLOSED';

  const currentMinutes = zonedNow.getHours() * 60 + zonedNow.getMinutes();
  const { h: openH, m: openM } = parseTime(session.openLocal);
  const { h: closeH, m: closeM } = parseTime(session.closeLocal);
  
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;
  
  // Standard Day Session
  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    // Lunch break logic could go here for Tokyo/HK, keeping simple for now
    return 'OPEN';
  }

  // Pre-Market (1 Hour before open)
  const preMarketStart = openMinutes - 60;
  if (currentMinutes >= preMarketStart && currentMinutes < openMinutes) {
    return 'PRE-MARKET';
  }

  return 'CLOSED';
};

export const getStatusColor = (status: MarketStatus): string => {
  switch (status) {
    case 'OPEN': return 'text-accentGreen';
    case 'CLOSED': return 'text-accentRed';
    case 'PRE-MARKET': return 'text-accentYellow';
    default: return 'text-textSecondary';
  }
};

export const getSessionProgress = (session: MarketSession): number => {
  if (getMarketStatus(session) !== 'OPEN') return 0;
  if (session.id === 'crypto' || session.id === 'forex') return 100;

  const zonedNow = getZonedTime(new Date(), session.timezone);
  const currentMinutes = zonedNow.getHours() * 60 + zonedNow.getMinutes();
  
  const { h: openH, m: openM } = parseTime(session.openLocal);
  const { h: closeH, m: closeM } = parseTime(session.closeLocal);
  
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;
  
  const totalDuration = closeMinutes - openMinutes;
  const elapsed = currentMinutes - openMinutes;
  
  const pct = (elapsed / totalDuration) * 100;
  return Math.min(100, Math.max(0, pct));
};

export const getSessionCountdown = (session: MarketSession, now: Date): { label: string, value: string } => {
  if (session.id === 'crypto') return { label: 'Open', value: '24/7' };
  
  const status = getMarketStatus(session);
  const zonedNow = getZonedTime(now, session.timezone === 'UTC' ? 'America/New_York' : session.timezone); // Use NY for Forex logic
  
  // Forex Special Logic
  if (session.id === 'forex') {
     if (status === 'OPEN') return { label: 'Open', value: '24/5' };
     // If closed, it's weekend. Calculate time to Sunday 17:00 NY.
     // Simplified: Just show "Weekend"
     return { label: 'Closed', value: 'Weekend' };
  }

  const { h: openH, m: openM } = parseTime(session.openLocal);
  const { h: closeH, m: closeM } = parseTime(session.closeLocal);

  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;
  const currentMinutes = zonedNow.getHours() * 60 + zonedNow.getMinutes();
  const currentSeconds = zonedNow.getSeconds();

  let targetMinutes = 0;
  let label = '';
  let dayOffset = 0; // 0 = today, 1 = tomorrow

  if (status === 'OPEN') {
    label = 'Closes in';
    targetMinutes = closeMinutes;
    // Closing later today
  } else if (status === 'PRE-MARKET') {
    label = 'Opens in';
    targetMinutes = openMinutes;
  } else {
    // CLOSED
    label = 'Opens in';
    targetMinutes = openMinutes;
    if (currentMinutes >= openMinutes) {
       // It's after open, but we are closed, so it must be after close or weekend
       dayOffset = 1; 
       // Note: Logic for Friday -> Monday skip omitted for brevity, handles simpler daily cycle
    }
  }

  // Calculate Difference in seconds
  // Convert everything to seconds from start of day to calculate delta
  let targetTotalSeconds = (targetMinutes * 60) + (dayOffset * 24 * 60 * 60);
  let currentTotalSeconds = (currentMinutes * 60) + currentSeconds;
  
  let diffSeconds = targetTotalSeconds - currentTotalSeconds;
  
  if (diffSeconds < 0) {
     // Safety fallback if logic slips
     diffSeconds += 24 * 60 * 60;
  }

  const h = Math.floor(diffSeconds / 3600);
  const m = Math.floor((diffSeconds % 3600) / 60);
  const s = Math.floor(diffSeconds % 60);

  const format = (n: number) => n.toString().padStart(2, '0');
  
  return {
    label,
    value: `${format(h)}:${format(m)}:${format(s)}`
  };
};