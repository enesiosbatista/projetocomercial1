import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Lock, Mail, User, ShieldAlert, Sparkles, Chrome, Github } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { fadeInUp } from '@/lib/animations';

export const Route = createFileRoute('/auth')({
  head: () => ({
    meta: [{ title: 'Entrar — ViralMind System' }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  // Loading & Error states
  const [loadingState, setLoadingState] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoadingState(true);

    try {
      if (activeTab === 'login') {
        if (!email || !password) {
          setErrorMsg('Preencha todos os campos.');
          setLoadingState(false);
          return;
        }
        await login(email, password);
      } else {
        if (!email || !username) {
          setErrorMsg('Preencha todos os campos.');
          setLoadingState(false);
          return;
        }
        await signup(email, username);
      }
      
      // Redirect to dashboard on success
      navigate({ to: '/dashboard' });
    } catch (err) {
      setErrorMsg('Ocorreu um erro. Tente novamente.');
    } finally {
      setLoadingState(false);
    }
  };

  const handleOAuth = async (provider: 'Google' | 'GitHub') => {
    setErrorMsg(null);
    setLoadingState(true);
    // Simulate OAuth delay
    await new Promise((r) => setTimeout(r, 900));
    
    // Simulate generic login
    await login(`usuario.${provider.toLowerCase()}@email.com`);
    setLoadingState(false);
    navigate({ to: '/dashboard' });
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        {...fadeInUp}
        className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-[0_0_0_1px_#3F3F46,0_4px_24px_rgba(0,0,0,0.4)] p-8 relative z-10"
      >
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-violet-950/40 border border-violet-800 rounded-xl mb-4">
            <Brain className="w-8 h-8 text-violet-400" />
          </div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
            ViralMind System
          </h1>
          <p className="text-sm text-zinc-400 mt-2">
            O ecossistema definitivo para análise de conteúdo viral.
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex bg-zinc-950 rounded-lg p-1 mb-6 border border-zinc-800">
          <button
            onClick={() => {
              setActiveTab('login');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'login'
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => {
              setActiveTab('signup');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'signup'
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Cadastrar
          </button>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-red-950/40 border border-red-800 text-red-300 text-sm px-4 py-3 rounded-lg flex items-center gap-2.5"
          >
            <ShieldAlert size={16} className="shrink-0" />
            <span>{errorMsg}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'signup' && (
            <div>
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1.5">
                Nome completo
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full h-11 bg-zinc-950 border border-zinc-850 rounded-xl pl-10 pr-4 text-zinc-100 placeholder-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-colors text-sm"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1.5">
              E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@email.com"
                className="w-full h-11 bg-zinc-950 border border-zinc-850 rounded-xl pl-10 pr-4 text-zinc-100 placeholder-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-colors text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Senha
              </label>
              {activeTab === 'login' && (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Mock: Instruções de recuperação enviadas.');
                  }}
                  className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Esqueceu a senha?
                </a>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 bg-zinc-950 border border-zinc-850 rounded-xl pl-10 pr-4 text-zinc-100 placeholder-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-colors text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loadingState}
            className="w-full h-11 bg-violet-600 hover:bg-violet-500 active:scale-98 disabled:opacity-50 text-white font-semibold rounded-xl transition-all text-sm flex items-center justify-center gap-2 mt-6 cursor-pointer shadow-lg shadow-violet-900/20"
          >
            {loadingState ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles size={14} />
                <span>
                  {activeTab === 'login' ? 'Acessar Plataforma' : 'Criar Conta Grátis'}
                </span>
              </>
            )}
          </button>
        </form>

        {/* Separator */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-zinc-800"></div>
          <span className="flex-shrink mx-4 text-zinc-500 text-xs uppercase tracking-wider font-semibold">
            ou continue com
          </span>
          <div className="flex-grow border-t border-zinc-800"></div>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleOAuth('Google')}
            className="h-10 border border-zinc-800 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Chrome size={14} />
            <span>Google</span>
          </button>
          <button
            onClick={() => handleOAuth('GitHub')}
            className="h-10 border border-zinc-800 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Github size={14} />
            <span>GitHub</span>
          </button>
        </div>

        {/* Helpful Tip */}
        <div className="mt-6 text-center text-xs text-zinc-500 bg-zinc-950/50 rounded-lg p-2 border border-zinc-900">
          💡 Dica: Digite <code className="text-violet-400 font-mono">admin</code> no e-mail para entrar com privilégios de administrador.
        </div>
      </motion.div>
    </div>
  );
}
