import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;
  const defaultWorkouts = [
    { username: 'John', workoutType: 'Cardio', minutes: 30 },
    { username: 'Alice', workoutType: 'Strength', minutes: 45 },
    { username: 'Bob', workoutType: 'Yoga', minutes: 60 },
  ];

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load initial data from localStorage', () => {
    const mockWorkouts = [
      { username: 'Test', workoutType: 'Running', minutes: 20 }
    ];
    localStorage.setItem('workouts', JSON.stringify(mockWorkouts));
    const newService = new WorkoutService();
    expect(newService.getWorkouts()).toEqual(mockWorkouts);
  });

  it('should use default workouts when localStorage is empty', () => {
    const newService = new WorkoutService();
    expect(newService.getWorkouts()).toEqual(defaultWorkouts);
  });

  it('should add new workout and update localStorage', () => {
    const newWorkout = { username: 'Mike', workoutType: 'Cycling', minutes: 45 };
    const setItemSpy = spyOn(localStorage, 'setItem');
    service.addWorkout(newWorkout);
    expect(service.getWorkouts()).toContain(newWorkout);
    expect(setItemSpy).toHaveBeenCalledWith(
      'workouts',
      JSON.stringify([...defaultWorkouts, newWorkout])
    );
  });

  it('should append to existing workouts in localStorage', () => {
    const existingWorkouts = [
      { username: 'Existing', workoutType: 'Swim', minutes: 30 }
    ];
    localStorage.setItem('workouts', JSON.stringify(existingWorkouts));
    const newService = new WorkoutService();
    const newWorkout = { username: 'New', workoutType: 'Run', minutes: 20 };
    newService.addWorkout(newWorkout);
    expect(newService.getWorkouts()).toEqual([...existingWorkouts, newWorkout]);
  });

  it('should emit updated workouts through observable', (done) => {
    const newWorkout = { username: 'Emma', workoutType: 'Yoga', minutes: 60 };
    service.workouts$.subscribe(workouts => {
      if (workouts.length === defaultWorkouts.length + 1) {
        expect(workouts).toContain(newWorkout);
        done();
      }
    });

    service.addWorkout(newWorkout);
  });

  it('should handle multiple consecutive additions', () => {
    const workout1 = { username: 'A', workoutType: 'X', minutes: 10 };
    const workout2 = { username: 'B', workoutType: 'Y', minutes: 20 };
    service.addWorkout(workout1);
    service.addWorkout(workout2);
    expect(service.getWorkouts().length).toBe(defaultWorkouts.length + 2);
    expect(service.getWorkouts()).toContain(workout1);
    expect(service.getWorkouts()).toContain(workout2);
  });
});