// ─── Button — shared CTA component ───────────────────────────────────────────
//
// Polimórfico via `as` (required). Tres variantes: primary, secondary, link.
// Tres sizes: sm, default, lg.
//
// Nota de size lg:
//   size="lg" → text-[14px] px-8 py-3.5 (diseñado para CTAFooter).
//   El botón "Contacto" del panel mobile de Navbar necesita text-lg y distinto
//   padding → pasa className="text-lg mt-4" como override puntual.

import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type ButtonBaseProps = {
  variant: 'primary' | 'secondary' | 'link';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  children: React.ReactNode;
};

type AnchorButtonProps = ButtonBaseProps & {
  as: 'a';
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps>;

type NativeButtonProps = ButtonBaseProps & {
  as: 'button';
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

// ─── Arrow icon (solo variant="link") ────────────────────────────────────────

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="inline-block transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden="true"
    >
      <path
        d="M3 7H11M11 7L7 3M11 7L7 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Clases por variante ──────────────────────────────────────────────────────

const variantClasses: Record<NonNullable<ButtonBaseProps['variant']>, string> = {
  primary:
    'text-cream bg-coral hover:bg-deep-coral font-heading font-medium tracking-wide rounded-sm transition-all duration-300 hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(216,90,48,0.25)]',
  secondary:
    'text-cream bg-transparent border border-white/20 hover:border-white hover:bg-white/5 font-heading font-medium tracking-wide rounded-sm transition-all duration-300',
  link: 'group text-light-muted hover:text-cream bg-transparent font-heading font-medium tracking-wide gap-1 transition-colors duration-300',
};

// ─── Clases por size ──────────────────────────────────────────────────────────

const sizeClasses: Record<NonNullable<ButtonBaseProps['size']>, string> = {
  sm:      'text-[13px] px-5 py-2',
  default: 'text-[14px] px-7 py-3',
  lg:      'text-[14px] px-8 py-3.5',
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Button(props: ButtonProps) {
  const { variant, size = 'default', className = '', children } = props;

  const computedClass = [
    'inline-flex items-center',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const icon = variant === 'link' ? <ArrowRight /> : null;

  if (props.as === 'a') {
    const { as: _as, variant: _v, size: _s, className: _c, children: _ch, ...anchorProps } = props;
    return (
      <a className={computedClass} {...anchorProps}>
        {children}
        {icon}
      </a>
    );
  }

  const { as: _as, variant: _v, size: _s, className: _c, children: _ch, ...buttonProps } = props;
  return (
    <button className={computedClass} {...buttonProps}>
      {children}
      {icon}
    </button>
  );
}
