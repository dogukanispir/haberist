import Head from "next/head";
import { useRouter } from "next/router";
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

  const imageUrl = post.image || "https://haberist.net/logo.png";
  const pageUrl = `https://haberist.net/blog/${slug}`;

  // --- Google Discover + News JSON-LD ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "description": post.excerpt,
    "image": [imageUrl],
    "author": {
      "@type": "Person",
      "name": "Haberist Editör Ekibi",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Haberist",
      "logo": {
        "@type": "ImageObject",
        "url": "https://haberist.net/logo.png",
      },
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  return (
    <>
      <Head>
        {/* 🧠 Temel Meta Bilgileri */}
        <title>{post.title} | Haberist</title>
        <meta name="description" content={post.excerpt} />
        <meta name="author" content="Haberist Editör Ekibi" />

        {/* 🟢 Open Graph (Facebook, WhatsApp, Discord) */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${post.title} | Haberist`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Haberist" />

        {/* 🐦 Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={imageUrl} />

        {/* 📰 Google Discover & News Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main className="container mx-auto px-4 py-10 max-w-3xl">
        <h1 className="text-3xl font-extrabold mb-4 text-[var(--haberist-red)]">
          {post.title}
        </h1>
        <p className="text-sm text-zinc-500 mb-6">{post.date}</p>

        {imageUrl && (
          <img
            src={imageUrl}
            alt={post.title}
            className="rounded-xl shadow-md mb-6"
          />
        )}

        <article
          className="prose prose-zinc max-w-none text-zinc-800"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
    </>
  );
}
