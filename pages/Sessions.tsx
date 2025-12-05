import React, { useState, useEffect } from 'react';
import { MARKET_SESSIONS } from '../constants';
import { getMarketStatus, getStatusColor, getSessionCountdown, getSessionProgress } from '../services/marketService';
import { Logo } from '../components/Logo';

export const Sessions: React.FC = () => {
  const [now, setNow] = useState(new Date());
  const [useLocalTime, setUseLocalTime] = useState(true);
  const [filters, setFilters] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    
    const saved = localStorage.getItem('tx_session_filters');
    if (saved) {
      setFilters(JSON.parse(saved));
    } else {
      const defaults: Record<string, boolean> = {};
      MARKET_SESSIONS.forEach(s => defaults[s.id] = true);
      setFilters(defaults);
    }

    return () => clearInterval(timer);
  }, []);

  const toggleTimezone = () => setUseLocalTime(!useLocalTime);

  const displayTime = useLocalTime 
    ? now.toLocaleTimeString([], { hour12: false }) 
    : now.toISOString().slice(11, 19);

  const displayDate = useLocalTime
    ? now.toLocaleDateString()
    : now.toUTCString().slice(0, 16);

  const zoneLabel = useLocalTime ? 'Local' : 'UTC';

  const visibleSessions = MARKET_SESSIONS.filter(s => filters[s.id] !== false);

  // Group Active Sessions logic
  // "on active, list the market that is active, say forex, stocks"
  const activeTypes = new Set<string>();
  visibleSessions.forEach(s => {
    if (getMarketStatus(s) === 'OPEN') {
      if (s.id === 'forex') activeTypes.add('FOREX');
      else if (s.id === 'crypto') activeTypes.add('CRYPTO');
      else activeTypes.add('STOCKS');
    }
  });
  
  const activeString = activeTypes.size > 0 ? Array.from(activeTypes).join(', ') : 'NONE';
  
  // Find next opening
  const nextOpening = visibleSessions
    .filter(s => getMarketStatus(s) !== 'OPEN' && s.id !== 'crypto' && s.id !== 'forex')
    .map(s => ({ s, cd: getSessionCountdown(s, now) }))
    .sort((a, b) => a.cd.value.localeCompare(b.cd.value))[0];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      
      {/* Header */}
      <div className="border-b border-border px-4 py-3 flex justify-between items-center bg-black shrink-0">
        <div className="flex items-center">
          <Logo size={32} />
        </div>
        <button 
          onClick={toggleTimezone}
          className="text-[10px] font-bold text-accentBlue bg-accentBlue/10 px-3 py-1.5 rounded-full hover:bg-accentBlue/20 transition-colors border border-accentBlue/20"
        >
          {zoneLabel}
        </button>
      </div>

      {/* Dashboard Hero */}
      <div className="py-2 border-b border-border bg-surface/5 shrink-0 flex flex-col gap-2">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-[9px] font-black tracking-[0.2em] text-textSecondary uppercase mb-0.5">
            GLOBAL MARKET HOURS
          </h2>
          
          <div className="flex flex-col items-center">
            <span className="text-3xl font-mono font-bold tracking-tighter text-textPrimary leading-none">
              {displayTime}
            </span>
            <div className="flex gap-2 items-center mt-0.5">
               <span className="text-accentGreen font-bold text-[9px] uppercase tracking-widest">{zoneLabel}</span>
               <span className="text-textSecondary text-[9px]">•</span>
               <span className="text-textSecondary text-[9px]">{displayDate}</span>
            </div>
          </div>
        </div>

        {/* Active / Next Summary Line */}
        <div className="flex items-center justify-center gap-4 px-4 text-[10px] font-mono border-t border-border/30 pt-1 mt-1">
            <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${activeTypes.size > 0 ? 'bg-accentGreen animate-pulse' : 'bg-accentRed'}`}></div>
                <span className="text-textSecondary uppercase tracking-wide">Active:</span>
                <span className="font-bold text-textPrimary max-w-[150px] truncate">{activeString}</span>
            </div>
            {nextOpening && (
                <div className="hidden xs:flex items-center gap-1.5 pl-4 border-l border-border/30">
                    <span className="text-textSecondary uppercase tracking-wide">Next:</span>
                    <span className="font-bold text-textPrimary">{nextOpening.s.name} in {nextOpening.cd.value.split(':')[0]}h</span>
                </div>
            )}
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="divide-y divide-border flex-1 overflow-y-auto min-h-0">
        {visibleSessions.length > 0 ? visibleSessions.map((session) => {
          const status = getMarketStatus(session);
          const colorClass = getStatusColor(status);
          const countdown = getSessionCountdown(session, now);
          const progress = getSessionProgress(session);
          
          return (
            <div key={session.id} className="relative p-3 hover:bg-white/[0.03] transition-colors cursor-pointer flex justify-between items-center group h-auto min-h-[50px]">
               {/* Progress Line Background */}
               {status === 'OPEN' && session.id !== 'crypto' && session.id !== 'forex' && (
                   <div className="absolute bottom-0 left-0 h-[2px] bg-accentGreen/20 w-full z-0">
                       <div className="h-full bg-accentGreen" style={{ width: `${progress}%` }}></div>
                   </div>
               )}

               <div className="flex gap-3 items-center z-10">
                  <div className={`w-8 h-8 rounded-full border border-border flex items-center justify-center font-bold text-[10px] bg-black group-hover:bg-surface transition-colors`}>
                    {session.id.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2">
                       <span className="font-bold text-textPrimary text-sm">{session.name}</span>
                       <span className="text-textSecondary text-[9px] px-1 rounded border border-border">
                         {session.timezone.split('/')[1]?.replace('_', ' ') || session.timezone}
                       </span>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-textSecondary text-[10px]">{session.region}</span>
                      <span className="text-textSecondary text-[10px] opacity-50">• {session.openLocal}-{session.closeLocal}</span>
                    </div>
                  </div>
               </div>

               <div className="flex flex-col items-end justify-center z-10">
                 <div className="flex items-center gap-2">
                    <div className={`font-mono font-bold text-[9px] px-2 py-0.5 rounded-full bg-white/5 ${colorClass}`}>
                        {status}
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[9px] text-textSecondary uppercase tracking-wider">{countdown.label}</span>
                    <span className="font-mono text-[10px] font-bold text-textPrimary tabular-nums">
                        {countdown.value}
                    </span>
                 </div>
               </div>
            </div>
          );
        }) : (
           <div className="flex h-full items-center justify-center text-textSecondary text-sm p-4 text-center">
              All exchanges hidden. Check Settings.
           </div>
        )}
      </div>
      
      {/* Sticky Ad */}
      <div className="p-3 border-t border-border bg-black shrink-0 mt-auto">
         <div className="bg-accentGreen/5 border border-accentGreen/20 rounded-lg p-2.5 flex justify-between items-center gap-3">
            <div className="flex flex-col">
                <h3 className="font-bold text-accentGreen text-xs">Get Funded $200k</h3>
                <p className="text-[10px] text-textSecondary leading-tight">Trade NYSE & Forex with our capital.</p>
            </div>
            <a href="#/firms" className="whitespace-nowrap bg-accentGreen text-white font-bold px-3 py-1.5 rounded-full text-xs hover:opacity-90">
               Apply
            </a>
         </div>
      </div>
    </div>
  );
};