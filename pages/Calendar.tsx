import React from 'react';
import { EconomicEvent } from '../types';

const MOCK_EVENTS: EconomicEvent[] = [
  { id: '1', time: '08:30', currency: 'USD', event: 'Core CPI (MoM)', impact: 'HIGH', previous: '0.3%', forecast: '0.3%' },
  { id: '2', time: '08:30', currency: 'USD', event: 'CPI (YoY)', impact: 'HIGH', previous: '3.4%', forecast: '3.1%' },
  { id: '3', time: '10:00', currency: 'USD', event: 'Crude Oil Inventories', impact: 'MEDIUM', previous: '5.5M', forecast: '2.1M' },
  { id: '4', time: '14:00', currency: 'USD', event: 'Fed Interest Rate Decision', impact: 'HIGH', previous: '5.50%', forecast: '5.50%' },
  { id: '5', time: '14:30', currency: 'USD', event: 'FOMC Press Conference', impact: 'HIGH' },
];

const ImpactBadge: React.FC<{ impact: 'HIGH' | 'MEDIUM' | 'LOW' }> = ({ impact }) => {
  const colors = {
    HIGH: 'bg-accentRed text-white',
    MEDIUM: 'bg-accentYellow text-black',
    LOW: 'bg-textSecondary text-white',
  };
  
  return (
    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${colors[impact]}`}>
      {impact}
    </span>
  );
};

export const Calendar: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-border px-4 py-3">
        <h1 className="text-xl font-bold">Economic Calendar</h1>
      </div>

      <div className="p-4 bg-surface/30 text-sm text-textSecondary flex justify-between items-center border-b border-border">
         <span>Today, Oct 24</span>
         <button className="text-accentBlue font-bold">Filter</button>
      </div>

      <div className="flex flex-col">
        {MOCK_EVENTS.map((evt) => (
          <div key={evt.id} className="p-4 border-b border-border hover:bg-white/[0.03] flex items-center gap-4">
             <div className="flex flex-col items-center w-12 shrink-0">
               <span className="text-textPrimary font-bold">{evt.time}</span>
               <span className="text-xs text-textSecondary">{evt.currency}</span>
             </div>
             
             <div className="w-1 bg-border h-8 mx-2 rounded-full"></div>

             <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-textPrimary">{evt.event}</span>
                  <ImpactBadge impact={evt.impact} />
                </div>
                <div className="flex gap-4 text-xs text-textSecondary font-mono">
                  {evt.actual && <span>Act: <span className="text-accentGreen">{evt.actual}</span></span>}
                  {evt.forecast && <span>Fcst: {evt.forecast}</span>}
                  {evt.previous && <span>Prev: {evt.previous}</span>}
                </div>
             </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 text-center text-textSecondary text-sm">
        Data provided by Investing.com
      </div>
    </div>
  );
};