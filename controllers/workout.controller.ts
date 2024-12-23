import { Request, Response, NextFunction } from "express";
import { CreateApiSuccess } from "../utils/helpers";
import { authService } from "../services/auth.service";

class WorkoutController {
  constructor() { }

  public async getWorkouts(req: Request, res: Response): Promise<void> {

  }
  public async getWorkout(req: Request, res: Response): Promise<void> {
  }
  public async createWorkout(req: Request, res: Response): Promise<void> {
  }
  public async editWorkout(req: Request, res: Response): Promise<void> {
  }
  public async deleteWorkout(req: Request, res: Response): Promise<void> {
  }
}
export const workoutController = new WorkoutController();



