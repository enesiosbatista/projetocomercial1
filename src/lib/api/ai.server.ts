import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import process from 'node:process';
import { VIRAL_ANALYSIS_PROMPT } from '../systemPrompts';
import { mockAnalysis } from '../mockData';

// Setup Instructions for OpenAI:
// 1. Install dependencies: npm install openai
// 2. Set environment variable: OPENAI_API_KEY=sk-proj-...

export const analyzeVideoWithAI = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      videoUrl: z.string().url(),
      platform: z.string().min(1),
    })
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.OPENAI_API_KEY;

    console.log(`[AI Server] Received analysis request for ${data.videoUrl} on ${data.platform}`);

    if (!apiKey) {
      console.warn(
        `[AI Server WARNING] OPENAI_API_KEY environment variable is not defined. Falling back to high-fidelity mock video analysis.`
      );
      
      // Simulate real AI latency
      await new Promise((r) => setTimeout(r, 2000));
      
      // Adapt mock values to custom request details
      return {
        success: true,
        isMock: true,
        analysis: {
          ...mockAnalysis,
          url: data.videoUrl,
          platform: data.platform as any,
          created_at: new Date().toISOString(),
        },
      };
    }

    try {
      console.log('[AI Server] Invoking OpenAI API...');

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: VIRAL_ANALYSIS_PROMPT,
            },
            {
              role: 'user',
              content: `Por favor, analise o seguinte vídeo da plataforma ${data.platform}: ${data.videoUrl}`,
            },
          ],
          temperature: 0.7,
          response_format: { type: 'json_object' },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
      }

      const completion = await response.json();
      const content = completion.choices[0].message.content;
      const parsedResult = JSON.parse(content);

      // Construct a standardized database-compliant Analysis model using GPT-4o output
      const resultAnalysis = {
        id: `analysis-${Math.random().toString(36).substr(2, 9)}`,
        user_id: 'user-active',
        url: data.videoUrl,
        platform: data.platform as any,
        title: parsedResult.new_title_suggestion || 'Vídeo Analisado com IA',
        thumbnail_url: `https://picsum.photos/seed/viral${Math.floor(Math.random() * 100)}/640/360`,
        duration_seconds: Math.floor(Math.random() * 300) + 30, // 30s to 330s
        viral_score: parsedResult.metrics?.hook_score ? Math.round(
          (parsedResult.metrics.hook_score +
            parsedResult.metrics.retention_estimated +
            parsedResult.metrics.share_potential) / 3
        ) : 80,
        status: 'complete' as const,
        result: parsedResult,
        created_at: new Date().toISOString(),
      };

      return {
        success: true,
        isMock: false,
        analysis: resultAnalysis,
      };
    } catch (error: any) {
      console.error('[AI Server Error] Fail during OpenAI invocation: ', error);
      
      // Secondary fallback on API failure
      return {
        success: false,
        error: error.message || 'Falha na resposta da inteligência artificial.',
        isMock: true,
        analysis: {
          ...mockAnalysis,
          url: data.videoUrl,
          platform: data.platform as any,
          created_at: new Date().toISOString(),
        },
      };
    }
  });
