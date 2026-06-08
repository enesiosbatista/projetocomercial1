import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { motion } from 'react-spring';
import { FileText, Shield, ArrowLeft } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

export const Route = createFileRoute('/terms')({
  head: () => ({
    meta: [{ title: 'Termos de Uso â€” ViralMind System' }],
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
          <ArrowLeft size={14} /> Voltar para o inÃ­cio
        </button>

        {/* Heading */}
        <div className="border-b border-zinc-800 pb-6 mb-8">
          <div className="flex items-center gap-2 text-blue-400 mb-3">
            <FileText size={20} />
            <span className="text-xs font-semibold uppercase tracking-wider">Documento Legal</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Termos de ServiÃ§o e Uso</h1>
          <p className="text-xs text-zinc-500 mt-2 font-mono">Ãšltima atualizaÃ§Ã£o: 1 de Junho de 2026</p>
        </div>

        {/* Contents */}
        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">1. AceitaÃ§Ã£o dos Termos</h2>
            <p>
              Ao acessar e utilizar o **ViralMind System** (a "Plataforma"), vocÃª concorda em cumprir e estar legalmente vinculado a estes Termos de ServiÃ§o. Caso nÃ£o concorde com qualquer parte destes termos, vocÃª deve cessar imediatamente o uso da Plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">2. DescriÃ§Ã£o do ServiÃ§o</h2>
            <p>
              O ViralMind System disponibiliza ferramentas proprietÃ¡rias baseadas em algoritmos locais e chamadas de API externas para fins de diagnÃ³stico neural, cÃ¡lculo de scores de viralizaÃ§Ã£o, e sugestÃµes estruturais de ganchos (hooks) e roteiros criativos de vÃ­deo.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">3. Sistema de CrÃ©ditos e CobranÃ§a</h2>
            <p>
              Cada diagnÃ³stico neural detalhado requer a deduÃ§Ã£o de 1 (um) crÃ©dito da conta do usuÃ¡rio. CrÃ©ditos sÃ£o disponibilizados no momento da inscriÃ§Ã£o (plano grÃ¡tis) ou injetados por meio de assinaturas recorrentes integradas com o processamento da operadora Stripe. O cancelamento pode ser feito a qualquer momento no perfil do usuÃ¡rio.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">4. Propriedade Intelectual</h2>
            <p>
              Todos os roteiros recriados, mÃ©tricas sugeridas e ideias geradas pela nossa InteligÃªncia Artificial sÃ£o de propriedade total e irrestrita do usuÃ¡rio. A Plataforma nÃ£o reivindica quaisquer direitos de royalties, propriedade ou direitos autorais sobre os vÃ­deos analisados ou roteiros gerados.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">5. Uso AceitÃ¡vel e SeguranÃ§a</h2>
            <p>
              VocÃª concorda em nÃ£o utilizar a Plataforma para violar termos de uso de terceiros (como YouTube, TikTok, Instagram) ou extrair ilegalmente dados em massa (web-scraping) de outros canais sem as devidas permissÃµes Ã©ticas de conteÃºdo.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">6. LimitaÃ§Ã£o de Responsabilidade</h2>
            <p>
              Os scores de viralizaÃ§Ã£o calculados baseiam-se em estatÃ­sticas estimadas pela IA baseando-se em mÃ©tricas pÃºblicas histÃ³ricas. NÃ£o garantimos ou asseguramos sucesso imediato ou viralizaÃ§Ã£o garantida de qualquer conteÃºdo postado pelo usuÃ¡rio apÃ³s as anÃ¡lises.
            </p>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
export { TermsPage };

