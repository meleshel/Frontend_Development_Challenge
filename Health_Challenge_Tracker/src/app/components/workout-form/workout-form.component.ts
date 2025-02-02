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
   <div>
  <form (ngSubmit)="submitForm()" >
    <!-- Username Field -->
    <mat-form-field class="w-full">
      <mat-label>Username</mat-label>
      <input matInput [(ngModel)]="username" name="username" required class="border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </mat-form-field>

    <!-- Workout Type Field -->
    <mat-form-field class="w-full">
      <mat-label>Workout Type</mat-label>
      <input matInput [(ngModel)]="workoutType" name="workoutType" required class="border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </mat-form-field>

    <!-- Minutes Field -->
    <mat-form-field class="w-full">
      <mat-label>Minutes</mat-label>
      <input matInput type="number" [(ngModel)]="minutes" name="minutes" required class="border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </mat-form-field>

    <!-- Submit Button -->
    <button mat-raised-button color="primary" type="submit" class="w-full py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 mt-4">
      Add Workout
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


