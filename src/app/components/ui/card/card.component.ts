import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  template: `
    <div class="card">
      @if (title) {
        <h3 class="card__title">{{ title }}</h3>
      }
      <div class="card__body">
        <ng-content />
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .card {
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }

    .card__title {
      margin: 0 0 12px;
      font-size: 16px;
      font-weight: 600;
      color: #111;
    }

    .card__body {
      font-size: 18px;
      color: #222;
    }
  `],
})
export class CardComponent {
  @Input() title?: string;
}
