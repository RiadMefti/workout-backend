import express from "express";
import router from "./routes/routes";
import { ApiError, ErrorHandler } from "./middlewares/error.middleware";
import { Authorization } from "./middlewares/authorization.middleware";
import logger from "./utils/logger";
import mongoose from "mongoose";
import { Client } from "minio";

import cors from "cors";
import { minioService } from "./services/minio.service";
const app = express();
const port = process.env.PORT || 8080;

// Test connection on startup
minioService.testConnection().catch((error) => {
  console.error("Failed to connect to MinIO:", error);
});

//connecting to mongoose client (pour faire la connexion avec la base de données)
try {
  const connexion_string = process.env.MONGO_DB || "";
  mongoose.connect(connexion_string, {
    dbName: "workout",
  });

  console.log("Successfully connected to Db");
} catch (err) {
  throw new ApiError(500, "error connecting");
}

// Use cors to allow cross-origin requests
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "*", // Allow all methods
    allowedHeaders: "*", // Allow all headers
  })
);
// logger middleware pour logger les requêtes
app.use(logger);

//Json middleware pour parser les requêtes en json
app.use(express.json());

//Authorization middleware pour vérifier les tokens et qui a accès à quoi
app.use(Authorization);

app.use(router);
//Error middleware pour gérer les erreurs
app.use(ErrorHandler);
app.listen(port, () => {
  console.log("server started and is listening on port " + port);
});
