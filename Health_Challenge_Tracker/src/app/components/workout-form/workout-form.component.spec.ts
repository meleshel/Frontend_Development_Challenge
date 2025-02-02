import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutFormComponent } from './workout-form.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule
      ],
      providers: [provideAnimations()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form when valid data is provided', () => {
    component.username = 'John';
    component.workoutType = 'Cardio';
    component.minutes = 30;

    spyOn(localStorage, 'setItem');

    component.submitForm();

    // Check that setItem was called with the correct data
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'workouts',
      JSON.stringify([{ username: 'John', workoutType: 'Cardio', minutes: 30 }])
    );
    // Check form fields are reset
    expect(component.username).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.minutes).toBeNull();
  });

  it('should not submit the form if data is invalid', () => {
    component.username = '';
    component.workoutType = '';
    component.minutes = null;

    spyOn(localStorage, 'setItem');

    component.submitForm();

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should clear the form fields after submission', () => {
    component.username = 'Jane';
    component.workoutType = 'Yoga';
    component.minutes = 45;

    component.submitForm();

    expect(component.username).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.minutes).toBeNull();
  });

  it('should store workout data in localStorage', () => {
    const workoutData = { username: 'Mike', workoutType: 'Strength', minutes: 60 };

    spyOn(localStorage, 'setItem');
    component.username = workoutData.username;
    component.workoutType = workoutData.workoutType;
    component.minutes = workoutData.minutes;

    component.submitForm();

    // Verify setItem called with the new workout array
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'workouts',
      JSON.stringify([workoutData])
    );
  });

  it('should append new workout to localStorage without overwriting', () => {
    const initialWorkout = { username: 'Alice', workoutType: 'Running', minutes: 40 };
    const newWorkout = { username: 'Bob', workoutType: 'Cycling', minutes: 60 };

    // Set initial data
    localStorage.setItem('workouts', JSON.stringify([initialWorkout]));

    spyOn(localStorage, 'setItem');

    component.username = newWorkout.username;
    component.workoutType = newWorkout.workoutType;
    component.minutes = newWorkout.minutes;

    component.submitForm();

    // Verify the combined array is passed to setItem
    const expectedWorkouts = [initialWorkout, newWorkout];
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'workouts',
      JSON.stringify(expectedWorkouts)
    );
  });
});