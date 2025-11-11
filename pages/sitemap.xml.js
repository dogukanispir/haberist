export async function getServerSideProps({res}){
  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://haberist.net/</loc></url>
    <url><loc>https://haberist.net/c/ekonomi</loc></url>
    <url><loc>https://haberist.net/c/spor</loc></url>
    <url><loc>https://haberist.net/c/teknoloji</loc></url>
    <url><loc>https://haberist.net/c/magazin</loc></url>
  </urlset>`;
  res.setHeader('Content-Type','application/xml');
  res.write(body);res.end();
  return { props:{} };
}
export default function SiteMap(){ return null }
