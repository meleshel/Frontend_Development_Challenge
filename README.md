# Health Challenge Tracker - Frontend Development Challenge

This project is an Angular 14+ SPA where users can input and track workout information. The app stores data in `localStorage` and provides the following functionalities:

- **Add a User**: Input for user name, workout type, and workout minutes.
- **User Workout List**: Display users' workout data in a table.
- **Search and Filter**: Search by user name and filter by workout type.
- **Pagination**: For displaying more than 5 users.
- **Optional Feature**: Display workout progress using charts.
- **Unit Tests**: 100% code coverage for a component and a service.

## Technologies Used:
- **Angular 14+**: Main framework.
- **Tailwind CSS**: For styling.
- **Angular Material**: For UI components.
- **localStorage**: For storing user workout data.
- **Chart.js** (optional): For displaying workout progress.


## Requirements & Features:

### 1. Input Fields:
- **User Name**
- **Workout Type**
- **Workout Minutes**
- **Submit Button**

### 2. User Workout List:
- Display in a table/grid format with `name`, `workout type`, and `minutes`.
- Ability to search by username.
- Ability to filter by workout type.
- Pagination for more than 5 users.

### 3. Data Structure (Stored in `localStorage`):

userData = [
  {
    id: 1,
    name: 'John Doe',
    workouts: [
      { type: 'Running', minutes: 30 },
      { type: 'Cycling', minutes: 45 }
    ]
  },
  ...
];
4. Optional Chart: Display workout progress (e.g., total minutes per workout type).
Setup Instructions:
1. Install Dependencies:
npm install
2. Run the Application:
ng serve
Open the browser and visit http://localhost:4200 to view the application.
3. Tailwind Configuration:
Ensure that tailwind.config.ts and postcss.config.js are properly set up in the root directory as per the instructions.
4. Testing:
Unit Tests: 100% code coverage on at least one component and one service. Run tests with:
ng test --code-coverage

Here's the updated README in markdown format with appropriate headers:

markdown
Copy
Edit
# Health Challenge Tracker - Frontend Development Challenge

This project is an Angular 14+ SPA where users can input and track workout information. The app stores data in `localStorage` and provides the following functionalities:

- **Add a User**: Input for user name, workout type, and workout minutes.
- **User Workout List**: Display users' workout data in a table.
- **Search and Filter**: Search by user name and filter by workout type.
- **Pagination**: For displaying more than 5 users.
- **Optional Feature**: Display workout progress using charts.
- **Unit Tests**: 100% code coverage for a component and a service.

## Technologies Used:
- **Angular 14+**: Main framework.
- **Tailwind CSS**: For styling.
- **Angular Material**: For UI components.
- **localStorage**: For storing user workout data.
- **Chart.js** (optional): For displaying workout progress.

---

## Requirements & Features:

### 1. Input Fields:
- **User Name**
- **Workout Type**
- **Workout Minutes**
- **Submit Button**

### 2. User Workout List:
- Display in a table/grid format with `name`, `workout type`, and `minutes`.
- Ability to search by username.
- Ability to filter by workout type.
- Pagination for more than 5 users.

### 3. Data Structure (Stored in `localStorage`):
```js
userData = [
  {
    id: 1,
    name: 'John Doe',
    workouts: [
      { type: 'Running', minutes: 30 },
      { type: 'Cycling', minutes: 45 }
    ]
  },
  ...
];
4. Optional Chart: Display workout progress (e.g., total minutes per workout type).
Setup Instructions:
1. Install Dependencies:
bash
Copy
Edit
npm install
2. Run the Application:
bash
Copy
Edit
ng serve
Open the browser and visit http://localhost:4200 to view the application.

3. Tailwind Configuration:
Ensure that tailwind.config.ts and postcss.config.js are properly set up in the root directory as per the instructions.

4. Testing:
Unit Tests: 100% code coverage on at least one component and one service. Run tests with:
bash
Copy
Edit
ng test --code-coverage

Features Overview:
Add Users: Add workout information via input forms, storing data in localStorage.
Table/Grid View: Displays users and their workouts.
Search & Filter: Search by username and filter by workout type.
Pagination: Handles displaying more than 5 users.
Optional Charts: Visualize user progress using Chart.js or any preferred charting library.

Unit Test Coverage:
100% test coverage for the following:
Component: user-form.component.ts for adding users.
Service: workout.service.ts for handling the workout data.

Bonus Feature (Charts):
Use Chart.js or another charting library to display workout data. Example chart could be:
Bar Chart: Total workout minutes per workout type.


Hosting:
Deploy the application to a cloud platform like Netlify, Heroku, or GitHub Pages. The deployed application link will be provided in the README.

Edge Cases Handled:
If no workouts are added, an empty message will be shown.
If pagination exceeds available users, pagination will adjust dynamically.

Deployed Link & GitHub Repository:
GitHub Repo: [Your GitHub Repo Link]
Deployed Application: [Deployed Web App Link]

Video Introduction:
Please check the Google Drive link for the video recording of your introduction:

Google Drive Link to Video: [Video Link]


