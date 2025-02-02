import { Component } from '@angular/core';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorkoutFormComponent, WorkoutListComponent],
  template: `
<div>
  <h1 class="text-center">
    Welcome to {{ title }}!
  </h1>

  <div>
  <div class="flex flex-col items-center gap-6 w-full max-w-lg   bg-blue-500 p-4">
    <app-workout-form></app-workout-form>
  </div>
  
  <div class="absolute top-16 right-4 bg-green-500 p-4 mt-2">
    <app-workout-list></app-workout-list>
  </div>
  </div>
 
</div>

  `,
  styles: []
})
export class AppComponent {
  title = 'health-tracker-challenge';
}


