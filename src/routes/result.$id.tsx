import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  BarChart2,
  Brain,
  CheckCircle,
  Clapperboard,
  Copy,
  Download,
  Flame,
  Info,
  Loader2,
  MousePointerClick,
  Play,
  RefreshCw,
  Share2,
  Sparkles,
  TrendingUp,
  Type,
  Volume2,
  X,
  XCircle,
  Zap,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PlatformBadge } from '@/components/ui/PlatformBadge';
import { ViralScore } from '@/components/ui/ViralScore';
import { MetricCard } from '@/components/ui/MetricCard';
import { RetentionChart } from '@/components/features/RetentionChart';
import { mockAnalysis } from '@/lib/mockData';
import type { Analysis } from '@/types/database';
import { getScoreColor } from '@/lib/utils';

export const Route = createFileRoute('/result/$id')({
  head: () => ({
    meta: [{ title: 'Resultado da anÃ¡lise â€” ViralMind System' }],
  }),
  component: ResultPage,
});

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

type TabType = 'analysis' | 'recreate' | 'transcript';

function ResultPage() {
  const analysis: Analysis = mockAnalysis;
  const [activeTab, setActiveTab] = useState<TabType>('analysis');
  const [displayScore, setDisplayScore] = useState(0);

  const verdict = analysis.viral_score >= 70 ? 'viralized' : 'not_viralized';

  useEffect(() => {
    // Animando o Score de 0 para 87 (ou viral_score) em 1.5s
    const start = performance.now();
    const target = analysis.viral_score;
    const duration = 1500;
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Easing out cÃºbico
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(easedProgress * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [analysis.viral_score]);

  return (
    <AppLayout>
      <div className="lg:flex gap-6 p-6 max-w-7xl mx-auto text-white">
        {/* Coluna Esquerda â€” Info Card */}
        <aside className="w-full lg:w-[320px] shrink-0 lg:sticky lg:top-[72px] lg:h-fit">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            {/* Thumbnail */}
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-zinc-800 flex items-center justify-center relative">
              {analysis.thumbnail_url ? (
                <img
                  src={analysis.thumbnail_url}
                  alt={analysis.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <Play className="w-8 h-8 text-zinc-500" />
              )}
            </div>

            {/* TÃ­tulo */}
            <h2 className="text-sm font-semibold mt-3 line-clamp-2 text-zinc-100">
              {analysis.title}
            </h2>

            {/* Linha de badges */}
            <div className="flex items-center gap-2 mt-2">
              <PlatformBadge platform={analysis.platform} />
              <span className="bg-zinc-800 text-zinc-400 text-xs px-2 py-0.5 rounded font-mono">
                {formatDuration(analysis.duration_seconds)}
              </span>
            </div>

            {/* Separador */}
            <div className="border-t border-zinc-800 my-4" />

            {/* ViralScore */}
            <div className="flex justify-center mx-auto mb-3">
              <ViralScore score={displayScore} size="lg" />
            </div>

            {/* Veredicto */}
            <div className="text-center font-semibold mt-2">
              {analysis.viral_score >= 70 ? (
                <span className="text-green-400 text-sm">âœ… Viralizou!</span>
              ) : (
                <span className="text-amber-400 text-sm">âš ï¸ NÃ£o viralizou</span>
              )}
            </div>

            {/* BotÃµes */}
            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link de anÃ¡lise copiado para a Ã¡rea de transferÃªncia!');
                }}
                className="bg-zinc-800 hover:bg-zinc-700 w-full rounded-xl h-9 text-sm text-zinc-300 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Share2 size={14} />
                <span>ðŸ“‹ Compartilhar AnÃ¡lise</span>
              </button>

              <button
                onClick={() => window.print()}
                className="bg-blue-600 hover:bg-blue-500 w-full rounded-xl h-9 text-sm text-white transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Download size={14} />
                <span>ðŸ“¥ Exportar PDF</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Coluna Direita â€” Sistema de Abas */}
        <section className="flex-1 min-w-0 mt-6 lg:mt-0">
          {/* TabBar */}
          <div className="flex border-b border-zinc-800 mb-6 gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('analysis')}
              className={`${
                activeTab === 'analysis'
                  ? 'border-b-2 border-blue-500 text-white pb-3 px-4 text-sm font-medium -mb-px'
                  : 'text-zinc-400 hover:text-zinc-200 pb-3 px-4 text-sm transition-colors -mb-px'
              }`}
            >
              AnÃ¡lise Completa
            </button>
            <button
              onClick={() => setActiveTab('recreate')}
              className={`${
                activeTab === 'recreate'
                  ? 'border-b-2 border-blue-500 text-white pb-3 px-4 text-sm font-medium -mb-px'
                  : 'text-zinc-400 hover:text-zinc-200 pb-3 px-4 text-sm transition-colors -mb-px'
              }`}
            >
              Recriar VÃ­deo
            </button>
            <button
              onClick={() => setActiveTab('transcript')}
              className={`${
                activeTab === 'transcript'
                  ? 'border-b-2 border-blue-500 text-white pb-3 px-4 text-sm font-medium -mb-px'
                  : 'text-zinc-400 hover:text-zinc-200 pb-3 px-4 text-sm transition-colors -mb-px'
              }`}
            >
              TranscriÃ§Ã£o
            </button>
          </div>

          {/* ConteÃºdo das Abas */}
          {activeTab === 'analysis' && (
            <AnalysisTab analysis={analysis} verdict={verdict} />
          )}

          {activeTab === 'recreate' && (
            <RecreateTab script={analysis.result.script_recreation} />
          )}

          {activeTab === 'transcript' && (
            <TranscriptTab transcript={analysis.result.transcript} />
          )}
        </section>
      </div>
    </AppLayout>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ ABA 1: ANALYSIS TAB â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

interface AnalysisTabProps {
  analysis: Analysis;
  verdict: 'viralized' | 'not_viralized';
}

function AnalysisTab({ analysis, verdict }: AnalysisTabProps) {
  const r = analysis.result;
  const isViralized = verdict === 'viralized';

  // AcordeÃµes controlado
  const [openStrong, setOpenStrong] = useState<number | null>(null);
  const [openWeak, setOpenWeak] = useState<number | null>(null);

  const toggleStrong = (index: number) => {
    setOpenStrong(openStrong === index ? null : index);
  };

  const toggleWeak = (index: number) => {
    setOpenWeak(openWeak === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {/* Card Veredicto */}
      <div
        className={`border-l-4 rounded-xl p-5 mb-6 ${
          isViralized
            ? 'border-green-500 bg-green-950/30'
            : 'border-amber-500 bg-amber-950/30'
        }`}
      >
        {isViralized ? (
          <h3 className="text-green-400 font-semibold text-sm">
            âœ… Este vÃ­deo viralizou â€” entenda o porquÃª
          </h3>
        ) : (
          <h3 className="text-amber-400 font-semibold text-sm">
            âš ï¸ Este vÃ­deo nÃ£o viralizou â€” veja o que melhorar
          </h3>
        )}

        <div className="text-sm text-zinc-300 mt-3 leading-relaxed space-y-2">
          {r.overall_analysis.split('\n\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>

      {/* Scores Detalhados */}
      <div>
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
          SCORES DETALHADOS
        </h4>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          <MetricCard label="Hook Score" value={r.metrics.hook_score} icon={Zap} />
          <MetricCard label="RetenÃ§Ã£o Est." value={r.metrics.retention_estimated} icon={TrendingUp} />
          <MetricCard label="Compartilhamento" value={r.metrics.share_potential} icon={Share2} />
          <MetricCard label="Qualidade Ãudio" value={r.metrics.audio_quality} icon={Volume2} />
          <MetricCard label="ForÃ§a do CTA" value={r.metrics.cta_strength} icon={MousePointerClick} />
          <MetricCard label="TÃ­tulo Otimizado" value={r.metrics.title_optimization} icon={Type} />
        </div>
      </div>

      {/* Curva de RetenÃ§Ã£o */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            CURVA DE RETENÃ‡ÃƒO
          </h4>
          <span className="bg-zinc-800 text-zinc-400 text-xs px-2 py-0.5 rounded">
            Estimada pela IA
          </span>
        </div>

        <div className="mb-6 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <RetentionChart data={r.retention_data} />
        </div>
      </div>

      {/* Pontos Fortes e Fracos */}
      <div>
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
          ANÃLISE DETALHADA
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Fortes */}
          <div>
            <h5 className="text-green-400 text-xs font-semibold uppercase mb-2">
              âœ… Pontos Fortes
            </h5>
            {r.strong_points.map((pt, idx) => {
              const isOpen = openStrong === idx;
              return (
                <div
                  key={idx}
                  onClick={() => toggleStrong(idx)}
                  className="bg-green-950/20 border border-green-900 rounded-xl p-3 mb-2 cursor-pointer transition-colors hover:bg-green-950/30"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 w-3.5 h-3.5" />
                    <span className="text-sm font-medium text-green-300">{pt.title}</span>
                  </div>
                  {isOpen && (
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      {pt.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Fracos */}
          <div>
            <h5 className="text-red-400 text-xs font-semibold uppercase mb-2">
              âš ï¸ Pontos de Melhoria
            </h5>
            {r.weak_points.map((pt, idx) => {
              const isOpen = openWeak === idx;
              return (
                <div
                  key={idx}
                  onClick={() => toggleWeak(idx)}
                  className="bg-red-950/20 border border-red-900 rounded-xl p-3 mb-2 cursor-pointer transition-colors hover:bg-red-950/30"
                >
                  <div className="flex items-center gap-2">
                    <XCircle className="text-red-400 w-3.5 h-3.5" />
                    <span className="text-sm font-medium text-red-300">{pt.title}</span>
                  </div>
                  {isOpen && (
                    <div className="mt-2 text-xs text-zinc-400 leading-relaxed">
                      <p>{pt.description}</p>
                      <p className="text-amber-300 text-xs mt-1 font-semibold">
                        ðŸ’¡ SugestÃ£o: {pt.suggestion}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gatilhos Mentais OR Plano de Melhoria */}
      {isViralized ? (
        <div>
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
            GATILHOS DETECTADOS
          </h4>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {r.mental_triggers.map((trigger, idx) => (
              <div
                key={idx}
                className="bg-blue-950/30 border border-blue-800 rounded-xl p-4 flex flex-col justify-between"
              >
                <div>
                  <span className="font-bold text-blue-300 text-sm block">
                    {trigger.name}
                  </span>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {trigger.description}
                  </p>
                </div>
                <span className="bg-zinc-800 text-zinc-400 text-[10px] px-2 py-0.5 rounded mt-2 inline-block font-mono w-fit">
                  {trigger.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
            PLANO DE MELHORIA
          </h4>

          {/* Hooks Sugeridos */}
          {r.hook_suggestions && r.hook_suggestions.length > 0 && (
            <div className="mb-4">
              <span className="text-xs text-zinc-400 uppercase tracking-wider block mb-2 font-mono">
                Hooks sugeridos pela IA
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                {r.hook_suggestions.map((hook, idx) => (
                  <div
                    key={idx}
                    className="bg-amber-950/20 border border-amber-800 rounded-xl p-4 flex flex-col justify-between min-h-[120px]"
                  >
                    <p className="text-sm text-zinc-200">{hook}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(hook);
                        alert('Hook copiado!');
                      }}
                      className="bg-amber-900/50 text-amber-300 text-xs px-3 py-1 rounded-lg hover:bg-amber-800/50 mt-3 self-start transition-colors"
                    >
                      Copiar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TÃ­tulo sugerido */}
          {r.new_title_suggestion && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-3">
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-mono">
                SugestÃ£o de TÃ­tulo
              </span>
              <p className="text-sm text-zinc-500 line-through mt-1">
                {analysis.title}
              </p>
              <p className="text-base font-bold text-white mt-0.5">
                {r.new_title_suggestion}
              </p>
              <span className="bg-blue-950/50 text-blue-300 border border-blue-800 text-xs px-2 py-0.5 rounded-full inline-block mt-2 font-mono font-medium">
                Score estimado: 96
              </span>
            </div>
          )}

          {/* HorÃ¡rios */}
          {r.best_posting_times && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-3">
              <span className="text-xs text-zinc-500 uppercase tracking-wider block mb-2 font-mono">
                Melhores HorÃ¡rios para Postagem
              </span>
              <table className="w-full text-sm mt-3 mb-3">
                <tbody>
                  {Object.entries(r.best_posting_times).map(([platform, time]) => (
                    <tr key={platform} className="border-t border-zinc-850 first:border-t-0">
                      <td className="py-2 capitalize text-zinc-400">{platform}</td>
                      <td className="py-2 text-zinc-200 font-medium font-mono text-right">{time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* CTA sugerido */}
          {r.cta_suggestion && (
            <div className="bg-sky-950/20 border border-sky-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div className="flex-1">
                <span className="text-xs text-sky-400 font-semibold uppercase font-mono block">
                  Chamada para AÃ§Ã£o Recomendada (CTA)
                </span>
                <p className="text-sm text-zinc-200 mt-1">{r.cta_suggestion}</p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(r.cta_suggestion || '');
                  alert('CTA copiado!');
                }}
                className="bg-sky-900/50 hover:bg-sky-850/50 text-sky-300 text-xs px-3 py-1.5 rounded-lg shrink-0 transition-colors"
              >
                Copiar CTA
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ ABA 2: RECREATE TAB â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

interface RecreateTabProps {
  script: {
    hook: string;
    body: string;
    cta: string;
  };
}

function RecreateTab({ script }: RecreateTabProps) {
  const [scriptState, setScriptState] = useState<'idle' | 'loading' | 'ready'>('idle');
  const [msgIndex, setMsgIndex] = useState(0);

  const loadingMessages = [
    'Analisando conceito original...',
    'Criando estrutura Ãºnica...',
    'Calculando risco de plÃ¡gio...',
  ];

  const handleGenerate = () => {
    setScriptState('loading');
    setMsgIndex(0);

    const intId = setInterval(() => {
      setMsgIndex((idx) => {
        if (idx < 2) return idx + 1;
        clearInterval(intId);
        return idx;
      });
    }, 1000);

    setTimeout(() => {
      setScriptState('ready');
    }, 3000);
  };

  if (scriptState === 'idle') {
    return (
      <div className="text-center py-16">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          <Clapperboard className="w-12 h-12 text-zinc-600 mx-auto" />
        </motion.div>
        <h3 className="text-xl font-bold mt-5 text-zinc-100">
          Gerar roteiro original inspirado neste vÃ­deo
        </h3>
        <p className="text-sm text-zinc-400 mt-2 max-w-sm mx-auto">
          A IA cria um novo roteiro com a mesma essÃªncia, sem risco de plÃ¡gio
        </p>
        <button
          onClick={handleGenerate}
          className="bg-blue-600 hover:bg-blue-500 px-8 h-12 rounded-xl mt-6 text-sm font-semibold text-white transition-colors"
        >
          ðŸŽ¬ Gerar Roteiro Agora
        </button>
      </div>
    );
  }

  if (scriptState === 'loading') {
    return (
      <div className="text-center py-16">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
        <p className="text-sm text-zinc-400 mt-4 font-medium transition-all">
          {loadingMessages[msgIndex]}
        </p>
      </div>
    );
  }

  // Ready State
  const fullScript = `HOOK:\n${script.hook}\n\nDESENVOLVIMENTO:\n${script.body}\n\nCTA:\n${script.cta}`;

  const handleExportTxt = () => {
    try {
      const blob = new Blob([fullScript], { type: 'text/plain;charset=utf-8' });
      const linkUrl = URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.href = linkUrl;
      tempLink.download = 'roteiro.txt';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      URL.revokeObjectURL(linkUrl);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-4">
      {/* Badges topo */}
      <div className="flex gap-3 mb-5">
        <span className="bg-green-900/50 text-green-300 border border-green-800 text-sm px-3 py-1 rounded-full font-medium">
          Risco de PlÃ¡gio: 4%
        </span>
        <span className="bg-blue-900/50 text-blue-300 border border-blue-800 text-sm px-3 py-1 rounded-full font-medium">
          Potencial: 89%
        </span>
      </div>

      {/* Hook Section */}
      <div className="border-l-4 border-amber-500 bg-amber-950/20 rounded-xl p-4 mb-3">
        <h4 className="text-amber-400 text-xs font-semibold uppercase mb-2 font-mono">
          ðŸª Hook de Abertura (0â€“5s)
        </h4>
        <p className="text-sm text-zinc-200 leading-relaxed">
          {script.hook}
        </p>
      </div>

      {/* Desenvolvimento */}
      <div className="border-l-4 border-blue-500 bg-blue-950/20 rounded-xl p-4 mb-3">
        <h4 className="text-blue-400 text-xs font-semibold uppercase mb-2 font-mono">
          ðŸ“ Desenvolvimento
        </h4>
        <div className="text-sm text-zinc-200 leading-relaxed space-y-2">
          {script.body.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      {/* CTA Final */}
      <div className="border-l-4 border-sky-500 bg-sky-950/20 rounded-xl p-4 mb-3">
        <h4 className="text-sky-400 text-xs font-semibold uppercase mb-2 font-mono">
          ðŸŽ¯ CTA Final
        </h4>
        <p className="text-sm text-zinc-200 leading-relaxed">
          {script.cta}
        </p>
      </div>

      {/* Barra de botÃµes */}
      <div className="flex gap-3 mt-5 flex-wrap">
        <button
          onClick={() => {
            navigator.clipboard.writeText(fullScript);
            alert('Roteiro completo copiado!');
          }}
          className="bg-zinc-800 hover:bg-zinc-700 px-4 h-9 rounded-xl text-sm flex items-center gap-1.5 transition-colors text-zinc-100 font-medium"
        >
          <Copy size={14} />
          <span>ðŸ“‹ Copiar Roteiro</span>
        </button>

        <button
          onClick={handleExportTxt}
          className="bg-zinc-800 hover:bg-zinc-700 px-4 h-9 rounded-xl text-sm flex items-center gap-1.5 transition-colors text-zinc-100 font-medium"
        >
          <Download size={14} />
          <span>ðŸ“¥ Exportar .TXT</span>
        </button>

        <button
          onClick={() => setScriptState('idle')}
          className="bg-blue-600 hover:bg-blue-500 px-4 h-9 rounded-xl text-sm flex items-center gap-1.5 transition-colors text-white font-medium"
        >
          <RefreshCw size={14} />
          <span>ðŸ”„ Regenerar</span>
        </button>
      </div>
    </div>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ ABA 3: TRANSCRIPT TAB â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

interface TranscriptLineData {
  second: number;
  text: string;
  type: 'hook' | 'cta' | 'highlight' | 'normal';
}

interface TranscriptTabProps {
  transcript: TranscriptLineData[];
}

function TranscriptTab({ transcript }: TranscriptTabProps) {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [rewriteState, setRewriteState] = useState<'idle' | 'loading' | 'ready'>('idle');

  const remodelStyles = [
    'Mais Viral',
    'Mais Emocional',
    'Mais EngraÃ§ado',
    'Mais Profissional',
    'Mais Curto',
    'Mais Impactante',
  ];

  const lineClasses = {
    hook: 'bg-amber-950/40 border-l-2 border-amber-500',
    cta: 'bg-sky-950/40 border-l-2 border-sky-500',
    highlight: 'bg-blue-950/40 border-l-2 border-blue-500',
    normal: '',
  };

  const handleRemodel = () => {
    if (!selectedStyle) return;
    setRewriteState('loading');
    setTimeout(() => {
      setRewriteState('ready');
    }, 2000);
  };

  const mockRewriteText = `[00:00] ðŸš€ E SE vocÃª pudesse duplicar suas visualizaÃ§Ãµes apenas mudando a primeira frase dos seus vÃ­deos? \n[00:08] ðŸ§  O segredo nÃ£o estÃ¡ na ediÃ§Ã£o, mas na forma como vocÃª ativa a curiosidade do seu cÃ©rebro nos primeiros 3 segundos. \n[00:20] âš¡ Quer dominar essa estratÃ©gia agora? Escreva "QUERO" aqui embaixo e vou enviar o guia completo direto no seu direct!`;

  return (
    <div className="space-y-6">
      {/* TranscriÃ§Ã£o Original */}
      <div>
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
          TRANSCRIÃ‡ÃƒO DO VÃDEO
        </h4>

        <div className="space-y-1">
          {transcript.map((line, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 px-3 py-2 rounded-r-lg ${lineClasses[line.type] || ''}`}
            >
              <span className="font-mono text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded shrink-0 mt-0.5">
                {formatDuration(line.second)}
              </span>
              <p className="text-sm text-zinc-200 leading-relaxed">
                {line.text}
              </p>
            </div>
          ))}
        </div>

        {/* Legenda */}
        <div className="flex gap-4 mt-4 text-xs text-zinc-500 font-mono">
          <span>ðŸŸ¡ Hook</span>
          <span>ðŸ”µ CTA</span>
          <span>ðŸŸ£ Destaque</span>
          <span>â¬œ Normal</span>
        </div>
      </div>

      {/* Separador com botÃ£o */}
      <div className="relative border-t border-zinc-800 my-7 flex items-center justify-center">
        <button
          onClick={handleRemodel}
          disabled={!selectedStyle || rewriteState === 'loading'}
          className="absolute bg-zinc-950 px-3 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm px-5 h-9 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>âœ¨ Remodelar com IA</span>
        </button>
      </div>

      {/* Seletor de estilo */}
      <div>
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
          ESTILO DE REMODELAGEM
        </h4>

        <div className="grid grid-cols-3 gap-2 mt-6">
          {remodelStyles.map((style) => {
            const isSelected = selectedStyle === style;
            return (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`transition-colors font-medium text-center ${
                  isSelected
                    ? 'border border-blue-500 bg-blue-950/40 text-blue-300 rounded-lg px-3 py-2 text-sm'
                    : 'border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-400 hover:border-zinc-500 cursor-pointer'
                }`}
              >
                {style}
              </button>
            );
          })}
        </div>
      </div>

      {/* Estado rewrite */}
      {rewriteState === 'loading' && (
        <div className="text-center py-6">
          <Loader2 className="text-blue-400 animate-spin mt-4 mx-auto w-8 h-8" />
          <p className="text-sm text-zinc-400 mt-2 text-center">
            IA reescrevendo roteiro...
          </p>
        </div>
      )}

      {rewriteState === 'ready' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mt-4">
          <div className="bg-blue-800 text-blue-200 text-xs px-2 py-0.5 rounded mb-3 inline-block font-mono font-semibold">
            Estilo: {selectedStyle}
          </div>

          <div className="text-sm text-zinc-200 leading-relaxed font-medium bg-zinc-950 p-4 rounded-xl border border-zinc-850 whitespace-pre-line mb-4">
            {mockRewriteText}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(mockRewriteText);
                alert('Roteiro remodelado copiado!');
              }}
              className="bg-zinc-800 text-sm px-4 h-8 rounded-lg hover:bg-zinc-700 transition text-white flex items-center gap-1.5 font-medium cursor-pointer"
            >
              <Copy size={13} />
              <span>Copiar</span>
            </button>
            <button
              onClick={() => {
                try {
                  const blob = new Blob([mockRewriteText], { type: 'text/plain;charset=utf-8' });
                  const linkUrl = URL.createObjectURL(blob);
                  const tempLink = document.createElement('a');
                  tempLink.href = linkUrl;
                  tempLink.download = `roteiro-${selectedStyle?.toLowerCase().replace(' ', '-')}.txt`;
                  document.body.appendChild(tempLink);
                  tempLink.click();
                  document.body.removeChild(tempLink);
                  URL.revokeObjectURL(linkUrl);
                } catch (e) {
                  console.error(e);
                }
              }}
              className="bg-zinc-800 text-sm px-4 h-8 rounded-lg hover:bg-zinc-700 transition text-white flex items-center gap-1.5 font-medium cursor-pointer"
            >
              <Download size={13} />
              <span>Exportar TXT</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

