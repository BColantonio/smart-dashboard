import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../core/services/api';
import { combineLatest } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <ng-container *ngIf="vm$ | async as vm; else loading">
      <div class="grid">
        <div class="card">Users: {{ vm.stats.users }}</div>
        <div class="card">Revenue: \${{ vm.stats.revenue }}</div>
        <div class="card">Conversion: {{ vm.stats.conversion }}%</div>
      </div>

      <div class="card activity">
        <h3>Recent Activity</h3>
        <ul>
          <li *ngFor="let item of vm.activity">{{ item }}</li>
        </ul>
      </div>
    </ng-container>

    <ng-template #loading>
      <p>Loading dashboard...</p>
    </ng-template>
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

    .card.activity {
      margin-top: 16px;
    }

    .card.activity h3 {
      margin: 0 0 12px;
      font-size: 16px;
    }

    .card.activity ul {
      margin: 0;
      padding-left: 20px;
      font-size: 14px;
      color: #333;
    }
  `]
})
export class DashboardComponent {
  private api = inject(ApiService);

  vm$ = combineLatest({
    stats: this.api.getDashboardStats(),
    activity: this.api.getRecentActivity(),
  }).pipe(shareReplay(1));
}