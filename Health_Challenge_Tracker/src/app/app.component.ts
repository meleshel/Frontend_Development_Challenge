import { Component } from '@angular/core';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WorkoutFormComponent, WorkoutListComponent],
  template: `
    <div class="min-h-screen bg-gray-50 p-4 md:p-8">
      <!-- Header Section -->
      <header class="text-center mb-8 bg-blue-200 p-6 rounded-xl">
        <h1 class="text-2xl font-bold text-gray-800 mb-6 hover:text-blue-600 hover:underline">
          Welcome to {{ title }}
        </h1>
      </header>
      
      <!-- Main Content Section -->
      <main class="max-w-4xl mx-auto">
        <!-- Workout Form Section -->
        <section class="mb-12">
          <app-workout-form></app-workout-form>
        </section>
        <!-- Workout List Section -->
        <section>
          <app-workout-list></app-workout-list>
        </section>
      </main>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'Health Challenge Tracker';
}