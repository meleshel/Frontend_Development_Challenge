import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { WorkoutService } from '../../service/workout.service';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
  ],
  template: `
    <div class="bg-blue-200 p-6 rounded-lg">
      <div class="filter-container flex flex-wrap gap-4 mb-6">
        <!-- Search Filter -->
        <mat-form-field appearance="fill" class="w-full sm:w-64">
          <mat-label>Search</mat-label>
          <input
            matInput
            [(ngModel)]="searchTerm"
            placeholder="Search"
            (keyup)="applyFilter()"
            class="w-full"
          />
        </mat-form-field>

        <!-- Workout Type Filter -->
        <mat-form-field appearance="fill" class="w-full sm:w-64">
          <mat-label>Filter by Workout Type</mat-label>
          <mat-select [(ngModel)]="selectedWorkoutType" (selectionChange)="applyFilter()">
            <mat-option [value]="null">All</mat-option>
            <mat-option *ngFor="let type of workoutTypes" [value]="type">
              {{ type }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <!-- Workout Table -->
      <div *ngIf="filteredWorkouts.length > 0" class="table-container">
        <mat-table [dataSource]="dataSource" class="w-full shadow-lg rounded-lg overflow-hidden">
          <!-- Username Column -->
          <ng-container matColumnDef="username">
            <mat-header-cell *matHeaderCellDef class="font-semibold text-blue-900">
              Username
            </mat-header-cell>
            <mat-cell *matCellDef="let workout">{{ workout.username }}</mat-cell>
          </ng-container>

          <!-- Workout Type Column -->
          <ng-container matColumnDef="workoutType">
            <mat-header-cell *matHeaderCellDef class="font-semibold text-blue-900">
              Workout Type
            </mat-header-cell>
            <mat-cell *matCellDef="let workout">{{ workout.workoutType }}</mat-cell>
          </ng-container>

          <!-- Minutes Column -->
          <ng-container matColumnDef="minutes">
            <mat-header-cell *matHeaderCellDef class="font-semibold text-blue-900">
              Minutes
            </mat-header-cell>
            <mat-cell *matCellDef="let workout">{{ workout.minutes }}</mat-cell>
          </ng-container>

          <!-- Header and Row Definitions -->
          <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
          <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
        </mat-table>

        <!-- Paginator -->
        <mat-paginator
          class="bg-light-blue-50 p-2 rounded-lg mt-4"
          [pageSize]="pageSize"
          [pageSizeOptions]="[5, 10, 20]"
          [length]="filteredWorkouts.length"
          (page)="onPageChange($event)">
        </mat-paginator>
      </div>

      <!-- No Results Message -->
      <div *ngIf="filteredWorkouts.length === 0 && (searchTerm !== '' || selectedWorkoutType !== null)"
           class="text-center text-gray-500 mt-4">
        No matching results found.
      </div>
    </div>
  `,
  styles: [],
})
export class WorkoutListComponent implements OnInit, AfterViewInit {
  // Columns displayed in the table
  displayedColumns: string[] = ['username', 'workoutType', 'minutes'];

  // Data source for the Material Table
  dataSource = new MatTableDataSource<any>([]);

  // List of all workouts and the filtered workouts
  allWorkouts: any[] = [];
  filteredWorkouts: any[] = [];

  // Pagination and filtering parameters
  pageSize = 5;
  searchTerm = '';
  selectedWorkoutType: string | null = null;
  workoutTypes = ['Cardio', 'Strength', 'Yoga'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    // Subscribe to the workouts observable from the service
    this.workoutService.workouts$.subscribe((workouts) => {
      this.allWorkouts = [...workouts];
      // Apply the filter immediately when workouts are received
      this.applyFilter();
    });
  }

  ngAfterViewInit(): void {
    // Attach the paginator to the table data source
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Applies search and type filters to the workouts list and updates the table.
   */
  applyFilter(): void {
    this.filteredWorkouts = this.allWorkouts.filter((workout) => {
      const searchMatch = workout.username.toLowerCase().includes(this.searchTerm.toLowerCase());
      const typeMatch =
        this.selectedWorkoutType === null || workout.workoutType === this.selectedWorkoutType;
      return searchMatch && typeMatch;
    });

    // Update the data source with filtered workouts
    this.dataSource.data = this.filteredWorkouts;

    // Reset paginator to the first page if applicable
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Handles pagination changes.
   * @param event The pagination event from the paginator.
   */
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    // Optionally, perform further actions on page change
    this.applyFilter();
  }
}