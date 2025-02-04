import { Injectable } from '@angular/core';
import { Workout } from '../types/workout.types';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';

// Define default workout data (no id property).
const defaultWorkoutData: Workout[] = [
  { username: 'John Doe', workoutType: 'Running', minutes: 30 },
  { username: 'Jane Smith', workoutType: 'Cycling', minutes: 45 },
  { username: 'Mike Johnson', workoutType: 'Yoga', minutes: 60 },
];

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private workoutsSubject = new BehaviorSubject<Workout[]>([]);
  public workouts$ = this.workoutsSubject.asObservable();

  constructor(private storageService: StorageService) {
    const storedWorkouts = this.storageService.getItem('userWorkouts');
    // If storedWorkouts exists and is not an empty array, use it.
    if (storedWorkouts && storedWorkouts !== '[]') {
      this.workoutsSubject.next(JSON.parse(storedWorkouts));
    } else {
      // Otherwise, initialize with defaultWorkoutData.
      this.workoutsSubject.next(defaultWorkoutData);
      this.storageService.setItem('userWorkouts', JSON.stringify(defaultWorkoutData));
    }
  }

  addWorkout(workout: Workout): void {
    const updatedWorkouts = [...this.workoutsSubject.value, workout];
    this.workoutsSubject.next(updatedWorkouts);
    this.storageService.setItem('userWorkouts', JSON.stringify(updatedWorkouts));
  }

  getWorkouts(): Workout[] {
    return this.workoutsSubject.value;
  }
}