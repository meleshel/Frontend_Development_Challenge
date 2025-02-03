import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { WorkoutService } from './service/workout.service';
import { StorageService } from './service/storage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),

    { provide: WorkoutService, useClass: WorkoutService },
    { provide: StorageService, useClass: StorageService },
  ]
};
