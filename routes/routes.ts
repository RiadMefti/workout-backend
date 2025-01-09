import { Router, NextFunction, Response, Request } from "express";
import healthRoutes from "./health.route";
import workoutRoutes from "./workout-split.route";
import workoutManagerRoutes from "./workout-manager.route";
import { ApiError } from "../middlewares/error.middleware";
import authRoutes from "./auth.route";
const router = Router();

//all the routes
router.use("/health", healthRoutes); //health route for production to see if the server is up
router.use("/auth", authRoutes); //auth routes for login and register
router.use("/workout", workoutRoutes); //workout routes for the workout split
router.use("/workout-manager", workoutManagerRoutes) //workout manager routes for the workout manager when you do a workout
// 404 middleware for non-existant routes
router.use((req: Request) => {
  throw new ApiError(404, "Not Found");
});

export default router;
