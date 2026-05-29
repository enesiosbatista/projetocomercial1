import { ReactNode, useState, useEffect } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';

const STORAGE_KEY = 'viralmind_sidebar_collapsed';

export function AppLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'true' || stored === '1') {
        setCollapsed(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleToggle = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? 'true' : 'false');
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-foreground flex flex-col">
      <Sidebar collapsed={collapsed} onToggle={handleToggle} />
      <div className="flex min-h-screen flex-1 flex-col">
        <Header />
        <main
          className={`flex-1 overflow-y-auto pt-[56px] min-h-screen pb-16 lg:pb-0 transition-all duration-300 ${
            collapsed ? 'lg:pl-[64px]' : 'lg:pl-[240px]'
          }`}
        >
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

