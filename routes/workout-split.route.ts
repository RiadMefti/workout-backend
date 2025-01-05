import { Router } from "express";
import { HandleError } from "../utils/helpers";
import { workoutSplitController } from "../controllers/workout-split.controller";

const router = Router();

router.get("/", HandleError(workoutSplitController.getWorkoutSplits));
router.get("/:id", HandleError(workoutSplitController.getWorkoutSplit));
router.post("/", HandleError(workoutSplitController.createWorkoutSplit));
router.put("/:id", HandleError(workoutSplitController.editWorkoutSplit));
router.delete("/:id", HandleError(workoutSplitController.deleteWorkoutSplit));

router.get(
  "/next-workout-index",
  HandleError(workoutSplitController.getUserNextWorkoutIndex)
);
router.put(
  "/next-workout-index/:index",
  HandleError(workoutSplitController.incrementUserNextWorkoutIndex)
);

export default router;
