// lib/text.js
export function summarize({ description, content, title }) {
  if (content && content.length > 0) {
    // HTML etiketlerini temizle
    const clean = content.replace(/<[^>]*>?/gm, '');
    
    // 1000 karakterlik uzun özet
    let longSummary = clean.slice(0, 1000);

    // Nokta bitimine göre kes (cümle tamamlasın)
    const lastDot = longSummary.lastIndexOf('.');
    if (lastDot > 300) {
      longSummary = longSummary.slice(0, lastDot + 1);
    }

    return (
      longSummary +
      " Haberin tüm detaylarını, açıklamaları ve resmi kaynak beyanlarını orijinal haber bağlantısından okuyabilirsiniz. (Kaynak: Haberist.net)"
    );
  }

  if (description && description.length > 0) {
    return (
      description +
      " Haberin detaylarını ve tüm gelişmeleri orijinal kaynaktan okuyabilirsiniz. (Kaynak: Haberist.net)"
    );
  }

  if (title) {
    return `${title} hakkında en güncel bilgileri ve resmi açıklamaları Haberist.net'te bulabilirsiniz.`;
  }

  return "Bu haberin detayları kaynak sayfadan derlenmiştir. Tüm gelişmeleri orijinal haber bağlantısından takip edebilirsiniz.";
}
