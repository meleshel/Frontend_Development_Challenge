import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
  template: `
    <div class="bg-blue-200 p-6 rounded-lg" >
  <div class="filter-container flex gap-4 mb-6">
   
    <mat-form-field appearance="fill" class="w-full sm:w-64">
      <mat-label>Search</mat-label>
      <input matInput [(ngModel)]="searchTerm" placeholder="Search" (keyup)="applyFilter()" class="w-full" />
    </mat-form-field>

    <mat-form-field appearance="fill" class="w-full sm:w-64">
      <mat-label>Filter by Workout Type</mat-label>
      <mat-select [(ngModel)]="selectedWorkoutType" (selectionChange)="applyFilter()">
        <mat-option value="">All</mat-option>
        <mat-option *ngFor="let type of workoutTypes" [value]="type">{{ type }}</mat-option>
      </mat-select>
    </mat-form-field>
  </div>

  <div class="table-container" *ngIf="filteredWorkouts.length > 0">
    <mat-table [dataSource]="dataSource" class="w-full shadow-lg rounded-lg overflow-hidden">
      <ng-container matColumnDef="username">
        <mat-header-cell *matHeaderCellDef class="font-semibold text-blue-900">Username</mat-header-cell>
        <mat-cell *matCellDef="let workout">{{ workout.username }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="workoutType">
        <mat-header-cell *matHeaderCellDef class="font-semibold text-blue-900">Workout Type</mat-header-cell>
        <mat-cell *matCellDef="let workout">{{ workout.workoutType }}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="minutes">
        <mat-header-cell *matHeaderCellDef class="font-semibold text-blue-900">Minutes</mat-header-cell>
        <mat-cell *matCellDef="let workout">{{ workout.minutes }}</mat-cell>
      </ng-container>

      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
    </mat-table>

    <mat-paginator class="bg-light-blue-50 p-2 rounded-lg" [pageSize]="pageSize" 
                   [pageSizeOptions]="[5, 10, 20]" 
                   [length]="filteredWorkouts.length" 
                   (page)="onPageChange($event)" 
                   class="mt-4">
    </mat-paginator>
  </div>

  <div *ngIf="filteredWorkouts.length === 0 && (searchTerm !== '' || selectedWorkoutType !== '')" class="text-center text-gray-500 mt-4">
    No matching results found.
  </div>
</div>

  
  `,
  styles: [],
  standalone: true,
  imports: [
    FormsModule, CommonModule, MatTableModule, MatPaginatorModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule
  ]
})
export class WorkoutListComponent implements OnInit, AfterViewInit {
  workouts: any[] = [];
  filteredWorkouts: any[] = [];
  displayedColumns: string[] = ['username', 'workoutType', 'minutes'];
  dataSource = new MatTableDataSource<any>([]);
  pageSize = 5;
  searchTerm = '';
  selectedWorkoutType = '';
  workoutTypes = ['Cardio', 'Strength', 'Yoga'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private workoutService: WorkoutService) { }

  ngOnInit(): void {
    this.loadWorkouts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadWorkouts() {
    this.workoutService.workouts$.subscribe(data => {
      this.workouts = data;
      this.filteredWorkouts = [];
      this.dataSource.data = this.filteredWorkouts;
    });
  }

  applyFilter() {
    this.filteredWorkouts = this.workouts.filter(workout => {
      const matchesSearch = !this.searchTerm || workout.username.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesWorkoutType = !this.selectedWorkoutType || workout.workoutType === this.selectedWorkoutType;
      return matchesSearch && matchesWorkoutType;
    });

    this.dataSource.data = this.filteredWorkouts;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.applyFilter();
  }
}


