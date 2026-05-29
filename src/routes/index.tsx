import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart2,
  Flame,
  Link2,
  Mic,
  RefreshCw,
  TrendingUp,
  Zap,
} from 'lucide-react';
import type { Platform } from '@/types/database';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'ViralMind AI — Descubra por que vídeos viralizam' },
      {
        name: 'description',
        content:
          'Cole o link de qualquer vídeo e a IA analisa em segundos por que viralizou — ou o que falta para viralizar.',
      },
      { property: 'og:title', content: 'ViralMind AI' },
      {
        property: 'og:description',
        content: 'Análise viral de vídeos com IA em segundos.',
      },
    ],
  }),
  component: LandingPage,
});

const platformOptions: { value: Platform; emoji: string; label: string }[] = [
  { value: 'youtube', emoji: '🎬', label: 'YouTube' },
  { value: 'shorts', emoji: '📱', label: 'Shorts' },
  { value: 'tiktok', emoji: '🎵', label: 'TikTok' },
  { value: 'reels', emoji: '📸', label: 'Reels' },
];

const features = [
  { icon: TrendingUp, color: 'text-violet-400', title: 'Score de Viralização', desc: 'Pontuação de 0 a 100 com análise detalhada de cada fator.' },
  { icon: Zap, color: 'text-amber-400', title: 'Por que viralizou', desc: 'A IA explica exatamente o que fez o vídeo explodir.' },
  { icon: RefreshCw, color: 'text-cyan-400', title: 'Recriar sem Copiar', desc: 'Gere um novo roteiro com a mesma essência, sem plágio.' },
  { icon: Mic, color: 'text-violet-400', title: 'Transcrição IA', desc: 'Fala extraída e categorizada por tipo de conteúdo.' },
  { icon: BarChart2, color: 'text-amber-400', title: 'Curva de Retenção', desc: 'Veja exatamente onde as pessoas param de assistir.' },
  { icon: Flame, color: 'text-cyan-400', title: 'Modo Viral', desc: 'Tendências do momento com potencial de viralização.' },
];

function LandingPage() {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<Platform>('youtube');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    try {
      localStorage.setItem('viralmind_url', url);
      localStorage.setItem('viralmind_platform', platform);
    } catch {}
    navigate({ to: '/analyze' });
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-foreground">
      <header className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-violet-400" fill="currentColor" />
          <span className="text-base font-bold text-violet-400">ViralMind</span>
        </div>
        <a
          href="/analyze"
          className="text-sm font-medium text-zinc-400 hover:text-zinc-200"
        >
          Entrar
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 pt-16 pb-16 text-center md:pt-24">
        <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0 }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-1.5 text-sm text-violet-400">
            🔥 +12.847 vídeos analisados esta semana
          </span>
        </motion.div>

        <motion.h1
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.1 }}
          className="mt-6 text-5xl font-black leading-none tracking-tight sm:text-6xl lg:text-7xl"
        >
          Descubra por que vídeos{' '}
          <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
            viralizam
          </span>
        </motion.h1>

        <motion.p
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-zinc-400"
        >
          Cole o link de qualquer vídeo e a IA analisa em segundos por que
          viralizou — ou o que falta para viralizar.
        </motion.p>

        <motion.form
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Link2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Cole o link do YouTube, TikTok, Reels ou Shorts..."
              className="h-14 w-full rounded-xl border border-zinc-700 bg-zinc-900 pl-11 pr-4 text-sm text-zinc-100 placeholder-zinc-500 transition-colors focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
            />
          </div>

          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform)}
            className="h-14 rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-300 focus:border-violet-500 focus:outline-none sm:w-40"
          >
            {platformOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.emoji} {o.label}
              </option>
            ))}
          </select>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex h-14 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-violet-600 px-8 text-sm font-semibold text-white transition-colors hover:bg-violet-500"
          >
            Analisar Agora <ArrowRight className="h-4 w-4" />
          </motion.button>
        </motion.form>

        <motion.p
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.4 }}
          className="mt-3 text-sm text-zinc-500"
        >
          ✓ Grátis para começar &nbsp; ✓ Sem cadastro &nbsp; ✓ Resultado em 30s
        </motion.p>

        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.5 }}
          className="mt-5 flex items-center justify-center gap-3 text-sm text-zinc-400"
        >
          <div className="flex -space-x-2">
            {[
              { initials: 'MS', bg: 'bg-violet-700' },
              { initials: 'AK', bg: 'bg-violet-600' },
              { initials: 'JP', bg: 'bg-violet-500' },
            ].map((a) => (
              <div
                key={a.initials}
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#09090B] text-xs font-bold text-white ${a.bg}`}
              >
                {a.initials}
              </div>
            ))}
          </div>
          <span>★★★★★ &nbsp; Usado por mais de 3.200 criadores</span>
        </motion.div>
      </section>

      {/* Features */}
      <section className="mx-auto mt-24 max-w-5xl px-4 pb-24">
        <h2 className="mb-3 text-center text-3xl font-bold">
          Tudo que você precisa para viralizar
        </h2>
        <p className="mb-12 text-center text-base text-zinc-400">
          Do diagnóstico ao roteiro — tudo em um lugar
        </p>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map(({ icon: Icon, color, title, desc }) => (
            <motion.div
              key={title}
              variants={staggerItem}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500/40"
            >
              <Icon className={`h-6 w-6 ${color}`} />
              <div className="mt-4">
                <h3 className="mb-1 text-sm font-semibold">{title}</h3>
                <p className="text-xs leading-relaxed text-zinc-400">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="mt-8 border-t border-zinc-800 py-8 text-center">
        <p className="text-sm text-zinc-600">
          © 2026 ViralMind AI — Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
}
