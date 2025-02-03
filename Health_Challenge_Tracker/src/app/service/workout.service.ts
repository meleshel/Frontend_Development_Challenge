import { Injectable } from '@angular/core';
import { Workout } from '../types/workout.types';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
export class WorkoutService {
    private workoutsSubject = new BehaviorSubject<Workout[]>([]);
    public workouts$ = this.workoutsSubject.asObservable();  

    constructor(private storageService: StorageService) {
        const storedWorkouts = this.storageService.getItem('userWorkouts');
        if (storedWorkouts) {
            this.workoutsSubject.next(JSON.parse(storedWorkouts));
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

