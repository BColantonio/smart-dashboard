import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="layout">
      <aside class="sidebar">
        <h2>Dashboard</h2>
        <nav>
          <a>Home</a>
          <a>Analytics</a>
        </nav>
      </aside>

      <div class="content">
        <header class="header">
          <h1>Smart Dashboard</h1>
        </header>

        <main class="main">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      height: 100vh;
      font-family: Arial, sans-serif;
    }

    .sidebar {
      width: 220px;
      background: #111;
      color: white;
      padding: 16px;
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .header {
      padding: 16px;
      border-bottom: 1px solid #ddd;
    }

    .main {
      padding: 16px;
      background: #f5f5f5;
      flex: 1;
    }
  `]
})
export class ShellComponent {}