// lib/text.js
export function summarize({ description, content, title }) {
  // 1️⃣ Eğer açıklama varsa onu kullan, ama kısa değilse
  if (description && description.length > 120) {
    return description;
  }

  // 2️⃣ İçerikten uzun özet oluştur
  if (content && content.length > 0) {
    // HTML etiketlerini temizle
    const clean = content.replace(/<[^>]*>?/gm, '');

    // İlk cümleleri daha fazla al, yaklaşık 450 karaktere kadar
    const longSummary = clean.slice(0, 450);

    // Cümle bitimine denk getir (SEO açısından daha doğal)
    const lastPeriod = longSummary.lastIndexOf('.');
    const finalText =
      lastPeriod > 100 ? longSummary.slice(0, lastPeriod + 1) : longSummary;

    return finalText + " (Kaynak: Haberist.net)";
  }

  // 3️⃣ Fallback
  if (title) {
    return `${title} hakkında en güncel bilgileri ve detayları Haberist.net'te bulabilirsiniz.`;
  }

  return "Detaylar kaynak sayfadan derlenmiştir.";
}
