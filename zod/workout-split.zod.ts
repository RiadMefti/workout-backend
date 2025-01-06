import { z } from "zod";

// Define Exercise Schema
const ExerciseSchema = z
  .object({
    name: z.string().min(1, "Exercise name is required"),
    type: z.enum(["strength", "cardio"]),
    sets: z.number().optional(),
    reps: z.number().optional(),
    duration: z.number().optional(),
    distance: z.number().optional(),
  })
  .refine(
    (data) => {
      if (data.type === "strength") {
        return data.sets != null && data.reps != null;
      }
      if (data.type === "cardio") {
        return data.duration != null || data.distance != null;
      }
      return true;
    },
    {
      message:
        "Strength exercises need sets and reps, cardio needs duration or distance",
    }
  );

// Define Workout Schema
const WorkoutSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Workout name is required"),
  exercises: z
    .array(ExerciseSchema)
    .min(1, "At least one exercise is required"),
});

// Define Create Workout Split Schema
export const CreateWorkoutSplitSchema = z.object({
  name: z.string().min(1, "Workout split name is required"),
  description: z.string(),
  workouts: z.array(WorkoutSchema).min(1, "At least one workout is required"),
});

// Define Update Workout Split Schema
export const UpdateWorkoutSplitSchema = z.object({
  id: z.string().optional(), // Required for updates
  name: z.string().optional(),
  description: z.string().optional(),
  workouts: z.array(WorkoutSchema).optional(),
});
