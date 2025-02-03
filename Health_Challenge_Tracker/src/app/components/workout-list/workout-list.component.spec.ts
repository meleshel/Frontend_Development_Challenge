import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { WorkoutService } from '../../service/workout.service';
import { of } from 'rxjs';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let workoutServiceMock: any;

  beforeEach(async () => {
    workoutServiceMock = {
      workouts$: of([
        { username: 'User 1', workoutType: 'Cardio', minutes: 30 },
        { username: 'User 2', workoutType: 'Strength', minutes: 45 },
      ]),
    };

    await TestBed.configureTestingModule({
      imports: [
        WorkoutListComponent,
        MatTableModule,
        MatPaginatorModule,
        FormsModule,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule
      ],
      providers: [
        { provide: WorkoutService, useValue: workoutServiceMock },
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    expect(component).toBeTruthy();
  }));

  it('should load workouts from the service', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    expect(component.workouts.length).toBe(2);
    expect(component.workouts[0].username).toBe('User 1');
    expect(component.workouts[1].username).toBe('User 2');
  }));

  it('should filter workouts by workout type', fakeAsync(() => {
    component.selectedWorkoutType = 'Cardio';
    component.applyFilter();
    fixture.detectChanges();
    tick();
    expect(component.filteredWorkouts.length).toBe(1);
    expect(component.filteredWorkouts[0].workoutType).toBe('Cardio');
  }));
});
