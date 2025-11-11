import Nav from '../../components/Nav'
import Grid from '../../components/Grid'
import { fetchCategory } from '../../lib/aggregate'

export default function CategoryPage({ items, cat }) {
  return (
    <div>
      <Nav active={cat} />
      <main className="container py-6">
        <h1 className="text-2xl font-bold mb-4">
          {cat.toUpperCase()} – En Çok Konuşulanlar
        </h1>
        <Grid items={items} />
      </main>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const items = await fetchCategory(params.cat)
  return { props: { items, cat: params.cat }, revalidate: 600 }
}

export async function getStaticPaths() {
  const cats = ['gundem', 'ekonomi', 'spor', 'teknoloji', 'magazin']
  return { paths: cats.map(c => ({ params: { cat: c } })), fallback: false }
}
