const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found. Please log in.');
    return;
  }

  try {
    const orderItems = cart.map(item => ({
      productId: item._id,
      quantity: item.quantity,
    }));

    // ✅ Log the data you're about to send
    console.log("Sending order data:", {
      items: orderItems,
      shippingAddress: formData.address,
    });

    const response = await axios.post(
      'http://localhost:5000/api/orders/checkout',
      {
        items: orderItems,
        shippingAddress: formData.address,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201) {
      console.log('✅ Order placed successfully:', response.data.order);
      clearCart();
      setSubmitted(true);
    }
  } catch (error) {
    console.error('❌ Error placing order:', error.response?.data || error.message);
  }
};
