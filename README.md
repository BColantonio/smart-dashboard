# Smart Dashboard

Angular 21 app with a shell layout (sidebar + header), a dashboard home route, and mock HTTP-style APIs implemented with RxJS.

## What’s in the repo

- **Routing:** `ShellComponent` wraps child routes; the default child is `DashboardComponent` (`app.routes.ts`).
- **Dashboard:** Stat cards (users, revenue, conversion) and a “Recent Activity” list. Data comes from `ApiService` (`getDashboardStats`, `getRecentActivity`) with artificial delays.
- **View model:** `vm$` uses `combineLatest` over those streams and `shareReplay(1)` in `dashboard.component.ts`.
- **Styling:** Global `src/styles.css` and component styles (inline in the dashboard/shell components). No SCSS files.
- **Other:** `components/ui/card` is a standalone `app-card` scaffold (not used by the dashboard yet). `core/services/auth.ts` is present but not wired into routes or the shell.
- **Testing:** `ng test` uses Vitest (see `package.json`).

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

Open [http://localhost:4200](http://localhost:4200).
<img width="1310" height="682" alt="image" src="https://github.com/user-attachments/assets/3b0c29bf-0f31-4701-9a26-3268165501b6" />

