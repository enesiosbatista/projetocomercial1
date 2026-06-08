import { Link, useRouterState } from '@tanstack/react-router';
import { Brain, Home, LayoutDashboard, Search } from 'lucide-react';

const items: { to: string; label: string; icon: typeof Home; exact?: boolean }[] = [
  { to: '/', label: 'InÃ­cio', icon: Home, exact: true },
  { to: '/analyze', label: 'Analisar', icon: Search },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/insights', label: 'IA', icon: Brain },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-md flex items-center justify-around px-2 lg:hidden z-50">
      {items.map(({ to, label, icon: Icon, exact }) => {
        const active = exact ? pathname === to : pathname.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center gap-0.5 px-3 py-2 transition-colors ${
              active ? 'text-blue-400' : 'text-zinc-500'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px]">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

