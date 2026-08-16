import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { PortfolioService } from '../portfolio/portfolio.service';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type GeminiCandidate = {
  content?: {
    parts?: Array<{ text?: string }>;
  };
};

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(private readonly portfolio: PortfolioService) {}

  private systemPrompt() {
    return `You are Adeyemi Samuel's AI portfolio presence.

Use this approved portfolio context:
${this.portfolio.buildContext()}

Style:
- Keep the tone natural, direct, and confident.
- Speak primarily as Samuel in first person.
- Switch to guide mode for navigation, project demo/test links, contact, CRM, and booking.
- For recruiters, lead with technical strengths: full-stack delivery, native iOS/mobile apps, fintech systems, social/community apps, APIs, TypeScript, NestJS, React, product ownership, and deployment.
- When asked about hiring, projects, expertise, mobile, iOS, fintech, or social apps, point to the structured project tracks and explain responsibilities clearly.
- Do not sound generic or over-explain the website itself.`;
  }

  private openAiApiKey() {
    const key = process.env.OPENAI_API_KEY || '';
    return key.startsWith('sk-') ? key : '';
  }

  private geminiApiKey() {
    const explicitKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY || '';
    if (explicitKey) return explicitKey;

    const legacySlot = process.env.OPENAI_API_KEY || '';
    return legacySlot && !legacySlot.startsWith('sk-') ? legacySlot : '';
  }

  private localPortfolioReply(message: string) {
    const wantsProjects = /project|work|test|demo|source|github|portfolio|recruiter|hire|expertise|strength|mobile|ios|fintech|social/i.test(message);
    const wantsStack = /tech|stack|tools|language|framework|nestjs|react|typescript/i.test(message);
    const wantsContact = /contact|email|call|book|calendar|hire|available/i.test(message);

    if (wantsProjects) {
      return {
        message:
          'For recruiters: my strongest areas are full-stack product engineering, native iOS/mobile apps, fintech systems, social/community apps, typed APIs, React/Next.js, NestJS, and production delivery. The tracks below show purpose, responsibilities, implementation, and links.',
        projects: this.portfolio.getProjects()
      };
    }

    if (wantsStack) {
      return {
        message:
          'I work mainly with React, Next.js, TypeScript, NestJS, APIs, databases, AI integrations, and production deployment workflows.',
        projects: []
      };
    }

    if (wantsContact) {
      const { email, websiteUrl } = this.portfolio.getPortfolio().profile;
      return {
        message: `You can contact me at ${email}. You can also use my website reference here: ${websiteUrl}`,
        projects: []
      };
    }

    return {
      message:
        "I'm running from approved local portfolio context right now. Ask about my projects, tech stack, background, contact, or booking and I will keep it grounded.",
      projects: []
    };
  }

  private async chatWithGemini(message: string, history: ChatMessage[]) {
    const apiKey = this.geminiApiKey();
    const configuredModel = process.env.GEMINI_MODEL || 'gemini-flash-latest';
    const configuredModelName = configuredModel.startsWith('models/') ? configuredModel.slice('models/'.length) : configuredModel;
    const modelFallbacks = [
      configuredModelName,
      'gemini-flash-lite-latest',
      'gemini-3.5-flash-lite',
      'gemini-3.1-flash-lite',
      'gemini-3-flash-preview'
    ].filter((model, index, models) => model && models.indexOf(model) === index);

    let lastError = 'Gemini request failed.';
    for (const model of modelFallbacks) {
      try {
        return await this.generateGeminiContent({ apiKey, model, message, history });
      } catch (error) {
        lastError = error instanceof Error ? error.message : 'Unknown Gemini error';
      }
    }

    throw new Error(lastError);
  }

  private async generateGeminiContent({
    apiKey,
    model,
    message,
    history
  }: {
    apiKey: string;
    model: string;
    message: string;
    history: ChatMessage[];
  }) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: this.systemPrompt() }]
          },
          contents: [
            ...history.slice(-8).map((item) => ({
              role: item.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: item.content.slice(0, 2000) }]
            })),
            {
              role: 'user',
              parts: [{ text: message.slice(0, 2000) }]
            }
          ],
          generationConfig: {
            temperature: 0.35,
            maxOutputTokens: 450
          }
        })
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || `Gemini request failed with ${response.status}`);
    }

    const text =
      data?.candidates
        ?.flatMap((candidate: GeminiCandidate) => candidate.content?.parts || [])
        ?.map((part: { text?: string }) => part.text || '')
        ?.join('')
        ?.trim() || 'I do not have that detail yet.';

    return text;
  }

  async chat(message: string, history: ChatMessage[] = []) {
    const wantsProjects = /project|work|test|demo|source|github|portfolio|recruiter|hire|expertise|strength|mobile|ios|fintech|social/i.test(message);
    const geminiKey = this.geminiApiKey();
    const openAiKey = this.openAiApiKey();

    if (geminiKey) {
      try {
        return {
          message: await this.chatWithGemini(message, history),
          projects: wantsProjects ? this.portfolio.getProjects() : [],
          provider: 'gemini'
        };
      } catch (error) {
        this.logger.warn(`Gemini chat failed; using local fallback. ${error instanceof Error ? error.message : 'Unknown error'}`);
        return { ...this.localPortfolioReply(message), provider: 'local-fallback' };
      }
    }

    if (openAiKey) {
      try {
        const client = new OpenAI({ apiKey: openAiKey });
        const response = await client.chat.completions.create({
          model: process.env.OPENAI_TEXT_MODEL || 'gpt-4o-mini',
          messages: [
            { role: 'system', content: this.systemPrompt() },
            ...history.slice(-8),
            { role: 'user', content: message.slice(0, 2000) }
          ],
          temperature: 0.35,
          max_tokens: 450
        });

        return {
          message: response.choices[0]?.message?.content || 'I do not have that detail yet.',
          projects: wantsProjects ? this.portfolio.getProjects() : [],
          provider: 'openai'
        };
      } catch (error) {
        this.logger.warn(`OpenAI chat failed; using local fallback. ${error instanceof Error ? error.message : 'Unknown error'}`);
        return { ...this.localPortfolioReply(message), provider: 'local-fallback' };
      }
    }

    return { ...this.localPortfolioReply(message), provider: 'local-fallback' };
  }

  async realtimeSession() {
    const openAiKey = this.openAiApiKey();
    if (!openAiKey) {
      return {
        statusCode: 501,
        body: {
          error:
            'OpenAI Realtime is not configured. The frontend will use browser speech recognition and speech synthesis as the local voice fallback.'
        }
      };
    }

    const response = await fetch('https://api.openai.com/v1/realtime/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.OPENAI_REALTIME_MODEL || 'gpt-realtime',
        voice: process.env.OPENAI_REALTIME_VOICE || 'marin',
        instructions: this.systemPrompt()
      })
    });

    return { statusCode: response.status, body: await response.json() };
  }

  async speech(text: string, voice = process.env.OPENAI_TTS_VOICE || 'marin') {
    const openAiKey = this.openAiApiKey();
    if (!openAiKey) {
      return {
        statusCode: 501,
        body: {
          error:
            'OpenAI speech is not configured. The frontend will use browser speech synthesis as the local voice fallback.'
        }
      };
    }

    const client = new OpenAI({ apiKey: openAiKey });
    const audio = await client.audio.speech.create({
      model: process.env.OPENAI_TTS_MODEL || 'gpt-4o-mini-tts',
      voice,
      input: text.slice(0, 1500)
    });

    return audio;
  }
}
