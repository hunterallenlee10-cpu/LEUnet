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
 * left alone deliberately: switching it now would restyle the LMM and Websites
 * pages, which is not this change's business.
 */
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

/** The Business Mastery manifesto line, and nothing else on the site. Only the
 *  two light weights the hero uses are fetched. */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-cormorant',
})

/**
 * The descriptions name what the home page leads to: the flagship program and
 * the one venture. They counted "two distinct ventures" until Thread T-Shirts
 * came off this site on 2026-09-25 (docs/THREAD.md), and the `apparel` keyword
 * went with it, as `athletic training` went with H1 Performance.
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://leeenterprisesunlimited.com'),
  title: 'Lee Enterprises Unlimited | Premium Business Portfolio',
  description: 'Lee Enterprises Unlimited is the holding company behind LEU Business Mastery and Lee Systems Co., each dedicated to delivering premium value and measurable results.',
  keywords: ['Lee Enterprises', 'business automation', 'website design', 'business portfolio'],
  authors: [{ name: 'Lee Enterprises Unlimited' }],
  creator: 'Lee Enterprises Unlimited',
  publisher: 'Lee Enterprises Unlimited',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://leeenterprisesunlimited.com',
    title: 'Lee Enterprises Unlimited',
    description: 'A premium business portfolio dedicated to excellence: LEU Business Mastery and Lee Systems Co.',
    images: [
      {
        url: '/logos/leu-logo.png',
        width: 512,
        height: 512,
        alt: 'Lee Enterprises Unlimited Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lee Enterprises Unlimited',
    description: 'Premium business portfolio: LEU Business Mastery and Lee Systems Co.',
  },
  // A 192px copy for the tab icon: the full logo used to be a 1.4 MB PNG and
  // every page fetched it just to draw a 16px favicon.
  icons: {
    icon: '/logos/leu-logo-192.png',
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
