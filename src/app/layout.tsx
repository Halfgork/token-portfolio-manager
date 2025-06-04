import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

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
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-background text-foreground">
          {children}
        </div>
      </body>
    </html>
  );
}
