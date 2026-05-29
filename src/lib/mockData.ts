import type {
  Analysis,
  ConnectedAccount,
  Insight,
  Platform,
  Profile,
  ProfileScore,
  TopContent,
} from '@/types/database';

export const mockUser: Profile = {
  id: 'user-001',
  username: 'João Silva',
  plan: 'free',
  credits: 3,
  created_at: '2026-04-01T10:00:00Z',
};

const retentionCurve = [
  { second: 0, retention: 100 },
  { second: 20, retention: 97 },
  { second: 40, retention: 93 },
  { second: 60, retention: 88 },
  { second: 80, retention: 84 },
  { second: 100, retention: 80 },
  { second: 120, retention: 76 },
  { second: 140, retention: 73 },
  { second: 160, retention: 70 },
  { second: 180, retention: 65 },
  { second: 200, retention: 62 },
  { second: 220, retention: 60 },
  { second: 240, retention: 63 },
  { second: 260, retention: 67 },
  { second: 280, retention: 70 },
  { second: 300, retention: 72 },
  { second: 320, retention: 74 },
  { second: 340, retention: 69 },
  { second: 360, retention: 63 },
  { second: 387, retention: 58 },
];

export const mockAnalysis: Analysis = {
  id: 'mock-001',
  user_id: 'user-001',
  url: 'https://youtube.com/watch?v=exemplo',
  platform: 'youtube',
  title: 'Como ganhar R$10.000 por mês trabalhando 4 horas por dia',
  thumbnail_url: 'https://picsum.photos/seed/viral1/640/360',
  duration_seconds: 387,
  viral_score: 87,
  status: 'complete',
  created_at: new Date(Date.now() - 7_200_000).toISOString(),
  isFavorited: false,
  result: {
    verdict: 'viralized',
    overall_analysis:
      'Este vídeo viralizou por combinar um hook impossível de ignorar nos primeiros 3 segundos com uma promessa específica e mensurável. O criador usa prova social com número concreto (1.200 alunos), ritmo acelerado de cortes e um CTA com senso de urgência genuíno — tudo orquestrado para sustentar a curva de retenção acima de 70% até a metade do vídeo.\n\nA progressão emocional alterna entre vulnerabilidade, instrução prática e antecipação, evitando a queda típica aos 30 segundos. A escolha de título alinhado com a thumbnail criou um CTR estimado acima de 12%, muito superior à média do nicho.',
    metrics: {
      hook_score: 91,
      retention_estimated: 78,
      share_potential: 88,
      audio_quality: 82,
      cta_strength: 76,
      title_optimization: 94,
    },
    retention_data: retentionCurve,
    strong_points: [
      { title: 'Hook irresistível nos primeiros 3s', description: 'Abre uma lacuna de informação que obriga o cérebro a buscar a resposta.' },
      { title: 'Prova social com número concreto', description: 'Menciona 1.200 alunos que aplicaram o método — aumenta credibilidade instantânea.' },
      { title: 'Ritmo acelerado com cortes rápidos', description: 'Mantém a atenção acima de 70% até o meio do vídeo graças a cortes a cada 2-3s.' },
      { title: 'Thumbnail com contraste alto e texto visível', description: 'CTR estimado acima da média do nicho graças à hierarquia visual clara.' },
      { title: 'CTA com senso de urgência genuíno', description: 'A chamada para ação aparece no pico de engajamento, não no fim.' },
    ],
    weak_points: [
      {
        title: 'Queda brusca no segundo 180',
        description: 'Transição longa demais entre o bloco de contexto e o método principal.',
        suggestion: 'Cortar a introdução do método para máximo 8 segundos.',
      },
      {
        title: 'Thumbnail não testada em mobile',
        description: 'Texto fica pequeno em telas menores que 5 polegadas.',
        suggestion: 'Usar fonte maior e menos texto na thumbnail.',
      },
    ],
    mental_triggers: [
      { name: 'Curiosidade', description: 'Headline cria lacuna de informação — cérebro busca completar a resposta.', timestamp: '00:00' },
      { name: 'Urgência', description: 'Implica que a janela de oportunidade é limitada no mercado atual.', timestamp: '00:45' },
      { name: 'Prova Social', description: 'Menciona 1.200 alunos que já aplicaram o método com sucesso.', timestamp: '01:20' },
      { name: 'Antecipação', description: 'Promete revelar o método completo apenas no final do vídeo.', timestamp: '02:10' },
    ],
    transcript: [
      { timestamp: '0:00', text: 'Se você trabalha 8 horas por dia e ainda assim não sobra dinheiro, esse vídeo é pra você.', type: 'hook' },
      { timestamp: '0:12', text: 'Há dois anos eu estava exatamente onde você está agora.', type: 'hook' },
      { timestamp: '0:34', text: 'Mas descobri uma coisa que mudou tudo — e não é o que você pensa.', type: 'normal' },
      { timestamp: '1:02', text: 'A primeira coisa que precisa entender é a matemática do tempo livre.', type: 'highlight' },
      { timestamp: '1:48', text: 'Olha esse print: R$ 13.247 no último mês trabalhando do sofá.', type: 'normal' },
      { timestamp: '2:30', text: 'Existem três pilares que sustentam qualquer renda alta com pouco tempo.', type: 'normal' },
      { timestamp: '3:15', text: 'Veja o resultado da Maria: aplicou o método e em 60 dias dobrou a renda.', type: 'highlight' },
      { timestamp: '3:58', text: 'O segundo pilar é o que mais gente erra — e eu cometi por anos.', type: 'normal' },
      { timestamp: '4:45', text: 'Anota essa frase: produtividade não é fazer mais, é fazer o certo.', type: 'normal' },
      { timestamp: '5:20', text: 'Se isso te ajudou, deixa o like e se inscreve — isso me ajuda demais.', type: 'cta' },
      { timestamp: '5:42', text: 'Agora vou te entregar o terceiro pilar, o que ninguém fala.', type: 'normal' },
      { timestamp: '6:00', text: 'Te vejo no próximo vídeo. Valeu!', type: 'normal' },
    ],
    script_recreation: {
      hook: 'E se eu te dissesse que a sua rotina atual está te custando exatamente R$10.000 por mês? Não é falta de esforço — é falta de sistema.',
      body: 'Comece mostrando o problema universal (cansaço + falta de dinheiro). Em seguida, apresente o método de trabalho focado em três blocos: eliminação de tarefas de baixo valor, priorização por impacto e automação de processos repetitivos. Finalize com prova social real e um framework simples que o espectador possa aplicar amanhã.',
      cta: "Se você chegou até aqui, você já está na frente de 90% das pessoas. Agora é só aplicar. Comenta 'SISTEMA' aqui embaixo que eu te mando o checklist gratuito.",
      plagiarism_risk: 4,
      viral_potential: 89,
    },
    new_title_suggestion: 'Eu Trabalhava 12h Por Dia Até Descobrir Isso — Agora São 4h e Ganho o Dobro',
    hook_suggestions: [
      'Você está trocando tempo por dinheiro do jeito errado — e nem percebe',
      'O método que fez 1.200 pessoas reduzirem a jornada e dobrarem o faturamento',
      'Para de trabalhar mais. Começa a trabalhar certo. Vou te mostrar como em 6 minutos',
    ],
    best_posting_times: {
      youtube: '19:00–21:00 Ter/Qui',
      tiktok: '18:00–20:00 todos os dias',
      reels: '20:00–22:00 Seg/Qua/Sex',
      shorts: '17:00–19:00 Ter/Sáb',
    },
  },
};

interface ListSeed {
  id: string;
  platform: Platform;
  title: string;
  score: number;
  isFavorited: boolean;
  hoursAgo: number;
  duration: number;
}

const listSeeds: ListSeed[] = [
  { id: 'mock-002', platform: 'tiktok', title: 'Receita de bolo de pote que viralizou no TikTok', score: 91, isFavorited: true, hoursAgo: 1, duration: 62 },
  { id: 'mock-003', platform: 'reels', title: '5 exercícios para definir o abdômen em casa', score: 78, isFavorited: false, hoursAgo: 3, duration: 95 },
  { id: 'mock-004', platform: 'youtube', title: 'Por que eu parei de usar React e voltei para o básico', score: 23, isFavorited: false, hoursAgo: 24, duration: 512 },
  { id: 'mock-005', platform: 'shorts', title: 'Como economizar R$500 por mês sem sofrer', score: 65, isFavorited: false, hoursAgo: 48, duration: 58 },
  { id: 'mock-006', platform: 'instagram', title: 'Meu setup completo para trabalhar de casa em 2026', score: 88, isFavorited: true, hoursAgo: 72, duration: 180 },
  { id: 'mock-007', platform: 'tiktok', title: 'Esse erro de marketing está te fazendo perder clientes', score: 42, isFavorited: false, hoursAgo: 120, duration: 74 },
  { id: 'mock-008', platform: 'reels', title: 'Tutorial de edição rápida para Reels do zero', score: 71, isFavorited: false, hoursAgo: 192, duration: 110 },
  { id: 'mock-009', platform: 'youtube', title: 'Testei 30 dias de acordar às 5h — resultado honesto', score: 55, isFavorited: false, hoursAgo: 360, duration: 420 },
];

export const mockAnalysisList: Analysis[] = listSeeds.map((s, i) => ({
  ...mockAnalysis,
  id: s.id,
  title: s.title,
  platform: s.platform,
  viral_score: s.score,
  duration_seconds: s.duration,
  thumbnail_url: `https://picsum.photos/seed/viral${i + 2}/640/360`,
  isFavorited: s.isFavorited,
  created_at: new Date(Date.now() - s.hoursAgo * 3_600_000).toISOString(),
  result: {
    ...mockAnalysis.result,
    verdict: s.score >= 70 ? 'viralized' : 'not_viralized',
  },
}));

export const mockProfileScores: ProfileScore = {
  overall: 74,
  viralization: 81,
  retention: 68,
  consistency: 55,
  engagement: 77,
};

export const mockConnectedAccounts: ConnectedAccount[] = [
  { platform: 'youtube', username: '@joaosilva', followers: 12400, connected: true },
  { platform: 'instagram', username: '@joao.silva', followers: 8900, connected: true },
  { platform: 'tiktok', username: '', followers: 0, connected: false },
  { platform: 'facebook', username: '', followers: 0, connected: false },
];

export const mockTopContent: TopContent[] = [
  { rank: 1, title: 'Como ganhar R$10.000 por mês trabalhando 4h por dia', platform: 'youtube', viral_score: 94, views: 340000, why_viral: 'Hook com lacuna de informação + prova social com número concreto.', thumbnail_url: 'https://picsum.photos/seed/top1/640/360' },
  { rank: 2, title: 'Receita de bolo de pote que viralizou no TikTok', platform: 'tiktok', viral_score: 91, views: 215000, why_viral: 'Visual extremamente apetitoso nos 2 primeiros segundos.', thumbnail_url: 'https://picsum.photos/seed/top2/640/360' },
  { rank: 3, title: 'Meu setup completo para trabalhar de casa em 2026', platform: 'instagram', viral_score: 88, views: 87000, why_viral: 'Aspiracional + carrosséis salváveis disparam o alcance.', thumbnail_url: 'https://picsum.photos/seed/top3/640/360' },
  { rank: 4, title: '5 exercícios para definir o abdômen em casa', platform: 'reels', viral_score: 78, views: 48000, why_viral: 'Promessa específica de resultado + execução em loop.', thumbnail_url: 'https://picsum.photos/seed/top4/640/360' },
  { rank: 5, title: 'Tutorial de edição rápida para Reels do zero', platform: 'reels', viral_score: 71, views: 12000, why_viral: 'Tutorial salvável com timing perfeito para o algoritmo.', thumbnail_url: 'https://picsum.photos/seed/top5/640/360' },
];

export const mockInsights: Insight = {
  ideal_frequency: '1 vídeo por dia',
  best_days: ['Terça', 'Quinta', 'Sábado'],
  best_hours: ['19:00', '21:00'],
  best_format: 'Shorts de 45–60s',
  stop_doing: [
    'Vídeos com mais de 8 minutos no seu nicho',
    'Thumbnails com fundo escuro e texto pequeno',
    'Postar às segundas-feiras (seu pior dia historicamente)',
  ],
  keep_doing: [
    'Hooks com pergunta direta nos primeiros 3 segundos',
    'Legendas em todos os vídeos (aumenta retenção 34%)',
    'CTAs com urgência no minuto final',
  ],
  scale_now: [
    'Série de vídeos curtos sobre produtividade (viralizando no nicho)',
    'Formato de "erro que cometi" — seu público responde muito bem',
    'Colaborações — seus vídeos em dupla têm 2.3x mais alcance',
  ],
};
