import Head from 'next/head'
import Image from 'next/image'
import { seoFor } from '@/lib/seo'
import { summarize } from '@/lib/text'
import { fetchCategory } from '@/lib/aggregate'

export default function Detail({ item }) {
  if (!item) return <p className="text-center mt-10">Haber bulunamadı.</p>

  // 🔹 Uzun içerik veya özet oluştur
  const summary = summarize({
    description: item.contentSnippet,
    content: item.content,
    title: item.title,
  })

  // 🔹 SEO meta verileri
  const meta = seoFor({
    title: item.title,
    description: summary,
    path: `/h/${item.slug}`,
    image: item.image,
  })

  // 🔹 JSON-LD (Google News / Schema.org)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.title,
    image: item.image ? [item.image] : [],
    datePublished: item.isoDate,
    dateModified: item.isoDate,
    author: { '@type': 'Organization', name: item.source || 'Kaynak' },
    publisher: {
      '@type': 'Organization',
      name: 'Haberist',
      logo: { '@type': 'ImageObject', url: meta.image },
    },
    mainEntityOfPage: meta.url,
    description: summary,
    articleBody: summary, // ✅ Google Discover & News için eklendi
  }

  return (
    <>
      <Head>
        {/* 🔹 Temel SEO meta etiketleri */}
        <title>{meta.title}</title>
        <meta name="description" content={summary} />
        <link rel="canonical" href={meta.url} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={item.source || 'Haberist'} />

        {/* 🔹 Open Graph (Facebook / WhatsApp) */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={summary} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:url" content={meta.url} />

        {/* 🔹 Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={summary} />
        <meta name="twitter:image" content={meta.image} />

        {/* 🔹 JSON-LD Yapılandırılmış Veri */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* 🔹 İçerik */}
      <main className="container py-8">
        <article className="max-w-3xl mx-auto px-4">
          <header className="mb-4">
            <div className="text-xs text-zinc-500 mb-1">{item.source}</div>
            <h1 className="text-3xl font-bold leading-snug mb-3">{item.title}</h1>
          </header>

          {item.image && (
            <div className="relative aspect-[16/9] mb-6 rounded-xl overflow-hidden bg-zinc-100 shadow-md">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          )}

          {/* 🔹 Eğer içerik HTML olarak varsa, direkt render et */}
          <div
            className="prose prose-lg text-zinc-800 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: item.content || summary,
            }}
          />

          {/* 🔹 Kaynak linki */}
          <div className="mt-8 flex justify-center">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-zinc-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-700 transition"
            >
              Orijinal Haberi Oku
            </a>
          </div>
        </article>
      </main>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const cats = ['gundem', 'ekonomi', 'spor', 'teknoloji', 'magazin']
  let found = null

  for (const cat of cats) {
    const list = await fetchCategory(cat)
    found = list.find((x) => x.slug === params.slug)
    if (found) break
  }

  return { props: { item: found || null } }
}
