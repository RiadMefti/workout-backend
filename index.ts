import express from "express";
import router from "./routes/routes";
import { ErrorHandler } from "./middlewares/error.middleware";
const app = express();
const port = process.env.PORT || 8080;

//All the middleware je vais les mettres ici
app.use(express.json());

//Les routes

app.use(router);

//# TODO error handeling
app.use(ErrorHandler);
app.listen(port, () => {
  console.log("server started and is listening on port " + port);
});
