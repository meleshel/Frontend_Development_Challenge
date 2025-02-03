import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { WorkoutService } from './workout.service';
import { StorageService } from './storage.service';

describe('WorkoutService', () => {
  let service: WorkoutService;
  let storageServiceMock: jasmine.SpyObj<StorageService>;

  const initialWorkouts = [
    { username: 'John', workoutType: 'Cardio', minutes: 30 },
    { username: 'Alice', workoutType: 'Strength', minutes: 45 },
    { username: 'Bob', workoutType: 'Yoga', minutes: 60 },
  ];

  beforeEach(() => {
    storageServiceMock = jasmine.createSpyObj('StorageService', ['getItem', 'setItem']);
    storageServiceMock.getItem.and.returnValue(JSON.stringify(initialWorkouts));

    TestBed.configureTestingModule({
      providers: [
        WorkoutService,
        { provide: StorageService, useValue: storageServiceMock },
      ],
    });

    service = TestBed.inject(WorkoutService);
  });

  it('should add a new workout and update localStorage after debounce', fakeAsync(() => {
    const newWorkout = { username: 'Emma', workoutType: 'Pilates', minutes: 40 };
    service.addWorkout(newWorkout);
    tick(300); 
    flush(); 

    expect(storageServiceMock.setItem).toHaveBeenCalledWith(
      'userWorkouts',
      JSON.stringify([...initialWorkouts, newWorkout])
    );

    const updatedWorkouts = service.getWorkouts();
    expect(updatedWorkouts).toEqual([...initialWorkouts, newWorkout]);
  }));
});
