import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Newspaper, CalendarDays, Briefcase, Settings } from 'lucide-react';
import { Logo } from './Logo';
import { MOCK_NEWS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

const NavItem = ({ to, icon: Icon, label, badgeCount }: { to: string; icon: any; label: string; badgeCount?: number }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-4 p-3 rounded-full text-xl transition-colors duration-200 relative ${
        isActive ? 'font-bold text-textPrimary' : 'text-textSecondary hover:bg-surface hover:text-textPrimary'
      }`
    }
  >
    <div className="relative">
      <Icon className="w-7 h-7" />
      {badgeCount !== undefined && badgeCount > 0 && (
        <div className="absolute -top-1 -right-1 bg-accentRed text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border-2 border-black">
          {badgeCount}
        </div>
      )}
    </div>
    <span className="hidden xl:block">{label}</span>
  </NavLink>
);

const MobileNavItem = ({ to, icon: Icon, badgeCount }: { to: string; icon: any; badgeCount?: number }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center justify-center p-3 rounded-full transition-colors relative ${
        isActive ? 'text-textPrimary' : 'text-textSecondary'
      }`
    }
  >
    <div className="relative">
      <Icon className="w-7 h-7" />
      {badgeCount !== undefined && badgeCount > 0 && (
        <div className="absolute -top-1 -right-1 bg-accentRed text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border-2 border-black">
          {badgeCount}
        </div>
      )}
    </div>
  </NavLink>
);

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [newsUnreadCount, setNewsUnreadCount] = useState(0);

  useEffect(() => {
    // Logic: 
    // If on /news, count is 0.
    // Else, check localStorage vs MOCK_NEWS.
    
    if (location.pathname === '/news') {
      setNewsUnreadCount(0);
    } else {
      const lastReadStr = localStorage.getItem('tx_news_last_read');
      const lastRead = lastReadStr ? parseInt(lastReadStr, 10) : 0;
      // Count items newer than lastRead
      const count = MOCK_NEWS.filter(n => n.timestamp > lastRead).length;
      setNewsUnreadCount(count);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-textPrimary flex justify-center">
      <div className="flex w-full max-w-[900px]">
        {/* LEFT SIDEBAR (Desktop) */}
        <header className="hidden sm:flex flex-col w-[88px] xl:w-[275px] h-screen sticky top-0 border-r border-border px-2 xl:px-4 py-4 justify-between shrink-0">
          <div className="flex flex-col gap-2">
            <div className="p-3 mb-2 w-fit rounded-full hover:bg-surface transition-colors cursor-pointer">
              <Logo size={32} />
            </div>
            
            <nav className="flex flex-col gap-2">
              <NavItem to="/" icon={LayoutDashboard} label="Sessions" />
              <NavItem to="/news" icon={Newspaper} label="News" badgeCount={newsUnreadCount} />
              <NavItem to="/calendar" icon={CalendarDays} label="Calendar" />
              <NavItem to="/firms" icon={Briefcase} label="Firms" />
              <NavItem to="/settings" icon={Settings} label="Settings" />
            </nav>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-full hover:bg-surface cursor-pointer mt-auto">
            <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center font-bold text-textSecondary">
              TX
            </div>
            <div className="hidden xl:block">
              <div className="font-bold text-sm">Trader User</div>
              <div className="text-textSecondary text-sm">@trader_01</div>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 w-full border-r border-border min-h-screen pb-20 sm:pb-0">
          {children}
        </main>
        
        {/* Removed Right Sidebar per user request for cleaner/tablet-friendly layout */}

        {/* BOTTOM NAV (Mobile) */}
        <nav className="sm:hidden fixed bottom-0 w-full bg-black border-t border-border flex justify-around py-3 z-50 pb-safe">
            <MobileNavItem to="/" icon={LayoutDashboard} />
            <MobileNavItem to="/news" icon={Newspaper} badgeCount={newsUnreadCount} />
            <MobileNavItem to="/calendar" icon={CalendarDays} />
            <MobileNavItem to="/firms" icon={Briefcase} />
            <MobileNavItem to="/settings" icon={Settings} />
        </nav>
      </div>
    </div>
  );
};