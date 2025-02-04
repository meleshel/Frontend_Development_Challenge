import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { WorkoutService } from '../../service/workout.service';
import { Workout } from '../../types/workout.types';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  template: `
    <div class="bg-blue-200 shadow-lg rounded-xl p-6 md:p-8 max-w-md mx-auto">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Track Your Workout
      </h2>
      <!-- Workout form with validation -->
      <form #workoutForm="ngForm" (ngSubmit)="submitForm(workoutForm)" class="space-y-6">
        
        <!-- Username input field -->
        <mat-form-field class="w-full">
          <mat-label class="text-gray-600 font-medium">Username</mat-label>
          <input
            matInput
            [(ngModel)]="username"
            name="username"
            required
            minlength="3"
            maxlength="30"
            #usernameInput="ngModel"
            placeholder="Enter your username"
            class="w-full px-4 py-3 border rounded-lg transition-all duration-200 placeholder-gray-400 text-gray-700"
            [class.border-red-300]="usernameInput.invalid && (usernameInput.dirty || usernameInput.touched)"
            [class.focus:ring-red-400]="usernameInput.invalid">
          <mat-error *ngIf="usernameInput.errors?.['required'] && (usernameInput.dirty || usernameInput.touched)">
            Username is required
          </mat-error>
          <mat-error *ngIf="usernameInput.errors?.['minlength'] && (usernameInput.dirty || usernameInput.touched)">
            Minimum 3 characters required
          </mat-error>
        </mat-form-field>
        
        <!-- Workout Type input field -->
        <mat-form-field class="w-full">
          <mat-label class="text-gray-600 font-medium">Workout Type</mat-label>
          <input
            matInput
            [(ngModel)]="workoutType"
            name="workoutType"
            required
            minlength="3"
            maxlength="30"
            #workoutTypeInput="ngModel"
            placeholder="e.g., Cardio, Yoga, Strength"
            class="w-full px-4 py-3 border rounded-lg transition-all duration-200 placeholder-gray-400 text-gray-700"
            [class.border-red-300]="workoutTypeInput.invalid && (workoutTypeInput.dirty || workoutTypeInput.touched)"
            [class.focus:ring-red-400]="workoutTypeInput.invalid">
          <mat-error *ngIf="workoutTypeInput.errors?.['required'] && (workoutTypeInput.dirty || workoutTypeInput.touched)">
            Workout type is required
          </mat-error>
          <mat-error *ngIf="workoutTypeInput.errors?.['minlength'] && (workoutTypeInput.dirty || workoutTypeInput.touched)">
            Minimum 3 characters required
          </mat-error>
        </mat-form-field>
        
        <!-- Workout Minutes input field -->
        <mat-form-field class="w-full">
          <mat-label class="text-gray-600 font-medium">Workout Minutes</mat-label>
          <input
            matInput
            type="number"
            [(ngModel)]="minutes"
            name="minutes"
            required
            min="1"
            max="360"
            #minutesInput="ngModel"
            placeholder="Minutes exercised"
            class="w-full px-4 py-3 border rounded-lg transition-all duration-200 placeholder-gray-400 text-gray-700"
            [class.border-red-300]="minutesInput.invalid && (minutesInput.dirty || minutesInput.touched)"
            [class.focus:ring-red-400]="minutesInput.invalid">
          <span matSuffix class="text-gray-500 pr-2">minutes</span>
          <mat-error *ngIf="minutesInput.errors?.['required'] && (minutesInput.dirty || minutesInput.touched)">
            Duration is required
          </mat-error>
          <mat-error *ngIf="minutesInput.errors?.['min'] && (minutesInput.dirty || minutesInput.touched)">
            Minimum 1 minute required
          </mat-error>
          <mat-error *ngIf="minutesInput.errors?.['max'] && (minutesInput.dirty || minutesInput.touched)">
            Maximum 360 minutes (6 hours)
          </mat-error>
        </mat-form-field>
        
        <!-- Submit Button -->
        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="workoutForm.invalid"
          class="w-full py-3.5 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-lg">
          Add Workout
        </button>
      </form>
    </div>
  `,
  styles: [],
})
export class WorkoutFormComponent {
  username = '';
  workoutType = '';
  minutes: number | null = null;

  constructor(
    private workoutService: WorkoutService,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Handles form submission if valid, adds workout,
   * displays a success notification, and clears the form.
   */
  submitForm(workoutForm: NgForm): void {
    if (workoutForm.valid) {
      const newWorkout: Workout = {
        username: this.username,
        workoutType: this.workoutType,
        minutes: this.minutes || 0
      };

      this.workoutService.addWorkout(newWorkout);
      this.snackBar.open('Workout added successfully!', 'Close', { duration: 3000 });
      this.clearForm(workoutForm);
    }
  }

  /**
   * Resets the form and clears component fields.
   */
  clearForm(workoutForm: NgForm): void {
    workoutForm.resetForm();
    this.username = '';
    this.workoutType = '';
    this.minutes = null;
  }
}