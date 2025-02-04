import { Injectable } from '@angular/core';
import { Workout } from '../types/workout.types';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';

// Define default data here or import it from another file.
const defaultUserData: Workout[] = [
    // These objects should conform to your Workout type.
    // If your Workout type represents an individual workout,
    // you may need to adjust this structure accordingly.
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
        if (storedWorkouts) {
            // If data exists in localStorage, use it.
            this.workoutsSubject.next(JSON.parse(storedWorkouts));
        } else {
            // Otherwise, initialize with default data.
            this.workoutsSubject.next(defaultUserData);
            this.storageService.setItem('userWorkouts', JSON.stringify(defaultUserData));
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