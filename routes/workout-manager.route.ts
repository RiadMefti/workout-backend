import { Router } from "express";
import { HandleError } from "../utils/helpers";
import { workoutManagerController } from "../controllers/workout-manager.controller";

const router = Router();

router.get("/", HandleError(workoutManagerController.getAllUserWorkouts));
router.get("/:id", HandleError(workoutManagerController.getUserWorkoutById));
router.get("/active-workout", HandleError(workoutManagerController.getUserActiveWorkout));
router.post("/active-workout", HandleError(workoutManagerController.postUserActiveWorkout));

export default router;

