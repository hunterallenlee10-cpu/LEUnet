import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SITE_URL } from '@/data/company'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'] })

/**
 * The defaults every page starts from. Pages set their own title,
 * description, canonical and openGraph, and each carries an
 * `opengraph-image` file for its share image (a page's own `openGraph`
 * replaces this one, image and all). `metadataBase` is the www host, so every
 * canonical and og:url resolves to it.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Lee Enterprises Unlimited | AI Automation & Websites',
  description:
    'Lee Systems Co. builds websites that bring in customers and AI automations that answer every call, follow up and book the job.',
  authors: [{ name: 'Lee Enterprises Unlimited' }],
  creator: 'Lee Enterprises Unlimited',
  publisher: 'Lee Enterprises Unlimited',
  robots: 'index, follow',
  // No `url`: it would tell every page that inherits this its shares are the
  // homepage. A page that sets `openGraph` replaces this whole object.
  openGraph: {
    type: 'website',
    siteName: 'Lee Enterprises Unlimited',
    title: 'Lee Enterprises Unlimited',
    description:
      'Lee Systems Co. builds websites that bring in customers and AI automations that answer every call, follow up and book the job.',
  },
  // Every share image is 1200x630, so every page gets the large card.
  twitter: {
    card: 'summary_large_image',
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
        className={`${geistSans.className} antialiased bg-neutral-950 text-white`}
      >
        <SmoothScroll />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
