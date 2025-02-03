import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private workoutsSource = new BehaviorSubject<any[]>(this.loadInitialData());
  workouts$ = this.workoutsSource.asObservable();

  private loadInitialData() {
    const storedWorkouts = localStorage.getItem('workouts');
    return storedWorkouts ? JSON.parse(storedWorkouts) : [
      { username: 'John', workoutType: 'Cardio', minutes: 30 },
      { username: 'Alice', workoutType: 'Strength', minutes: 45 },
      { username: 'Bob', workoutType: 'Yoga', minutes: 60 },
    ];
  }

  addWorkout(workout: any) {
    const currentWorkouts = this.workoutsSource.getValue();
    const updatedWorkouts = [...currentWorkouts, workout];
    this.workoutsSource.next(updatedWorkouts);
    localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
  }

  getWorkouts() {
    return this.workoutsSource.getValue();
  }
}