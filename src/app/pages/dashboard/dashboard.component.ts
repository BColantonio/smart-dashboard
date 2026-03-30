import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="grid">
      <div class="card">Users: 1,245</div>
      <div class="card">Revenue: $12,340</div>
      <div class="card">Conversion: 3.2%</div>
    </div>
  `,
  styles: [`
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      font-size: 18px;
    }
  `]
})
export class DashboardComponent {}