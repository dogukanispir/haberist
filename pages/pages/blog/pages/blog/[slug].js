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

  return (
    <>
      <Head>
        <title>{post.title} | Haberist Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="author" content="Haberist" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${post.title} | Haberist`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://haberist.net/blog/${post.slug}`} />
        <meta property="og:site_name" content="Haberist" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.excerpt} />

        {/* --- JSON-LD Schema --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: post.title,
              description: post.excerpt,
              author: {
                "@type": "Organization",
                name: "Haberist",
              },
              publisher: {
                "@type": "Organization",
                name: "Haberist",
                logo: {
                  "@type": "ImageObject",
                  url: "https://haberist.net/logo.png",
                },
              }
