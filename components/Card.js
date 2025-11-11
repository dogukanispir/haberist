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
    <article className="card flex flex-col">
      <div className="relative aspect-[16/9] bg-zinc-100">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 grid place-content-center text-zinc-400">
            Görsel yok
          </div>
        )}
        <span className="badge absolute left-2 top-2 bg-white/90 border">
          {item.source}
        </span>
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <Link href={href} className="font-semibold leading-snug">
          {item.title}
        </Link>
        <div className="mt-auto pt-3 text-xs text-zinc-500">
          {new Date(item.isoDate).toLocaleString('tr-TR')}
        </div>
      </div>
    </article>
  );
}
