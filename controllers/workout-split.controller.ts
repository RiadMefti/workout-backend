import { Request, Response } from "express";
import { CreateApiSuccess, CreateApiError } from "../utils/helpers";
import { workoutSplitService } from "../services/workout-split.service";
import {
  CreateWorkoutSplitSchema,
  UpdateWorkoutSplitSchema,
} from "../zod/workout-split.zod";

class WorkoutSplitController {
  constructor() {}

  /**
   * Get all workout splits for a user
   */
  public async getWorkoutSplits(req: Request, res: Response): Promise<void> {
    try {
      const splits = await workoutSplitService.getWorkoutSplits(req.user._id);
      CreateApiSuccess(splits, 200, res);
    } catch (error) {
      CreateApiError("Failed to fetch workout splits", 500, res);
    }
  }

  /**
   * Get a specific workout split
   */
  public async getWorkoutSplit(req: Request, res: Response): Promise<void> {
    try {
      const split = await workoutSplitService.getWorkoutSplit(
        req.params.id,
        req.user._id
      );
      CreateApiSuccess(split, 200, res);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Workout split not found"
      ) {
        return CreateApiError("Workout split not found", 404, res);
      }
      CreateApiError("Failed to fetch workout split", 500, res);
    }
  }

  /**
   * Get active split for a user
   */

  public async getActiveSplit(req: Request, res: Response): Promise<void> {
    try {
      const activeSplit = await workoutSplitService.getActiveSplit(
        req.user._id
      );
      CreateApiSuccess(activeSplit, 200, res);
    } catch (error) {
      if (error instanceof Error && error.message === "User not found") {
        return CreateApiError("User not found", 404, res);
      }
      CreateApiError("Failed to fetch active split", 500, res);
    }
  }

  /**
   * Set active split for a user
   */

  public async setActiveSplit(req: Request, res: Response): Promise<void> {
    try {
      await workoutSplitService.setActiveSplit(req.params.id, req.user._id);
      CreateApiSuccess({ message: "Active split set successfully" }, 200, res);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Workout split not found"
      ) {
        return CreateApiError("Workout split not found", 404, res);
      }
      CreateApiError("Failed to set active split", 500, res);
    }
  }

  /**
   * Create a new workout split
   */
  public async createWorkoutSplit(req: Request, res: Response): Promise<void> {
    const result = CreateWorkoutSplitSchema.safeParse(req.body);

    if (!result.success) {
      return CreateApiError(result.error.errors[0].message, 400, res);
    }

    try {
      const split = await workoutSplitService.createWorkoutSplit(
        result.data,
        req.user._id
      );
      CreateApiSuccess(split, 201, res);
    } catch (error) {
      CreateApiError("Failed to create workout split", 500, res);
    }
  }

  /**
   * Edit an existing workout split
   */
  public async editWorkoutSplit(req: Request, res: Response): Promise<void> {
    const result = UpdateWorkoutSplitSchema.safeParse(req.body);

    if (!result.success) {
      return CreateApiError(result.error.errors[0].message, 400, res);
    }

    try {
      const updated = await workoutSplitService.editWorkoutSplit(
        req.params.id,
        req.user._id,
        result.data
      );
      CreateApiSuccess(updated, 200, res);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Workout split not found"
      ) {
        return CreateApiError("Workout split not found", 404, res);
      }
      CreateApiError("Failed to update workout split", 500, res);
    }
  }

  /**
   * Delete an existing workout split
   */
  public async deleteWorkoutSplit(req: Request, res: Response): Promise<void> {
    try {
      await workoutSplitService.deleteWorkoutSplit(req.params.id, req.user._id);
      CreateApiSuccess(
        { message: "Workout split deleted successfully" },
        200,
        res
      );
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Workout split not found"
      ) {
        return CreateApiError("Workout split not found", 404, res);
      }
      CreateApiError("Failed to delete workout split", 500, res);
    }
  }

  public async getUserNextWorkoutIndex(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const nextWorkoutIndex = await workoutSplitService.getNextWorkoutIndex(
        req.user._id
      );
      CreateApiSuccess(nextWorkoutIndex, 200, res);
    } catch (error) {
      if (error instanceof Error && error.message === "User not found") {
        return CreateApiError("User not found", 404, res);
      }
      CreateApiError("Failed to fetch next workout index", 500, res);
    }
  }

  public async incrementUserNextWorkoutIndex(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      await workoutSplitService.setNextWorkoutIndex(
        req.user._id,
        parseInt(req.params.index)
      );
      CreateApiSuccess(
        { message: "Next workout index incremented successfully" },
        200,
        res
      );
    } catch (error) {
      if (error instanceof Error && error.message === "User not found") {
        return CreateApiError("User not found", 404, res);
      }
      CreateApiError("Failed to increment next workout index", 500, res);
    }
  }
}

export const workoutSplitController = new WorkoutSplitController();
