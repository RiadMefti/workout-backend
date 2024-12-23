import { Request, Response } from "express";
import { CreateApiSuccess, CreateApiError } from "../utils/helpers";
import { Workout } from "../schemas/workout.schema";

class WorkoutController {
  constructor() { }


  //get all the workouts
  public async getWorkouts(req: Request, res: Response): Promise<void> {
    const workouts = await Workout.find({ user: req.user._id });
    CreateApiSuccess(workouts.map(w => w.toDTO()), 200, res);
  }
  //get a workout by id
  public async getWorkout(req: Request, res: Response): Promise<void> {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!workout) {
      return CreateApiError("Workout not found", 404, res);
    }

    CreateApiSuccess(workout.toDTO(), 200, res);
  }

  public async createWorkout(req: Request, res: Response): Promise<void> {
    const workout = new Workout({
      ...req.body,
      user: req.user._id
    });

    await workout.save();
    CreateApiSuccess(workout.toDTO(), 201, res);
  }

  public async editWorkout(req: Request, res: Response): Promise<void> {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!workout) {
      return CreateApiError("Workout not found", 404, res);
    }

    const updated = await workout.edit(req.body);
    CreateApiSuccess(updated, 200, res);
  }

  public async deleteWorkout(req: Request, res: Response): Promise<void> {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!workout) {
      return CreateApiError("Workout not found", 404, res);
    }

    await workout.delete();
    CreateApiSuccess({ message: "Deleted" }, 200, res);
  }
}

export const workoutController = new WorkoutController();
