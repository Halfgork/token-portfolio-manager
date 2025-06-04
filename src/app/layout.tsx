import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Multi-Token Portfolio Manager",
  description: "Professional Stellar token portfolio management with real-time analytics, risk management, and Soroban smart contract integration.",
  keywords: ["Stellar", "Soroban", "portfolio", "crypto", "tokens", "DeFi", "analytics"],
  authors: [{ name: "Portfolio Manager Team" }],
  openGraph: {
    title: "Multi-Token Portfolio Manager",
    description: "Manage your Stellar token portfolio with professional-grade analytics and real-time tracking.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Multi-Token Portfolio Manager",
    description: "Professional Stellar token portfolio management platform.",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#3B82F6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body style={{ 
        backgroundColor: '#111827', 
        color: '#f9fafb', 
        fontFamily: "'Inter', system-ui, sans-serif",
        minHeight: '100vh',
        margin: 0,
        padding: 0
      }}>
        {children}
      </body>
    </html>
  );
}
