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
      <ul class="activity">
        <li *ngFor="let line of vm.activity">{{ line }}</li>
      </ul>
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

    .activity {
      margin: 16px 0 0;
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