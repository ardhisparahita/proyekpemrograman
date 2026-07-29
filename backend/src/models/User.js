const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('users', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: {
    type: DataTypes.ENUM(
        "OWNER",
        "SUPERVISOR",
        "ADMIN",
        "STAFF_GUDANG",
        "WAREHOUSE",
        "DRIVER"
    ),
    allowNull: false,
    defaultValue: "DRIVER",
},
  phone: DataTypes.STRING,
},
{
    timestamps: false,
  }
);

module.exports = User;