# Smart Dashboard

Angular 21 app with a shell layout (sidebar + header), a dashboard home route, and mock HTTP-style APIs implemented with RxJS.

## 🧠 What the App Does

* Loads dashboard metrics (users, revenue, conversion rate) from a simulated API
* Displays a real-time activity feed
* Combines multiple data sources into a single reactive view model
* Visualizes key metrics in a bar chart using Chart.js
* Uses a reusable card-based UI layout for clean composition
* Handles loading states to mimic real network behavior

---

## ⚙️ Angular Concepts Demonstrated

### 🧩 Standalone Architecture

* Fully built using Angular’s standalone components (no NgModules)
* Uses `bootstrapApplication` and modern app config setup

### 🔀 Routing & Layout Composition

* Nested routes with a shared `ShellComponent` layout
* `RouterOutlet` used for dynamic page rendering

### ♻️ Component Design

* Smart vs presentational component separation
* Reusable `CardComponent` with `@Input()` + `ng-content`
* Clean UI composition and scalability patterns

### 🔌 Dependency Injection

* Uses Angular’s `inject()` function for service access
* Centralized API layer (`ApiService`)

### 🌊 Reactive Data Flow (RxJS)

* Observables used for all async data
* `combineLatest` to merge multiple API streams
* `shareReplay` for caching and performance
* Async pipe for automatic subscription management

### 🧠 ViewModel Pattern

* Uses a single `vm$` observable to drive the entire template
* Keeps templates clean and declarative

### ⏳ State Handling

* Loading states with `*ngIf` and `ng-template`
* Simulated network delays for realism

### 📊 External Library Integration

* Chart.js integrated directly (no wrapper libraries)
* Uses `ViewChild` and lifecycle hooks (`AfterViewInit`)
* Demonstrates DOM interaction in Angular

---

## 🎯 Why This Project

This project is designed to reflect real-world Angular patterns used in production applications, including scalable architecture, reactive programming, and clean UI composition.

## Tech stack

- Angular 21+
- TypeScript
- RxJS
- CSS
- Vitest (via Angular CLI unit test target)

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm start`    | Same as `ng serve`       |
| `ng serve`     | Dev server (port 4200)   |
| `ng build`     | Production build to `dist/` |
| `ng test`      | Unit tests               |

## Getting started

```bash
npm install
ng serve
```

pr for green square

Open [http://localhost:4200](http://localhost:4200).
<img width="1313" height="688" alt="image" src="https://github.com/user-attachments/assets/68b1c776-f568-4d50-9daf-2b0c26cbfd9e" />


