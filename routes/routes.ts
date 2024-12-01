import { Router, NextFunction, Response, Request } from "express";
import healthRoutes from "./health.route";
import { ApiError } from "../middlewares/error.middleware";

const router = Router();

//all the routes
router.use("/health", healthRoutes);

// 404 middleware for non-existant routes
router.use(() => {
  throw new ApiError(404, "Not Found");
});

export default router;
