import Link from 'next/link';
const tabs = [
  { key: 'gundem', label: 'Gündem' },
  { key: 'ekonomi', label: 'Ekonomi' },
  { key: 'spor', label: 'Spor' },
  { key: 'teknoloji', label: 'Teknoloji' },
  { key: 'magazin', label: 'Magazin' },
];
export default function Nav({active}){
  return (
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
      <div className="container py-3 flex items-center gap-3">
        <Link href="/" className="font-bold text-xl">Haberist</Link>
        <div className="flex gap-2 ml-auto">
          {tabs.map(t => (
            <Link key={t.key}
              href={t.key==='gundem' ? '/' : `/c/${t.key}`}
              className={`px-3 py-1.5 rounded-full text-sm ${active===t.key?'bg-zinc-900 text-white':'bg-zinc-100'}`}>
              {t.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
