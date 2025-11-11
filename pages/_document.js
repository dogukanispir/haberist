// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light only" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Apple touch icon / favicon'ı public/ içine koyabilirsin */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-white text-zinc-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
