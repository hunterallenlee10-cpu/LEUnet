import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://leeenterprisesunlimited.com'),
  title: 'Lee Enterprises Unlimited | Premium Business Portfolio',
  description: 'Lee Enterprises Unlimited is a holding company managing three distinct ventures: Lee Marketing Mastery, H1 Performance, and Thread T-Shirts. Each venture is dedicated to delivering premium value and measurable results.',
  keywords: ['Lee Enterprises', 'marketing', 'athletic training', 'apparel', 'business portfolio'],
  authors: [{ name: 'Lee Enterprises Unlimited' }],
  creator: 'Lee Enterprises Unlimited',
  publisher: 'Lee Enterprises Unlimited',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://leeenterprisesunlimited.com',
    title: 'Lee Enterprises Unlimited',
    description: 'A premium portfolio of three distinct business ventures dedicated to excellence.',
    images: [
      {
        url: '/logos/leu-logo.png',
        width: 1200,
        height: 630,
        alt: 'Lee Enterprises Unlimited Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lee Enterprises Unlimited',
    description: 'Premium business portfolio of three distinct ventures.',
  },
  icons: {
    icon: '/logos/leu-logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0F0F0F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-neutral-950">
      <body className={`${geistSans.className} antialiased bg-neutral-950 text-white`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
