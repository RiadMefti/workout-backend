import { Router, NextFunction, Response, Request } from "express";
import healthRoutes from "./health.route";
import { ApiError } from "../middlewares/error.middleware";
import authRoutes from "./auth.route";
const router = Router();

//all the routes
router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
// 404 middleware for non-existant routes
router.use((req: Request) => {
  throw new ApiError(404, "Not Found");
});

export default router;
