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
    as: "dailyReports",
});

DailyReport.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});


User.hasMany(AuditLog, {
    foreignKey: "user_id",
    as: "auditLogs",
});

AuditLog.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

User.hasMany(Validation, {
    foreignKey: "validated_by",
    as: "validations",
});

Validation.belongsTo(User, {
    foreignKey: "validated_by",
    as: "validator",
});

User.hasMany(VehicleTracking, {
    foreignKey: "driver_id",
    as: "trackings",
});

VehicleTracking.belongsTo(User, {
    foreignKey: "driver_id",
    as: "driver",
});


Warehouse.hasMany(Inventory, {
    foreignKey: "warehouse_id",
    as: "inventories",
});

Inventory.belongsTo(Warehouse, {
    foreignKey: "warehouse_id",
    as: "warehouse",
});


Product.hasMany(Inventory, {
    foreignKey: "product_id",
    as: "inventories",
});

Inventory.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
});

Product.hasMany(DeliveryOrderItem, {
    foreignKey: "product_id",
    as: "deliveryItems",
});

DeliveryOrderItem.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
});


DeliveryOrder.hasMany(DeliveryOrderItem, {
    foreignKey: "delivery_order_id",
    as: "items",
});

DeliveryOrderItem.belongsTo(DeliveryOrder, {
    foreignKey: "delivery_order_id",
    as: "deliveryOrder",
});

DeliveryOrder.hasMany(Validation, {
    foreignKey: "delivery_order_id",
    as: "validations",
});

Validation.belongsTo(DeliveryOrder, {
    foreignKey: "delivery_order_id",
    as: "deliveryOrder",
});

DeliveryOrder.hasOne(ProofOfDelivery, {
    foreignKey: "delivery_order_id",
    as: "proofOfDelivery",
});

ProofOfDelivery.belongsTo(DeliveryOrder, {
    foreignKey: "delivery_order_id",
    as: "deliveryOrder",
});

DeliveryOrder.hasMany(VehicleTracking, {
    foreignKey: "delivery_order_id",
    as: "trackings",
});

VehicleTracking.belongsTo(DeliveryOrder, {
    foreignKey: "delivery_order_id",
    as: "deliveryOrder",
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