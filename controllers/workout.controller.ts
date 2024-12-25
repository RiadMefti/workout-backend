import { Request, Response } from "express";
import { CreateApiSuccess, CreateApiError } from "../utils/helpers";
import { workoutService } from "../services/workout.service";
import { createWorkoutSchema, updateWorkoutSchema } from "../zod/workout.zod";

class WorkoutController {
  constructor() { }

  public async getWorkouts(req: Request, res: Response): Promise<void> {
    try {
      const workouts = await workoutService.getWorkouts(req.user._id);
      CreateApiSuccess(workouts, 200, res);
    } catch (error) {
      CreateApiError("Failed to fetch workouts", 500, res);
    }
  }

  public async getWorkout(req: Request, res: Response): Promise<void> {
    try {
      const workout = await workoutService.getWorkout(req.params.id, req.user._id);
      CreateApiSuccess(workout, 200, res);
    } catch (error) {
      if (error instanceof Error && error.message === "Workout not found") {
        return CreateApiError("Workout not found", 404, res);
      }
      CreateApiError("Failed to fetch workout", 500, res);
    }
  }

  public async createWorkout(req: Request, res: Response): Promise<void> {
    const result = createWorkoutSchema.safeParse(req.body);

    if (!result.success) {
      return CreateApiError(result.error.errors[0].message, 400, res);
    }

    try {
      const workout = await workoutService.createWorkout(result.data, req.user._id);
      CreateApiSuccess(workout, 201, res);
    } catch (error) {
      CreateApiError("Failed to create workout", 500, res);
    }
  }

  public async editWorkout(req: Request, res: Response): Promise<void> {
    const result = updateWorkoutSchema.safeParse(req.body);

    if (!result.success) {
      return CreateApiError(result.error.errors[0].message, 400, res);
    }

    try {
      const updated = await workoutService.editWorkout(req.params.id, req.user._id, result.data);
      CreateApiSuccess(updated, 200, res);
    } catch (error) {
      if (error instanceof Error && error.message === "Workout not found") {
        return CreateApiError("Workout not found", 404, res);
      }
      CreateApiError("Failed to update workout", 500, res);
    }
  }

  public async deleteWorkout(req: Request, res: Response): Promise<void> {
    try {
      await workoutService.deleteWorkout(req.params.id, req.user._id);
      CreateApiSuccess({ message: "Workout deleted successfully" }, 200, res);
    } catch (error) {
      if (error instanceof Error && error.message === "Workout not found") {
        return CreateApiError("Workout not found", 404, res);
      }
      CreateApiError("Failed to delete workout", 500, res);
    }
  }
}

export const workoutController = new WorkoutController();
