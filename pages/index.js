import Nav from '../components/Nav'
import Grid from '../components/Grid'
import { fetchCategory } from '../lib/aggregate'

export default function Home({ items }) {
  return (
    <div>
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
