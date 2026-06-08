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
      { title: 'ViralMind System â€” Descubra por que vÃ­deos viralizam' },
      {
        name: 'description',
        content:
          'Cole o link de qualquer vÃ­deo e a IA analisa em segundos por que viralizou â€” ou o que falta para viralizar.',
      },
      { property: 'og:title', content: 'ViralMind System' },
      {
        property: 'og:description',
        content: 'AnÃ¡lise viral de vÃ­deos com IA em segundos.',
      },
    ],
  }),
  component: LandingPage,
});

const platformOptions: { value: Platform; emoji: string; label: string }[] = [
  { value: 'youtube', emoji: 'ðŸŽ¬', label: 'YouTube' },
  { value: 'shorts', emoji: 'ðŸ“±', label: 'Shorts' },
  { value: 'tiktok', emoji: 'ðŸŽµ', label: 'TikTok' },
  { value: 'reels', emoji: 'ðŸ“¸', label: 'Reels' },
];

const features = [
  { icon: TrendingUp, color: 'text-blue-400', title: 'Score de ViralizaÃ§Ã£o', desc: 'PontuaÃ§Ã£o de 0 a 100 com anÃ¡lise detalhada de cada fator.' },
  { icon: Zap, color: 'text-amber-400', title: 'Por que viralizou', desc: 'A IA explica exatamente o que fez o vÃ­deo explodir.' },
  { icon: RefreshCw, color: 'text-sky-400', title: 'Recriar sem Copiar', desc: 'Gere um novo roteiro com a mesma essÃªncia, sem plÃ¡gio.' },
  { icon: Mic, color: 'text-blue-400', title: 'TranscriÃ§Ã£o IA', desc: 'Fala extraÃ­da e categorizada por tipo de conteÃºdo.' },
  { icon: BarChart2, color: 'text-amber-400', title: 'Curva de RetenÃ§Ã£o', desc: 'Veja exatamente onde as pessoas param de assistir.' },
  { icon: Flame, color: 'text-sky-400', title: 'Modo Viral', desc: 'TendÃªncias do momento com potencial de viralizaÃ§Ã£o.' },
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
    <div className="min-h-screen bg-[#09090B] text-white">
      <header className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-400" fill="currentColor" />
          <span className="text-base font-bold text-blue-400">ViralMind System</span>
        </div>
        <Link
          to="/analyze"
          className="text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          Entrar
        </Link>
      </header>

      {/* Hero Section */}
      <section className="max-w-3xl mx-auto text-center px-4 pt-24 pb-16">
        {/* 1. Badge */}
        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0 }}
        >
          <span className="border border-zinc-700 bg-zinc-900 text-blue-400 text-sm px-4 py-1.5 rounded-full inline-flex items-center gap-2">
            ðŸ”¥ +12.847 vÃ­deos analisados esta semana
          </span>
        </motion.div>

        {/* 2. H1 */}
        <motion.h1
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mt-6 text-white"
        >
          Descubra por que vÃ­deos{' '}
          <span className="bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent">
            viralizam
          </span>
        </motion.h1>

        {/* 3. SubtÃ­tulo */}
        <motion.p
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.2 }}
          className="text-lg text-zinc-400 max-w-xl mx-auto mt-5 leading-relaxed"
        >
          Cole o link de qualquer vÃ­deo e a IA analisa em segundos por que viralizou â€” ou o que falta para viralizar.
        </motion.p>

        {/* 4. Input + CTA */}
        <motion.form
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 mt-8 max-w-2xl mx-auto"
        >
          <div className="relative flex-1">
            <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Cole o link do YouTube, TikTok, Reels ou Shorts..."
              className="w-full h-14 bg-zinc-900 border border-zinc-700 rounded-xl pl-11 pr-4 text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors text-sm"
            />
          </div>

          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform)}
            className="w-full sm:w-40 h-14 bg-zinc-900 border border-zinc-700 rounded-xl px-3 text-zinc-300 text-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="youtube">ðŸŽ¬ YouTube</option>
            <option value="shorts">ðŸ“± Shorts</option>
            <option value="tiktok">ðŸŽµ TikTok</option>
            <option value="reels">ðŸ“¸ Reels</option>
          </select>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-14 px-8 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl whitespace-nowrap transition-colors text-sm flex items-center justify-center gap-2"
          >
            Analisar Agora â†’
          </motion.button>
        </motion.form>

        {/* 5. Micro-copy */}
        <motion.p
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.4 }}
          className="text-sm text-zinc-500 mt-3"
        >
          âœ“ GrÃ¡tis para comeÃ§ar âœ“ Sem cadastro âœ“ Resultado em 30s
        </motion.p>

        {/* 6. Social proof */}
        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.5 }}
          className="flex items-center justify-center gap-3 mt-5"
        >
          <div className="flex -space-x-2">
            {[
              { initials: 'MS', bg: 'bg-blue-700' },
              { initials: 'AK', bg: 'bg-blue-600' },
              { initials: 'JP', bg: 'bg-blue-500' },
            ].map((a) => (
              <div
                key={a.initials}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border border-zinc-850 text-white shrink-0 ${a.bg}`}
              >
                {a.initials}
              </div>
            ))}
          </div>
          <span className="text-sm text-zinc-400">
            â˜…â˜…â˜…â˜…â˜… Usado por mais de 3.200 criadores
          </span>
        </motion.div>
      </section>

      {/* SeÃ§Ã£o Features */}
      <section className="mt-24 px-4 max-w-5xl mx-auto pb-24">
        <h2 className="text-3xl font-bold text-center mb-3">
          Tudo que vocÃª precisa para viralizar
        </h2>
        <p className="text-base text-zinc-400 text-center mb-12">
          Do diagnÃ³stico ao roteiro â€” tudo em um lugar
        </p>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map(({ icon: Icon, color, title, desc }) => (
            <motion.div
              key={title}
              variants={staggerItem}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-blue-500/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Icon className={`w-6 h-6 ${color}`} />
              <div className="mt-4">
                <h3 className="font-semibold text-sm mb-1">{title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="mt-8 py-8 border-t border-zinc-800 text-center">
        <p className="text-sm text-zinc-600">
          Â© 2026 ViralMind System â€” Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
}

