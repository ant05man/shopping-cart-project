import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ addToCart }) => {
  const products = [
    { _id: 1, name: 'Brown Leather Jacket', price: 299.99, quantity: 1 },
    { _id: 2, name: 'Suede Blue Sneakers', price: 89.99, quantity: 1 },
    { _id: 3, name: 'Light Wash Jeans', price: 49.99, quantity: 1 },
    { _id: 4, name: 'Denim Vest', price: 59.99, quantity: 1 },
    { _id: 5, name: 'Yellow Blazer', price: 112.99, quantity: 1 }
  ];

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;
