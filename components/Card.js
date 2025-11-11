import Image from "next/image"
import Link from "next/link"

export default function Card({ item }) {
  if (!item) return null

  // 🔹 Yayın zamanını hesapla (örnek: "3 saat önce")
  const timeAgo = (() => {
    try {
      const now = new Date()
      const date = new Date(item.isoDate)
      const diffMs = now - date
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      const diffDays = Math.floor(diffHours / 24)
      if (diffHours < 1) return "az önce"
      if (diffHours < 24) return `${diffHours} saat önce`
      return `${diffDays} gün önce`
    } catch {
      return ""
    }
  })()

  // 🔹 Görüntülenme sayısı (örnek veri)
  const views = Math.floor(Math.random() * 5000) + 1000 // rastgele 1K-6K arası

  return (
    <Link
      href={`/h/${item.slug}`}
      className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-[2px] transition-all duration-200 card-hover"
    >
      {/* 🔹 Görsel */}
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

        {/* 🔴 Kaynak etiketi */}
        <span className="absolute top-2 left-2 bg-[var(--haberist-red)] text-white text-[10px] px-2 py-[3px] rounded">
          {item.source || "HABERİST"}
        </span>
      </div>

      {/* 🔹 Başlık ve Bilgi Alanı */}
      <div className="p-3 sm:p-4">
        <h2 className="text-[15px] sm:text-base font-semibold leading-snug line-clamp-3">
          {item.title}
        </h2>

        {/* 🔹 Alt Bilgi (kategori + zaman + görüntüleme) */}
        <div className="flex items-center justify-between text-[12px] text-zinc-500 mt-3">
          <div className="flex items-center gap-2">
            <span className="inline-block bg-[var(--haberist-red)] text-white px-2 py-[1px] rounded-full text-[10px]">
              {item.category || "Genel"}
            </span>
            <span>🕒 {timeAgo}</span>
          </div>
          <span>👁️ {views.toLocaleString("tr-TR")}</span>
        </div>
      </div>
    </Link>
  )
}
