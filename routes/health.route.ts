import { Router } from "express";
import { HandleError } from "../utils/helpers";
import { healthController } from "../controllers/health.controller";

const router = Router();

router.get("/", HandleError(healthController.ping)); //ping the server to check if it is running

export default router;
