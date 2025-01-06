export type WorkoutDTO = {
  id?: string;
  name: string;
  exercises: ExerciceDTO[];
};
export type ExerciceDTO = {
  name: string;
  type: "strength" | "cardio";
  sets?: number | undefined;
  reps?: number | undefined;
  duration?: number | undefined;
  distance?: number | undefined;
};

export type WorkoutSplitDTO = {
  id: string;
  name: string;
  description: string;
  workouts: Array<WorkoutDTO>;
};

export type WorkoutRecordDTO = {
  id: string;
  workoutName: string;
  date: Date;
  exercises: Array<{
    name: string;
    type: "strength" | "cardio";
    bestReps?: number;
    bestWeight?: number;
    duration?: number;
    distance?: number;
  }>;
};
