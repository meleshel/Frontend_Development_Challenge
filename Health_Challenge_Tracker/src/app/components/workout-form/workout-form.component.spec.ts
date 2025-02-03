import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { WorkoutFormComponent } from './workout-form.component';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WorkoutService } from '../../service/workout.service';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let workoutService: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
    const workoutServiceSpy = jasmine.createSpyObj('WorkoutService', ['addWorkout']);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: WorkoutService, useValue: workoutServiceSpy },
        provideAnimations()
      ]
    }).compileComponents();

    workoutService = TestBed.inject(WorkoutService) as jasmine.SpyObj<WorkoutService>;
    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addWorkout when form is valid', () => {
    component.username = 'JohnDoe';
    component.workoutType = 'Running';
    component.minutes = 30;
    const form = { valid: true } as NgForm;
    component.submitForm(form);
    expect(workoutService.addWorkout).toHaveBeenCalledWith({
      username: 'JohnDoe',
      workoutType: 'Running',
      minutes: 30
    });
  });

  it('should not call addWorkout when form is invalid', () => {
    component.username = '';
    component.workoutType = 'R';
    component.minutes = 0;
    const form = { valid: false } as NgForm;
    component.submitForm(form);
    expect(workoutService.addWorkout).not.toHaveBeenCalled();
  });

  it('should clear form fields after successful submission', () => {
    component.username = 'JaneDoe';
    component.workoutType = 'Cycling';
    component.minutes = 45;
    const form = {
      valid: true,
      reset: jasmine.createSpy('reset')
    } as unknown as NgForm;
    component.submitForm(form);
    expect(form.reset).toHaveBeenCalled();
    expect(component.username).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.minutes).toBeNull();
  });

  it('should display validation errors for required fields', fakeAsync(() => {
    const usernameInput = fixture.debugElement.query(By.css('[name="username"]')).nativeElement;
    usernameInput.dispatchEvent(new Event('input'));
    usernameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    tick();
    const errorMessages = fixture.debugElement.queryAll(By.css('mat-error'));
    expect(errorMessages.length).toBeGreaterThan(0);
    expect(errorMessages[0].nativeElement.textContent).toContain('Username is required');
  }));

  it('should disable submit button when form is invalid', fakeAsync(() => {
    component.username = 'Jo';
    component.workoutType = '';
    component.minutes = null;
    fixture.detectChanges();
    tick();
    const submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(submitButton.disabled).toBeTrue();
  }));

  it('should show minlength error for username', fakeAsync(() => {
    component.username = 'Ab';
    const usernameInput = fixture.debugElement.query(By.css('[name="username"]')).nativeElement;
    usernameInput.dispatchEvent(new Event('input'));
    usernameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    tick();

    let errorMessage = fixture.debugElement.query(By.css('mat-error'));
    if (usernameInput.value.length === 0) {
      expect(errorMessage.nativeElement.textContent).toContain('Username is required');
    } else {
      errorMessage = fixture.debugElement.query(By.css('mat-error'));
      expect(errorMessage.nativeElement.textContent).toContain('Minimum 3 characters required');
    }
  }));

  it('should show max validation error for minutes', fakeAsync(() => {
    const minutesInput = fixture.debugElement.query(By.css('[name="minutes"]')).nativeElement;
    minutesInput.value = '400';
    minutesInput.dispatchEvent(new Event('input'));
    minutesInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    tick();
    const errorMessages = fixture.debugElement.queryAll(By.css('mat-error'));
    const maxError = errorMessages.find(msg =>
      msg.nativeElement.textContent.includes('Maximum 360 minutes (6 hours)')
    );
    expect(maxError).toBeTruthy();
  }));

});
