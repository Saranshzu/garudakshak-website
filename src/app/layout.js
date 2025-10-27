import './globals.css'

export const metadata = {
  title: 'GARUDAKSHAK - Securing Skies, Defending Horizons',
  description: 'Advanced AI-powered drone detection and neutralization systems for critical infrastructure protection',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}