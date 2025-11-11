import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Detail({title, url, source, img}){
  return (
    <div>
      <Head><title>{title} - Haberist</title></Head>
      <div className="container py-6">
        <Link href="/" className="text-sm text-zinc-500">← Geri</Link>
        <h1 className="text-3xl font-bold mt-2">{title}</h1>
        <div className="text-sm text-zinc-500 mt-1">{source}</div>
        <div className="mt-4 relative aspect-[16/9] bg-zinc-100 rounded-2xl overflow-hidden">
          {img ? <Image src={img} alt={title} fill className="object-cover" /> : <div className="grid place-content-center text-zinc-400">Görsel yok</div>}
        </div>
        <div className="mt-6 text-zinc-600">
          Detaylar kaynak sayfadan derlenmiştir. Tüm haklar ilgili yayıncılara aittir.
        </div>
        <a href={url} target="_blank" className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 text-white">Orijinale git</a>
      </div>
    </div>
  )
}

export async function getServerSideProps({query}){
  const {u:url='', t:title='', s:source='', img=''} = query;
  return { props: { url, title, source, img } };
}
