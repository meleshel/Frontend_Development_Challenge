import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private workoutsSource = new BehaviorSubject<any[]>([]);
  workouts$ = this.workoutsSource.asObservable();

  constructor() {
    const storedWorkouts = localStorage.getItem('workouts');
    if (storedWorkouts) {
      this.workoutsSource.next(JSON.parse(storedWorkouts));
    } else {
      this.workoutsSource.next([
        { username: 'John', workoutType: 'Cardio', minutes: 30 },
        { username: 'Alice', workoutType: 'Strength', minutes: 45 },
        { username: 'Bob', workoutType: 'Yoga', minutes: 60 },
      ]);
    }
  }

  getWorkouts() {
    return this.workoutsSource.getValue();
  }

  updateWorkouts(workouts: any[]) {
    this.workoutsSource.next(workouts);
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }
}
