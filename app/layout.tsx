import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Преміальний спортивний м\'яч',
  description: 'Преміальні якісні спортивні м\'ячі',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  )
}

