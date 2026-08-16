import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-white/10 bg-white/6 px-2 py-1 text-xs text-slate-300',
        className
      )}
      {...props}
    />
  );
}
