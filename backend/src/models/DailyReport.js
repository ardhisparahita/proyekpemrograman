const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DailyReport = sequelize.define(
  "daily_reports",
  {
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    report_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = DailyReport;