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
  metadataBase: new URL('https://zentriq.mx'),
  title: {
    default: 'Zentriq · Estudio de software a la medida · CDMX',
    template: '%s · Zentriq',
  },
  description:
    'Construimos automatización, datos y aplicaciones a la medida ' +
    'para empresas que ya deberían tenerlo. Producción en 6-8 semanas, ' +
    'sin discovery de 6 meses, sin presentaciones de 40 slides.',
  keywords: [
    'software a la medida México',
    'automatización empresas México',
    'desarrollo a la medida CDMX',
    'estudio de software México',
    'agencia de software CDMX',
    'Next.js México',
    'React Native México',
    'data pipelines México',
  ],
  authors: [{ name: 'Zentriq' }],
  creator: 'Zentriq',
  publisher: 'Zentriq',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://zentriq.mx',
    title: 'Zentriq · Estudio de software a la medida',
    description:
      'Construimos automatización, datos y aplicaciones a la medida. ' +
      'Producción en 6-8 semanas, sin discovery de 6 meses.',
    siteName: 'Zentriq',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zentriq — Estudio de software a la medida',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zentriq · Estudio de software a la medida',
    description:
      'Automatización, datos y aplicaciones a la medida. ' +
      'Producción en 6-8 semanas.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${spaceGrotesk.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'ZENTRIQ MEXICO',
              legalName: 'ZENTRIQ MEXICO',
              url: 'https://zentriq.mx',
              logo: 'https://zentriq.mx/icon.svg',
              description:
                'Estudio de software a la medida. Automatización, datos y ' +
                'aplicaciones para empresas.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Ciudad de México',
                addressRegion: 'CDMX',
                addressCountry: 'MX',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'contacto@zentriq.mx',
                contactType: 'customer service',
                areaServed: 'MX',
                availableLanguage: ['Spanish'],
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
