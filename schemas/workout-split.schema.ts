import * as mongoose from "mongoose";
import {
  ExerciceDTO,
  WorkoutDTO,
  WorkoutSplitDTO,
} from "../types/workout.types";

// Interface for WorkoutSplit methods
interface WorkoutSplitMethods {
  toDTO(): WorkoutSplitDTO;
  edit(updates: Partial<WorkoutSplitDTO>): Promise<WorkoutSplitDTO>;
  delete(): Promise<boolean>;
}

// Interface for WorkoutSplit document
interface WorkoutSplitDocument extends mongoose.Document, WorkoutSplitMethods {
  _id: mongoose.Types.ObjectId;

  user: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  workouts: Array<{
    name: string;
    exercises: Array<{
      name: string;
      type: "strength" | "cardio";
      sets?: number;
      reps?: number;
      duration?: number;
      distance?: number;
    }>;
  }>;
  created_at: Date;
}

// Interface for WorkoutSplit model
interface WorkoutSplitModel extends mongoose.Model<WorkoutSplitDocument> {}

const workoutSplitSchema = new mongoose.Schema<
  WorkoutSplitDocument,
  WorkoutSplitModel,
  WorkoutSplitMethods
>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String },
    workouts: [
      {
        name: { type: String, required: true },
        exercises: [
          {
            name: { type: String, required: true },
            type: {
              type: String,
              enum: ["strength", "cardio"],
              required: true,
            },
            sets: { type: Number, default: undefined },
            reps: { type: Number, default: undefined },
            duration: { type: Number, default: undefined }, // in seconds
            distance: { type: Number, default: undefined }, // in meters
          },
        ],
      },
    ],
    created_at: { type: Date, default: Date.now },
  },
  {
    methods: {
      toDTO() {
        return {
          id: this._id.toString(),
          name: this.name,
          description: this.description || "",
          workouts: this.workouts.map((workout) => ({
            name: workout.name,
            exercises: workout.exercises.map((exercise) => ({
              name: exercise.name,
              type: exercise.type as "strength" | "cardio",
              sets: exercise.sets || undefined,
              reps: exercise.reps || undefined,
              duration: exercise.duration || undefined,
              distance: exercise.distance || undefined,
            })) as ExerciceDTO[],
          })),
        } as WorkoutSplitDTO;
      },

      async edit(updates: Partial<WorkoutSplitDTO>) {
        if (updates.name) this.name = updates.name;
        if (updates.description !== undefined)
          this.description = updates.description;

        if (updates.workouts) {
          this.workouts = updates.workouts.map((workout) => ({
            ...workout,
          }));
        }

        await this.save();
        return this.toDTO();
      },
      async delete() {
        await this.deleteOne();
        return true;
      },
    },
  }
);

export const WorkoutSplit = mongoose.model<
  WorkoutSplitDocument,
  WorkoutSplitModel
>("WorkoutSplit", workoutSplitSchema);
