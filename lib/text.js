// lib/text.js
export function summarize({ description, content, title }) {
  if (description && description.length > 0) {
    return description;
  }

  if (content && content.length > 0) {
    // HTML etiketlerini temizleyip ilk 200 karakteri al
    const clean = content.replace(/<[^>]*>?/gm, '');
    return clean.slice(0, 200) + "...";
  }

  if (title && title.length > 0) {
    return title;
  }

  return "Detaylar kaynak sayfadan derlenmiştir.";
}
