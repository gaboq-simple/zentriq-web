'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Nosotros', href: '#manifiesto' },
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Proyectos', href: '#proyectos' },
];

function HexLogo() {
  return (
    <svg
      width="28"
      height="32"
      viewBox="0 0 28 32"
      fill="none"
      className="animate-[spin_60s_linear_infinite]"
    >
      <path
        d="M14 1L26.124 8V22L14 29L1.876 22V8L14 1Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="14" cy="15" r="2" fill="currentColor" opacity="0.6" />
      <line x1="14" y1="1" x2="14" y2="13" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="14" y1="17" x2="14" y2="29" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="1.876" y1="8" x2="12" y2="15" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="16" y1="15" x2="26.124" y2="8" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 text-cream group"
          >
            <HexLogo />
            <span className="font-heading text-[13px] font-medium tracking-[0.2em] uppercase">
              Zentriq
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[13px] text-light-muted hover:text-cream transition-colors duration-300 tracking-wide group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-coral transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#contacto"
              className="text-[13px] font-medium text-cream bg-coral hover:bg-deep-coral px-5 py-2 rounded-sm transition-all duration-300 hover:scale-[1.02] tracking-wide"
            >
              Contacto
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block w-5 h-px bg-cream transition-all duration-300 origin-center ${
                  mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''
                }`}
              />
              <span
                className={`block w-5 h-px bg-cream transition-all duration-300 ${
                  mobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-5 h-px bg-cream transition-all duration-300 origin-center ${
                  mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-dark flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl text-cream font-heading tracking-wide hover:text-coral transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setMobileOpen(false)}
              className="text-lg font-medium text-cream bg-coral hover:bg-deep-coral px-8 py-3 rounded-sm transition-colors tracking-wide mt-4"
            >
              Contacto
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
