import { Router } from "express";
import { HandleError } from "../utils/helpers";
import { healthController } from "../controllers/health.controller";

const router = Router();

router.get("/", HandleError(healthController.ping));

export default router;
