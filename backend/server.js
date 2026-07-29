require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./src/routes/AuthRoutes');
const inventoryRoutes = require('./src/routes/InventoryRoutes');
const deliveryRoutes = require('./src/routes/DeliveryRoutes');
const warehouseRoutes = require('./src/routes/WareHouseRoutes');
const productRoutes = require('./src/routes/ProductRoutes');
const deliveryOrderRoutes = require('./src/routes/DeliveryOrderRoutes');
const validationRoutes = require('./src/routes/ValidationRoutes');
const proofOfDeliveryRoutes = require('./src/routes/ProofOfDeliveryRoutes');
const vehicleTrackingRoutes = require("./src/routes/VehicleTrackingRoutes");


app.use('/api/auth', authRoutes);
app.use('/api/inventories', inventoryRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/products', productRoutes);
app.use('/api/delivery-orders', deliveryOrderRoutes);
app.use('/api/validations', validationRoutes);
app.use('/api/proof-of-deliveries', proofOfDeliveryRoutes);
app.use('/api/vehicle-trackings', vehicleTrackingRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});