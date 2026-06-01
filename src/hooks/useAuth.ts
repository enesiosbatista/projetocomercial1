import { useEffect, useState } from 'react';
import type { Profile, Plan } from '@/types/database';
import { mockUser } from '@/lib/mockData';

const SESSION_KEY = 'viralmind_session';

export function useAuth() {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Automatically sign in mockUser for immediate demo accessibility,
        // but store in localStorage so it operates like a real session.
        const defaultProfile: Profile = {
          id: mockUser.id,
          username: mockUser.username,
          plan: mockUser.plan,
          credits: mockUser.credits,
          created_at: mockUser.created_at,
          avatar_url: undefined
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(defaultProfile));
        setUser(defaultProfile);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password?: string): Promise<boolean> => {
    setLoading(true);
    // Standard mock verification delay
    await new Promise((r) => setTimeout(r, 600));
    
    // Simulate setting up a profile based on login
    const username = email.split('@')[0];
    const uppercaseUsername = username.charAt(0).toUpperCase() + username.slice(1);
    
    // Admin check logic
    const isAdmin = email.toLowerCase().includes('admin');
    
    const profile: Profile & { role?: string } = {
      id: `user-${Math.random().toString(36).substr(2, 9)}`,
      username: isAdmin ? 'Administrador ViralMind' : uppercaseUsername,
      plan: isAdmin ? 'elite' : 'free',
      credits: isAdmin ? 999 : 3,
      created_at: new Date().toISOString(),
      role: isAdmin ? 'admin' : 'user'
    };
    
    localStorage.setItem(SESSION_KEY, JSON.stringify(profile));
    setUser(profile);
    setLoading(false);
    return true;
  };

  const signup = async (email: string, username: string): Promise<boolean> => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    
    const profile: Profile = {
      id: `user-${Math.random().toString(36).substr(2, 9)}`,
      username: username || email.split('@')[0],
      plan: 'free',
      credits: 3, // 3 free starting credits
      created_at: new Date().toISOString(),
    };
    
    localStorage.setItem(SESSION_KEY, JSON.stringify(profile));
    setUser(profile);
    setLoading(false);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const deductCredit = (): boolean => {
    if (!user) return false;
    if (user.credits <= 0 && user.plan !== 'elite') return false;
    
    const updated = {
      ...user,
      credits: user.plan === 'elite' ? user.credits : Math.max(0, user.credits - 1)
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    setUser(updated);
    
    // Synchronize to memory mock user to avoid state deviations elsewhere
    mockUser.credits = updated.credits;
    return true;
  };

  const addCredits = (amount: number) => {
    if (!user) return;
    const updated = {
      ...user,
      credits: user.credits + amount
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    setUser(updated);
    mockUser.credits = updated.credits;
  };

  const upgradePlan = (plan: Plan) => {
    if (!user) return;
    const creditsMap: Record<Plan, number> = {
      free: 3,
      pro: 50,
      elite: 999
    };
    const updated = {
      ...user,
      plan,
      credits: Math.max(user.credits, creditsMap[plan])
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    setUser(updated);
    mockUser.plan = plan;
    mockUser.credits = updated.credits;
  };

  return {
    user,
    loading,
    login,
    signup,
    logout,
    deductCredit,
    addCredits,
    upgradePlan,
    isAuthenticated: !!user,
    isAdmin: user?.username?.toLowerCase().includes('admin') || (user as any)?.role === 'admin'
  };
}
