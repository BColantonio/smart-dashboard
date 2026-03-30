import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface DashboardStats {
  users: number;
  revenue: number;
  conversion: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  getDashboardStats(): Observable<DashboardStats> {
    return of({
      users: 1245,
      revenue: 12340,
      conversion: 3.2,
    }).pipe(delay(800)); // simulate network
  }
  getRecentActivity(): Observable<string[]> {
    return of([
      'User John signed up',
      'Payment received: $120',
      'New survey created',
      'User Sarah upgraded plan'
    ]).pipe(delay(1200));
  }
}