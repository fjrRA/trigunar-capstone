const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const events = sequelize.define(
  "events",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    location: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.NUMBER,
    },
    image: {
      type: DataTypes.STRING,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      field: "created_at", // Define the column name explicitly to match the database
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      field: "updated_at", // Define the column name explicitly to match the database
    },
  },
  {
    timestamps: false,
  }
);

module.exports = events;
