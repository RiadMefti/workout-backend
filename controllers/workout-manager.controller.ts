import { Request, Response, NextFunction } from "express";
import { CreateApiSuccess, CreateApiError } from "../utils/helpers";
import { workoutManager } from "../services/workout-manager.service";
import { createWorkoutRecordSchema } from "../zod/workout-manager.zod";

class WorkoutManagerController {
  public async getAllUserWorkouts(req: Request, res: Response): Promise<void> {
    try {
      const workouts = await workoutManager.getAllUserWorkouts(req.user._id);
      CreateApiSuccess(workouts, 200, res);
    } catch (error) {
      CreateApiError("Failed to fetch workout records", 500, res);
    }
  }

  public async getUserWorkoutById(req: Request, res: Response): Promise<void> {
    try {
      const workout = await workoutManager.getUserWorkoutById(
        req.user._id,
        req.params.id
      );
      CreateApiSuccess(workout, 200, res);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Workout record not found"
      ) {
        return CreateApiError("Workout record not found", 404, res);
      }
      CreateApiError("Failed to fetch workout record", 500, res);
    }
  }

  public async postUserActiveWorkout(
    req: Request,
    res: Response
  ): Promise<void> {
    const result = createWorkoutRecordSchema.safeParse(req.body);
    if (!result.success) {
      return CreateApiError(result.error.errors[0].message, 400, res);
    }

    try {
      const workoutRecord = await workoutManager.postUserActiveWorkout(
        req.user._id,
        result.data.workoutId,
        { exercises: result.data.exercises }
      );
      CreateApiSuccess(workoutRecord, 201, res);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Invalid userId or workoutId"
      ) {
        return CreateApiError("Invalid workout ID", 400, res);
      }
      CreateApiError("Failed to create workout record", 500, res);
    }
  }
}

export const workoutManagerController = new WorkoutManagerController();
