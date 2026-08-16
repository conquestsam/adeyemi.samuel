import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50',
        variant === 'primary' && 'bg-cobalt text-white hover:bg-cobalt/90',
        variant === 'secondary' && 'border border-white/12 bg-white/8 text-white hover:bg-white/12',
        variant === 'ghost' && 'text-slate-300 hover:bg-white/8 hover:text-white',
        className
      )}
      {...props}
    />
  )
);

Button.displayName = 'Button';
