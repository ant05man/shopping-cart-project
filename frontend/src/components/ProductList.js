import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ addToCart }) => {
  const products = [
    { id: 1, name: 'Brown Leather Jacket', price: 299.99 },
    { id: 2, name: 'Suede Blue Sneakers', price: 89.99 },
    { id: 3, name: 'Light Wash Jeans', price: 49.99 },
  ];

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;
