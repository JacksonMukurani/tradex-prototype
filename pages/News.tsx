import React, { useState, useEffect } from 'react';
import { NewsItem } from '../types';
import { MOCK_NEWS } from '../constants';

const NewsCard: React.FC<{ item: NewsItem }> = ({ item }) => (
  <article className="p-4 border-b border-border hover:bg-white/[0.03] transition-colors cursor-default">
    {item.isAd && (
      <div className="flex items-center text-textSecondary text-xs font-bold mb-1 gap-1">
        <span className="bg-textSecondary px-1 rounded text-black">Ad</span>
        <span>Sponsored</span>
      </div>
    )}
    
    <div className="flex gap-3">
      {/* Avatar / Source Icon */}
      <div className="flex-shrink-0">
         <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-textSecondary">
            {item.source[0]}
         </div>
      </div>

      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-textSecondary">
            <span className="font-bold text-textPrimary hover:underline cursor-pointer">{item.source}</span>
            <span>@{item.source.toLowerCase().replace(/\s/g, '')}</span>
            <span>·</span>
            <span>{item.timeAgo}</span>
          </div>
          {/* Impact Badge */}
          {!item.isAd && (
             <div className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                 item.impact === 'HIGH' ? 'text-accentRed border-accentRed/30 bg-accentRed/10' :
                 item.impact === 'MEDIUM' ? 'text-accentYellow border-accentYellow/30 bg-accentYellow/10' :
                 'text-textSecondary border-border'
             }`}>
                {item.impact}
             </div>
          )}
        </div>

        {/* Content */}
        <p className="mt-1 text-textPrimary leading-normal">
          {item.title} 
          <span className="text-accentBlue ml-1">#{item.category}</span>
        </p>
      </div>
    </div>
  </article>
);

export const News: React.FC = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [hideLow, setHideLow] = useState(false);

  useEffect(() => {
    // When mounting, we mark as read.
    localStorage.setItem('tx_news_last_read', Date.now().toString());
    setUnreadCount(0);
    
    // Check filter setting
    const savedFilter = localStorage.getItem('tx_news_hide_low');
    setHideLow(savedFilter === 'true');
  }, []);

  // Apply filter
  const displayedNews = hideLow 
    ? MOCK_NEWS.filter(n => n.impact !== 'LOW' || n.isAd) // Always show ads or high/med
    : MOCK_NEWS;

  return (
    <div>
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-border">
        <h1 className="text-xl font-bold px-4 py-3">News</h1>
        {/* Category Tabs */}
        <div className="flex w-full hover:bg-white/[0.03]">
          {['For You', 'Forex', 'Crypto', 'Stocks'].map((tab, idx) => (
             <div key={tab} className={`flex-1 flex justify-center items-center py-4 cursor-pointer hover:bg-white/10 transition-colors relative`}>
               <span className={`font-bold ${idx === 0 ? 'text-textPrimary' : 'text-textSecondary'}`}>{tab}</span>
               {idx === 0 && <div className="absolute bottom-0 w-14 h-1 bg-accentBlue rounded-full"></div>}
             </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        {displayedNews.map(item => <NewsCard key={item.id} item={item} />)}
        
        {/* Infinite Scroll Loader Simulation */}
        <div className="p-8 flex justify-center">
            <div className="w-6 h-6 border-2 border-accentBlue border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};