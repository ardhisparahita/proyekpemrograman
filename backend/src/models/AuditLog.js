const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AuditLog = sequelize.define(
    "audit_logs",
    {
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },

        activity: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        module: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        ip_address: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = AuditLog;