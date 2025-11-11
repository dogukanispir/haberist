import Parser from 'rss-parser'
import axios from 'axios'
import dayjs from 'dayjs'
import slugify from 'slugify'
import SOURCES from './sources'

const parser = new Parser({
  timeout: 10000,
  headers: { 'User-Agent': 'HaberistBot/2.0 (+https://haberist.net)' },
})

// ... geri kalan kodun aynı


function uniqBy(items, getKey) {
  const map = new Map();
  for (const item of items) {
    const k = getKey(item);
    if (!map.has(k)) map.set(k, item);
  }
  return Array.from(map.values());
}

async function discoverImage(link) {
  try {
    const res = await axios.get(link, { timeout: 7000 });
    const html = res.data;
    const m =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);
    if (m) return m[1];
  } catch (e) {}
  return null;
}

function normalize(item, category, feedTitle) {
  const img =
    item?.enclosure?.url ||
    item?.contentSnippet?.match(/(https?:[^\s]+\.(jpg|png|jpeg))/i)?.[1] ||
    null;
  const title = (item.title || '').replace(/\s+/g, ' ').trim();
  const id = item.link || title + feedTitle;
  const slug = slugify(title, { lower: true, strict: true });
  return {
    id,
    slug,
    title,
    link: item.link,
    source: feedTitle,
    isoDate: item.isoDate || item.pubDate || new Date().toISOString(),
    image: img,
    category,
  };
}

export async function fetchCategory(category) {
  const urls = SOURCES[category] || [];
  const results = [];

  for (const url of urls) {
    try {
      const feed = await parser.parseURL(url);
      for (const item of feed.items.slice(0, 20)) {
        results.push(
          normalize(item, category, feed.title || new URL(url).hostname)
        );
      }
    } catch (e) {
      // feed hatalarını yoksay
    }
  }

  // Görseli olmayanların küçük kısmına sayfadan og:image bul
  const lacking = results.filter((r) => !r.image).slice(0, 10);
  await Promise.all(
    lacking.map(async (r) => {
      const img = await discoverImage(r.link);
      if (img) r.image = img;
    })
  );

  // Temizle
  const cleaned = results.filter((x) => x.title && x.link);
  // Benzersiz (title+source)
  const unique = uniqBy(cleaned, (x) => x.title + '|' + x.source);
  // Tarihe göre sırala
  unique.sort(
    (a, b) => dayjs(b.isoDate).valueOf() - dayjs(a.isoDate).valueOf()
  );

  return unique.slice(0, 60);
}

export async function fetchAll() {
  const cats = Object.keys(SOURCES);
  const out = {};
  await Promise.all(cats.map(async (c) => (out[c] = await fetchCategory(c))));
  return out;
}
