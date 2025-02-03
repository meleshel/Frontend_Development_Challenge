export interface Workout {
  username: string;
  workoutType: string;
  minutes: number | null;  
}

  export interface User {
    id: number;
    name: string;
    workouts: Workout[];
  }