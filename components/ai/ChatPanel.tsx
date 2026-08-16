'use client';

import { Send } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';
import { VoiceControls } from '@/components/ai/VoiceControls';
import { IconButton } from '@/components/ui/IconButton';
import { projects } from '@/content/projects';
import { quickPrompts } from '@/content/prompts';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (process.env.NODE_ENV === 'production' ? 'https://adeyemi-samuel.onrender.com' : 'http://localhost:4000');

type Message = {
  role: 'user' | 'assistant';
  content: string;
  projects?: ProjectCard[];
};

type ChatPanelProps = {
  onVoiceStateChange: (state: 'idle' | 'listening' | 'thinking' | 'speaking' | 'error') => void;
};

type ProjectCard = {
  slug: string;
  title: string;
  explanation: string;
  purpose: string;
  responsibilities: readonly string[];
  technicalImplementation: string;
  stack?: readonly string[];
  liveUrl?: string;
  repoUrl?: string;
  testUrl?: string;
  testLabel?: string;
};

type SpeechRecognitionConstructor = new () => {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: { results: ArrayLike<{ 0: { transcript: string } }> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export function ChatPanel({ onVoiceStateChange }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Ask me anything about my work."
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<'idle' | 'listening' | 'thinking' | 'speaking' | 'error'>('idle');
  const [voiceMode, setVoiceMode] = useState(false);
  const hasStarted = messages.some((message) => message.role === 'user');

  const projectActions = useMemo(
    () => projects.filter((project) => project.liveUrl || project.repoUrl || project.testUrl),
    []
  );

  function localProjectCards(): ProjectCard[] {
    return projects.map((project) => ({
      slug: project.slug,
      title: project.title,
      explanation: project.explanation,
      purpose: project.purpose,
      responsibilities: project.responsibilities,
      technicalImplementation: project.technicalImplementation,
      stack: project.stack,
      liveUrl: project.liveUrl,
      repoUrl: project.repoUrl,
      testUrl: project.testUrl,
      testLabel: project.testLabel
    }));
  }

  async function sendMessage(text: string, options: { speak?: boolean } = {}) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const wantsProjects = /project|work|test|demo|source|github|portfolio|recruiter|hire|expertise|strength|mobile|ios|fintech|social/i.test(trimmed);
    const nextMessages: Message[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/ai/chat`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history: messages })
      });
      const data = await response.json();
      const reply =
        data.message ||
        'For recruiters: I am strongest across full-stack product engineering, native iOS/mobile app flows, fintech systems, social/community apps, typed APIs, and production delivery.';
      const responseProjects = Array.isArray(data.projects) && data.projects.length > 0 ? data.projects : wantsProjects ? localProjectCards() : undefined;
      setMessages([...nextMessages, { role: 'assistant', content: reply, projects: responseProjects }]);
      if (voiceMode || options.speak) speakLocal(reply);
    } catch {
      const reply = wantsProjects
        ? 'Here are the recruiter-facing project and strength tracks I can show from local portfolio data.'
        : 'API offline. I can still listen locally and show approved project references.';
      setMessages([...nextMessages, { role: 'assistant', content: reply, projects: wantsProjects ? localProjectCards() : undefined }]);
      if (voiceMode || options.speak) speakLocal(reply);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function speakLocal(text: string) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/`/g, ''));
    const voices = window.speechSynthesis.getVoices();
    const voice =
      voices.find((item) => /samantha|daniel|google|microsoft|natural/i.test(item.name) && /^en/i.test(item.lang)) ||
      voices.find((item) => /^en/i.test(item.lang));
    if (voice) utterance.voice = voice;
    utterance.rate = 0.9;
    utterance.pitch = 0.98;
    utterance.onstart = () => {
      setVoiceStatus('speaking');
      onVoiceStateChange('speaking');
    };
    utterance.onend = () => {
      setVoiceStatus('idle');
      onVoiceStateChange('idle');
    };
    window.speechSynthesis.speak(utterance);
  }

  function startLocalVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const readyMessage = 'Voice ready.';
    setVoiceMode(true);
    setMessages((current) => [...current, { role: 'assistant', content: readyMessage }]);
    speakLocal(readyMessage);

    if (!SpeechRecognition) {
      const reply = 'Voice input is unavailable in this browser. Text chat still works.';
      setMessages((current) => [...current, { role: 'assistant', content: reply }]);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript || '';
      void sendMessage(transcript, { speak: true });
    };
    recognition.onerror = () => {
      setVoiceStatus('error');
      onVoiceStateChange('error');
    };
    recognition.onend = () => {
      setVoiceStatus('idle');
      onVoiceStateChange('idle');
    };
    recognition.start();
  }

  async function startVoice() {
    setVoiceMode(true);
    setVoiceStatus('listening');
    onVoiceStateChange('listening');
    try {
      const response = await fetch(`${API_BASE_URL}/ai/realtime/session`, { method: 'POST' });
      if (!response.ok) throw new Error('Realtime unavailable');
      setVoiceStatus('speaking');
      onVoiceStateChange('speaking');
      setMessages((current) => [
        ...current,
        { role: 'assistant', content: 'Voice session ready.' }
      ]);
    } catch {
      startLocalVoice();
    }
  }

  function stopVoice() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setVoiceMode(false);
    setVoiceStatus('idle');
    onVoiceStateChange('idle');
  }

  return (
    <section className="mx-auto w-full max-w-2xl">
      <div className="mb-3 max-h-72 space-y-2 overflow-y-auto px-1" aria-live="polite">
        {messages.slice(-4).map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={
              message.role === 'user'
                ? 'ml-12 rounded-2xl bg-white/10 px-3 py-2 text-xs text-white backdrop-blur-sm'
                : 'mr-12 rounded-2xl bg-gray-900/70 px-3 py-2 text-xs text-gray-200 backdrop-blur-sm'
            }
          >
            {message.content}
            {message.projects?.length ? (
              <div className="mt-3 space-y-2">
                {message.projects.map((project) => (
                  <article key={project.slug} className="rounded-xl border border-white/10 bg-black/25 p-3 text-left">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h2 className="text-sm font-semibold text-white">{project.title}</h2>
                      <a
                        className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white transition hover:bg-white/10"
                        href={project.testUrl || project.liveUrl || project.repoUrl || 'https://adeyemi-samuel-portfolio.vercel.app/'}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {project.testLabel || 'Open project'}
                      </a>
                    </div>
                    <dl className="mt-2 space-y-2 text-[11px] leading-5 text-gray-300">
                      <div>
                        <dt className="font-medium text-gray-100">Explanation</dt>
                        <dd>{project.explanation}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-100">Purpose</dt>
                        <dd>{project.purpose}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-100">Responsibilities</dt>
                        <dd>{project.responsibilities.join(' ')}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-100">Technical implementation</dt>
                        <dd>{project.technicalImplementation}</dd>
                      </div>
                      {project.stack?.length ? (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.stack.map((item) => (
                            <span key={item} className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-gray-200">
                              {item}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </dl>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        {loading ? <div className="mr-12 rounded-2xl bg-gray-900/70 px-3 py-2 text-xs text-gray-400">Thinking...</div> : null}
      </div>

      {!hasStarted ? (
        <>
          <div className="mb-2 flex flex-wrap justify-center gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
                onClick={() => void sendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="mb-2 flex flex-wrap justify-center gap-2">
            {projectActions.map((project) => (
              <a
                key={project.slug}
                className="rounded-full border border-white/10 bg-gray-900/70 px-3 py-1.5 text-xs text-gray-300 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
                href={project.testUrl || project.liveUrl || project.repoUrl}
                target="_blank"
                rel="noreferrer"
              >
                {project.testLabel || project.title}
              </a>
            ))}
          </div>
        </>
      ) : null}

      <form onSubmit={onSubmit} className="flex gap-2 rounded-xl border border-white/10 bg-gray-950/70 p-2 shadow-2xl backdrop-blur-md">
        <input
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask me anything..."
        />
        <VoiceControls status={voiceStatus} onStart={startVoice} onStop={stopVoice} />
        <IconButton label="Send message" type="submit" disabled={loading} className="shrink-0">
          <Send size={18} />
        </IconButton>
      </form>
    </section>
  );
}
