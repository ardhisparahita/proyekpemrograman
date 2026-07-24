const User = require("./User");
const Warehouse = require("./Warehouse");
const Product = require("./Product");
const Inventory = require("./Inventory");
const DeliveryOrder = require("./DeliveryOrder");
const DeliveryOrderItem = require("./DeliveryOrderItem");
const Validation = require("./Validation");
const ProofOfDelivery = require("./ProofOfDelivery");
const VehicleTracking = require("./VehicleTracking");
const DailyReport = require("./DailyReport");
const AuditLog = require("./AuditLog");

User.hasMany(DeliveryOrder, {
    foreignKey: "admin_id",
    as: "createdDeliveries",
});

DeliveryOrder.belongsTo(User, {
    foreignKey: "admin_id",
    as: "admin",
});

User.hasMany(DeliveryOrder, {
    foreignKey: "driver_id",
    as: "driverDeliveries",
});

DeliveryOrder.belongsTo(User, {
    foreignKey: "driver_id",
    as: "driver",
});

User.hasMany(DailyReport, {
    foreignKey: "user_id",
});

DailyReport.belongsTo(User, {
    foreignKey: "user_id",
});

User.hasMany(AuditLog, {
    foreignKey: "user_id",
});

AuditLog.belongsTo(User, {
    foreignKey: "user_id",
});

User.hasMany(Validation, {
    foreignKey: "validated_by",
});

Validation.belongsTo(User, {
    foreignKey: "validated_by",
});


User.hasMany(VehicleTracking, {
    foreignKey: "driver_id",
});

VehicleTracking.belongsTo(User, {
    foreignKey: "driver_id",
});


Warehouse.hasMany(Inventory, {
    foreignKey: "warehouse_id",
});

Inventory.belongsTo(Warehouse, {
    foreignKey: "warehouse_id",
});


Product.hasMany(Inventory, {
    foreignKey: "product_id",
});

Inventory.belongsTo(Product, {
    foreignKey: "product_id",
});

Product.hasMany(DeliveryOrderItem, {
    foreignKey: "product_id",
});

DeliveryOrderItem.belongsTo(Product, {
    foreignKey: "product_id",
});


DeliveryOrder.hasMany(DeliveryOrderItem, {
    foreignKey: "delivery_order_id",
});

DeliveryOrderItem.belongsTo(DeliveryOrder, {
    foreignKey: "delivery_order_id",
});

DeliveryOrder.hasMany(Validation, {
    foreignKey: "delivery_order_id",
});

Validation.belongsTo(DeliveryOrder, {
    foreignKey: "delivery_order_id",
});

DeliveryOrder.hasOne(ProofOfDelivery, {
    foreignKey: "delivery_order_id",
});

ProofOfDelivery.belongsTo(DeliveryOrder, {
    foreignKey: "delivery_order_id",
});

DeliveryOrder.hasMany(VehicleTracking, {
    foreignKey: "delivery_order_id",
});

VehicleTracking.belongsTo(DeliveryOrder, {
    foreignKey: "delivery_order_id",
});


module.exports = {
    User,
    Warehouse,
    Product,
    Inventory,
    DeliveryOrder,
    DeliveryOrderItem,
    Validation,
    ProofOfDelivery,
    VehicleTracking,
    DailyReport,
    AuditLog,
};