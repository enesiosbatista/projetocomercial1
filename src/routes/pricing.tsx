import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Flame, Shield, HelpCircle, Loader2 } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/hooks/useAuth';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

export const Route = createFileRoute('/pricing')({
  head: () => ({
    meta: [{ title: 'Planos e PreÃ§os â€” ViralMind System' }],
  }),
  component: PricingPage,
});

const pricingFeatures = {
  free: [
    '3 crÃ©ditos iniciais grÃ¡tis',
    'AnÃ¡lise de vÃ­deo bÃ¡sica',
    'SugestÃ£o de 3 tÃ­tulos e hooks',
    'Acesso ao painel simplificado',
  ],
  pro: [
    '50 crÃ©ditos por mÃªs',
    'AnÃ¡lise profunda de viralizaÃ§Ã£o',
    'Recriador de roteiros avanÃ§ado',
    'Curva de retenÃ§Ã£o estimada por IA',
    'ExportaÃ§Ã£o em PDF (.pdf) e texto (.txt)',
    'Suporte prioritÃ¡rio',
  ],
  elite: [
    'CrÃ©ditos ilimitados',
    'IA Consultora de Crescimento ativa',
    'Todos os recursos de anÃ¡lises profundas',
    'GeraÃ§Ã£o automatizada em lote',
    'IntegraÃ§Ã£o multi-contas de redes sociais',
    'Suporte VIP via WhatsApp 24/7',
  ],
};

function PricingPage() {
  const navigate = useNavigate();
  const { user, upgradePlan } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  const handleCheckout = async (plan: 'pro' | 'elite') => {
    setCheckoutLoading(plan);
    // Simulate redirection to Stripe Checkout portal
    await new Promise((r) => setTimeout(r, 1500));
    
    // Update plan in hook state
    upgradePlan(plan);
    setCheckoutLoading(null);
    
    // Alert the user with a beautiful confirmation
    alert(`Mock: Assinatura do Plano ${plan.toUpperCase()} ativada com sucesso via Stripe! Seus crÃ©ditos foram injetados.`);
    navigate({ to: '/dashboard' });
  };

  const getPrice = (plan: 'pro' | 'elite') => {
    const base = plan === 'pro' ? 47 : 97;
    if (billingPeriod === 'annual') {
      return Math.round(base * 0.8); // 20% discount
    }
    return base;
  };

  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-12 text-white">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.div {...fadeInUp}>
            <span className="border border-blue-800 bg-blue-950/40 text-blue-400 text-xs px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 font-semibold">
              <Sparkles size={12} /> PLANOS & PREÃ‡OS
            </span>
          </motion.div>
          <motion.h1
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black mt-4 leading-none tracking-tight"
          >
            Escolha o combustÃ­vel para{' '}
            <span className="bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent">
              viralizar
            </span>
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-sm text-zinc-400 mt-4 leading-relaxed"
          >
            Sem taxas ocultas, cancele a qualquer momento. Escolha o plano ideal para alavancar seu alcance nas redes sociais.
          </motion.p>
        </div>

        {/* Annual Toggle */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.25 }}
          className="flex justify-center items-center gap-3 mb-12"
        >
          <span className={`text-sm ${billingPeriod === 'monthly' ? 'text-white font-semibold' : 'text-zinc-400'}`}>
            Mensal
          </span>
          <button
            onClick={() => setBillingPeriod((p) => (p === 'monthly' ? 'annual' : 'monthly'))}
            className="w-14 h-8 bg-zinc-800 rounded-full p-1 transition-all duration-300 relative border border-zinc-700"
          >
            <div
              className={`w-6 h-6 bg-blue-600 rounded-full transition-all duration-300 absolute ${
                billingPeriod === 'annual' ? 'left-7 bg-sky-400' : 'left-1'
              }`}
            />
          </button>
          <span className={`text-sm flex items-center gap-2 ${billingPeriod === 'annual' ? 'text-white font-semibold' : 'text-zinc-400'}`}>
            Anual <span className="bg-green-950 text-green-400 text-[10px] px-2 py-0.5 rounded-full border border-green-900 font-bold font-mono">SALVE 20%</span>
          </span>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {/* Card: FREE */}
          <motion.div
            variants={staggerItem}
            className={`bg-zinc-900 border ${
              user?.plan === 'free' ? 'border-zinc-700 ring-1 ring-zinc-700' : 'border-zinc-800'
            } rounded-2xl p-6 flex flex-col justify-between shadow-[0_0_0_1px_#3F3F46,0_4px_24px_rgba(0,0,0,0.4)] relative hover:border-zinc-700/50 hover:-translate-y-0.5 transition-all duration-200`}
          >
            {user?.plan === 'free' && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Seu Plano Atual
              </span>
            )}
            <div>
              <div className="flex items-center gap-2 text-zinc-400 mb-3">
                <Shield size={16} />
                <span className="text-xs font-semibold uppercase tracking-wider">Gratuito</span>
              </div>
              <p className="text-sm text-zinc-400">Excelente para testar as capacidades bÃ¡sicas da plataforma.</p>
              
              <div className="my-6">
                <span className="text-4xl font-black font-mono">R$ 0</span>
                <span className="text-zinc-500 text-sm"> / mÃªs</span>
              </div>

              <div className="border-t border-zinc-800 my-4" />

              <ul className="space-y-3 mb-6">
                {pricingFeatures.free.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <Check size={14} className="text-zinc-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              disabled
              className="w-full h-11 border border-zinc-800 text-zinc-500 font-semibold rounded-xl text-sm transition-all"
            >
              {user?.plan === 'free' ? 'Plano Ativo' : 'NÃ£o SelecionÃ¡vel'}
            </button>
          </motion.div>

          {/* Card: PRO */}
          <motion.div
            variants={staggerItem}
            className={`bg-zinc-900 border ${
              user?.plan === 'pro'
                ? 'border-blue-500 ring-2 ring-blue-500/30'
                : 'border-zinc-800'
            } rounded-2xl p-6 flex flex-col justify-between shadow-[0_0_0_1px_#3F3F46,0_4px_24px_rgba(0,0,0,0.4)] relative hover:border-blue-500/40 hover:-translate-y-0.5 transition-all duration-200`}
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 border border-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Zap size={10} fill="currentColor" /> MAIS POPULAR
            </span>
            {user?.plan === 'pro' && (
              <span className="absolute top-4 right-4 bg-blue-950 border border-blue-800 text-blue-300 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                Ativo
              </span>
            )}
            <div>
              <div className="flex items-center gap-2 text-blue-400 mb-3">
                <Zap size={16} fill="currentColor" />
                <span className="text-xs font-semibold uppercase tracking-wider">Profissional</span>
              </div>
              <p className="text-sm text-zinc-400">O motor ideal para produtores de conteÃºdo constantes.</p>
              
              <div className="my-6">
                <span className="text-4xl font-black font-mono">R$ {getPrice('pro')}</span>
                <span className="text-zinc-500 text-sm"> / mÃªs</span>
                {billingPeriod === 'annual' && (
                  <p className="text-xs text-green-400 mt-1 font-mono">R$ {getPrice('pro') * 12} cobrado anualmente</p>
                )}
              </div>

              <div className="border-t border-zinc-800 my-4" />

              <ul className="space-y-3 mb-6">
                {pricingFeatures.pro.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <Check size={14} className="text-blue-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleCheckout('pro')}
              disabled={checkoutLoading !== null || user?.plan === 'pro' || user?.plan === 'elite'}
              className={`w-full h-11 font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                user?.plan === 'pro'
                  ? 'bg-zinc-800 text-zinc-500 cursor-default'
                  : user?.plan === 'elite'
                  ? 'border border-zinc-800 text-zinc-600 cursor-default'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-950/50'
              }`}
            >
              {checkoutLoading === 'pro' ? (
                <Loader2 size={16} className="animate-spin" />
              ) : user?.plan === 'pro' ? (
                'Plano Atual'
              ) : user?.plan === 'elite' ? (
                'Pro Rebaixado'
              ) : (
                'Assinar Pro'
              )}
            </button>
          </motion.div>

          {/* Card: ELITE */}
          <motion.div
            variants={staggerItem}
            className={`bg-zinc-900 border ${
              user?.plan === 'elite'
                ? 'border-sky-500 ring-2 ring-sky-500/30'
                : 'border-zinc-800'
            } rounded-2xl p-6 flex flex-col justify-between shadow-[0_0_0_1px_#3F3F46,0_4px_24px_rgba(0,0,0,0.4)] relative hover:border-sky-500/40 hover:-translate-y-0.5 transition-all duration-200`}
          >
            {user?.plan === 'elite' && (
              <span className="absolute top-4 right-4 bg-sky-950 border border-sky-800 text-sky-300 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                Ativo
              </span>
            )}
            <div>
              <div className="flex items-center gap-2 text-sky-400 mb-3">
                <Flame size={16} fill="currentColor" />
                <span className="text-xs font-semibold uppercase tracking-wider">Elite</span>
              </div>
              <p className="text-sm text-zinc-400">Poder total sem limites para agÃªncias e criadores gigantes.</p>
              
              <div className="my-6">
                <span className="text-4xl font-black font-mono">R$ {getPrice('elite')}</span>
                <span className="text-zinc-500 text-sm"> / mÃªs</span>
                {billingPeriod === 'annual' && (
                  <p className="text-xs text-green-400 mt-1 font-mono">R$ {getPrice('elite') * 12} cobrado anualmente</p>
                )}
              </div>

              <div className="border-t border-zinc-800 my-4" />

              <ul className="space-y-3 mb-6">
                {pricingFeatures.elite.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <Check size={14} className="text-sky-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleCheckout('elite')}
              disabled={checkoutLoading !== null || user?.plan === 'elite'}
              className={`w-full h-11 font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                user?.plan === 'elite'
                  ? 'bg-zinc-800 text-zinc-500 cursor-default'
                  : 'bg-sky-500 hover:bg-sky-400 text-zinc-950 shadow-lg shadow-sky-950/50'
              }`}
            >
              {checkoutLoading === 'elite' ? (
                <Loader2 size={16} className="animate-spin text-zinc-950" />
              ) : user?.plan === 'elite' ? (
                'Plano Atual'
              ) : (
                'Assinar Elite'
              )}
            </button>
          </motion.div>
        </motion.div>

        {/* Pricing FAQs */}
        <div className="mt-20 border-t border-zinc-800 pt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10 flex items-center justify-center gap-2">
            <HelpCircle className="text-blue-400" /> Perguntas Frequentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-zinc-200 mb-2">Como funcionam os crÃ©ditos?</h3>
              <p className="text-zinc-400 leading-relaxed">
                Cada anÃ¡lise detalhada de vÃ­deo consome 1 crÃ©dito. Seus crÃ©ditos do plano PRO expiram a cada ciclo de 30 dias e sÃ£o renovados no dia do pagamento.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-200 mb-2">Posso fazer upgrade ou downgrade quando quiser?</h3>
              <p className="text-zinc-400 leading-relaxed">
                Sim! VocÃª pode alterar seu plano a qualquer momento. Seus novos crÃ©ditos sÃ£o ativados instantaneamente no upgrade.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-200 mb-2">Quais formas de pagamento sÃ£o aceitas?</h3>
              <p className="text-zinc-400 leading-relaxed">
                Aceitamos todos os principais cartÃµes de crÃ©dito internacionais e PIX atravÃ©s do gateway seguro da Stripe.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-200 mb-2">Como cancelo minha assinatura?</h3>
              <p className="text-zinc-400 leading-relaxed">
                O cancelamento pode ser feito em um clique a qualquer momento diretamente no seu Meu Perfil, acessando a Ã¡rea do Stripe Customer Portal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

