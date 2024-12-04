import { Router } from "express";
import { HandleError } from "../utils/helpers";
import { authController } from "../controllers/auth.controller";

const router = Router();

router.get("/jwt", HandleError(authController.createJWT));
export default router;
