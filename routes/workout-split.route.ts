import { Router } from "express";
import { HandleError } from "../utils/helpers";
import { workoutSplitController } from "../controllers/workout-split.controller";

const router = Router();

router.get("/", HandleError(workoutSplitController.getWorkoutSplits));
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

router.get(
  "/active-split/",
  HandleError(workoutSplitController.getActiveSplit)
);
router.post(
  "/active-split/:splitId",
  HandleError(workoutSplitController.setActiveSplit)
);

export default router;
