import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Card({ item }) {
  const href = `/h/${encodeURIComponent(item.slug)}?u=${encodeURIComponent(
    item.link
  )}&t=${encodeURIComponent(item.title)}&s=${encodeURIComponent(
    item.source
  )}&img=${encodeURIComponent(item.image || '')}`;

  return (
    <article className="card flex flex-col bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-200 hover:scale-[1.02]">
      {/* Görsel Alanı */}
      <div className="relative aspect-[16/9] bg-zinc-100">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 grid place-content-center text-zinc-400 text-sm">
            Görsel yok
          </div>
        )}
        {/* Kaynak etiketi */}
        <span className="absolute left-2 top-2 bg-white/80 text-xs font-medium text-gray-700 px-2 py-1 rounded-md shadow-sm">
          {item.source}
        </span>
      </div>

      {/* Başlık ve tarih */}
      <div className="p-3 flex-1 flex flex-col">
        <Link
          href={href}
          className="font-semibold leading-snug text-gray-800 hover:text-blue-600 line-clamp-2"
        >
          {item.title}
        </Link>

        <div className="mt-auto pt-2 text-xs text-gray-500">
          {new Date(item.isoDate).toLocaleString('tr-TR')}
        </div>
      </div>
    </article>
  );
}
