import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Brain, Sparkles, TrendingUp, CheckCircle, ArrowRight, X } from 'lucide-react';
import { scaleIn } from '@/lib/animations';

export function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    try {
      const completed = localStorage.getItem('viralmind_onboarding_completed');
      if (!completed) {
        // Show onboarding modal after a 1.2s delay for maximum premium feeling
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleClose = () => {
    try {
      localStorage.setItem('viralmind_onboarding_completed', 'true');
    } catch {}
    setIsOpen(false);
  };

  const steps = [
    {
      title: 'Bem-vindo ao ViralMind System ⚡',
      desc: 'Sua jornada para entender por que vídeos viralizam e replicar esse sucesso começa agora.',
      icon: Brain,
      color: 'text-violet-400',
      bgGlow: 'bg-violet-600/10',
      bullets: [
        'Análises neurais profundas de retenção de público.',
        'Detecção automática de gatilhos mentais e ganchos (hooks).',
        'Geração de roteiros alternativos com 0% risco de plágio.',
      ],
    },
    {
      title: 'Como Funciona o Sistema? 📊',
      desc: 'Em apenas 3 passos simples, você otimiza todo o seu conteúdo e escala suas redes sociais.',
      icon: TrendingUp,
      color: 'text-cyan-400',
      bgGlow: 'bg-cyan-500/10',
      bullets: [
        '1. Cole o link de qualquer vídeo de rede social.',
        '2. Receba um Score de Viralização exclusivo de 0 a 100.',
        '3. Remodele a transcrição com IA em mais de 6 estilos diferentes.',
      ],
    },
    {
      title: 'Créditos e Crescimento 🚀',
      desc: 'No plano Free, você inicia com 3 créditos. Cada análise detalhada consome apenas 1 crédito.',
      icon: Sparkles,
      color: 'text-amber-400',
      bgGlow: 'bg-amber-500/10',
      bullets: [
        'Acompanhe seu progresso de engajamento no Dashboard.',
        'Conecte suas contas para ter dados de postagem otimizados.',
        'Acesse nossa IA Consultora na aba de Insights Estratégicos.',
      ],
    },
  ];

  const current = steps[step];
  const Icon = current?.icon;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
        <motion.div
          variants={scaleIn}
          initial="initial"
          animate="animate"
          exit="initial"
          className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-[0_0_0_1px_#3F3F46,0_4px_24px_rgba(0,0,0,0.4)] p-6 md:p-8 relative overflow-hidden text-white"
        >
          {/* Dynamic BG Glow */}
          <div className={`absolute top-0 right-0 w-44 h-44 ${current.bgGlow} rounded-full blur-[80px] pointer-events-none transition-all duration-500`} />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Header Progress Indicators */}
          <div className="flex gap-2 justify-center mb-8">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === step ? 'w-8 bg-violet-500' : 'w-2 bg-zinc-800'
                }`}
              />
            ))}
          </div>

          {/* Step Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-zinc-950/60 border border-zinc-850 rounded-2xl">
              <Icon className={`w-10 h-10 ${current.color}`} />
            </div>
          </div>

          {/* Texts */}
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
              {current.title}
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-md mx-auto mb-6">
              {current.desc}
            </p>
          </div>

          {/* Bullet points */}
          <div className="bg-zinc-950/40 border border-zinc-850 rounded-xl p-4 mb-8">
            <ul className="space-y-3">
              {current.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-zinc-300">
                  <CheckCircle size={14} className="text-violet-400 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center gap-3">
            <button
              onClick={handleClose}
              className="text-sm font-medium text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Pular Introdução
            </button>

            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="h-10 px-5 bg-violet-600 hover:bg-violet-500 active:scale-95 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Próximo Passo</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="h-10 px-6 bg-gradient-to-r from-violet-500 to-cyan-500 hover:opacity-90 active:scale-95 text-zinc-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Começar Agora!</span>
                <Zap size={14} fill="currentColor" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
