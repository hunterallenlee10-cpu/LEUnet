import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SITE_URL } from '@/data/company'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'] })

/**
 * Exposed as a CSS variable rather than applied as a class, and wired to the
 * `font-mono-geist` token in app/globals.css. It renders only in the Business
 * Mastery hero today: the homepage ventures panel's rules that read
 * `var(--font-mono-geist)` resolve it at :root, above the <body> this variable
 * is set on, so they fall back to Geist Sans. (Cormorant, the hero's serif, is
 * declared on the Business Mastery page itself, so no other page preloads it.)
 *
 * Every `font-mono` on the site renders in the system stack, deliberately:
 * pointing it at Geist Mono would restyle the Lee Systems pages.
 */
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

/**
 * The descriptions name what the home page leads to: the flagship program and
 * the one venture. They counted "two distinct ventures" until Thread T-Shirts
 * came off this site on 2026-09-25 (docs/THREAD.md), and the `apparel` keyword
 * went with it, as `athletic training` went with H1 Performance.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Lee Enterprises Unlimited | Premium Business Portfolio',
  description: 'Lee Enterprises Unlimited is the holding company behind LEU Business Mastery and Lee Systems Co., each dedicated to delivering premium value and measurable results.',
  keywords: ['Lee Enterprises', 'business automation', 'website design', 'business portfolio'],
  authors: [{ name: 'Lee Enterprises Unlimited' }],
  creator: 'Lee Enterprises Unlimited',
  publisher: 'Lee Enterprises Unlimited',
  robots: 'index, follow',
  // The share card for any page that sets none of its own. No `url`: it would
  // tell every such page's shares they are the homepage. A page that sets
  // `openGraph` replaces this whole object, so it has to repeat the image.
  openGraph: {
    type: 'website',
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
  // `summary`, because the image is the square logo. Next fills the title,
  // description and image in from the page's openGraph.
  twitter: {
    card: 'summary',
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
  // data-scroll-behavior lets Next switch html's `scroll-smooth` off for route
  // changes, so a new page starts at the top instead of scrolling up through
  // itself. In-page anchors stay smooth.
  return (
    <html lang="en" className="bg-neutral-950" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.className} ${geistMono.variable} antialiased bg-neutral-950 text-white`}
      >
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
