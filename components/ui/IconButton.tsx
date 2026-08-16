import { type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export function IconButton({ label, className, ...props }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-white/8 text-slate-200 transition hover:bg-white/14 hover:text-white disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}
