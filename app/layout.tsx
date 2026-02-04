import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Optimize font loading
  preload: true,
});

export const metadata: Metadata = {
  title: "Aarav's Portfolio",
  description: "Next.js Portfolio for a creative developer",
  keywords: "portfolio, developer, web development, next.js, react",
  authors: [{ name: "Aarav" }],
  robots: "index, follow",
  openGraph: {
    title: "Aarav's Portfolio",
    description: "Next.js Portfolio for a creative developer",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/a&a-logo.png" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* Preload critical assets */}
        <link rel="preload" href="/a&a-logo.png" as="image" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Aarav's Portfolio" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        {/* Analytics or other scripts can be added here with Next.js Script component for optimal loading */}
        <Script
          id="service-worker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                      console.log('SW registered: ', registration);
                    })
                    .catch((registrationError) => {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
        <Script
          id="performance-observer"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Performance optimization script
              if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                  // Preload next page resources during idle time
                  const links = document.querySelectorAll('a[href^="/"]');
                  links.forEach(link => {
                    link.addEventListener('mouseenter', () => {
                      const href = link.getAttribute('href');
                      if (href) {
                        const linkEl = document.createElement('link');
                        linkEl.rel = 'prefetch';
                        linkEl.href = href;
                        document.head.appendChild(linkEl);
                      }
                    }, { once: true });
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
