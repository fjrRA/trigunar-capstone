const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const bookings = sequelize.define(
  "bookings",
  {
    booking_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "destinations", // Assumes 'places' table exists
        key: "id",
      },
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
    No_hp: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    booking_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      field: "booking_date",
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false, // Disable Sequelize's built-in timestamp fields
  }
);

module.exports = bookings;
