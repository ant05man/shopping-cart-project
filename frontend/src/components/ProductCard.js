import React from 'react';

const ProductCard = ({ product, addToCart, quantity, setQuantity }) => {
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <input
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        min="1"
              />
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
