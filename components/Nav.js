import Link from "next/link"
import { useRouter } from "next/router"
import BreakingNews from "./BreakingNews"
import { useEffect, useState } from "react"

export default function Nav() {
  const router = useRouter()
  const categories = [
    { name: "Gündem", path: "/c/gundem" },
    { name: "Ekonomi", path: "/c/ekonomi" },
    { name: "Spor", path: "/c/spor" },
    { name: "Teknoloji", path: "/c/teknoloji" },
    { name: "Magazin", path: "/c/magazin" },
  ]

  const [finance, setFinance] = useState({
    dolar: "33.15 ₺",
    euro: "36.40 ₺",
    altin: "2.458 ₺",
    ceyrek: "4.025 ₺",
  })

  // ⚙️ Gelecekte API ile güncelleme (şimdilik simülasyon)
  useEffect(() => {
    const interval = setInterval(() => {
      setFinance((prev) => ({ ...prev })) // Burada API bağlanacak
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* 💰 Finans Bar */}
      <div className="bg-[var(--haberist-red)] text-white text-sm py-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="container flex justify-center gap-6 sm:justify-start px-3 font-medium">
          <span>💵 Dolar: <b>{finance.dolar}</b></span>
          <span>💶 Euro: <b>{finance.euro}</b></span>
          <span>🥇 Gram Altın: <b>{finance.altin}</b></span>
          <span>💍 Çeyrek: <b>{finance.ceyrek}</b></span>
        </div>
      </div>

      {/* 🔝 ÜST KISIM (LOGO + MİSYON) */}
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 shadow-sm">
        <div className="container flex flex-col items-center sm:flex-row sm:justify-between py-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[var(--haberist-red)] text-white flex items-center justify-center font-bold text-lg shadow-md">
                H
              </div>
              <h1 className="text-2xl font-extrabold text-[var(--haberist-red)] leading-none">
                Haberist
              </h1>
            </div>
            <p className="mt-2 sm:mt-0 text-sm text-zinc-600 font-medium leading-tight sm:border-l sm:border-zinc-300 sm:pl-3">
              Türkiye’nin tüm haberleri, tek platformda.{" "}
              <span className="hidden sm:inline text-zinc-400">•</span>{" "}
              Gündemi senin için takip ediyoruz.
            </p>
          </div>
        </div>

        {/* 🔹 KATEGORİ MENÜSÜ */}
        <nav className="overflow-x-auto scrollbar-hide flex gap-2 px-3 py-2 bg-white border-t border-zinc-100 justify-center sm:justify-start">
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

      {/* 🔴 SON DAKİKA */}
      <BreakingNews />
    </>
  )
}
