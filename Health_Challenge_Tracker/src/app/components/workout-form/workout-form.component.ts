import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatFormFieldModule],
  template: `
   <div class="bg-blue-200 shadow-lg rounded-xl p-6 md:p-8 max-w-md mx-auto">
  <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Track Your Workout</h2>
  <form (ngSubmit)="submitForm()" class="space-y-6">
    <!-- Username Field -->
    <mat-form-field class="w-full">
      <mat-label class="text-gray-600 font-medium">Username</mat-label>
      <input matInput [(ngModel)]="username" name="username" required 
             class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent
                    transition-all duration-200 placeholder-gray-400 text-gray-700"
             placeholder="Enter your username">
    </mat-form-field>

    <!-- Workout Type Field -->
    <mat-form-field class="w-full">
      <mat-label class="text-gray-600 font-medium">Workout Type</mat-label>
      <input matInput [(ngModel)]="workoutType" name="workoutType" required
             class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent
                    transition-all duration-200 placeholder-gray-400 text-gray-700"
             placeholder="e.g., Running, Weightlifting">
    </mat-form-field>

    <!-- Minutes Field -->
    <mat-form-field class="w-full">
      <mat-label class="text-gray-600 font-medium">Duration</mat-label>
      <input matInput type="number" [(ngModel)]="minutes" name="minutes" required
             class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent
                    transition-all duration-200 placeholder-gray-400 text-gray-700"
             placeholder="Minutes exercised">
      <span matSuffix class="text-gray-500 pr-2">minutes</span>
    </mat-form-field>

    <!-- Submit Button -->
    <button mat-raised-button color="primary" type="submit" 
            class="w-full py-3.5 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 
                   transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-lg">
      Log Workout
    </button>
  </form>
</div>
  `,
  styles: []
})
export class WorkoutFormComponent {
  username = '';
  workoutType = '';
  minutes: number | null = null;

  submitForm() {
    if (this.username && this.workoutType && this.minutes !== null) {
      const newWorkout = { username: this.username, workoutType: this.workoutType, minutes: this.minutes };

      // Retrieve current workouts from local storage
      const savedWorkouts = localStorage.getItem('workouts');
      const workouts = savedWorkouts ? JSON.parse(savedWorkouts) : [];

      // Add the new workout and persist to local storage
      workouts.push(newWorkout);
      localStorage.setItem('workouts', JSON.stringify(workouts));

      // Clear form fields after submission
      this.clearForm();
    }
  }

  clearForm() {
    this.username = '';
    this.workoutType = '';
    this.minutes = null;
  }
}


