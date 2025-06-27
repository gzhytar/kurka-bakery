import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vypečená Kůrka - Čerstvý kváskový chléb',
  description: 'Tradiční pekárna v Brně. Pečeme s láskou čerstvý kváskový chléb každé úterý a pátek. Přírodní suroviny, řemeslná výroba.',
  keywords: ['pekárna', 'kváskový chléb', 'Brno', 'čerstvý chléb', 'tradiční pečení'],
  authors: [{ name: 'Vypečená Kůrka' }],
  openGraph: {
    title: 'Vypečená Kůrka - Čerstvý kváskový chléb',
    description: 'Tradiční pekárna v Brně. Pečeme s láskou čerstvý kváskový chléb.',
    images: ['/logo.jpg'],
    locale: 'cs_CZ',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
} 