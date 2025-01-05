import { WorkoutSplit } from "../schemas/workout-split.schema";
import mongoose from "mongoose";
import { WorkoutSplitDTO, WorkoutDTO } from "../types/workout.types";
import { User } from "../schemas/user.schema";

class WorkoutSplitService {
  constructor() {}

  /**
   * Get all workout splits for a specific user
   */
  public async getWorkoutSplits(userId: string): Promise<WorkoutSplitDTO[]> {
    const splits = await WorkoutSplit.find({ user: userId });
    return splits.map((split) => split.toDTO());
  }

  /**
   * Get a specific workout split for a user
   */
  public async getWorkoutSplit(
    splitId: string,
    userId: string
  ): Promise<WorkoutSplitDTO> {
    const split = await WorkoutSplit.findOne({
      _id: splitId,
      user: userId,
    });

    if (!split) {
      throw new Error("Workout split not found");
    }

    return split.toDTO();
  }

  /**
   * Get Active split for a user
   */

  public async getActiveSplit(userId: string): Promise<string | null> {
    const user = await User.findById(userId).populate("active_split").exec();

    if (!user) {
      throw new Error("User not found");
    }

    return user.getActiveSplit();
  }

  /**
   * Set active split for a user
   */

  public async setActiveSplit(splitId: string, userId: string): Promise<void> {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    user.active_split = new mongoose.Types.ObjectId(splitId);
    await user.save();

    return;
  }

  /**
   * Get next workout index
   *  */
  public async getNextWorkoutIndex(userId: string): Promise<number> {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user.getNextWorkoutIndex();
  }

  /**
   * Set  next workout index
   * */

  public async setNextWorkoutIndex(
    userId: string,
    index: number
  ): Promise<void> {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    user.next_workout_index = index;
    await user.save();

    return;
  }

  /**
   * Create a new workout split
   */
  public async createWorkoutSplit(
    data: Omit<WorkoutSplitDTO, "id">,
    userId: string
  ): Promise<WorkoutSplitDTO> {
    const split = new WorkoutSplit({
      ...data,
      user: userId,
    });

    await split.save();
    return split.toDTO();
  }

  /**
   * Edit an existing workout split
   */
  public async editWorkoutSplit(
    splitId: string,
    userId: string,
    updates: Partial<WorkoutSplitDTO>
  ): Promise<WorkoutSplitDTO> {
    const split = await WorkoutSplit.findOne({
      _id: splitId,
      user: userId,
    });

    if (!split) {
      throw new Error("Workout split not found");
    }

    const updated = await split.edit(updates);
    return updated;
  }

  /**
   * Delete an existing workout split
   */
  public async deleteWorkoutSplit(
    splitId: string,
    userId: string
  ): Promise<void> {
    const split = await WorkoutSplit.findOne({
      _id: splitId,
      user: userId,
    });

    if (!split) {
      throw new Error("Workout split not found");
    }

    await split.delete();
  }
}

export const workoutSplitService = new WorkoutSplitService();
