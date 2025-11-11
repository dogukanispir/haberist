import Image from "next/image"
import Link from "next/link"

export default function Card({ item }) {
  if (!item) return null

  return (
    <Link
      href={`/h/${item.slug}`}
      className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-[2px] transition-all duration-200 card-hover"
    >
      {/* 🔹 Haber Görseli */}
      <div className="relative w-full aspect-[16/9] bg-zinc-100">
        {item.image && (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        )}

        {/* 🔴 Kaynak Etiketi */}
        <span className="absolute top-2 left-2 bg-[var(--haberist-red)] text-white text-[10px] px-2 py-[3px] rounded">
          {item.source || "HABERİST"}
        </span>
      </div>

      {/* 🔹 Başlık ve Tarih */}
      <div className="p-3 sm:p-4">
        <h2 className="text-[15px] sm:text-base font-semibold leading-snug line-clamp-3">
          {item.title}
        </h2>

        <p className="text-xs text-zinc-500 mt-2">
          {new Date(item.isoDate).toLocaleString("tr-TR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </Link>
  )
}
