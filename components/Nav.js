import Link from "next/link";
import { useRouter } from "next/router";
import BreakingNews from "./BreakingNews";
import { useEffect, useState } from "react";
import { FaDollarSign, FaEuroSign } from "react-icons/fa";
import { GiGoldBar, GiTwoCoins } from "react-icons/gi";

export default function Nav() {
  const router = useRouter();
  const categories = [
    { name: "Gündem", path: "/c/gundem" },
    { name: "Ekonomi", path: "/c/ekonomi" },
    { name: "Spor", path: "/c/spor" },
    { name: "Teknoloji", path: "/c/teknoloji" },
    { name: "Magazin", path: "/c/magazin" },
    { name: "📰 Blog", path: "/blog" }, // ✅ Blog sekmesi eklendi
  ];

  const [finance, setFinance] = useState({
    dolar: null,
    euro: null,
    altin: null,
    ceyrek: null,
  });
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const fetchFinance = async () => {
    try {
      const res = await fetch("https://api.genelpara.com/embed/altin.json");
      const data = await res.json();
      setFinance({
        dolar: data.USD.satis,
        euro: data.EUR.satis,
        altin: data.GA.satis,
        ceyrek: data.C.satis,
      });
      setLastUpdate(new Date());
      setIsUpdated(true);
      setTimeout(() => setIsUpdated(false), 2000);
    } catch (err) {
      console.error("Finans verileri alınamadı:", err);
    }
  };

  useEffect(() => {
    fetchFinance();
    const interval = setInterval(fetchFinance, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 💰 Finans Bar */}
      <div className="bg-[var(--haberist-red)] text-white text-sm py-1 overflow-x-auto whitespace-nowrap scrollbar-hide border-b border-red-700">
        <div className="container flex justify-center sm:justify-between items-center flex-wrap px-3 font-medium gap-3">
          <div className="flex flex-wrap justify-center gap-4">
            <span className={`flex items-center gap-1 transition-all ${isUpdated ? "text-yellow-300" : ""}`}>
              <FaDollarSign /> Dolar: <b>{finance.dolar ? `${finance.dolar} ₺` : "Yükleniyor..."}</b>
            </span>
            <span className={`flex items-center gap-1 transition-all ${isUpdated ? "text-yellow-300" : ""}`}>
              <FaEuroSign /> Euro: <b>{finance.euro ? `${finance.euro} ₺` : "Yükleniyor..."}</b>
            </span>
            <span className={`flex items-center gap-1 transition-all ${isUpdated ? "text-yellow-300" : ""}`}>
              <GiGoldBar /> Gram Altın: <b>{finance.altin ? `${finance.altin} ₺` : "Yükleniyor..."}</b>
            </span>
            <span className={`flex items-center gap-1 transition-all ${isUpdated ? "text-yellow-300" : ""}`}>
              <GiTwoCoins /> Çeyrek: <b>{finance.ceyrek ? `${finance.ceyrek} ₺` : "Yükleniyor..."}</b>
            </span>
          </div>
          {lastUpdate && (
            <span className="text-xs text-zinc-200 italic">
              🕒 {lastUpdate.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })} itibarıyla
            </span>
          )}
        </div>
      </div>

      {/* 🔝 ÜST KISIM (LOGO + MİSYON) */}
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 shadow-sm">
        <div className="container flex flex-col sm:flex-row items-center justify-between py-4 px-4 text-center sm:text-left gap-3 sm:gap-6">
          {/* Logo + Site İsmi + Slogan */}
          <div className="flex flex-col sm:flex-row items-center sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--haberist-red)] text-white flex items-center justify-center font-bold text-lg shadow-md">
                H
              </div>
              <h1 className="text-2xl font-extrabold text-[var(--haberist-red)] leading-none">Haberist</h1>
            </div>
            <p className="text-sm text-zinc-600 font-medium sm:mt-0 sm:border-l sm:border-zinc-300 sm:pl-4 max-w-[500px]">
              Türkiye’nin tüm haberleri, tek platformda.{" "}
              <span className="hidden sm:inline text-zinc-400">•</span> Gündemi senin için takip ediyoruz.
            </p>
          </div>
        </div>

        {/* 🔹 KATEGORİ MENÜSÜ */}
        <nav className="overflow-x-auto scrollbar-hide flex gap-2 px-3 py-2 bg-white border-t border-zinc-100 justify-center flex-wrap">
          {categories.map((cat) => {
            const active = router.asPath === cat.path;
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
            );
          })}
        </nav>
      </header>

      {/* 🔴 SON DAKİKA ALANI */}
      <BreakingNews />
    </>
  );
}
