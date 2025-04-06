import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
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

    // Here we would send formData to the backend to create a user
    console.log('User registered:', formData);

    // Store mock user in localStorage
    localStorage.setItem('user', JSON.stringify(formData));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
