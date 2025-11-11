import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { seoFor } from '@/lib/seo'
import { summarize } from '@/lib/text'
import { fetchCategory } from '@/lib/aggregate'

export default function Detail({ item, related = [] }) {
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
    articleBody: summary,
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={summary} />
        <link rel="canonical" href={meta.url} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={item.source || 'Haberist'} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={summary} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:url" content={meta.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={summary} />
        <meta name="twitter:image" content={meta.image} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main className="container py-6">
        <article className="max-w-2xl mx-auto px-3 sm:px-0 leading-relaxed text-[15px]">
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

          <div
            className="prose prose-lg text-zinc-800 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: item.content || summary,
            }}
          />

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

        {/* BENZER HABERLER */}
        {related.length > 0 && (
          <section className="max-w-4xl mx-auto mt-12 border-t border-zinc-200 pt-6 px-3 sm:px-0">
            <h2 className="text-xl font-bold mb-4">Benzer Haberler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {related.slice(0, 6).map((news) => (
                <Link
                  key={news.link}
                  href={`/h/${news.slug}`}
                  className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all duration-200"
                >
                  <div className="relative w-full aspect-[16/9] bg-zinc-100">
                    {news.image && (
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-cover"
                      />
                    )}
                    <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-[3px] rounded">
                      {news.source || 'HABERİST'}
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold leading-snug line-clamp-3">
                      {news.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const cats = ['gundem', 'ekonomi', 'spor', 'teknoloji', 'magazin']
  let found = null
  let related = []

  for (const cat of cats) {
    const list = await fetchCategory(cat)
    found = list.find((x) => x.slug === params.slug)
    if (found) {
      related = list.filter((x) => x.slug !== params.slug).slice(0, 6)
      break
    }
  }

  return { props: { item: found || null, related } }
}
