import './globals.css';

export const metadata = {
  title: 'Nargiz A. — AI Engineer',
  description: 'Portfolio of Nargiz A., AI Engineer & creative coder based in Berlin.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Inter+Tight:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.dataset.mode = 'light';
              document.documentElement.dataset.density = 'comfortable';
              document.documentElement.dataset.cursor = 'dot';
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
