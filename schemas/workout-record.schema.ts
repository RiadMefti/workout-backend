import mongoose, { Schema, Document, Model } from "mongoose";
import { WorkoutRecordDTO } from "../types/workout.types";

// Interface for WorkoutRecord instance methods
interface WorkoutRecordMethods {
  toDTO(): WorkoutRecordDTO;
}

// Interface for WorkoutRecord document
interface WorkoutRecordDocument extends Document, WorkoutRecordMethods {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  workout: mongoose.Types.ObjectId;
  date: Date;
  exercises: Array<{
    name: string;
    type: "strength" | "cardio";
    bestReps?: number;
    bestWeight?: number;
    duration?: number;
    distance?: number;
  }>;
}

// Interface for WorkoutRecord model
interface WorkoutRecordModel extends Model<WorkoutRecordDocument> {}

const workoutRecordSchema = new Schema<
  WorkoutRecordDocument,
  WorkoutRecordModel,
  WorkoutRecordMethods
>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    workout: {
      type: Schema.Types.ObjectId,
      ref: "WorkoutSplit",
      required: true,
    },
    date: { type: Date, required: true, default: Date.now },
    exercises: [
      {
        name: { type: String, required: true },
        type: { type: String, enum: ["strength", "cardio"], required: true },
        bestReps: { type: Number },
        bestWeight: { type: Number },
        duration: { type: Number },
        distance: { type: Number },
      },
    ],
  },
  {
    methods: {
      toDTO() {
        return {
          id: this._id.toString(),
          workoutId: this.workout.toString(),
          date: this.date,
          exercises: this.exercises.map((exercise) => ({
            name: exercise.name,
            type: exercise.type as "strength" | "cardio",
            bestReps: exercise.bestReps || undefined,
            bestWeight: exercise.bestWeight || undefined,
            duration: exercise.duration || undefined,
            distance: exercise.distance || undefined,
          })),
        };
      },
    },
  }
);

export const WorkoutRecord = mongoose.model<
  WorkoutRecordDocument,
  WorkoutRecordModel
>("WorkoutRecord", workoutRecordSchema);
