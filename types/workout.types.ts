// DTO type
export type WorkoutDTO = {
  id: string;
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
}


export type WorkoutRecordDTO = {
  id: string;
  workoutId: string;
  date: Date;
  exercises: Array<{
    name: string;
    type: 'strength' | 'cardio';
    bestReps?: number;
    bestWeight?: number;
    duration?: number;
    distance?: number;
  }>;
};

