import { useEffect, useState } from "react";
import { FaDollarSign, FaEuroSign } from "react-icons/fa";
import { GiGoldBar } from "react-icons/gi";
import { GiTwoCoins } from "react-icons/gi";

export default function FinanceBar() {
  const [rates, setRates] = useState({
    usd: null,
    eur: null,
    gram: null,
    quarter: null,
  });

  // API'den canlı verileri çek
  const fetchRates = async () => {
    try {
      const res = await fetch("https://api.genelpara.com/embed/altin.json");
      const data = await res.json();

      setRates({
        usd: data.USD.satis,
        eur: data.EUR.satis,
        gram: data.GA.satis,
        quarter: data.C.satis,
      });
    } catch (error) {
      console.error("Kurlar alınamadı:", error);
    }
  };

  useEffect(() => {
    fetchRates(); // ilk açılışta çağır
    const interval = setInterval(fetchRates, 300000); // 5 dakikada bir yenile
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[var(--haberist-red)] text-white text-sm py-2 px-3 flex flex-wrap items-center justify-center gap-4">
      <span className="flex items-center gap-1">
        <FaDollarSign /> Dolar: {rates.usd ? `${rates.usd} ₺` : "Yükleniyor..."}
      </span>
      <span className="flex items-center gap-1">
        <FaEuroSign /> Euro: {rates.eur ? `${rates.eur} ₺` : "Yükleniyor..."}
      </span>
      <span className="flex items-center gap-1">
        <GiGoldBar /> Gram Altın:{" "}
        {rates.gram ? `${rates.gram} ₺` : "Yükleniyor..."}
      </span>
      <span className="flex items-center gap-1">
        <GiTwoCoins /> Çeyrek:{" "}
        {rates.quarter ? `${rates.quarter} ₺` : "Yükleniyor..."}
      </span>
    </div>
  );
}
