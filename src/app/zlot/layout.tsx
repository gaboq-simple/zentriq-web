import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zlot — Agenda inteligente por WhatsApp | Zentriq Mexico',
  description:
    'Automatiza las citas de tu barbería con WhatsApp. Plataforma oficial ' +
    'de Meta Tech Provider. Sin apps extras.',
  openGraph: {
    title: 'Zlot — Agenda inteligente por WhatsApp | Zentriq Mexico',
    description:
      'Automatiza las citas de tu barbería con WhatsApp. Plataforma oficial ' +
      'de Meta Tech Provider. Sin apps extras.',
    url: 'https://zentriq.mx/zlot',
  },
};

export default function ZlotLayout({ children }: { children: React.ReactNode }) {
  return children;
}
