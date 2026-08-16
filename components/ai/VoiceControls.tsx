'use client';

import { Mic, MicOff, Square } from 'lucide-react';
import { IconButton } from '@/components/ui/IconButton';

type VoiceControlsProps = {
  status: 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';
  onStart: () => void;
  onStop: () => void;
};

export function VoiceControls({ status, onStart, onStop }: VoiceControlsProps) {
  const active = status === 'listening' || status === 'thinking' || status === 'speaking';

  return (
    <div className="flex items-center gap-2">
      <IconButton label={active ? 'Mute microphone' : 'Start voice'} onClick={active ? onStop : onStart}>
        {active ? <MicOff size={18} /> : <Mic size={18} />}
      </IconButton>
      {active ? (
        <IconButton label="Stop voice session" onClick={onStop}>
          <Square size={16} />
        </IconButton>
      ) : null}
      <span className="sr-only">{status}</span>
    </div>
  );
}
