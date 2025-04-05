import React from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  
  return (
    <div className="App">
      <Navbar cartItemCount={cart.length} />
      <ProductList addToCart={addToCart} />
      <Navbar />
      <ProductList />
    </div>
  );
}

export default App;
