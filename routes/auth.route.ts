import { Router } from "express";
import { HandleError } from "../utils/helpers";
import { authController } from "../controllers/auth.controller";

const router = Router();

router.post("/register", HandleError(authController.register));
router.post("/login", HandleError(authController.login));
export default router;
