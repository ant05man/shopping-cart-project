import React from 'react';
import ProductCard from './ProductCard';

const ProductList = () => {
  const products = [
    { id: 1, name: 'Brown Cabinet', price: 299.99 },
    { id: 2, name: 'Laptop', price: 349.99 },
    { id: 3, name: 'Wireless Headphones', price: 49.99 },
  ];

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
