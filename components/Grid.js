import React from 'react'
import Card from './Card'

export default function Grid({ items = [] }) {
  if (!items.length) {
    return (
      <div className="text-center text-zinc-500 py-10">
        Henüz gösterilecek haber bulunamadı.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-4">
      {items.map((item) => (
        <Card key={item.id || item.link} item={item} />
      ))}
    </div>
  )
}
