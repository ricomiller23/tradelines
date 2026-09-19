import type { Metadata, Viewport } from 'next';
import './globals.css';
import FreshnessBar from '@/components/FreshnessBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'TRADELINES — Tariffs, Trade Flows & Supply-Chain Monitor',
  description: 'Production dashboard tracking global tariff policy, legal instruments, retaliatory chains, port telemetry, and bilateral merchandise flows with point-in-time rate lookups.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FFFFFF',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#FFFFFF] text-[#0B1220]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FFFFFF] antialiased font-ui">
        <FreshnessBar />
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
