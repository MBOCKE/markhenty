import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MARKHENTY CONSULTING — Conseil en Marketing, Stratégie et Brand Management',
  description: 'Cabinet de conseil en marketing, stratégie de marque et communication de crise, alliant rigueur analytique moderne et insights profonds inspirés de la culture africaine.',
  keywords: [
    'Markhenty Consulting',
    'Conseil en Marketing',
    'Stratégie de marque',
    'Brand Strategy',
    'Communication de crise',
    'Stratégie Média',
    'Afrique',
    'Congo',
    'RDC'
  ],
  authors: [{ name: 'Markhenty Consulting' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
