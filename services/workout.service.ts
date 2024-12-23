class WorkoutService {
  constructor() { }

  public async getWorkouts(): Promise<string> {
    return "Pong";
  }
  public async getWorkout(): Promise<string> {
    return "Pong";
  }
  public async createWorkout(): Promise<string> {
    return "Pong";
  }
  public async editWorkout(): Promise<string> {
    return "Pong";
  }
  public async deleteWorkout(): Promise<string> {
    return "Pong";
  }
}

export const workoutService = new WorkoutService();
