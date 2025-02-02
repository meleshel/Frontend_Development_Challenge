// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { WorkoutFormComponent } from './workout-form.component';

// describe('WorkoutFormComponent', () => {
//   let component: WorkoutFormComponent;
//   let fixture: ComponentFixture<WorkoutFormComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [WorkoutFormComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(WorkoutFormComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutFormComponent } from './workout-form.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, MatInputModule, MatButtonModule, MatFormFieldModule],
      declarations: [WorkoutFormComponent],
      schemas: [NO_ERRORS_SCHEMA], // Ignores errors from missing children components
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form when valid data is provided', () => {
    // Mock valid form data
    component.username = 'John';
    component.workoutType = 'Cardio';
    component.minutes = 30;

    // Spy on localStorage.setItem
    spyOn(localStorage, 'setItem');

    component.submitForm();

    const savedWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    expect(savedWorkouts.length).toBe(1);
    expect(savedWorkouts[0]).toEqual({
      username: 'John',
      workoutType: 'Cardio',
      minutes: 30,
    });
    expect(localStorage.setItem).toHaveBeenCalled();
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

    const savedWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    expect(savedWorkouts).toContain(workoutData);
    expect(localStorage.setItem).toHaveBeenCalledWith('workouts', JSON.stringify(savedWorkouts));
  });
});

