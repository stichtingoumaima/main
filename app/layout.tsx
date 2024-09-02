import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import ClientProviders from '@/components/ClientProviders';
import FirebaseAuthProvider from '@/components/FirebaseAuthProvider';
import SubscriptionProvider from '@/components/subscription/SubscriptionProvider';
import { Toaster } from "@/components/ui/toaster";

// Import and configure Google font
const inter = Inter({ subsets: ['latin'] });

// Metadata configuration for the app
export const metadata: Metadata = {
  title: "PWA NextJS",
  description: "It's a simple progressive web application made with NextJS",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "imvinojanv",
      url: "https://www.linkedin.com/in/imvinojanv/",
    },
  ],
  viewport: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "/icons/icon-128x128.png" },
    { rel: "icon", url: "/icons/icon-128x128.png" },
  ],
};

// RootLayout component for wrapping the entire app
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientProviders>
      <html lang="en">
        <body className={`flex flex-col min-h-screen ${inter.className}`}>
          {/* MetaTags component not needed if using metadata API for meta tags */}
          <FirebaseAuthProvider>
            <SubscriptionProvider>
              <ThemeProvider
                attribute='class'
                defaultTheme='system'
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <Toaster />
              </ThemeProvider>
            </SubscriptionProvider>
          </FirebaseAuthProvider>
        </body>
      </html>
    </ClientProviders>
  );
}