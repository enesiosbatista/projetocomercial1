import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { motion } from 'react-spring';
import { FileText, Shield, ArrowLeft } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

export const Route = createFileRoute('/terms')({
  head: () => ({
    meta: [{ title: 'Termos de Uso — ViralMind System' }],
  }),
  component: TermsPage,
});

function TermsPage() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6 md:py-12 text-white">
        {/* Back Button */}
        <button
          onClick={() => navigate({ to: '/' })}
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 text-xs font-semibold uppercase tracking-wider mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} /> Voltar para o início
        </button>

        {/* Heading */}
        <div className="border-b border-zinc-800 pb-6 mb-8">
          <div className="flex items-center gap-2 text-violet-400 mb-3">
            <FileText size={20} />
            <span className="text-xs font-semibold uppercase tracking-wider">Documento Legal</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Termos de Serviço e Uso</h1>
          <p className="text-xs text-zinc-500 mt-2 font-mono">Última atualização: 1 de Junho de 2026</p>
        </div>

        {/* Contents */}
        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e utilizar o **ViralMind System** (a "Plataforma"), você concorda em cumprir e estar legalmente vinculado a estes Termos de Serviço. Caso não concorde com qualquer parte destes termos, você deve cessar imediatamente o uso da Plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">2. Descrição do Serviço</h2>
            <p>
              O ViralMind System disponibiliza ferramentas proprietárias baseadas em algoritmos locais e chamadas de API externas para fins de diagnóstico neural, cálculo de scores de viralização, e sugestões estruturais de ganchos (hooks) e roteiros criativos de vídeo.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">3. Sistema de Créditos e Cobrança</h2>
            <p>
              Cada diagnóstico neural detalhado requer a dedução de 1 (um) crédito da conta do usuário. Créditos são disponibilizados no momento da inscrição (plano grátis) ou injetados por meio de assinaturas recorrentes integradas com o processamento da operadora Stripe. O cancelamento pode ser feito a qualquer momento no perfil do usuário.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">4. Propriedade Intelectual</h2>
            <p>
              Todos os roteiros recriados, métricas sugeridas e ideias geradas pela nossa Inteligência Artificial são de propriedade total e irrestrita do usuário. A Plataforma não reivindica quaisquer direitos de royalties, propriedade ou direitos autorais sobre os vídeos analisados ou roteiros gerados.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">5. Uso Aceitável e Segurança</h2>
            <p>
              Você concorda em não utilizar a Plataforma para violar termos de uso de terceiros (como YouTube, TikTok, Instagram) ou extrair ilegalmente dados em massa (web-scraping) de outros canais sem as devidas permissões éticas de conteúdo.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">6. Limitação de Responsabilidade</h2>
            <p>
              Os scores de viralização calculados baseiam-se em estatísticas estimadas pela IA baseando-se em métricas públicas históricas. Não garantimos ou asseguramos sucesso imediato ou viralização garantida de qualquer conteúdo postado pelo usuário após as análises.
            </p>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
export { TermsPage };
