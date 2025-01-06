// zod/workoutRecord.zod.ts
import { z } from "zod";

const exerciseSchema = z.object({
  name: z.string().min(1, "Exercise name is required"),
  type: z.enum(["strength", "cardio"], {
    errorMap: () => ({ message: "Type must be either 'strength' or 'cardio'" }),
  }),
  bestReps: z.number().optional(),
  bestWeight: z.number().optional(),
  duration: z.number().optional(),
  distance: z.number().optional(),
});

export const createWorkoutRecordSchema = z.object({
  workoutName: z.string().min(1, "Workout name is required"),
  exercises: z
    .array(exerciseSchema)
    .min(1, "At least one exercise is required"),

  id: z.string().min(1, "Workout ID is required"),
  date: z.string().min(1, "Date is required"),
});
