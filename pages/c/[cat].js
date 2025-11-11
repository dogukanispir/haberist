import Head from 'next/head'
import Nav from '../../components/Nav'
import Grid from '../../components/Grid'
import { fetchCategory } from '../../lib/aggregate'
import { seoFor } from '../../lib/seo'

export default function CategoryPage({ items, cat }) {
  const title = cat.charAt(0).toUpperCase() + cat.slice(1)
  const meta = seoFor({
    title: `${title} – Haberist`,
    path: `/c/${cat}`,
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

      <Nav active={cat} />
      <main className="container py-6">
        <h1 className="text-2xl font-bold mb-4">
          {title} – Bugün En Çok Konuşulanlar
        </h1>
        <Grid items={items} />
      </main>

      <footer className="container py-10 text-sm text-zinc-500">
        © {new Date().getFullYear()} Haberist • Otomatik güncellenen trend & haber portalı.
      </footer>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const items = await fetchCategory(params.cat)
  return { props: { items, cat: params.cat }, revalidate: 600 }
}

export async function getStaticPaths() {
  const cats = ['gundem', 'ekonomi', 'spor', 'teknoloji', 'magazin']
  return {
    paths: cats.map((cat) => ({ params: { cat } })),
    fallback: 'blocking',
  }
}
