const swaggerJsDocs = require("swagger-jsdoc");
const m2s = require("mongoose-to-swagger");
const { version } = require("../package.json");
const Country = require("../models/Country");

const m2sOptions = {
  omitFields: [
    "_id",
    "createdAt",
    "updatedAt",
    "landAreaString",
    "densityNumber",
    "densityString",
  ],
};

const countrySwaggerSchema = m2s(Country, m2sOptions);

const swaggerOptions = {
  definition: {
    info: {
      title: "Countries API Docs",
      description:
        "Documentation for the Countries API Project(NODE-EXPRESS-MONGODB) with Swagger(swagger-jsdoc and swagger-ui-express).",
      contact: {
        name: "axense234",
        url: "https://github.com/axense234",
        email: "andreicomanescuonline@gmail.com",
      },
      version,
    },
    components: {
      schemas: {
        Country: countrySwaggerSchema,
        Authorization: {
          properties: {
            username: {
              type: "string",
            },
            password: {
              type: "string",
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        scheme: "bearer",
        in: "header",
        name: "Authorization",
      },
    },
    // Servers for development/production
    servers: [
      { url: "http://localhost:3000" },
      { url: "https://countries-api-nem-ca.onrender.com" },
    ],
  },
  apis: ["./routers/*.js"],
};

const swaggerDocs = swaggerJsDocs(swaggerOptions);

module.exports = { swaggerDocs };
