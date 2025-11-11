// lib/seo.js
export const SITE = {
  name: 'Haberist',
  url: 'https://haberist.net',
  description:
    'Haberist – Gündem, Ekonomi, Spor, Teknoloji ve Magazin başlıklarında otomatik güncellenen trend haberleri tek sayfada.',
  image: '/og.jpg', // public/og.jpg koyabilirsin
};

export function seoFor({ title, description, path, image }) {
  const t = title ? `${title} | ${SITE.name}` : `${SITE.name}`;
  const d = description || SITE.description;
  const u = `${SITE.url}${path || ''}`;
  const img = image?.startsWith('http') ? image : `${SITE.url}${image || SITE.image}`;
  return { title: t, description: d, url: u, image: img };
}
