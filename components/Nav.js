import Link from "next/link"
import { useRouter } from "next/router"
import BreakingNews from "./BreakingNews"

export default function Nav() {
  const router = useRouter()
  const categories = [
    { name: "Gündem", path: "/c/gundem" },
    { name: "Ekonomi", path: "/c/ekonomi" },
    { name: "Spor", path: "/c/spor" },
    { name: "Teknoloji", path: "/c/teknoloji" },
    { name: "Magazin", path: "/c/magazin" },
  ]

  return (
    <>
      {/* 🔝 Üst Menü */}
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 shadow-sm">
        <div className="container flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 gap-2">
          {/* 🔴 Logo + Motto */}
          <div className="flex items-center gap-3">
            {/* Küçük dairesel logo */}
            <div className="w-8 h-8 rounded-full bg-[var(--haberist-red)] text-white flex items-center justify-center font-bold text-lg shadow-md">
              H
            </div>

            <div>
              <h1 className="text-xl font-extrabold text-[var(--haberist-red)] tracking-tight leading-none">
                Haberist
              </h1>
              <p className="text-xs sm:text-sm text-zinc-600 font-medium leading-tight">
                <span className="block sm:inline">
                  Türkiye’nin tüm haberleri, tek platformda.
                </span>{" "}
                <span className="hidden sm:inline text-zinc-400">•</span>{" "}
                <span className="block sm:inline">
                  Gündemi senin için takip ediyoruz.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* 🔹 Kategori Butonları */}
        <nav className="overflow-x-auto scrollbar-hide flex gap-2 px-3 py-2 bg-white border-t border-zinc-100">
          {categories.map((cat) => {
            const active = router.asPath === cat.path
            return (
              <Link
                key={cat.path}
                href={cat.path}
                className={`whitespace-nowrap px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                  active
                    ? "bg-[var(--haberist-red)] text-white shadow-md"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                {cat.name}
              </Link>
            )
          })}
        </nav>
      </header>

      {/* 🔴 SON DAKİKA KAYAN YAZI */}
      <BreakingNews />
    </>
  )
}
