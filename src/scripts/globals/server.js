const Hapi = require("@hapi/hapi");
const Joi = require("joi");
const inert = require("@hapi/inert");
const path = require("path");
const fs = require("fs");
const sequelize = require("./db");
const destinations = require("./models/destinasi");
const events = require("./models/event");
const kuliners = require("./models/kuliner");

const Contact = require("./models/contact");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: true, // Set to true to enable CORS for all routes
    },
  });

  // Register Inert plugin
  await server.register(inert);

  // Sinkronisasi database
  await sequelize.sync();

  // Route to serve static files from the uploads directory
  server.route({
    method: "GET",
    path: "/public/{param*}",
    handler: {
      directory: {
        path: path.join(__dirname, "public"),
        redirectToSlash: true,
        index: false,
      },
    },
  });

  // ================================ + Destinasi + ===============================//

  // CREATE destinasi
  server.route({
    method: "POST",
    path: "/destinations",
    options: {
      payload: {
        output: "stream",
        parse: true,
        allow: "multipart/form-data",
        multipart: true,
        maxBytes: 50 * 1024 * 1024, // 50MB
      },
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          description: Joi.string().required(),
          location: Joi.string().required(),
          city: Joi.string().required(),
          rating: Joi.number().required(),
          price: Joi.number().required(),
          image_url: Joi.any().meta({ swaggerType: "file" }).optional(),
        }),
        failAction: (request, h, err) => {
          return err;
        },
      },
    },
    handler: async (request, h) => {
      const { name, description, location, city, rating, price } =
        request.payload;
      const image = request.payload.image_url;

      let imageUrl = null;

      if (image) {
        const filename = `${Date.now()}-${image.hapi.filename}`;
        const uploadPath = path.join(__dirname, "public", filename);

        try {
          await fs.promises.mkdir(path.join(__dirname, "public"), {
            recursive: true,
          }); // Buat direktori "public" secara rekursif jika belum ada
          const fileStream = fs.createWriteStream(uploadPath); // Gunakan fs.createWriteStream tanpa .promises

          await new Promise((resolve, reject) => {
            image.pipe(fileStream);
            image.on("end", () => {
              fileStream.end(); // Pastikan stream diakhiri
              resolve();
            });
            image.on("error", (err) => {
              fileStream.end();
              reject(err);
            });
          });

          imageUrl = `http://localhost:3000/public/${filename}`;
        } catch (error) {
          console.error("Error saving image:", error);
          return h.response("Internal server error").code(500);
        }
      }

      try {
        const destination = await destinations.create({
          name,
          description,
          location,
          city,
          rating,
          price,
          image_url: imageUrl,
        });
        return h.response(destination).code(201);
      } catch (error) {
        console.error("Error creating destination:", error);
        return h.response("Internal server error").code(500);
      }
    },
  });

  // untuk Get All destinasi
  server.route({
    method: "GET",
    path: "/destinations",
    handler: async (request, h) => {
      try {
        const destinasi = await destinations.findAll();
        return destinasi;
      } catch (err) {
        console.error("Error fetching destinations:", err);
        return h.response("Internal server error").code(500);
      }
    },
  });

  //untuk Get by ID destinasi
  server.route({
    method: "GET",
    path: "/destinations/{id}",
    handler: async (request, h) => {
      const { id } = request.params;
      try {
        const destinasi = await destinations.findByPk(id);
        if (!destinasi) {
          return h.response({ error: "Destination not found" }).code(404);
        }
        return destinasi;
      } catch (error) {
        console.error("Error fetching destination:", error);
        return h.response("Internal server error").code(500);
      }
    },
  });

  // PUT destinasi
  server.route({
    method: "PUT",
    path: "/destinations/{id}",
    options: {
      payload: {
        output: "stream",
        parse: true,
        allow: "multipart/form-data",
        multipart: true,
        maxBytes: 50 * 1024 * 1024, // 50MB
      },
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          description: Joi.string().required(),
          location: Joi.string().required(),
          city: Joi.string().required(),
          rating: Joi.number().required(),
          price: Joi.number().required(),
          image_url: Joi.any().meta({ swaggerType: "file" }).optional(),
        }),
        failAction: (request, h, err) => {
          return err;
        },
      },
    },
    handler: async (request, h) => {
      const id = request.params.id;
      const { name, description, location, city, rating, price } =
        request.payload;
      const image = request.payload.image_url;

      let imageUrl = null;

      if (image) {
        const filename = `${Date.now()}-${image.hapi.filename}`;
        const uploadPath = path.join(__dirname, "public", filename);

        try {
          await fs.promises.mkdir(path.join(__dirname, "public"), {
            recursive: true,
          });
          const fileStream = fs.createWriteStream(uploadPath);

          await new Promise((resolve, reject) => {
            image.pipe(fileStream);
            image.on("end", () => {
              fileStream.end();
              resolve();
            });
            image.on("error", (err) => {
              fileStream.end();
              reject(err);
            });
          });

          imageUrl = `http://localhost:3000/public/${filename}`;
        } catch (error) {
          console.error("Error saving image:", error);
          return h.response("Internal server error").code(500);
        }
      }

      try {
        const destination = await destinations.update(
          {
            // Asumsi ada method update
            name,
            description,
            location,
            city,
            rating,
            price,
            image_url: imageUrl,
          },
          {
            where: { id },
          }
        );
        return h.response(destination).code(200);
      } catch (error) {
        console.error("Error updating destination:", error);
        return h.response("Internal server error").code(500);
      }
    },
  });

  // DELETE destinasi
  server.route({
    method: "DELETE",
    path: "/destinations/{id}",
    handler: async (request, h) => {
      const { id } = request.params;
      try {
        const destinasi = await destinations.findByPk(id);
        if (!destinasi) {
          return h.response({ error: "Destination not found" }).code(404);
        }
        await destinasi.destroy();
        return { message: "Destination deleted" };
      } catch (error) {
        console.error("Error deleting destination:", error);
        return h.response("Internal server error").code(500);
      }
    },
  });

  // ================================ + Event + ===============================//
  // untuk membuat data event
  server.route({
    method: "POST",
    path: "/events",
    options: {
      payload: {
        output: "stream",
        parse: true,
        allow: "multipart/form-data",
        multipart: true,
        maxBytes: 50 * 1024 * 1024, // 50MB
      },
      validate: {
        payload: Joi.object({
          title: Joi.string().required(),
          description: Joi.string().required(),
          location: Joi.string().required(),
          city: Joi.string().required(),
          price: Joi.number().required(),
          image: Joi.any().meta({ swaggerType: "file" }).optional(),
          start_date: Joi.date().required(),
          end_date: Joi.date()
            .required()
            .min(Joi.ref("start_date"))
            .message("End date must be greater than or equal to start date"),
        }),
        failAction: (request, h, err) => {
          return err;
        },
      },
    },
    handler: async (request, h) => {
      const {
        title,
        description,
        location,
        city,
        price,
        start_date,
        end_date,
      } = request.payload;
      const images = request.payload.image;

      let image = null;

      if (images) {
        const filename = `${Date.now()}-${images.hapi.filename}`;
        const uploadPath = path.join(__dirname, "public", filename);

        try {
          await fs.promises.mkdir(path.join(__dirname, "public"), {
            recursive: true,
          });
          const fileStream = fs.createWriteStream(uploadPath);

          await new Promise((resolve, reject) => {
            images.pipe(fileStream);
            images.on("end", () => {
              fileStream.end();
              resolve();
            });
            images.on("error", (err) => {
              fileStream.end();
              reject(err);
            });
          });
          image = `http://localhost:3000/public/${filename}`;
        } catch (error) {
          console.error("Error saving image:", error);
          return h.response("Internal server error").code(500);
        }
      }

      try {
        const event = await events.create({
          title,
          description,
          location,
          city,
          price,
          image: image,
          start_date,
          end_date,
        });
        return h.response(event).code(201);
      } catch (error) {
        console.error("Error creating event:", error);
        return h.response("Internal server error").code(500);
      }
    },
  });

  //untuk get All event
  server.route({
    method: "GET",
    path: "/events",
    handler: async (request, h) => {
      try {
        const event = await events.findAll();
        return event;
      } catch (err) {
        console.error("error saat mengmbil data event:", err);
        return h.response("internar server error").code(500);
      }
    },
  });

  //untuk get by id event
  server.route({
    method: "GET",
    path: "/events/{id}",
    handler: async (request, h) => {
      const { id } = request.params;
      try {
        const event = await events.findByPk(id);
        if (!event) {
          return h.response({ error: "event not found" }).code(400);
        }
        return event;
      } catch (error) {
        console.error("gagal mengambil data event dengan id:", error);
        return h.response("internal server error").code(500);
      }
    },
  });

  //untuk update event
  server.route({
    method: "PUT",
    path: "/events/{id}",
    options: {
      payload: {
        output: "stream",
        parse: true,
        allow: "multipart/form-data",
        multipart: true,
        maxBytes: 50 * 1024 * 1024, // 50MB
      },
      validate: {
        payload: Joi.object({
          title: Joi.string().required(),
          description: Joi.string().required(),
          location: Joi.string().required(),
          city: Joi.string().required(),
          price: Joi.number().required(),
          image: Joi.any().meta({ swaggerType: "file" }).optional(),
          start_date: Joi.date().required(),
          end_date: Joi.date()
            .required()
            .min(Joi.ref("start_date"))
            .message("End date must be greater than or equal to start date"),
        }),
        failAction: (request, h, err) => {
          return err;
        },
      },
    },
    handler: async (request, h) => {
      const { id } = request.params;
      const {
        title,
        description,
        location,
        city,
        price,
        start_date,
        end_date,
      } = request.payload;

      const images = request.payload.image;

      let image = null;

      if (images) {
        const filename = `${Date.now()}-${images.hapi.filename}`;
        const uploadPath = path.join(__dirname, "public", filename);

        try {
          await fs.promises.mkdir(path.join(__dirname, "public"), {
            recursive: true,
          });
          const fileStream = fs.createWriteStream(uploadPath);

          await new Promise((resolve, reject) => {
            images.pipe(fileStream);
            images.on("end", () => {
              fileStream.end();
              resolve();
            });
            images.on("error", (err) => {
              fileStream.end();
              reject(err);
            });
          });
          image = `http://localhost:3000/public/${filename}`;
        } catch (error) {
          console.error("Error saving image:", error);
          return h.response("Internal server error").code(500);
        }
      }
      try {
        const event = await events.update(
          {
            title,
            description,
            location,
            city,
            price,
            image: image,
            start_date,
            end_date,
          },
          {
            where: { id },
          }
        );
        return h.response(events).code(200);
      } catch (error) {
        console.error("Error update events:", error);
        return h.response("Internal server error").code(500);
      }
    },
  });

  //untuk delete event
  server.route({
    method: "DELETE",
    path: "/events/{id}",
    handler: async (request, h) => {
      const { id } = request.params;
      try {
        const event = await events.findByPk(id);
        if (!event) {
          return h.response({ error: "event not pound" }).code(400);
        }
        await event.destroy();
        return { message: "Berhasil di hapus" };
      } catch (error) {
        console.error("gagal menghapus event:", error);
        return h.response("internal server error").code(500);
      }
    },
  });

  // ================================ + Kuliner + ===============================//
  // CREATE Kuliner
  server.route({
    method: "POST",
    path: "/kuliners",
    options: {
      payload: {
        output: "stream",
        parse: true,
        allow: "multipart/form-data",
        multipart: true,
        maxBytes: 50 * 1024 * 1024, // 50MB
      },
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          description: Joi.string().required(),
          location: Joi.string().required(),
          city: Joi.string().required(),
          rating: Joi.number().required(),
          price: Joi.number().required(),
          image: Joi.any().meta({ swaggerType: "file" }).optional(),
        }),
        failAction: (request, h, err) => {
          return err;
        },
      },
    },
    handler: async (request, h) => {
      const { name, description, location, city, rating, price } =
        request.payload;
      const image = request.payload.image;

      let images = null;

      if (image) {
        const filename = `${Date.now()}-${image.hapi.filename}`;
        const uploadPath = path.join(__dirname, "public", filename);

        try {
          await fs.promises.mkdir(path.join(__dirname, "public"), {
            recursive: true,
          }); // Buat direktori "public" secara rekursif jika belum ada
          const fileStream = fs.createWriteStream(uploadPath); // Gunakan fs.createWriteStream tanpa .promises

          await new Promise((resolve, reject) => {
            image.pipe(fileStream);
            image.on("end", () => {
              fileStream.end(); // Pastikan stream diakhiri
              resolve();
            });
            image.on("error", (err) => {
              fileStream.end();
              reject(err);
            });
          });

          images = `http://localhost:3000/public/${filename}`;
        } catch (error) {
          console.error("Error saving image:", error);
          return h.response("Internal server error").code(500);
        }
      }

      try {
        const kuliner = await kuliners.create({
          name,
          description,
          location,
          city,
          rating,
          price,
          image: images,
        });
        return h.response(kuliner).code(201);
      } catch (error) {
        console.error("Error creating destination:", error);
        return h.response("Internal server error").code(500);
      }
    },
  });

  // untuk Get All Kuliner
  server.route({
    method: "GET",
    path: "/kuliners",
    handler: async (request, h) => {
      try {
        const kuliner = await kuliners.findAll();
        return kuliner;
      } catch (err) {
        console.error("Error fetching kuliners:", err);
        return h.response("Internal server error").code(500);
      }
    },
  });

  // untuk Get by ID Kuliner
  server.route({
    method: "GET",
    path: "/kuliners/{id}",
    handler: async (request, h) => {
      const { id } = request.params;
      try {
        const kuliner = await kuliners.findByPk(id);
        if (!kuliner) {
          return h.response({ error: "Destination not found" }).code(404);
        }
        return kuliner;
      } catch (error) {
        console.error("Error fetching destination:", error);
        return h.response("Internal server error").code(500);
      }
    },
  });

  // PUT destinasi
  server.route({
    method: "PUT",
    path: "/kuliners/{id}",
    options: {
      payload: {
        output: "stream",
        parse: true,
        allow: "multipart/form-data",
        multipart: true,
        maxBytes: 50 * 1024 * 1024, // 50MB
      },
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          description: Joi.string().required(),
          location: Joi.string().required(),
          city: Joi.string().required(),
          rating: Joi.number().required(),
          price: Joi.number().required(),
          image: Joi.any().meta({ swaggerType: "file" }).optional(),
        }),
        failAction: (request, h, err) => {
          return err;
        },
      },
    },
    handler: async (request, h) => {
      const id = request.params.id;
      const { name, description, location, city, rating, price } =
        request.payload;
      const image = request.payload.image;

      let images = null;

      if (image) {
        const filename = `${Date.now()}-${image.hapi.filename}`;
        const uploadPath = path.join(__dirname, "public", filename);

        try {
          await fs.promises.mkdir(path.join(__dirname, "public"), {
            recursive: true,
          });
          const fileStream = fs.createWriteStream(uploadPath);

          await new Promise((resolve, reject) => {
            image.pipe(fileStream);
            image.on("end", () => {
              fileStream.end();
              resolve();
            });
            image.on("error", (err) => {
              fileStream.end();
              reject(err);
            });
          });

          images = `http://localhost:3000/public/${filename}`;
        } catch (error) {
          console.error("Error saving image:", error);
          return h.response("Internal server error").code(500);
        }
      }

      try {
        const kuliner = await kuliners.update(
          {
            // Asumsi ada method update
            name,
            description,
            location,
            city,
            rating,
            price,
            image: images,
          },
          {
            where: { id },
          }
        );
        return h.response(kuliner).code(200);
      } catch (error) {
        console.error("Error updating destination:", error);
        return h.response("Internal server error").code(500);
      }
    },
  });

  // DELETE destinasi
  server.route({
    method: "DELETE",
    path: "/kuliners/{id}",
    handler: async (request, h) => {
      const { id } = request.params;
      try {
        const kuliner = await kuliners.findByPk(id);
        if (!kuliner) {
          return h.response({ error: "Destination not found" }).code(404);
        }
        await kuliner.destroy();
        return { message: "Destination deleted" };
      } catch (error) {
        console.error("Error deleting destination:", error);
        return h.response("Internal server error").code(500);
      }
    },
  });

  // ================================ + Contact Us + ===============================//
  server.route({
    method: "POST",
    path: "/contact",
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          message: Joi.string().required(),
        }),
        failAction: (request, h, err) => {
          return err;
        },
      },
    },
    handler: async (request, h) => {
      const { name, email, message } = request.payload;

      try {
        // Simpan data kontak ke database
        await Contact.create({ name, email, message });

        // Kirim respons balik ke klien
        return h
          .response({
            message:
              "Terima kasih sudah menghubungi kami. Kami akan segera menghubungi Anda kembali.",
          })
          .code(200);
      } catch (error) {
        console.error("Error saving contact:", error);
        return h
          .response({
            error:
              "Failed to save contact information. Please try again later.",
          })
          .code(500);
      }
    },
  });
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
  process.exit(1);
});

init();
