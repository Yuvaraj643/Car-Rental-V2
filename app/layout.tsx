import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/providers/auth-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { config } from "@/lib/config"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: config.app.name,
    template: `%s | ${config.app.name}`,
  },
  description: "Premium car rental service with easy booking and flexible options",
  keywords: ["car rental", "vehicle booking", "car sharing", "transportation"],
  authors: [{ name: config.app.name }],
  creator: config.app.name,
  metadataBase: new URL(config.app.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: config.app.url,
    title: config.app.name,
    description: "Premium car rental service with easy booking and flexible options",
    siteName: config.app.name,
  },
  twitter: {
    card: "summary_large_image",
    title: config.app.name,
    description: "Premium car rental service with easy booking and flexible options",
    creator: "@driveease",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
