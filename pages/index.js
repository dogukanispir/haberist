import Head from 'next/head'
import Nav from '../components/Nav'
import Grid from '../components/Grid'
import { fetchCategory } from '../lib/aggregate'
import { seoFor } from '../lib/seo'  // ✅ SEO helper'ı ekledik

export default function Home({ items }) {
  const meta = seoFor({
    title: 'Gündem – Bugün En Çok Konuşulanlar',
    path: '/',
  })

  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.url} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>

      <Nav active="gundem" />
      <main className="container py-6">
        <h1 className="text-2xl font-bold mb-4">
          Gündem – Bugün En Çok Konuşulanlar
        </h1>
        <Grid items={items} />
      </main>

      <footer className="container py-10 text-sm text-zinc-500">
        © {new Date().getFullYear()} Haberist • Otomatik güncellenen trend & haber portalı.
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const items = await fetchCategory('gundem')
  return { props: { items }, revalidate: 600 }
}
