import { Workout } from "../schemas/workout.schema";
import mongoose from "mongoose";
import { WorkoutDTO } from "../types/workout.types";

class WorkoutService {
  constructor() { }

  public async getWorkouts(userId: string): Promise<WorkoutDTO[]> {
    const workouts = await Workout.find({ user: userId });
    return workouts.map(w => w.toDTO());
  }

  public async getWorkout(workoutId: string, userId: string): Promise<WorkoutDTO> {
    const workout = await Workout.findOne({
      _id: workoutId,
      user: userId
    });

    if (!workout) {
      throw new Error("Workout not found");
    }

    return workout.toDTO();
  }

  public async createWorkout(data: Omit<WorkoutDTO, 'id'>, userId: string): Promise<WorkoutDTO> {
    const workout = new Workout({
      ...data,
      user: userId
    });

    await workout.save();
    return workout.toDTO();
  }

  public async editWorkout(workoutId: string, userId: string, updates: Partial<WorkoutDTO>): Promise<WorkoutDTO> {
    const workout = await Workout.findOne({
      _id: workoutId,
      user: userId
    });

    if (!workout) {
      throw new Error("Workout not found");
    }

    const updated = await workout.edit(updates);
    return updated;
  }

  public async deleteWorkout(workoutId: string, userId: string): Promise<void> {
    const workout = await Workout.findOne({
      _id: workoutId,
      user: userId
    });

    if (!workout) {
      throw new Error("Workout not found");
    }

    await workout.delete();
  }
}

export const workoutService = new WorkoutService();
