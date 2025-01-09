import { Router } from "express";
import { HandleError } from "../utils/helpers";
import { workoutSplitController } from "../controllers/workout-split.controller";

const router = Router();

router.get("/", HandleError(workoutSplitController.getWorkoutSplits)); //get all the workout splits for the user
router.post("/", HandleError(workoutSplitController.createWorkoutSplit)); //create a new workout split for the user
router.put("/:id", HandleError(workoutSplitController.editWorkoutSplit)); //edit a specific workout split for the user
router.delete("/:id", HandleError(workoutSplitController.deleteWorkoutSplit)); //delete a specific workout split for the user

router.get(
  "/next-workout-index",
  HandleError(workoutSplitController.getUserNextWorkoutIndex)
); //get the next workout index for the user
router.post(
  "/next-workout-index/:index",
  HandleError(workoutSplitController.incrementUserNextWorkoutIndex)
); //increment the next workout index for the user

router.get(
  "/active-split/",
  HandleError(workoutSplitController.getActiveSplit)
); //get the active workout split for the user
router.post(
  "/active-split/:splitId",
  HandleError(workoutSplitController.setActiveSplit)
); //set a specific workout split as active

export default router;
