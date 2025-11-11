import '@/styles/globals.css'
import Script from 'next/script'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-VTBSHMH80C"
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-VTBSHMH80C');
        `}
      </Script>
      <Component {...pageProps} />
    </>
  )
}
