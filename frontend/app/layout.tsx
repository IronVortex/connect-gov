import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Connect Gov',
  description: 'Government document management and service guidance platform',
  icons: {
    icon: '/connectgov-logo.png',
    apple: '/connectgov-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
