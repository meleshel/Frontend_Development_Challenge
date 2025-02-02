import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    // Set up testing module
    TestBed.configureTestingModule({
      providers: [WorkoutService],
    });
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize workouts from localStorage if available', () => {
    const workouts = [
      { username: 'John', workoutType: 'Cardio', minutes: 30 },
      { username: 'Alice', workoutType: 'Strength', minutes: 45 },
    ];

    // Mock localStorage.getItem to return workouts data
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(workouts));

    // Reinitialize the service to simulate the constructor logic
    const serviceWithWorkouts = new WorkoutService();

    expect(serviceWithWorkouts.getWorkouts()).toEqual(workouts);
  });

  it('should return default workouts if no data in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const serviceWithDefaultWorkouts = new WorkoutService();
    
    const defaultWorkouts = [
      { username: 'John', workoutType: 'Cardio', minutes: 30 },
      { username: 'Alice', workoutType: 'Strength', minutes: 45 },
      { username: 'Bob', workoutType: 'Yoga', minutes: 60 },
    ];

    expect(serviceWithDefaultWorkouts.getWorkouts()).toEqual(defaultWorkouts);
  });

  it('should update workouts and save them to localStorage', () => {
    const newWorkouts = [
      { username: 'Mike', workoutType: 'Strength', minutes: 45 },
      { username: 'Sarah', workoutType: 'Yoga', minutes: 60 },
    ];

    // Spy on localStorage.setItem to verify it is called
    spyOn(localStorage, 'setItem');

    service.updateWorkouts(newWorkouts);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'workouts',
      JSON.stringify(newWorkouts)
    );

    expect(service.getWorkouts()).toEqual(newWorkouts);
  });

  it('should persist workouts to localStorage when updated', () => {
    const updatedWorkouts = [
      { username: 'John', workoutType: 'Cardio', minutes: 45 },
      { username: 'Alice', workoutType: 'Strength', minutes: 60 },
    ];

    // Spy on localStorage.setItem to check for persistence
    spyOn(localStorage, 'setItem');

    service.updateWorkouts(updatedWorkouts);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'workouts',
      JSON.stringify(updatedWorkouts)
    );
  });
});

