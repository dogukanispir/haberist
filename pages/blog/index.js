import Head from "next/head";
import Link from "next/link";
import posts from "../../data/blogPosts.json";

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Blog | Haberist</title>
        <meta
          name="description"
          content="Haberist Blog – Güncel teknoloji, ekonomi, spor ve yaşam yazıları. Türkiye'nin gündemini analiz ediyoruz."
        />
      </Head>

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-[var(--haberist-red)] mb-8 text-center">
          Haberist Blog
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            // 🧠 Otomatik görsel oluşturma
            const fallbackImage = `https://source.unsplash.com/600x400/?${encodeURIComponent(
              post.title.replace(/\s+/g, ",")
            )}`;
            const imageUrl =
              post.image && post.image.trim() !== ""
                ? post.image
                : fallbackImage;

            return (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className="block border border-zinc-200 rounded-xl shadow-sm hover:shadow-md transition bg-white overflow-hidden">
                  {/* Görsel */}
                  <img
                    src={imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />

                  {/* Metin Alanı */}
                  <div className="p-5">
                    <h2 className="text-lg font-bold mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-xs text-zinc-500 mb-2">{post.date}</p>
                    <p className="text-zinc-700 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
