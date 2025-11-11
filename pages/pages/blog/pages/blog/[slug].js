import { useRouter } from "next/router";
import Head from "next/head";
import posts from "@/data/blogPosts.json";

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
      </Head>

      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <h1 className="text-3xl font-bold text-[var(--haberist-red)] mb-4">
          {post.title}
        </h1>
        <p className="text-sm text-zinc-500 mb-6">{post.date}</p>
        <div className="text-zinc-700 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      </div>
    </>
  );
}
