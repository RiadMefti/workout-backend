import * as mongoose from "mongoose";
import { WorkoutDTO } from "../types/workout.types";

// Interface for Workout methods
interface WorkoutMethods {
  toDTO(): WorkoutDTO;
  edit(updates: Partial<WorkoutDTO>): Promise<WorkoutDTO>;
  delete(): Promise<boolean>;
}

// Interface for Workout document
interface WorkoutDocument extends mongoose.Document, WorkoutMethods {
  _id: mongoose.Types.ObjectId;

  user: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  exercises: Array<{
    name: string;
    type: 'strength' | 'cardio';
    sets?: number;
    reps?: number;
    duration?: number;
    distance?: number;
  }>;
  created_at: Date;
}

// Interface for Workout model
interface WorkoutModel extends mongoose.Model<WorkoutDocument> { }

const workoutSchema = new mongoose.Schema<WorkoutDocument, WorkoutModel, WorkoutMethods>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String },
    exercises: [{
      name: { type: String, required: true },
      type: { type: String, enum: ['strength', 'cardio'], required: true },
      // For strength exercises
      sets: { type: Number, default: undefined },
      reps: { type: Number, default: undefined },
      // For cardio exercises
      duration: { type: Number, default: undefined },  // in seconds
      distance: { type: Number, default: undefined }   // in meters
    }],
    created_at: { type: Date, default: Date.now }
  },
  {
    methods: {
      toDTO() {
        return {
          id: this._id.toString(),
          name: this.name,
          description: this.description || undefined,
          exercises: this.exercises.map(exercise => ({
            name: exercise.name,
            type: exercise.type as 'strength' | 'cardio',
            sets: exercise.sets || undefined,
            reps: exercise.reps || undefined,
            duration: exercise.duration || undefined,
            distance: exercise.distance || undefined
          })),
        };
      },
      async edit(updates: Partial<WorkoutDTO>) {
        if (updates.name) this.name = updates.name;
        if (updates.description !== undefined) this.description = updates.description;
        if (updates.exercises) this.exercises = updates.exercises;

        await this.save();
        return this.toDTO();
      },
      async delete() {
        await this.deleteOne();
        return true;
      }
    }
  }
);

export const Workout = mongoose.model<WorkoutDocument, WorkoutModel>("Workout", workoutSchema);

