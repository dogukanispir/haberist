import React from 'react';
import Card from './Card';

export default function Grid({ items = [] }) {
  if (!items.length) {
    return (
      <div className="text-center text-zinc-500 py-10">
        Henüz gösterilecek haber bulunamadı.
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}
