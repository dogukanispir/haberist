// components/BlogTeasers.jsx
import Link from "next/link";
import posts from "../data/blogPosts.json"; // ✅ alias yok, garanti çalışır

export default function BlogTeasers({ limit = 6 }) {
  const latest = [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);

  return (
    <section className="container px-4 py-10">
      {/* --- Başlık çubuğu --- */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          <span className="text-[var(--haberist-red)]">📰 Son</span> Bloglar
        </h2>
        <Link
          href="/blog"
          className="text-sm font-semibold text-[var(--haberist-red)] hover:underline transition"
        >
          Tümünü Gör →
        </Link>
      </div>

      {/* --- Blog grid --- */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((post) => {
          const fallbackImage = `https://source.unsplash.com/600x400/?${encodeURIComponent(
            post.title.replace(/\s+/g, ",")
          )}`;
          const imageUrl =
            post.image && post.image.trim() !== "" ? post.image : fallbackImage;

          return (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="group bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <img
                  src={imageUrl}
                  alt={post.title}
                  className="w-full h-44 object-cover group-hover:opacity-90 transition"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="font-bold text-base sm:text-lg mb-1 line-clamp-2 group-hover:text-[var(--haberist-red)] transition">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mb-2">{post.date}</p>
                  <p className="text-sm text-zinc-700 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
