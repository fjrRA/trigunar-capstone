const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const bookings = sequelize.define(
  "bookings",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    destination_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      field: "created_at",
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      field: "updated_at",
    },
  },
  {
    timestamps: false, // Disable Sequelize's built-in timestamp fields
  }
);

module.exports = bookings;
