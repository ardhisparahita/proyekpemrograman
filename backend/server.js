require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./src/routes/AuthRoutes');
const inventoryRoutes = require('./src/routes/InventoryRoutes');
const deliveryRoutes = require('./src/routes/DeliveryRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/delivery', deliveryRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});