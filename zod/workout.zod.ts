import { z } from "zod";

export const exerciseSchema = z.object({
  name: z.string().min(1, "Exercise name is required"),
  type: z.enum(["strength", "cardio"]),
  sets: z.number().optional(),
  reps: z.number().optional(),
  duration: z.number().optional(),
  distance: z.number().optional(),
}).refine((data) => {
  if (data.type === "strength") {
    return data.sets != null && data.reps != null;
  }
  if (data.type === "cardio") {
    return data.duration != null || data.distance != null;
  }
  return true;
}, {
  message: "Strength exercises need sets and reps, cardio needs duration or distance"
});

export const createWorkoutSchema = z.object({
  name: z.string().min(1, "Workout name is required"),
  description: z.string().optional(),
  exercises: z.array(exerciseSchema).min(1, "At least one exercise is required")
});

export const updateWorkoutSchema = createWorkoutSchema.partial();

