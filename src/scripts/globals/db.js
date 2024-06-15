const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('postgres', 'postgres.iqxymiztnxussxfhmfra', 'inicobaduluya', {
  host: 'aws-0-ap-southeast-1.pooler.supabase.com',
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: console.log,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
    return sequelize.query('SELECT 1'); // Query sederhana untuk uji koneksi
  })
  .then(() => console.log("Test query executed successfully"))
  .catch((err) => {
    console.error("Error: ", err.message, "\nDetails: ", err);
  });

module.exports = sequelize;
