import Head from "next/head";
import { useRouter } from "next/router";
import posts from "../../data/blogPosts.json";

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return { notFound: true };
  }

  // 🧠 Otomatik görsel (fallback)
  const fallbackImage = `https://source.unsplash.com/1200x630/?${encodeURIComponent(
    post.title.replace(/\s+/g, ",")
  )}`;
  const imageUrl =
    post.image && post.image.trim() !== "" ? post.image : fallbackImage;

  // ✅ JSON-LD’yi burada oluşturuyoruz (server-side)
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

  return {
    props: { post, jsonLd, imageUrl },
  };
}

export default function BlogPost({ post, jsonLd, imageUrl }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{post.title} | Haberist</title>
        <meta name="description" content={post.excerpt} />
        <meta name="author" content="Haberist Editör Ekibi" />

        {/* ✅ Rich Snippet verileri */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={`https://haberist.net/blog/${post.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={imageUrl} />

        {/* ✅ JSON-LD artık SSR tarafında inline gözükecek */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <main className="container mx-auto px-4 py-10 max-w-3xl">
        <h1 className="text-3xl font-extrabold mb-4 text-[var(--haberist-red)]">
          {post.title}
        </h1>
        <p className="text-sm text-zinc-500 mb-6">{post.date}</p>
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
