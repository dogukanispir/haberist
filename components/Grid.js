import Card from './Card';
export default function Grid({items}){
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {items.map(it => <Card key={it.id} item={it} />)}
    </div>
  );
}
