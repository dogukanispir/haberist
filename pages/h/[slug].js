import Head from 'next/head'
import Image from 'next/image'
import { seoFor } from '@/lib/seo'
import { summarize } from '@/lib/text'
import { fetchCategory } from '@/lib/aggregate'

export default function Detail({ item }) {
  if (!item) return <p className="text-center mt-10">Haber bulunamadı.</p>

  const summary = summarize({
    description: item.contentSnippet,
    content: item.content,
    title: item.title,
  })

  const meta = seoFor({
    title: item.title,
    description: summary,
    path: `/h/${item.slug}`,
    image: item.image,
  })

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
    articleBody: summary, // ✅ SEO için eklendi
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={summary} />
        <link rel="canonical" href={meta.url} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={item.source || 'Haberist'} />

        {/* Open Graph (Facebook / WhatsApp) */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={summary} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:url" content={meta.url} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={summary} />
        <meta name="twitter:image" content={meta.image} />

        {/* JSON-LD Yapılandırılmış Veri */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main className="container py-8">
        <article className="max-w-3xl mx-auto">
          <header className="mb-4">
            <div className="text-xs text-zinc-500 mb-1">{item.source}</div>
            <h1 className="text-2xl font-bold leading-snug">{item.title}</h1>
          </header>

          {item.image && (
            <div className="relative aspect-[16/9] mb-4 rounded-xl overflow-hidden bg-zinc-100">
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

          <p className="text-zinc-700 leading-relaxed">{summary}</p>

          <div className="mt-6">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-zinc-900 text-white px-4 py-2 rounded-full hover:bg-zinc-700"
            >
              Orijinale git
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
