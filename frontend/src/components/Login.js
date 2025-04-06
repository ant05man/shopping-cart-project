import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (
      storedUser &&
      storedUser.username === formData.username &&
      storedUser.password === formData.password
    ) {
      alert('Login successful!');
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
      /><br />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      /><br />
      <button type="submit">Log In</button>
    </form>
  );
};

export default Login;
