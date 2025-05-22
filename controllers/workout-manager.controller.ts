import { Request, Response, NextFunction } from "express";
import { CreateApiSuccess, CreateApiError } from "../utils/helpers";
import { workoutManager } from "../services/workout-manager.service";
import { createWorkoutRecordSchema } from "../zod/workout-manager.zod";
import { WorkoutRecordDTO } from "../types/workout.types";

class WorkoutManagerController {
  // Get all the workout records for the user
  public async getAllUserWorkouts(req: Request, res: Response): Promise<void> {
    try {
      const workouts = await workoutManager.getAllUserWorkouts(req.user._id);
      CreateApiSuccess(workouts, 200, res);
    } catch (error: unknown) {
      CreateApiError("Failed to fetch workout records", 500, res);
    }
  }

  // Get a specific workout record for the user
  public async getUserWorkoutById(req: Request, res: Response): Promise<void> {
    try {
      const workout = await workoutManager.getUserWorkoutById(
        req.user._id,
        req.params.id
      );
      CreateApiSuccess(workout, 200, res);
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        error.message === "Workout record not found"
      ) {
        return CreateApiError("Workout record not found", 404, res);
      }
      CreateApiError("Failed to fetch workout record", 500, res);
    }
  }

  // Create a new workout record for the user
  public async postUserActiveWorkout(
    req: Request,
    res: Response
  ): Promise<void> {
    const result = createWorkoutRecordSchema.safeParse(req.body.workoutRecord);

    if (!result.success) {
      return CreateApiError(result.error.errors[0].message, 400, res);
    }

    try {
      const workoutRecord = await workoutManager.postUserActiveWorkout(
        req.user._id,
        req.body.workoutRecord
      );
      CreateApiSuccess(workoutRecord, 201, res);
    } catch (error: unknown) {
      CreateApiError(
        error instanceof Error ? error.message : "Failed to create workout record",
        500,
        res
      );
    }
  }

  // Add a user to your connections by email
  public async addConnection(req: Request, res: Response): Promise<void> {
    try {
      const connections = await workoutManager.addConnection(
        req.user._id,
        req.body.email
      );
      CreateApiSuccess(connections, 200, res);
    } catch (error: unknown) {
      CreateApiError(
        error instanceof Error ? error.message : "Failed to add connection",
        400,
        res
      );
    }
  }

  // Get all your connections
  public async getConnections(req: Request, res: Response): Promise<void> {
    try {
      const connections = await workoutManager.getConnections(req.user._id);
      CreateApiSuccess(connections, 200, res);
    } catch (error: unknown) {
      CreateApiError(
        error instanceof Error ? error.message : "Failed to fetch connections",
        400,
        res
      );
    }
  }

  // Get all workouts for a connection (by email)
  public async getConnectionWorkouts(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const workouts = await workoutManager.getConnectionWorkouts(
        req.user._id,
        req.params.email
      );
      CreateApiSuccess(workouts, 200, res);
    } catch (error: unknown) {
      CreateApiError(
        error instanceof Error ? error.message : "Failed to fetch connection workouts",
        400,
        res
      );
    }
  }
}

export const workoutManagerController = new WorkoutManagerController();
