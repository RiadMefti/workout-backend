import { Router } from "express";
import { HandleError } from "../utils/helpers";
import { workoutController } from "../controllers/workout.controller";

const router = Router();

router.get("/", HandleError(workoutController.getWorkouts));
router.get("/:id", HandleError(workoutController.getWorkout));
router.post("/", HandleError(workoutController.createWorkout));
router.put("/:id", HandleError(workoutController.editWorkout));
router.delete("/:id", HandleError(workoutController.deleteWorkout));


export default router;

