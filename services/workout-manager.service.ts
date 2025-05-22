import { WorkoutRecord } from "../schemas/workout-record.schema";
import { WorkoutRecordDTO } from "../types/workout.types";
import { User } from "../schemas/user.schema";
import { UserDTO } from "../types/user.types";

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

  // Add a user to connections by email
  public async addConnection(
    userId: string,
    email: string
  ): Promise<UserDTO[]> {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    if (user.email === email) throw new Error("Cannot add yourself");
    const target = await User.findOne({ email });
    if (!target) throw new Error("Target user not found");
    if (user.connections.includes(email)) throw new Error("User already added");
    user.connections.push(email);
    await user.save();
    return await this.getConnections(userId);
  }

  // Get all connections for a user
  public async getConnections(userId: string): Promise<UserDTO[]> {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    if (!Array.isArray(user.connections)) user.connections = [];
    const users = await User.find({ email: { $in: user.connections } });
    return users.map((u: any) => u.toDTO());
  }

  // Get all workouts for a connection (if in list)
  public async getConnectionWorkouts(
    requesterId: string,
    connectionEmail: string
  ): Promise<WorkoutRecordDTO[]> {
    const user = await User.findById(requesterId);
    if (!user) throw new Error("User not found");
    if (!Array.isArray(user.connections)) user.connections = [];
    if (!user.connections.includes(connectionEmail))
      throw new Error("Not authorized");
    const target = await User.findOne({ email: connectionEmail });
    if (!target) throw new Error("Target user not found");
    return await this.getAllUserWorkouts(target._id.toString());
  }
}

export const workoutManager = new WorkoutManagerService();
