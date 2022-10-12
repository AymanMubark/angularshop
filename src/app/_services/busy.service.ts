import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  public loadingSource = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSource.asObservable();
  setLoading(value: boolean) {
    this.loadingSource.next(value);
  }
  constructor() {
  }
}
