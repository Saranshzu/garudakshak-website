import './globals.css'

export const metadata = {
  title: 'GARUDAKSHAK - Securing Skies, Defending Horizons',
  description: 'Advanced AI-powered drone detection and neutralization systems for critical infrastructure protection',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/garudakshak.png', type: 'image/png' },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}