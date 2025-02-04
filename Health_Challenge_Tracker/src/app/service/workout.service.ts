import { Injectable } from '@angular/core';
import { Workout } from '../types/workout.types';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';

// Export default workout data.
export const defaultWorkoutData: Workout[] = [
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
    if (storedWorkouts && storedWorkouts !== '[]') {
      this.workoutsSubject.next(JSON.parse(storedWorkouts));
    } else {
      // Initialize with an empty array so that nothing shows on load.
      this.workoutsSubject.next([]);
    }
  }

  addWorkout(workout: Workout): void {
    let updatedWorkouts: Workout[];
    if (this.workoutsSubject.value.length === 0) {
      // Merge default data with the new workout.
      updatedWorkouts = [...defaultWorkoutData, workout];
    } else {
      updatedWorkouts = [...this.workoutsSubject.value, workout];
    }
    this.workoutsSubject.next(updatedWorkouts);
    this.storageService.setItem('userWorkouts', JSON.stringify(updatedWorkouts));
  }

  getWorkouts(): Workout[] {
    return this.workoutsSubject.value;
  }
}