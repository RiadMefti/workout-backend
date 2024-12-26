import { WorkoutRecord } from '../schemas/workout-record.schema';
import { WorkoutRecordDTO } from '../types/workout.types';
import mongoose from 'mongoose';

class WorkoutManagerService {
  constructor() { }

  public async getAllUserWorkouts(userId: string): Promise<WorkoutRecordDTO[]> {
    try {
      const workoutRecords = await WorkoutRecord.find({ user: userId })
        .sort({ date: -1 })
        .exec();

      return workoutRecords.map(record => record.toDTO());
    } catch (error) {
      console.error('Error fetching user workouts:', error);
      throw new Error('Failed to fetch user workouts');
    }
  }

  public async getUserWorkoutById(userId: string, workoutRecordId: string): Promise<WorkoutRecordDTO> {
    try {
      const workoutRecord = await WorkoutRecord.findOne({
        _id: workoutRecordId,
        user: userId
      }).exec();

      if (!workoutRecord) {
        throw new Error('Workout record not found');
      }

      return workoutRecord.toDTO();
    } catch (error) {
      console.error('Error fetching workout record:', error);
      throw new Error('Failed to fetch workout record');
    }
  }

  public async getUserActiveWorkout(userId: string): Promise<WorkoutRecordDTO> {
    try {
      // Get the most recent workout record for the user
      const activeWorkout = await WorkoutRecord.findOne({
        user: userId,
        date: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)) // Today's records only
        }
      })
        .sort({ date: -1 })
        .populate('workout', 'name description')
        .exec();

      if (!activeWorkout) {
        throw new Error('No active workout found');
      }

      return activeWorkout.toDTO();
    } catch (error) {
      console.error('Error fetching active workout:', error);
      throw new Error('Failed to fetch active workout');
    }
  }

  public async postUserActiveWorkout(
    userId: string,
    workoutId: string,
    workoutData: {
      exercises: Array<{
        name: string;
        type: 'strength' | 'cardio';
        bestReps?: number;
        bestWeight?: number;
        duration?: number;
        distance?: number;
      }>;
    }
  ): Promise<WorkoutRecordDTO> {
    try {
      // Validate userId and workoutId
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(workoutId)) {
        throw new Error('Invalid userId or workoutId');
      }

      // Create new workout record
      const workoutRecord = new WorkoutRecord({
        user: userId,
        workout: workoutId,
        date: new Date(),
        exercises: workoutData.exercises.map(exercise => ({
          name: exercise.name,
          type: exercise.type,
          bestReps: exercise.bestReps,
          bestWeight: exercise.bestWeight,
          duration: exercise.duration,
          distance: exercise.distance
        }))
      });

      await workoutRecord.save();
      await workoutRecord.populate('workout', 'name description');

      return workoutRecord.toDTO();
    } catch (error) {
      console.error('Error creating workout record:', error);
      throw new Error('Failed to create workout record');
    }
  }
}

export const workoutManager = new WorkoutManagerService();
