import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../core/services/api';
import { CardComponent } from '../../components/ui/card/card.component';
import { combineLatest } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, CardComponent],
  template: `
    <ng-container *ngIf="vm$ | async as vm; else loading">
      <div class="grid">
        <app-card>Users: {{ vm.stats.users }}</app-card>
        <app-card>Revenue: \${{ vm.stats.revenue }}</app-card>
        <app-card>Conversion: {{ vm.stats.conversion }}%</app-card>
      </div>

      <app-card class="activity" title="Recent Activity">
        <ul>
          <li *ngFor="let item of vm.activity">{{ item }}</li>
        </ul>
      </app-card>
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

    app-card.activity {
      margin-top: 16px;
    }

    app-card.activity ul {
      margin: 0;
      padding-left: 20px;
      font-size: 14px;
      color: #333;
    }
  `],
})
export class DashboardComponent {
  private api = inject(ApiService);

  vm$ = combineLatest({
    stats: this.api.getDashboardStats(),
    activity: this.api.getRecentActivity(),
  }).pipe(shareReplay(1));
}
