import { useEffect, useState } from "react"

export default function BreakingNews() {
  const [headline, setHeadline] = useState("Güncel haberler yükleniyor...")

  useEffect(() => {
    // 🔴 Son dakika örnek başlıklar (ileride API'den çekebilirsin)
    const headlines = [
      "Cumhurbaşkanı Erdoğan'dan önemli açıklama: 'Yeni ekonomi paketi geliyor'",
      "Dolar/TL kuru güne sert yükselişle başladı",
      "Gürcistan'da düşen askeri uçakta 5 şehit — MSB duyurdu",
      "Meteoroloji uyardı: İstanbul'da kuvvetli yağış bekleniyor",
      "Fenerbahçe Avrupa'da tarih yazdı! 4-0 galibiyet"
    ]

    let i = 0
    setHeadline(headlines[i])
    const interval = setInterval(() => {
      i = (i + 1) % headlines.length
      setHeadline(headlines[i])
    }, 8000) // 8 saniyede bir haber değişir

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="breaking-bar bg-[var(--haberist-red)] text-white py-2 overflow-hidden whitespace-nowrap">
      <div className="container flex items-center gap-3">
        <span className="font-bold text-sm animate-pulse">🔴 Son Dakika:</span>
        <div className="ticker text-sm font-medium animate-marquee">
          {headline}
        </div>
      </div>
    </div>
  )
}
