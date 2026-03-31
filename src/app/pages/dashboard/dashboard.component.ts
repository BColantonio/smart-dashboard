import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService, type DashboardStats } from '../../core/services/api';
import { CardComponent } from '../../components/ui/card/card.component';
import { Chart, registerables } from 'chart.js';
import { combineLatest } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

Chart.register(...registerables);

interface Vm {
  stats: DashboardStats;
  activity: string[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, CardComponent],
  template: `
    <ng-container *ngIf="vm; else loading">
      <div class="grid">
        <app-card>Users: {{ vm.stats.users }}</app-card>
        <app-card>Revenue: \${{ vm.stats.revenue }}</app-card>
        <app-card>Conversion: {{ vm.stats.conversion }}%</app-card>
      </div>

      <app-card class="analytics" title="Analytics">
        <div class="chart-wrap">
          <canvas #chartCanvas></canvas>
        </div>
      </app-card>

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

    .chart-wrap {
      position: relative;
      height: 260px;
    }

    app-card.analytics {
      display: block;
      margin-top: 16px;
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
export class DashboardComponent implements AfterViewInit {
  private api = inject(ApiService);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('chartCanvas', { static: false })
  chartCanvas?: ElementRef<HTMLCanvasElement>;

  private chart: Chart<'bar'> | null = null;

  vm$ = combineLatest({
    stats: this.api.getDashboardStats(),
    activity: this.api.getRecentActivity(),
  }).pipe(shareReplay(1));

  /** Bound from vm$ so the canvas exists after data is ready (single subscription). */
  vm: Vm | null = null;

  constructor() {
    this.vm$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((next) => {
        this.vm = next;
        this.cdr.detectChanges();
        queueMicrotask(() => this.syncChart());
      });

    this.destroyRef.onDestroy(() => {
      this.chart?.destroy();
      this.chart = null;
    });
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => this.syncChart());
  }

  private syncChart(): void {
    const canvas = this.chartCanvas?.nativeElement;
    if (!canvas || !this.vm) {
      return;
    }

    const values: number[] = [
      this.vm.stats.users,
      this.vm.stats.revenue,
      this.vm.stats.conversion,
    ];

    const labels = ['Users', 'Revenue', 'Conversion'];

    if (!this.chart) {
      this.chart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Value',
              data: values,
              backgroundColor: ['#2563eb', '#16a34a', '#ca8a04'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
      return;
    }

    this.chart.data.labels = labels;
    const ds = this.chart.data.datasets[0];
    if (ds && 'data' in ds) {
      ds.data = values;
    }
    this.chart.update();
  }
}
