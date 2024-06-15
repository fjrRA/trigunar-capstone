const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('postgres', 'postgres.iqxymiztnxussxfhmfra', 'inicobaduluya', {
  host: 'aws-0-ap-southeast-1.pooler.supabase.com', // Gunakan host dari pengaturan Supabase Anda
  port: 5432, // Port default PostgreSQL
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Menghindari masalah dengan sertifikat SSL yang tidak dipercaya
    }
  },
  logging: console.log, // Aktifkan logging untuk debugging
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.error("Error: ", err.message, "\nDetails: ", err));

module.exports = sequelize;
