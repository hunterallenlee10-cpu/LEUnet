import { Cormorant_Garamond, Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'] })

/**
 * Both of these are exposed as CSS variables rather than applied as a class,
 * and are wired to Tailwind tokens in app/globals.css. Only the Business
 * Mastery hero consumes them today.
 *
 * Geist Mono was imported here long before this and never actually applied, so
 * every `font-mono` on the site has been rendering in the system stack. That is
 * left alone deliberately: switching it now would restyle the LMM, Websites and
 * H1 pages, which is not this change's business.
 */
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

/** The Business Mastery manifesto line, and nothing else on the site. Only the
 *  two light weights the hero uses are fetched. */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-cormorant',
})

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
      <body
        className={`${geistSans.className} ${geistMono.variable} ${cormorant.variable} antialiased bg-neutral-950 text-white`}
      >
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
