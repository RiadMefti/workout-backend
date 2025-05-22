import { Router } from "express";
import { HandleError } from "../utils/helpers";
import { workoutManagerController } from "../controllers/workout-manager.controller";

const router = Router();

router.get("/", HandleError(workoutManagerController.getAllUserWorkouts)); //get all the workouts for the user
router.get(
  "/connections/:email/workouts",
  HandleError(workoutManagerController.getConnectionWorkouts)
); // get all workouts for a connection by email
router.get(
  "/connections",
  HandleError(workoutManagerController.getConnections)
); // get all your connections
router.post(
  "/connections",
  HandleError(workoutManagerController.addConnection)
); // add a user to your connections by email
router.get("/:id", HandleError(workoutManagerController.getUserWorkoutById)); //get a specific workout for the user
router.post(
  "/active-workout",
  HandleError(workoutManagerController.postUserActiveWorkout)
); //create a new workout record for the user

export default router;
