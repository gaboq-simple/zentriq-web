import type { Metadata } from 'next';
import { Space_Grotesk, DM_Sans } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Zentriq — Laboratorio de tecnologia aplicada',
  description:
    'Automatizacion, datos y software a la medida. Encontramos el punto exacto donde intervenir para que tu negocio deje de perder tiempo.',
  openGraph: {
    title: 'Zentriq — Laboratorio de tecnologia aplicada',
    description:
      'Automatizacion, datos y software a la medida. Encontramos el punto exacto donde intervenir para que tu negocio deje de perder tiempo.',
    siteName: 'Zentriq',
    locale: 'es_MX',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
