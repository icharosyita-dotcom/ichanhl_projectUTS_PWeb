export default function ShoppingCart({ items, onRemoveItem, onCheckout }) {
  if (items.length === 0) {
    return <div>Your Cart is Empty</div>;
  }

  return (
    <div className="min-h-screen px-4 py-16">
      <h2>Your Cart - {items.length} items</h2>
      {items.map(item => (
        <Card key={item.id}>
          <div style={{ backgroundColor: item.hexColor }}>{item.colorName}</div>
          <Button onClick={() => onRemoveItem(item.id)}>Remove</Button>
        </Card>
      ))}
      <Button onClick={onCheckout}>Checkout on Shopee</Button>
    </div>
  );
}
