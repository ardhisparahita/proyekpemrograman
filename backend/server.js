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
const dailyReportRoutes = require("./src/routes/DailyReportRoutes");
const auditLogRoutes = require("./src/routes/auditLogRoutes");


app.use('/api/auth', authRoutes);
app.use('/api/inventories', inventoryRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/products', productRoutes);
app.use('/api/delivery-orders', deliveryOrderRoutes);
app.use('/api/validations', validationRoutes);
app.use('/api/proof-of-deliveries', proofOfDeliveryRoutes);
app.use('/api/vehicle-trackings', vehicleTrackingRoutes);
app.use("/api/daily-reports", dailyReportRoutes);
app.use("/api/audit-logs", auditLogRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));