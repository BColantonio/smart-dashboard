# Smart Dashboard

Angular 21 app with a shell layout (sidebar + header), a dashboard home route, and mock HTTP-style APIs implemented with RxJS.

## What’s in the repo

- **Routing:** `ShellComponent` wraps child routes; the default child is `DashboardComponent` (`app.routes.ts`).
- **Dashboard:** Stat cards (users, revenue, conversion) and a “Recent Activity” list. Data comes from `ApiService` (`getDashboardStats`, `getRecentActivity`) with artificial delays.
- **View model:** `vm$` uses `combineLatest` over those streams and `shareReplay(1)` in `dashboard.component.ts`.
- **Styling:** Global `src/styles.css` and component styles (inline in the dashboard/shell components). No SCSS files.
- **Other:** `components/ui/card/card.component.ts` defines reusable `<app-card>` (optional `title`, projected content). `core/services/auth.ts` is present but not wired into routes or the shell.
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
<img width="1313" height="688" alt="image" src="https://github.com/user-attachments/assets/68b1c776-f568-4d50-9daf-2b0c26cbfd9e" />


