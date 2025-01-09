import { WorkoutRecord } from "../schemas/workout-record.schema";
import { WorkoutRecordDTO } from "../types/workout.types";

class WorkoutManagerService {
  constructor() {}

  // Get all workouts for a user in descending order
  public async getAllUserWorkouts(userId: string): Promise<WorkoutRecordDTO[]> {
    try {
      const workoutRecords = await WorkoutRecord.find({ user: userId })
        .sort({ date: -1 })
        .exec();

      return workoutRecords.map((record) => record.toDTO());
    } catch (error) {
      console.error("Error fetching user workouts:", error);
      throw new Error("Failed to fetch user workouts");
    }
  }

  // Get a specific workout record by ID
  public async getUserWorkoutById(
    userId: string,
    workoutRecordId: string
  ): Promise<WorkoutRecordDTO> {
    try {
      const workoutRecord = await WorkoutRecord.findOne({
        _id: workoutRecordId,
        user: userId,
      }).exec();

      if (!workoutRecord) {
        throw new Error("Workout record not found");
      }

      return workoutRecord.toDTO();
    } catch (error) {
      console.error("Error fetching workout record:", error);
      throw new Error("Failed to fetch workout record");
    }
  }

  // Post a new workout record for a user
  public async postUserActiveWorkout(
    userId: string,
    workout: WorkoutRecordDTO
  ): Promise<WorkoutRecordDTO> {
    try {
      const workoutRecord = new WorkoutRecord({
        user: userId,
        workoutName: workout.workoutName,
        date: new Date(),
        exercises: workout.exercises,
      });

      await workoutRecord.save();
      return workoutRecord.toDTO();
    } catch (error) {
      console.error("Error creating workout record:", error);
      throw new Error("Failed to create workout record");
    }
  }
}

export const workoutManager = new WorkoutManagerService();
