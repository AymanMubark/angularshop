import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { orderAdd } from '../_models/orderAdd';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl = environment.apiUrl;

  constructor(private http : HttpClient) { }

  addOrder(model : orderAdd) {
    return this.http.post(this.baseUrl + 'Orders',model);
  }
}
