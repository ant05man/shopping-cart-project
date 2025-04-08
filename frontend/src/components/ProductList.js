import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const products = [
    { _id: '67f3b03cdfe4a24a9bfd43c3', name: 'Brown Leather Jacket', price: 299.99 },
    { _id: '67f3b0bddfe4a24a9bfd43c4', name: 'Suede Blue Sneakers', price: 89.99 },
    { _id: '67f3b0bddfe4a24a9bfd43c5', name: 'Light Wash Jeans', price: 49.99 },
    { _id: '67f3b0bddfe4a24a9bfd43c6', name: 'Denim Vest', price: 59.99 },
    { _id: '67f3b0bddfe4a24a9bfd43c7', name: 'Yellow Blazer', price: 112.99 }
  ];

  const handleAddToCart = (product) => {
    console.log("Product being added:", product);
    console.log("Quantity being added:", quantity);
    addToCart({ productId: product._id, name:product.name, price:product.price, quantity });
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          addToCart={handleAddToCart}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      ))}
    </div>
  );
};

export default ProductList;
