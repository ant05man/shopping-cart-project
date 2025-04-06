import React from 'react';

const Cart = ({ cart, removeFromCart, clearCart }) => {
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price.toFixed(2)}{' '}
              <button
                onClick={() => removeFromCart(index)}
                style={{
                    marginLeft: '10px',
                    padding: '4px 8px',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
                >
                    Remove
                </button>
            </li>
          ))}
        </ul>
      )}

{cart.length > 0 && (
  <button
    onClick={clearCart}
    style={{
      marginTop: '1rem',
      padding: '8px 16px',
      background: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    }}
  >
    Clear Cart
  </button>
)}

      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;
