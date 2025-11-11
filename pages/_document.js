// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        {/* 🎯 Google Search Console Doğrulama */}
        <meta
          name="google-site-verification"
          content="eSwtNh6QHc4mOCnhrheDNwwd-9Ku1dqmvQ6KA8rvTio"
        />

        {/* 🌈 Renk ve tema ayarları */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light only" />

        {/* ⚡ Performans optimizasyonu */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* 🧩 Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* 🔍 SEO: Arama motorlarına izin ver */}
        <meta name="robots" content="index, follow" />
      </Head>

      <body className="bg-white text-zinc-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
