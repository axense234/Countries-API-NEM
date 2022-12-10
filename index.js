const express = require("express");
require("dotenv").config();
require("express-async-errors");

// Security
const xss = require("xss-clean");
const helmet = require("helmet");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");

// Swagger
const swaggerUI = require("swagger-ui-express");
const { swaggerDocs } = require("./utils/swagger");
const { version } = require("./package.json");

// Connect DB
const connectDB = require("./db/connect");

const app = express();

app.use(express.json());
app.use(express.raw());
app.use(xss());
app.use(helmet());
app.use(cors());

// Security middleware
app.set("trust proxy", 1);
// Limit each IP to request 3000 times in 15 mins
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 200,
  })
);

const port = process.env.PORT || 4000;

// Routers Import and Error Handler
const ErrorHandlerMiddleware = require("./middleware/ErrorHandler");
const countries = require("./routers/countries");

app.get("/", (req, res) => {
  return res.status(200).json({ msg: "Home Page" });
});

app.use("/countries", [countries]);
app.use(ErrorHandlerMiddleware);
app.use(`/api/${version}/docs`, swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to MONGODB!");
    app.listen(port, () => {
      console.log(`Server is listening on port:${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
