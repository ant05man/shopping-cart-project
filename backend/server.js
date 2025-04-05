// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/shopping-cart-project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
