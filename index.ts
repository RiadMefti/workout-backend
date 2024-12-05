import express from "express";
import router from "./routes/routes";
import { ErrorHandler } from "./middlewares/error.middleware";
import { Authorization } from "./middlewares/authorization.middleware";
import logger from "./utils/logger";
const app = express();
const port = process.env.PORT || 8080;
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
