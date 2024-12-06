import express from "express";
import router from "./routes/routes";
import { ApiError, ErrorHandler } from "./middlewares/error.middleware";
import { Authorization } from "./middlewares/authorization.middleware";
import logger from "./utils/logger";
import mongoose from "mongoose";

import cors from "cors";
const app = express();
const port = process.env.PORT || 8080;

try {
  const connexion_string = process.env.MONGO_DB || "";
  mongoose.connect(connexion_string, {
    dbName: "workout",
  });
} catch (err) {
  throw new ApiError(500, "error connecting");
}
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "*", // Allow all methods
    allowedHeaders: "*", // Allow all headers
    credentials: true, // Allow credentials
    preflightContinue: true, // Pass through preflight
    optionsSuccessStatus: 200, // Some legacy browsers need this
  }),
);
// Use morgan to log requests
app.use(logger);

//All the middleware je vais les mettres ici
app.use(express.json());

//Les routes
app.use(Authorization);

app.use(router);
app.use(ErrorHandler);
app.listen(port, () => {
  console.log("server started and is listening on port " + port);
});
