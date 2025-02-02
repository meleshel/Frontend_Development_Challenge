import { Component } from '@angular/core';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorkoutFormComponent, WorkoutListComponent],
  template: `
<div>
  <h1 class="text-center text-2xl font-semibold mb-6">
    Welcome to {{ title }}!
  </h1>

  <div class="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-lg sm:max-w-md md:max-w-lg bg-blue-300 p-4 rounded-lg">
    <app-workout-form></app-workout-form>
  </div>
  
  <div class="bg-green-300 p-4 mt-4 rounded-lg">
    <app-workout-list></app-workout-list>
  </div>
</div>

  `,
  styles: []
})
export class AppComponent {
  title = 'Health_Challenge_Tracker';
}


