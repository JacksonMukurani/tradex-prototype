import React, { useState } from 'react';
import { FIRMS_DATA, BROKERS_DATA } from '../constants';
import { Firm } from '../types';
import { CheckCircle2, ChevronDown } from 'lucide-react';

const FirmCard: React.FC<{ firm: Firm }> = ({ firm }) => {
  const isProp = firm.type === 'prop';
  
  return (
    <div className="p-4 border-b border-border hover:bg-white/[0.03] transition-colors flex gap-3">
      {/* Avatar */}
      <div className="shrink-0">
         <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${isProp ? 'bg-accentGreen/20 text-accentGreen' : 'bg-accentBlue/20 text-accentBlue'}`}>
            {firm.name[0]}
         </div>
      </div>

      <div className="flex-1">
         {/* Header */}
         <div className="flex justify-between items-start">
            <div className="flex flex-col">
               <div className="flex items-center gap-1">
                 <h3 className="font-bold text-textPrimary text-base hover:underline">{firm.name}</h3>
                 <CheckCircle2 size={16} className="text-accentBlue fill-black" />
               </div>
               <span className="text-sm text-textSecondary">{firm.headquarters} • Est. {firm.founded}</span>
            </div>
            
            <a 
              href={firm.affiliateUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-textPrimary text-black font-bold text-sm px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity flex items-center gap-1"
            >
               {isProp ? 'Start Challenge' : 'Open Account'}
            </a>
         </div>

         {/* Stats Grid */}
         <div className="mt-3 grid grid-cols-2 gap-2">
            {isProp ? (
              <>
                <div className="bg-surface rounded-lg p-2 border border-border">
                   <div className="text-xs text-textSecondary uppercase">Cost</div>
                   <div className="font-mono text-sm text-accentGreen font-bold">{firm.challengeFee}</div>
                </div>
                <div className="bg-surface rounded-lg p-2 border border-border">
                   <div className="text-xs text-textSecondary uppercase">Split</div>
                   <div className="font-mono text-sm text-textPrimary font-bold">{firm.profitSplit}</div>
                </div>
              </>
            ) : (
              <>
                 <div className="bg-surface rounded-lg p-2 border border-border col-span-2">
                   <div className="text-xs text-textSecondary uppercase">Regulated By</div>
                   <div className="font-mono text-sm text-textPrimary font-bold truncate">
                      {firm.regulators?.join(', ')}
                   </div>
                </div>
              </>
            )}
         </div>
      </div>
    </div>
  );
};

export const Firms: React.FC = () => {
  const [showAllProp, setShowAllProp] = useState(false);

  // Show only first 2 unless expanded
  const displayedPropFirms = showAllProp ? FIRMS_DATA : FIRMS_DATA.slice(0, 2);
  const hiddenCount = FIRMS_DATA.length - 2;

  return (
    <div>
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-border px-4 py-3">
        <h1 className="text-xl font-bold">Funding & Brokers</h1>
      </div>

      {/* Prop Firms Section */}
      <div className="bg-surface/20 border-b border-border py-2 px-4 font-bold text-accentGreen text-sm uppercase tracking-wide">
         Prop Trading Firms
      </div>
      <div>
        {displayedPropFirms.map(firm => <FirmCard key={firm.id} firm={firm} />)}
      </div>

      {!showAllProp && hiddenCount > 0 && (
        <button 
          onClick={() => setShowAllProp(true)}
          className="w-full py-4 flex items-center justify-center gap-2 text-accentBlue font-bold text-sm hover:bg-surface/50 transition-colors border-b border-border"
        >
          <span>Show {hiddenCount} more firms</span>
          <ChevronDown size={16} />
        </button>
      )}

      {/* Brokers Section */}
      <div className="bg-surface/20 border-b border-border py-2 px-4 font-bold text-accentBlue text-sm uppercase tracking-wide mt-2">
         Traditional Brokers
      </div>
      <div className="pb-20">
        {BROKERS_DATA.map(firm => <FirmCard key={firm.id} firm={firm} />)}
      </div>
      
      <div className="p-6 text-center text-xs text-textSecondary">
        <p>Disclaimer: We may earn a commission when you click on links.</p>
        <p className="mt-1">Trading involves risk. Invest responsibly.</p>
      </div>
    </div>
  );
};