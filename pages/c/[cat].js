import Nav from '@/components/Nav';
import Grid from '@/components/Grid';
import { fetchCategory } from '@/lib/aggregate';

const labels = {gundem:'Gündem', ekonomi:'Ekonomi', spor:'Spor', teknoloji:'Teknoloji', magazin:'Magazin'};

export default function Category({items, cat}){
  return (
    <div>
      <Nav active={cat} />
      <main className="container py-6">
        <h1 className="text-2xl font-bold mb-4">{labels[cat] || cat}</h1>
        <Grid items={items} />
      </main>
    </div>
  );
}

export async function getStaticPaths(){
  return { paths: ['/','/c/ekonomi','/c/spor','/c/teknoloji','/c/magazin'].map(p=>({params:{cat:p.split('/').pop()}})), fallback: 'blocking' };
}

export async function getStaticProps({params}){
  const items = await fetchCategory(params.cat);
  return { props: { items, cat: params.cat }, revalidate: 600 };
}
