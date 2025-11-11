import { useRouter } from "next/router";
import Head from "next/head";
import posts from "../../data/blogPosts.json";

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const post = posts.find((p) => p.slug === slug);

  if (!post)
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p className="text-zinc-500">Yazı bulunamadı.</p>
      </div>
    );

  // 🧠 Otomatik görsel çekme (eğer image tanımlı değilse)
  const fallbackImage = `https://source.unsplash.com/1200x630/?${encodeURIComponent(
    post.title.replace(/\s+/g, ",")
  )}`;

  const imageUrl = post.image && post.image.trim() !== "" ? post.image : fallbackImage;

  // 📄 Google News + Discover JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    image: [imageUrl],
    author: {
      "@type": "Person",
      name: "Haberist Editör Ekibi",
    },
    publisher: {
      "@type": "Organization",
      name: "Haberist",
      logo: {
        "@type": "ImageObject",
        url: "https://haberist.net/logo.png",
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://haberist.net/blog/${slug}`,
    },
  };

  return (
    <>
      <Head>
        <title>{post.title} | Haberist</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={imageUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold mb-4 text-[var(--haberist-red)]">
          {post.title}
        </h1>
        <p className="text-sm text-zinc-500 mb-6">{post.date}</p>

        {/* 🖼️ Görsel */}
        <img
          src={imageUrl}
          alt={post.title}
          className="rounded-xl shadow-md mb-6 w-full max-h-[500px] object-cover"
        />

        <article
          className="prose max-w-none text-zinc-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></article>
      </main>
    </>
  );
}
