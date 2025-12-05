import React, { useState, useEffect } from 'react';
import { MARKET_SESSIONS } from '../constants';

const Toggle: React.FC<{ label: string; checked: boolean; onChange: () => void }> = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between p-4 border-b border-border">
    <span className="text-textPrimary font-medium">{label}</span>
    <button 
      onClick={onChange}
      className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${checked ? 'bg-accentGreen' : 'bg-surface border border-border'}`}
    >
      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </button>
  </div>
);

export const Settings: React.FC = () => {
  // General Alerts state
  const [alerts, setAlerts] = useState({
    exchangeOpen: true,
    news: false,
    session: true
  });

  // News Filtering state
  const [hideLowImpact, setHideLowImpact] = useState(() => {
    return localStorage.getItem('tx_news_hide_low') === 'true';
  });

  // Load session filters from local storage or default to all true
  const [sessionFilters, setSessionFilters] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('tx_session_filters');
    if (saved) {
      return JSON.parse(saved);
    }
    // Default all true
    const defaults: Record<string, boolean> = {};
    MARKET_SESSIONS.forEach(s => defaults[s.id] = true);
    return defaults;
  });

  // Save Session filters when changed
  useEffect(() => {
    localStorage.setItem('tx_session_filters', JSON.stringify(sessionFilters));
  }, [sessionFilters]);

  // Save News filter when changed
  useEffect(() => {
    localStorage.setItem('tx_news_hide_low', String(hideLowImpact));
  }, [hideLowImpact]);

  const toggleSession = (id: string) => {
    setSessionFilters(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="pb-20">
       <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-border px-4 py-3">
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      {/* Notifications Section */}
      <div className="bg-surface/20 border-b border-border py-2 px-4 font-bold text-textSecondary text-sm uppercase tracking-wide">
         Alerts & Preferences
      </div>

      <Toggle 
        label="Exchange Open Alerts" 
        checked={alerts.exchangeOpen} 
        onChange={() => setAlerts(p => ({...p, exchangeOpen: !p.exchangeOpen}))} 
      />
      <Toggle 
        label="Hide Low Impact News" 
        checked={hideLowImpact} 
        onChange={() => setHideLowImpact(!hideLowImpact)} 
      />
      <Toggle 
        label="Session Bells" 
        checked={alerts.session} 
        onChange={() => setAlerts(p => ({...p, session: !p.session}))} 
      />

      {/* Session Filter Section */}
      <div className="bg-surface/20 border-b border-border py-2 px-4 font-bold text-textSecondary text-sm uppercase tracking-wide mt-6">
         Market Sessions Visibility
      </div>
      
      {MARKET_SESSIONS.map(session => (
        <Toggle
          key={session.id}
          label={`${session.name} (${session.region})`}
          checked={sessionFilters[session.id] ?? true}
          onChange={() => toggleSession(session.id)}
        />
      ))}

      <div className="p-4 text-sm text-textSecondary mt-4">
        <p>All alerts are processed locally in your browser. No personal data is sent to our servers.</p>
        <p className="mt-4">Version 1.0.0 (Web Beta)</p>
      </div>
    </div>
  );
};