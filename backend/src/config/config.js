require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "mugijaya_distribution",
    host: process.env.DB_HOST,
    dialect: "mysql",
  },

  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST_NAME || "logistics_test",
    host: process.env.DB_HOST,
    dialect: "mysql",
  },

  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_PROD_NAME || "logistics_db",
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
};